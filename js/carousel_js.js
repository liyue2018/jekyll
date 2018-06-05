/*
* @Author: liyue2018
* @Date:   2018-06-01 17:01:50
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-02 17:14:47
*/


// 轮播图
// 定时器的时间间隔

var intervalTime = 3000;

// 获取元素
var jkCarousel = document.getElementById('jkCarousel');
var slider = jkCarousel.querySelector('ul.sliders');
var indicators = jkCarousel.querySelector('ol.indicators');
var arrows = jkCarousel.querySelector('.arrow');
var arrowL = arrows.querySelector('.arrow-left');
var arrowR = arrows.querySelector('.arrow-right');

// 获取图片的宽度

var imgWidth = jkCarousel.offsetWidth;

// 自动生成序列号

for (var i = 0; i < slider.children.length; i++) {
    var indicatorsLi = document.createElement('li');
    indicatorsLi.className = 'item';
    indicators.appendChild(indicatorsLi);
    setInnerText(indicatorsLi, i + 1);
    // 记录索引号
    indicatorsLi.index = i;
    if (i === 0) {
        indicatorsLi.className = 'item active';
    }
    indicatorsLi.onclick = changeImg;
}

// 点击序列号切换图片
function changeImg() {
    // 让li动画的形式滑动
    animate(slider,-this.index * imgWidth);

    // 给当前的li 添加样式,取消剩下的li高亮样式
    for (var i = 0; i < indicators.children.length; i++) {
        indicators.children[i].className = 'item';
    }
    this.className = 'item active';
    index = this.index;

}

// 点击箭头实现上一张和下一张的功能
// 右箭头
var index = 0;
arrowR.onclick = function() {
    if (index === indicators.children.length) {
        index = 0;
        slider.style.left = '0' + 'px';
    }
    index ++;
    if (index < indicators.children.length) {
        indicators.children[index].click();
    } else {
        // 以动画的方式 展示复制的li
        animate(slider, -index * imgWidth);

        // 给当前的li 添加样式,取消剩下的li高亮样式
        for (var i = 0; i < indicators.children.length; i++) {
            indicators.children[i].className = 'item';
        }
        indicators.children[0].className = 'item active';
    }
}
// 左箭头
arrowL.onclick = function() {
    // 判断index === 0, 如果是第一张，就切换到克隆的那张
    if (index === 0) {
        index = indicators.children.length;
        slider.style.left = -index * imgWidth + 'px';
    }
    index --;
    // if (index > 0) {
        indicators.children[index].click();
    // }
}

// 无缝滚动

// 复制第一个li ，并且添加到ul最后
// true 会复制子元素
// false 不会复制子元素

var cloneLi = slider.children[0].cloneNode(true);
slider.appendChild(cloneLi);

// 自动切换图片

var timerId = setInterval(function() {
    arrowR.click();
}, intervalTime);

// 鼠标进入停止定时器

jkCarousel.onmouseenter = function() {
    clearInterval(timerId);
}
// 鼠标离开自动执行切换图片

jkCarousel.onmouseleave = function() {
    timerId = setInterval(function() {
        arrowR.click();
    },intervalTime);
}
