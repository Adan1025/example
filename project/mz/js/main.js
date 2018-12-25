$(function () {
    //机场服务tab切换
    $(document).on('click', '.air-service-list', function () {
        var item = $(this).index();
        $('.air-service-list').removeClass('curr');
        $(this).addClass('curr');
        $('.air-service-details' + item)
            .show()
            .siblings('.air-service-details')
            .hide();
    });
});
