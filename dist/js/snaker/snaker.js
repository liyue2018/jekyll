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