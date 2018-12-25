$(function() {
    //机场服务tab切换
    $(document).on('click', '.air-service-list', function() {
        var item = $(this).index();
        $('.air-service-list').removeClass('curr');
        $(this).addClass('curr');
        $('.air-service-details' + item)
            .show()
            .siblings('.air-service-details')
            .hide();
    });
    //根据默认加载时屏幕宽度来控制菜单显示隐藏
    var screenW = $(window).width();
    if (screenW > 768) {
        $('.pc-air-service').show();
        $('.m-air-service').hide();
    } else {
        $('.m-air-service').show();
        $('.pc-air-service').hide();
    }

    //实时监听屏幕大小
    $(window).resize(function() {
        var screenW = $(window).width();
        if (screenW > 767) {
            $('.pc-air-service').show();
            $('.m-air-service').hide();
        } else {
            $('.m-air-service').show();
            $('.pc-air-service').hide();
        }
    });

    // moblie 下拉菜单
    $('.m-air-servicetab').on('click', '#mAirSerTab', function() {
        $('.caret').toggleClass('m-transform');
    });
});
