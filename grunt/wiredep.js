'use strict';

var config = {
    wiredep: {
        client: {
            src: [
                'client/index.jade',
                'client/global/head/head.jade'
            ]
        },
        test: {
            src: [
                'karma.conf.js'
            ],
            options: {
                devDependencies: true,

                fileTypes: {
                    js: {
                        block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                        detect: {
                            js: /'([^'"]+)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            }
        }
    }
};

module.exports = config;
