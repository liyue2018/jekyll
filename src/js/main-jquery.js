/*
* @Author: liyue2018
* @Date:   2018-04-08 16:20:05
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-06-05 15:58:09
*/

// import './node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './node_modules/bootstrap/dist/js/bootstrap.min.js';

$(function(){

    //滚动监听

    $('body').scrollspy({target:'.jk-docs-sidebar'});
    //回到顶部
    $('.go-top').on('click',function(){
        $('html,body').stop().animate({scrollTop:0},3000);

        //scrollTop(0)可以瞬间上移
        // $(window).scrollTop(0);
    });

    //图片懒加载
        $('img.lazy').lazyload();

    //固定导航
    $(window).on('scroll',function(e){
        if($(window).scrollTop() > $('.jk-docs-nav').height()){
            $('.jk-docs-nav').addClass('navbar-fixed-top').css('opacity','0.8');
            $('.jk-docs-header').css('margin-top','$(".jk-docs-nav").height + 10');
        } else {
            $('.jk-docs-nav').addClass('navbar-fixed-top').css('opacity','1');
            $('.jk-docs-header').css('margin-top','50px');
        }
        // 回到顶部
        if($(window).scrollTop() >= 500){
            $('.go-top').stop().fadeIn(1000);
        }else{
            $('.go-top').stop().fadeOut(500);
        }
    });
    // 消息弹出框
    $('.jk-info-box').slideDown(1000).delay(2000).slideUp(1000);

    //呼吸灯效果
    $('.jk-docs-carousel').blnCarousel();

    //手风琴1效果
    var colors = ["green","blue","purple","yellow"];
    $('.accordion').accordion(colors,30);

    // 手风琴效果2

    $('.jk-docs-accordion_2 .groupTitle').click(function(){
        $(this).next().slideDown(200).parent().siblings().children('.content').slideUp(200);
    });
    //Tab选项卡
    $('.jk-docs-tab .tab-item').on('mouseenter',function(){
        $(this).addClass('active').siblings().removeClass('active');
        var idx = $(this).index();
        $('.jk-docs-tab .product-item').eq(idx).addClass('selected').siblings().removeClass('selected');
    });

    // 突出显示效果
    $('.exhibition-box li').mouseenter(function(){
        $(this).css('opacity','1').siblings().css('opacity','0.2');
    });
    $('.exhibition-box').mouseleave(function(){
        // $('.exhibition-box li').css('opacity','1');
        //chidren 子代选择器
        // $(this).children().children('li').css('opacity','1');
        //find后代选择器
        $(this).find('li').css('opacity','1');
    });

    // 美女相册
    $('.small-image a').on('click',function(){
        var href = $(this).attr('href');
        $('.large-image img').attr('src',href);
        $('.desc').text($(this).attr('title'));
        return false;
    });

    // 弹幕效果
    $('.submit-btn').on('click',function(){
        var colors = ['red','yellow','pink','blue','brown','hotpink','yellowgreen','cyan','purple','deepskyblue'];
        var randomColor = parseInt(Math.random() * colors.length);
        var randomY = parseInt(Math.random() * 400);
        $('<span></span>').text($('.barrage-text').val())
                          .css({
                            position:'absolute',
                            color:colors[randomColor],
                            left:1400,
                            top:randomY
                          })
                          // .css('position','absolute')
                          // .css('color',colors[randomColor])
                          // .css('left',1400)
                          // .css('top',randomY)
                          .animate({
                              left:-500
                              },
                              10000,'linear',function() {
                              /* stuff to do after animation is complete */
                              $(this).remove();
                          })
                          .appendTo('.area');
        });

    // 表格删除案例

    $('.jk-table-del .add-btn').on('click',function(){
        $('<tr><td>高数哈哈</td><td>电子信息工程学院</td><td><a href="javascript:void(0);" class="delet-btn">删除</a></td></tr>').appendTo($('.jk-table-del tbody'));
    });
    $('.jk-table-del .clear-btn').on('click',function(){
        $('.jk-table-del tbody').empty();
    });
    $('.jk-table-del tbody').on('click','.delet-btn',function(){
        $(this).parent().parent().hide();
    });

    // 城市选择案例

    //点击第一个按钮，全部到右边框里

    $('.btn-box .btn1').on('click',function(){
        $('.src-city>option').appendTo($('.tar-city'));
    });
    //点击第二个按钮，全部到左边框里
    $('.btn-box .btn2').on('click',function(){
        $('.tar-city>option').appendTo($('.src-city'));
    });
    //点击第三个按钮，选中的到右边框里
    $('.btn-box .btn3').on('click',function(){
        $('.src-city>option:selected').appendTo($('.tar-city'));
    });
    //点击第四个按钮，选中的到右边框里
    $('.btn-box .btn4').on('click',function(){
        $('.tar-city>option:selected').appendTo($('.src-city'));
    });

        //淘宝精品

     $('.left-wrapper>li').on('mouseenter',function(){
        $(this).addClass('active').siblings().removeClass('active');
        var idx = $(this).index();
        // $('.center-wrapper>li:eq('+idx+')').show().siblings().hide();
        $('.center-wrapper>li').eq(idx).show().siblings().hide();
    });
    $('.right-wrapper>li').on('mouseenter',function(){
        $(this).addClass('active').siblings().removeClass('active');
        var idx = $(this).index() + 5;
        $('.center-wrapper>li').eq(idx).show().siblings().hide();
    });

    //评论发布案例
    $('.send-btn').on('click',function(){
        if($('.comment').val().trim().length == 0){
            return;
        }
        $('<li></li>').text($('.comment').val()).appendTo($('.comments'));
        $('.comment').val('')
    });

    // 星级评分
    //给li注册鼠标进入事件

    $('.stars-list>li').on('mouseenter',function(e) {
        var wjx_s = '★';
        var wjx_k = '☆';
        /* Act on the event */
        // $(this).text('★').prevAll().text('★');
        // $(this).nextAll().text('☆');

        //end()方法的使用

        $(this).text('★').prevAll().text('★').end().nextAll().text('☆');
    });
    //给ul注册鼠标离开事件

    $('.stars-list').on('mouseleave',function(e) {
        /* Act on the event */
        //让所有的变实星
        $(this).children().text('☆');
        //让当前被点击的及其之前都变实星
        $(this).children('li.current').text('★').prevAll().text('★');
    });
    //给li注册点击事件
    $('.stars-list>li').on('click',function(e){
        $(this).addClass('current').siblings().removeClass('current');
    });

    //each方法
    $('.opacity-wrapper li').each(function(index,element){
        $(element).css('opacity',(index + 1) / 10);
    });

    //全选和反选按钮
    $('.select-btns .all-btn').on('click',function(){
        // $('.select-inputs input').attr('checked','checked');
        // $('.select-inputs input').attr('checked',true);

        //boolean类型的属性，使用prop方法
        $('.select-inputs input').prop('checked',true);
    });
    $('.select-btns .cancel-btn').on('click',function(){
        // $('.select-inputs input').attr('checked','checked');
        $('.select-inputs input').prop('checked',false);
    });
    $('input[name="checkBox"]').on('click',function(){
        var num = $('input:checked').length;
        $('.text-info').text(num + '种水果被选中了');
    });

    //全选表单
    $('.allChecked').on('click',function(){
       $('.inputCheck input').prop('checked',$(this).prop('checked'));
    });

    $('.inputCheck input').on('click',function(){
        var checkedLength = $('.inputCheck input:checked').length;
        var inputLength = $('.inputCheck input').length;
        if(checkedLength == inputLength){
            $('.allChecked').prop('checked',true);
        }else{
            $('.allChecked').prop('checked',false);
        }
    });

    //下拉菜单

    //鼠标进入事件mouseenter
    $('.first-menu-item').mouseenter(function(){
        $(this).children('ul.second-menu').stop().slideDown();
    });
    //鼠标离开时事件mouseleave
    $('.first-menu-item').mouseleave(function(){
        $(this).children('ul.second-menu').stop().slideUp();
    });

    // 音乐导航
    $('.music-nav li.nav-item').mouseenter(function() {
        /* Act on the event */
        $(this).children('span').stop().animate({top:0});
    }).mouseleave(function() {
        /* Act on the event */
        $(this).children('span').stop().animate({top:'60px'});
    });

    //节流阀：按下时触发，如果没有弹起，不让触发下一次

    var flag = true;

    //按下1-9数字键，触发对应的mouseenter事件

    $(document).on('keydown',function(e){
        if(flag){
            flag = false;
            console.log(e.keyCode);
            var code = e.keyCode;
            if(code >= 49 && code <= 53){
               //触发对应的li的mouseenter事件
               $('.music-nav li.nav-item').eq(code - 49).trigger('mouseenter');
            }
        }
    });
    $(document).on('keyup',function(e){
        flag = true;
        // console.log(e.keyCode);
        var code = e.keyCode;
        if(code >= 49 && code <= 53){
            //触发对应的li的mouseleave事件
            $('.music-nav li.nav-item').eq(code - 49).mouseleave();
        }
    });




})


