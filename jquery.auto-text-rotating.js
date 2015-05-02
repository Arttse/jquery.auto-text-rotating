/*!
 * jQuery plugin to change/rotation of text or html, single or group, automatically with a separator.
 * https://github.com/Arttse/jquery.auto-text-rotating
 * Copyright (c) 2015 Nikita «Arttse» Bystrov
 * Licensed under the MIT license (see LICENSE)
 * Version: 1.0.1
 */

(function( $ ){

    $.fn.atrotating = function( settingsUser ) {

        /**
         * Settings
         * ----------
         * Настройки
         */
        var settings = $.extend(
                {
                    type: 'text',
                    method: 'single',

                    animation: 'fade',
                    animationSpeed: 300,
                    animationEasing: 'swing',
                    animationType: 'full',
                    animationScale: [1,0],
                    animationRotateDeg: 720,

                    delay: 2000,
                    delayStart: 2000,
                    delayGroup: 2000,

                    animateOne: false,
                    separator: '|',
                    trim: true,

                    css: undefined
                },
                settingsUser
            ),
            delay = settings.delay,
            animationSpeed = ( typeof settings.animationSpeed === 'object' ) ? settings.animationSpeed : [settings.animationSpeed,settings.animationSpeed],
            animationEasing = ( typeof settings.animationEasing === 'object' ) ? settings.animationEasing : [settings.animationEasing,settings.animationEasing];

        /**
         * Get all the elements
         * ----------------------
         * Получаем все элементы
         *
         * @type {Array}
         */
        if ( settings.method === 'group' ) {
            var elements = [];
            this.each(function(){
                elements.push( this );
            });
            delay = settings.delay * elements.length + settings.delayGroup;
        }

        /**
         * The received data depending on the setting.type HTML or TEXT
         * ---------------------------------------------
         * Получаем данные в зависимости от настройки type. HTML или TEXT
         *
         * @param $t        - object jQuery | объект jQuery
         * @param text      - the text to fill the object of jQuery | текст для заполнения объекта jQuery
         * @returns string
         */
        function txt ( $t, text ) {
            if ( text ) {
                return ( settings.type === 'html' ) ? $t.html(text) : $t.text(text);
            } else {
                return ( settings.type === 'html' ) ? $t.html() : $t.text();
            }
        }

        /**
         * Actions with the received item
         * -------------------------------
         * Действия с полученным элементом
         */
        var action = function( indexCurrent ) {
            var $t = $(this),
                display = $t.css('display'),
                parts = [],
                indexParts = 0,
                animation = {
                    /**
                     * Animation is the gradual disappearance of
                     * ---------------------
                     * Анимация растворения
                     */
                    fade: function(){
                        if ( settings.animationType === 'full' ) {
                            $t.fadeOut(
                                animationSpeed[1],
                                animationEasing[1],
                                function () {
                                    txt($t, parts[indexParts + 1]).
                                        fadeIn(animationSpeed[0], animationEasing[0]);
                                }
                            );
                        } else if ( settings.animationType === 'in' ) {
                            $t.css('display', 'none');
                            txt($t, parts[indexParts + 1]);
                            $t.fadeIn(animationSpeed[0], animationEasing[0]);
                        } else if ( settings.animationType === 'out' ) {
                            $t.
                                fadeOut(
                                animationSpeed[1],
                                animationEasing[1],
                                function () {
                                    txt($t, parts[indexParts + 1]);
                                    $t.css('display', display);
                                }
                            );
                        }
                    },

                    /**
                     * Animation resize ( scale )
                     * ---------------------
                     * Анимация изменения размера
                     */
                    scale: function(){

                        function scaleFxCSS ( fx ) {
                            $(fx.elem).css({
                                '-webkit-transform': 'scale(' + fx.now + ')',
                                'transform': 'scale(' + fx.now + ')'
                            });
                        }

                        $.fx.step.transformScaleIn = function (fx) {
                            fx.start = settings.animationScale[1];
                            scaleFxCSS(fx);
                        };

                        $.fx.step.transformScaleOut = function (fx) {
                            fx.start = settings.animationScale[0];
                            if (fx.pos !== 0) {
                                scaleFxCSS(fx);
                            }
                        };

                        if ( settings.animationType === 'full' ) {
                            $t.animate(
                                { transformScaleOut: settings.animationScale[1] },
                                animationSpeed[1],
                                animationEasing[1],
                                function () {
                                    txt($t, parts[indexParts + 1]).
                                        animate({ transformScaleIn: settings.animationScale[0] }, animationSpeed[0], animationEasing[0]);
                                }
                            );
                        } else if ( settings.animationType === 'in' ) {
                            $t.css({
                                '-webkit-transform': 'scale(' + settings.animationScale[1] + ')',
                                'transform': 'scale(' + settings.animationScale[1] + ')'
                            });
                            txt( $t, parts[indexParts + 1] ).
                                animate(
                                { transformScaleIn: settings.animationScale[0] },
                                animationSpeed[0],
                                animationEasing[0]
                            );

                        } else if ( settings.animationType === 'out' ) {
                            $t.animate(
                                { transformScaleOut: settings.animationScale[1] },
                                animationSpeed[1],
                                animationEasing[1],
                                function(){
                                    txt( $t, parts[indexParts + 1]).
                                        css({
                                            '-webkit-transform': 'scale(' + settings.animationScale[0] + ')',
                                            'transform': 'scale(' + settings.animationScale[0] + ')'
                                        });

                                }
                            );
                        }
                    },

                    /**
                     * Animation resize ( scale ) and rotate
                     * ---------------------
                     * Анимация изменения размера и кручения-верчения
                     */
                    spin: function(){
                        var calcTransform = null;

                        function spinFxCSS (fx) {
                            $(fx.elem).css({
                                '-webkit-transform': 'translateZ(0) rotate(' + calcTransform + 'deg) scale(' + fx.now + ')',
                                'transform': 'translateZ(0) rotate(' + calcTransform + 'deg) scale(' + fx.now + ')'
                            });
                        }

                        $.fx.step.transformSpinIn = function(fx) {
                            fx.start = settings.animationScale[1];
                            calcTransform = ( settings.animationRotateDeg / 100 ) * ((100 / settings.animationScale[0]) * fx.now);
                            spinFxCSS(fx);
                        };

                        $.fx.step.transformSpinOut = function(fx) {
                            fx.start = settings.animationScale[0];
                            calcTransform = ( settings.animationRotateDeg / 100 ) * ((100 / settings.animationScale[0]) * fx.now);
                            if ( fx.pos !== 0 ) {
                                spinFxCSS(fx);
                            }
                        };

                        if (settings.animationType === 'full') {
                            $t.
                                css({
                                    '-webkit-transform': 'rotate(0deg) scale(' + settings.animationScale[0] + ')',
                                    'transform': 'rotate(0deg) scale(' + settings.animationScale[0] + ')'
                                }).
                                animate(
                                { transformSpinOut: settings.animationScale[1] },
                                animationSpeed[1],
                                animationEasing[1],
                                function(){
                                    txt( $t, parts[indexParts + 1] ).
                                        animate({transformSpinIn: settings.animationScale[0]}, animationSpeed[0], animationEasing[0]);
                                }
                            );
                        } else if ( settings.animationType === 'in' ) {
                            $t.css({
                                '-webkit-transform': 'rotate(' + settings.animationRotateDeg + 'deg) scale(' + settings.animationScale[1] + ')',
                                'transform': 'rotate(' + settings.animationRotateDeg + 'deg) scale(' + settings.animationScale[1] + ')'
                            });
                            txt( $t, parts[indexParts + 1] ).
                                animate(
                                { transformSpinIn: settings.animationScale[0] },
                                animationSpeed[0],
                                animationEasing[0]
                            );
                        } else if ( settings.animationType === 'out' ) {
                            $t.animate(
                                { transformSpinOut: settings.animationScale[1] },
                                animationSpeed[1],
                                animationEasing[1],
                                function(){
                                    txt( $t, parts[indexParts + 1]).
                                        css({
                                            '-webkit-transform': 'rotate(0deg) scale(' + settings.animationScale[0] + ')',
                                            'transform': 'rotate(0deg) scale(' + settings.animationScale[0] + ')'
                                        });

                                }
                            );
                        }
                    }
                };

            /**
             * If there is custom CSS, use it
             * ---------------------------------------------
             * Если есть пользовательский CSS, то используем
             */
            if ( settings.css && typeof settings.css === 'object' ) {
                $t.css(settings.css);
            }

            /**
             * Divide the given separator string and put in array
             * --------------------------------------------------------
             * Разделим заданным разделителем строку и положим в массив
             */
            $.each( txt($t).split( settings.separator ), function( key, value ) {
                if ( settings.trim ) {
                    parts.push( value.replace(/^\s+|\s+$/g, '') );
                } else {
                    parts.push( value );
                }
            });

            /**
             * Paste the contents of the first part
             * ------------------------------------
             * Вставим содержимое первой части
             */
            txt( $t, parts[indexParts] );

            /**
             * If there is text to change, then change it
             * ------------------------------------------
             * Если есть текст для смены, то меняем
             */
            if ( ( settings.animateOne ) || ( parts.length > 1 ) ) {

                /**
                 * Define function animation
                 * -----------------------------------
                 * Зададим функцию работы с анимацией
                 */
                var animate = function () {

                    var animateSingle = function(){
                        indexParts = $.inArray( txt($t), parts );
                        if ( (indexParts + 1) === parts.length ) { indexParts = -1; }

                        /**
                         * Select the animation and work with
                         * -----------------------------------
                         * Выбираем анимацию и работаем с ней
                         */
                        switch ( settings.animation ) {

                            case 'fade':
                                animation.fade();
                                break;

                            case 'scale':
                                animation.scale();
                                break;

                            case 'spin':
                                animation.spin();
                                break;

                            default:
                                animation.fade();
                                break;
                        }
                    };

                    if ( settings.method === 'single' ) {
                        animateSingle();
                    } else if ( settings.method === 'group' ) {
                        setTimeout( animateSingle, settings.delay * indexCurrent );
                    }

                };

                /**
                 * It's time to put an endless cycle change text
                 * -------------------------------------------------------
                 * Пришло время пустить по бесконечному кругу смену текста
                 */
                setTimeout( function(){
                        animate();
                        setInterval( animate, delay );
                    },
                    settings.delayStart
                );
            }
        };

        /**
         * Return to use in the chain
         * ----------------------------------
         * Вернем для использования в цепочке
         */
        return this.each( action );
    };

})(jQuery);