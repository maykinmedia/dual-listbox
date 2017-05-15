[![Build Status](https://travis-ci.org/maykinmedia/dual-listbox.svg?branch=master)](https://travis-ci.org/maykinmedia/dual-listbox)
[![Coverage Status](https://coveralls.io/repos/github/maykinmedia/dual-listbox/badge.svg?branch=master)](https://coveralls.io/github/maykinmedia/dual-listbox?branch=master)
[![Code Climate](https://codeclimate.com/github/maykinmedia/dual-listbox/badges/gpa.svg)](https://codeclimate.com/github/maykinmedia/dual-listbox)
[![Lintly](https://lintly.com/gh/maykinmedia/dual-listbox/badge.svg)](https://lintly.com/gh/maykinmedia/dual-listbox/)

# Dual Listbox

> Make your multi select pretty and easy to use with only javascript.

Styling.

![Default](screenshots/select1.png)

with selected options and one option highlighted.

![selected](screenshots/select2.png)

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i dual-listbox --save
```

## Usage

```javascript
new DualListbox('select'); // Selects the first selectbox on the page.
new DualListbox('.select'); // Selects the first element with the class 'select'
new DualListbox('#select'); // Selects the first element with the id 'select'
```

You can also pass some options to the DualListbox

```javascript
new DualListbox('#select', {
    addEvent: function(value) {
        console.log(value);
    },
    removeEvent: function(value) {
        console.log(value);
    },
    availableTitle: 'Different title',
    selectedTitle: 'Different title',
    addButtonText: '>',
    removeButtonText: '<',
    addAllButtonText: '>>',
    removeAllButtonText: '<<'
});
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/maykinmedia/dual-listbox/issues).

## Author

**Maykin Media**

* [maykinmedia.nl](https://www.maykinmedia.nl/)
* [github/maykinmedia](https://github.com/maykinmedia)
* [twitter/maykinmedia](http://twitter.com/maykinmedia)

## License

Copyright © 2016 [Maykin Media](https://www.maykinmedia.nl/)
Licensed under the MIT license.
