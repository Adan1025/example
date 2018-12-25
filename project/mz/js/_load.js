$(function () {
    //二级菜单显示隐藏及head加载
    $('.header').load('../header.html');
    //加载footer
    $('.footer').load('../footer.html');

    $('.header').on('click', '.dropdown-toggle', function () {
        var parent = $(this).parent();
        console.log(parent)
        if (parent.hasClass('sub-curr')) {
            parent.removeClass('sub-curr');
        } else {
            $('.sub-curr').removeClass('sub-curr');
            parent.addClass('sub-curr');
        }
    })
    // $('.header').on('mouseover', '#menuList .tab-menu,#menuList .sub-menu', function () {
    //     $(this).children('.sub-menu').show();
    // });
    // $('.header').on('mouseout', '#menuList .tab-menu,#menuList .sub-menu', function () {
    //     $(this).children('.sub-menu').hide();
    // });

    $('.header').on('mouseover mouseout', '#menuList .tab-menu,#menuList .sub-menu', function () {
        console.log(this.className)
        console.log($(this).hasClass('dropdown-toggle'))
        if ($(this).hasClass('dropdown-toggle')) {
            $(this).trigger('click');
        }
    });
});