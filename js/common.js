$(function () {

    function getRootText() {
        return $('.snb .nav > ul > li').first().children('a').text().trim();
    }

    function getMenuTitle(li) {
        var depth2 = li.children('a').text().trim();
        var depth1 = li.closest('.nav > ul > li').children('a').first().text().trim();
        return depth2 || depth1;
    }

    function isIndexPage() {
        return $('.content-area').attr('id') === 'index';
    }

    function ensurePageHead(title) {
        if ($('.area-inner .page-head').length === 0) {
            $('.area-inner').prepend('<div class="page-head"><h2>' + title + '</h2></div>');
        } else {
            if ($('.page-head h2').length === 0) {
                $('.page-head').prepend('<h2>' + title + '</h2>');
            } else {
                $('.page-head h2').text(title);
            }
        }
    }

    function updateBreadcrumb(li, title) {
        if (isIndexPage()) {
            $('.page-head').html('<h2>index</h2><ul class="breadcrumb"><li>index</li></ul>');
            return;
        }

        var text = li ? li.children('a').text().trim() : '';
        if (title === 'HOME' || text === 'HOME') {
            $('.page-head').html('<h2>HOME</h2><ul class="breadcrumb"><li>HOME</li></ul>');
            return;
        }

        var root = getRootText();
        var crumbs = [root];

        var depth1 = li.closest('.nav > ul > li').children('a').first().text().trim();
        if (depth1 && depth1 !== root) crumbs.push(depth1);

        var depth2 = li.children('a').first().text().trim();
        if (depth2 && depth2 !== depth1) crumbs.push(depth2);

        if (title && title !== depth2) crumbs.push(title);

        var html = '<ul class="breadcrumb">';
        crumbs.forEach(function (c) { html += '<li>' + c + '</li>'; });
        html += '</ul>';

        if ($('.page-head .breadcrumb').length === 0) {
            $('.page-head').append(html);
        } else {
            $('.page-head .breadcrumb').replaceWith(html);
        }
    }

    $('.snb .nav > ul > li').each(function () {
        var sub = $(this).children('ul');
        if (sub.length === 0) $(this).addClass('no-sub');
    });

    $('.snb .nav > ul > li > ul').hide();
    $('.snb .nav > ul > li.on > ul').show();

    $('.snb .nav > ul > li > a, .snb .logo').on('click', function (e) {
        var li = $(this).parent('li');
        var href = $(this).attr('href');
        var sub = li.children('ul');

        if ($(this).hasClass('logo') || href === '/main.html') {
            e.preventDefault();

            $('.snb .nav li').removeClass('on');
            li.addClass('on');
            $('.snb .nav > ul > li > ul').stop().slideUp(200);

            $('.content-area').attr('id', 'HOME');

            $('.area-inner')
                .css({ opacity: 0 })
                .load('/main.html .area-inner > *', function () {
                    ensurePageHead('HOME');
                    updateBreadcrumb(li, 'HOME');
                    $(this).animate({ opacity: 1 }, 200);
                });
            return;
        }

        if (sub.length > 0) {
            e.preventDefault();
            if (li.hasClass('on')) {
                li.removeClass('on');
                sub.stop().slideUp(200);
            } else {
                $('.snb .nav > ul > li').not(li).removeClass('on');
                $('.snb .nav > ul > li > ul').not(sub).stop().slideUp(200);
                li.addClass('on');
                sub.stop().slideDown(200);
            }
            return;
        }

        if (href && href.indexOf('.html') !== -1) {
            e.preventDefault();

            $('.snb .nav li').removeClass('on');
            li.addClass('on');
            $('.snb .nav > ul > li > ul').stop().slideUp(200);

            var title = getMenuTitle(li);
            $('.content-area').attr('id', title);

            $('.area-inner')
                .css({ opacity: 0 })
                .load(href + ' .area-inner > *', function () {
                    ensurePageHead(title);
                    updateBreadcrumb(li, title);
                    $(this).animate({ opacity: 1 }, 200);
                });
        }
    });

    $('.snb .nav > ul > li > ul li > a').on('click', function (e) {
        var href = $(this).attr('href');
        if (!href || href.indexOf('.html') === -1) return;

        e.preventDefault();
        var li = $(this).parent('li');
        var parentLi = li.closest('ul').closest('li');

        $('.snb .nav li').removeClass('on');
        parentLi.addClass('on');
        parentLi.children('ul').stop().slideDown(200);
        li.addClass('on');

        var title = getMenuTitle(li);
        $('.content-area').attr('id', title);

        $('.area-inner')
            .css({ opacity: 0 })
            .load(href + ' .area-inner > *', function () {
                ensurePageHead(title);
                updateBreadcrumb(li, title);
                $(this).animate({ opacity: 1 }, 200);
            });
    });

    $('.area-inner').load('/index.html .area-inner > *', function () {
        $('.content-area').attr('id', 'index');
        ensurePageHead('index');
        updateBreadcrumb(null, 'index');
    });

});
