/*
* @Author: liyue2018
* @Date:   2018-06-05 16:32:45
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-05 17:29:41
*/
// 严格模式 规避一些不严谨的语法
// 'use strict'

// 设置元素之间的内容 兼容性问题
function setInnerText(element,content) {
   // 判断element是否支持innerText
   if(typeof element.innerText === 'string') {
       return element.innerText = content;
   } else {
       return element.textContent = content;
   }
}
//注册事件，处理兼容性问题

function addEventListener(element,eventName,callback) {
if (element.addEventListener) {
    element.addEventListener(eventName,callback,false);
} else if (element.attachEvent) {
    element.attachEvent('on' + eventName,callback);
} else {
    element['on' + eventName] = callback;
}
}

//移除事件，处理兼容性问题

function removeEventListener(element,eventName,callback) {
if (element.removeEventListener) {
    element.removeEventListener(eventName,callback,false);
} else if (element.detachEvent) {
    element.detachEvent('on' + eventName,callback);
} else {
    element['on' + eventName] = null;
}
}

//chrome 和 ie11 兼容性问题
//获取页面滚动出去的距离

function getScroll() {
   return {
       scrollTop:document.documentElement.scrollTop || document.body.scrollTop,
       scrollLeft:document.documentElement.scrollLeft || document.body.scrollLeft
   }
}

// 获取鼠标在页面上的坐标

function getPage(e) {
   return {
       pageX: e.clientX + getScroll().scrollLeft,
       pageY: e.clientY + getScroll().scrollTop
   }
}


// 相册画廊
//获取所有的li元素

var jkImagegallery = document.getElementById('jkImagegallery');
var small_image = document.getElementsByClassName('small-image')[0];
var links = small_image.getElementsByTagName('a');
for(var i = 0;i<links.length;i++) {
    //获取当前元素
    var link = links[i];

    //给当前的li注册点击事件
    link.onclick = function() {
        //切换图片和文字
        var large_image = document.getElementsByClassName('large-image')[0].getElementsByTagName('img')[0];
        var desc = document.getElementsByClassName('desc')[0];
        large_image.src = this.href;
        desc.innerText = this.title;
        return false;
    }
}

//全选表单

//点击全选按钮，让子checkbox的选中状态和其一样
var all_select = document.getElementById('jkSelectTable').getElementsByClassName('allChecked')[0];
//给子checkbox注册点击事件
//全选按钮注册点击事件 全选
all_select.onclick = function() {
    var checkboxs = document.querySelectorAll('.inputCheck input[type=checkbox]');
    // console.log(this.checked);
    for(var i = 0;i<checkboxs.length;i++) {
    checkboxs[i].checked = this.checked;
  }
}
//给每一个子checkbox注册点击事件
var checkboxs = document.querySelectorAll('.inputCheck input[type=checkbox]');
for(var i = 0; i<checkboxs.length;i++) {
    checkboxs[i].onclick = function() {
        var isAllChecked = true;
        for(var j = 0;j<checkboxs.length;j++) {
            if(!checkboxs[j].checked) {
                isAllChecked = false;
                break;
            }
        }
        //设置全选为选中状态
        all_select.checked = isAllChecked;
    }
}

//注册反选事件
var cancleChecked = document.querySelector('.cancleChecked');
cancleChecked.onclick = function() {
    for(var i = 0; i<checkboxs.length;i++) {
        checkboxs[i].checked = !checkboxs[i].checked;
        var isAllChecked = true;
        for(var j = 0;j<checkboxs.length;j++) {
            if(!checkboxs[j].checked) {
                isAllChecked = false;
                break;
            }
        }
        //设置全选为选中状态
        all_select.checked = isAllChecked;
    }
}
//tab选项卡

