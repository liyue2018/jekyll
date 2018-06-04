/*
* @Author: liyue2018
* @Date:   2018-05-22 23:38:15
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-02 06:57:28
*/
$(function(){
  // 手风琴效果
  
  $.fn.accordion = function(colors,width){
    colors = colors || [];
    width = width || 0;
    var $li = this.find('li.item');
    // console.log($li.length - 1)
    var boxLength = this.width();
    var maxLength = boxLength - ($li.length) * width;
    var avgLength = boxLength / ($li.length + 1);

    //更改li的背景色
    $li.each(function(i,e){
        $(e).css('backgroundColor',colors[i]);
    });

    //给所有的li注册鼠标经过事件
    $li.on('mouseenter',function(){
        $(this).stop().animate({width:maxLength}).siblings().stop().animate({width: width});
    });

    //给所有的li注册鼠标离开事件
    $li.on('mouseleave',function(){
        $li.stop().animate({width:avgLength});
    });
    return this;
  }
})