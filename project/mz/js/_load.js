$(function () {
    //二级菜单显示隐藏及head加载
    $('.header').load('../header.html');
    //加载footer
    $('.footer').load('../footer.html');

    // if (window.screen.availWidth <= 767) {
    if ($(window).width() < 767) {
        // 移动端
        // 已一级菜单
        $('.header').on('click', '.menu-icon', function () {
            $('.header .menu').toggle();
        });
        // 二级菜单
        $('.header').on('click', '.tab-menu a', function () {
            if ($(this).attr('submenu') == undefined) { return; }
            $(this).next().toggle();
            $(this).toggleClass('curr');
        });
        // 弹出搜索
        $('.header').on('click', '.menu-search', function () {
            // console.log($('.head-top').show())
            $('.head-top').toggle();
        });
    } else {
        var ___timer = null;
        // 二级菜单
        $('.header').on('mouseover', '.tab-menu a', function () {
            if (___timer) {
                var curr = $('.tab-menu a.curr');
                curr.next().hide();
                curr.removeClass('curr');
                clearTimeout(___timer);
            }
            var $this = $(this);

            $this.next().show();
            $this.addClass('curr');
        });
        $('.header').on('mouseout', '.tab-menu a', function () {
            // var t = Date.now()
            if (___timer) clearTimeout(___timer);
            var $this = $(this);
            ___timer = setTimeout(function () {
                // console.log('tab-menu-mouseout', Date.now() - t);
                $this.next().hide();
                $this.removeClass('curr');
            }, 100);
        });
        $('.header').on('mouseover', '.tab-menu .sub-menu', function () {
            if (___timer) clearTimeout(___timer);
        });
        $('.header').on('mouseout', '.tab-menu .sub-menu', function () {
            if (___timer) clearTimeout(___timer);
            var $this = $(this);
            // var t = Date.now()
            ___timer = setTimeout(function () {
                // console.log('sub-menu-mouseout', Date.now() - t);
                $this.hide();
                $this.prev().removeClass('curr');
            }, 100);
        });
    }
});