 $(document).on({
         mouseenter: function() {
             var $this = $(this);
             var $container = $('.portfolio-section');
             var itemWidth = $this.outerWidth();
             var itemHeight = $this.outerHeight();
             var itemTop = $this.position().top;
             var itemLeft = $this.position().left;
             var $overlay = $('.portfolio-overlay');
             var overlayWidth = $overlay.outerWidth();
             var overlayHeight = $overlay.outerHeight();
             var overlayLeft = $overlay.position().left;
             var overlayTop = $overlay.position().top;

             function animate() {
                 if (overlayLeft > itemLeft && overlayTop === itemTop) {
                     TweenMax.killTweensOf($overlay);
                     TweenMax.to($overlay, 0.3, {
                         left: itemLeft,
                         width: (overlayLeft + itemWidth) - itemLeft,
                         height: itemHeight,
                         ease: Back.easeIn,
                         force3D: 'auto',
                         onComplete: function() {
                             TweenMax.to($overlay, 0.3, {
                                 width: itemWidth,
                                 top: itemTop,
                                 ease: Back.easeOut,
                                 force3D: 'auto'
                             });
                         }
                     });
                 } else if (overlayLeft > itemLeft && overlayTop !== itemTop) {
                     TweenMax.killTweensOf($overlay);
                     TweenMax.to($overlay, 0.3, {
                         top: itemTop,
                         width: itemWidth,
                         height: itemHeight,
                         ease: Back.easeIn,
                         force3D: 'auto',
                         onComplete: function() {
                             TweenMax.to($overlay, 0.3, {
                                 width: (overlayLeft + itemWidth) - itemLeft,
                                 left: itemLeft,
                                 ease: Back.easeIn,
                                 force3D: 'auto',
                                 onComplete: function() {
                                     TweenMax.to($overlay, 0.3, {
                                         width: itemWidth,
                                         top: itemTop,
                                         ease: Back.easeOut,
                                         force3D: 'auto'
                                     });
                                 }
                             });
                         }
                     });
                 } else if (overlayLeft < itemLeft && overlayTop !== itemTop) {
                     TweenMax.killTweensOf($overlay);
                     TweenMax.to($overlay, 0.3, {
                         top: itemTop,
                         left: overlayLeft,
                         height: itemHeight,
                         ease: Back.easeIn,
                         force3D: 'auto',
                         onComplete: function() {
                             TweenMax.to($overlay, 0.3, {
                                 width: (itemWidth + itemLeft) - overlayLeft,
                                 ease: Back.easeIn,
                                 force3D: 'auto',
                                 onComplete: function() {
                                     TweenMax.to($overlay, 0.3, {
                                         width: itemWidth,
                                         left: itemLeft,
                                         ease: Back.easeOut,
                                         force3D: 'auto'
                                     });
                                 }
                             });
                         }
                     });
                 } else if (overlayLeft === itemLeft && overlayTop < itemTop) {
                     TweenMax.killTweensOf($overlay);
                     TweenMax.to($overlay, 0.3, {
                         height: itemHeight + itemTop - overlayTop,
                         ease: Back.easeIn,
                         force3D: 'auto',
                         onComplete: function() {
                             TweenMax.to($overlay, 0.3, {
                                 height: itemHeight,
                                 top: itemTop,
                                 ease: Back.easeOut,
                                 force3D: 'auto'
                             });
                         }
                     });
                 } else if (overlayLeft === itemLeft && overlayTop > itemTop) {
                     TweenMax.killTweensOf($overlay);
                     TweenMax.to($overlay, 0.3, {
                         height: (overlayTop + itemHeight) - itemTop,
                         top: itemTop,
                         ease: Back.easeIn,
                         force3D: 'auto',
                         onComplete: function() {
                             TweenMax.to($overlay, 0.3, {
                                 height: itemHeight,
                                 ease: Back.easeOut,
                                 force3D: 'auto'
                             });
                         }
                     });
                 } else if (overlayLeft < itemLeft && overlayTop === itemTop || overlayLeft === itemLeft && overlayTop === itemTop) {
                     TweenMax.killTweensOf($overlay);
                     TweenMax.to($overlay, 0.3, {
                         width: (itemWidth + itemLeft) - overlayLeft,
                         height: itemHeight,
                         ease: Back.easeIn,
                         force3D: 'auto',
                         onComplete: function() {
                             TweenMax.to($overlay, 0.3, {
                                 width: itemWidth,
                                 left: itemLeft,
                                 top: itemTop,
                                 ease: Back.easeOut,
                                 force3D: 'auto'
                             });
                         }
                     });
                 }
             }

             animate().throttle(1000);

         },
         mouseleave: function(event) {
             var $this = $(this);
             var $overlay = $('.portfolio-overlay');

             if ($(event.target).closest('.portfolio-section').length === 0) {
                 TweenLite.to($overlay, 0.5, {
                     width: 0,
                     height: 0,
                     x: 0,
                     y: 0
                 });
             }
         }
     },
     '.portfolio-item');
