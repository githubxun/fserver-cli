var path = require('path');

module.exports = {
    // webpack-dev-server options

    //contentBase: path.join(__dirname, 'src'),
    // or: contentBase: "http://localhost/",

    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,

    // Set this if you want to enable gzip compression for assets
    //compress: true,

    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "*" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
    proxy: [
        {
            path: "*",
            target: "http://mock.59store.net:8888",
            changeOrigin: true
        }
    ],

    // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
    /*staticOptions: {
     '/': './index.html'
     },*/

    // webpack-dev-middleware options
    quiet: false,
    progress: true,
    noInfo: false,
    //lazy: true,
    inline: true,
    //filename: "lib.js",
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    //publicPath: "",
    headers: { "X-Custom-Header": "yes" },
    stats: { colors: true, chunks: false }
};
