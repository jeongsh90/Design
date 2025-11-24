(function () {

    function initCustomScrollbarFor(body) {
        var container = body.find('.container');
        if (!container.length) return;

        if (body.find('.scroll-bar').length === 0) {
            body.prepend('<div class="scroll-bar"><span></span></div>');
        }

        var bar = body.find('.scroll-bar');
        var thumb = bar.find('span');

        function updateScrollbar() {
            var contentHeight = container[0].scrollHeight;
            var visibleHeight = container.innerHeight();
            var ratio = visibleHeight / contentHeight;

            if (contentHeight <= visibleHeight) {
                bar.hide();
                return;
            }

            bar.show();
            thumb.css('height', visibleHeight * ratio + 'px');
        }

        container.off('scroll._customScrollbar').on('scroll._customScrollbar', function () {
            var contentHeight = container[0].scrollHeight;
            var visibleHeight = container.innerHeight();
            var scrollTop = container.scrollTop();
            var ratio = scrollTop / (contentHeight - visibleHeight);
            var barHeight = bar.height();
            var thumbHeight = thumb.height();
            var thumbTop = (barHeight - thumbHeight) * ratio;
            thumb.css('top', thumbTop + 'px');
        });

        var dragging = false;
        var startY = 0;
        var startTop = 0;

        thumb.off('mousedown._customScrollbar').on('mousedown._customScrollbar', function (e) {
            dragging = true;
            startY = e.clientY;
            startTop = parseInt(thumb.css('top')) || 0;
            e.preventDefault();
        });

        $(document).off('mousemove._customScrollbar').on('mousemove._customScrollbar', function (e) {
            if (!dragging) return;

            var dy = e.clientY - startY;
            var newTop = startTop + dy;

            var barHeight = bar.height();
            var thumbHeight = thumb.height();

            if (newTop < 0) newTop = 0;
            if (newTop > barHeight - thumbHeight) newTop = barHeight - thumbHeight;

            thumb.css('top', newTop + 'px');

            var scrollRatio = newTop / (barHeight - thumbHeight);
            var contentHeight = container[0].scrollHeight;
            var visibleHeight = container.innerHeight();
            container.scrollTop((contentHeight - visibleHeight) * scrollRatio);
        });

        $(document).off('mouseup._customScrollbar').on('mouseup._customScrollbar', function () {
            dragging = false;
        });

        updateScrollbar();
        $(window).on('resize', updateScrollbar);
    }

    function initCustomScrollbars() {
        $('.page-body').each(function () {
            initCustomScrollbarFor($(this));
        });
    }

    var observer = new MutationObserver(function () {
        setTimeout(initCustomScrollbars, 20);
    });

    observer.observe(document.body, { childList: true, subtree: true });

    $(document).ready(function () {
        setTimeout(initCustomScrollbars, 50);
    });

})();
