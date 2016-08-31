### base develop server


#####fserver-cli是基于wepack-dev-server包装和整合的前端开发服务器


#####fserver-cli相关命令
````
配置相关信息如:
fserver config -c user.name=ddddd
fserver config -c user.password=11111
fserver config -c server.host=http://www.baidu.com
fserver config -c server.port=8080
fserver config -c server.enable=true


项目初始化
fserver init <project-name> [options]

options参数说明:
-w  --webpack   是否创建webpack.config.js文件[如需自定义webpack配置项可创建,否则可忽略]
-s  --server    是否创建server.config.js文件[如需自定义可创建]
-p  --proxy     是否创建proxy.config.js文件[该文件用户配置http代理转发]
-c  --config    是否创建项目规范配置文件,其中的文件包括:.bablerc/.editorconfig/.eslintrc.json/.gitignore


fserver服务器如:
fserver start [options]

options参数说明:
-c  --config    指定webpack配置文件
-p  --port      设置服务端口
-w  --watch     监听文件变化,自动刷新页面
-P  --proxy     关闭http代理
-W  --Watch     关闭文件变化监听
````

#####如何使用? 非常简单
````
第一步: npm install -g fserver-cli  全局安装
第二步: 创建项目 fserver init [options] (如果项目已经存在可跳过该步骤,不过你依然可以采用fserver init [options]创建你需要的文件,如:server.config.js/proxy.config.js等)
第三步: 启动服务 fserver start [options] ,如果不指定-c参数,默认加载根项目下的webpack.config.dev.js
````

#####notice 文件说明:
````
webpack.config.xxx.js 用于wepack的相关配置,热加载也是基于该配置文件
server.config.js 用于指定当前的用户信息以及服务启动的相关信息,如:服务的端口,默认端口为6868(修改服务相关信息有两种方式:1.通过fserver config server.port=8080指定;2.通过在项目根目录创建server.config.js文件来自定义)
proxy.config.js 用于wepack-dev-server的相关配置文件,其中包括最主要的数据请求转发
.balerc/.editorconfig/.eslintrc.json/.gitignore 用于规范项目的公共配置文件,推荐使用
````

#####相关文档参考
````
https://www.npmjs.com/package/fserver-cli
http://webpack.github.io/docs/configuration.html
http://webpack.github.io/docs/webpack-dev-server.html
http://eslint.org/
````
