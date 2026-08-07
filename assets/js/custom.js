$(document).ready(function () {
    "use strict";

    // 1. Back to top
    var $toTop = $('#mn-to-top');
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 500) {
            $toTop.fadeIn(150);
        } else {
            $toTop.fadeOut(150);
        }
    });
    $toTop.hide().on('click', function () {
        $('html, body').stop().animate({ scrollTop: 0 }, 900);
    });

    // 2. Nav shrink on scroll
    var $nav = $('#mn-nav');
    function updateNav() {
        if ($(window).scrollTop() > 40) {
            $nav.addClass('mn-nav-scrolled');
        } else {
            $nav.removeClass('mn-nav-scrolled');
        }
    }
    updateNav();
    $(window).on('scroll', updateNav);

    // 3. Mobile menu toggle
    var $toggle = $('#mn-nav-toggle');
    var $mobile = $('#mn-nav-mobile');
    $toggle.on('click', function () {
        $toggle.toggleClass('mn-open');
        $mobile.toggleClass('mn-open');
    });
    $mobile.find('a').on('click', function () {
        $toggle.removeClass('mn-open');
        $mobile.removeClass('mn-open');
    });

    // 4. Smooth scroll for in-page links
    $('.smooth-menu').on('click', function (event) {
        var href = $(this).attr('href');
        if (href && href.charAt(0) === '#' && $(href).length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: $(href).offset().top - 70
            }, 900);
        }
    });

    // 5. Custom cursor (pointer devices only)
    var isFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var $cursor = $('#mn-cursor');
    if (isFinePointer && $cursor.length) {
        var cx = 0, cy = 0, tx = 0, ty = 0;
        $(window).on('mousemove', function (e) {
            tx = e.clientX;
            ty = e.clientY;
        });
        (function loop() {
            cx += (tx - cx) * 0.2;
            cy += (ty - cy) * 0.2;
            $cursor.css('transform', 'translate(' + cx + 'px, ' + cy + 'px) translate(-50%, -50%)');
            requestAnimationFrame(loop);
        })();
        $(document).on('mouseenter', 'a, button, .mn-pill', function () {
            $cursor.addClass('mn-cursor-hover');
        });
        $(document).on('mouseleave', 'a, button, .mn-pill', function () {
            $cursor.removeClass('mn-cursor-hover');
        });
    } else {
        $cursor.hide();
    }

    // 6. Scroll-reveal
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        document.querySelectorAll('.reveal-init').forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal-init').forEach(function (el) {
            el.classList.add('in-view');
        });
    }

});
