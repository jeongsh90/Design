function initPagePin() {
    $(document).off("click.pageNav").on("click.pageNav", ".page-nav ul li a", function () {
        const li = $(this).parent();
        const navItems = $(".page-nav ul li");

        if (!li.hasClass("on")) {
            navItems.removeClass("on");
            li.addClass("on");
        }
    });
}

$(document).on("page-loaded", function () {
    initPagePin();
});

$(function () {
    initPagePin();
});
