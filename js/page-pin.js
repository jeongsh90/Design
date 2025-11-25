function initPagePin() {
    $(document).off("click.pageNav").on("click.pageNav", ".page-nav ul li a", function (e) {
        const li = $(this).parent();
        const navItems = $(".page-nav ul li");

        if (!li.hasClass("on")) {
            navItems.removeClass("on");
            li.addClass("on");
        }
        const href = $(this).attr("href");

        if (href.startsWith("#")) {
            setTimeout(() => {
                history.replaceState(null, "", " ");
            }, 1);
        }
    });
}

$(document).on("page-loaded", function () {
    initPagePin();
});

$(function () {
    initPagePin();
});
