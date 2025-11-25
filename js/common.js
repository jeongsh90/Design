$(function () {

    function getBasePath() {
        const path = window.location.pathname;
        if (path.split('/').length >= 3) {
            const repo = path.split('/')[1];
            return '/' + repo + '/';
        }
        return '';
    }

    const base = getBasePath();

    // ----------------------------------------------------

    // 🔥 파일명 기반 ID 추출
    function getIdFromHref(href) {
        if (!href) return 'page';

        href = href.replace(base, "");       // base 제거
        href = href.split("?")[0];           // 파라미터 제거
        const file = href.split("/").pop();  // 파일명 추출
        return file.replace(".html", "");    // 확장자 제거
    }

    function fixPath(href) {
        if (!href) return '';
        href = href.replace(/^\/+/, '');
        if (href === 'index.html') href = 'main.html';
        return base + href;
    }

    function getRootText() {
        return $('.snb .nav > ul > li').first().children('a').text().trim();
    }

    function getMenuTitle(li) {
        return li.children('a').first().text().trim();
    }

    function ensurePageHead(title) {
        if ($('.area-inner .page-head').length === 0) {
            $('.area-inner').prepend('<div class="page-head"><h2>' + title + '</h2></div>');
        } else {
            $('.page-head h2').text(title);
        }
    }

    function updateBreadcrumb(li, title) {
        var root = getRootText();
        var crumbs = [];

        if (title === root) {
            crumbs = [root];
        } else {
            var depth1 = li.closest('.nav > ul > li').children('a').first().text().trim();
            var depth2 = title;

            crumbs.push(root);

            if (depth1 && depth1 !== root) crumbs.push(depth1);
            if (depth2 && depth2 !== depth1) crumbs.push(depth2);
        }

        var html = '<ul class="breadcrumb">';
        crumbs.forEach(c => html += '<li>' + c + '</li>');
        html += '</ul>';

        $('.page-head').find('.breadcrumb').remove();
        $('.page-head').append(html);
    }

    // ----------------------------------------------------

    $('.snb .nav > ul > li').each(function () {
        if ($(this).children('ul').length === 0) {
            $(this).addClass('no-sub');
        }
    });

    $('.snb .nav > ul > li > ul').hide();
    $('.snb .nav > ul > li.on > ul').show();

    // ----------------------------------------------------
    // 🔥 1뎁스 메뉴 클릭 처리
    // ----------------------------------------------------
    $('.snb .nav > ul > li > a, .snb .logo').on('click', function (e) {

        var li = $(this).parent('li');
        var rawHref = $(this).attr('href');
        var href = fixPath(rawHref);
        var sub = li.children('ul');

        // HOME / 로고 클릭
        if ($(this).hasClass('logo') || href.endsWith('main.html')) {
            e.preventDefault();

            $('.snb .nav li').removeClass('on');
            li.addClass('on');
            $('.snb .nav > ul > li > ul').slideUp(200);

            // ID = 파일명(main)
            $('.content-area').attr('id', 'main');

            $('.area-inner')
                .css({ opacity: 0 })
                .load(base + 'main.html', function () {
                    var title = getRootText();
                    ensurePageHead(title);
                    updateBreadcrumb(li, title);
                    $(this).animate({ opacity: 1 }, 200);
                });

            return;
        }

        // 아코디언 메뉴
        if (sub.length > 0) {
            e.preventDefault();
            if (li.hasClass('on')) {
                li.removeClass('on');
                sub.slideUp(200);
            } else {
                $('.snb .nav li').not(li).removeClass('on');
                $('.snb .nav > ul > li > ul').not(sub).slideUp(200);
                li.addClass('on');
                sub.slideDown(200);
            }
            return;
        }

        // HTML 페이지 로드
        if (href.endsWith('.html')) {
            e.preventDefault();

            $('.snb .nav li').removeClass('on');
            li.addClass('on');
            $('.snb .nav > ul > li > ul').slideUp(200);

            var title = getMenuTitle(li);

            // 🔥 id = 파일명 기반
            const pageId = getIdFromHref(rawHref);
            $('.content-area').attr('id', pageId);

            $('.area-inner')
                .css({ opacity: 0 })
                .load(href, function () {
                    ensurePageHead(title);
                    updateBreadcrumb(li, title);
                    $(this).animate({ opacity: 1 }, 200);
                });
        }
    });

    // ----------------------------------------------------
    // 🔥 2뎁스 메뉴 클릭 처리
    // ----------------------------------------------------
    $('.snb .nav > ul > li > ul li > a').on('click', function (e) {
        e.preventDefault();

        var rawHref = $(this).attr('href');
        var href = fixPath(rawHref);

        var li = $(this).parent('li');
        var parentLi = li.closest('ul').closest('li');

        $('.snb .nav li').removeClass('on');
        parentLi.addClass('on');
        parentLi.children('ul').slideDown(200);
        li.addClass('on');

        var title = getMenuTitle(li);

        // 🔥 id = 파일명 기반
        const pageId = getIdFromHref(rawHref);
        $('.content-area').attr('id', pageId);

        $('.area-inner')
            .css({ opacity: 0 })
            .load(href, function () {
                ensurePageHead(title);
                updateBreadcrumb(li, title);
                $(this).animate({ opacity: 1 }, 200);
            });
    });

    // ----------------------------------------------------
    // 초기 로드(main.html)
    // ----------------------------------------------------
$('.area-inner').load(base + 'main.html', function () {
// $('.area-inner').load(base + 'content/page-color.html', function () {
    var root = getRootText();
    $('.content-area').attr('id', 'main');
    // $('.content-area').attr('id', 'page-color');
    ensurePageHead(root);
    var li = $('.snb .nav > ul > li').first();
    updateBreadcrumb(li, root);
});

});