// var tabs_li = document.querySelectorAll('#jkTab .tabs li');
//获取子元素
var tabs_li = document.querySelector('#jkTab .tabs').children;
for(var i = 0; i<tabs_li.length;i++) {
    //设置索引
    tabs_li[i].setAttribute('index',i);
    //注册鼠标经过事件
    tabs_li[i].onmouseover = function() {
        //取消所有li的当前状态
        for(var j = 0;j<tabs_li.length;j++) {
            tabs_li[j].className = 'tab-item';
        }
        //让当前的高亮显示
        this.className = 'tab-item active';

        //找到对应索引的div显示
        var index = this.getAttribute('index');
        var tabs_div = document.querySelectorAll('#jkTab .products .product-item');
        console.log(tabs_div);
        for(var x = 0; x<tabs_div.length;x++) {
            tabs_div[x].className = 'product-item';
        }
        //显示
        tabs_div[index].className = 'product-item selected';
    }
}

//动态创建表单
//表单数据
var bodyData = [
    {name: '高等代数', institute: '电子信息工程学院'},
    {name: '大学英语四级', institute: '电子信息工程学院'},
    {name: '物理与生物', institute: '电子信息工程学院'},
    {name: '艺术认识', institute: '电子信息工程学院'}
];
//表头数据
var headData = [
    "课程名称","所属学院","操作"
];
var jkTabdel = document.getElementById('jkTabdel');
createTable(jkTabdel,headData,bodyData);

//封装动态创建表单
 function createTable(parent,headData,bodyData) {
    //创建表头
    var jk_table = createHead(parent,headData);
    //创建数据行
    createBody(jk_table,bodyData);
 }

 //创建表头
 function createHead(parent,headData) {
     //创建表头
     var jk_table = document.createElement('table');
     jk_table.className = 'table table-bordered table-hover table-responsive table-striped';
     parent.appendChild(jk_table);

     //创建thead
     var thead = document.createElement('thead');
     jk_table.appendChild(thead);

     //创建tr
     var tr = document.createElement('tr');
     thead.appendChild(tr);

     //创建th
     //遍历数组生成表头中的列
     headData.forEach(function(item) {
        var th = document.createElement('th');
        tr.appendChild(th);
        setInnerText(th,item);
     });
     return jk_table;
 } 
 //创建数据行

 function createBody(jk_table,bodyData) {
    //创建表体
    //创建tbody

    var tbody = document.createElement('tbody');
    jk_table.appendChild(tbody);

    //遍历数据

    bodyData.forEach(function(item,index) {
        //创建行
        var tbody_tr = document.createElement('tr');
        tbody.appendChild(tbody_tr);

        //创建列
        //遍历对象
        for(var key in item) {
            var tbody_td = document.createElement('td');
            tbody_tr.appendChild(tbody_td);
            setInnerText(tbody_td,item[key]);
        }
        //创建操作列

        tbody_td = document.createElement('td');
        tbody_tr.appendChild(tbody_td);

        //创建删除
        var link = document.createElement('a');
        tbody_td.appendChild(link);
        setInnerText(link,'删除');

        //注册删除事件
        link.onclick = linkClickDel;
    });
        //删除函数
        function linkClickDel() {
            //提示
            var sure = confirm('删除后不可恢复，确定删除么？')
            if(sure) {
                //删除
                //获取当前行
                var del_tr = this.parentNode.parentNode;
                tbody.removeChild(del_tr);
            }
        }
 }

//城市选择案例
var btn_box = document.querySelector('.btn-box');
var src_city = document.querySelector('.src-city');
var tar_city = document.querySelector('.tar-city');
var len = src_city.children.length;
//1.全部向右移动
btn_box.children[0].onclick = function() {
    for(var i = 0;i<len;i++) {
        tar_city.appendChild(src_city.children[0]);
    }
}
//2.全部向左移动
btn_box.children[1].onclick = function() {
    for(var i = 0;i<len;i++) {
        src_city.appendChild(tar_city.children[0]);
    }
}
//3.选中的向右移动
btn_box.children[2].onclick = function() {
    for(var i = 0;i<len;i++) {
        var li = src_city.children[i];
        // 判断li是否被选中
        if(li.selected) {
            tar_city.appendChild(li);
            i --;
        }
    }
}
//4.选中的向左移动
btn_box.children[3].onclick = function() {
    for(var i = 0;i<len;i++) {
        var li = tar_city.children[i];
        // 判断li是否被选中
        if(li.selected) {
            src_city.appendChild(li);
            i --;
        }
    }
}
// 倒计时案例
// 编写一个函数，计算时间差

