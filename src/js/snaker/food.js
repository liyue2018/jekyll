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


