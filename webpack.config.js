const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: 
    {
        reactApp: path.resolve(__dirname, 'src', 'index.tsx'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]bundle.js',
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
};