var $loader = $('.loader');
var $body = $('html, body');

if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            $loader.hide();
            $body.removeClass('overflow');
            init();
        }, 1000);
    }, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', function() {
        setTimeout(function() {
            $loader.hide();
            $body.removeClass('overflow');
            init();
        }, 1000);
    });
}

function init() {
    $(function() {
        var $animate = false;
        var $doAnimate = false;
        var isScrollig = false;
        var $body = $('body');
        var $arrowDown = $('.down-arrow');
        var tl = new TimelineLite();
        var $verticalText = $('.vertiacal-text');
        var $horizontalText = $('.horizontal-text');
        var $avatar = $('.avatar');
        var $headerTitle = $('.header-title');
        var $headerHeight = $('.header').outerHeight();
        var $headerWidth = $('.header').outerWidth();
        var $portfolio = $('#portfolio');
        var $portfolioItem = $('.portfolio-item');
        var hasTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 1));
        var lastScrollTop = 0;
        var timer;

        if (hasTouch) {
            $body.addClass('has-touch');
        } else {
            $body.addClass('no-touch');
        }

        /*var drawDiagram = function(el, container, color, start, end) {
            var canvas = document.getElementById(el);
            canvas.width = $(container).outerWidth();
            canvas.height = $(container).outerWidth();
            var text = $('.skill__text');
            var context = canvas.getContext('2d');
            var x = canvas.width / 2;
            var y = canvas.height / 2;
            var radius = canvas.width / 2 - canvas.width / 20;
            var endPercent = end;
            var curPerc = start;
            var counterClockwise = false;
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var arc = {
                x: x,
                y: y,
                start: -(quart),
                end: -(quart)
            };

            var animate = function animate() {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.beginPath();
                context.arc(x, y, radius, -(quart), arc.end, false);
                context.stroke();
            };

            var showText = function() {
                TweenLite.to(text, 0.5, {
                    opacity: 1
                });
            };

            context.lineWidth = canvas.width / 10;
            context.strokeStyle = color;

            TweenLite.to(arc, 3, {
                end: ((circ) * endPercent / 100) - quart,
                force3D: 'auto',
                onUpdate: animate,
                onComplete: function() {
                    showText();
                    $doAnimate = true;
                }
            });
        };

        var resizeDiagrame = function(el, container, end) {
            var canvas = document.getElementById(el);
            canvas.width = $(container).outerWidth();
            canvas.height = $(container).outerWidth();
            var context = canvas.getContext('2d');
            var x = canvas.width / 2;
            var y = canvas.height / 2;
            var radius = canvas.width / 2 - canvas.width / 20;
            var counterClockwise = false;
            var circ = Math.PI * 2;
            var quart = Math.PI / 2;
            var endPercent = ((circ) * end / 100) - quart;

            context.lineWidth = canvas.width / 10;
            context.beginPath();
            context.arc(x, y, radius, -quart, endPercent, false);
            context.stroke();
        };*/

        /** http: //stackoverflow.com/a/3647634 **/
        var getDirection = function(el, coordinates) {

            // the width and height of the current div
            var w = el.outerWidth(),
                h = el.outerHeight(),

                // calculate the x and y to get an angle to the center of the div from that x and y.
                // gets the x value relative to the center of the DIV and "normalize" it
                x = (coordinates.x - el.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
                y = (coordinates.y - el.offset().top - (h / 2)) * (h > w ? (w / h) : 1),

                // the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
                // first calculate the angle of the point,
                // add 180 deg to get rid of the negative values
                // divide by 90 to get the quadrant
                // add 3 and do a modulo by 4 to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
                direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;

            return direction;

        };

        var animationTo = function(cor, obj, el) {
            var animationTo;
            var direction = getDirection(obj, cor);
            var animation;

            switch (direction) {
                case 0:
                    animation = TweenLite.fromTo(el, 0.5, {
                        x: 0,
                        y: -200
                    }, {
                        y: 0,
                        delay: 0.05,
                        force3D: 'auto',
                        ease: new Ease(BezierEasing(0.145, 0.055, 0.050, 0.870))
                    });
                    break;
                case 1:
                    animation = TweenLite.fromTo(el, 0.5, {
                        x: 200,
                        y: 0
                    }, {
                        x: 0,
                        delay: 0.05,
                        force3D: 'auto',
                        ease: new Ease(BezierEasing(0.145, 0.055, 0.050, 0.870))
                    });
                    break;
                case 2:
                    animation = TweenLite.fromTo(el, 0.5, {
                        x: 0,
                        y: 200
                    }, {
                        y: 0,
                        delay: 0.05,
                        force3D: 'auto',
                        ease: new Ease(BezierEasing(0.145, 0.055, 0.050, 0.870))
                    });
                    break;
                case 3:
                    animation = TweenLite.fromTo(el, 0.5, {
                        x: -200,
                        y: 0
                    }, {
                        x: 0,
                        delay: 0.05,
                        force3D: 'auto',
                        ease: new Ease(BezierEasing(0.145, 0.055, 0.050, 0.870))
                    });
                    break;
            }

            return animationTo;
        };

        TweenLite.set($portfolioItem, {
            alpha: 0,
            scale: 0.7,
            force3D: true
        });

        $portfolioItem.each(function() {
            $(this).hoverdir({
                speed: 300,
                easing: 'cubic-bezier(0.145, 0.055, 0.050, 0.870)',
                hoverElem: '.portfolio-overlay'
            });
        });


        $(window).on('scroll', function(event) {
            var st = $(this).scrollTop();
            var windowTop = $(window).scrollTop();
            var portfolioTop = $portfolio.offset().top;
            TweenLite.killTweensOf($portfolioItem);
            $portfolioItem.addClass('no-hover');

            if (windowTop >= portfolioTop) {
                $portfolioItem.each(function(index, el) {
                    TweenLite.to(el, 0.5, {
                        alpha: 1,
                        scale: 1,
                        delay: 0.05 * index,
                        force3D: true,
                        ease: new Ease(BezierEasing(0.145, 0.055, 0.050, 0.870)),
                        onComplete: function() {
                            $portfolioItem.removeClass('no-hover');
                        }
                    });
                });
            }

            if (st > lastScrollTop) {
                if (isScrollig || !$animate) {
                    return;
                }
                setTimeout(function() {
                    $portfolioItem.each(function(index, el) {
                        var $this = $(this);
                        TweenLite.fromTo($this, 0.85, {
                            y: -15,
                            force3D: true
                        }, {
                            y: 0,
                            delay: 0.025 * index,
                            force3D: true
                        });
                    });
                }, 10);

            } else {
                if (isScrollig || !$animate) {
                    return;
                }
                setTimeout(function() {
                    $portfolioItem.each(function(index, el) {
                        var $this = $(this);
                        TweenLite.fromTo($this, 0.85, {
                            y: 15,
                            force3D: true
                        }, {
                            y: 0,
                            delay: 0.025 * index,
                            force3D: true
                        });
                    });
                }, 10);

            }
            lastScrollTop = st;

            clearTimeout(timer);
            timer = setTimeout(function() {
                $portfolioItem.removeClass('no-hover');
            }, 1000);
        });

        $portfolioItem.on('mouseenter', function(event) {
            var $this = $(this);
            var $el = $this.find('.portfolio-overlay p').not('.portfolio-overlay-inner');

            var cor = {
                x: event.pageX,
                y: event.pageY
            };

            TweenLite.killTweensOf($el);
            animationTo(cor, $this, $el);
        });



        tl
            .from([$horizontalText, $headerTitle], 1, {
                x: -3 * $headerWidth,
                force3D: true
            })
            .from([$verticalText, $avatar], 0.5, {
                y: -$headerHeight,
                force3D: true,
                onComplete: function() {
                    setTimeout(function() {
                        $animate = true;
                    }, 1100);
                }
            })
            .to($arrowDown, 1, {
                opacity: 1,
                y: +10,
                repeat: -1,
                repeatDelay: 1,
                yoyo: true,
                force3D: true
            });


        $('.header').mousemove(function(e) {
            var $header = $(this);
            var $bg = $header.find('.header-bg');
            var $text = $('.vertiacal-text, .horizontal-text');
            var xx = -Math.round((e.pageX + this.offsetLeft) / 5);
            var yy = -Math.round((e.pageY + this.offsetTop) / 5);

            if ((xx <= 0 && yy <= 0) && $animate) {
                setTimeout(function() {
                    TweenLite.killTweensOf($bg);
                    TweenLite.killTweensOf($text);
                    TweenLite.to($bg, 0.7, {
                        x: xx,
                        y: yy,
                        opacity: Math.abs(xx / 500) + 0.45,
                        force3D: true
                    });

                    TweenLite.to($text, 0.7, {
                        alpha: -Math.abs(xx / 500) + 0.75,
                        force3D: true
                    });
                }, 10);
            }
        });

        $arrowDown.hover(function() {
            tl.stop();
            $arrowDown.css('opacity', 1);
        }, function() {
            tl.resume();
        });



        /*$(window).on('resize', function(event) {
            if ($doAnimate) {
                resizeDiagrame('jsCanvas', '.skill', 43);
                resizeDiagrame('cssCanvas', '.skill', 75);
                resizeDiagrame('htmlCanvas', '.skill', 80);
            }
        });*/


        $(document).on('click', '.down-arrow', function(event) {
            event.preventDefault();

            var $target = $(this).attr('href').split('#')[1];
            var $targetPos = $('#' + $target).offset().top;

            isScrollig = true;
            TweenLite.to(window, 1, {
                scrollTo: $targetPos,
                ease: Cubic.easeInOut,
                force3D: 'auto',
                onComplete: function(argument) {
                    setTimeout(function() {
                        isScrollig = false;
                        $body.removeClass('no-hover');
                        $portfolioItem.removeClass('no-hover');
                    }, 200);
                }
            });
        });

        /*$('#skills').waypoint({
            handler: function(direction) {
                drawDiagram('jsCanvas', '.skill', '#000', 0, 43);
                drawDiagram('cssCanvas', '.skill', '#000', 0, 75);
                drawDiagram('htmlCanvas', '.skill', '#000', 0, 80);
            },
            triggerOnce: true
        });*/
    });
}
