jQuery(document).ready(function($){

    jQuery.fn.slideFadeToggle = function(speed, easing, callback) {
      return this.animate({opacity: 'toggle', height: 'toggle'}, speed, easing, callback);
    };

    $('.show_captions').click( function() {
        $(this).parents('.flexslider').find(".flex-caption").each(function (i) {
        if (this.style.display == "none") {
          $(this).show().animate({opacity:1}, 500);
        } else {
          $(this).animate({opacity:0}, 500, function(){$(this).hide();});
        }
      });

        $(this).attr('title',$(this).attr('title') == '显示图片描述' ? '隐藏图片描述' : '显示图片描述');
        return false;
    });
    // 模拟.show_thumbnails点击
    $('.show_thumbnails').click( function() {
        $(this).parents('.flexslider').find('ul.gpp_slideshow_thumbnails').slideFadeToggle();
        $(this).attr('title',$(this).attr('title') == '显示图片列表' ? '隐藏图片列表' : '显示图片列表');
        return false;
    }).click();
    // Disables right click on images
    // $('img').bind("contextmenu", function(e) {
       // e.preventDefault();
    // });
});