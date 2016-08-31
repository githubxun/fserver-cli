/**
 * Created by yangxun on 16/8/11.
 */
var fs = require('fs'),
    Logger = require('./logger'),
    shell = require('shelljs'),
    path = require('path');


module.exports = function(env, options){
    var work_dirname = process.cwd(), base_dirname = __dirname, config_dirname = path.join(base_dirname, '..', 'config');

    if(options === undefined || !env){
        Logger.error('error: you should enter a project name\n\neg: mock init project-name');
        process.exit(0);
    }

    if(!/^(user|proxy|server)\.[a-zA-Z]+=[a-zA-Z0-9]+$/.test(env)){
        process.exit(0);
    }

    var data = JSON.parse(fs.readFileSync(path.join(config_dirname, 'server.config.json')));
    console.log(data);
    env.replace(/^(user|proxy|server)\.([a-zA-Z]+)=([a-zA-Z0-9]+)$/, (str, type, key, value)=>{
        data[type][key] = value;
    });

    fs.writeFileSync(path.join(config_dirname, 'server.config.json'), JSON.stringify(data));
};
