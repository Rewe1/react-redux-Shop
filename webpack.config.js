const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const serverURL = require('./serverURL')

bundleConfig =
{
    
    mode: 'development',
    entry: `${__dirname}/src/index.tsx`,
    output: {
        path: `${__dirname}/dist`,
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: 
    {
        rules: 
        [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                          outputPath: 'res',
                        },
                    },
                ],
            }
        ]
    },
    resolve: 
    {
        extensions: [ '.ts', '.tsx', '.js'],
    },
    devServer: {
        historyApiFallback: true,
        proxy: 
        {
            '*': "http://localhost:8080"
        }
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') })]
}

expressConfig =
{
    mode: 'development',
    entry: `${__dirname}/src/express/app.ts`,
    output: {
        path: `${__dirname}/dist`,
        filename: 'app.js',
        publicPath: '/'
    },
    target: 'node',
    node: {
        fs: 'empty',
        net: 'empty',
        __dirname: false
    },
    module: 
    {
        rules: 
        [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    resolve: 
    {
        extensions: [ '.ts', '.tsx', '.js'],
    },
    devServer: {
        historyApiFallback: true,
    },
    externals: {
        "saslprep": "require('saslprep')",
        "mongoose": "require('mongoose')",
        "express": "require('express')"
    }
}

module.exports = [
    bundleConfig,
    expressConfig
]