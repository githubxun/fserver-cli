var webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WebpackMd5Hash = require('webpack-md5-hash'),
    path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        app: ['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server', './entry.js'],
        lib: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: path.join(__dirname, '..', 'dist'),
        filename: '[name].[chunkhash:10].js'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader?modules&camelCase&importLoaders=1&localIdentName=[local]__[hash:base64:5]!postcss-loader!less-loader'
            },
            /*{
             test: /\.css$/,
             loader: 'style-loader!css-loader?modules&camelCase&importLoaders=1&localIdentName=[local]__[hash:base64:5]!postcss-loader'
             },*/
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    'babel-loader'
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('lib', 'lib.[chunkhash:10].js'),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')}
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            }
        })
    ]
}
