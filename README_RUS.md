# jQuery.auto-text-rotating [![README ENG](https://img.shields.io/badge/README-Show%20in%20English-brightgreen.svg)](README.md)
[![GitHub version](https://badge.fury.io/gh/Arttse%2Fjquery.auto-text-rotating.svg)](http://badge.fury.io/gh/Arttse%2Fjquery.auto-text-rotating) [![npm version](https://badge.fury.io/js/jquery.auto-text-rotating.svg)](http://badge.fury.io/js/jquery.auto-text-rotating) [![Bower version](https://badge.fury.io/bo/jquery.auto-text-rotating.svg)](http://badge.fury.io/bo/jquery.auto-text-rotating) [![Travis Ci Build Status](https://api.travis-ci.org/Arttse/jquery.auto-text-rotating.svg)](https://travis-ci.org/Arttse/jquery.auto-text-rotating) [![Codacy Badge](https://www.codacy.com/project/badge/f7bd8ee47c0d476fbbecfcc2e6acb4a4)](https://www.codacy.com/app/arttsesoft/jquery-auto-text-rotating) [![License MIT RUS](https://img.shields.io/badge/%D0%BB%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F-MIT-blue.svg)](LICENSE_RUS.txt)

> jQuery плагин для изменения/вращения текста или HTML, одиночно или в группе, автоматически с сепаратором.

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
$('element').atrotating();
```

#### Инициализация на группе элементов поочередно
```javascript
$('element').atrotating({
    method: 'group'
});
```
При:
```html
<div class="element">Первый|Четвертый</div>
<div class="element">Второй|Пятый</div>
<div class="element">Третий|Шестой</div>
```

## Настройки

Плагин принимает настройки в виде объекта.

### type
Тип: `string`
По умолчанию: `text`
Доступно:

- `text` — обрабатывается просто текст, вырезаются все html теги.
- `html` — обрабатывается текст вместе с html тегами.

### method
Тип: `string`
По умолчанию: `single`
Доступно:

- `single` — обрабатывать по одному единовременно.
- `group` — обрабатывать каждый элемент поочередно в группе.

### separator
Тип: `string`
По умолчанию: `|`

Разделитель для разделения текста на части, которые будут меняться.

### animation
Тип: `string`
По умолчанию: `fade`

Анимация при смене текста.

Доступно:

- `fade` — эффект постепенного исчезновения элемента.
- `scale` — эффект увеличения и уменьшения размера элемента.
- `spin` — эффект увеличения и уменьшения + кручения-верчения.

### animationSpeed
Тип: `number` или `array`
По умолчанию: `300`

Скорость выполнения анимации в миллисекундах.

Если указать как `number`, например — `animationSpeed: 150`, то будет задано _одинаковое_ значение для скорости анимирования элемента при появлении и исчезновении.

Если указать как `array`, например — `animationSpeed: [300,400]`, то будет задано _разное_ значение для скорости анимирования элемента при появлении и исчезновении. Первое значение для появления, второе для исчезновения.

### animationEasing
Тип: `string` или `array`
По умолчанию: `swing`

Динамика выполнения анимации. В jQuery доступны `linear` и `swing`, но вы можете использовать и другие, _подключив соответствующие расширения (например, jQuery Easing)_.

Если указать как `string`, например — `animationEasing: 'linear'`, то будет задано _одинаковое_ значение для динамики анимации элемента при появлении и исчезновении.

Если указать как `array`, например — `animationEasing: ['swing','linear']`, то будет задано _разное_ значение для динамики анимации элемента при появлении и исчезновении. Первое значение для появления, второе для исчезновения.

### animationType
Тип: `string`
По умолчанию: `full`

Доступно:
- `full` — анимирует выбранной анимацией _появление и исчезновение_.
- `in` — анимирует выбранной анимацией _только появление_.
- `out` — анимирует выбранной анимацией _только исчезновение_.

### animationScale
Тип: `array`
По умолчанию: `[1,0]`

Изменение размера в анимации. Применимо только к анимациям `scale` и `spin`. Первое значение массива - какой будет окончательный размер элемента после постепенного появления текста. Например, 1 - это стандартный размер, 2 - это в два раза больше и т.д. Второе значение массива - определяет окончательный размер после постепенного исчезновения элемента.

### animationRotateDeg
Тип: `number`
По умолчанию: `720`

Градус верчения-кручения элемента. Применимо только к анимации `spin`.

### delay
Тип: `number`
По умолчанию: `2000`

- При `method: 'single'` — задержка между сменой текста элемента в миллисекундах.
- При `method: 'group'` — задержка между сменой текста элементов группы поочередно в миллисекундах.

### delayStart
Тип: `number`
По умолчанию: `2000`

Задержка перед началом смены текста.

### delayGroup
Тип: `number`
По умолчанию: `2000`

- При `method: 'single'` — не имеет никакого смысла.
- При `method: 'group'` — задержка между полным проходом смены текста по всем элементам группы за раз.

### animateOne
Тип: `boolean`
По умолчанию: `false`

Анимировать элемент, если нет раздельных частей для смены текста.

### trim
Тип: `boolean`
По умолчанию: `true`

Удаление пробельных символов в начале и в конце частей сменного текста.

### css
Тип: `object`
По умолчанию: `undefined`

Вы можете добавить необходимые стили CSS на элемент.

```javascript
$('element').atrotating({
    css: {
        "color": "#000",
        "font-size": "20px"
    }
});
```