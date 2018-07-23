[![Published on NPM](https://img.shields.io/npm/v/@polymer/paper-radio-button.svg)](https://www.npmjs.com/package/@polymer/paper-radio-button)
[![Build status](https://travis-ci.org/PolymerElements/paper-radio-button.svg?branch=master)](https://travis-ci.org/PolymerElements/paper-radio-button)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@polymer/paper-radio-button)

## &lt;paper-radio-button&gt;

`paper-radio-button` is a button that can be either checked or unchecked. The
user can tap the radio button to check or uncheck it.

Use a `<paper-radio-group>` to group a set of radio buttons. When radio buttons
are inside a radio group, exactly one radio button in the group can be checked
at any time.

See: [Documentation](https://www.webcomponents.org/element/@polymer/paper-radio-button),
  [Demo](https://www.webcomponents.org/element/@polymer/paper-radio-button/demo/demo/index.html).

## Usage

### Installation

```
npm install --save @polymer/paper-radio-button
```

### In an HTML file

```html
<html>
  <head>
    <script type="module">
      import '@polymer/paper-radio-button/paper-radio-button.js';
    </script>
  </head>
  <body>
    <paper-radio-button>Unchecked</paper-radio-button>
    <paper-radio-button checked>Checked</paper-radio-button>
    <paper-radio-button disabled>Disabled</paper-radio-button>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';

import '@polymer/paper-radio-button/paper-radio-button.js';

class ExampleElement extends PolymerElement {
  static get template() {
    return html`
      <paper-radio-button>Unchecked</paper-radio-button>
      <paper-radio-button checked>Checked</paper-radio-button>
      <paper-radio-button disabled>Disabled</paper-radio-button>
    `;
  }
}

customElements.define('example-element', ExampleElement);
```

## Contributing

If you want to send a PR to this element, here are the instructions for running
the tests and demo locally:

### Installation

```sh
git clone https://github.com/PolymerElements/paper-radio-button
cd paper-radio-button
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests

```sh
polymer test --npm
```
