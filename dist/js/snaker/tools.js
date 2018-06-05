/*
* @Author: liyue2018
* @Date:   2018-06-05 10:45:53
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-05 15:15:31
*/


;(function (window, undefined) {
    var Tools = {
    // 随机数
    getRandom: function (min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  window.Tools = Tools;
})(window, undefined)
