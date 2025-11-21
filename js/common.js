$(function () {
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
            $('.snb .nav > ul > li > ul').stop().slideUp(200);

            li.addClass('on');
            $('.content-area').attr('id', 'main');

            $('.area-inner')
                .css({ opacity: 0 })
                .load('/main.html', function () {
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
                $('.snb .nav > ul > li').not(li).removeClass('on')
                $('.snb .nav > ul > li > ul').not(sub).stop().slideUp(200)

                li.addClass('on');
                sub.stop().slideDown(200);
            }
            return;
        }
        
        if (href && href.indexOf('.html') !== -1) {
            e.preventDefault();

            $('.snb .nav li').removeClass('on');
            $('.snb .nav > ul > li > ul').stop().slideUp(200);

            li.addClass('on');

            var pageName = href.replace('.html', '').replace('/', '');
            $('.content-area').attr('id', pageName);

            $('.area-inner')
                .css({ opacity: 0 })
                .load(href, function () {
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
        var pageName = href.replace('.html', '').replace('/', '');

        $('.snb .nav li').removeClass('on');
        parentLi.addClass('on');
        parentLi.children('ul').stop().slideDown(200);


        li.addClass('on');

        $('.content-area').attr('id', pageName);

        $('.area-inner')
            .css({ opacity: 0 })
            .load(href, function () {
                $(this).animate({ opacity: 1 }, 200);
            });
    });


    $('.area-inner').load('/main.html');
});
