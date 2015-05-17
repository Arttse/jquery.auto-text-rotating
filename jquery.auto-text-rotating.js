/*!
 * jQuery plugin to change/rotation of text or html, single or group, automatically with a separator.
 * https://github.com/Arttse/jquery.auto-text-rotating
 * Copyright (c) 2015 Nikita «Arttse» Bystrov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 * Version: 1.1.0
 */

(function( $ ){

    /**
     * Plugin methods
     * -----------------
     * Методы плагина
     *
     * @type {{init: Function, stop: Function, reinit: Function}}
     */
    var methods = {

        /**
         * Initialization on the element
         * -----------------------------
         * Стандартный метод инициализации на элементе
         *
         * @param settingsUser
         */
        init : function( settingsUser ) {

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
                        reverse: false,
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
                    animation = {

                        /**
                         * Sometimes you need to no animation
                         * ---------------------
                         * Иногда нужно, чтобы анимации не было
                         */
                        no: function(){
                            txt($t, parts[indexParts]);
                        },

                        /**
                         * The animation of the gradual appearance and disappearance
                         * -----------------------------------------------
                         * Анимация постепенного исчезновения и появления
                         */
                        fade: function(){
                            if ( settings.animationType === 'full' ) {
                                $t.fadeOut(
                                    animationSpeed[1],
                                    animationEasing[1],
                                    function () {
                                        txt($t, parts[indexParts]).
                                            fadeIn(animationSpeed[0], animationEasing[0]);
                                    }
                                );
                            } else if ( settings.animationType === 'in' ) {
                                $t.css('display', 'none');
                                txt($t, parts[indexParts]);
                                $t.fadeIn(animationSpeed[0], animationEasing[0]);
                            } else if ( settings.animationType === 'out' ) {
                                $t.
                                    fadeOut(
                                    animationSpeed[1],
                                    animationEasing[1],
                                    function () {
                                        txt($t, parts[indexParts]);
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
                                    '-ms-transform': 'scale(' + fx.now + ')',
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
                                        txt($t, parts[indexParts]).
                                            animate({ transformScaleIn: settings.animationScale[0] }, animationSpeed[0], animationEasing[0]);
                                    }
                                );
                            } else if ( settings.animationType === 'in' ) {
                                $t.css({
                                    '-webkit-transform': 'scale(' + settings.animationScale[1] + ')',
                                    '-ms-transform': 'scale(' + settings.animationScale[1] + ')',
                                    'transform': 'scale(' + settings.animationScale[1] + ')'
                                });
                                txt( $t, parts[indexParts] ).
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
                                        txt( $t, parts[indexParts]).
                                            css({
                                                '-webkit-transform': 'scale(' + settings.animationScale[0] + ')',
                                                '-ms-transform': 'scale(' + settings.animationScale[0] + ')',
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

                            function spinFxCSS (fx, calcTransform) {
                                $(fx.elem).css({
                                    '-webkit-transform': 'translateZ(0) rotate(' + calcTransform + 'deg) scale(' + fx.now + ')',
                                    '-ms-transform': 'translate(0, 0) rotate(' + calcTransform + 'deg) scale(' + fx.now + ')',
                                    'transform': 'translateZ(0) rotate(' + calcTransform + 'deg) scale(' + fx.now + ')'
                                });
                            }

                            $.fx.step.transformSpinIn = function(fx) {
                                fx.start = settings.animationScale[1];
                                calcTransform = ( settings.animationRotateDeg / 100 ) * ((100 / settings.animationScale[0]) * fx.now);
                                spinFxCSS(fx, calcTransform);
                            };

                            $.fx.step.transformSpinOut = function(fx) {
                                fx.start = settings.animationScale[0];
                                calcTransform = ( settings.animationRotateDeg / 100 ) * ((100 / settings.animationScale[0]) * fx.now);
                                if ( fx.pos !== 0 ) {
                                    spinFxCSS(fx, calcTransform);
                                }
                            };

                            if (settings.animationType === 'full') {
                                $t.
                                    css({
                                        '-webkit-transform': 'rotate(0deg) scale(' + settings.animationScale[0] + ')',
                                        '-ms-transform': 'rotate(0deg) scale(' + settings.animationScale[0] + ')',
                                        'transform': 'rotate(0deg) scale(' + settings.animationScale[0] + ')'
                                    }).
                                    animate(
                                    { transformSpinOut: settings.animationScale[1] },
                                    animationSpeed[1],
                                    animationEasing[1],
                                    function(){
                                        txt( $t, parts[indexParts] ).
                                            animate({transformSpinIn: settings.animationScale[0]}, animationSpeed[0], animationEasing[0]);
                                    }
                                );
                            } else if ( settings.animationType === 'in' ) {
                                $t.css({
                                    '-webkit-transform': 'rotate(' + settings.animationRotateDeg + 'deg) scale(' + settings.animationScale[1] + ')',
                                    '-ms-transform': 'rotate(' + settings.animationRotateDeg + 'deg) scale(' + settings.animationScale[1] + ')',
                                    'transform': 'rotate(' + settings.animationRotateDeg + 'deg) scale(' + settings.animationScale[1] + ')'
                                });
                                txt( $t, parts[indexParts] ).
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
                                        txt( $t, parts[indexParts]).
                                            css({
                                                '-webkit-transform': 'rotate(0deg) scale(' + settings.animationScale[0] + ')',
                                                '-ms-transform': 'rotate(0deg) scale(' + settings.animationScale[0] + ')',
                                                'transform': 'rotate(0deg) scale(' + settings.animationScale[0] + ')'
                                            });

                                    }
                                );
                            }
                        }
                    };

                if ( $t.data().atrContentOriginal ) {
                    $t.html( $t.data().atrContentOriginal );
                } else {
                    $t.data('atrContentOriginal', $t.html());
                }

                /**
                 * Data for use. You can use this to your advantage.
                 * --------------------------------------------------------------------------------------
                 * Данные для использования. Вы можете использовать это в своих целях.
                 */
                $t.data({
                    'atrInit': true,
                    'atrSeparator': settings.separator,
                    'atrTrim': settings.trim
                });

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
                var indexParts = ( settings.reverse ) ? parts.length - 1 : 0;
                txt( $t, parts[indexParts] );
                $t.data('atrIndexParts', indexParts);

                /**
                 * Function define what the next will be the index of the parts for rotation.
                 * ------------------------------------------------------------------------------
                 * Функция определяет какой следующий будет индекс у частей для ротации.
                 *
                 * @param indexPartsCurrent - current index of parts | текущий индекс частей
                 */
                function nextIndexParts ( indexPartsCurrent ) {

                    if ( settings.reverse ) {

                        if ( (indexPartsCurrent - 1) === -1 ) {
                            return parts.length - 1;
                        } else {
                            return indexPartsCurrent - 1;
                        }

                    } else {

                        if ( (indexPartsCurrent + 1) === parts.length ) {
                            return 0;
                        } else {
                            return indexPartsCurrent + 1;
                        }

                    }

                }

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
                            indexParts = nextIndexParts( $.inArray( txt($t), parts ) );
                            $t.data('atrIndexParts', indexParts);

                            /**
                             * Select the animation and work with
                             * -----------------------------------
                             * Выбираем анимацию и работаем с ней
                             */
                            switch ( settings.animation ) {

                                case 'no':
                                    animation.no();
                                    break;

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

                            var timeoutGroup = setTimeout( animateSingle, settings.delay * indexCurrent );

                            /**
                             * The ID of the delay change of the text of the item group. You can use this to your advantage.
                             * ---------------------------------------------------------------------------
                             * Идентификатор задержки смены текста элемента группы. Вы можете использовать это в своих целях.
                             */
                            $t.data('atrTimeoutGroup', timeoutGroup);
                        }

                    };

                    /**
                     * It's time to put an endless cycle change text
                     * -------------------------------------------------------
                     * Пришло время пустить по бесконечному кругу смену текста
                     */
                    var timeoutStart = setTimeout(function () {

                            $t.removeData('atrTimeoutStart');

                            animate();

                            var intervalMain = setInterval(animate, delay);

                            /**
                             * The ID of the interval between changing the text of the item / group of items. You can use this to your advantage.
                             * -----------------------------------------------------------------------------------------------------------------
                             * Идентификатор интервала между сменой текста элемента / группы элементов. Вы можете использовать это в своих целях.
                             */
                            $t.data('atrIntervalMain', intervalMain);

                       },
                       settings.delayStart
                    );

                    /**
                     * The ID delay before the start of the change of the text. You can use this to your advantage.
                     * -------------------------------------------------------------------------------------------
                     * Идентификатор задержки перед стартом смены текста. Вы можете использовать это в своих целях.
                     */
                    $t.data('atrTimeoutStart', timeoutStart);
                }
            };

            /**
             * Return to use in the chain
             * ----------------------------------
             * Вернем для использования в цепочке
             */
            return this.each( action );
        },

        /**
         * Method stop the animation and return the content as it was
         * ----------------------------------------------------------
         * Метод остановки анимации и возвращение контента как было
         */
        stop: function( settingsUser ){

            var settings = $.extend(
                {
                    content: 'currentPart',
                    separator: $(this).data().atrSeparator,
                    trim: $(this).data().atrTrim
                },
                settingsUser
            );

            function fillingContent( $t, d ) {

                var parts = d.split( settings.separator);

                switch( settings.content ) {

                    case 'original':
                        $t.html( d );
                        break;

                    case 'firstPart':
                        $t.html( ( settings.trim ) ? parts[0].replace(/^\s+|\s+$/g, '') : parts[0] );
                        break;

                    case 'lastPart':
                        $t.html( ( settings.trim ) ? parts[parts.length - 1].replace(/^\s+|\s+$/g, '') : parts[parts.length - 1] );
                        break;

                    case 'currentPart':
                        $t.html( ( settings.trim ) ? parts[$t.data().atrIndexParts].replace(/^\s+|\s+$/g, '') : parts[$t.data().atrIndexParts] );
                        break;
                }
            }

            var action = function() {

                var $t = $(this),
                    data = $t.data();

                /**
                 * Check the script is initialized
                 * -----------------------------------
                 * Проверим, инициализирован ли скрипт
                 */
                if ( data.atrInit ) {

                    /**
                     * Check for a delay before the start of the shift of the text. Cleansing
                     * ------------------------------------------------------------------------
                     * Проверка на задержку перед стартом смены текста. Очищение
                     */
                    if ( data.atrTimeoutStart ) {
                        clearTimeout(data.atrTimeoutStart);
                        $t.removeData('atrTimeoutStart');
                    }

                    /**
                     * Check on the delay of the change of the text of the element group. Cleansing
                     * -----------------------------------------------------------------------------
                     * Проверка на задержку смены текста элемента группы. Очищение
                     */
                    if ( data.atrTimeoutGroup ) {
                        clearTimeout(data.atrTimeoutGroup);
                        $t.removeData('atrTimeoutGroup');
                    }

                    /**
                     * Checking the interval between changing the text of the item / group of items. Cleansing
                     * -------------------------------------------------------------------------------------------
                     * Проверка на интервал между сменой текста элемента / группы элементов. Очищение
                     */
                    if ( data.atrIntervalMain ) {
                        clearInterval(data.atrIntervalMain);
                        $t.removeData('atrIntervalMain');
                    }

                    /**
                     * Check for original content
                     * --------------------------------
                     * Проверка на оригинальный контент
                     */
                    if ( data.atrContentOriginal ) {

                        $t.
                            stop().
                            removeAttr('style').
                            removeData('atrInit');

                        fillingContent( $t, data.atrContentOriginal );
                    }
                }
            };

            /**
             * Return to use in the chain
             * ----------------------------------
             * Вернем для использования в цепочке
             */
            return this.each( action );
        },

        /**
         * The method of re-initiate. Stops and again initialize with the new settings.
         * -----------------------------------------------------------------------------
         * Метод реинициализации. Останавливает и снова инициализирует с новыми настройками.
         */
        reinit : function( newSettings ) {

            var $t = $(this);

            /**
             * Stop
             * --------------
             * Остановка
             */
            methods.stop.apply($t);

            /**
             * Initialization
             * --------------
             * Инициализация
             */
            methods.init.call($t, newSettings );

            /**
             * Return to use in the chain
             * ----------------------------------
             * Вернем для использования в цепочке
             */
            return this.each( function(){} );
        }
    };



    /**
     * Processing logic and execution methods.
     * ---------------------------------------
     * Логика обработки и исполнения методов.
     *
     * @param method - method or settings | метод или настройки
     */
    $.fn.atrotating = function( method ) {

        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'A method named "' + method + '" does not exist for jQuery.atrotating' );
        }

    };

})(jQuery);