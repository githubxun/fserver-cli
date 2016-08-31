/**
 * Created by yangxun on 16/8/6.
 */
var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WebpackMd5Hash = require('webpack-md5-hash'),
    path = require('path');

module.exports = {
    context: path.join(__dirname, './src'),
    entry: {
        app: './entry.js',
        lib: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash:10].js',
        publicPath: ''  //TODO modify to http://fecdn.59store.com/xxx/xxx eg:'http://fecdn.59store.com/repo/dealer/'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader?modules&camelCase&importLoaders=1&localIdentName=[local]__[hash:base64:5]!postcss-loader!less-loader'
                //loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&minimize&camelCase&importLoaders=1&localIdentName=[local]__[hash:base64:5]!postcss-loader!less-loader')
            },
            /*{
             test: /\.css$/,
             loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&minimize&camelCase&importLoaders=1&localIdentName=[local]__[hash:base64:5]!postcss-loader')
             },*/
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    'babel'
                ]
            },
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=[name].[chunkhash:10].[ext]'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    postcss: [
        autoprefixer({
            browsers: ['Android >= 4', 'iOS > 6', 'last 10 Chrome versions', 'last 4 Firefox versions', 'Safari >= 6', 'ie > 8']
        })
    ],
    plugins: [
        new WebpackMd5Hash(),
        new webpack.optimize.CommonsChunkPlugin('lib', 'lib.[chunkhash:10].js'),
        new ExtractTextPlugin("[name].[chunkhash:5].css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')}
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            unused: true,
            dead_code: true,
            warnings: false
        }),
        new HtmlWebpackPlugin({
            minify:{
                removeComments:true,
                collapseWhitespace:true
            },
            template: './index.html'
        })
    ]
};