function getIntervalTime(startTime,endTime) {
    var intervalTime = endTime - startTime;
    // 转换为 天 时 分 秒
    intervalTime /= 1000;

    var day = Math.floor(intervalTime / 60 / 60 / 24);
    var hour = Math.floor(intervalTime / 60 / 60 % 24);
    var minute = Math.floor(intervalTime / 60 % 60);
    var second = Math.floor(intervalTime % 60);

    return {
        day: day,
        hour: hour,
        minute: minute,
        second: second
    }
}
// 倒计时

var endTime = new Date('2018-11-11');
countDown();
setInterval(countDown, 1000);

function countDown() {
    // 定时器 第一个参数 function 调用的时候，内部的this是window
    // console.log(this);//window
    // 获取当前日期
    var startTime = new Date();
    // 获取日期差

    var countTime = getIntervalTime(startTime,endTime);

    // 数值不够两位时补0

    countTime.day = countTime.day < 10 ? '0' + countTime.day : countTime.day;
    countTime.hour = countTime.hour < 10 ? '0' + countTime.hour : countTime.hour;
    countTime.minute = countTime.minute < 10 ? '0' + countTime.minute : countTime.minute;
    countTime.second = countTime.second < 10 ? '0' + countTime.second : countTime.second;

    var jk_docs_countdown = document.querySelector('.jk-docs-countdown');

    var day = jk_docs_countdown.querySelector('.day');
    var hour = jk_docs_countdown.querySelector('.hour');
    var minute = jk_docs_countdown.querySelector('.minute');
    var second = jk_docs_countdown.querySelector('.second');

    // innerText 兼容性
    setInnerText(day,countTime.day);
    setInnerText(hour,countTime.hour);
    setInnerText(minute,countTime.minute);
    setInnerText(second,countTime.second);
}

// 拖拽效果

var jk_drag_head = document.querySelector('.jk-drag-head');
var jk_drag_box = document.querySelector('.jk-drag-box');
var jkDrag = document.getElementById('jkDrag');

// 注册鼠标按下事件
jk_drag_head.onmousedown = function(e) {
    e = e || event;
    // 计算鼠标在盒子中的坐标 = 鼠标在页面中的坐标 - 盒子在页面中的坐标
    var x = getPage(e).pageX - jk_drag_box.offsetLeft;
    var y = getPage(e).pageY - jk_drag_box.offsetTop;

    // 鼠标移动时， 计算盒子的位置
     document.onmousemove = function(e) {
        // 盒子在页面中的坐标= 鼠标在页面中的坐标 - 鼠标在盒子中的坐标

        var boxX = getPage(e).pageX - x;
        var boxY = getPage(e).pageY - y;

        // 获取移动盒子的大小

        var jkDrag_w = jkDrag.offsetLeft + jkDrag.offsetWidth - jk_drag_box.offsetWidth;
        var jkDrag_h = jkDrag.offsetTop + jkDrag.offsetHeight - jk_drag_box.offsetHeight;

        // 控制盒子的移动范围

        if (boxX < jkDrag.offsetLeft) {
            boxX = jkDrag.offsetLeft;
        }
        if (boxY < jkDrag.offsetTop) {
            boxY = jkDrag.offsetTop;
        }

        if (boxX > jkDrag_w) {
            boxX = jkDrag_w;
        }
        if (boxY > jkDrag_h) {
            boxY = jkDrag_h;
        }
        jk_drag_box.style.left = boxX + 'px';
        jk_drag_box.style.top = boxY + 'px';
     }

     // 当鼠标移除时，移除事件

     document.onmouseup = function() {
        document.onmousemove = null;
     }
}

// 放大镜效果
// 获取元素
var magnifier_box = document.querySelector('.magnifier-box');
var jk_main_content = document.querySelector('.jk-main-content');

