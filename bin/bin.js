#!/usr/bin/env node

var program = require('commander'),
    server = require('../lib/server'),
    config = require('../lib/config'),
    init = require('../lib/init');

program
    .command('start [cmd]')
    .description('start server')
    .option('-c, --config <file>', '指定webpack配置文件')
    .option('-p, --port <num>', '设置服务端口')
    .option('-w, --watch', '监听文件变化,自动刷新页面')
    .option('-P, --proxy', '关闭http代理')
    .option('-W, --Watch', '关闭文件变化监听')
    .action(server);


program
    .command('init <name>')
    .description('init mock server')
    .option('-w, --webpack', '创建webpack config文件')
    .option('-s, --server', '创建webpack-dev-server config文件')
    .option('-p, --proxy', '创建proxy config文件')
    .option('-c, --config', "创建base config文件 [eg: .babelrc/.editorconfig/.eslintrc.json/.gitignore]")
    .action(init);


program
    .command('config')
    .description('config the server info')
    .action(config);


/*program
    .command('setup [env]')
    .description('run setup commands for all envs')
    .option("-s, --setup_mode [mode]", "Which setup mode to use")
    .action(function(env, options){
        console.log(options);
        var mode = options.setup_mode || "normal";
        env = env || 'all';
        console.log('setup for %s env(s) with %s mode', env, mode);
    });*/



program.parse(process.argv);
