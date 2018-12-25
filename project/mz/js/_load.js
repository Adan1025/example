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
        $('.header').on('click', '.head-search', function () {
            // ($('.head-top').show())
            $('.head-top').toggle();
        });
    } else {
        var ___timer = null;
        var ___submenu = false;
        // 二级菜单
        $('.header').on('mouseover', '.tab-menu a', function () {
            if (___timer && !___submenu) {
                var curr = $('.tab-menu a.curr');
                curr.next().hide();
                curr.removeClass('curr');
                clearTimeout(___timer);
            }
            var $this = $(this);
            ___submenu = false;
            $this.next().show();
            $this.addClass('curr');
        });
        $('.header').on('mouseout', '.tab-menu a', function () {
            // var t = Date.now()
            if (___timer) clearTimeout(___timer);
            if (___submenu) return;
            var $this = $(this);
            ___timer = setTimeout(function () {
                // ('tab-menu-mouseout', Date.now() - t);
                $this.next().hide();
                $this.removeClass('curr');
                ___submenu = false;
            }, 100);
        });
        $('.header').on('mouseover', '.tab-menu .sub-menu,.tab-menu .sub-menu li,.tab-menu .sub-menu a', function () {
            if (___timer) clearTimeout(___timer);
            ___submenu = true;
        });
        $('.header').on('mouseout', '.tab-menu .sub-menu', function (e) {
            (e.target)
            if (___timer) clearTimeout(___timer);
            var $this = $(this);
            ___timer = setTimeout(function () {
                $this.hide();
                $this.prev().removeClass('curr');
                ___submenu = false;
            }, 100);
        });
    }
});