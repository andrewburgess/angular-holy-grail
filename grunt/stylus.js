'use strict';

var config = {
    stylus: {
        compile: {
            options: {
                compress: false,
                use: [require('nib')]
            },

            files: {
                'client/assets/css/style.css': 'client/index.styl',
                'client/assets/css/vendor.css': 'client/vendor/index.styl'
            }
        }
    }
};

module.exports = config;
