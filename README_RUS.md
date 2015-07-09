# jQuery.auto-text-rotating [![README ENG](https://img.shields.io/badge/README-Show%20in%20English-brightgreen.svg)](README.md)
[![GitHub version](https://badge.fury.io/gh/Arttse%2Fjquery.auto-text-rotating.svg)](https://github.com/Arttse/jquery.auto-text-rotating/releases/latest) [![npm version](https://badge.fury.io/js/jquery.auto-text-rotating.svg)](https://www.npmjs.com/package/jquery.auto-text-rotating) [![Bower version](https://badge.fury.io/bo/jquery.auto-text-rotating.svg)](http://bower.io/search/?q=jquery.auto-text-rotating) [![Travis Ci Build Status](https://api.travis-ci.org/Arttse/jquery.auto-text-rotating.svg)](https://travis-ci.org/Arttse/jquery.auto-text-rotating) [![Codacy Badge](https://www.codacy.com/project/badge/f7bd8ee47c0d476fbbecfcc2e6acb4a4)](https://www.codacy.com/app/Arttse/jquery-auto-text-rotating) [![License MIT RUS](https://img.shields.io/badge/%D0%BB%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F-MIT-blue.svg)](LICENSE_RUS.txt) [![SemVer 2.0](https://img.shields.io/badge/semver-2.0-blue.svg)](http://semver.org/lang/ru/) [![devDependency Статус](https://david-dm.org/Arttse/jquery.auto-text-rotating/dev-status.svg)](https://david-dm.org/Arttse/jquery.auto-text-rotating#info=devDependencies) [![Посмотреть Демо](https://img.shields.io/badge/%D0%9F%D0%BE%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B5%D1%82%D1%8C-%D0%94%D0%B5%D0%BC%D0%BE-CA81FD.svg)](http://arttse.name/jquery-auto-text-rotating/demo)

> jQuery плагин для изменения/вращения текста или HTML, одиночно или в группе, автоматически с сепаратором.

## Особенности
- Много настроек, возможность удобно настроить по своему вкусу.
- Поддержка обычного текста и HTML.
- Поочередное изменение/вращение текста как одиночно, так и в группе.
- Возможность управлять настройками анимации появления текста и исчезновения.
- 5 анимаций с поддержкой функций плавности (Easing).
- Поддержка анимаций Animate.css.

## Быстрый старт

### Шаг первый. Установка

#### С помощью NPM
```
npm install jquery.auto-text-rotating
```

#### С помощью Bower
```
bower install jquery.auto-text-rotating
```

#### Подключение в HTML
```html
<!-- Подключение jQuery библиотеки (Например с серверов Google) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Подключение плагина -->
<script src="jquery.auto-text-rotating.min.js"></script>
```

### Шаг второй. Создание HTML элемента
```html
<div class="element">Первый|Второй|Третий</div>
```

### Шаг третий

#### Инициализация на одном элементе
```javascript
$('.element').atrotating();
```

#### Инициализация на группе элементов поочередно
```javascript
$('.element').atrotating({
    method: 'group'
});
```
При:
```html
<div class="element">Первый|Четвертый</div>
<div class="element">Второй|Пятый</div>
<div class="element">Третий|Шестой</div>
```

## Методы

### Метод 'init'

Инициализация. Запуск смены частей текста с настройками.

Примеры использования:
```javascript
$('.element').atrotating();
```
Или
```javascript
$('.element').atrotating('init');
```
Или
```javascript
var settings = {
    type: 'html',
    animationSpeed: [400,300]
};
$('.element').atrotating(settings);
```
Или
```javascript
var settings = {
    type: 'html',
    animationSpeed: [400,300]
};
$('.element').atrotating('init', settings);
```

#### Настройки метода 'init'

Плагин принимает настройки в виде объекта.

##### type
Тип: `string`  
По умолчанию: `text`

Доступно:

- `text` — обрабатывается просто текст, вырезаются все html теги.
- `html` — обрабатывается текст вместе с html тегами.

##### method
Тип: `string`  
По умолчанию: `single`

Доступно:

- `single` — обрабатывать по одному единовременно.
- `group` — обрабатывать каждый элемент поочередно в группе.

##### separator
Тип: `string`  
По умолчанию: `|`

Разделитель для разделения текста на части, которые будут меняться.

##### animation
Тип: `string`  
По умолчанию: `fade`

Анимация при смене текста.

Доступно:

- `no` — нет никакого эффекта.
- `fade` — эффект постепенного исчезновения элемента (Easing).
- `scale` — эффект увеличения и уменьшения размера элемента (Easing).
- `spin` — эффект увеличения и уменьшения + кручения-верчения (Easing).
- `flipY` — эффект переворачивания горизонтально (Easing).
- `flipX` — эффект переворачивания вертикально (Easing).
- `animateCss` — использование внешней библиотеки CSS3 анимаций Animate.css.

##### animationSpeed
Тип: `number` или `array`  
По умолчанию: `300`

Скорость выполнения анимации в миллисекундах.

Если указать как `number`, например — `animationSpeed: 150`, то будет задано _одинаковое_ значение для скорости анимирования элемента при появлении и исчезновении.

Если указать как `array`, например — `animationSpeed: [300,400]`, то будет задано _разное_ значение для скорости анимирования элемента при появлении и исчезновении. Первое значение для появления, второе для исчезновения.

##### animationEasing
Тип: `string` или `array`  
По умолчанию: `swing`

Динамика выполнения анимации. В jQuery доступны `linear` и `swing`, но вы можете использовать и другие, _подключив соответствующие расширения (например, jQuery Easing)_.

Если указать как `string`, например — `animationEasing: 'linear'`, то будет задано _одинаковое_ значение для динамики анимации элемента при появлении и исчезновении.

Если указать как `array`, например — `animationEasing: ['swing','linear']`, то будет задано _разное_ значение для динамики анимации элемента при появлении и исчезновении. Первое значение для появления, второе для исчезновения.

Не работает с `animation: 'animateCss'`.

##### animationType
Тип: `string`  
По умолчанию: `full`

Доступно:

- `full` — анимирует выбранной анимацией _появление и исчезновение_.
- `in` — анимирует выбранной анимацией _только появление_.
- `out` — анимирует выбранной анимацией _только исчезновение_.

##### animationScale
Тип: `array`  
По умолчанию: `[1,0]`

Изменение размера в анимации. Применимо только к анимациям `scale` и `spin`. Первое значение массива - какой будет окончательный размер элемента после постепенного появления текста. Например, 1 - это стандартный размер, 2 - это в два раза больше и т.д. Второе значение массива - определяет окончательный размер после постепенного исчезновения элемента.

##### animationRotateDeg
Тип: `number` или `array`  
По умолчанию: `720`

Градус (deg) верчения-кручения элемента. Применимо только к анимациям `spin`, `flipY`, `flipX`.

Если указать как `number`, например — `animationRotateDeg: 180`, то будет задано 0 при появлении и 180 при исчезновении.

Если указать как `array`, например — `animationRotateDeg: [-90, 0]`, первое значение для появления, второе для исчезновения. Исключение анимация `spin`, там всегда будет 0 при появлении.

##### animateCssClass
Тип: `string`  
По умолчанию: `animated`

Класс элемента, заданный в Animate.css. Применимо только к анимации `animateCss`.

##### animateCssAnimation
Тип: `string` или `array`  
По умолчанию: `['bounceIn', 'bounceOut']`

Какими анимациями из Animate.css выполнять анимирование. Применимо только к анимации `animateCss`.

Если указать как `string`, например — `animateCssAnimation: 'jello'`, то будет задана только одна анимация.

Если указать как `array`, например — `animateCssAnimation: ['fadeInLeft', 'fadeOutRight']`, первое значение для появления, второе для исчезновения.

##### delay
Тип: `number`  
По умолчанию: `2000`

- При `method: 'single'` — задержка между сменой текста элемента в миллисекундах.
- При `method: 'group'` — задержка между сменой текста элементов группы поочередно в миллисекундах.

##### delayStart
Тип: `number`  
По умолчанию: `2000`

Задержка перед первой сменой текста после инициализации.

##### delayGroup
Тип: `number`  
По умолчанию: `2000`

- При `method: 'single'` — не имеет никакого смысла.
- При `method: 'group'` — задержка между полным проходом смены текста по всем элементам группы за раз.

##### animateOne
Тип: `boolean`  
По умолчанию: `false`

Анимировать элемент, если нет раздельных частей для смены текста.

##### reverse
Тип: `boolean`  
По умолчанию: `false`

Ротация частей сменного текста с конца.

##### trim
Тип: `boolean`  
По умолчанию: `true`

Удаление пробельных символов в начале и в конце частей сменного текста.

##### css
Тип: `object`  
По умолчанию: `undefined`

Вы можете добавить необходимые стили CSS на элемент. После выполнения метода 'stop' все стили будут удалены.

```javascript
$('.element').atrotating({
    css: {
        "color": "#000",
        "font-size": "20px"
    }
});
```

### Метод 'stop'

Остановка ротации текста.

Примеры использования:
```javascript
$('.element').atrotating('stop');
```
Или
```javascript
var settings = {
    content: 'firstPart',
    separator: ',',
    trim: false
};
$('.element').atrotating('stop', settings);
```

#### Настройки метода 'stop'

Плагин принимает настройки в виде объекта.

##### content
Тип: `string`  
По умолчанию: `currentPart`

Доступно:

- `original` — вставляет оригинальный текст, который был до инициализации.
- `firstPart` — вставляет первую часть от оригинального текста, отделенную заданным разделителем.
- `lastPart` — вставляет последнюю часть от оригинального текста, отделенную заданным разделителем.
- `currentPart` — вставляет последнюю показанную часть от оригинального текста на момент остановки ротации, отделенную заданным разделителем.

##### separator
Тип: `string`  
По умолчанию: берется из настройки при инициализации

Разделитель для разделения текста на части для вставки после остановки, необходимо для `content`.

##### trim
Тип: `boolean`  
По умолчанию: берется из настройки при инициализации

Удаление пробельных символов в начале и в конце текста.

### Метод 'reinit'

Очередная инициализация с новыми настройками.

Примеры использования:
```javascript
$('.element').atrotating('reinit');
```
Или
```javascript
var settings = {
    type: 'html',
    animationType: 'in',
    delay: 6000,
    separator: ',',
    trim: false
};
$('.element').atrotating('reinit', settings);
```

#### Настройки метода 'reinit'

Аналогично настройкам метода `init`.