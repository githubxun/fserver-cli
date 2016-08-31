/**
 * Created by yangxun on 16/8/11.
 */
var Logger = require('./logger'),
    shell = require('shelljs'),
    path = require('path');

/**
 * init project
 * @param env
 * @param options
 *
 * eg:
 *
 * env: "mock-server"
 * options: {
 *      webpack: true/false,
 *      server: true/false,
 *      proxy: true/false
 *      Config: true/false
 * }
 */
module.exports = function(env, options){
    var work_dirname = process.cwd(), base_dirname = __dirname, config_dirname = path.join(base_dirname, '..', 'config');

    if(options === undefined || !env){
        Logger.error('error: you should enter a project name\n\neg: mock init project-name');
        process.exit(0);
    }

    //use default config
    if(env){
        if(!shell.test('-d', env)){
            shell.mkdir(path.join(work_dirname, env));
        }

        work_dirname = path.join(work_dirname, env);
        shell.cd(env);
    }

    //cp webpack config
    if(options.webpack){
        shell.cp([path.join(config_dirname, 'webpack.config.dev.js'), path.join(config_dirname, 'webpack.config.prod.js')], work_dirname);
    }
    //cp server config
    if(options.server){
        shell.cp([path.join(config_dirname, 'server.config.json')], work_dirname);
    }
    //cp proxy config
    if(options.proxy){
        shell.cp([path.join(config_dirname, 'proxy.config.js')], work_dirname);
    }

    //cp config file
    if(options.config){
        var list = shell.ls('-A', config_dirname).filter(function(file) { return file.match(/^\./); });
        list = list.map(item=>{
            return path.join(config_dirname, item);
        });
        shell.cp(list, work_dirname);
    }

    //cp package.json file
    //shell.cp([path.join(config_dirname, 'package.json')], work_dirname);

    //all finished
    Logger.success('all finished without error !!!');
};
