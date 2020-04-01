const path = require('path');

const configs = {
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}

module.exports = configs;