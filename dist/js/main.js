/*
* @Author: liyue2018
* @Date:   2018-04-08 16:20:05
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-05-22 23:16:37
*/

// import './node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './node_modules/bootstrap/dist/js/bootstrap.min.js';

$(function(){
    //固定导航
    $(window).on('scroll',function(e){
        if($(window).scrollTop() > $('.jk-docs-nav').height()){
            $('.jk-docs-nav').addClass('navbar-fixed-top').css('opacity','0.8');
            $('.jk-docs-header').css('margin-top','$(".jk-docs-nav").height + 10');
        }else{
            $('.jk-docs-nav').addClass('navbar-fixed-top').css('opacity','1');
            $('.jk-docs-header').css('margin-top','0');
        }
    });
    // 消息弹出框
    $('.jk-info-box').slideDown(1000).delay(2000).slideUp(1000);
    //呼吸灯效果
    $('.jk-docs-carousel').blnCarousel();


})
