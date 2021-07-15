const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: 
    {
        bundle: `${__dirname}/src/index.tsx`,
        app: `${__dirname}/src/express/app.ts`
    },
    output: {
        path: `${__dirname}/dist`,
        filename: '[name].js',
        publicPath: '/'
    },
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
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') })],
    externals: {
        "saslprep": "require('saslprep')",
        "mongoose": "require('mongoose')",
        "express": "require('express')"
    }
};