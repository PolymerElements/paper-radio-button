/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/paper-styles/default-theme.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

import {PaperCheckedElementBehavior} from '@polymer/paper-behaviors/paper-checked-element-behavior.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';

/**
Material design: [Radio button](https://www.google.com/design/spec/components/selection-controls.html#selection-controls-radio-button)

`paper-radio-button` is a button that can be either checked or unchecked. The
user can tap the radio button to check or uncheck it.

Use a `<paper-radio-group>` to group a set of radio buttons. When radio buttons
are inside a radio group, exactly one radio button in the group can be checked
at any time.

Example:

    <paper-radio-button></paper-radio-button>
    <paper-radio-button>Item label</paper-radio-button>
    <paper-radio-button icon>
      <span slot="icon">
        <iron-icon icon="search"></iron-icon>
      </span>
    </paper-radio-button>

### Styling

The following custom properties and mixins are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--paper-radio-button-unchecked-background-color` | Radio button background color when the input is not checked | `transparent`
`--paper-radio-button-unchecked-color` | Radio button color when the input is not checked | `--primary-text-color`
`--paper-radio-button-unchecked-ink-color` | Selected/focus ripple color when the input is not checked | `--primary-text-color`
`--paper-radio-button-checked-color` | Radio button color when the input is checked | `--primary-color`
`--paper-radio-button-checked-ink-color` | Selected/focus ripple color when the input is checked | `--primary-color`
`--paper-radio-button-size` | Size of the radio button | `16px`
`--paper-radio-button-ink-size` | Size of the ripple | `48px`
`--paper-radio-button-label-color` | Label color | `--primary-text-color`
`--paper-radio-button-label-spacing` | Spacing between the label and the button | `10px`
`--paper-radio-button-radio-container` | A mixin applied to the internal radio container | `{}`
`--paper-radio-button-label` | A mixin applied to the internal label | `{}`
`--paper-radio-button-label-checked` | A mixin applied to the internal label when the radio button is checked | `{}`

This element applies the mixin `--paper-font-common-base` but does not import
`paper-styles/typography.html`. In order to apply the `Roboto` font to this
element, make sure you've imported `paper-styles/typography.html`.

@element paper-radio-button
@demo demo/index.html
*/
Polymer({
  /** @override */
  _template: html`
    <style>
      :host {
        display: inline-block;
        line-height: 0;
        white-space: nowrap;
        cursor: pointer;
        @apply --paper-font-common-base;
        --calculated-paper-radio-button-size: var(--paper-radio-button-size, 16px);
        /* -1px is a sentinel for the default and is replace in \`attached\`. */
        --calculated-paper-radio-button-ink-size: var(--paper-radio-button-ink-size, -1px);
      }

      :host(:focus) {
        outline: none;
      }

      #radioContainer {
        @apply --layout-inline;
        @apply --layout-center-center;
        position: relative;
        width: var(--calculated-paper-radio-button-size);
        height: var(--calculated-paper-radio-button-size);
        vertical-align: middle;

        @apply --paper-radio-button-radio-container;
      }

      #ink {
        position: absolute;
        top: 50%;
        left: 50%;
        right: auto;
        width: var(--calculated-paper-radio-button-ink-size);
        height: var(--calculated-paper-radio-button-ink-size);
        color: var(--paper-radio-button-unchecked-ink-color, var(--primary-text-color));
        opacity: 0.6;
        pointer-events: none;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }

      #ink[checked] {
        color: var(--paper-radio-button-checked-ink-color, var(--primary-color));
      }

      #offRadio, #onRadio {
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      #offRadio {
        border: 2px solid var(--paper-radio-button-unchecked-color, var(--primary-text-color));
        background-color: var(--paper-radio-button-unchecked-background-color, transparent);
        transition: border-color 0.28s;
      }

      #onRadio {
        background-color: var(--paper-radio-button-checked-color, var(--primary-color));
        -webkit-transform: scale(0);
        transform: scale(0);
        transition: -webkit-transform ease 0.28s;
        transition: transform ease 0.28s;
        will-change: transform;
      }

      :host([checked]) #offRadio {
        border-color: var(--paper-radio-button-checked-color, var(--primary-color));
      }

      :host([checked]) #onRadio {
        -webkit-transform: scale(0.5);
        transform: scale(0.5);
      }

      #radioLabel {
        line-height: normal;
        position: relative;
        display: inline-block;
        vertical-align: middle;
        margin-left: var(--paper-radio-button-label-spacing, 10px);
        white-space: normal;
        color: var(--paper-radio-button-label-color, var(--primary-text-color));

        @apply --paper-radio-button-label;
      }

      :host([checked]) #radioLabel {
        @apply --paper-radio-button-label-checked;
      }

      #radioLabel:dir(rtl) {
        margin-left: 0;
        margin-right: var(--paper-radio-button-label-spacing, 10px);
      }

      #radioLabel[hidden] {
        display: none;
      }

      /* disabled state */

      :host([disabled]) #offRadio {
        border-color: var(--paper-radio-button-unchecked-color, var(--primary-text-color));
        opacity: 0.5;
      }

      :host([disabled][checked]) #onRadio {
        background-color: var(--paper-radio-button-unchecked-color, var(--primary-text-color));
        opacity: 0.5;
      }

      :host([disabled]) #radioLabel {
        /* slightly darker than the button, so that it's readable */
        opacity: 0.65;
      }
    </style>

    <div id="radioContainer">
      <div id="offRadio">
        <slot name="icon"></slot>
      </div>
      <div id="onRadio"></div>
    </div>

    <div id="radioLabel"><slot></slot></div>
  `,

  is: 'paper-radio-button',

  behaviors: [PaperCheckedElementBehavior],

  hostAttributes: {role: 'radio', 'aria-checked': false, tabindex: 0},

  properties: {
    /**
     * Fired when the checked state changes due to user interaction.
     *
     * @event change
     */

    /**
     * Fired when the checked state changes.
     *
     * @event iron-change
     */

    ariaActiveAttribute: {type: String, value: 'aria-checked'}
  },

  /** @override */
  ready: function() {
    this._rippleContainer = this.$.radioContainer;
  },

  /** @override */
  attached: function() {
    // Wait until styles have resolved to check for the default sentinel.
    // See polymer#4009 for more details.
    afterNextRender(this, function() {
      var inkSize =
          this.getComputedStyleValue('--calculated-paper-radio-button-ink-size')
              .trim();
      // If unset, compute and set the default `--paper-radio-button-ink-size`.
      if (inkSize === '-1px') {
        var size = parseFloat(
            this.getComputedStyleValue('--calculated-paper-radio-button-size')
                .trim());
        var defaultInkSize = Math.floor(3 * size);

        // The button and ripple need to have the same parity so that their
        // centers align.
        if (defaultInkSize % 2 !== size % 2) {
          defaultInkSize++;
        }

        this.updateStyles({
          '--paper-radio-button-ink-size': defaultInkSize + 'px',
        });
      }
    });
  },

  /** @override */
  registered() {
    this._template.setAttribute('strip-whitespace', '');
  }
})
