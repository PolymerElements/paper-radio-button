/**
 * @fileoverview Closure compiler externs for paper-radio-button. See docs at
 * https://www.polymer-project.org/docs/elements/paper-elements.html#paper-radio-button.
 */


/** @constructor @extends {PolymerElement} */
var PaperRadioButtonElement = function() {};


/**
 * Gets or sets the state, true is checked and false is unchecked. Defaults to
 * false.
 * @type {boolean}
 */
PaperRadioButtonElement.prototype.checked;


/**
 * The label for the radio button. Defaults to an empty string.
 * @type {string}
 */
PaperRadioButtonElement.prototype.label;


/**
 * Normally the user cannot uncheck the radio button by tapping once checked.
 * Setting this property to true makes the radio button toggleable from checked
 * to unchecked.
 * @type {boolean}
 */
PaperRadioButtonElement.prototype.toggles;


/**
 * If true, the user cannot interact with this element.
 * @type {boolean}
 */
PaperRadioButtonElement.prototype.disabled;

