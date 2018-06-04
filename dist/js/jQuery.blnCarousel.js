/*
* @Author: liyue2018
* @Date:   2018-05-22 22:54:05
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-02 16:34:42
*/
 // 呼吸灯效果插件的封装
 $(function(){
    $.fn.blnCarousel = function(){
        let count = 0;
        let intervalTime = 3000;
        var $arrow_r = this.find('.arrow-right');
        var $arrow_l = this.find('.arrow-left');
        var $slider_li =  this.find('ul.slider>li');
        var $indicators_li = this.find('ol.indicators>li');
        //右箭头
        $arrow_r.on('click',function(){
            count++;
            if(count == $slider_li.length){
                count = 0;
            }
            $slider_li.eq(count).fadeIn().siblings().fadeOut();
            $indicators_li.eq(count).addClass('active').siblings().removeClass('active');
        });
        //左箭头
        $arrow_l.on('click',function(){
            count--;
            if(count == -1){
                count = $slider_li.length - 1;
            }
            $slider_li.eq(count).fadeIn().siblings().fadeOut();
            $indicators_li.eq(count).addClass('active').siblings().removeClass('active');
        });
        // 点击圆点切换
        $indicators_li.each(function(index, el) {
            $(el).on('click', function() {
                $(this).addClass('active').siblings().removeClass('active');
                $($slider_li[index]).fadeIn().siblings().fadeOut();
            })
        });

        return this;
    }
 })

