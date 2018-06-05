/*
* @Author: liyue2018
* @Date:   2018-06-01 16:28:32
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-02 07:47:00
*/

function animate(element,target,callback) {
    // 判断之前是否开启了定时器
    if(element.timerId) {
        clearInterval(element.timerId);
    }

    element.timerId = setInterval(function() {
        // 目标位置
        // var target = 1000;
        // 当前坐标
        var current = element.offsetLeft;
        // 步进
        var step = 15;
        // 当前位置小于目标位置
        if(current > target) {
            // 取绝对值
            step = - Math.abs(step);
        }
        if (Math.abs(target - current) <= Math.abs(step)) {
            element.style.left = target + 'px';
            clearInterval(element.timerId);
            if (callback) {
                callback();
            }
            return;
        }
        current += step;
        element.style.left = current + 'px';
        }, 20);
}