/**
 * Created by yangxun on 16/8/8.
 */
var WebpackDevServer = require("webpack-dev-server"),
    webpack = require("webpack"),
    //configuration = require('../config/webpack.config.dev'),
    path = require('path'),
    _assign = require('deep-assign'),
    shell = require('shelljs');

function Context(env, options){
    options = options || {};
    this.work_dirname = process.cwd();
    this.base_dirname = __dirname;
    this.config_dirname = path.join(this.base_dirname, '..', 'config');
    //use default config

    this.CONFIG = this._defaultConfig(options.config);
    var server = {};
    //div port
    if(options.port){
        server.port = options.port;
    }
    //open watch [default is open]
    if(options.watch){
        server.hot = true;
    }
    //close watch
    if(options.Watch){
        server.hot = false;
    }

    _assign(this.CONFIG.server.server, server);
    //兼用webpack的devServer配置
    if(this.CONFIG.webpack.devServer){
        _assign(this.CONFIG.proxy, this.CONFIG.webpack.devServer);
    }
    //关闭proxy代理
    if(options.proxy){
        this.CONFIG.proxy.proxy = [];
    }
}

Context.prototype._defaultConfig = function(wp){
    var config = {};
    if(wp){
        config.webpack = path.join(this.work_dirname, wp);
    }
    else if(shell.test('-f', 'webpack.config.dev.js')){
        config.webpack = path.join(this.work_dirname, 'webpack.config.dev.js');
    }
    else{
        config.webpack = path.join(this.config_dirname, 'webpack.config.dev.js');
    }
    if(shell.test('-f', 'proxy.config.js')){
        config.proxy = path.join(this.work_dirname, 'proxy.config.js');
    }
    else{
        config.proxy = path.join(this.config_dirname, 'proxy.config.js');
    }
    if(shell.test('-f', 'server.config.json')){
        config.server = path.join(this.work_dirname, 'server.config.json');
    }
    else{
        config.server = path.join(this.config_dirname, 'server.config.json');
    }

    return {
        webpack: require(config.webpack),
        proxy: require(config.proxy),
        server: require(config.server)
    }
};

function Server(env, options){
    if(this instanceof Server){
        Context.apply(this, arguments);
        this.run();
    }
    else{
        return new Server(env, options);
    }
}

Server.prototype = Context.prototype;
//重置constructor属性
Server.prototype.constructor = Server ;

Server.prototype.run = function(){
    var self = this;
    var options = _assign({}, this.CONFIG.proxy, {hot: this.CONFIG.server.hot});

    var server = new WebpackDevServer(webpack(this.CONFIG.webpack), options);
    server.use(function (req, res, next) {
        req.header['username'] = self.CONFIG.server.user.name;
        next();
    });

    server.listen(this.CONFIG.server.server.port, this.CONFIG.server.server.host, function() {
        console.log('webpack server started !');
    });
};



/**
 * server
 * @param env
 * @param options
 */
module.exports = Server;
