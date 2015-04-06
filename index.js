// # Application

'use strict';

var _       = require('lodash');
var cluster = require('cluster');
var os      = require('os');

var config  = require('./config');
var logger  = require('./server/lib/logger');

// Determine if we should start this process as a clustered instance or a
// standalone one.
var clusterServer = config.server.cluster && cluster.isMaster;
if (clusterServer) {
    cluster.setupMaster();

    // Bind up cluster events
    cluster
        .on('online', function onOnline(worker) {
            logger.info('worker %d online', worker.id);
        })
        .on('disconnect', function onDisconnect(worker) {
            logger.warn('worker %d disconnected', worker.id);
        })
        .on('exit', function onExit(worker, code, signal) {
            logger.error('worker %d died (%s), restarting...', worker.id, signal);
        });

    // Fork a process for each CPU
    os.cpus().forEach(function forkProcess() {
        cluster.fork();
    });

    // Collect logger messages from child processes and output them to the
    // master's logger instance. This avoids any wackiness with multiple
    // processes trying to write to the same stream (particularly if the
    // `rotating-file` stream type is used)
    //
    // **See**: https://github.com/trentm/node-bunyan/issues/117
    _.each(cluster.workers, function (worker) {
        worker.process.on('message', function onMessage(message) {
            if (message.type === 'log') {
                // Prepend worker ID to message. Make sure string replacement
                // still works.
                var messageArguments = [message.message[0]];
                if (_.isObject(messageArguments[0])) {
                    messageArguments[0].worker = worker.id;
                } else {
                    messageArguments.push(messageArguments[0]);
                    messageArguments[0] = { worker: worker.id };
                }

                // Concat the rest of the items in `message.message` and apply
                // it to the `logger` function based on the `level` specified.
                //
                // i.e. `message.level = "warn"`, so call `logger.warn`
                messageArguments = messageArguments.concat(message.message.slice(1));
                logger[message.level].apply(logger, messageArguments);
            }
        });
    });
} else {
    // Process is not clustered or is a child instance, so in this case, we are
    // just going to start up the server.
    var server = require('./server');

    server.start()
    .then(function onServerStart() {
        logger.info('server listening on %s:%d', config.server.host, config.server.port);
    })
    .fail(function onServerStartError(err) {
        logger.fatal('error occurred while starting server');
        logger.fatal(err, err.stack);
    });
}
