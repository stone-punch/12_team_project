$(document).ready(function(){

    //탭메뉴 공지사항

    $("#sub-content .notice-gel h3").click(function () {
        $("#sub-content .notice-gel h3").removeClass("on");
        $(this).addClass("on");
        $("#sub-content .notice-gel ul").removeClass("on");
        $(this).next("ul").addClass("on");


    });
});