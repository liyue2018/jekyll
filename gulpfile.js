/*
* @Author: yongze-chen
* @Date:   2018-04-08 15:37:45
* @Last Modified by:   yongze-chen
* @Last Modified time: 2018-04-08 15:38:22
*/
var init = require('./build/gulpfile.init.js');
var prod = require('./build/gulpfile.prod.js');
var dev = require('./build/gulpfile.dev.js');

init();
prod();
dev();