var smallBox = magnifier_box.querySelector('.small-img-box');
var smallImg = smallBox.querySelector('img.small-img');
var mask = smallBox.querySelector('.magnifier-mask');
var bigBox = magnifier_box.querySelector('.big-img-box');
var bigImg = bigBox.querySelector('img.big-img');

// 鼠标经过小盒子，遮盖层显示，大图显示
smallBox.onmouseenter = function() {
    bigBox.style.display = 'block';
    mask.style.display = 'block';
}
// 鼠标移除事件
smallBox.onmouseleave = function() {
    bigBox.style.display = 'none';
    mask.style.display = 'none';
}
// 鼠标在小盒子上移动时，遮盖层跟着移动

smallBox.onmousemove = function(e) {
    e = e || event;
    // 鼠标在小盒子中的位置 = 鼠标在页面中的位置 - 小盒子在页面中的位置
    var x = getPage(e).pageX - magnifier_box.offsetLeft - jk_main_content.offsetLeft;
    var y = getPage(e).pageY - magnifier_box.offsetTop - jk_main_content.offsetTop;

    // 让鼠标移动到自身的中点

    x -= mask.offsetWidth / 2;
    y -= mask.offsetHeight / 2;

    // 移动的范围大小
    var mask_w = smallBox.offsetWidth / 2;
    var mask_h = smallBox.offsetHeight / 2;
    // 向左边移动的最大距离
    if (x < magnifier_box.offsetLeft) {
        x = 0;
    }
    // 向上面移动的最大距离
    if (y < 0) {
        y = 0;
    }
    // // 向 右下角移动的最大距离

    if (x > mask_w) {
        x = mask_w;
    }
    if (y > mask_h) {
        y = mask_h;
    }
    // 遮盖层移动
    mask.style.left = x + 'px';
    mask.style.top = y + 'px';

    // 显示对应的大图
    // 计算大图片的偏移
    // mask移动的距离 / 大图片移动的距离 = mask最大移动的距离 / 大图片的最大移动量

    // 大图片的最大移动量 = mask移动的距离 * 大图片移动的距离 / mask最大移动的距离 

    // 大图片能够移动的最大距离

    var bigMaxX = bigImg.offsetWidth - bigBox.offsetWidth;
    var bigMaxY = bigImg.offsetHeight - bigBox.offsetHeight;

    var bigImgX = x * bigMaxX / mask_w;
    var bigImgY = y * bigMaxY / mask_h;

    bigImg.style.left = -bigImgX + 'px';
    bigImg.style.top = -bigImgY + 'px';

}

// 回到顶部

// 1. 获取元素
// 2. 当拖动滚动条时，页面滚出去的距离超过20px时，设置导航样式，显示回到顶部按钮
// 3. 回到顶部 导航回复原样式

var hearderNav = document.querySelector('.jk-docs-nav');
var goTop = document.querySelector('.go-top');
var jsSidebar = document.querySelector('.js-sidebar');

// 页面滚动时 注册事件

window.onscroll = function() {
    var scrollTop = getScroll().scrollTop;
    if (scrollTop >20) {
        // 设置导航条样式
        hearderNav.className = 'navbar jk-docs-nav navbar-fixed-top';
        goTop.style.display = 'block';
        jsSidebar.style.top = '60' + 'px';
    } else {
        // 恢复
        hearderNav.className = 'navbar jk-docs-nav';
        goTop.style.display = 'none';
        jsSidebar.style.top = '250' + 'px';
    }
}

// 回到顶部

var scrollTimerId = null

goTop.onclick = function () {
    if (scrollTimerId) {
        clearInterval(scrollTimerId);
    }

    scrollTimerId = setInterval(function () {
        var target = 0;
        var step = 20;
        var current = getScroll().scrollTop;

        if (current > target) {
            step = -Math.abs(step);
        }

        if (Math.abs(current - target) <= Math.abs(step)) {
            clearInterval(scrollTimerId);
            //设置目标位置

            document.documentElement.scrollTop = target;
            document.body.scrollTop = target;
        } 

        current += step;

        document.documentElement.scrollTop = current;
        document.body.scrollTop = current;
    }, 5);
}





