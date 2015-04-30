/*!
 * jQuery plugin to change/rotation of text or html, single or group, automatically with a separator.
 * https://github.com/Arttse/jquery.auto-text-rotating
 * Copyright (c) 2015 Nikita «Arttse» Bystrov
 * Licensed under the MIT license (see LICENSE)
 * Version: 1.0.0
 */
!function( $ ){
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
            );

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
            if ( text )
                return ( settings.type === 'html' ) ? $t.html(text) : $t.text(text);
            else
                return ( settings.type === 'html' ) ? $t.html() : $t.text();
        }

        /**
         * Fix Trim
         */
        if ( settings.trim )
            if ( !String.prototype.trim ) {
                String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '')};
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
                delay = ( settings.method === 'group' ) ? settings.delay * elements.length + settings.delayGroup : settings.delay,
                animationSpeed = ( typeof settings.animationSpeed !== 'object' ) ? [settings.animationSpeed,settings.animationSpeed] : settings.animationSpeed,
                animationEasing = ( typeof settings.animationEasing !== 'object' ) ? [settings.animationEasing,settings.animationEasing] : settings.animationEasing;

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
            $.each( txt( $t ).split( settings.separator ), function( key, value ) {
                ( settings.trim ) ? parts.push( value.trim() ) : parts.push( value );
            });

            /**
             * Paste the contents of the first part
             * ------------------------------------
             * Вставим содержимое первой части
             */
            txt( $t, parts[0] );

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
                        var indexParts = $.inArray( txt( $t ), parts );
                        if( (indexParts + 1) == parts.length ) indexParts = -1;

                        /**
                         * Select the animation and work with
                         * -----------------------------------
                         * Выбираем анимацию и работаем с ней
                         */
                        switch ( settings.animation ) {

                            /**
                             * Animation dissolution
                             * ---------------------
                             * Анимация растворения
                             */
                            case 'fade':
                                if ( settings.animationType === 'full' )
                                    $t.fadeOut(
                                        animationSpeed[1],
                                        animationEasing[1],
                                        function () {
                                            txt($t, parts[indexParts + 1]).
                                                fadeIn(animationSpeed[0], animationEasing[0]);
                                        }
                                    );
                                else if ( settings.animationType === 'in' ) {
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
                                break;


                            /**
                             * Animation resize ( scale )
                             * ---------------------
                             * Анимация изменения размера
                             */
                            case 'scale':
                                $.fx.step.transformScaleIn = function (fx) {
                                    fx.start = settings.animationScale[1];
                                    $(fx.elem).css({
                                        '-webkit-transform': 'scale(' + fx.now + ')',
                                        'transform': 'scale(' + fx.now + ')'
                                    });
                                };

                                $.fx.step.transformScaleOut = function (fx) {
                                    fx.start = settings.animationScale[0];
                                    if (fx.pos !== 0)
                                        $(fx.elem).css({
                                            '-webkit-transform': 'scale(' + fx.now + ')',
                                            'transform': 'scale(' + fx.now + ')'
                                        });
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

                                break;


                            /**
                             * Animation resize ( scale ) and rotate
                             * ---------------------
                             * Анимация изменения размера и кручения-верчения
                             */
                            case 'spin':
                                var calcTransform = null;

                                $.fx.step.transformSpinIn = function(fx) {
                                    fx.start = settings.animationScale[1];
                                    calcTransform = ( settings.animationRotateDeg / 100 ) * ((100 / settings.animationScale[0]) * fx.now);
                                    $(fx.elem).css({
                                        '-webkit-transform': 'translateZ(0) rotate(' + calcTransform + 'deg) scale(' + fx.now + ')',
                                        'transform': 'translateZ(0) rotate(' + calcTransform + 'deg) scale(' + fx.now + ')'
                                    });
                                };

                                $.fx.step.transformSpinOut = function(fx) {
                                    fx.start = settings.animationScale[0];
                                    calcTransform = ( settings.animationRotateDeg / 100 ) * ((100 / settings.animationScale[0]) * fx.now);
                                    if ( fx.pos !== 0 )
                                        $(fx.elem).css({
                                            '-webkit-transform': 'translateZ(0) rotate(' + calcTransform + 'deg) scale(' + fx.now + ')',
                                            'transform': 'translateZ(0) rotate(' + calcTransform + 'deg) scale(' + fx.now + ')'
                                        });
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
    }
}(jQuery);