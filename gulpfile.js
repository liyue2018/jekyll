/*
* @Author: liyue
* @Date:   2018-04-08 15:37:45
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-04-13 12:45:47
*/
var init = require('./build/gulpfile.init.js');
var prod = require('./build/gulpfile.prod.js');
var dev = require('./build/gulpfile.dev.js');

init();
prod();
dev();