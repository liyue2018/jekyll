/*
* @Author: liyue2018
* @Date:   2018-06-04 11:54:18
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-05 15:41:09
*/

// ----------------------------------------tools----------------------------------------

;(function (window, undefined) {
    var Tools = {
    // 随机数
    getRandom: function (min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
  window.Tools = Tools;
})(window, undefined)


// ----------------------------------------food----------------------------------------

// 自调用函数，开启一个新的局部作用域，方式命名冲突
;(function (window,undefined) {
   // 定义一个Food 构造函数
   // width
   // height
   // color
   // x
   // y
   // render 渲染 随机创建一个食物对象，并渲染到map上
   var position = 'absolute';
   var borderRadius = '50%';
   var elements = [];
   function Food (options) {
       options = options || {};
       this.width = options.width || 20;
       this.height = options.hieght || 20;
       this.color = options.color || 'green';
       this.x = options.x || 0;
       this.y = options.y || 0;
   }

    // 渲染食物

    Food.prototype.render = function (map) {
       // 删除之前的饿食物
       remove();
       // 随机生成 x y
       this.x = Tools.getRandom(0, map.offsetWidth/this.width - 1) * this.width;
       this.y = Tools.getRandom(0, map.offsetHeight/this.height - 1) * this.height;
       var div = document.createElement('div');

       // 把div追加到map上面
       map.appendChild(div);
       elements.push(div);

    // div 设置样式

       div.style.width = this.width + 'px';
       div.style.height = this.height + 'px';
       div.style.backgroundColor = this.color;
    
       div.style.position = position;
       div.style.borderRadius = borderRadius;
       div.style.left = this.x + 'px';
       div.style.top = this.y + 'px';
   }

    // 删除食物
    function remove () {
        for (var i = elements.length - 1; i >= 0; i--) {
            // 删除div
            elements[i].parentNode.removeChild(elements[i]);
            // 删除数组中的元素
            // 第一个参数：从那个元素开始删除
            // 第二个元素： 删除几个元素
            elements.splice(i, 1);
        }

    }
    window.Food = Food;
})(window,undefined)


// test
// var map = document.querySelector('.map');
// var food = new Food();
// food.render(map);

// ----------------------------------------snaker----------------------------------------

;(function (window, undefined) {
    var position = 'absolute';
    var borderRadius = '50%';
    // 记录之前创建的蛇
    var elements = [];
    function Snaker(options) {
        options = options || {};
        // 蛇节的大小
        this.width = options.width || 20;
        this.height = options.height || 20;

        // 蛇移动的方向
        this.direction = options.direction || 'right';
        // 蛇的身体，第一个元素是蛇头
        this.body = [
            {x:3, y:2, color: 'red'},
            {x:2, y:2, color: 'blue'},
            {x:1, y:2, color: 'blue'}
        ];
    }

    // render
    Snaker.prototype.render = function (map) {
        // 删除之前创建的蛇
        remove();
        // 渲染蛇节
        for (var i = 0, len = this.body.length; i < len; i++) {
            var object = this.body[i];
            var div = document.createElement('div');
            // 渲染到地图上
            map.appendChild(div);
            // 记录当前蛇
            elements.push(div);
            // 设置样式
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.borderRadius = borderRadius; 

            // 设置坐标和颜色
            div.style.backgroundColor = object.color;
            div.style.position = position;
            div.style.left = object.x * this.width + 'px';
            div.style.top = object.y * this.height + 'px';
        }
    }
    // 私有成员
    function remove () {
        for (var i = elements.length - 1; i >= 0; i--) {
        // 删除div
        elements[i].parentNode.removeChild(elements[i]);
        // 删除数组中的成员
        elements.splice(i,1);

      }
    }
    // 控制蛇移动的方法
    Snaker.prototype.move = function (food, map) {
        // 控制蛇的身体移动（当前蛇节到上一个蛇节的位置）
        for (var i = this.body.length - 1; i > 0; i --) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 控制蛇头
        var head = this.body[0];
        switch(this.direction) {
            case 'right':
                head.x += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'top':
                head.y -= 1;
                break;
            case 'bottom':
                head.y += 1;
                break;
        }
        // 判断蛇头是否和食物的坐标重合
        var headX = head.x * this.width;
        var headY = head.y * this.height;
        if (headX === food.x && headY === food.y) {
           // 增加蛇节
           // 获取蛇的最后一节
           var lastSnaker = this.body[this.body.length - 1];
           this.body.push({
              x: lastSnaker.x,
              y: lastSnaker.y,
              color: lastSnaker.color
           })

           // 删除食物，随机生成食物
           food.render(map);
        }
    }
    window.Snaker = Snaker;
})(window, undefined)

// test
// var map = document.querySelector('.map');
// var snaker = new Snaker();
// snaker.render(map);

// ----------------------------------------game----------------------------------------

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
        }.bind(that), 200)
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

// ----------------------------------------main---------------------------------------- 

;(function (window, undefined) {
    var map = document.querySelector('.map');
    var game = new Game(map);
    game.render();
})(window, undefined)
