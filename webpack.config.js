let path = require('path');
let webpack = require('webpack');

module.exports = {
    entry: './client/index.js',
    output: {
        path: __dirname + 'client',
        filename: 'bundle.js',
    },
    module: {
        rules: [{
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
}

