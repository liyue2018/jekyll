/*
* @Author: liyue2018
* @Date:   2018-06-05 10:44:00
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-05 15:21:59
*/

;(function (window, undefined) {
    var that;
    function Game (map) {
        // 把蛇和食物渲染到地图上
        this.food = new Food();
        this.snaker = new Snaker();
        this.map = map;
        that = this;
    }

    // 渲染 render
    Game.prototype.render = function () {
        // 把食物和蛇渲染到地图上
        this.food.render(this.map);
        this.snaker.render(this.map);
        // 游戏逻辑
        // 让蛇移动 当蛇遇到边界，游戏结束
        runSnaker();
        // 通过键盘控制蛇移动的方向
        bindKey();
        // 蛇吃食物


    }

    // 私有函数
    function runSnaker () {
        var timerId = setInterval(function () {
            // 让蛇走一格
            this.snaker.move(this.food, this.map);
            this.snaker.render(this.map);

            // 蛇头遇到边界

            var maxX = (this.map.offsetWidth - this.snaker.width) / this.snaker.width;
            var maxY = (this.map.offsetHeight - this.snaker.height) / this.snaker.height;
            var headX = this.snaker.body[0].x;
            var headY = this.snaker.body[0].y;
            if (headX < 0 || headX >= maxX) {
                clearInterval(timerId);
                console.log('游戏结束');
            }
            if (headY < 0 || headY >= maxY) {
                clearInterval(timerId);
                console.log('游戏结束');
            }
        // bind() ES5新增的方法
        // bind第一个参数可以改变函数中this的指向
        }.bind(that), 150)
    }
    // 通过键盘控制蛇移动的方向
    function bindKey() {
        // 注册键盘事件
        document.addEventListener('keydown', function (e) {
             switch(e.keyCode) {
                 case 37:
                     this.snaker.direction = 'left';
                     break;
                 case 38:
                     this.snaker.direction = 'top';
                     break;
                 case 39:
                     this.snaker.direction = 'right';
                     break;
                 case 40:
                     this.snaker.direction = 'bottom';
                     break;
             }
        }.bind(that), false)    
    }
    window.Game = Game;

})(window, undefined)

// test
// var map = document.querySelector('.map');
// var game = new Game(map);
// game.render();
