// # View Router
//
// Handles rendering `jade` templates when they are requested, as well as caching
// them with appropriate ETags

'use strict';

var crypto  = require('crypto');
var express = require('express');

var config = require('../../config');
var logger = require('../lib/logger');

// Cache object to store `hashCode -> viewRendering`
var cache = {};

var router = express.Router();

// If the URL ends with `.jade`, then handle it here
router.get('*.jade', function (req, res) {
    // Strip leading slash from view request, since they will probably come in
    // as `/path/to/view.jade`, which will cause issues when trying to find the
    // corresponding view
    var view = req.url;
    if (view.indexOf('/') === 0) {
        view = view.substring(1);
    }

    logger.debug({ view: view, hash: cache[view] }, 'requesting view');

    // Handle rendering the view. Supply a callback that takes the rendered
    // HTML and stores it in a cache so that an ETag can be calculated and sent
    // to the client.
    res.render(view, function onRender(err, html) {
        if (err) {
            // If an error occurred, send a `404` with a snippet saying the view
            // was not found (this may not be the case, but we will store the
            // actual error in the logs).
            logger.error(err);
            res.status(404);
            res.send('<div>View not found</div>');
        } else {
            // Check to see if the cache is enabled, and if so, calculate the
            // MD5 hash of the rendered HTML. Store it in the `cache` object and
            // set the `ETag` header to the calculated value.
            if (config.server.cacheEnabled) {
                cache[view] = crypto.createHash('md5').update(html).digest('hex');
                res.set('ETag', cache[view]);
            }

            var clientHasCachedView = config.server.cacheEnabled &&
                                      req.headers &&
                                      req.headers['if-none-match'] &&
                                      req.headers['if-none-match'] === cache[view];

            if (clientHasCachedView) {
                // Send a `304` since the client already has the view cached.
                logger.debug({ view: view, hash: cache[view] }, 'sending 304 for view');
                res.status(304).end();
            } else {
                // Send the HTML since the client does not have the view cached.
                logger.debug({ view: view, hash: cache[view] }, 'sending view');
                res.send(html);
            }
        }
    });
});

module.exports = router;
