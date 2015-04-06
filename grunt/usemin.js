'use strict';

var config = {
    useminPrepare: {
        jade: ['client/index.jade', 'client/global/head/head.jade'],
        options: {
            dest: 'dist/client'
        }
    },
    usemin: {
        jade: ['dist/client/index.jade', 'dist/client/global/head/head.jade'],
        options: {
            assetsDirs: ['dist/client'],
            blockReplacements: {
                css: function (block) {
                    return 'link(rel="stylesheet" href="' + block.dest + '")';
                },
                js: function (block) {
                    return 'script(src="' + block.dest + '")';
                }
            },
            patterns: {
                jade: require('usemin-patterns').jade
            }
        }
    }
};

module.exports = config;
