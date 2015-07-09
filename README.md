# jQuery.auto-text-rotating [![README RUS](https://img.shields.io/badge/README-%D0%9F%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C%20%D0%BD%D0%B0%20%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%BE%D0%BC-brightgreen.svg)](README_RUS.md)
[![GitHub version](https://badge.fury.io/gh/Arttse%2Fjquery.auto-text-rotating.svg)](https://github.com/Arttse/jquery.auto-text-rotating/releases/latest) [![npm version](https://badge.fury.io/js/jquery.auto-text-rotating.svg)](https://www.npmjs.com/package/jquery.auto-text-rotating) [![Bower version](https://badge.fury.io/bo/jquery.auto-text-rotating.svg)](http://bower.io/search/?q=jquery.auto-text-rotating) [![Travis Ci Build Status](https://api.travis-ci.org/Arttse/jquery.auto-text-rotating.svg)](https://travis-ci.org/Arttse/jquery.auto-text-rotating) [![Codacy Badge](https://www.codacy.com/project/badge/f7bd8ee47c0d476fbbecfcc2e6acb4a4)](https://www.codacy.com/app/Arttse/jquery-auto-text-rotating) [![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.txt) [![SemVer 2.0](https://img.shields.io/badge/semver-2.0-blue.svg)](http://semver.org) [![devDependency Status](https://david-dm.org/Arttse/jquery.auto-text-rotating/dev-status.svg)](https://david-dm.org/Arttse/jquery.auto-text-rotating#info=devDependencies) [![View Demo](https://img.shields.io/badge/View-Demo-CA81FD.svg)](http://arttse.name/jquery-auto-text-rotating/demo)

> jQuery plugin to change/rotation of text or html, single or group, automatically with a separator.

## Features
- Lots of settings, easy to customize to your liking.
- Support plain text and HTML.
- Alternately change/rotation of text, both single and in a group.
- The ability to control the settings of the animation of the appearance of the text and disappearance.
- 5 animations support functions smooth (Easing).
- Support animations Animate.css.

## Quick start

### Step one. Installation

#### NPM
```
npm install jquery.auto-text-rotating
```

#### Bower
```
bower install jquery.auto-text-rotating
```

#### Link required files
```html
<!-- Include jQuery library (For example served from Google) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<!-- Include jQuery plugin -->
<script src="jquery.auto-text-rotating.min.js"></script>
```

### Step two. Create HTML markup
```html
<div class="element">First|Second|Third</div>
```

### Step three

#### Initialization on one element
```javascript
$('.element').atrotating();
```

#### Initialization of the group of elements alternately
```javascript
$('.element').atrotating({
    method: 'group'
});
```
When HTML:
```html
<div class="element">First|Fourth</div>
<div class="element">Second|Fifth</div>
<div class="element">Third|Sixth</div>
```

## Methods

### Method 'init'

Initialization. Start changing parts of the text with the settings.

Examples of usage:
```javascript
$('.element').atrotating();
```
OR
```javascript
$('.element').atrotating('init');
```
OR
```javascript
var settings = {
    type: 'html',
    animationSpeed: [400,300]
};
$('.element').atrotating(settings);
```
OR
```javascript
var settings = {
    type: 'html',
    animationSpeed: [400,300]
};
$('.element').atrotating('init', settings);
```

#### Settings 'init' method

The plugin takes the settings as an object.

##### type
Type: `string`  
Default: `text`

Available:

- `text` — processed just text, cut out all html tags.
- `html` — processed text with html tags.

##### method
Type: `string`  
Default: `single`

Available:

- `single` — to handle one at a time.
- `group` — to process each element in turn in the group.

##### separator
Type: `string`  
Default: `|`

The delimiter to separate the text into parts that will change.

##### animation
Type: `string`  
Default: `fade`

Animation when changing text.

Available:

- `no` — there is no animation effect. Sometimes the correct thing? Huh?
- `fade` — the effect of the gradual disappearance (Easing).
- `scale` — the effect of increasing and decreasing the size of the element (Easing).
- `spin` — the effect of increasing or decreasing the size of the element + rotate (Easing).
- `flipY` — the effect of flip horizontally (Easing).
- `flipX` — the effect of flip vertically (Easing).
- `animateCss` — use an external library CSS3 animations Animate.css.

##### animationSpeed
Type: `number` or `array`  
Default: `300`

The execution speed of animation in milliseconds.

If you specify how `number`, for example — `animationSpeed: 150`, it will be set to the _same value_ for the speed of the animation element in the appearance and disappearance.

If you specify how `array`, for example — `animationSpeed: [300,400]`, it will set a _different value_ for the speed of the animation element in the appearance and disappearance. The first value for the appearance, second to disappearance.

##### animationEasing
Type: `string` or `array`  
Default: `swing`

Dynamics of execution of the animation. In jQuery is available `linear` and `swing`, but you can use other by connecting the _appropriate extensions (for example, jQuery Easing)_.

If you specify how `string`, for example — `animationEasing: 'linear'`, it will be set to the _same value_ for the dynamics of the animation element in the appearance and disappearance.

If you specify how `array`, for example — `animationEasing: ['swing','linear']`, it will set a different value for the dynamics of the animation element in the appearance and disappearance. The first value for the appearance, second to disappearance.

Does not work with `animation: 'animateCss'`.

##### animationType
Type: `string`  
Default: `full`

Available:

- `full` — animates the selected animation the _appearance and disappearance_.
- `in` — animates the selected animation _only appearance_.
- `out` — animates the selected animation _only disappearance_.

##### animationScale
Type: `array`  
Default: `[1,0]`

Resize the animation. Only applies to animations `scale` and `spin`. The first value of the array what will be the final size of the element after the gradual appearance of the text. For example, 1 is the standard size, 2 - twice, etc. The second value of the array define the final size after the gradual disappearance of the item.

##### animationRotateDeg
Type: `number` or `array`  
Default: `720`

The degree of rotation. Applies only to animations `spin`, `flipY`, `flipX`.

If you specify how `number`, for example — `animationRotateDeg: 180`, it will be set to 0 with appearance and 180 with the disappearance.

If you specify how `array`, for example — `animationRotateDeg: [-90, 0]`, the first value for the appearance, the second for the disappearance. Excluding animation `spin`, there will always be 0 for appearance.

##### animateCssClass
Type: `string`  
Default: `animated`

Class element specified in Animate.css. Applies only to animation `animateCss`.

##### animateCssAnimation
Type: `string` or `array`  
Default: `['bounceIn', 'bounceOut']`

What animation from Animate.css perform animating. Applies only to animation `animateCss`.

If you specify how `string`, for example — `animateCssAnimation: 'jello'`, it will be given only one animation.

If you specify how `array`, for example — `animateCssAnimation: ['fadeInLeft', 'fadeOutRight']`, the first value for the appearance, the second for the disappearance.

##### delay
Type: `number`  
Default: `2000`

- If you specify how `method: 'single'` — delay between the change of text in milliseconds.
- If you specify how `method: 'group'` — delay between the changing of the text of the elements of the group alternately in milliseconds.

##### delayStart
Type: `number`  
Default: `2000`

The delay before the first change of the text after initialization.

##### delayGroup
Type: `number`  
Default: `2000`

- If you specify how `method: 'single'` — doesn't make any sense.
- If you specify how `method: 'group'` — the delay between full bore change the text for all the elements of the group at a time.

##### animateOne
Type: `boolean`  
Default: `false`

Animate the element, if there are separate parts to change the text.

##### reverse
Type: `boolean`  
Default: `false`

Rotation of the parts of text from the end.

##### trim
Type: `boolean`  
Default: `true`

Remove whitespaces at the beginning and at the end of the replaceable parts of the text.

##### css
Type: `object`  
Default: `undefined`

You can add CSS styles to the element. After the method 'stop' all styles will be removed.

```javascript
$('.element').atrotating({
    css: {
        "color": "#000",
        "font-size": "20px"
    }
});
```

### Method 'stop'

Stop the rotation of the text.

Examples of usage:
```javascript
$('.element').atrotating('stop');
```
OR
```javascript
var settings = {
    content: 'firstPart',
    separator: ',',
    trim: false
};
$('.element').atrotating('stop', settings);
```

#### Settings 'stop' method

The plugin takes the settings as an object.

##### content
Type: `string`  
Default: `currentPart`

Available:

- `original` — inserts the _original text_ which was prior to initialization.
- `firstPart` — inserts the _first part_ of the original text, separated by the specified separator.
- `lastPart` — inserts the _last part_ of the original text, separated by the specified separator.
- `currentPart` — inserts the last shows part of the original text at the time of stop of rotation, separated by the specified separator.

##### separator
Type: `string`  
Default: taken from the settings when you initialize

A separator for separating text into parts for insertion after the stop, it is necessary to `content`.

##### trim
Type: `boolean`  
Default: taken from the settings when you initialize

Remove whitespaces at the beginning and at the end of the text.

### Method 'reinit'

Another initialization with the new settings.

Examples of usage:
```javascript
$('.element').atrotating('reinit');
```
OR
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

#### Settings 'reinit' method

Similar to the settings of the method `init`.