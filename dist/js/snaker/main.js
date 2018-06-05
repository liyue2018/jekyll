/*
* @Author: liyue2018
* @Date:   2018-06-05 15:12:17
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-05 15:37:00
*/

;(function (window, undefined) {
    var map = document.querySelector('.map');
    var game = new Game(map);
    game.render();
    window.Game = Game;
})(window, undefined)