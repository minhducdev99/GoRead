const Dotenv = require('dotenv-webpack');

const dotenvArgs = {
    expand: true,
    path: './.env'
};

module.exports = {
    configureWebpack: {
        plugins: [
            new Dotenv(dotenvArgs)
        ]
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/goread/'
        : '/'
};