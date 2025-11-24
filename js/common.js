$(function () {

    function getRootText() {
        return $('.snb .nav > ul > li').first().children('a').text().trim();
    }

    function getMenuTitle(li) {
        var parentLi = li.closest('ul').closest('li');
        if (parentLi.length > 0) {
            return li.children('a').first().text().trim();
        }
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
            var depth2 = li.children('a').first().text().trim();

            crumbs.push(root);

            if (depth1 && depth1 !== root) crumbs.push(depth1);
            if (depth2 && depth2 !== depth1) crumbs.push(depth2);
            if (title && title !== depth2) crumbs.push(title);
        }

        var html = '<ul class="breadcrumb">';
        crumbs.forEach(function (c) { html += '<li>' + c + '</li>' });
        html += '</ul>';

        $('.page-head').find('.breadcrumb').remove();
        $('.page-head').append(html);
    }

    function fixPath(href) {
        if (!href) return '';
        var clean = href.replace(/^\/+/, '');
        if (clean === 'index.html') return '/main.html';
        if (clean === 'main.html') return '/main.html';
        if (clean.startsWith('content/')) return '/' + clean;
        return '/content/' + clean;
    }

    $('.snb .nav > ul > li').each(function () {
        if ($(this).children('ul').length === 0) $(this).addClass('no-sub');
    });

    $('.snb .nav > ul > li > ul').hide();
    $('.snb .nav > ul > li.on > ul').show();

    $('.snb .nav > ul > li > a, .snb .logo').on('click', function (e) {
        var li = $(this).parent('li');
        var href = fixPath($(this).attr('href'));
        var sub = li.children('ul');

        if ($(this).hasClass('logo') || href === '/main.html') {
            e.preventDefault();
            $('.snb .nav li').removeClass('on');
            li.addClass('on');
            $('.snb .nav > ul > li > ul').stop().slideUp(200);

            $('.content-area').attr('id', 'HOME');

            $('.area-inner')
                .css({ opacity: 0 })
                .load('/main.html', function () {
                    var title = getRootText();
                    ensurePageHead(title);
                    updateBreadcrumb(li, title);
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
                $('.snb .nav li').not(li).removeClass('on');
                $('.snb .nav > ul > li > ul').not(sub).stop().slideUp(200);
                li.addClass('on');
                sub.stop().slideDown(200);
            }
            return;
        }

        if (href.endsWith('.html')) {
            e.preventDefault();
            $('.snb .nav li').removeClass('on');
            li.addClass('on');
            $('.snb .nav > ul > li > ul').stop().slideUp(200);

            var title = getMenuTitle(li);

            $('.content-area').attr('id', title);

            $('.area-inner')
                .css({ opacity: 0 })
                .load(href, function () {
                    ensurePageHead(title);
                    updateBreadcrumb(li, title);
                    $(this).animate({ opacity: 1 }, 200);
                });
        }
    });

    $('.snb .nav > ul > li > ul li > a').on('click', function (e) {
        e.preventDefault();
        var href = fixPath($(this).attr('href'));

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
            .load(href, function () {
                ensurePageHead(title);
                updateBreadcrumb(li, title);
                $(this).animate({ opacity: 1 }, 200);
            });
    });

    $('.area-inner').load('/main.html', function () {
        var root = getRootText();
        $('.content-area').attr('id', root);
        ensurePageHead(root);
        var li = $('.snb .nav > ul > li').first();
        updateBreadcrumb(li, root);
    });

});
