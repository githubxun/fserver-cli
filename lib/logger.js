/**
 * Created by yangxun on 16/8/11.
 */

var colors = require('colors');

/**
 *
 * @param text
 */
exports.log = function(text){
    desc();
    console.log(text.inverse.green);
    end();
};

/**
 *
 * @param text
 */
exports.error = function(text){
    desc();
    console.log(text.inverse.red);
    end();
};

exports.success = function(text){
    console.log();
    console.log(text.inverse.green);
    console.log();
};

function desc(){
    console.log();
    console.log('-- hello guys, pay attention to the following information --'.white);
    console.log();
}

function end(){
    console.log();
}
