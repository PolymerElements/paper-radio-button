import '../polymer/polymer.js';
import { PaperCheckedElementBehavior } from '../paper-behaviors/paper-checked-element-behavior.js';
import '../paper-styles/default-theme.js';
import '../iron-flex-layout/iron-flex-layout.js';
import { Polymer } from '../polymer/lib/legacy/polymer-fn.js';
import { afterNextRender } from '../polymer/lib/utils/render-status.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="paper-radio-button">
  <template strip-whitespace="">
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

      :host-context([dir="rtl"]) #radioLabel {
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
      <div id="offRadio"></div>
      <div id="onRadio"></div>
    </div>

    <div id="radioLabel"><slot></slot></div>
  </template>

  
</dom-module>`;

document.head.appendChild($_documentContainer);
Polymer({
  is: 'paper-radio-button',

  behaviors: [
    PaperCheckedElementBehavior
  ],

  hostAttributes: {
    role: 'radio',
    'aria-checked': false,
    tabindex: 0
  },

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

    ariaActiveAttribute: {
      type: String,
      value: 'aria-checked'
    }
  },

  ready: function() {
    this._rippleContainer = this.$.radioContainer;
  },

  attached: function() {
    // Wait until styles have resolved to check for the default sentinel.
    // See polymer#4009 for more details.
    afterNextRender(this, function() {
      var inkSize = this.getComputedStyleValue('--calculated-paper-radio-button-ink-size').trim();
      // If unset, compute and set the default `--paper-radio-button-ink-size`.
      if (inkSize === '-1px') {
        var size = parseFloat(this.getComputedStyleValue('--calculated-paper-radio-button-size').trim());
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
})
