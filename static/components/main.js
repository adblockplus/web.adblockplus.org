/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/components/AppealForm/AppealForm.js":
/*!****************************************************!*\
  !*** ./static/components/AppealForm/AppealForm.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppealForm": () => (/* binding */ AppealForm)
/* harmony export */ });
/* harmony import */ var _Events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Events.js */ "./static/components/Events.js");
/* harmony import */ var _currency_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../currency.js */ "./static/components/currency.js");
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
/* global adblock */


const formTemplate = document.getElementById("appeal-form");
const fixedAmountTemplate = document.getElementById("appeal-form-amount--fixed");
const customAmountTemplate = document.getElementById("appeal-form-amount--custom");
var _paddleConfig = /*#__PURE__*/new WeakMap();
var _parentElement = /*#__PURE__*/new WeakMap();
var _currencySelect = /*#__PURE__*/new WeakMap();
var _frequenciesParentElement = /*#__PURE__*/new WeakMap();
var _amountsControlElements = /*#__PURE__*/new WeakMap();
var _errorMessageElement = /*#__PURE__*/new WeakMap();
var _submitButton = /*#__PURE__*/new WeakMap();
var _updateAmounts = /*#__PURE__*/new WeakSet();
var _showMinimumAmountError = /*#__PURE__*/new WeakSet();
var _hideMinimumAmountError = /*#__PURE__*/new WeakSet();
var _hasMinimumAmountError = /*#__PURE__*/new WeakSet();
var _handleMinimumAmountError = /*#__PURE__*/new WeakSet();
var _getCustomRadioInput = /*#__PURE__*/new WeakSet();
var _getCustomInputRadio = /*#__PURE__*/new WeakSet();
var _onAmountFocusin = /*#__PURE__*/new WeakSet();
var _onAmountInput = /*#__PURE__*/new WeakSet();
var _onSubmit = /*#__PURE__*/new WeakSet();
class AppealForm {
  constructor(_ref) {
    let {
      placeholder,
      paddleConfig,
      formConfig
    } = _ref;
    _classPrivateMethodInitSpec(this, _onSubmit);
    /** Handle when an amount radio is selected or a custom amount input is filled */
    _classPrivateMethodInitSpec(this, _onAmountInput);
    /** Handle when a custom amount input is selected / focused for input */
    _classPrivateMethodInitSpec(this, _onAmountFocusin);
    /** Get custom amount radio from reference to custom amount input */
    _classPrivateMethodInitSpec(this, _getCustomInputRadio);
    /** Get custom amount input from reference to custom amount radio */
    _classPrivateMethodInitSpec(this, _getCustomRadioInput);
    _classPrivateMethodInitSpec(this, _handleMinimumAmountError);
    _classPrivateMethodInitSpec(this, _hasMinimumAmountError);
    _classPrivateMethodInitSpec(this, _hideMinimumAmountError);
    _classPrivateMethodInitSpec(this, _showMinimumAmountError);
    _classPrivateMethodInitSpec(this, _updateAmounts);
    /** @member {Events} events interface */
    _defineProperty(this, "events", void 0);
    /** @member {Object} paddle config @see ./configuration.js */
    _classPrivateFieldInitSpec(this, _paddleConfig, {
      writable: true,
      value: void 0
    });
    /** @member {Element} form parent element */
    _classPrivateFieldInitSpec(this, _parentElement, {
      writable: true,
      value: void 0
    });
    /** @member {Element} form currency select element */
    _classPrivateFieldInitSpec(this, _currencySelect, {
      writable: true,
      value: void 0
    });
    /** @member {Element} form frequencies (once, monthly, yearly) parent element */
    _classPrivateFieldInitSpec(this, _frequenciesParentElement, {
      writable: true,
      value: void 0
    });
    /** @member {Element[]} form amount control elements (parent, label, and inputs) */
    _classPrivateFieldInitSpec(this, _amountsControlElements, {
      writable: true,
      value: []
    });
    /** @member {Element} form error message (above checkout button) */
    _classPrivateFieldInitSpec(this, _errorMessageElement, {
      writable: true,
      value: void 0
    });
    /** @member {Element} form submit button */
    _classPrivateFieldInitSpec(this, _submitButton, {
      writable: true,
      value: void 0
    });
    this.events = new _Events_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    _classPrivateFieldSet(this, _paddleConfig, paddleConfig);
    _classPrivateFieldSet(this, _parentElement, formTemplate.content.cloneNode(true).firstElementChild);
    _classPrivateFieldGet(this, _parentElement).querySelector(".appeal-form-header__heading").innerHTML = adblock.strings["appeal-form-header__heading"];
    _classPrivateFieldGet(this, _parentElement).querySelector(".appeal-form-checkout__submit").innerHTML = adblock.strings["appeal-form-checkout__submit"];
    _classPrivateFieldSet(this, _errorMessageElement, _classPrivateFieldGet(this, _parentElement).querySelector(".appeal-form__error"));
    _classPrivateFieldSet(this, _submitButton, _classPrivateFieldGet(this, _parentElement).querySelector(".appeal-form-checkout__submit"));
    // construct and reference form currency select
    _classPrivateFieldSet(this, _currencySelect, _classPrivateFieldGet(this, _parentElement).querySelector(".appeal-form-header__select"));
    for (const currency in paddleConfig.products) {
      const option = document.createElement("option");
      option.textContent = currency.toUpperCase();
      option.value = currency.toUpperCase();
      _classPrivateFieldGet(this, _currencySelect).appendChild(option);
    }
    _classPrivateFieldGet(this, _currencySelect).value = formConfig.currency;
    // construct and reference form amounts
    _classPrivateFieldSet(this, _frequenciesParentElement, _classPrivateFieldGet(this, _parentElement).querySelector(".appeal-form-frequencies"));
    for (const frequency in paddleConfig.products[formConfig.currency]) {
      let radioNumber = 1;
      const frequencyParent = _classPrivateFieldGet(this, _frequenciesParentElement).querySelector(`.appeal-form-frequency--${frequency}`);
      frequencyParent.querySelector(".appeal-form-frequency__heading").innerHTML = adblock.strings[`appeal-form-frequency__heading--${frequency}`];
      const amountsParent = frequencyParent.querySelector(".appeal-form-amounts");
      for (const amount in paddleConfig.products[formConfig.currency][frequency]) {
        let amountControl, amountRadio, amountInput;
        if (amount == "custom") {
          amountControl = customAmountTemplate.content.cloneNode(true).firstElementChild;
          amountInput = amountControl.querySelector(".appeal-form-amount__input");
          amountInput.dataset.testid = `appeal-form-amount__input--${frequency}`;
          amountInput.dataset.frequency = frequency;
        } else {
          amountControl = fixedAmountTemplate.content.cloneNode(true).firstElementChild;
        }
        amountRadio = amountControl.querySelector(".appeal-form-amount__radio");
        amountRadio.dataset.testid = `appeal-form-amount__radio--${frequency}-${radioNumber++}`;
        amountRadio.dataset.frequency = frequency;
        _classPrivateFieldGet(this, _amountsControlElements).push(amountControl);
        amountsParent.appendChild(amountControl);
      }
    }
    _classPrivateMethodGet(this, _updateAmounts, _updateAmounts2).call(this, formConfig.currency);
    _classPrivateFieldGet(this, _frequenciesParentElement).querySelectorAll(".appeal-form-amount__radio")[formConfig.selected].checked = true;
    // add form interaction listeners
    _classPrivateFieldGet(this, _currencySelect).addEventListener("change", event => _classPrivateMethodGet(this, _updateAmounts, _updateAmounts2).call(this, event.currentTarget.value));
    _classPrivateFieldGet(this, _frequenciesParentElement).addEventListener("focusin", event => _classPrivateMethodGet(this, _onAmountFocusin, _onAmountFocusin2).call(this, event));
    _classPrivateFieldGet(this, _frequenciesParentElement).addEventListener("input", event => _classPrivateMethodGet(this, _onAmountInput, _onAmountInput2).call(this, event));
    _classPrivateFieldGet(this, _parentElement).addEventListener("submit", event => _classPrivateMethodGet(this, _onSubmit, _onSubmit2).call(this, event));
    // replace placeholder with constructed form
    placeholder.replaceWith(_classPrivateFieldGet(this, _parentElement));
    // set testid on parent to signal to playwright tests that construction is completed
    _classPrivateFieldGet(this, _parentElement).dataset.testid = "appeal-form-constructed";
  }
  /**
   * @returns { currency, ferquency, product, amount }
   */
  state() {
    const radio = _classPrivateFieldGet(this, _frequenciesParentElement).querySelector(".appeal-form-amount__radio:checked");
    const currency = _classPrivateFieldGet(this, _currencySelect).value;
    const frequency = radio.dataset.frequency;
    const product = radio.dataset.product;
    let amount = radio.value;
    if (amount == "custom") {
      const input = _classPrivateMethodGet(this, _getCustomRadioInput, _getCustomRadioInput2).call(this, radio);
      amount = (0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.toCentNumber)(currency, parseFloat(input.value === "" ? input.placeholder : input.value));
    } else {
      amount = parseFloat(amount);
    }
    return {
      currency,
      frequency,
      product,
      amount
    };
  }
  disable() {
    _classPrivateFieldGet(this, _parentElement).classList.add("appeal-form--disabled");
    _classPrivateFieldGet(this, _parentElement).querySelectorAll("input, button").forEach(field => {
      field.disabled = true;
    });
  }
  enable() {
    _classPrivateFieldGet(this, _parentElement).classList.remove("appeal-form--disabled");
    _classPrivateFieldGet(this, _parentElement).querySelectorAll("input, button").forEach(field => {
      field.disabled = false;
    });
  }
}
function _updateAmounts2(currency) {
  let i = 0;
  for (const frequency in _classPrivateFieldGet(this, _paddleConfig).products[currency]) {
    for (const amount in _classPrivateFieldGet(this, _paddleConfig).products[currency][frequency]) {
      const control = _classPrivateFieldGet(this, _amountsControlElements)[i++];
      const radio = control.querySelector(".appeal-form-amount__radio");
      if (amount == "custom") {
        const input = control.querySelector(".appeal-form-amount__input");
        input.placeholder = String((0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.toDollarNumber)(currency, Object.keys(_classPrivateFieldGet(this, _paddleConfig).products[currency][frequency])[3]));
        input.dataset.minimum = (0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.toDollarNumber)(currency, _classPrivateFieldGet(this, _paddleConfig).products[currency][frequency][amount]);
        radio.dataset.product = "custom";
      } else {
        control.querySelector(".appeal-form-amount__text").textContent = (0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.toDollarString)(currency, amount);
        radio.value = amount;
        radio.dataset.product = _classPrivateFieldGet(this, _paddleConfig).products[currency][frequency][amount];
      }
    }
  }
  this.events.fire(AppealForm.EVENTS.CURRENCY_CHANGE);
}
function _showMinimumAmountError2(input) {
  _classPrivateFieldGet(this, _errorMessageElement).innerHTML = adblock.strings[`appeal-form__error--${input.dataset.frequency}`];
  _classPrivateFieldGet(this, _errorMessageElement).hidden = false;
  _classPrivateFieldGet(this, _submitButton).disabled = true;
  this.events.fire(AppealForm.EVENTS.MINIMUM_AMOUNT_ERROR_SHOW);
}
function _hideMinimumAmountError2() {
  _classPrivateFieldGet(this, _errorMessageElement).hidden = true;
  _classPrivateFieldGet(this, _submitButton).disabled = false;
  this.events.fire(AppealForm.EVENTS.MINIMUM_AMOUNT_ERROR_HIDE);
}
function _hasMinimumAmountError2(input) {
  return input.value && parseFloat(input.value) < parseFloat(input.dataset.minimum);
}
function _handleMinimumAmountError2(input) {
  if (_classPrivateMethodGet(this, _hasMinimumAmountError, _hasMinimumAmountError2).call(this, input)) {
    _classPrivateMethodGet(this, _showMinimumAmountError, _showMinimumAmountError2).call(this, input);
  } else {
    _classPrivateMethodGet(this, _hideMinimumAmountError, _hideMinimumAmountError2).call(this);
  }
}
function _getCustomRadioInput2(radio) {
  return radio.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__input");
}
function _getCustomInputRadio2(input) {
  return input.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__radio");
}
function _onAmountFocusin2(event) {
  if (event.target.type == "number") {
    // Check checkbox beside custom amount input when custom amount input is selected for entry
    _classPrivateMethodGet(this, _getCustomInputRadio, _getCustomInputRadio2).call(this, event.target).checked = true;
    // Handle possible minimum amount error when custom amount input re-selected already has a value below the minimum
    _classPrivateMethodGet(this, _handleMinimumAmountError, _handleMinimumAmountError2).call(this, event.target);
  }
}
function _onAmountInput2(event) {
  if (event.target.type == "number") {
    // Handle possible minimum amount error when custom amount input is filled
    _classPrivateMethodGet(this, _handleMinimumAmountError, _handleMinimumAmountError2).call(this, event.target);
  } else if (event.target.type == "radio") {
    // Handle possible minimum amount error when custom amount is re-selected via radio
    if (event.target.value == "custom") {
      _classPrivateMethodGet(this, _handleMinimumAmountError, _handleMinimumAmountError2).call(this, _classPrivateMethodGet(this, _getCustomRadioInput, _getCustomRadioInput2).call(this, event.target));
    } else {
      // Hide minimum amount error when fixed amount (a non custom amount) is selected
      _classPrivateMethodGet(this, _hideMinimumAmountError, _hideMinimumAmountError2).call(this);
    }
  }
  this.events.fire(AppealForm.EVENTS.AMOUNT_CHANGE);
}
function _onSubmit2(event) {
  event.preventDefault();
  const radio = _classPrivateFieldGet(this, _frequenciesParentElement).querySelector(".appeal-form-amount__radio:checked");
  if (radio.value == "custom") {
    const input = _classPrivateMethodGet(this, _getCustomRadioInput, _getCustomRadioInput2).call(this, radio);
    if (_classPrivateMethodGet(this, _hasMinimumAmountError, _hasMinimumAmountError2).call(this, input)) {
      return _classPrivateMethodGet(this, _showMinimumAmountError, _showMinimumAmountError2).call(this, input);
    }
  }
  this.events.fire(AppealForm.EVENTS.SUBMIT, this.state());
}
/** @static {Object} EVENTS names constants */
_defineProperty(AppealForm, "EVENTS", {
  CURRENCY_CHANGE: "CURRENCY_CHANGE",
  MINIMUM_AMOUNT_ERROR_SHOW: "SHOW_MINIMUM_AMOUNT_ERROR",
  MINIMUM_AMOUNT_ERROR_HIDE: "HIDE_MINIMUM_AMOUNT_ERROR",
  AMOUNT_CHANGE: "AMOUNT_CHANGE",
  SUBMIT: "SUBMIT"
});
adblock.lib.AppealForm = AppealForm;

/***/ }),

/***/ "./static/components/AppealForm/configuration.js":
/*!*******************************************************!*\
  !*** ./static/components/AppealForm/configuration.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONFIGURATION": () => (/* binding */ CONFIGURATION)
/* harmony export */ });
const CONFIGURATION = {
  AppealForm: {
    currency: typeof adblock == "object" ? adblock.settings.currency || "USD" : "USD",
    selected: 3
  },
  Paddle: {
    sandbox: {
      vendor: 11004,
      products: {
        "USD": {
          "once": {
            "1000": 46028,
            "1500": 46029,
            "2000": 46030,
            "3500": 46031,
            "5000": 46032,
            "custom": 500
          },
          "monthly": {
            "199": 46074,
            "299": 46075,
            "399": 46076,
            "499": 46077,
            "999": 46078,
            "custom": 199
          },
          "yearly": {
            "1000": 46079,
            "1500": 46080,
            "2000": 46081,
            "3500": 46082,
            "5000": 46083,
            "custom": 500
          }
        },
        "AUD": {
          "once": {
            "1000": 46033,
            "1500": 46034,
            "2000": 46035,
            "3500": 46036,
            "5000": 46037,
            "custom": 500
          },
          "monthly": {
            "199": 46084,
            "299": 46085,
            "399": 46086,
            "499": 46087,
            "999": 46088,
            "custom": 199
          },
          "yearly": {
            "1000": 46089,
            "1500": 46090,
            "2000": 46091,
            "3500": 46092,
            "5000": 46093,
            "custom": 500
          }
        },
        "CAD": {
          "once": {
            "1000": 46038,
            "1500": 46039,
            "2000": 46040,
            "3500": 46041,
            "5000": 46042,
            "custom": 500
          },
          "monthly": {
            "199": 46094,
            "299": 46095,
            "399": 46096,
            "499": 46097,
            "999": 46098,
            "custom": 199
          },
          "yearly": {
            "1000": 46099,
            "1500": 46181,
            "2000": 46182,
            "3500": 46183,
            "5000": 46184,
            "custom": 500
          }
        },
        "EUR": {
          "once": {
            "1000": 46048,
            "1500": 46049,
            "2000": 46050,
            "3500": 46051,
            "5000": 46052,
            "custom": 500
          },
          "monthly": {
            "199": 46195,
            "299": 46196,
            "399": 46197,
            "499": 46198,
            "999": 46199,
            "custom": 199
          },
          "yearly": {
            "1000": 46200,
            "1500": 46201,
            "2000": 46202,
            "3500": 46203,
            "5000": 46204,
            "custom": 500
          }
        },
        "GBP": {
          "once": {
            "1000": 46053,
            "1500": 46054,
            "2000": 46055,
            "3500": 46056,
            "5000": 46057,
            "custom": 500
          },
          "monthly": {
            "199": 46205,
            "299": 46206,
            "399": 46207,
            "499": 46208,
            "999": 46209,
            "custom": 199
          },
          "yearly": {
            "1000": 46210,
            "1500": 46211,
            "2000": 46212,
            "3500": 46213,
            "5000": 46214,
            "custom": 500
          }
        },
        "JPY": {
          "once": {
            "1500": 46064,
            "2000": 46065,
            "2500": 46066,
            "3500": 46067,
            "5000": 46068,
            "custom": 500
          },
          "monthly": {
            "200": 46225,
            "300": 46226,
            "500": 46227,
            "1000": 46228,
            "1500": 46229,
            "custom": 200
          },
          "yearly": {
            "1500": 46230,
            "2000": 46231,
            "2500": 46232,
            "3500": 46233,
            "5000": 46234,
            "custom": 500
          }
        },
        "NZD": {
          "once": {
            "1000": 46058,
            "1500": 46059,
            "2000": 46060,
            "3500": 46062,
            "5000": 46063,
            "custom": 500
          },
          "monthly": {
            "199": 46215,
            "299": 46216,
            "399": 46217,
            "499": 46218,
            "999": 46219,
            "custom": 199
          },
          "yearly": {
            "1000": 46220,
            "1500": 46221,
            "2000": 46222,
            "3500": 46223,
            "5000": 46224,
            "custom": 500
          }
        },
        "CHF": {
          "once": {
            "1000": 46043,
            "1500": 46044,
            "2000": 46045,
            "3500": 46046,
            "5000": 46047,
            "custom": 500
          },
          "monthly": {
            "199": 46185,
            "299": 46186,
            "399": 46187,
            "499": 46188,
            "999": 46189,
            "custom": 199
          },
          "yearly": {
            "1000": 46190,
            "1500": 46191,
            "2000": 46192,
            "3500": 46193,
            "5000": 46194,
            "custom": 500
          }
        },
        "RUB": {
          "once": {
            "25000": 46069,
            "50000": 46070,
            "100000": 46071,
            "250000": 46072,
            "500000": 46073,
            "custom": 25000
          },
          "monthly": {
            "15000": 46235,
            "25000": 46236,
            "40000": 46237,
            "50000": 46238,
            "100000": 46239,
            "custom": 15000
          },
          "yearly": {
            "25000": 46240,
            "50000": 46241,
            "100000": 46242,
            "250000": 46243,
            "500000": 46244,
            "custom": 25000
          }
        }
      }
    },
    live: {
      vendor: 164164,
      products: {
        "USD": {
          "once": {
            "1000": 816549,
            "1500": 816550,
            "2000": 816551,
            "3500": 816552,
            "5000": 816553,
            "custom": 500
          },
          "monthly": {
            "199": 816774,
            "299": 816775,
            "399": 816776,
            "499": 816777,
            "999": 816778,
            "custom": 199
          },
          "yearly": {
            "1000": 816779,
            "1500": 816780,
            "2000": 816781,
            "3500": 816782,
            "5000": 816783,
            "custom": 500
          }
        },
        "AUD": {
          "once": {
            "1000": 816522,
            "1500": 816523,
            "2000": 816524,
            "3500": 816525,
            "5000": 816526,
            "custom": 500
          },
          "monthly": {
            "199": 816692,
            "299": 816693,
            "399": 816694,
            "499": 816696,
            "999": 816697,
            "custom": 199
          },
          "yearly": {
            "1000": 816699,
            "1500": 816700,
            "2000": 816702,
            "3500": 816703,
            "5000": 816705,
            "custom": 500
          }
        },
        "CAD": {
          "once": {
            "1000": 816528,
            "1500": 816529,
            "2000": 816530,
            "3500": 816531,
            "5000": 816532,
            "custom": 500
          },
          "monthly": {
            "199": 816706,
            "299": 816708,
            "399": 816710,
            "499": 816711,
            "999": 816712,
            "custom": 199
          },
          "yearly": {
            "1000": 816714,
            "1500": 816715,
            "2000": 816716,
            "3500": 816717,
            "5000": 816718,
            "custom": 500
          }
        },
        "EUR": {
          "once": {
            "1000": 816517,
            "1500": 816518,
            "2000": 816519,
            "3500": 816520,
            "5000": 816521,
            "custom": 500
          },
          "monthly": {
            "199": 816681,
            "299": 816682,
            "399": 816683,
            "499": 816684,
            "999": 816686,
            "custom": 199
          },
          "yearly": {
            "1000": 816687,
            "1500": 816688,
            "2000": 816689,
            "3500": 816690,
            "5000": 816691,
            "custom": 500
          }
        },
        "GBP": {
          "once": {
            "1000": 816538,
            "1500": 816539,
            "2000": 816540,
            "3500": 816541,
            "5000": 816542,
            "custom": 500
          },
          "monthly": {
            "199": 816734,
            "299": 816735,
            "399": 816736,
            "499": 816737,
            "999": 816738,
            "custom": 199
          },
          "yearly": {
            "1000": 816739,
            "1500": 816740,
            "2000": 816741,
            "3500": 816743,
            "5000": 816744,
            "custom": 500
          }
        },
        "JPY": {
          "once": {
            "1500": 816554,
            "2000": 816555,
            "2500": 816556,
            "3500": 816557,
            "5000": 816558,
            "custom": 500
          },
          "monthly": {
            "200": 816784,
            "300": 816785,
            "500": 816786,
            "1000": 816787,
            "1500": 816788,
            "custom": 200
          },
          "yearly": {
            "1500": 816789,
            "2000": 816791,
            "2500": 816792,
            "3500": 816794,
            "5000": 816795,
            "custom": 500
          }
        },
        "NZD": {
          "once": {
            "1000": 816543,
            "1500": 816544,
            "2000": 816545,
            "3500": 816547,
            "5000": 816548,
            "custom": 500
          },
          "monthly": {
            "199": 816760,
            "299": 816762,
            "399": 816764,
            "499": 816766,
            "999": 816768,
            "custom": 199
          },
          "yearly": {
            "1000": 816769,
            "1500": 816770,
            "2000": 816771,
            "3500": 816772,
            "5000": 816773,
            "custom": 500
          }
        },
        "CHF": {
          "once": {
            "1000": 816533,
            "1500": 816535,
            "2000": 816534,
            "3500": 816536,
            "5000": 816537,
            "custom": 500
          },
          "monthly": {
            "199": 816720,
            "299": 816722,
            "399": 816723,
            "499": 816725,
            "999": 816726,
            "custom": 199
          },
          "yearly": {
            "1000": 816727,
            "1500": 816728,
            "2000": 816730,
            "3500": 816731,
            "5000": 816733,
            "custom": 500
          }
        },
        "RUB": {
          "once": {
            "25000": 816559,
            "50000": 816560,
            "100000": 816561,
            "250000": 816562,
            "500000": 816563,
            "custom": 25000
          },
          "monthly": {
            "15000": 816796,
            "25000": 816797,
            "40000": 816799,
            "50000": 816800,
            "100000": 816801,
            "custom": 15000
          },
          "yearly": {
            "25000": 816802,
            "50000": 816803,
            "100000": 816804,
            "250000": 816805,
            "500000": 816806,
            "custom": 25000
          }
        }
      }
    }
  }
};

/***/ }),

/***/ "./static/components/AppealForm/controller.js":
/*!****************************************************!*\
  !*** ./static/components/AppealForm/controller.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _configuration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configuration.js */ "./static/components/AppealForm/configuration.js");
/* harmony import */ var _AppealForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppealForm.js */ "./static/components/AppealForm/AppealForm.js");
/* harmony import */ var _currency_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../currency.js */ "./static/components/currency.js");
/* global adblock, eyeo, Paddle */




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  const SANDBOX_HOSTNAMES = [/^localhost$/, /^[\w\-]+.staging-new-adblockplus-org-1.uplink.eyeo.it$/, /^dev--adblockplus-org--[\w\-]+.web.app$/];
  let paddleConfig = SANDBOX_HOSTNAMES.some(originPattern => {
    return originPattern.test(location.hostname);
  }) ? _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.sandbox : _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.live;
  if (adblock.searchParameters.has("testmode") || adblock.searchParameters.get("mode") == "test") {
    paddleConfig = _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.sandbox;
  } else if (adblock.searchParameters.get("mode") == "live") {
    paddleConfig = _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.live;
  }
  adblock.config.paddle = paddleConfig;
  const isTestmode = paddleConfig == _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.sandbox;
  if (isTestmode) Paddle.Environment.set("sandbox");
  Paddle.Setup({
    vendor: paddleConfig.vendor
  });
  const placeholder = document.querySelector(".appeal-form");
  const formConfig = _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.AppealForm;
  const appealForm = adblock.runtime.appealForm = new _AppealForm_js__WEBPACK_IMPORTED_MODULE_1__.AppealForm({
    paddleConfig,
    formConfig,
    placeholder
  });
  eyeo = eyeo || {};
  eyeo.payment = eyeo.payment || {};
  function getCompletedUrl() {
    if (typeof eyeo != "object" || typeof eyeo.payment != "object" || typeof eyeo.payment.paymentCompleteUrl != "string") {
      return "/payment-complete";
    } else {
      return eyeo.payment.paymentCompleteUrl;
    }
  }
  appealForm.events.on(_AppealForm_js__WEBPACK_IMPORTED_MODULE_1__.AppealForm.EVENTS.SUBMIT, data => {
    appealForm.disable();
    const contributionInfo = JSON.stringify({
      amount: data.amount,
      frequency: data.frequency,
      processor: "paddle",
      currency: data.currency,
      lang: document.documentElement.lang,
      source: eyeo.payment.sourceId || "U",
      clickTs: Date.now()
    });
    const successParameters = new URLSearchParams();
    if (eyeo.payment.productId == "ME") {
      successParameters.append("thankyou", 1);
      successParameters.append("var", 1);
      successParameters.append("u", forceGetUserId());
      successParameters.append("from", eyeo.payment.variantName || "null");
      successParameters.append("from__currency", data.currency);
      successParameters.append("from__amount", (0,_currency_js__WEBPACK_IMPORTED_MODULE_2__.toDollarNumber)(data.currency, data.amount));
      successParameters.append("from__frequency", data.frequency);
    }

    // Storing information to be consumed by optimizely and hotjar experiments
    if (eyeo.payment.shouldStoreContributionInfo) {
      localStorage.setItem("contributionInfo", contributionInfo);
    }

    // Passing contributionInfo from new.abp.o to accounts.abp.o to work around
    // Premium activation limitation. See premium.html for read.
    if (eyeo.payment.shouldStoreContributionInfo && eyeo.payment.productId == "ME") {
      successParameters.append("from__contributionInfo", contributionInfo);
    }
    const passthrough = {
      testmode: isTestmode,
      userid: eyeo.payment.productId == "ME" ? forceGetUserId() : "",
      tracking: recordTracking(),
      locale: "",
      country: "unknown",
      ga_id: "",
      premium: eyeo.payment.productId == "ME" ? "true" : "false",
      premium_cid: "0",
      premium_sid: "0",
      currency: data.currency,
      recurring: data.frequency != "once",
      subType: data.frequency != "once" ? data.frequency : "",
      experiment: "",
      experiment_id: "",
      variant: "",
      variant_index: -1,
      amount_cents: parseInt(data.amount, 10),
      success_url: `${eyeo.payment.paymentCompleteUrl || "/payment-complete"}?${successParameters.toString()}`,
      cancel_url: location.href
    };
    const product = data.product;
    const checkoutOptions = {
      locale: adblock.settings.language,
      title: adblock.strings["appeal-form-checkout__title"],
      success: passthrough.success_url,
      closeCallback: () => {
        appealForm.enable();
      }
    };
    if (product == "custom") {
      fetch("https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(passthrough)
      }).then(response => response.json()).then(session => {
        if (session.hasOwnProperty("success") && session.success == false) {
          throw new Error();
        }
        Paddle.Checkout.open(Object.assign(checkoutOptions, {
          override: session.url
        }));
      }).catch(error => {
        adblock.error(adblock.strings["error--unexpected"]);
        appealForm.enable();
      });
    } else {
      Paddle.Checkout.open(Object.assign(checkoutOptions, {
        allowQuantity: false,
        passthrough,
        product
      }));
    }
  });
}
;

/***/ }),

/***/ "./static/components/AppealFormDos/index.js":
/*!**************************************************!*\
  !*** ./static/components/AppealFormDos/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _svelte_AppealForm_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./svelte/AppealForm.svelte */ "./static/components/AppealFormDos/svelte/AppealForm.svelte");


/***/ }),

/***/ "./static/components/Counter/index.js":
/*!********************************************!*\
  !*** ./static/components/Counter/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _solid_counter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./solid-counter.js */ "./static/components/Counter/solid-counter.js");
/* harmony import */ var _svelte_counter_svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./svelte-counter.svelte */ "./static/components/Counter/svelte-counter.svelte");



/***/ }),

/***/ "./static/components/Counter/solid-counter.js":
/*!****************************************************!*\
  !*** ./static/components/Counter/solid-counter.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var solid_js_web__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! solid-js/web */ "./node_modules/solid-js/web/dist/web.cjs");
/* harmony import */ var solid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! solid-js */ "./node_modules/solid-js/dist/solid.cjs");
/* harmony import */ var solid_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! solid-element */ "./node_modules/solid-element/dist/index.js");




const _tmpl$ = /*#__PURE__*/(0,solid_js_web__WEBPACK_IMPORTED_MODULE_0__.template)(`<button>`),
  _tmpl$2 = /*#__PURE__*/(0,solid_js_web__WEBPACK_IMPORTED_MODULE_0__.template)(`<div><style>div * {
    font-size: 200%;
  }

  span {
    width: 4rem;
    display: inline-block;
    text-align: center;
  }

  button {
    width: 4rem;
    height: 4rem;
    border: none;
    border-radius: 10px;
    background-color: seagreen;
    color: white;
  }</style><span>`);


function Button(_ref) {
  let {
    children,
    ...props
  } = _ref;
  return (() => {
    const _el$ = _tmpl$();
    (0,solid_js_web__WEBPACK_IMPORTED_MODULE_0__.spread)(_el$, props, false, true);
    (0,solid_js_web__WEBPACK_IMPORTED_MODULE_0__.insert)(_el$, children);
    return _el$;
  })();
}
;
const style = `div * {
    font-size: 200%;
  }

  span {
    width: 4rem;
    display: inline-block;
    text-align: center;
  }

  button {
    width: 4rem;
    height: 4rem;
    border: none;
    border-radius: 10px;
    background-color: seagreen;
    color: white;
  }`;
(0,solid_element__WEBPACK_IMPORTED_MODULE_1__.customElement)("solid-counter", () => {
  const [count, setCount] = (0,solid_js__WEBPACK_IMPORTED_MODULE_2__.createSignal)(0);
  return (() => {
    const _el$2 = _tmpl$2(),
      _el$3 = _el$2.firstChild,
      _el$4 = _el$3.nextSibling;
    (0,solid_js_web__WEBPACK_IMPORTED_MODULE_0__.insert)(_el$2, (0,solid_js_web__WEBPACK_IMPORTED_MODULE_0__.createComponent)(Button, {
      onClick: () => setCount(count() - 1),
      children: "-"
    }), _el$4);
    (0,solid_js_web__WEBPACK_IMPORTED_MODULE_0__.insert)(_el$4, count);
    (0,solid_js_web__WEBPACK_IMPORTED_MODULE_0__.insert)(_el$2, (0,solid_js_web__WEBPACK_IMPORTED_MODULE_0__.createComponent)(Button, {
      onClick: () => setCount(count() + 1),
      children: "+"
    }), null);
    return _el$2;
  })();
});

/***/ }),

/***/ "./static/components/Events.js":
/*!*************************************!*\
  !*** ./static/components/Events.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Events)
/* harmony export */ });
class Events {
  constructor() {
    this.callbacks = {};
  }
  on(event, callback) {
    if (!this.callbacks[event]) this.callbacks[event] = [];
    this.callbacks[event].push(callback);
  }
  fire(event, data) {
    if (this.callbacks[event]) {
      for (const callback of this.callbacks[event]) {
        try {
          callback(data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
}

/***/ }),

/***/ "./static/components/currency.js":
/*!***************************************!*\
  !*** ./static/components/currency.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toCentNumber": () => (/* binding */ toCentNumber),
/* harmony export */   "toDollarNumber": () => (/* binding */ toDollarNumber),
/* harmony export */   "toDollarString": () => (/* binding */ toDollarString)
/* harmony export */ });
/** 
 * Cent amount (int) to dollar amount (float) (for applicable currencies) 
 * 
 * @param {string} currency - 3 letter currency code
 * @param {number} cents - amount in cents (for applicable currencies)
 */
function toDollarNumber(currency, cents) {
  return currency == "JPY" ? cents : cents / 100;
}

/** 
 * Dollar amount (float) to cent amount (int) (for applicable currencies) 
 * 
 * @param {string} currency - 3 letter currency code
 * @param {number} dollar - amount in dollars (for applicable currencies)
 */
function toCentNumber(currency, dollar) {
  return currency == "JPY" ? dollar : dollar * 100;
}

/** 
 * Cent amount (int) to dollar amount (float) with localised formatting (for applicable currencies) 
 * 
 * @param {string} currency - 3 letter currency code
 * @param {number} cents - amount in cents (for applicable currencies)
 */
function toDollarString(currency, cents) {
  return new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency,
    minimumFractionDigits: 0
  }).format(toDollarNumber(currency, cents));
}

/***/ }),

/***/ "./node_modules/component-register/dist/component-register.js":
/*!********************************************************************!*\
  !*** ./node_modules/component-register/dist/component-register.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compose": () => (/* binding */ compose),
/* harmony export */   "consume": () => (/* binding */ consume),
/* harmony export */   "createContext": () => (/* binding */ createContext),
/* harmony export */   "createMixin": () => (/* binding */ createMixin),
/* harmony export */   "getCurrentElement": () => (/* binding */ getCurrentElement),
/* harmony export */   "hot": () => (/* binding */ hot),
/* harmony export */   "isConstructor": () => (/* binding */ isConstructor),
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "noShadowDOM": () => (/* binding */ noShadowDOM),
/* harmony export */   "provide": () => (/* binding */ provide),
/* harmony export */   "register": () => (/* binding */ register),
/* harmony export */   "reloadElement": () => (/* binding */ reloadElement),
/* harmony export */   "toAttribute": () => (/* binding */ toAttribute),
/* harmony export */   "toProperty": () => (/* binding */ toProperty),
/* harmony export */   "withConsumer": () => (/* binding */ withConsumer),
/* harmony export */   "withProvider": () => (/* binding */ withProvider)
/* harmony export */ });
function cloneProps(props) {
  const propKeys = Object.keys(props);
  return propKeys.reduce((memo, k) => {
    const prop = props[k];
    memo[k] = Object.assign({}, prop);
    if (isObject(prop.value) && !isFunction(prop.value) && !Array.isArray(prop.value)) memo[k].value = Object.assign({}, prop.value);
    if (Array.isArray(prop.value)) memo[k].value = prop.value.slice(0);
    return memo;
  }, {});
}

function normalizePropDefs(props) {
  if (!props) return {};
  const propKeys = Object.keys(props);
  return propKeys.reduce((memo, k) => {
    const v = props[k];
    memo[k] = !(isObject(v) && "value" in v) ? {
      value: v
    } : v;
    memo[k].attribute || (memo[k].attribute = toAttribute(k));
    memo[k].parse = "parse" in memo[k] ? memo[k].parse : typeof memo[k].value !== "string";
    return memo;
  }, {});
}
function propValues(props) {
  const propKeys = Object.keys(props);
  return propKeys.reduce((memo, k) => {
    memo[k] = props[k].value;
    return memo;
  }, {});
}
function initializeProps(element, propDefinition) {
  const props = cloneProps(propDefinition),
        propKeys = Object.keys(propDefinition);
  propKeys.forEach(key => {
    const prop = props[key],
          attr = element.getAttribute(prop.attribute),
          value = element[key];
    if (attr) prop.value = prop.parse ? parseAttributeValue(attr) : attr;
    if (value != null) prop.value = Array.isArray(value) ? value.slice(0) : value;
    prop.reflect && reflect(element, prop.attribute, prop.value);
    Object.defineProperty(element, key, {
      get() {
        return prop.value;
      },

      set(val) {
        const oldValue = prop.value;
        prop.value = val;
        prop.reflect && reflect(this, prop.attribute, prop.value);

        for (let i = 0, l = this.__propertyChangedCallbacks.length; i < l; i++) {
          this.__propertyChangedCallbacks[i](key, val, oldValue);
        }
      },

      enumerable: true,
      configurable: true
    });
  });
  return props;
}
function parseAttributeValue(value) {
  if (!value) return;

  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}
function reflect(node, attribute, value) {
  if (value == null || value === false) return node.removeAttribute(attribute);
  let reflect = JSON.stringify(value);
  node.__updating[attribute] = true;
  if (reflect === "true") reflect = "";
  node.setAttribute(attribute, reflect);
  Promise.resolve().then(() => delete node.__updating[attribute]);
}
function toAttribute(propName) {
  return propName.replace(/\.?([A-Z]+)/g, (x, y) => "-" + y.toLowerCase()).replace("_", "-").replace(/^-/, "");
}
function toProperty(attr) {
  return attr.toLowerCase().replace(/(-)([a-z])/g, test => test.toUpperCase().replace("-", ""));
}
function isObject(obj) {
  return obj != null && (typeof obj === "object" || typeof obj === "function");
}
function isFunction(val) {
  return Object.prototype.toString.call(val) === "[object Function]";
}
function isConstructor(f) {
  return typeof f === "function" && f.toString().indexOf("class") === 0;
}
function reloadElement(node) {
  let callback = null;

  while (callback = node.__releaseCallbacks.pop()) callback(node);

  delete node.__initialized;
  node.renderRoot.textContent = "";
  node.connectedCallback();
}

let currentElement;
function getCurrentElement() {
  return currentElement;
}
function noShadowDOM() {
  Object.defineProperty(currentElement, "renderRoot", {
    value: currentElement
  });
}
function createElementType(BaseElement, propDefinition) {
  const propKeys = Object.keys(propDefinition);
  return class CustomElement extends BaseElement {
    static get observedAttributes() {
      return propKeys.map(k => propDefinition[k].attribute);
    }

    constructor() {
      super();
      this.__initialized = false;
      this.__released = false;
      this.__releaseCallbacks = [];
      this.__propertyChangedCallbacks = [];
      this.__updating = {};
      this.props = {};
    }

    connectedCallback() {
      if (this.__initialized) return;
      this.__releaseCallbacks = [];
      this.__propertyChangedCallbacks = [];
      this.__updating = {};
      this.props = initializeProps(this, propDefinition);
      const props = propValues(this.props),
            ComponentType = this.Component,
            outerElement = currentElement;

      try {
        currentElement = this;
        this.__initialized = true;
        if (isConstructor(ComponentType)) new ComponentType(props, {
          element: this
        });else ComponentType(props, {
          element: this
        });
      } finally {
        currentElement = outerElement;
      }
    }

    async disconnectedCallback() {
      // prevent premature releasing when element is only temporarely removed from DOM
      await Promise.resolve();
      if (this.isConnected) return;
      this.__propertyChangedCallbacks.length = 0;
      let callback = null;

      while (callback = this.__releaseCallbacks.pop()) callback(this);

      delete this.__initialized;
      this.__released = true;
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (!this.__initialized) return;
      if (this.__updating[name]) return;
      name = this.lookupProp(name);

      if (name in propDefinition) {
        if (newVal == null && !this[name]) return;
        this[name] = propDefinition[name].parse ? parseAttributeValue(newVal) : newVal;
      }
    }

    lookupProp(attrName) {
      if (!propDefinition) return;
      return propKeys.find(k => attrName === k || attrName === propDefinition[k].attribute);
    }

    get renderRoot() {
      return this.shadowRoot || this.attachShadow({
        mode: "open"
      });
    }

    addReleaseCallback(fn) {
      this.__releaseCallbacks.push(fn);
    }

    addPropertyChangedCallback(fn) {
      this.__propertyChangedCallbacks.push(fn);
    }

  };
}

function createMixin(mixinFn) {
  return ComponentType => (props, options) => {
    options = mixinFn(options);
    if (isConstructor(ComponentType)) return new ComponentType(props, options);
    return ComponentType(props, options);
  };
}
function compose(...fns) {
  if (fns.length === 0) return i => i;
  if (fns.length === 1) return fns[0];
  return fns.reduce((a, b) => (...args) => a(b(...args)));
}

const EC = Symbol('element-context');

function lookupContext(element, context) {
  return element[EC] && element[EC][context.id] || (element.host || element.parentNode) && lookupContext(element.host || element.parentNode, context);
}

function createContext(initFn) {
  return {
    id: Symbol('context'),
    initFn
  };
} // Direct

function provide(context, value, element = getCurrentElement()) {
  element[EC] || (element[EC] = {});
  return element[EC][context.id] = context.initFn ? context.initFn(value) : value;
}
function consume(context, element = getCurrentElement()) {
  return lookupContext(element, context);
} // HOCs

function withProvider(context, value) {
  return createMixin(options => {
    const {
      element
    } = options;
    provide(context, value, element);
    return options;
  });
}
function withConsumer(context, key) {
  return createMixin(options => {
    const {
      element
    } = options;
    options = Object.assign({}, options, {
      [key]: lookupContext(element, context)
    });
    return options;
  });
}

function walk(root, call) {
  call(root);
  if (root.shadowRoot) walk(root.shadowRoot, call);
  let child = root.firstChild;

  while (child) {
    child.nodeType === 1 && walk(child, call);
    child = child.nextSibling;
  }
}

function hot(module, tagName) {
  if (module.hot) {
    function update(possibleError) {
      if (possibleError && possibleError instanceof Error) {
        console.error(possibleError);
        return;
      }

      walk(document.body, node => node.localName === tagName && setTimeout(() => reloadElement(node), 0));
    } // handle both Parcel and Webpack style


    module.hot.accept(update);

    if (module.hot.status && module.hot.status() === 'apply') {
      update();
    }
  }
}

function register(tag, props = {}, options = {}) {
  const {
    BaseElement = HTMLElement,
    extension
  } = options;
  return ComponentType => {
    if (!tag) throw new Error("tag is required to register a Component");
    let ElementType = customElements.get(tag);

    if (ElementType) {
      // Consider disabling this in a production mode
      ElementType.prototype.Component = ComponentType;
      return ElementType;
    }

    ElementType = createElementType(BaseElement, normalizePropDefs(props));
    ElementType.prototype.Component = ComponentType;
    ElementType.prototype.registeredTag = tag;
    customElements.define(tag, ElementType, extension);
    return ElementType;
  };
}




/***/ }),

/***/ "./static/components/AppealFormDos/svelte/AppealForm.svelte":
/*!******************************************************************!*\
  !*** ./static/components/AppealFormDos/svelte/AppealForm.svelte ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/src/runtime/internal/index.js");
/* harmony import */ var svelte_internal_disclose_version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte/internal/disclose-version */ "./node_modules/svelte/src/runtime/internal/disclose-version/index.js");
/* harmony import */ var _AppealForm_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../AppealForm/configuration */ "./static/components/AppealForm/configuration.js");
/* harmony import */ var _Frequency_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Frequency.svelte */ "./static/components/AppealFormDos/svelte/Frequency.svelte");
/* harmony import */ var _ToggleSwitch_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ToggleSwitch.svelte */ "./static/components/AppealFormDos/svelte/ToggleSwitch.svelte");
/* static/components/AppealFormDos/svelte/AppealForm.svelte generated by Svelte v4.2.1 */







function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-s50wbp", ".appeal-form.svelte-s50wbp.svelte-s50wbp{margin-top:1rem;margin-bottom:1rem}@-webkit-keyframes svelte-s50wbp-shimmer{100%{transform:translateX(100%)}}@keyframes svelte-s50wbp-shimmer{100%{transform:translateX(100%)}}.appeal-form.svelte-s50wbp .appeal-form-frequencies.svelte-s50wbp{display:flex;flex-wrap:wrap;max-width:53.125rem;margin-top:0.5rem;margin-bottom:0.5rem}");
}

function create_fragment(ctx) {
	let div1;
	let form;
	let div0;
	let frequency0;
	let t0;
	let frequency1;
	let t1;
	let toggleswitch;
	let t2;
	let input;
	let current;
	let mounted;
	let dispose;

	frequency0 = new _Frequency_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				frequency: "once",
				products: /*products*/ ctx[1].once,
				legendText: "Make a <strong>one-off</strong> contribution"
			}
		});

	frequency1 = new _Frequency_svelte__WEBPACK_IMPORTED_MODULE_3__["default"]({
			props: {
				frequency: /*products*/ ctx[1][/*recurringFrequency*/ ctx[0]],
				products: /*products*/ ctx[1][/*recurringFrequency*/ ctx[0]],
				legendText: "Make a <strong>Recurring</strong> contribution"
			}
		});

	toggleswitch = new _ToggleSwitch_svelte__WEBPACK_IMPORTED_MODULE_4__["default"]({});
	toggleswitch.$on("click", /*handleToggleFrequencyClick*/ ctx[2]);

	return {
		c() {
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			form = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("form");
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(frequency0.$$.fragment);
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(frequency1.$$.fragment);
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(toggleswitch.$$.fragment);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "appeal-form-frequencies svelte-s50wbp");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "type", "submit");
			input.value = "Submit";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(form, "class", "appeal-form svelte-s50wbp");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div1, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, form);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(frequency0, div0, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(frequency1, div0, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(toggleswitch, div0, null);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(form, input);
			current = true;

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(form, "submit", /*submit_handler*/ ctx[3]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			const frequency1_changes = {};
			if (dirty & /*recurringFrequency*/ 1) frequency1_changes.frequency = /*products*/ ctx[1][/*recurringFrequency*/ ctx[0]];
			if (dirty & /*recurringFrequency*/ 1) frequency1_changes.products = /*products*/ ctx[1][/*recurringFrequency*/ ctx[0]];
			frequency1.$set(frequency1_changes);
		},
		i(local) {
			if (current) return;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(frequency0.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(frequency1.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(toggleswitch.$$.fragment, local);
			current = true;
		},
		o(local) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(frequency0.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(frequency1.$$.fragment, local);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(toggleswitch.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div1);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(frequency0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(frequency1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(toggleswitch);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let products = _AppealForm_configuration__WEBPACK_IMPORTED_MODULE_2__.CONFIGURATION.Paddle.sandbox.products.USD;
	let recurringFrequency = "monthly";

	function handleToggleFrequencyClick(e) {
		$$invalidate(0, recurringFrequency = e.target.checked ? "yearly" : "monthly");
	}

	const submit_handler = e => {
		e.preventDefault();
		const data = new FormData(e.target);
		const entries = [...data.entries()];
	}; // TODO: Handle form submission

	return [recurringFrequency, products, handleToggleFrequencyClick, submit_handler];
}

class AppealForm extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css);
	}
}

customElements.define("appeal-form-dos-svelte", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_custom_element)(AppealForm, {}, [], [], true));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppealForm);

/***/ }),

/***/ "./static/components/AppealFormDos/svelte/Frequency.svelte":
/*!*****************************************************************!*\
  !*** ./static/components/AppealFormDos/svelte/Frequency.svelte ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/src/runtime/internal/index.js");
/* harmony import */ var svelte_internal_disclose_version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte/internal/disclose-version */ "./node_modules/svelte/src/runtime/internal/disclose-version/index.js");
/* static/components/AppealFormDos/svelte/Frequency.svelte generated by Svelte v4.2.1 */




function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1xv3jov", ".appeal-form-frequency.svelte-1xv3jov.svelte-1xv3jov{flex:0 0 100%;padding-top:0.5rem;padding-bottom:0.5rem}@media(min-width: 55.125rem){.appeal-form-frequency.svelte-1xv3jov.svelte-1xv3jov{flex:1;padding-top:0}}.appeal-form-frequency__heading.svelte-1xv3jov.svelte-1xv3jov{font-size:1rem;font-weight:normal;margin-top:0;margin-bottom:0.375rem}.appeal-form-amounts.svelte-1xv3jov.svelte-1xv3jov{display:flex;flex-wrap:wrap;max-width:16.70875rem;align-items:center}.svelte-1xv3jov:not([dir=\"rtl\"]) .appeal-form-amounts.svelte-1xv3jov{padding-right:1rem}.appeal-form-amount.svelte-1xv3jov.svelte-1xv3jov{line-height:1.7;display:flex;width:33.33333333%}.appeal-form-amount__text.svelte-1xv3jov.svelte-1xv3jov{padding-top:1.5px}.appeal-form-amount__input.svelte-1xv3jov.svelte-1xv3jov{font-size:0.875rem;width:100%;height:1.4rem;margin-top:0.1875rem;padding:0.125rem 0.25rem 0.125rem 0.25rem;border:1px solid gray}.svelte-1xv3jov:not([dir=\"rtl\"]) .appeal-form-amount__input.svelte-1xv3jov{margin-right:0.1875rem}");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[3] = list[i];
	return child_ctx;
}

// (11:6) {#each Object.keys(products) as productAmount}
function create_each_block(ctx) {
	let label;
	let input;
	let input_data_testid_value;
	let input_value_value;
	let input_data_product_value;
	let t0;
	let span;
	let t1_value = /*productAmount*/ ctx[3] + "";
	let t1;
	let t2;

	return {
		c() {
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t1_value);
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "type", "radio");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "name", "appeal-form-amount__radio");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "class", "appeal-form-amount__radio");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "data-testid", input_data_testid_value = "appeal-form-amount__radio--" + /*frequency*/ ctx[1] + "-1");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "data-frequency", /*frequency*/ ctx[1]);
			input.value = input_value_value = /*productAmount*/ ctx[3];
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "data-product", input_data_product_value = /*products*/ ctx[2][/*productAmount*/ ctx[3]]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(span, "class", "appeal-form-amount__text svelte-1xv3jov");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label, "class", "appeal-form-amount appeal-form-amount--fixed svelte-1xv3jov");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, label, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, input);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, span);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(span, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*frequency*/ 2 && input_data_testid_value !== (input_data_testid_value = "appeal-form-amount__radio--" + /*frequency*/ ctx[1] + "-1")) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "data-testid", input_data_testid_value);
			}

			if (dirty & /*frequency*/ 2) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "data-frequency", /*frequency*/ ctx[1]);
			}

			if (dirty & /*products*/ 4 && input_value_value !== (input_value_value = /*productAmount*/ ctx[3])) {
				input.value = input_value_value;
			}

			if (dirty & /*products*/ 4 && input_data_product_value !== (input_data_product_value = /*products*/ ctx[2][/*productAmount*/ ctx[3]])) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "data-product", input_data_product_value);
			}

			if (dirty & /*products*/ 4 && t1_value !== (t1_value = /*productAmount*/ ctx[3] + "")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t1, t1_value);
		},
		d(detaching) {
			if (detaching) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(label);
			}
		}
	};
}

function create_fragment(ctx) {
	let fieldset;
	let legend;
	let t0;
	let div1;
	let div0;
	let t1;
	let label;
	let input0;
	let input0_data_testid_value;
	let t2;
	let input1;
	let input1_data_testid_value;
	let each_value = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ensure_array_like)(Object.keys(/*products*/ ctx[2]));
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			fieldset = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("fieldset");
			legend = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("legend");
			t0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			input1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(legend, "class", "appeal-form-frequency__heading svelte-1xv3jov");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "appeal-form-amounts svelte-1xv3jov");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "type", "radio");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "name", "appeal-form-amount__radio");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "class", "appeal-form-amount__radio");
			input0.value = "custom";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "data-testid", input0_data_testid_value = "appeal-form-amount__radio--" + /*frequency*/ ctx[1] + "-6");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "data-frequency", /*frequency*/ ctx[1]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "data-product", "custom");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "type", "number");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "step", ".01");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "class", "appeal-form-amount__input svelte-1xv3jov");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "data-product", "custom");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "data-testid", input1_data_testid_value = "appeal-form-amount__input--" + /*frequency*/ ctx[1]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "data-frequency", /*frequency*/ ctx[1]);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "placeholder", "35");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "data-minimum", "5");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label, "class", "appeal-form-amount appeal-form-amount--custom svelte-1xv3jov");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "appeal-form-frequency__options svelte-1xv3jov");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(fieldset, "class", "appeal-form-frequency svelte-1xv3jov");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, fieldset, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(fieldset, legend);
			legend.innerHTML = /*legendText*/ ctx[0];
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(fieldset, t0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(fieldset, div1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div0, null);
				}
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, label);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, input0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, input1);
		},
		p(ctx, [dirty]) {
			if (dirty & /*legendText*/ 1) legend.innerHTML = /*legendText*/ ctx[0];;

			if (dirty & /*Object, products, frequency*/ 6) {
				each_value = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.ensure_array_like)(Object.keys(/*products*/ ctx[2]));
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*frequency*/ 2 && input0_data_testid_value !== (input0_data_testid_value = "appeal-form-amount__radio--" + /*frequency*/ ctx[1] + "-6")) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "data-testid", input0_data_testid_value);
			}

			if (dirty & /*frequency*/ 2) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input0, "data-frequency", /*frequency*/ ctx[1]);
			}

			if (dirty & /*frequency*/ 2 && input1_data_testid_value !== (input1_data_testid_value = "appeal-form-amount__input--" + /*frequency*/ ctx[1])) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "data-testid", input1_data_testid_value);
			}

			if (dirty & /*frequency*/ 2) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input1, "data-frequency", /*frequency*/ ctx[1]);
			}
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(fieldset);
			}

			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { legendText } = $$props;
	let { frequency } = $$props;
	let { products } = $$props;

	$$self.$$set = $$props => {
		if ('legendText' in $$props) $$invalidate(0, legendText = $$props.legendText);
		if ('frequency' in $$props) $$invalidate(1, frequency = $$props.frequency);
		if ('products' in $$props) $$invalidate(2, products = $$props.products);
	};

	return [legendText, frequency, products];
}

class Frequency extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { legendText: 0, frequency: 1, products: 2 }, add_css);
	}

	get legendText() {
		return this.$$.ctx[0];
	}

	set legendText(legendText) {
		this.$$set({ legendText });
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.flush)();
	}

	get frequency() {
		return this.$$.ctx[1];
	}

	set frequency(frequency) {
		this.$$set({ frequency });
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.flush)();
	}

	get products() {
		return this.$$.ctx[2];
	}

	set products(products) {
		this.$$set({ products });
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.flush)();
	}
}

(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_custom_element)(Frequency, {"legendText":{},"frequency":{},"products":{}}, [], [], true);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Frequency);

/***/ }),

/***/ "./static/components/AppealFormDos/svelte/ToggleSwitch.svelte":
/*!********************************************************************!*\
  !*** ./static/components/AppealFormDos/svelte/ToggleSwitch.svelte ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/src/runtime/internal/index.js");
/* harmony import */ var svelte_internal_disclose_version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte/internal/disclose-version */ "./node_modules/svelte/src/runtime/internal/disclose-version/index.js");
/* static/components/AppealFormDos/svelte/ToggleSwitch.svelte generated by Svelte v4.2.1 */




function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-1azlwuf", ".cv-adb-8-0-toggle-wrap.svelte-1azlwuf.svelte-1azlwuf{display:flex;align-items:center;font-family:\"Source Sans Pro\";font-style:normal;font-weight:300;font-size:11px;line-height:34px;height:34px;color:#000000;margin-left:-127px}.cv-adb-8-0-switch.svelte-1azlwuf.svelte-1azlwuf{position:relative;display:inline-block;width:44px;height:22px;margin:0 10px}.cv-adb-8-0-switch.svelte-1azlwuf input.svelte-1azlwuf{opacity:0;width:0;height:0}.cv-adb-8-0-slider.cv-adb-8-0-round.svelte-1azlwuf.svelte-1azlwuf{border-radius:34px}.cv-adb-8-0-slider.svelte-1azlwuf.svelte-1azlwuf{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#2196f3;-webkit-transition:0.4s;transition:0.4s}.cv-adb-8-0-slider.cv-adb-8-0-round.svelte-1azlwuf.svelte-1azlwuf:before{border-radius:50%}.cv-adb-8-0-slider.svelte-1azlwuf.svelte-1azlwuf:before{position:absolute;content:\"\";width:18px;height:18px;left:2px;bottom:2px;background-color:white;-webkit-transition:0.4s;transition:0.4s}input.svelte-1azlwuf:checked+.cv-adb-8-0-slider.svelte-1azlwuf:before{-webkit-transform:translateX(22px);-ms-transform:translateX(22px);transform:translateX(22px)}");
}

function create_fragment(ctx) {
	let div2;
	let div0;
	let t1;
	let label;
	let input;
	let span;
	let t2;
	let div1;
	let mounted;
	let dispose;

	return {
		c() {
			div2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div0.textContent = "Monthly";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			label = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("label");
			input = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("input");
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			div1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			div1.textContent = "Yearly";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, "class", "cv-adb-8-0-toggle-main-txt");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "class", "cv-adb-8-0-toggle-input svelte-1azlwuf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, "type", "checkbox");
			input.value = "frequency";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(span, "class", "cv-adb-8-0-slider cv-adb-8-0-round svelte-1azlwuf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(label, "class", "cv-adb-8-0-switch svelte-1azlwuf");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, "class", "cv-adb-8-0-toggle-main-txt");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div2, "class", "cv-adb-8-0-toggle-wrap svelte-1azlwuf");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div2, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, div0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, label);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, input);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(label, span);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, t2);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, div1);

			if (!mounted) {
				dispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input, "click", /*click_handler*/ ctx[0]);
				mounted = true;
			}
		},
		p: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div2);
			}

			mounted = false;
			dispose();
		}
	};
}

function instance($$self) {
	function click_handler(event) {
		svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bubble.call(this, $$self, event);
	}

	return [click_handler];
}

class ToggleSwitch extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css);
	}
}

(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_custom_element)(ToggleSwitch, {}, [], [], true);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToggleSwitch);

/***/ }),

/***/ "./static/components/Counter/svelte-counter.svelte":
/*!*********************************************************!*\
  !*** ./static/components/Counter/svelte-counter.svelte ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ "./node_modules/svelte/src/runtime/internal/index.js");
/* harmony import */ var svelte_internal_disclose_version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte/internal/disclose-version */ "./node_modules/svelte/src/runtime/internal/disclose-version/index.js");
/* static/components/Counter/svelte-counter.svelte generated by Svelte v4.2.1 */




function add_css(target) {
	(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append_styles)(target, "svelte-uhsl44", "div.svelte-uhsl44 .svelte-uhsl44{font-size:200%}span.svelte-uhsl44.svelte-uhsl44{width:4rem;display:inline-block;text-align:center}button.svelte-uhsl44.svelte-uhsl44{width:4rem;height:4rem;border:none;border-radius:10px;background-color:seagreen;color:white}");
}

function create_fragment(ctx) {
	let div;
	let style;
	let t1;
	let button0;
	let t3;
	let span;
	let t4;
	let t5;
	let button1;
	let mounted;
	let dispose;

	return {
		c() {
			div = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("div");
			style = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("style");
			style.textContent = "{style}";
			t1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button0.textContent = "-";
			t3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			span = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("span");
			t4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*count*/ ctx[0]);
			t5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();
			button1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)("button");
			button1.textContent = "+";
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(style, "class", "svelte-uhsl44");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(button0, "class", "svelte-uhsl44");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(span, "class", "svelte-uhsl44");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(button1, "class", "svelte-uhsl44");
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, "class", "svelte-uhsl44");
		},
		m(target, anchor) {
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, style);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t1);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, button0);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t3);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, span);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(span, t4);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, t5);
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div, button1);

			if (!mounted) {
				dispose = [
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button0, "click", /*decrement*/ ctx[2]),
					(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button1, "click", /*increment*/ ctx[1])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*count*/ 1) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t4, /*count*/ ctx[0]);
		},
		i: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		o: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,
		d(detaching) {
			if (detaching) {
				(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);
			}

			mounted = false;
			(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let count = 0;

	const increment = () => {
		$$invalidate(0, count += 1);
	};

	const decrement = () => {
		$$invalidate(0, count -= 1);
	};

	return [count, increment, decrement];
}

class Svelte_counter extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {
	constructor(options) {
		super();
		(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {}, add_css);
	}
}

customElements.define("svelte-counter", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_custom_element)(Svelte_counter, {}, [], [], true));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Svelte_counter);

/***/ }),

/***/ "./node_modules/solid-js/dist/solid.cjs":
/*!**********************************************!*\
  !*** ./node_modules/solid-js/dist/solid.cjs ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {



let taskIdCounter = 1,
  isCallbackScheduled = false,
  isPerformingWork = false,
  taskQueue = [],
  currentTask = null,
  shouldYieldToHost = null,
  yieldInterval = 5,
  deadline = 0,
  maxYieldInterval = 300,
  scheduleCallback = null,
  scheduledCallback = null;
const maxSigned31BitInt = 1073741823;
function setupScheduler() {
  const channel = new MessageChannel(),
    port = channel.port2;
  scheduleCallback = () => port.postMessage(null);
  channel.port1.onmessage = () => {
    if (scheduledCallback !== null) {
      const currentTime = performance.now();
      deadline = currentTime + yieldInterval;
      const hasTimeRemaining = true;
      try {
        const hasMoreWork = scheduledCallback(hasTimeRemaining, currentTime);
        if (!hasMoreWork) {
          scheduledCallback = null;
        } else port.postMessage(null);
      } catch (error) {
        port.postMessage(null);
        throw error;
      }
    }
  };
  if (navigator && navigator.scheduling && navigator.scheduling.isInputPending) {
    const scheduling = navigator.scheduling;
    shouldYieldToHost = () => {
      const currentTime = performance.now();
      if (currentTime >= deadline) {
        if (scheduling.isInputPending()) {
          return true;
        }
        return currentTime >= maxYieldInterval;
      } else {
        return false;
      }
    };
  } else {
    shouldYieldToHost = () => performance.now() >= deadline;
  }
}
function enqueue(taskQueue, task) {
  function findIndex() {
    let m = 0;
    let n = taskQueue.length - 1;
    while (m <= n) {
      const k = n + m >> 1;
      const cmp = task.expirationTime - taskQueue[k].expirationTime;
      if (cmp > 0) m = k + 1;else if (cmp < 0) n = k - 1;else return k;
    }
    return m;
  }
  taskQueue.splice(findIndex(), 0, task);
}
function requestCallback(fn, options) {
  if (!scheduleCallback) setupScheduler();
  let startTime = performance.now(),
    timeout = maxSigned31BitInt;
  if (options && options.timeout) timeout = options.timeout;
  const newTask = {
    id: taskIdCounter++,
    fn,
    startTime,
    expirationTime: startTime + timeout
  };
  enqueue(taskQueue, newTask);
  if (!isCallbackScheduled && !isPerformingWork) {
    isCallbackScheduled = true;
    scheduledCallback = flushWork;
    scheduleCallback();
  }
  return newTask;
}
function cancelCallback(task) {
  task.fn = null;
}
function flushWork(hasTimeRemaining, initialTime) {
  isCallbackScheduled = false;
  isPerformingWork = true;
  try {
    return workLoop(hasTimeRemaining, initialTime);
  } finally {
    currentTask = null;
    isPerformingWork = false;
  }
}
function workLoop(hasTimeRemaining, initialTime) {
  let currentTime = initialTime;
  currentTask = taskQueue[0] || null;
  while (currentTask !== null) {
    if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
      break;
    }
    const callback = currentTask.fn;
    if (callback !== null) {
      currentTask.fn = null;
      const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
      callback(didUserCallbackTimeout);
      currentTime = performance.now();
      if (currentTask === taskQueue[0]) {
        taskQueue.shift();
      }
    } else taskQueue.shift();
    currentTask = taskQueue[0] || null;
  }
  return currentTask !== null;
}

const sharedConfig = {
  context: undefined,
  registry: undefined
};
function setHydrateContext(context) {
  sharedConfig.context = context;
}
function nextHydrateContext() {
  return {
    ...sharedConfig.context,
    id: `${sharedConfig.context.id}${sharedConfig.context.count++}-`,
    count: 0
  };
}

const equalFn = (a, b) => a === b;
const $PROXY = Symbol("solid-proxy");
const $TRACK = Symbol("solid-track");
const $DEVCOMP = Symbol("solid-dev-component");
const signalOptions = {
  equals: equalFn
};
let ERROR = null;
let runEffects = runQueue;
const STALE = 1;
const PENDING = 2;
const UNOWNED = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
const NO_INIT = {};
var Owner = null;
let Transition = null;
let Scheduler = null;
let ExternalSourceFactory = null;
let Listener = null;
let Updates = null;
let Effects = null;
let ExecCount = 0;
const [transPending, setTransPending] = /*@__PURE__*/createSignal(false);
function createRoot(fn, detachedOwner) {
  const listener = Listener,
    owner = Owner,
    unowned = fn.length === 0,
    current = detachedOwner === undefined ? owner : detachedOwner,
    root = unowned ? UNOWNED : {
      owned: null,
      cleanups: null,
      context: current ? current.context : null,
      owner: current
    },
    updateFn = unowned ? fn : () => fn(() => untrack(() => cleanNode(root)));
  Owner = root;
  Listener = null;
  try {
    return runUpdates(updateFn, true);
  } finally {
    Listener = listener;
    Owner = owner;
  }
}
function createSignal(value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const s = {
    value,
    observers: null,
    observerSlots: null,
    comparator: options.equals || undefined
  };
  const setter = value => {
    if (typeof value === "function") {
      if (Transition && Transition.running && Transition.sources.has(s)) value = value(s.tValue);else value = value(s.value);
    }
    return writeSignal(s, value);
  };
  return [readSignal.bind(s), setter];
}
function createComputed(fn, value, options) {
  const c = createComputation(fn, value, true, STALE);
  if (Scheduler && Transition && Transition.running) Updates.push(c);else updateComputation(c);
}
function createRenderEffect(fn, value, options) {
  const c = createComputation(fn, value, false, STALE);
  if (Scheduler && Transition && Transition.running) Updates.push(c);else updateComputation(c);
}
function createEffect(fn, value, options) {
  runEffects = runUserEffects;
  const c = createComputation(fn, value, false, STALE),
    s = SuspenseContext && useContext(SuspenseContext);
  if (s) c.suspense = s;
  if (!options || !options.render) c.user = true;
  Effects ? Effects.push(c) : updateComputation(c);
}
function createReaction(onInvalidate, options) {
  let fn;
  const c = createComputation(() => {
      fn ? fn() : untrack(onInvalidate);
      fn = undefined;
    }, undefined, false, 0),
    s = SuspenseContext && useContext(SuspenseContext);
  if (s) c.suspense = s;
  c.user = true;
  return tracking => {
    fn = tracking;
    updateComputation(c);
  };
}
function createMemo(fn, value, options) {
  options = options ? Object.assign({}, signalOptions, options) : signalOptions;
  const c = createComputation(fn, value, true, 0);
  c.observers = null;
  c.observerSlots = null;
  c.comparator = options.equals || undefined;
  if (Scheduler && Transition && Transition.running) {
    c.tState = STALE;
    Updates.push(c);
  } else updateComputation(c);
  return readSignal.bind(c);
}
function createResource(pSource, pFetcher, pOptions) {
  let source;
  let fetcher;
  let options;
  if (arguments.length === 2 && typeof pFetcher === "object" || arguments.length === 1) {
    source = true;
    fetcher = pSource;
    options = pFetcher || {};
  } else {
    source = pSource;
    fetcher = pFetcher;
    options = pOptions || {};
  }
  let pr = null,
    initP = NO_INIT,
    id = null,
    loadedUnderTransition = false,
    scheduled = false,
    resolved = ("initialValue" in options),
    dynamic = typeof source === "function" && createMemo(source);
  const contexts = new Set(),
    [value, setValue] = (options.storage || createSignal)(options.initialValue),
    [error, setError] = createSignal(undefined),
    [track, trigger] = createSignal(undefined, {
      equals: false
    }),
    [state, setState] = createSignal(resolved ? "ready" : "unresolved");
  if (sharedConfig.context) {
    id = `${sharedConfig.context.id}${sharedConfig.context.count++}`;
    let v;
    if (options.ssrLoadFrom === "initial") initP = options.initialValue;else if (sharedConfig.load && (v = sharedConfig.load(id))) initP = v[0];
  }
  function loadEnd(p, v, error, key) {
    if (pr === p) {
      pr = null;
      key !== undefined && (resolved = true);
      if ((p === initP || v === initP) && options.onHydrated) queueMicrotask(() => options.onHydrated(key, {
        value: v
      }));
      initP = NO_INIT;
      if (Transition && p && loadedUnderTransition) {
        Transition.promises.delete(p);
        loadedUnderTransition = false;
        runUpdates(() => {
          Transition.running = true;
          completeLoad(v, error);
        }, false);
      } else completeLoad(v, error);
    }
    return v;
  }
  function completeLoad(v, err) {
    runUpdates(() => {
      if (err === undefined) setValue(() => v);
      setState(err !== undefined ? "errored" : resolved ? "ready" : "unresolved");
      setError(err);
      for (const c of contexts.keys()) c.decrement();
      contexts.clear();
    }, false);
  }
  function read() {
    const c = SuspenseContext && useContext(SuspenseContext),
      v = value(),
      err = error();
    if (err !== undefined && !pr) throw err;
    if (Listener && !Listener.user && c) {
      createComputed(() => {
        track();
        if (pr) {
          if (c.resolved && Transition && loadedUnderTransition) Transition.promises.add(pr);else if (!contexts.has(c)) {
            c.increment();
            contexts.add(c);
          }
        }
      });
    }
    return v;
  }
  function load(refetching = true) {
    if (refetching !== false && scheduled) return;
    scheduled = false;
    const lookup = dynamic ? dynamic() : source;
    loadedUnderTransition = Transition && Transition.running;
    if (lookup == null || lookup === false) {
      loadEnd(pr, untrack(value));
      return;
    }
    if (Transition && pr) Transition.promises.delete(pr);
    const p = initP !== NO_INIT ? initP : untrack(() => fetcher(lookup, {
      value: value(),
      refetching
    }));
    if (typeof p !== "object" || !(p && "then" in p)) {
      loadEnd(pr, p, undefined, lookup);
      return p;
    }
    pr = p;
    scheduled = true;
    queueMicrotask(() => scheduled = false);
    runUpdates(() => {
      setState(resolved ? "refreshing" : "pending");
      trigger();
    }, false);
    return p.then(v => loadEnd(p, v, undefined, lookup), e => loadEnd(p, undefined, castError(e), lookup));
  }
  Object.defineProperties(read, {
    state: {
      get: () => state()
    },
    error: {
      get: () => error()
    },
    loading: {
      get() {
        const s = state();
        return s === "pending" || s === "refreshing";
      }
    },
    latest: {
      get() {
        if (!resolved) return read();
        const err = error();
        if (err && !pr) throw err;
        return value();
      }
    }
  });
  if (dynamic) createComputed(() => load(false));else load(false);
  return [read, {
    refetch: load,
    mutate: setValue
  }];
}
function createDeferred(source, options) {
  let t,
    timeout = options ? options.timeoutMs : undefined;
  const node = createComputation(() => {
    if (!t || !t.fn) t = requestCallback(() => setDeferred(() => node.value), timeout !== undefined ? {
      timeout
    } : undefined);
    return source();
  }, undefined, true);
  const [deferred, setDeferred] = createSignal(Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value, options);
  updateComputation(node);
  setDeferred(() => Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value);
  return deferred;
}
function createSelector(source, fn = equalFn, options) {
  const subs = new Map();
  const node = createComputation(p => {
    const v = source();
    for (const [key, val] of subs.entries()) if (fn(key, v) !== fn(key, p)) {
      for (const c of val.values()) {
        c.state = STALE;
        if (c.pure) Updates.push(c);else Effects.push(c);
      }
    }
    return v;
  }, undefined, true, STALE);
  updateComputation(node);
  return key => {
    const listener = Listener;
    if (listener) {
      let l;
      if (l = subs.get(key)) l.add(listener);else subs.set(key, l = new Set([listener]));
      onCleanup(() => {
        l.delete(listener);
        !l.size && subs.delete(key);
      });
    }
    return fn(key, Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value);
  };
}
function batch(fn) {
  return runUpdates(fn, false);
}
function untrack(fn) {
  if (Listener === null) return fn();
  const listener = Listener;
  Listener = null;
  try {
    return fn();
  } finally {
    Listener = listener;
  }
}
function on(deps, fn, options) {
  const isArray = Array.isArray(deps);
  let prevInput;
  let defer = options && options.defer;
  return prevValue => {
    let input;
    if (isArray) {
      input = Array(deps.length);
      for (let i = 0; i < deps.length; i++) input[i] = deps[i]();
    } else input = deps();
    if (defer) {
      defer = false;
      return undefined;
    }
    const result = untrack(() => fn(input, prevInput, prevValue));
    prevInput = input;
    return result;
  };
}
function onMount(fn) {
  createEffect(() => untrack(fn));
}
function onCleanup(fn) {
  if (Owner === null) ;else if (Owner.cleanups === null) Owner.cleanups = [fn];else Owner.cleanups.push(fn);
  return fn;
}
function catchError(fn, handler) {
  ERROR || (ERROR = Symbol("error"));
  Owner = createComputation(undefined, undefined, true);
  Owner.context = {
    ...Owner.context,
    [ERROR]: [handler]
  };
  if (Transition && Transition.running) Transition.sources.add(Owner);
  try {
    return fn();
  } catch (err) {
    handleError(err);
  } finally {
    Owner = Owner.owner;
  }
}
function getListener() {
  return Listener;
}
function getOwner() {
  return Owner;
}
function runWithOwner(o, fn) {
  const prev = Owner;
  const prevListener = Listener;
  Owner = o;
  Listener = null;
  try {
    return runUpdates(fn, true);
  } catch (err) {
    handleError(err);
  } finally {
    Owner = prev;
    Listener = prevListener;
  }
}
function enableScheduling(scheduler = requestCallback) {
  Scheduler = scheduler;
}
function startTransition(fn) {
  if (Transition && Transition.running) {
    fn();
    return Transition.done;
  }
  const l = Listener;
  const o = Owner;
  return Promise.resolve().then(() => {
    Listener = l;
    Owner = o;
    let t;
    if (Scheduler || SuspenseContext) {
      t = Transition || (Transition = {
        sources: new Set(),
        effects: [],
        promises: new Set(),
        disposed: new Set(),
        queue: new Set(),
        running: true
      });
      t.done || (t.done = new Promise(res => t.resolve = res));
      t.running = true;
    }
    runUpdates(fn, false);
    Listener = Owner = null;
    return t ? t.done : undefined;
  });
}
function useTransition() {
  return [transPending, startTransition];
}
function resumeEffects(e) {
  Effects.push.apply(Effects, e);
  e.length = 0;
}
function createContext(defaultValue, options) {
  const id = Symbol("context");
  return {
    id,
    Provider: createProvider(id),
    defaultValue
  };
}
function useContext(context) {
  return Owner && Owner.context && Owner.context[context.id] !== undefined ? Owner.context[context.id] : context.defaultValue;
}
function children(fn) {
  const children = createMemo(fn);
  const memo = createMemo(() => resolveChildren(children()));
  memo.toArray = () => {
    const c = memo();
    return Array.isArray(c) ? c : c != null ? [c] : [];
  };
  return memo;
}
let SuspenseContext;
function getSuspenseContext() {
  return SuspenseContext || (SuspenseContext = createContext());
}
function enableExternalSource(factory) {
  if (ExternalSourceFactory) {
    const oldFactory = ExternalSourceFactory;
    ExternalSourceFactory = (fn, trigger) => {
      const oldSource = oldFactory(fn, trigger);
      const source = factory(x => oldSource.track(x), trigger);
      return {
        track: x => source.track(x),
        dispose() {
          source.dispose();
          oldSource.dispose();
        }
      };
    };
  } else {
    ExternalSourceFactory = factory;
  }
}
function readSignal() {
  const runningTransition = Transition && Transition.running;
  if (this.sources && (runningTransition ? this.tState : this.state)) {
    if ((runningTransition ? this.tState : this.state) === STALE) updateComputation(this);else {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(this), false);
      Updates = updates;
    }
  }
  if (Listener) {
    const sSlot = this.observers ? this.observers.length : 0;
    if (!Listener.sources) {
      Listener.sources = [this];
      Listener.sourceSlots = [sSlot];
    } else {
      Listener.sources.push(this);
      Listener.sourceSlots.push(sSlot);
    }
    if (!this.observers) {
      this.observers = [Listener];
      this.observerSlots = [Listener.sources.length - 1];
    } else {
      this.observers.push(Listener);
      this.observerSlots.push(Listener.sources.length - 1);
    }
  }
  if (runningTransition && Transition.sources.has(this)) return this.tValue;
  return this.value;
}
function writeSignal(node, value, isComp) {
  let current = Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value;
  if (!node.comparator || !node.comparator(current, value)) {
    if (Transition) {
      const TransitionRunning = Transition.running;
      if (TransitionRunning || !isComp && Transition.sources.has(node)) {
        Transition.sources.add(node);
        node.tValue = value;
      }
      if (!TransitionRunning) node.value = value;
    } else node.value = value;
    if (node.observers && node.observers.length) {
      runUpdates(() => {
        for (let i = 0; i < node.observers.length; i += 1) {
          const o = node.observers[i];
          const TransitionRunning = Transition && Transition.running;
          if (TransitionRunning && Transition.disposed.has(o)) continue;
          if (TransitionRunning ? !o.tState : !o.state) {
            if (o.pure) Updates.push(o);else Effects.push(o);
            if (o.observers) markDownstream(o);
          }
          if (!TransitionRunning) o.state = STALE;else o.tState = STALE;
        }
        if (Updates.length > 10e5) {
          Updates = [];
          if (false) {}
          throw new Error();
        }
      }, false);
    }
  }
  return value;
}
function updateComputation(node) {
  if (!node.fn) return;
  cleanNode(node);
  const owner = Owner,
    listener = Listener,
    time = ExecCount;
  Listener = Owner = node;
  runComputation(node, Transition && Transition.running && Transition.sources.has(node) ? node.tValue : node.value, time);
  if (Transition && !Transition.running && Transition.sources.has(node)) {
    queueMicrotask(() => {
      runUpdates(() => {
        Transition && (Transition.running = true);
        Listener = Owner = node;
        runComputation(node, node.tValue, time);
        Listener = Owner = null;
      }, false);
    });
  }
  Listener = listener;
  Owner = owner;
}
function runComputation(node, value, time) {
  let nextValue;
  try {
    nextValue = node.fn(value);
  } catch (err) {
    if (node.pure) {
      if (Transition && Transition.running) {
        node.tState = STALE;
        node.tOwned && node.tOwned.forEach(cleanNode);
        node.tOwned = undefined;
      } else {
        node.state = STALE;
        node.owned && node.owned.forEach(cleanNode);
        node.owned = null;
      }
    }
    node.updatedAt = time + 1;
    return handleError(err);
  }
  if (!node.updatedAt || node.updatedAt <= time) {
    if (node.updatedAt != null && "observers" in node) {
      writeSignal(node, nextValue, true);
    } else if (Transition && Transition.running && node.pure) {
      Transition.sources.add(node);
      node.tValue = nextValue;
    } else node.value = nextValue;
    node.updatedAt = time;
  }
}
function createComputation(fn, init, pure, state = STALE, options) {
  const c = {
    fn,
    state: state,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: init,
    owner: Owner,
    context: Owner ? Owner.context : null,
    pure
  };
  if (Transition && Transition.running) {
    c.state = 0;
    c.tState = state;
  }
  if (Owner === null) ;else if (Owner !== UNOWNED) {
    if (Transition && Transition.running && Owner.pure) {
      if (!Owner.tOwned) Owner.tOwned = [c];else Owner.tOwned.push(c);
    } else {
      if (!Owner.owned) Owner.owned = [c];else Owner.owned.push(c);
    }
  }
  if (ExternalSourceFactory) {
    const [track, trigger] = createSignal(undefined, {
      equals: false
    });
    const ordinary = ExternalSourceFactory(c.fn, trigger);
    onCleanup(() => ordinary.dispose());
    const triggerInTransition = () => startTransition(trigger).then(() => inTransition.dispose());
    const inTransition = ExternalSourceFactory(c.fn, triggerInTransition);
    c.fn = x => {
      track();
      return Transition && Transition.running ? inTransition.track(x) : ordinary.track(x);
    };
  }
  return c;
}
function runTop(node) {
  const runningTransition = Transition && Transition.running;
  if ((runningTransition ? node.tState : node.state) === 0) return;
  if ((runningTransition ? node.tState : node.state) === PENDING) return lookUpstream(node);
  if (node.suspense && untrack(node.suspense.inFallback)) return node.suspense.effects.push(node);
  const ancestors = [node];
  while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
    if (runningTransition && Transition.disposed.has(node)) return;
    if (runningTransition ? node.tState : node.state) ancestors.push(node);
  }
  for (let i = ancestors.length - 1; i >= 0; i--) {
    node = ancestors[i];
    if (runningTransition) {
      let top = node,
        prev = ancestors[i + 1];
      while ((top = top.owner) && top !== prev) {
        if (Transition.disposed.has(top)) return;
      }
    }
    if ((runningTransition ? node.tState : node.state) === STALE) {
      updateComputation(node);
    } else if ((runningTransition ? node.tState : node.state) === PENDING) {
      const updates = Updates;
      Updates = null;
      runUpdates(() => lookUpstream(node, ancestors[0]), false);
      Updates = updates;
    }
  }
}
function runUpdates(fn, init) {
  if (Updates) return fn();
  let wait = false;
  if (!init) Updates = [];
  if (Effects) wait = true;else Effects = [];
  ExecCount++;
  try {
    const res = fn();
    completeUpdates(wait);
    return res;
  } catch (err) {
    if (!wait) Effects = null;
    Updates = null;
    handleError(err);
  }
}
function completeUpdates(wait) {
  if (Updates) {
    if (Scheduler && Transition && Transition.running) scheduleQueue(Updates);else runQueue(Updates);
    Updates = null;
  }
  if (wait) return;
  let res;
  if (Transition) {
    if (!Transition.promises.size && !Transition.queue.size) {
      const sources = Transition.sources;
      const disposed = Transition.disposed;
      Effects.push.apply(Effects, Transition.effects);
      res = Transition.resolve;
      for (const e of Effects) {
        "tState" in e && (e.state = e.tState);
        delete e.tState;
      }
      Transition = null;
      runUpdates(() => {
        for (const d of disposed) cleanNode(d);
        for (const v of sources) {
          v.value = v.tValue;
          if (v.owned) {
            for (let i = 0, len = v.owned.length; i < len; i++) cleanNode(v.owned[i]);
          }
          if (v.tOwned) v.owned = v.tOwned;
          delete v.tValue;
          delete v.tOwned;
          v.tState = 0;
        }
        setTransPending(false);
      }, false);
    } else if (Transition.running) {
      Transition.running = false;
      Transition.effects.push.apply(Transition.effects, Effects);
      Effects = null;
      setTransPending(true);
      return;
    }
  }
  const e = Effects;
  Effects = null;
  if (e.length) runUpdates(() => runEffects(e), false);
  if (res) res();
}
function runQueue(queue) {
  for (let i = 0; i < queue.length; i++) runTop(queue[i]);
}
function scheduleQueue(queue) {
  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    const tasks = Transition.queue;
    if (!tasks.has(item)) {
      tasks.add(item);
      Scheduler(() => {
        tasks.delete(item);
        runUpdates(() => {
          Transition.running = true;
          runTop(item);
        }, false);
        Transition && (Transition.running = false);
      });
    }
  }
}
function runUserEffects(queue) {
  let i,
    userLength = 0;
  for (i = 0; i < queue.length; i++) {
    const e = queue[i];
    if (!e.user) runTop(e);else queue[userLength++] = e;
  }
  if (sharedConfig.context) {
    if (sharedConfig.count) {
      sharedConfig.effects || (sharedConfig.effects = []);
      sharedConfig.effects.push(...queue.slice(0, userLength));
      return;
    } else if (sharedConfig.effects) {
      queue = [...sharedConfig.effects, ...queue];
      userLength += sharedConfig.effects.length;
      delete sharedConfig.effects;
    }
    setHydrateContext();
  }
  for (i = 0; i < userLength; i++) runTop(queue[i]);
}
function lookUpstream(node, ignore) {
  const runningTransition = Transition && Transition.running;
  if (runningTransition) node.tState = 0;else node.state = 0;
  for (let i = 0; i < node.sources.length; i += 1) {
    const source = node.sources[i];
    if (source.sources) {
      const state = runningTransition ? source.tState : source.state;
      if (state === STALE) {
        if (source !== ignore && (!source.updatedAt || source.updatedAt < ExecCount)) runTop(source);
      } else if (state === PENDING) lookUpstream(source, ignore);
    }
  }
}
function markDownstream(node) {
  const runningTransition = Transition && Transition.running;
  for (let i = 0; i < node.observers.length; i += 1) {
    const o = node.observers[i];
    if (runningTransition ? !o.tState : !o.state) {
      if (runningTransition) o.tState = PENDING;else o.state = PENDING;
      if (o.pure) Updates.push(o);else Effects.push(o);
      o.observers && markDownstream(o);
    }
  }
}
function cleanNode(node) {
  let i;
  if (node.sources) {
    while (node.sources.length) {
      const source = node.sources.pop(),
        index = node.sourceSlots.pop(),
        obs = source.observers;
      if (obs && obs.length) {
        const n = obs.pop(),
          s = source.observerSlots.pop();
        if (index < obs.length) {
          n.sourceSlots[s] = index;
          obs[index] = n;
          source.observerSlots[index] = s;
        }
      }
    }
  }
  if (Transition && Transition.running && node.pure) {
    if (node.tOwned) {
      for (i = node.tOwned.length - 1; i >= 0; i--) cleanNode(node.tOwned[i]);
      delete node.tOwned;
    }
    reset(node, true);
  } else if (node.owned) {
    for (i = node.owned.length - 1; i >= 0; i--) cleanNode(node.owned[i]);
    node.owned = null;
  }
  if (node.cleanups) {
    for (i = node.cleanups.length - 1; i >= 0; i--) node.cleanups[i]();
    node.cleanups = null;
  }
  if (Transition && Transition.running) node.tState = 0;else node.state = 0;
}
function reset(node, top) {
  if (!top) {
    node.tState = 0;
    Transition.disposed.add(node);
  }
  if (node.owned) {
    for (let i = 0; i < node.owned.length; i++) reset(node.owned[i]);
  }
}
function castError(err) {
  if (err instanceof Error) return err;
  return new Error(typeof err === "string" ? err : "Unknown error", {
    cause: err
  });
}
function runErrors(err, fns, owner) {
  try {
    for (const f of fns) f(err);
  } catch (e) {
    handleError(e, owner && owner.owner || null);
  }
}
function handleError(err, owner = Owner) {
  const fns = ERROR && owner && owner.context && owner.context[ERROR];
  const error = castError(err);
  if (!fns) throw error;
  if (Effects) Effects.push({
    fn() {
      runErrors(error, fns, owner);
    },
    state: STALE
  });else runErrors(error, fns, owner);
}
function resolveChildren(children) {
  if (typeof children === "function" && !children.length) return resolveChildren(children());
  if (Array.isArray(children)) {
    const results = [];
    for (let i = 0; i < children.length; i++) {
      const result = resolveChildren(children[i]);
      Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results;
  }
  return children;
}
function createProvider(id, options) {
  return function provider(props) {
    let res;
    createRenderEffect(() => res = untrack(() => {
      Owner.context = {
        ...Owner.context,
        [id]: props.value
      };
      return children(() => props.children);
    }), undefined);
    return res;
  };
}
function onError(fn) {
  ERROR || (ERROR = Symbol("error"));
  if (Owner === null) ;else if (Owner.context === null || !Owner.context[ERROR]) {
    Owner.context = {
      ...Owner.context,
      [ERROR]: [fn]
    };
    mutateContext(Owner, ERROR, [fn]);
  } else Owner.context[ERROR].push(fn);
}
function mutateContext(o, key, value) {
  if (o.owned) {
    for (let i = 0; i < o.owned.length; i++) {
      if (o.owned[i].context === o.context) mutateContext(o.owned[i], key, value);
      if (!o.owned[i].context) {
        o.owned[i].context = o.context;
        mutateContext(o.owned[i], key, value);
      } else if (!o.owned[i].context[key]) {
        o.owned[i].context[key] = value;
        mutateContext(o.owned[i], key, value);
      }
    }
  }
}

function observable(input) {
  return {
    subscribe(observer) {
      if (!(observer instanceof Object) || observer == null) {
        throw new TypeError("Expected the observer to be an object.");
      }
      const handler = typeof observer === "function" ? observer : observer.next && observer.next.bind(observer);
      if (!handler) {
        return {
          unsubscribe() {}
        };
      }
      const dispose = createRoot(disposer => {
        createEffect(() => {
          const v = input();
          untrack(() => handler(v));
        });
        return disposer;
      });
      if (getOwner()) onCleanup(dispose);
      return {
        unsubscribe() {
          dispose();
        }
      };
    },
    [Symbol.observable || "@@observable"]() {
      return this;
    }
  };
}
function from(producer) {
  const [s, set] = createSignal(undefined, {
    equals: false
  });
  if ("subscribe" in producer) {
    const unsub = producer.subscribe(v => set(() => v));
    onCleanup(() => "unsubscribe" in unsub ? unsub.unsubscribe() : unsub());
  } else {
    const clean = producer(set);
    onCleanup(clean);
  }
  return s;
}

const FALLBACK = Symbol("fallback");
function dispose(d) {
  for (let i = 0; i < d.length; i++) d[i]();
}
function mapArray(list, mapFn, options = {}) {
  let items = [],
    mapped = [],
    disposers = [],
    len = 0,
    indexes = mapFn.length > 1 ? [] : null;
  onCleanup(() => dispose(disposers));
  return () => {
    let newItems = list() || [],
      i,
      j;
    newItems[$TRACK];
    return untrack(() => {
      let newLen = newItems.length,
        newIndices,
        newIndicesNext,
        temp,
        tempdisposers,
        tempIndexes,
        start,
        end,
        newEnd,
        item;
      if (newLen === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          indexes && (indexes = []);
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot(disposer => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
      }
      else if (len === 0) {
        mapped = new Array(newLen);
        for (j = 0; j < newLen; j++) {
          items[j] = newItems[j];
          mapped[j] = createRoot(mapper);
        }
        len = newLen;
      } else {
        temp = new Array(newLen);
        tempdisposers = new Array(newLen);
        indexes && (tempIndexes = new Array(newLen));
        for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++);
        for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
          temp[newEnd] = mapped[end];
          tempdisposers[newEnd] = disposers[end];
          indexes && (tempIndexes[newEnd] = indexes[end]);
        }
        newIndices = new Map();
        newIndicesNext = new Array(newEnd + 1);
        for (j = newEnd; j >= start; j--) {
          item = newItems[j];
          i = newIndices.get(item);
          newIndicesNext[j] = i === undefined ? -1 : i;
          newIndices.set(item, j);
        }
        for (i = start; i <= end; i++) {
          item = items[i];
          j = newIndices.get(item);
          if (j !== undefined && j !== -1) {
            temp[j] = mapped[i];
            tempdisposers[j] = disposers[i];
            indexes && (tempIndexes[j] = indexes[i]);
            j = newIndicesNext[j];
            newIndices.set(item, j);
          } else disposers[i]();
        }
        for (j = start; j < newLen; j++) {
          if (j in temp) {
            mapped[j] = temp[j];
            disposers[j] = tempdisposers[j];
            if (indexes) {
              indexes[j] = tempIndexes[j];
              indexes[j](j);
            }
          } else mapped[j] = createRoot(mapper);
        }
        mapped = mapped.slice(0, len = newLen);
        items = newItems.slice(0);
      }
      return mapped;
    });
    function mapper(disposer) {
      disposers[j] = disposer;
      if (indexes) {
        const [s, set] = createSignal(j);
        indexes[j] = set;
        return mapFn(newItems[j], s);
      }
      return mapFn(newItems[j]);
    }
  };
}
function indexArray(list, mapFn, options = {}) {
  let items = [],
    mapped = [],
    disposers = [],
    signals = [],
    len = 0,
    i;
  onCleanup(() => dispose(disposers));
  return () => {
    const newItems = list() || [];
    newItems[$TRACK];
    return untrack(() => {
      if (newItems.length === 0) {
        if (len !== 0) {
          dispose(disposers);
          disposers = [];
          items = [];
          mapped = [];
          len = 0;
          signals = [];
        }
        if (options.fallback) {
          items = [FALLBACK];
          mapped[0] = createRoot(disposer => {
            disposers[0] = disposer;
            return options.fallback();
          });
          len = 1;
        }
        return mapped;
      }
      if (items[0] === FALLBACK) {
        disposers[0]();
        disposers = [];
        items = [];
        mapped = [];
        len = 0;
      }
      for (i = 0; i < newItems.length; i++) {
        if (i < items.length && items[i] !== newItems[i]) {
          signals[i](() => newItems[i]);
        } else if (i >= items.length) {
          mapped[i] = createRoot(mapper);
        }
      }
      for (; i < items.length; i++) {
        disposers[i]();
      }
      len = signals.length = disposers.length = newItems.length;
      items = newItems.slice(0);
      return mapped = mapped.slice(0, len);
    });
    function mapper(disposer) {
      disposers[i] = disposer;
      const [s, set] = createSignal(newItems[i]);
      signals[i] = set;
      return mapFn(s, i);
    }
  };
}

let hydrationEnabled = false;
function enableHydration() {
  hydrationEnabled = true;
}
function createComponent(Comp, props) {
  if (hydrationEnabled) {
    if (sharedConfig.context) {
      const c = sharedConfig.context;
      setHydrateContext(nextHydrateContext());
      const r = untrack(() => Comp(props || {}));
      setHydrateContext(c);
      return r;
    }
  }
  return untrack(() => Comp(props || {}));
}
function trueFn() {
  return true;
}
const propTraps = {
  get(_, property, receiver) {
    if (property === $PROXY) return receiver;
    return _.get(property);
  },
  has(_, property) {
    if (property === $PROXY) return true;
    return _.has(property);
  },
  set: trueFn,
  deleteProperty: trueFn,
  getOwnPropertyDescriptor(_, property) {
    return {
      configurable: true,
      enumerable: true,
      get() {
        return _.get(property);
      },
      set: trueFn,
      deleteProperty: trueFn
    };
  },
  ownKeys(_) {
    return _.keys();
  }
};
function resolveSource(s) {
  return !(s = typeof s === "function" ? s() : s) ? {} : s;
}
function resolveSources() {
  for (let i = 0, length = this.length; i < length; ++i) {
    const v = this[i]();
    if (v !== undefined) return v;
  }
}
function mergeProps(...sources) {
  let proxy = false;
  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    proxy = proxy || !!s && $PROXY in s;
    sources[i] = typeof s === "function" ? (proxy = true, createMemo(s)) : s;
  }
  if (proxy) {
    return new Proxy({
      get(property) {
        for (let i = sources.length - 1; i >= 0; i--) {
          const v = resolveSource(sources[i])[property];
          if (v !== undefined) return v;
        }
      },
      has(property) {
        for (let i = sources.length - 1; i >= 0; i--) {
          if (property in resolveSource(sources[i])) return true;
        }
        return false;
      },
      keys() {
        const keys = [];
        for (let i = 0; i < sources.length; i++) keys.push(...Object.keys(resolveSource(sources[i])));
        return [...new Set(keys)];
      }
    }, propTraps);
  }
  const target = {};
  const sourcesMap = {};
  const defined = new Set();
  for (let i = sources.length - 1; i >= 0; i--) {
    const source = sources[i];
    if (!source) continue;
    const sourceKeys = Object.getOwnPropertyNames(source);
    for (let i = 0, length = sourceKeys.length; i < length; i++) {
      const key = sourceKeys[i];
      if (key === "__proto__" || key === "constructor") continue;
      const desc = Object.getOwnPropertyDescriptor(source, key);
      if (!defined.has(key)) {
        if (desc.get) {
          defined.add(key);
          Object.defineProperty(target, key, {
            enumerable: true,
            configurable: true,
            get: resolveSources.bind(sourcesMap[key] = [desc.get.bind(source)])
          });
        } else {
          if (desc.value !== undefined) defined.add(key);
          target[key] = desc.value;
        }
      } else {
        const sources = sourcesMap[key];
        if (sources) {
          if (desc.get) {
            sources.push(desc.get.bind(source));
          } else if (desc.value !== undefined) {
            sources.push(() => desc.value);
          }
        } else if (target[key] === undefined) target[key] = desc.value;
      }
    }
  }
  return target;
}
function splitProps(props, ...keys) {
  if ($PROXY in props) {
    const blocked = new Set(keys.length > 1 ? keys.flat() : keys[0]);
    const res = keys.map(k => {
      return new Proxy({
        get(property) {
          return k.includes(property) ? props[property] : undefined;
        },
        has(property) {
          return k.includes(property) && property in props;
        },
        keys() {
          return k.filter(property => property in props);
        }
      }, propTraps);
    });
    res.push(new Proxy({
      get(property) {
        return blocked.has(property) ? undefined : props[property];
      },
      has(property) {
        return blocked.has(property) ? false : property in props;
      },
      keys() {
        return Object.keys(props).filter(k => !blocked.has(k));
      }
    }, propTraps));
    return res;
  }
  const otherObject = {};
  const objects = keys.map(() => ({}));
  for (const propName of Object.getOwnPropertyNames(props)) {
    const desc = Object.getOwnPropertyDescriptor(props, propName);
    const isDefaultDesc = !desc.get && !desc.set && desc.enumerable && desc.writable && desc.configurable;
    let blocked = false;
    let objectIndex = 0;
    for (const k of keys) {
      if (k.includes(propName)) {
        blocked = true;
        isDefaultDesc ? objects[objectIndex][propName] = desc.value : Object.defineProperty(objects[objectIndex], propName, desc);
      }
      ++objectIndex;
    }
    if (!blocked) {
      isDefaultDesc ? otherObject[propName] = desc.value : Object.defineProperty(otherObject, propName, desc);
    }
  }
  return [...objects, otherObject];
}
function lazy(fn) {
  let comp;
  let p;
  const wrap = props => {
    const ctx = sharedConfig.context;
    if (ctx) {
      const [s, set] = createSignal();
      sharedConfig.count || (sharedConfig.count = 0);
      sharedConfig.count++;
      (p || (p = fn())).then(mod => {
        setHydrateContext(ctx);
        sharedConfig.count--;
        set(() => mod.default);
        setHydrateContext();
      });
      comp = s;
    } else if (!comp) {
      const [s] = createResource(() => (p || (p = fn())).then(mod => mod.default));
      comp = s;
    }
    let Comp;
    return createMemo(() => (Comp = comp()) && untrack(() => {
      if (false) {}
      if (!ctx) return Comp(props);
      const c = sharedConfig.context;
      setHydrateContext(ctx);
      const r = Comp(props);
      setHydrateContext(c);
      return r;
    }));
  };
  wrap.preload = () => p || ((p = fn()).then(mod => comp = () => mod.default), p);
  return wrap;
}
let counter = 0;
function createUniqueId() {
  const ctx = sharedConfig.context;
  return ctx ? `${ctx.id}${ctx.count++}` : `cl-${counter++}`;
}

const narrowedError = name => `Stale read from <${name}>.`;
function For(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(mapArray(() => props.each, props.children, fallback || undefined));
}
function Index(props) {
  const fallback = "fallback" in props && {
    fallback: () => props.fallback
  };
  return createMemo(indexArray(() => props.each, props.children, fallback || undefined));
}
function Show(props) {
  const keyed = props.keyed;
  const condition = createMemo(() => props.when, undefined, {
    equals: (a, b) => keyed ? a === b : !a === !b
  });
  return createMemo(() => {
    const c = condition();
    if (c) {
      const child = props.children;
      const fn = typeof child === "function" && child.length > 0;
      return fn ? untrack(() => child(keyed ? c : () => {
        if (!untrack(condition)) throw narrowedError("Show");
        return props.when;
      })) : child;
    }
    return props.fallback;
  }, undefined, undefined);
}
function Switch(props) {
  let keyed = false;
  const equals = (a, b) => a[0] === b[0] && (keyed ? a[1] === b[1] : !a[1] === !b[1]) && a[2] === b[2];
  const conditions = children(() => props.children),
    evalConditions = createMemo(() => {
      let conds = conditions();
      if (!Array.isArray(conds)) conds = [conds];
      for (let i = 0; i < conds.length; i++) {
        const c = conds[i].when;
        if (c) {
          keyed = !!conds[i].keyed;
          return [i, c, conds[i]];
        }
      }
      return [-1];
    }, undefined, {
      equals
    });
  return createMemo(() => {
    const [index, when, cond] = evalConditions();
    if (index < 0) return props.fallback;
    const c = cond.children;
    const fn = typeof c === "function" && c.length > 0;
    return fn ? untrack(() => c(keyed ? when : () => {
      if (untrack(evalConditions)[0] !== index) throw narrowedError("Match");
      return cond.when;
    })) : c;
  }, undefined, undefined);
}
function Match(props) {
  return props;
}
let Errors;
function resetErrorBoundaries() {
  Errors && [...Errors].forEach(fn => fn());
}
function ErrorBoundary(props) {
  let err;
  let v;
  if (sharedConfig.context && sharedConfig.load && (v = sharedConfig.load(sharedConfig.context.id + sharedConfig.context.count))) err = v[0];
  const [errored, setErrored] = createSignal(err, undefined);
  Errors || (Errors = new Set());
  Errors.add(setErrored);
  onCleanup(() => Errors.delete(setErrored));
  return createMemo(() => {
    let e;
    if (e = errored()) {
      const f = props.fallback;
      return typeof f === "function" && f.length ? untrack(() => f(e, () => setErrored())) : f;
    }
    return catchError(() => props.children, setErrored);
  }, undefined, undefined);
}

const suspenseListEquals = (a, b) => a.showContent === b.showContent && a.showFallback === b.showFallback;
const SuspenseListContext = createContext();
function SuspenseList(props) {
  let [wrapper, setWrapper] = createSignal(() => ({
      inFallback: false
    })),
    show;
  const listContext = useContext(SuspenseListContext);
  const [registry, setRegistry] = createSignal([]);
  if (listContext) {
    show = listContext.register(createMemo(() => wrapper()().inFallback));
  }
  const resolved = createMemo(prev => {
    const reveal = props.revealOrder,
      tail = props.tail,
      {
        showContent = true,
        showFallback = true
      } = show ? show() : {},
      reg = registry(),
      reverse = reveal === "backwards";
    if (reveal === "together") {
      const all = reg.every(inFallback => !inFallback());
      const res = reg.map(() => ({
        showContent: all && showContent,
        showFallback
      }));
      res.inFallback = !all;
      return res;
    }
    let stop = false;
    let inFallback = prev.inFallback;
    const res = [];
    for (let i = 0, len = reg.length; i < len; i++) {
      const n = reverse ? len - i - 1 : i,
        s = reg[n]();
      if (!stop && !s) {
        res[n] = {
          showContent,
          showFallback
        };
      } else {
        const next = !stop;
        if (next) inFallback = true;
        res[n] = {
          showContent: next,
          showFallback: !tail || next && tail === "collapsed" ? showFallback : false
        };
        stop = true;
      }
    }
    if (!stop) inFallback = false;
    res.inFallback = inFallback;
    return res;
  }, {
    inFallback: false
  });
  setWrapper(() => resolved);
  return createComponent(SuspenseListContext.Provider, {
    value: {
      register: inFallback => {
        let index;
        setRegistry(registry => {
          index = registry.length;
          return [...registry, inFallback];
        });
        return createMemo(() => resolved()[index], undefined, {
          equals: suspenseListEquals
        });
      }
    },
    get children() {
      return props.children;
    }
  });
}
function Suspense(props) {
  let counter = 0,
    show,
    ctx,
    p,
    flicker,
    error;
  const [inFallback, setFallback] = createSignal(false),
    SuspenseContext = getSuspenseContext(),
    store = {
      increment: () => {
        if (++counter === 1) setFallback(true);
      },
      decrement: () => {
        if (--counter === 0) setFallback(false);
      },
      inFallback,
      effects: [],
      resolved: false
    },
    owner = getOwner();
  if (sharedConfig.context && sharedConfig.load) {
    const key = sharedConfig.context.id + sharedConfig.context.count;
    let ref = sharedConfig.load(key);
    if (ref && (p = ref[0]) && p !== "$$f") {
      if (typeof p !== "object" || !("then" in p)) p = Promise.resolve(p);
      const [s, set] = createSignal(undefined, {
        equals: false
      });
      flicker = s;
      p.then(err => {
        if (err || sharedConfig.done) {
          err && (error = err);
          return set();
        }
        sharedConfig.gather(key);
        setHydrateContext(ctx);
        set();
        setHydrateContext();
      });
    }
  }
  const listContext = useContext(SuspenseListContext);
  if (listContext) show = listContext.register(store.inFallback);
  let dispose;
  onCleanup(() => dispose && dispose());
  return createComponent(SuspenseContext.Provider, {
    value: store,
    get children() {
      return createMemo(() => {
        if (error) throw error;
        ctx = sharedConfig.context;
        if (flicker) {
          flicker();
          return flicker = undefined;
        }
        if (ctx && p === "$$f") setHydrateContext();
        const rendered = createMemo(() => props.children);
        return createMemo(prev => {
          const inFallback = store.inFallback(),
            {
              showContent = true,
              showFallback = true
            } = show ? show() : {};
          if ((!inFallback || p && p !== "$$f") && showContent) {
            store.resolved = true;
            dispose && dispose();
            dispose = ctx = p = undefined;
            resumeEffects(store.effects);
            return rendered();
          }
          if (!showFallback) return;
          if (dispose) return prev;
          return createRoot(disposer => {
            dispose = disposer;
            if (ctx) {
              setHydrateContext({
                id: ctx.id + "f",
                count: 0
              });
              ctx = undefined;
            }
            return props.fallback;
          }, owner);
        });
      });
    }
  });
}

const DEV = undefined;

exports.$DEVCOMP = $DEVCOMP;
exports.$PROXY = $PROXY;
exports.$TRACK = $TRACK;
exports.DEV = DEV;
exports.ErrorBoundary = ErrorBoundary;
exports.For = For;
exports.Index = Index;
exports.Match = Match;
exports.Show = Show;
exports.Suspense = Suspense;
exports.SuspenseList = SuspenseList;
exports.Switch = Switch;
exports.batch = batch;
exports.cancelCallback = cancelCallback;
exports.catchError = catchError;
exports.children = children;
exports.createComponent = createComponent;
exports.createComputed = createComputed;
exports.createContext = createContext;
exports.createDeferred = createDeferred;
exports.createEffect = createEffect;
exports.createMemo = createMemo;
exports.createReaction = createReaction;
exports.createRenderEffect = createRenderEffect;
exports.createResource = createResource;
exports.createRoot = createRoot;
exports.createSelector = createSelector;
exports.createSignal = createSignal;
exports.createUniqueId = createUniqueId;
exports.enableExternalSource = enableExternalSource;
exports.enableHydration = enableHydration;
exports.enableScheduling = enableScheduling;
exports.equalFn = equalFn;
exports.from = from;
exports.getListener = getListener;
exports.getOwner = getOwner;
exports.indexArray = indexArray;
exports.lazy = lazy;
exports.mapArray = mapArray;
exports.mergeProps = mergeProps;
exports.observable = observable;
exports.on = on;
exports.onCleanup = onCleanup;
exports.onError = onError;
exports.onMount = onMount;
exports.requestCallback = requestCallback;
exports.resetErrorBoundaries = resetErrorBoundaries;
exports.runWithOwner = runWithOwner;
exports.sharedConfig = sharedConfig;
exports.splitProps = splitProps;
exports.startTransition = startTransition;
exports.untrack = untrack;
exports.useContext = useContext;
exports.useTransition = useTransition;


/***/ }),

/***/ "./node_modules/solid-js/web/dist/web.cjs":
/*!************************************************!*\
  !*** ./node_modules/solid-js/web/dist/web.cjs ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var solidJs = __webpack_require__(/*! solid-js */ "./node_modules/solid-js/dist/solid.cjs");

const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
const Properties = /*#__PURE__*/new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);
const ChildProperties = /*#__PURE__*/new Set(["innerHTML", "textContent", "innerText", "children"]);
const Aliases = /*#__PURE__*/Object.assign(Object.create(null), {
  className: "class",
  htmlFor: "for"
});
const PropAliases = /*#__PURE__*/Object.assign(Object.create(null), {
  class: "className",
  formnovalidate: {
    $: "formNoValidate",
    BUTTON: 1,
    INPUT: 1
  },
  ismap: {
    $: "isMap",
    IMG: 1
  },
  nomodule: {
    $: "noModule",
    SCRIPT: 1
  },
  playsinline: {
    $: "playsInline",
    VIDEO: 1
  },
  readonly: {
    $: "readOnly",
    INPUT: 1,
    TEXTAREA: 1
  }
});
function getPropAlias(prop, tagName) {
  const a = PropAliases[prop];
  return typeof a === "object" ? a[tagName] ? a["$"] : undefined : a;
}
const DelegatedEvents = /*#__PURE__*/new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]);
const SVGElements = /*#__PURE__*/new Set([
"altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect",
"set", "stop",
"svg", "switch", "symbol", "text", "textPath",
"tref", "tspan", "use", "view", "vkern"]);
const SVGNamespace = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
const DOMElements = /*#__PURE__*/new Set(["html", "base", "head", "link", "meta", "style", "title", "body", "address", "article", "aside", "footer", "header", "main", "nav", "section", "body", "blockquote", "dd", "div", "dl", "dt", "figcaption", "figure", "hr", "li", "ol", "p", "pre", "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn", "em", "i", "kbd", "mark", "q", "rp", "rt", "ruby", "s", "samp", "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "area", "audio", "img", "map", "track", "video", "embed", "iframe", "object", "param", "picture", "portal", "source", "svg", "math", "canvas", "noscript", "script", "del", "ins", "caption", "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "button", "datalist", "fieldset", "form", "input", "label", "legend", "meter", "optgroup", "option", "output", "progress", "select", "textarea", "details", "dialog", "menu", "summary", "details", "slot", "template", "acronym", "applet", "basefont", "bgsound", "big", "blink", "center", "content", "dir", "font", "frame", "frameset", "hgroup", "image", "keygen", "marquee", "menuitem", "nobr", "noembed", "noframes", "plaintext", "rb", "rtc", "shadow", "spacer", "strike", "tt", "xmp", "a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "head", "header", "hgroup", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "plaintext", "portal", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp", "input", "h1", "h2", "h3", "h4", "h5", "h6"]);

function reconcileArrays(parentNode, a, b) {
  let bLength = b.length,
    aEnd = a.length,
    bEnd = bLength,
    aStart = 0,
    bStart = 0,
    after = a[aEnd - 1].nextSibling,
    map = null;
  while (aStart < aEnd || bStart < bEnd) {
    if (a[aStart] === b[bStart]) {
      aStart++;
      bStart++;
      continue;
    }
    while (a[aEnd - 1] === b[bEnd - 1]) {
      aEnd--;
      bEnd--;
    }
    if (aEnd === aStart) {
      const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
      while (bStart < bEnd) parentNode.insertBefore(b[bStart++], node);
    } else if (bEnd === bStart) {
      while (aStart < aEnd) {
        if (!map || !map.has(a[aStart])) a[aStart].remove();
        aStart++;
      }
    } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
      const node = a[--aEnd].nextSibling;
      parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
      parentNode.insertBefore(b[--bEnd], node);
      a[aEnd] = b[bEnd];
    } else {
      if (!map) {
        map = new Map();
        let i = bStart;
        while (i < bEnd) map.set(b[i], i++);
      }
      const index = map.get(a[aStart]);
      if (index != null) {
        if (bStart < index && index < bEnd) {
          let i = aStart,
            sequence = 1,
            t;
          while (++i < aEnd && i < bEnd) {
            if ((t = map.get(a[i])) == null || t !== index + sequence) break;
            sequence++;
          }
          if (sequence > index - bStart) {
            const node = a[aStart];
            while (bStart < index) parentNode.insertBefore(b[bStart++], node);
          } else parentNode.replaceChild(b[bStart++], a[aStart++]);
        } else aStart++;
      } else a[aStart++].remove();
    }
  }
}

const $$EVENTS = "_$DX_DELEGATE";
function render(code, element, init, options = {}) {
  let disposer;
  solidJs.createRoot(dispose => {
    disposer = dispose;
    element === document ? code() : insert(element, code(), element.firstChild ? null : undefined, init);
  }, options.owner);
  return () => {
    disposer();
    element.textContent = "";
  };
}
function template(html, isCE, isSVG) {
  let node;
  const create = () => {
    const t = document.createElement("template");
    t.innerHTML = html;
    return isSVG ? t.content.firstChild.firstChild : t.content.firstChild;
  };
  const fn = isCE ? () => solidJs.untrack(() => document.importNode(node || (node = create()), true)) : () => (node || (node = create())).cloneNode(true);
  fn.cloneNode = fn;
  return fn;
}
function delegateEvents(eventNames, document = window.document) {
  const e = document[$$EVENTS] || (document[$$EVENTS] = new Set());
  for (let i = 0, l = eventNames.length; i < l; i++) {
    const name = eventNames[i];
    if (!e.has(name)) {
      e.add(name);
      document.addEventListener(name, eventHandler);
    }
  }
}
function clearDelegatedEvents(document = window.document) {
  if (document[$$EVENTS]) {
    for (let name of document[$$EVENTS].keys()) document.removeEventListener(name, eventHandler);
    delete document[$$EVENTS];
  }
}
function setAttribute(node, name, value) {
  if (value == null) node.removeAttribute(name);else node.setAttribute(name, value);
}
function setAttributeNS(node, namespace, name, value) {
  if (value == null) node.removeAttributeNS(namespace, name);else node.setAttributeNS(namespace, name, value);
}
function className(node, value) {
  if (value == null) node.removeAttribute("class");else node.className = value;
}
function addEventListener(node, name, handler, delegate) {
  if (delegate) {
    if (Array.isArray(handler)) {
      node[`$$${name}`] = handler[0];
      node[`$$${name}Data`] = handler[1];
    } else node[`$$${name}`] = handler;
  } else if (Array.isArray(handler)) {
    const handlerFn = handler[0];
    node.addEventListener(name, handler[0] = e => handlerFn.call(node, handler[1], e));
  } else node.addEventListener(name, handler);
}
function classList(node, value, prev = {}) {
  const classKeys = Object.keys(value || {}),
    prevKeys = Object.keys(prev);
  let i, len;
  for (i = 0, len = prevKeys.length; i < len; i++) {
    const key = prevKeys[i];
    if (!key || key === "undefined" || value[key]) continue;
    toggleClassKey(node, key, false);
    delete prev[key];
  }
  for (i = 0, len = classKeys.length; i < len; i++) {
    const key = classKeys[i],
      classValue = !!value[key];
    if (!key || key === "undefined" || prev[key] === classValue || !classValue) continue;
    toggleClassKey(node, key, true);
    prev[key] = classValue;
  }
  return prev;
}
function style(node, value, prev) {
  if (!value) return prev ? setAttribute(node, "style") : value;
  const nodeStyle = node.style;
  if (typeof value === "string") return nodeStyle.cssText = value;
  typeof prev === "string" && (nodeStyle.cssText = prev = undefined);
  prev || (prev = {});
  value || (value = {});
  let v, s;
  for (s in prev) {
    value[s] == null && nodeStyle.removeProperty(s);
    delete prev[s];
  }
  for (s in value) {
    v = value[s];
    if (v !== prev[s]) {
      nodeStyle.setProperty(s, v);
      prev[s] = v;
    }
  }
  return prev;
}
function spread(node, props = {}, isSVG, skipChildren) {
  const prevProps = {};
  if (!skipChildren) {
    solidJs.createRenderEffect(() => prevProps.children = insertExpression(node, props.children, prevProps.children));
  }
  solidJs.createRenderEffect(() => props.ref && props.ref(node));
  solidJs.createRenderEffect(() => assign(node, props, isSVG, true, prevProps, true));
  return prevProps;
}
function dynamicProperty(props, key) {
  const src = props[key];
  Object.defineProperty(props, key, {
    get() {
      return src();
    },
    enumerable: true
  });
  return props;
}
function innerHTML(parent, content) {
  !solidJs.sharedConfig.context && (parent.innerHTML = content);
}
function use(fn, element, arg) {
  return solidJs.untrack(() => fn(element, arg));
}
function insert(parent, accessor, marker, initial) {
  if (marker !== undefined && !initial) initial = [];
  if (typeof accessor !== "function") return insertExpression(parent, accessor, initial, marker);
  solidJs.createRenderEffect(current => insertExpression(parent, accessor(), current, marker), initial);
}
function assign(node, props, isSVG, skipChildren, prevProps = {}, skipRef = false) {
  props || (props = {});
  for (const prop in prevProps) {
    if (!(prop in props)) {
      if (prop === "children") continue;
      prevProps[prop] = assignProp(node, prop, null, prevProps[prop], isSVG, skipRef);
    }
  }
  for (const prop in props) {
    if (prop === "children") {
      if (!skipChildren) insertExpression(node, props.children);
      continue;
    }
    const value = props[prop];
    prevProps[prop] = assignProp(node, prop, value, prevProps[prop], isSVG, skipRef);
  }
}
function hydrate$1(code, element, options = {}) {
  solidJs.sharedConfig.completed = globalThis._$HY.completed;
  solidJs.sharedConfig.events = globalThis._$HY.events;
  solidJs.sharedConfig.load = globalThis._$HY.load;
  solidJs.sharedConfig.gather = root => gatherHydratable(element, root);
  solidJs.sharedConfig.registry = new Map();
  solidJs.sharedConfig.context = {
    id: options.renderId || "",
    count: 0
  };
  gatherHydratable(element, options.renderId);
  const dispose = render(code, element, [...element.childNodes], options);
  solidJs.sharedConfig.context = null;
  return dispose;
}
function getNextElement(template) {
  let node, key;
  if (!solidJs.sharedConfig.context || !(node = solidJs.sharedConfig.registry.get(key = getHydrationKey()))) {
    if (solidJs.sharedConfig.context) console.warn("Unable to find DOM nodes for hydration key:", key);
    if (!template) throw new Error("Unrecoverable Hydration Mismatch. No template for key: " + key);
    return template();
  }
  if (solidJs.sharedConfig.completed) solidJs.sharedConfig.completed.add(node);
  solidJs.sharedConfig.registry.delete(key);
  return node;
}
function getNextMatch(el, nodeName) {
  while (el && el.localName !== nodeName) el = el.nextSibling;
  return el;
}
function getNextMarker(start) {
  let end = start,
    count = 0,
    current = [];
  if (solidJs.sharedConfig.context) {
    while (end) {
      if (end.nodeType === 8) {
        const v = end.nodeValue;
        if (v === "#") count++;else if (v === "/") {
          if (count === 0) return [end, current];
          count--;
        }
      }
      current.push(end);
      end = end.nextSibling;
    }
  }
  return [end, current];
}
function runHydrationEvents() {
  if (solidJs.sharedConfig.events && !solidJs.sharedConfig.events.queued) {
    queueMicrotask(() => {
      const {
        completed,
        events
      } = solidJs.sharedConfig;
      events.queued = false;
      while (events.length) {
        const [el, e] = events[0];
        if (!completed.has(el)) return;
        eventHandler(e);
        events.shift();
      }
    });
    solidJs.sharedConfig.events.queued = true;
  }
}
function toPropertyName(name) {
  return name.toLowerCase().replace(/-([a-z])/g, (_, w) => w.toUpperCase());
}
function toggleClassKey(node, key, value) {
  const classNames = key.trim().split(/\s+/);
  for (let i = 0, nameLen = classNames.length; i < nameLen; i++) node.classList.toggle(classNames[i], value);
}
function assignProp(node, prop, value, prev, isSVG, skipRef) {
  let isCE, isProp, isChildProp, propAlias, forceProp;
  if (prop === "style") return style(node, value, prev);
  if (prop === "classList") return classList(node, value, prev);
  if (value === prev) return prev;
  if (prop === "ref") {
    if (!skipRef) value(node);
  } else if (prop.slice(0, 3) === "on:") {
    const e = prop.slice(3);
    prev && node.removeEventListener(e, prev);
    value && node.addEventListener(e, value);
  } else if (prop.slice(0, 10) === "oncapture:") {
    const e = prop.slice(10);
    prev && node.removeEventListener(e, prev, true);
    value && node.addEventListener(e, value, true);
  } else if (prop.slice(0, 2) === "on") {
    const name = prop.slice(2).toLowerCase();
    const delegate = DelegatedEvents.has(name);
    if (!delegate && prev) {
      const h = Array.isArray(prev) ? prev[0] : prev;
      node.removeEventListener(name, h);
    }
    if (delegate || value) {
      addEventListener(node, name, value, delegate);
      delegate && delegateEvents([name]);
    }
  } else if (prop.slice(0, 5) === "attr:") {
    setAttribute(node, prop.slice(5), value);
  } else if ((forceProp = prop.slice(0, 5) === "prop:") || (isChildProp = ChildProperties.has(prop)) || !isSVG && ((propAlias = getPropAlias(prop, node.tagName)) || (isProp = Properties.has(prop))) || (isCE = node.nodeName.includes("-"))) {
    if (forceProp) {
      prop = prop.slice(5);
      isProp = true;
    }
    if (prop === "class" || prop === "className") className(node, value);else if (isCE && !isProp && !isChildProp) node[toPropertyName(prop)] = value;else node[propAlias || prop] = value;
  } else {
    const ns = isSVG && prop.indexOf(":") > -1 && SVGNamespace[prop.split(":")[0]];
    if (ns) setAttributeNS(node, ns, prop, value);else setAttribute(node, Aliases[prop] || prop, value);
  }
  return value;
}
function eventHandler(e) {
  const key = `$$${e.type}`;
  let node = e.composedPath && e.composedPath()[0] || e.target;
  if (e.target !== node) {
    Object.defineProperty(e, "target", {
      configurable: true,
      value: node
    });
  }
  Object.defineProperty(e, "currentTarget", {
    configurable: true,
    get() {
      return node || document;
    }
  });
  if (solidJs.sharedConfig.registry && !solidJs.sharedConfig.done) solidJs.sharedConfig.done = _$HY.done = true;
  while (node) {
    const handler = node[key];
    if (handler && !node.disabled) {
      const data = node[`${key}Data`];
      data !== undefined ? handler.call(node, data, e) : handler.call(node, e);
      if (e.cancelBubble) return;
    }
    node = node._$host || node.parentNode || node.host;
  }
}
function insertExpression(parent, value, current, marker, unwrapArray) {
  if (solidJs.sharedConfig.context) {
    !current && (current = [...parent.childNodes]);
    let cleaned = [];
    for (let i = 0; i < current.length; i++) {
      const node = current[i];
      if (node.nodeType === 8 && node.data.slice(0, 2) === "!$") node.remove();else cleaned.push(node);
    }
    current = cleaned;
  }
  while (typeof current === "function") current = current();
  if (value === current) return current;
  const t = typeof value,
    multi = marker !== undefined;
  parent = multi && current[0] && current[0].parentNode || parent;
  if (t === "string" || t === "number") {
    if (solidJs.sharedConfig.context) return current;
    if (t === "number") value = value.toString();
    if (multi) {
      let node = current[0];
      if (node && node.nodeType === 3) {
        node.data = value;
      } else node = document.createTextNode(value);
      current = cleanChildren(parent, current, marker, node);
    } else {
      if (current !== "" && typeof current === "string") {
        current = parent.firstChild.data = value;
      } else current = parent.textContent = value;
    }
  } else if (value == null || t === "boolean") {
    if (solidJs.sharedConfig.context) return current;
    current = cleanChildren(parent, current, marker);
  } else if (t === "function") {
    solidJs.createRenderEffect(() => {
      let v = value();
      while (typeof v === "function") v = v();
      current = insertExpression(parent, v, current, marker);
    });
    return () => current;
  } else if (Array.isArray(value)) {
    const array = [];
    const currentArray = current && Array.isArray(current);
    if (normalizeIncomingArray(array, value, current, unwrapArray)) {
      solidJs.createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
      return () => current;
    }
    if (solidJs.sharedConfig.context) {
      if (!array.length) return current;
      for (let i = 0; i < array.length; i++) {
        if (array[i].parentNode) return current = array;
      }
    }
    if (array.length === 0) {
      current = cleanChildren(parent, current, marker);
      if (multi) return current;
    } else if (currentArray) {
      if (current.length === 0) {
        appendNodes(parent, array, marker);
      } else reconcileArrays(parent, current, array);
    } else {
      current && cleanChildren(parent);
      appendNodes(parent, array);
    }
    current = array;
  } else if (value.nodeType) {
    if (solidJs.sharedConfig.context && value.parentNode) return current = multi ? [value] : value;
    if (Array.isArray(current)) {
      if (multi) return current = cleanChildren(parent, current, marker, value);
      cleanChildren(parent, current, null, value);
    } else if (current == null || current === "" || !parent.firstChild) {
      parent.appendChild(value);
    } else parent.replaceChild(value, parent.firstChild);
    current = value;
  } else console.warn(`Unrecognized value. Skipped inserting`, value);
  return current;
}
function normalizeIncomingArray(normalized, array, current, unwrap) {
  let dynamic = false;
  for (let i = 0, len = array.length; i < len; i++) {
    let item = array[i],
      prev = current && current[i],
      t;
    if (item == null || item === true || item === false) ; else if ((t = typeof item) === "object" && item.nodeType) {
      normalized.push(item);
    } else if (Array.isArray(item)) {
      dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
    } else if (t === "function") {
      if (unwrap) {
        while (typeof item === "function") item = item();
        dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item], Array.isArray(prev) ? prev : [prev]) || dynamic;
      } else {
        normalized.push(item);
        dynamic = true;
      }
    } else {
      const value = String(item);
      if (prev && prev.nodeType === 3 && prev.data === value) normalized.push(prev);else normalized.push(document.createTextNode(value));
    }
  }
  return dynamic;
}
function appendNodes(parent, array, marker = null) {
  for (let i = 0, len = array.length; i < len; i++) parent.insertBefore(array[i], marker);
}
function cleanChildren(parent, current, marker, replacement) {
  if (marker === undefined) return parent.textContent = "";
  const node = replacement || document.createTextNode("");
  if (current.length) {
    let inserted = false;
    for (let i = current.length - 1; i >= 0; i--) {
      const el = current[i];
      if (node !== el) {
        const isParent = el.parentNode === parent;
        if (!inserted && !i) isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);else isParent && el.remove();
      } else inserted = true;
    }
  } else parent.insertBefore(node, marker);
  return [node];
}
function gatherHydratable(element, root) {
  const templates = element.querySelectorAll(`*[data-hk]`);
  for (let i = 0; i < templates.length; i++) {
    const node = templates[i];
    const key = node.getAttribute("data-hk");
    if ((!root || key.startsWith(root)) && !solidJs.sharedConfig.registry.has(key)) solidJs.sharedConfig.registry.set(key, node);
  }
}
function getHydrationKey() {
  const hydrate = solidJs.sharedConfig.context;
  return `${hydrate.id}${hydrate.count++}`;
}
function NoHydration(props) {
  return solidJs.sharedConfig.context ? undefined : props.children;
}
function Hydration(props) {
  return props.children;
}
function voidFn() {}

function throwInBrowser(func) {
  const err = new Error(`${func.name} is not supported in the browser, returning undefined`);
  console.error(err);
}
function renderToString(fn, options) {
  throwInBrowser(renderToString);
}
function renderToStringAsync(fn, options) {
  throwInBrowser(renderToStringAsync);
}
function renderToStream(fn, options) {
  throwInBrowser(renderToStream);
}
function ssr(template, ...nodes) {}
function ssrElement(name, props, children, needsId) {}
function ssrClassList(value) {}
function ssrStyle(value) {}
function ssrAttribute(key, value) {}
function ssrHydrationKey() {}
function resolveSSRNode(node) {}
function escape(html) {}
function ssrSpread(props, isSVG, skipChildren) {}

const isServer = false;
const isDev = false;
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
function createElement(tagName, isSVG = false) {
  return isSVG ? document.createElementNS(SVG_NAMESPACE, tagName) : document.createElement(tagName);
}
const hydrate = (...args) => {
  solidJs.enableHydration();
  return hydrate$1(...args);
};
function Portal(props) {
  const {
      useShadow
    } = props,
    marker = document.createTextNode(""),
    mount = () => props.mount || document.body,
    owner = solidJs.getOwner();
  let content;
  let hydrating = !!solidJs.sharedConfig.context;
  solidJs.createEffect(() => {
    if (hydrating) solidJs.getOwner().user = hydrating = false;
    content || (content = solidJs.runWithOwner(owner, () => solidJs.createMemo(() => props.children)));
    const el = mount();
    if (el instanceof HTMLHeadElement) {
      const [clean, setClean] = solidJs.createSignal(false);
      const cleanup = () => setClean(true);
      solidJs.createRoot(dispose => insert(el, () => !clean() ? content() : dispose(), null));
      solidJs.onCleanup(cleanup);
    } else {
      const container = createElement(props.isSVG ? "g" : "div", props.isSVG),
        renderRoot = useShadow && container.attachShadow ? container.attachShadow({
          mode: "open"
        }) : container;
      Object.defineProperty(container, "_$host", {
        get() {
          return marker.parentNode;
        },
        configurable: true
      });
      insert(renderRoot, content);
      el.appendChild(container);
      props.ref && props.ref(container);
      solidJs.onCleanup(() => el.removeChild(container));
    }
  }, undefined, {
    render: !hydrating
  });
  return marker;
}
function Dynamic(props) {
  const [p, others] = solidJs.splitProps(props, ["component"]);
  const cached = solidJs.createMemo(() => p.component);
  return solidJs.createMemo(() => {
    const component = cached();
    switch (typeof component) {
      case "function":
        Object.assign(component, {
          [solidJs.$DEVCOMP]: true
        });
        return solidJs.untrack(() => component(others));
      case "string":
        const isSvg = SVGElements.has(component);
        const el = solidJs.sharedConfig.context ? getNextElement() : createElement(component, isSvg);
        spread(el, others, isSvg);
        return el;
    }
  });
}

Object.defineProperty(exports, "ErrorBoundary", ({
  enumerable: true,
  get: function () { return solidJs.ErrorBoundary; }
}));
Object.defineProperty(exports, "For", ({
  enumerable: true,
  get: function () { return solidJs.For; }
}));
Object.defineProperty(exports, "Index", ({
  enumerable: true,
  get: function () { return solidJs.Index; }
}));
Object.defineProperty(exports, "Match", ({
  enumerable: true,
  get: function () { return solidJs.Match; }
}));
Object.defineProperty(exports, "Show", ({
  enumerable: true,
  get: function () { return solidJs.Show; }
}));
Object.defineProperty(exports, "Suspense", ({
  enumerable: true,
  get: function () { return solidJs.Suspense; }
}));
Object.defineProperty(exports, "SuspenseList", ({
  enumerable: true,
  get: function () { return solidJs.SuspenseList; }
}));
Object.defineProperty(exports, "Switch", ({
  enumerable: true,
  get: function () { return solidJs.Switch; }
}));
Object.defineProperty(exports, "createComponent", ({
  enumerable: true,
  get: function () { return solidJs.createComponent; }
}));
Object.defineProperty(exports, "effect", ({
  enumerable: true,
  get: function () { return solidJs.createRenderEffect; }
}));
Object.defineProperty(exports, "getOwner", ({
  enumerable: true,
  get: function () { return solidJs.getOwner; }
}));
Object.defineProperty(exports, "memo", ({
  enumerable: true,
  get: function () { return solidJs.createMemo; }
}));
Object.defineProperty(exports, "mergeProps", ({
  enumerable: true,
  get: function () { return solidJs.mergeProps; }
}));
Object.defineProperty(exports, "untrack", ({
  enumerable: true,
  get: function () { return solidJs.untrack; }
}));
exports.Aliases = Aliases;
exports.Assets = voidFn;
exports.ChildProperties = ChildProperties;
exports.DOMElements = DOMElements;
exports.DelegatedEvents = DelegatedEvents;
exports.Dynamic = Dynamic;
exports.Hydration = Hydration;
exports.HydrationScript = voidFn;
exports.NoHydration = NoHydration;
exports.Portal = Portal;
exports.Properties = Properties;
exports.SVGElements = SVGElements;
exports.SVGNamespace = SVGNamespace;
exports.addEventListener = addEventListener;
exports.assign = assign;
exports.classList = classList;
exports.className = className;
exports.clearDelegatedEvents = clearDelegatedEvents;
exports.delegateEvents = delegateEvents;
exports.dynamicProperty = dynamicProperty;
exports.escape = escape;
exports.generateHydrationScript = voidFn;
exports.getAssets = voidFn;
exports.getHydrationKey = getHydrationKey;
exports.getNextElement = getNextElement;
exports.getNextMarker = getNextMarker;
exports.getNextMatch = getNextMatch;
exports.getPropAlias = getPropAlias;
exports.hydrate = hydrate;
exports.innerHTML = innerHTML;
exports.insert = insert;
exports.isDev = isDev;
exports.isServer = isServer;
exports.render = render;
exports.renderToStream = renderToStream;
exports.renderToString = renderToString;
exports.renderToStringAsync = renderToStringAsync;
exports.resolveSSRNode = resolveSSRNode;
exports.runHydrationEvents = runHydrationEvents;
exports.setAttribute = setAttribute;
exports.setAttributeNS = setAttributeNS;
exports.spread = spread;
exports.ssr = ssr;
exports.ssrAttribute = ssrAttribute;
exports.ssrClassList = ssrClassList;
exports.ssrElement = ssrElement;
exports.ssrHydrationKey = ssrHydrationKey;
exports.ssrSpread = ssrSpread;
exports.ssrStyle = ssrStyle;
exports.style = style;
exports.template = template;
exports.use = use;
exports.useAssets = voidFn;


/***/ }),

/***/ "./node_modules/solid-element/dist/index.js":
/*!**************************************************!*\
  !*** ./node_modules/solid-element/dist/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customElement": () => (/* binding */ customElement),
/* harmony export */   "getCurrentElement": () => (/* reexport safe */ component_register__WEBPACK_IMPORTED_MODULE_0__.getCurrentElement),
/* harmony export */   "hot": () => (/* reexport safe */ component_register__WEBPACK_IMPORTED_MODULE_0__.hot),
/* harmony export */   "noShadowDOM": () => (/* reexport safe */ component_register__WEBPACK_IMPORTED_MODULE_0__.noShadowDOM),
/* harmony export */   "withSolid": () => (/* binding */ withSolid)
/* harmony export */ });
/* harmony import */ var component_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! component-register */ "./node_modules/component-register/dist/component-register.js");
/* harmony import */ var solid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! solid-js */ "./node_modules/solid-js/dist/solid.cjs");
/* harmony import */ var solid_js_web__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! solid-js/web */ "./node_modules/solid-js/web/dist/web.cjs");




function createProps(raw) {
    const keys = Object.keys(raw);
    const props = {};
    for (let i = 0; i < keys.length; i++) {
        const [get, set] = (0,solid_js__WEBPACK_IMPORTED_MODULE_1__.createSignal)(raw[keys[i]]);
        Object.defineProperty(props, keys[i], {
            get,
            set(v) {
                set(() => v);
            }
        });
    }
    return props;
}
function lookupContext(el) {
    if (el.assignedSlot && el.assignedSlot._$owner)
        return el.assignedSlot._$owner;
    let next = el.parentNode;
    while (next &&
        !next._$owner &&
        !(next.assignedSlot && next.assignedSlot._$owner))
        next = next.parentNode;
    return next && next.assignedSlot
        ? next.assignedSlot._$owner
        : el._$owner;
}
function withSolid(ComponentType) {
    return (rawProps, options) => {
        const { element } = options;
        return (0,solid_js__WEBPACK_IMPORTED_MODULE_1__.createRoot)((dispose) => {
            const props = createProps(rawProps);
            element.addPropertyChangedCallback((key, val) => (props[key] = val));
            element.addReleaseCallback(() => {
                element.renderRoot.textContent = "";
                dispose();
            });
            const comp = ComponentType(props, options);
            return (0,solid_js_web__WEBPACK_IMPORTED_MODULE_2__.insert)(element.renderRoot, comp);
        }, lookupContext(element));
    };
}
function customElement(tag, props, ComponentType) {
    if (arguments.length === 2) {
        ComponentType = props;
        props = {};
    }
    return (0,component_register__WEBPACK_IMPORTED_MODULE_0__.register)(tag, props)(withSolid(ComponentType));
}



/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/Component.js":
/*!***************************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/Component.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SvelteComponent": () => (/* binding */ SvelteComponent),
/* harmony export */   "SvelteElement": () => (/* binding */ SvelteElement),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "claim_component": () => (/* binding */ claim_component),
/* harmony export */   "create_component": () => (/* binding */ create_component),
/* harmony export */   "create_custom_element": () => (/* binding */ create_custom_element),
/* harmony export */   "destroy_component": () => (/* binding */ destroy_component),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "mount_component": () => (/* binding */ mount_component)
/* harmony export */ });
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/svelte/src/runtime/internal/scheduler.js");
/* harmony import */ var _lifecycle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lifecycle.js */ "./node_modules/svelte/src/runtime/internal/lifecycle.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/runtime/internal/utils.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom.js */ "./node_modules/svelte/src/runtime/internal/dom.js");
/* harmony import */ var _transitions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transitions.js */ "./node_modules/svelte/src/runtime/internal/transitions.js");






/** @returns {void} */
function bind(component, name, callback) {
	const index = component.$$.props[name];
	if (index !== undefined) {
		component.$$.bound[index] = callback;
		callback(component.$$.ctx[index]);
	}
}

/** @returns {void} */
function create_component(block) {
	block && block.c();
}

/** @returns {void} */
function claim_component(block, parent_nodes) {
	block && block.l(parent_nodes);
}

/** @returns {void} */
function mount_component(component, target, anchor) {
	const { fragment, after_update } = component.$$;
	fragment && fragment.m(target, anchor);
	// onMount happens before the initial afterUpdate
	(0,_scheduler_js__WEBPACK_IMPORTED_MODULE_0__.add_render_callback)(() => {
		const new_on_destroy = component.$$.on_mount.map(_utils_js__WEBPACK_IMPORTED_MODULE_2__.run).filter(_utils_js__WEBPACK_IMPORTED_MODULE_2__.is_function);
		// if the component was destroyed immediately
		// it will update the `$$.on_destroy` reference to `null`.
		// the destructured on_destroy may still reference to the old array
		if (component.$$.on_destroy) {
			component.$$.on_destroy.push(...new_on_destroy);
		} else {
			// Edge case - component was destroyed immediately,
			// most likely as a result of a binding initialising
			(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.run_all)(new_on_destroy);
		}
		component.$$.on_mount = [];
	});
	after_update.forEach(_scheduler_js__WEBPACK_IMPORTED_MODULE_0__.add_render_callback);
}

/** @returns {void} */
function destroy_component(component, detaching) {
	const $$ = component.$$;
	if ($$.fragment !== null) {
		(0,_scheduler_js__WEBPACK_IMPORTED_MODULE_0__.flush_render_callbacks)($$.after_update);
		(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.run_all)($$.on_destroy);
		$$.fragment && $$.fragment.d(detaching);
		// TODO null out other refs, including component.$$ (but need to
		// preserve final state?)
		$$.on_destroy = $$.fragment = null;
		$$.ctx = [];
	}
}

/** @returns {void} */
function make_dirty(component, i) {
	if (component.$$.dirty[0] === -1) {
		_scheduler_js__WEBPACK_IMPORTED_MODULE_0__.dirty_components.push(component);
		(0,_scheduler_js__WEBPACK_IMPORTED_MODULE_0__.schedule_update)();
		component.$$.dirty.fill(0);
	}
	component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
}

// TODO: Document the other params
/**
 * @param {SvelteComponent} component
 * @param {import('./public.js').ComponentConstructorOptions} options
 *
 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
 * This will be the `add_css` function from the compiled component.
 *
 * @returns {void}
 */
function init(
	component,
	options,
	instance,
	create_fragment,
	not_equal,
	props,
	append_styles = null,
	dirty = [-1]
) {
	const parent_component = _lifecycle_js__WEBPACK_IMPORTED_MODULE_1__.current_component;
	(0,_lifecycle_js__WEBPACK_IMPORTED_MODULE_1__.set_current_component)(component);
	/** @type {import('./private.js').T$$} */
	const $$ = (component.$$ = {
		fragment: null,
		ctx: [],
		// state
		props,
		update: _utils_js__WEBPACK_IMPORTED_MODULE_2__.noop,
		not_equal,
		bound: (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.blank_object)(),
		// lifecycle
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
		// everything else
		callbacks: (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.blank_object)(),
		dirty,
		skip_bound: false,
		root: options.target || parent_component.$$.root
	});
	append_styles && append_styles($$.root);
	let ready = false;
	$$.ctx = instance
		? instance(component, options.props || {}, (i, ret, ...rest) => {
				const value = rest.length ? rest[0] : ret;
				if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
					if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
					if (ready) make_dirty(component, i);
				}
				return ret;
		  })
		: [];
	$$.update();
	ready = true;
	(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.run_all)($$.before_update);
	// `false` as a special case of no DOM component
	$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	if (options.target) {
		if (options.hydrate) {
			(0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.start_hydrating)();
			// TODO: what is the correct type here?
			// @ts-expect-error
			const nodes = (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.children)(options.target);
			$$.fragment && $$.fragment.l(nodes);
			nodes.forEach(_dom_js__WEBPACK_IMPORTED_MODULE_3__.detach);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment.c();
		}
		if (options.intro) (0,_transitions_js__WEBPACK_IMPORTED_MODULE_4__.transition_in)(component.$$.fragment);
		mount_component(component, options.target, options.anchor);
		(0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.end_hydrating)();
		(0,_scheduler_js__WEBPACK_IMPORTED_MODULE_0__.flush)();
	}
	(0,_lifecycle_js__WEBPACK_IMPORTED_MODULE_1__.set_current_component)(parent_component);
}

let SvelteElement;

if (typeof HTMLElement === 'function') {
	SvelteElement = class extends HTMLElement {
		/** The Svelte component constructor */
		$$ctor;
		/** Slots */
		$$s;
		/** The Svelte component instance */
		$$c;
		/** Whether or not the custom element is connected */
		$$cn = false;
		/** Component props data */
		$$d = {};
		/** `true` if currently in the process of reflecting component props back to attributes */
		$$r = false;
		/** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
		$$p_d = {};
		/** @type {Record<string, Function[]>} Event listeners */
		$$l = {};
		/** @type {Map<Function, Function>} Event listener unsubscribe functions */
		$$l_u = new Map();

		constructor($$componentCtor, $$slots, use_shadow_dom) {
			super();
			this.$$ctor = $$componentCtor;
			this.$$s = $$slots;
			if (use_shadow_dom) {
				this.attachShadow({ mode: 'open' });
			}
		}

		addEventListener(type, listener, options) {
			// We can't determine upfront if the event is a custom event or not, so we have to
			// listen to both. If someone uses a custom event with the same name as a regular
			// browser event, this fires twice - we can't avoid that.
			this.$$l[type] = this.$$l[type] || [];
			this.$$l[type].push(listener);
			if (this.$$c) {
				const unsub = this.$$c.$on(type, listener);
				this.$$l_u.set(listener, unsub);
			}
			super.addEventListener(type, listener, options);
		}

		removeEventListener(type, listener, options) {
			super.removeEventListener(type, listener, options);
			if (this.$$c) {
				const unsub = this.$$l_u.get(listener);
				if (unsub) {
					unsub();
					this.$$l_u.delete(listener);
				}
			}
		}

		async connectedCallback() {
			this.$$cn = true;
			if (!this.$$c) {
				// We wait one tick to let possible child slot elements be created/mounted
				await Promise.resolve();
				if (!this.$$cn) {
					return;
				}
				function create_slot(name) {
					return () => {
						let node;
						const obj = {
							c: function create() {
								node = (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.element)('slot');
								if (name !== 'default') {
									(0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.attr)(node, 'name', name);
								}
							},
							/**
							 * @param {HTMLElement} target
							 * @param {HTMLElement} [anchor]
							 */
							m: function mount(target, anchor) {
								(0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.insert)(target, node, anchor);
							},
							d: function destroy(detaching) {
								if (detaching) {
									(0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.detach)(node);
								}
							}
						};
						return obj;
					};
				}
				const $$slots = {};
				const existing_slots = (0,_dom_js__WEBPACK_IMPORTED_MODULE_3__.get_custom_elements_slots)(this);
				for (const name of this.$$s) {
					if (name in existing_slots) {
						$$slots[name] = [create_slot(name)];
					}
				}
				for (const attribute of this.attributes) {
					// this.$$data takes precedence over this.attributes
					const name = this.$$g_p(attribute.name);
					if (!(name in this.$$d)) {
						this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, 'toProp');
					}
				}
				this.$$c = new this.$$ctor({
					target: this.shadowRoot || this,
					props: {
						...this.$$d,
						$$slots,
						$$scope: {
							ctx: []
						}
					}
				});

				// Reflect component props as attributes
				const reflect_attributes = () => {
					this.$$r = true;
					for (const key in this.$$p_d) {
						this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
						if (this.$$p_d[key].reflect) {
							const attribute_value = get_custom_element_value(
								key,
								this.$$d[key],
								this.$$p_d,
								'toAttribute'
							);
							if (attribute_value == null) {
								this.removeAttribute(this.$$p_d[key].attribute || key);
							} else {
								this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
							}
						}
					}
					this.$$r = false;
				};
				this.$$c.$$.after_update.push(reflect_attributes);
				reflect_attributes(); // once initially because after_update is added too late for first render

				for (const type in this.$$l) {
					for (const listener of this.$$l[type]) {
						const unsub = this.$$c.$on(type, listener);
						this.$$l_u.set(listener, unsub);
					}
				}
				this.$$l = {};
			}
		}

		// We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
		// and setting attributes through setAttribute etc, this is helpful
		attributeChangedCallback(attr, _oldValue, newValue) {
			if (this.$$r) return;
			attr = this.$$g_p(attr);
			this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, 'toProp');
			this.$$c?.$set({ [attr]: this.$$d[attr] });
		}

		disconnectedCallback() {
			this.$$cn = false;
			// In a microtask, because this could be a move within the DOM
			Promise.resolve().then(() => {
				if (!this.$$cn) {
					this.$$c.$destroy();
					this.$$c = undefined;
				}
			});
		}

		$$g_p(attribute_name) {
			return (
				Object.keys(this.$$p_d).find(
					(key) =>
						this.$$p_d[key].attribute === attribute_name ||
						(!this.$$p_d[key].attribute && key.toLowerCase() === attribute_name)
				) || attribute_name
			);
		}
	};
}

/**
 * @param {string} prop
 * @param {any} value
 * @param {Record<string, CustomElementPropDefinition>} props_definition
 * @param {'toAttribute' | 'toProp'} [transform]
 */
function get_custom_element_value(prop, value, props_definition, transform) {
	const type = props_definition[prop]?.type;
	value = type === 'Boolean' && typeof value !== 'boolean' ? value != null : value;
	if (!transform || !props_definition[prop]) {
		return value;
	} else if (transform === 'toAttribute') {
		switch (type) {
			case 'Object':
			case 'Array':
				return value == null ? null : JSON.stringify(value);
			case 'Boolean':
				return value ? '' : null;
			case 'Number':
				return value == null ? null : value;
			default:
				return value;
		}
	} else {
		switch (type) {
			case 'Object':
			case 'Array':
				return value && JSON.parse(value);
			case 'Boolean':
				return value; // conversion already handled above
			case 'Number':
				return value != null ? +value : value;
			default:
				return value;
		}
	}
}

/**
 * @internal
 *
 * Turn a Svelte component into a custom element.
 * @param {import('./public.js').ComponentType} Component  A Svelte component constructor
 * @param {Record<string, CustomElementPropDefinition>} props_definition  The props to observe
 * @param {string[]} slots  The slots to create
 * @param {string[]} accessors  Other accessors besides the ones for props the component has
 * @param {boolean} use_shadow_dom  Whether to use shadow DOM
 * @param {(ce: new () => HTMLElement) => new () => HTMLElement} [extend]
 */
function create_custom_element(
	Component,
	props_definition,
	slots,
	accessors,
	use_shadow_dom,
	extend
) {
	let Class = class extends SvelteElement {
		constructor() {
			super(Component, slots, use_shadow_dom);
			this.$$p_d = props_definition;
		}
		static get observedAttributes() {
			return Object.keys(props_definition).map((key) =>
				(props_definition[key].attribute || key).toLowerCase()
			);
		}
	};
	Object.keys(props_definition).forEach((prop) => {
		Object.defineProperty(Class.prototype, prop, {
			get() {
				return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
			},
			set(value) {
				value = get_custom_element_value(prop, value, props_definition);
				this.$$d[prop] = value;
				this.$$c?.$set({ [prop]: value });
			}
		});
	});
	accessors.forEach((accessor) => {
		Object.defineProperty(Class.prototype, accessor, {
			get() {
				return this.$$c?.[accessor];
			}
		});
	});
	if (extend) {
		// @ts-expect-error - assigning here is fine
		Class = extend(Class);
	}
	Component.element = /** @type {any} */ (Class);
	return Class;
}

/**
 * Base class for Svelte components. Used when dev=false.
 *
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 */
class SvelteComponent {
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$ = undefined;
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$set = undefined;

	/** @returns {void} */
	$destroy() {
		destroy_component(this, 1);
		this.$destroy = _utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;
	}

	/**
	 * @template {Extract<keyof Events, string>} K
	 * @param {K} type
	 * @param {((e: Events[K]) => void) | null | undefined} callback
	 * @returns {() => void}
	 */
	$on(type, callback) {
		if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.is_function)(callback)) {
			return _utils_js__WEBPACK_IMPORTED_MODULE_2__.noop;
		}
		const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
		callbacks.push(callback);
		return () => {
			const index = callbacks.indexOf(callback);
			if (index !== -1) callbacks.splice(index, 1);
		};
	}

	/**
	 * @param {Partial<Props>} props
	 * @returns {void}
	 */
	$set(props) {
		if (this.$$set && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.is_empty)(props)) {
			this.$$.skip_bound = true;
			this.$$set(props);
			this.$$.skip_bound = false;
		}
	}
}

/**
 * @typedef {Object} CustomElementPropDefinition
 * @property {string} [attribute]
 * @property {boolean} [reflect]
 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
 */


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResizeObserverSingleton": () => (/* binding */ ResizeObserverSingleton)
/* harmony export */ });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.js */ "./node_modules/svelte/src/runtime/internal/globals.js");


/**
 * Resize observer singleton.
 * One listener per element only!
 * https://groups.google.com/a/chromium.org/g/blink-dev/c/z6ienONUb5A/m/F5-VcUZtBAAJ
 */
class ResizeObserverSingleton {
	/**
	 * @private
	 * @readonly
	 * @type {WeakMap<Element, import('./private.js').Listener>}
	 */
	_listeners = "WeakMap" in _globals_js__WEBPACK_IMPORTED_MODULE_0__.globals ? new WeakMap() : undefined;

	/**
	 * @private
	 * @type {ResizeObserver}
	 */
	_observer = undefined;

	/** @type {ResizeObserverOptions} */
	options;

	/** @param {ResizeObserverOptions} options */
	constructor(options) {
		this.options = options;
	}

	/**
	 * @param {Element} element
	 * @param {import('./private.js').Listener} listener
	 * @returns {() => void}
	 */
	observe(element, listener) {
		this._listeners.set(element, listener);
		this._getObserver().observe(element, this.options);
		return () => {
			this._listeners.delete(element);
			this._observer.unobserve(element); // this line can probably be removed
		};
	}

	/**
	 * @private
	 */
	_getObserver() {
		return (
			this._observer ??
			(this._observer = new ResizeObserver((entries) => {
				for (const entry of entries) {
					ResizeObserverSingleton.entries.set(entry.target, entry);
					this._listeners.get(entry.target)?.(entry);
				}
			}))
		);
	}
}

// Needs to be written like this to pass the tree-shake-test
ResizeObserverSingleton.entries = "WeakMap" in _globals_js__WEBPACK_IMPORTED_MODULE_0__.globals ? new WeakMap() : undefined;


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/animations.js":
/*!****************************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/animations.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add_transform": () => (/* binding */ add_transform),
/* harmony export */   "create_animation": () => (/* binding */ create_animation),
/* harmony export */   "fix_position": () => (/* binding */ fix_position)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/runtime/internal/utils.js");
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environment.js */ "./node_modules/svelte/src/runtime/internal/environment.js");
/* harmony import */ var _loop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loop.js */ "./node_modules/svelte/src/runtime/internal/loop.js");
/* harmony import */ var _style_manager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style_manager.js */ "./node_modules/svelte/src/runtime/internal/style_manager.js");





/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {import('./private.js').PositionRect} from
 * @param {import('./private.js').AnimationFn} fn
 */
function create_animation(node, from, fn, params) {
	if (!from) return _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
	const to = node.getBoundingClientRect();
	if (
		from.left === to.left &&
		from.right === to.right &&
		from.top === to.top &&
		from.bottom === to.bottom
	)
		return _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;
	const {
		delay = 0,
		duration = 300,
		easing = _utils_js__WEBPACK_IMPORTED_MODULE_0__.identity,
		// @ts-ignore todo: should this be separated from destructuring? Or start/end added to public api and documentation?
		start: start_time = (0,_environment_js__WEBPACK_IMPORTED_MODULE_1__.now)() + delay,
		// @ts-ignore todo:
		end = start_time + duration,
		tick = _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop,
		css
	} = fn(node, { from, to }, params);
	let running = true;
	let started = false;
	let name;
	/** @returns {void} */
	function start() {
		if (css) {
			name = (0,_style_manager_js__WEBPACK_IMPORTED_MODULE_3__.create_rule)(node, 0, 1, duration, delay, easing, css);
		}
		if (!delay) {
			started = true;
		}
	}
	/** @returns {void} */
	function stop() {
		if (css) (0,_style_manager_js__WEBPACK_IMPORTED_MODULE_3__.delete_rule)(node, name);
		running = false;
	}
	(0,_loop_js__WEBPACK_IMPORTED_MODULE_2__.loop)((now) => {
		if (!started && now >= start_time) {
			started = true;
		}
		if (started && now >= end) {
			tick(1, 0);
			stop();
		}
		if (!running) {
			return false;
		}
		if (started) {
			const p = now - start_time;
			const t = 0 + 1 * easing(p / duration);
			tick(t, 1 - t);
		}
		return true;
	});
	start();
	tick(0, 1);
	return stop;
}

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @returns {void}
 */
function fix_position(node) {
	const style = getComputedStyle(node);
	if (style.position !== 'absolute' && style.position !== 'fixed') {
		const { width, height } = style;
		const a = node.getBoundingClientRect();
		node.style.position = 'absolute';
		node.style.width = width;
		node.style.height = height;
		add_transform(node, a);
	}
}

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {import('./private.js').PositionRect} a
 * @returns {void}
 */
function add_transform(node, a) {
	const b = node.getBoundingClientRect();
	if (a.left !== b.left || a.top !== b.top) {
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;
		node.style.transform = `${transform} translate(${a.left - b.left}px, ${a.top - b.top}px)`;
	}
}


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/await_block.js":
/*!*****************************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/await_block.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handle_promise": () => (/* binding */ handle_promise),
/* harmony export */   "update_await_block_branch": () => (/* binding */ update_await_block_branch)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/runtime/internal/utils.js");
/* harmony import */ var _transitions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transitions.js */ "./node_modules/svelte/src/runtime/internal/transitions.js");
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/svelte/src/runtime/internal/scheduler.js");
/* harmony import */ var _lifecycle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lifecycle.js */ "./node_modules/svelte/src/runtime/internal/lifecycle.js");





/**
 * @template T
 * @param {Promise<T>} promise
 * @param {import('./private.js').PromiseInfo<T>} info
 * @returns {boolean}
 */
function handle_promise(promise, info) {
	const token = (info.token = {});
	/**
	 * @param {import('./private.js').FragmentFactory} type
	 * @param {0 | 1 | 2} index
	 * @param {number} [key]
	 * @param {any} [value]
	 * @returns {void}
	 */
	function update(type, index, key, value) {
		if (info.token !== token) return;
		info.resolved = value;
		let child_ctx = info.ctx;
		if (key !== undefined) {
			child_ctx = child_ctx.slice();
			child_ctx[key] = value;
		}
		const block = type && (info.current = type)(child_ctx);
		let needs_flush = false;
		if (info.block) {
			if (info.blocks) {
				info.blocks.forEach((block, i) => {
					if (i !== index && block) {
						(0,_transitions_js__WEBPACK_IMPORTED_MODULE_1__.group_outros)();
						(0,_transitions_js__WEBPACK_IMPORTED_MODULE_1__.transition_out)(block, 1, 1, () => {
							if (info.blocks[i] === block) {
								info.blocks[i] = null;
							}
						});
						(0,_transitions_js__WEBPACK_IMPORTED_MODULE_1__.check_outros)();
					}
				});
			} else {
				info.block.d(1);
			}
			block.c();
			(0,_transitions_js__WEBPACK_IMPORTED_MODULE_1__.transition_in)(block, 1);
			block.m(info.mount(), info.anchor);
			needs_flush = true;
		}
		info.block = block;
		if (info.blocks) info.blocks[index] = block;
		if (needs_flush) {
			(0,_scheduler_js__WEBPACK_IMPORTED_MODULE_2__.flush)();
		}
	}
	if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.is_promise)(promise)) {
		const current_component = (0,_lifecycle_js__WEBPACK_IMPORTED_MODULE_3__.get_current_component)();
		promise.then(
			(value) => {
				(0,_lifecycle_js__WEBPACK_IMPORTED_MODULE_3__.set_current_component)(current_component);
				update(info.then, 1, info.value, value);
				(0,_lifecycle_js__WEBPACK_IMPORTED_MODULE_3__.set_current_component)(null);
			},
			(error) => {
				(0,_lifecycle_js__WEBPACK_IMPORTED_MODULE_3__.set_current_component)(current_component);
				update(info.catch, 2, info.error, error);
				(0,_lifecycle_js__WEBPACK_IMPORTED_MODULE_3__.set_current_component)(null);
				if (!info.hasCatch) {
					throw error;
				}
			}
		);
		// if we previously had a then/catch block, destroy it
		if (info.current !== info.pending) {
			update(info.pending, 0);
			return true;
		}
	} else {
		if (info.current !== info.then) {
			update(info.then, 1, info.value, promise);
			return true;
		}
		info.resolved = /** @type {T} */ (promise);
	}
}

/** @returns {void} */
function update_await_block_branch(info, ctx, dirty) {
	const child_ctx = ctx.slice();
	const { resolved } = info;
	if (info.current === info.then) {
		child_ctx[info.value] = resolved;
	}
	if (info.current === info.catch) {
		child_ctx[info.error] = resolved;
	}
	info.block.p(child_ctx, dirty);
}


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/dev.js":
/*!*********************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/dev.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SvelteComponentDev": () => (/* binding */ SvelteComponentDev),
/* harmony export */   "SvelteComponentTyped": () => (/* binding */ SvelteComponentTyped),
/* harmony export */   "append_dev": () => (/* binding */ append_dev),
/* harmony export */   "append_hydration_dev": () => (/* binding */ append_hydration_dev),
/* harmony export */   "attr_dev": () => (/* binding */ attr_dev),
/* harmony export */   "construct_svelte_component_dev": () => (/* binding */ construct_svelte_component_dev),
/* harmony export */   "dataset_dev": () => (/* binding */ dataset_dev),
/* harmony export */   "detach_after_dev": () => (/* binding */ detach_after_dev),
/* harmony export */   "detach_before_dev": () => (/* binding */ detach_before_dev),
/* harmony export */   "detach_between_dev": () => (/* binding */ detach_between_dev),
/* harmony export */   "detach_dev": () => (/* binding */ detach_dev),
/* harmony export */   "dispatch_dev": () => (/* binding */ dispatch_dev),
/* harmony export */   "ensure_array_like_dev": () => (/* binding */ ensure_array_like_dev),
/* harmony export */   "insert_dev": () => (/* binding */ insert_dev),
/* harmony export */   "insert_hydration_dev": () => (/* binding */ insert_hydration_dev),
/* harmony export */   "listen_dev": () => (/* binding */ listen_dev),
/* harmony export */   "loop_guard": () => (/* binding */ loop_guard),
/* harmony export */   "prop_dev": () => (/* binding */ prop_dev),
/* harmony export */   "set_data_contenteditable_dev": () => (/* binding */ set_data_contenteditable_dev),
/* harmony export */   "set_data_dev": () => (/* binding */ set_data_dev),
/* harmony export */   "set_data_maybe_contenteditable_dev": () => (/* binding */ set_data_maybe_contenteditable_dev),
/* harmony export */   "validate_dynamic_element": () => (/* binding */ validate_dynamic_element),
/* harmony export */   "validate_slots": () => (/* binding */ validate_slots),
/* harmony export */   "validate_void_dynamic_element": () => (/* binding */ validate_void_dynamic_element)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./node_modules/svelte/src/runtime/internal/dom.js");
/* harmony import */ var _Component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Component.js */ "./node_modules/svelte/src/runtime/internal/Component.js");
/* harmony import */ var _shared_utils_names_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utils/names.js */ "./node_modules/svelte/src/shared/utils/names.js");
/* harmony import */ var _shared_version_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/version.js */ "./node_modules/svelte/src/shared/version.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/runtime/internal/utils.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./each.js */ "./node_modules/svelte/src/runtime/internal/each.js");







/**
 * @template T
 * @param {string} type
 * @param {T} [detail]
 * @returns {void}
 */
function dispatch_dev(type, detail) {
	document.dispatchEvent((0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.custom_event)(type, { version: _shared_version_js__WEBPACK_IMPORTED_MODULE_3__.VERSION, ...detail }, { bubbles: true }));
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append_dev(target, node) {
	dispatch_dev('SvelteDOMInsert', { target, node });
	(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.append)(target, node);
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append_hydration_dev(target, node) {
	dispatch_dev('SvelteDOMInsert', { target, node });
	(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.append_hydration)(target, node);
}

/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert_dev(target, node, anchor) {
	dispatch_dev('SvelteDOMInsert', { target, node, anchor });
	(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.insert)(target, node, anchor);
}

/** @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert_hydration_dev(target, node, anchor) {
	dispatch_dev('SvelteDOMInsert', { target, node, anchor });
	(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.insert_hydration)(target, node, anchor);
}

/**
 * @param {Node} node
 * @returns {void}
 */
function detach_dev(node) {
	dispatch_dev('SvelteDOMRemove', { node });
	(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.detach)(node);
}

/**
 * @param {Node} before
 * @param {Node} after
 * @returns {void}
 */
function detach_between_dev(before, after) {
	while (before.nextSibling && before.nextSibling !== after) {
		detach_dev(before.nextSibling);
	}
}

/**
 * @param {Node} after
 * @returns {void}
 */
function detach_before_dev(after) {
	while (after.previousSibling) {
		detach_dev(after.previousSibling);
	}
}

/**
 * @param {Node} before
 * @returns {void}
 */
function detach_after_dev(before) {
	while (before.nextSibling) {
		detach_dev(before.nextSibling);
	}
}

/**
 * @param {Node} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @param {boolean} [has_prevent_default]
 * @param {boolean} [has_stop_propagation]
 * @param {boolean} [has_stop_immediate_propagation]
 * @returns {() => void}
 */
function listen_dev(
	node,
	event,
	handler,
	options,
	has_prevent_default,
	has_stop_propagation,
	has_stop_immediate_propagation
) {
	const modifiers =
		options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
	if (has_prevent_default) modifiers.push('preventDefault');
	if (has_stop_propagation) modifiers.push('stopPropagation');
	if (has_stop_immediate_propagation) modifiers.push('stopImmediatePropagation');
	dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
	const dispose = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.listen)(node, event, handler, options);
	return () => {
		dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
		dispose();
	};
}

/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
function attr_dev(node, attribute, value) {
	(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.attr)(node, attribute, value);
	if (value == null) dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
	else dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}

/**
 * @param {Element} node
 * @param {string} property
 * @param {any} [value]
 * @returns {void}
 */
function prop_dev(node, property, value) {
	node[property] = value;
	dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}

/**
 * @param {HTMLElement} node
 * @param {string} property
 * @param {any} [value]
 * @returns {void}
 */
function dataset_dev(node, property, value) {
	node.dataset[property] = value;
	dispatch_dev('SvelteDOMSetDataset', { node, property, value });
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
function set_data_dev(text, data) {
	data = '' + data;
	if (text.data === data) return;
	dispatch_dev('SvelteDOMSetData', { node: text, data });
	text.data = /** @type {string} */ (data);
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
function set_data_contenteditable_dev(text, data) {
	data = '' + data;
	if (text.wholeText === data) return;
	dispatch_dev('SvelteDOMSetData', { node: text, data });
	text.data = /** @type {string} */ (data);
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @param {string} attr_value
 * @returns {void}
 */
function set_data_maybe_contenteditable_dev(text, data, attr_value) {
	if (~_utils_js__WEBPACK_IMPORTED_MODULE_4__.contenteditable_truthy_values.indexOf(attr_value)) {
		set_data_contenteditable_dev(text, data);
	} else {
		set_data_dev(text, data);
	}
}

function ensure_array_like_dev(arg) {
	if (
		typeof arg !== 'string' &&
		!(arg && typeof arg === 'object' && 'length' in arg) &&
		!(typeof Symbol === 'function' && arg && Symbol.iterator in arg)
	) {
		throw new Error('{#each} only works with iterable values.');
	}
	return (0,_each_js__WEBPACK_IMPORTED_MODULE_5__.ensure_array_like)(arg);
}

/**
 * @returns {void} */
function validate_slots(name, slot, keys) {
	for (const slot_key of Object.keys(slot)) {
		if (!~keys.indexOf(slot_key)) {
			console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
		}
	}
}

/**
 * @param {unknown} tag
 * @returns {void}
 */
function validate_dynamic_element(tag) {
	const is_string = typeof tag === 'string';
	if (tag && !is_string) {
		throw new Error('<svelte:element> expects "this" attribute to be a string.');
	}
}

/**
 * @param {undefined | string} tag
 * @returns {void}
 */
function validate_void_dynamic_element(tag) {
	if (tag && (0,_shared_utils_names_js__WEBPACK_IMPORTED_MODULE_2__.is_void)(tag)) {
		console.warn(`<svelte:element this="${tag}"> is self-closing and cannot have content.`);
	}
}

function construct_svelte_component_dev(component, props) {
	const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
	try {
		const instance = new component(props);
		if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
			throw new Error(error_message);
		}
		return instance;
	} catch (err) {
		const { message } = err;
		if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
			throw new Error(error_message);
		} else {
			throw err;
		}
	}
}

/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 *
 * Can be used to create strongly typed Svelte components.
 *
 * #### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponent } from "svelte";
 * export class MyComponent extends SvelteComponent<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 * @template {Record<string, any>} [Slots=any]
 * @extends {SvelteComponent<Props, Events>}
 */
class SvelteComponentDev extends _Component_js__WEBPACK_IMPORTED_MODULE_1__.SvelteComponent {
	/**
	 * For type checking capabilities only.
	 * Does not exist at runtime.
	 * ### DO NOT USE!
	 *
	 * @type {Props}
	 */
	$$prop_def;
	/**
	 * For type checking capabilities only.
	 * Does not exist at runtime.
	 * ### DO NOT USE!
	 *
	 * @type {Events}
	 */
	$$events_def;
	/**
	 * For type checking capabilities only.
	 * Does not exist at runtime.
	 * ### DO NOT USE!
	 *
	 * @type {Slots}
	 */
	$$slot_def;

	/** @param {import('./public.js').ComponentConstructorOptions<Props>} options */
	constructor(options) {
		if (!options || (!options.target && !options.$$inline)) {
			throw new Error("'target' is a required option");
		}
		super();
	}

	/** @returns {void} */
	$destroy() {
		super.$destroy();
		this.$destroy = () => {
			console.warn('Component was already destroyed'); // eslint-disable-line no-console
		};
	}

	/** @returns {void} */
	$capture_state() {}

	/** @returns {void} */
	$inject_state() {}
}
/**
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 * @template {Record<string, any>} [Slots=any]
 * @deprecated Use `SvelteComponent` instead. See PR for more information: https://github.com/sveltejs/svelte/pull/8512
 * @extends {SvelteComponentDev<Props, Events, Slots>}
 */
class SvelteComponentTyped extends SvelteComponentDev {}

/** @returns {() => void} */
function loop_guard(timeout) {
	const start = Date.now();
	return () => {
		if (Date.now() - start > timeout) {
			throw new Error('Infinite loop detected');
		}
	};
}


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/disclose-version/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/disclose-version/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../shared/version.js */ "./node_modules/svelte/src/shared/version.js");


if (typeof window !== 'undefined')
	// @ts-ignore
	(window.__svelte || (window.__svelte = { v: new Set() })).v.add(_shared_version_js__WEBPACK_IMPORTED_MODULE_0__.PUBLIC_VERSION);


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/dom.js":
/*!*********************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/dom.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HtmlTag": () => (/* binding */ HtmlTag),
/* harmony export */   "HtmlTagHydration": () => (/* binding */ HtmlTagHydration),
/* harmony export */   "ResizeObserverSingleton": () => (/* reexport safe */ _ResizeObserverSingleton_js__WEBPACK_IMPORTED_MODULE_1__.ResizeObserverSingleton),
/* harmony export */   "add_iframe_resize_listener": () => (/* binding */ add_iframe_resize_listener),
/* harmony export */   "append": () => (/* binding */ append),
/* harmony export */   "append_empty_stylesheet": () => (/* binding */ append_empty_stylesheet),
/* harmony export */   "append_hydration": () => (/* binding */ append_hydration),
/* harmony export */   "append_styles": () => (/* binding */ append_styles),
/* harmony export */   "attr": () => (/* binding */ attr),
/* harmony export */   "attribute_to_object": () => (/* binding */ attribute_to_object),
/* harmony export */   "children": () => (/* binding */ children),
/* harmony export */   "claim_comment": () => (/* binding */ claim_comment),
/* harmony export */   "claim_element": () => (/* binding */ claim_element),
/* harmony export */   "claim_html_tag": () => (/* binding */ claim_html_tag),
/* harmony export */   "claim_space": () => (/* binding */ claim_space),
/* harmony export */   "claim_svg_element": () => (/* binding */ claim_svg_element),
/* harmony export */   "claim_text": () => (/* binding */ claim_text),
/* harmony export */   "comment": () => (/* binding */ comment),
/* harmony export */   "construct_svelte_component": () => (/* binding */ construct_svelte_component),
/* harmony export */   "custom_event": () => (/* binding */ custom_event),
/* harmony export */   "destroy_each": () => (/* binding */ destroy_each),
/* harmony export */   "detach": () => (/* binding */ detach),
/* harmony export */   "element": () => (/* binding */ element),
/* harmony export */   "element_is": () => (/* binding */ element_is),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "end_hydrating": () => (/* binding */ end_hydrating),
/* harmony export */   "get_binding_group_value": () => (/* binding */ get_binding_group_value),
/* harmony export */   "get_custom_elements_slots": () => (/* binding */ get_custom_elements_slots),
/* harmony export */   "get_root_for_style": () => (/* binding */ get_root_for_style),
/* harmony export */   "get_svelte_dataset": () => (/* binding */ get_svelte_dataset),
/* harmony export */   "head_selector": () => (/* binding */ head_selector),
/* harmony export */   "init_binding_group": () => (/* binding */ init_binding_group),
/* harmony export */   "init_binding_group_dynamic": () => (/* binding */ init_binding_group_dynamic),
/* harmony export */   "insert": () => (/* binding */ insert),
/* harmony export */   "insert_hydration": () => (/* binding */ insert_hydration),
/* harmony export */   "is_crossorigin": () => (/* binding */ is_crossorigin),
/* harmony export */   "listen": () => (/* binding */ listen),
/* harmony export */   "object_without_properties": () => (/* binding */ object_without_properties),
/* harmony export */   "prevent_default": () => (/* binding */ prevent_default),
/* harmony export */   "query_selector_all": () => (/* binding */ query_selector_all),
/* harmony export */   "resize_observer_border_box": () => (/* binding */ resize_observer_border_box),
/* harmony export */   "resize_observer_content_box": () => (/* binding */ resize_observer_content_box),
/* harmony export */   "resize_observer_device_pixel_content_box": () => (/* binding */ resize_observer_device_pixel_content_box),
/* harmony export */   "select_multiple_value": () => (/* binding */ select_multiple_value),
/* harmony export */   "select_option": () => (/* binding */ select_option),
/* harmony export */   "select_options": () => (/* binding */ select_options),
/* harmony export */   "select_value": () => (/* binding */ select_value),
/* harmony export */   "self": () => (/* binding */ self),
/* harmony export */   "set_attributes": () => (/* binding */ set_attributes),
/* harmony export */   "set_custom_element_data": () => (/* binding */ set_custom_element_data),
/* harmony export */   "set_custom_element_data_map": () => (/* binding */ set_custom_element_data_map),
/* harmony export */   "set_data": () => (/* binding */ set_data),
/* harmony export */   "set_data_contenteditable": () => (/* binding */ set_data_contenteditable),
/* harmony export */   "set_data_maybe_contenteditable": () => (/* binding */ set_data_maybe_contenteditable),
/* harmony export */   "set_dynamic_element_data": () => (/* binding */ set_dynamic_element_data),
/* harmony export */   "set_input_type": () => (/* binding */ set_input_type),
/* harmony export */   "set_input_value": () => (/* binding */ set_input_value),
/* harmony export */   "set_style": () => (/* binding */ set_style),
/* harmony export */   "set_svg_attributes": () => (/* binding */ set_svg_attributes),
/* harmony export */   "space": () => (/* binding */ space),
/* harmony export */   "start_hydrating": () => (/* binding */ start_hydrating),
/* harmony export */   "stop_immediate_propagation": () => (/* binding */ stop_immediate_propagation),
/* harmony export */   "stop_propagation": () => (/* binding */ stop_propagation),
/* harmony export */   "svg_element": () => (/* binding */ svg_element),
/* harmony export */   "text": () => (/* binding */ text),
/* harmony export */   "time_ranges_to_array": () => (/* binding */ time_ranges_to_array),
/* harmony export */   "to_number": () => (/* binding */ to_number),
/* harmony export */   "toggle_class": () => (/* binding */ toggle_class),
/* harmony export */   "trusted": () => (/* binding */ trusted),
/* harmony export */   "xlink_attr": () => (/* binding */ xlink_attr)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/runtime/internal/utils.js");
/* harmony import */ var _ResizeObserverSingleton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResizeObserverSingleton.js */ "./node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js");




// Track which nodes are claimed during hydration. Unclaimed nodes can then be removed from the DOM
// at the end of hydration without touching the remaining nodes.
let is_hydrating = false;

/**
 * @returns {void}
 */
function start_hydrating() {
	is_hydrating = true;
}

/**
 * @returns {void}
 */
function end_hydrating() {
	is_hydrating = false;
}

/**
 * @param {number} low
 * @param {number} high
 * @param {(index: number) => number} key
 * @param {number} value
 * @returns {number}
 */
function upper_bound(low, high, key, value) {
	// Return first index of value larger than input value in the range [low, high)
	while (low < high) {
		const mid = low + ((high - low) >> 1);
		if (key(mid) <= value) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}
	return low;
}

/**
 * @param {NodeEx} target
 * @returns {void}
 */
function init_hydrate(target) {
	if (target.hydrate_init) return;
	target.hydrate_init = true;
	// We know that all children have claim_order values since the unclaimed have been detached if target is not <head>

	let children = /** @type {ArrayLike<NodeEx2>} */ (target.childNodes);
	// If target is <head>, there may be children without claim_order
	if (target.nodeName === 'HEAD') {
		const my_children = [];
		for (let i = 0; i < children.length; i++) {
			const node = children[i];
			if (node.claim_order !== undefined) {
				my_children.push(node);
			}
		}
		children = my_children;
	}
	/*
	 * Reorder claimed children optimally.
	 * We can reorder claimed children optimally by finding the longest subsequence of
	 * nodes that are already claimed in order and only moving the rest. The longest
	 * subsequence of nodes that are claimed in order can be found by
	 * computing the longest increasing subsequence of .claim_order values.
	 *
	 * This algorithm is optimal in generating the least amount of reorder operations
	 * possible.
	 *
	 * Proof:
	 * We know that, given a set of reordering operations, the nodes that do not move
	 * always form an increasing subsequence, since they do not move among each other
	 * meaning that they must be already ordered among each other. Thus, the maximal
	 * set of nodes that do not move form a longest increasing subsequence.
	 */
	// Compute longest increasing subsequence
	// m: subsequence length j => index k of smallest value that ends an increasing subsequence of length j
	const m = new Int32Array(children.length + 1);
	// Predecessor indices + 1
	const p = new Int32Array(children.length);
	m[0] = -1;
	let longest = 0;
	for (let i = 0; i < children.length; i++) {
		const current = children[i].claim_order;
		// Find the largest subsequence length such that it ends in a value less than our current value
		// upper_bound returns first greater value, so we subtract one
		// with fast path for when we are on the current longest subsequence
		const seq_len =
			(longest > 0 && children[m[longest]].claim_order <= current
				? longest + 1
				: upper_bound(1, longest, (idx) => children[m[idx]].claim_order, current)) - 1;
		p[i] = m[seq_len] + 1;
		const new_len = seq_len + 1;
		// We can guarantee that current is the smallest value. Otherwise, we would have generated a longer sequence.
		m[new_len] = i;
		longest = Math.max(new_len, longest);
	}
	// The longest increasing subsequence of nodes (initially reversed)

	/**
	 * @type {NodeEx2[]}
	 */
	const lis = [];
	// The rest of the nodes, nodes that will be moved

	/**
	 * @type {NodeEx2[]}
	 */
	const to_move = [];
	let last = children.length - 1;
	for (let cur = m[longest] + 1; cur != 0; cur = p[cur - 1]) {
		lis.push(children[cur - 1]);
		for (; last >= cur; last--) {
			to_move.push(children[last]);
		}
		last--;
	}
	for (; last >= 0; last--) {
		to_move.push(children[last]);
	}
	lis.reverse();
	// We sort the nodes being moved to guarantee that their insertion order matches the claim order
	to_move.sort((a, b) => a.claim_order - b.claim_order);
	// Finally, we move the nodes
	for (let i = 0, j = 0; i < to_move.length; i++) {
		while (j < lis.length && to_move[i].claim_order >= lis[j].claim_order) {
			j++;
		}
		const anchor = j < lis.length ? lis[j] : null;
		target.insertBefore(to_move[i], anchor);
	}
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append(target, node) {
	target.appendChild(node);
}

/**
 * @param {Node} target
 * @param {string} style_sheet_id
 * @param {string} styles
 * @returns {void}
 */
function append_styles(target, style_sheet_id, styles) {
	const append_styles_to = get_root_for_style(target);
	if (!append_styles_to.getElementById(style_sheet_id)) {
		const style = element('style');
		style.id = style_sheet_id;
		style.textContent = styles;
		append_stylesheet(append_styles_to, style);
	}
}

/**
 * @param {Node} node
 * @returns {ShadowRoot | Document}
 */
function get_root_for_style(node) {
	if (!node) return document;
	const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
	if (root && /** @type {ShadowRoot} */ (root).host) {
		return /** @type {ShadowRoot} */ (root);
	}
	return node.ownerDocument;
}

/**
 * @param {Node} node
 * @returns {CSSStyleSheet}
 */
function append_empty_stylesheet(node) {
	const style_element = element('style');
	// For transitions to work without 'style-src: unsafe-inline' Content Security Policy,
	// these empty tags need to be allowed with a hash as a workaround until we move to the Web Animations API.
	// Using the hash for the empty string (for an empty tag) works in all browsers except Safari.
	// So as a workaround for the workaround, when we append empty style tags we set their content to /* empty */.
	// The hash 'sha256-9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=' will then work even in Safari.
	style_element.textContent = '/* empty */';
	append_stylesheet(get_root_for_style(node), style_element);
	return style_element.sheet;
}

/**
 * @param {ShadowRoot | Document} node
 * @param {HTMLStyleElement} style
 * @returns {CSSStyleSheet}
 */
function append_stylesheet(node, style) {
	append(/** @type {Document} */ (node).head || node, style);
	return style.sheet;
}

/**
 * @param {NodeEx} target
 * @param {NodeEx} node
 * @returns {void}
 */
function append_hydration(target, node) {
	if (is_hydrating) {
		init_hydrate(target);
		if (
			target.actual_end_child === undefined ||
			(target.actual_end_child !== null && target.actual_end_child.parentNode !== target)
		) {
			target.actual_end_child = target.firstChild;
		}
		// Skip nodes of undefined ordering
		while (target.actual_end_child !== null && target.actual_end_child.claim_order === undefined) {
			target.actual_end_child = target.actual_end_child.nextSibling;
		}
		if (node !== target.actual_end_child) {
			// We only insert if the ordering of this node should be modified or the parent node is not target
			if (node.claim_order !== undefined || node.parentNode !== target) {
				target.insertBefore(node, target.actual_end_child);
			}
		} else {
			target.actual_end_child = node.nextSibling;
		}
	} else if (node.parentNode !== target || node.nextSibling !== null) {
		target.appendChild(node);
	}
}

/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert(target, node, anchor) {
	target.insertBefore(node, anchor || null);
}

/**
 * @param {NodeEx} target
 * @param {NodeEx} node
 * @param {NodeEx} [anchor]
 * @returns {void}
 */
function insert_hydration(target, node, anchor) {
	if (is_hydrating && !anchor) {
		append_hydration(target, node);
	} else if (node.parentNode !== target || node.nextSibling != anchor) {
		target.insertBefore(node, anchor || null);
	}
}

/**
 * @param {Node} node
 * @returns {void}
 */
function detach(node) {
	if (node.parentNode) {
		node.parentNode.removeChild(node);
	}
}

/**
 * @returns {void} */
function destroy_each(iterations, detaching) {
	for (let i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d(detaching);
	}
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} name
 * @returns {HTMLElementTagNameMap[K]}
 */
function element(name) {
	return document.createElement(name);
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} name
 * @param {string} is
 * @returns {HTMLElementTagNameMap[K]}
 */
function element_is(name, is) {
	return document.createElement(name, { is });
}

/**
 * @template T
 * @template {keyof T} K
 * @param {T} obj
 * @param {K[]} exclude
 * @returns {Pick<T, Exclude<keyof T, K>>}
 */
function object_without_properties(obj, exclude) {
	const target = /** @type {Pick<T, Exclude<keyof T, K>>} */ ({});
	for (const k in obj) {
		if (
			(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.has_prop)(obj, k) &&
			// @ts-ignore
			exclude.indexOf(k) === -1
		) {
			// @ts-ignore
			target[k] = obj[k];
		}
	}
	return target;
}

/**
 * @template {keyof SVGElementTagNameMap} K
 * @param {K} name
 * @returns {SVGElement}
 */
function svg_element(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

/**
 * @param {string} data
 * @returns {Text}
 */
function text(data) {
	return document.createTextNode(data);
}

/**
 * @returns {Text} */
function space() {
	return text(' ');
}

/**
 * @returns {Text} */
function empty() {
	return text('');
}

/**
 * @param {string} content
 * @returns {Comment}
 */
function comment(content) {
	return document.createComment(content);
}

/**
 * @param {EventTarget} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @returns {() => void}
 */
function listen(node, event, handler, options) {
	node.addEventListener(event, handler, options);
	return () => node.removeEventListener(event, handler, options);
}

/**
 * @returns {(event: any) => any} */
function prevent_default(fn) {
	return function (event) {
		event.preventDefault();
		// @ts-ignore
		return fn.call(this, event);
	};
}

/**
 * @returns {(event: any) => any} */
function stop_propagation(fn) {
	return function (event) {
		event.stopPropagation();
		// @ts-ignore
		return fn.call(this, event);
	};
}

/**
 * @returns {(event: any) => any} */
function stop_immediate_propagation(fn) {
	return function (event) {
		event.stopImmediatePropagation();
		// @ts-ignore
		return fn.call(this, event);
	};
}

/**
 * @returns {(event: any) => void} */
function self(fn) {
	return function (event) {
		// @ts-ignore
		if (event.target === this) fn.call(this, event);
	};
}

/**
 * @returns {(event: any) => void} */
function trusted(fn) {
	return function (event) {
		// @ts-ignore
		if (event.isTrusted) fn.call(this, event);
	};
}

/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
function attr(node, attribute, value) {
	if (value == null) node.removeAttribute(attribute);
	else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
/**
 * List of attributes that should always be set through the attr method,
 * because updating them through the property setter doesn't work reliably.
 * In the example of `width`/`height`, the problem is that the setter only
 * accepts numeric values, but the attribute can also be set to a string like `50%`.
 * If this list becomes too big, rethink this approach.
 */
const always_set_through_set_attribute = ['width', 'height'];

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {{ [x: string]: string }} attributes
 * @returns {void}
 */
function set_attributes(node, attributes) {
	// @ts-ignore
	const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
	for (const key in attributes) {
		if (attributes[key] == null) {
			node.removeAttribute(key);
		} else if (key === 'style') {
			node.style.cssText = attributes[key];
		} else if (key === '__value') {
			/** @type {any} */ (node).value = node[key] = attributes[key];
		} else if (
			descriptors[key] &&
			descriptors[key].set &&
			always_set_through_set_attribute.indexOf(key) === -1
		) {
			node[key] = attributes[key];
		} else {
			attr(node, key, attributes[key]);
		}
	}
}

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {{ [x: string]: string }} attributes
 * @returns {void}
 */
function set_svg_attributes(node, attributes) {
	for (const key in attributes) {
		attr(node, key, attributes[key]);
	}
}

/**
 * @param {Record<string, unknown>} data_map
 * @returns {void}
 */
function set_custom_element_data_map(node, data_map) {
	Object.keys(data_map).forEach((key) => {
		set_custom_element_data(node, key, data_map[key]);
	});
}

/**
 * @returns {void} */
function set_custom_element_data(node, prop, value) {
	if (prop in node) {
		node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
	} else {
		attr(node, prop, value);
	}
}

/**
 * @param {string} tag
 */
function set_dynamic_element_data(tag) {
	return /-/.test(tag) ? set_custom_element_data_map : set_attributes;
}

/**
 * @returns {void}
 */
function xlink_attr(node, attribute, value) {
	node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}

/**
 * @param {HTMLElement} node
 * @returns {string}
 */
function get_svelte_dataset(node) {
	return node.dataset.svelteH;
}

/**
 * @returns {unknown[]} */
function get_binding_group_value(group, __value, checked) {
	const value = new Set();
	for (let i = 0; i < group.length; i += 1) {
		if (group[i].checked) value.add(group[i].__value);
	}
	if (!checked) {
		value.delete(__value);
	}
	return Array.from(value);
}

/**
 * @param {HTMLInputElement[]} group
 * @returns {{ p(...inputs: HTMLInputElement[]): void; r(): void; }}
 */
function init_binding_group(group) {
	/**
	 * @type {HTMLInputElement[]} */
	let _inputs;
	return {
		/* push */ p(...inputs) {
			_inputs = inputs;
			_inputs.forEach((input) => group.push(input));
		},
		/* remove */ r() {
			_inputs.forEach((input) => group.splice(group.indexOf(input), 1));
		}
	};
}

/**
 * @param {number[]} indexes
 * @returns {{ u(new_indexes: number[]): void; p(...inputs: HTMLInputElement[]): void; r: () => void; }}
 */
function init_binding_group_dynamic(group, indexes) {
	/**
	 * @type {HTMLInputElement[]} */
	let _group = get_binding_group(group);

	/**
	 * @type {HTMLInputElement[]} */
	let _inputs;

	function get_binding_group(group) {
		for (let i = 0; i < indexes.length; i++) {
			group = group[indexes[i]] = group[indexes[i]] || [];
		}
		return group;
	}

	/**
	 * @returns {void} */
	function push() {
		_inputs.forEach((input) => _group.push(input));
	}

	/**
	 * @returns {void} */
	function remove() {
		_inputs.forEach((input) => _group.splice(_group.indexOf(input), 1));
	}
	return {
		/* update */ u(new_indexes) {
			indexes = new_indexes;
			const new_group = get_binding_group(group);
			if (new_group !== _group) {
				remove();
				_group = new_group;
				push();
			}
		},
		/* push */ p(...inputs) {
			_inputs = inputs;
			push();
		},
		/* remove */ r: remove
	};
}

/** @returns {number} */
function to_number(value) {
	return value === '' ? null : +value;
}

/** @returns {any[]} */
function time_ranges_to_array(ranges) {
	const array = [];
	for (let i = 0; i < ranges.length; i += 1) {
		array.push({ start: ranges.start(i), end: ranges.end(i) });
	}
	return array;
}

/**
 * @param {Element} element
 * @returns {ChildNode[]}
 */
function children(element) {
	return Array.from(element.childNodes);
}

/**
 * @param {ChildNodeArray} nodes
 * @returns {void}
 */
function init_claim_info(nodes) {
	if (nodes.claim_info === undefined) {
		nodes.claim_info = { last_index: 0, total_claimed: 0 };
	}
}

/**
 * @template {ChildNodeEx} R
 * @param {ChildNodeArray} nodes
 * @param {(node: ChildNodeEx) => node is R} predicate
 * @param {(node: ChildNodeEx) => ChildNodeEx | undefined} process_node
 * @param {() => R} create_node
 * @param {boolean} dont_update_last_index
 * @returns {R}
 */
function claim_node(nodes, predicate, process_node, create_node, dont_update_last_index = false) {
	// Try to find nodes in an order such that we lengthen the longest increasing subsequence
	init_claim_info(nodes);
	const result_node = (() => {
		// We first try to find an element after the previous one
		for (let i = nodes.claim_info.last_index; i < nodes.length; i++) {
			const node = nodes[i];
			if (predicate(node)) {
				const replacement = process_node(node);
				if (replacement === undefined) {
					nodes.splice(i, 1);
				} else {
					nodes[i] = replacement;
				}
				if (!dont_update_last_index) {
					nodes.claim_info.last_index = i;
				}
				return node;
			}
		}
		// Otherwise, we try to find one before
		// We iterate in reverse so that we don't go too far back
		for (let i = nodes.claim_info.last_index - 1; i >= 0; i--) {
			const node = nodes[i];
			if (predicate(node)) {
				const replacement = process_node(node);
				if (replacement === undefined) {
					nodes.splice(i, 1);
				} else {
					nodes[i] = replacement;
				}
				if (!dont_update_last_index) {
					nodes.claim_info.last_index = i;
				} else if (replacement === undefined) {
					// Since we spliced before the last_index, we decrease it
					nodes.claim_info.last_index--;
				}
				return node;
			}
		}
		// If we can't find any matching node, we create a new one
		return create_node();
	})();
	result_node.claim_order = nodes.claim_info.total_claimed;
	nodes.claim_info.total_claimed += 1;
	return result_node;
}

/**
 * @param {ChildNodeArray} nodes
 * @param {string} name
 * @param {{ [key: string]: boolean }} attributes
 * @param {(name: string) => Element | SVGElement} create_element
 * @returns {Element | SVGElement}
 */
function claim_element_base(nodes, name, attributes, create_element) {
	return claim_node(
		nodes,
		/** @returns {node is Element | SVGElement} */
		(node) => node.nodeName === name,
		/** @param {Element} node */
		(node) => {
			const remove = [];
			for (let j = 0; j < node.attributes.length; j++) {
				const attribute = node.attributes[j];
				if (!attributes[attribute.name]) {
					remove.push(attribute.name);
				}
			}
			remove.forEach((v) => node.removeAttribute(v));
			return undefined;
		},
		() => create_element(name)
	);
}

/**
 * @param {ChildNodeArray} nodes
 * @param {string} name
 * @param {{ [key: string]: boolean }} attributes
 * @returns {Element | SVGElement}
 */
function claim_element(nodes, name, attributes) {
	return claim_element_base(nodes, name, attributes, element);
}

/**
 * @param {ChildNodeArray} nodes
 * @param {string} name
 * @param {{ [key: string]: boolean }} attributes
 * @returns {Element | SVGElement}
 */
function claim_svg_element(nodes, name, attributes) {
	return claim_element_base(nodes, name, attributes, svg_element);
}

/**
 * @param {ChildNodeArray} nodes
 * @returns {Text}
 */
function claim_text(nodes, data) {
	return claim_node(
		nodes,
		/** @returns {node is Text} */
		(node) => node.nodeType === 3,
		/** @param {Text} node */
		(node) => {
			const data_str = '' + data;
			if (node.data.startsWith(data_str)) {
				if (node.data.length !== data_str.length) {
					return node.splitText(data_str.length);
				}
			} else {
				node.data = data_str;
			}
		},
		() => text(data),
		true // Text nodes should not update last index since it is likely not worth it to eliminate an increasing subsequence of actual elements
	);
}

/**
 * @returns {Text} */
function claim_space(nodes) {
	return claim_text(nodes, ' ');
}

/**
 * @param {ChildNodeArray} nodes
 * @returns {Comment}
 */
function claim_comment(nodes, data) {
	return claim_node(
		nodes,
		/** @returns {node is Comment} */
		(node) => node.nodeType === 8,
		/** @param {Comment} node */
		(node) => {
			node.data = '' + data;
			return undefined;
		},
		() => comment(data),
		true
	);
}

function get_comment_idx(nodes, text, start) {
	for (let i = start; i < nodes.length; i += 1) {
		const node = nodes[i];
		if (node.nodeType === 8 /* comment node */ && node.textContent.trim() === text) {
			return i;
		}
	}
	return -1;
}

/**
 * @param {boolean} is_svg
 * @returns {HtmlTagHydration}
 */
function claim_html_tag(nodes, is_svg) {
	// find html opening tag
	const start_index = get_comment_idx(nodes, 'HTML_TAG_START', 0);
	const end_index = get_comment_idx(nodes, 'HTML_TAG_END', start_index + 1);
	if (start_index === -1 || end_index === -1) {
		return new HtmlTagHydration(is_svg);
	}

	init_claim_info(nodes);
	const html_tag_nodes = nodes.splice(start_index, end_index - start_index + 1);
	detach(html_tag_nodes[0]);
	detach(html_tag_nodes[html_tag_nodes.length - 1]);
	const claimed_nodes = html_tag_nodes.slice(1, html_tag_nodes.length - 1);
	for (const n of claimed_nodes) {
		n.claim_order = nodes.claim_info.total_claimed;
		nodes.claim_info.total_claimed += 1;
	}
	return new HtmlTagHydration(is_svg, claimed_nodes);
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
function set_data(text, data) {
	data = '' + data;
	if (text.data === data) return;
	text.data = /** @type {string} */ (data);
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
function set_data_contenteditable(text, data) {
	data = '' + data;
	if (text.wholeText === data) return;
	text.data = /** @type {string} */ (data);
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @param {string} attr_value
 * @returns {void}
 */
function set_data_maybe_contenteditable(text, data, attr_value) {
	if (~_utils_js__WEBPACK_IMPORTED_MODULE_0__.contenteditable_truthy_values.indexOf(attr_value)) {
		set_data_contenteditable(text, data);
	} else {
		set_data(text, data);
	}
}

/**
 * @returns {void} */
function set_input_value(input, value) {
	input.value = value == null ? '' : value;
}

/**
 * @returns {void} */
function set_input_type(input, type) {
	try {
		input.type = type;
	} catch (e) {
		// do nothing
	}
}

/**
 * @returns {void} */
function set_style(node, key, value, important) {
	if (value == null) {
		node.style.removeProperty(key);
	} else {
		node.style.setProperty(key, value, important ? 'important' : '');
	}
}

/**
 * @returns {void} */
function select_option(select, value, mounting) {
	for (let i = 0; i < select.options.length; i += 1) {
		const option = select.options[i];
		if (option.__value === value) {
			option.selected = true;
			return;
		}
	}
	if (!mounting || value !== undefined) {
		select.selectedIndex = -1; // no option should be selected
	}
}

/**
 * @returns {void} */
function select_options(select, value) {
	for (let i = 0; i < select.options.length; i += 1) {
		const option = select.options[i];
		option.selected = ~value.indexOf(option.__value);
	}
}

function select_value(select) {
	const selected_option = select.querySelector(':checked');
	return selected_option && selected_option.__value;
}

function select_multiple_value(select) {
	return [].map.call(select.querySelectorAll(':checked'), (option) => option.__value);
}
// unfortunately this can't be a constant as that wouldn't be tree-shakeable
// so we cache the result instead

/**
 * @type {boolean} */
let crossorigin;

/**
 * @returns {boolean} */
function is_crossorigin() {
	if (crossorigin === undefined) {
		crossorigin = false;
		try {
			if (typeof window !== 'undefined' && window.parent) {
				void window.parent.document;
			}
		} catch (error) {
			crossorigin = true;
		}
	}
	return crossorigin;
}

/**
 * @param {HTMLElement} node
 * @param {() => void} fn
 * @returns {() => void}
 */
function add_iframe_resize_listener(node, fn) {
	const computed_style = getComputedStyle(node);
	if (computed_style.position === 'static') {
		node.style.position = 'relative';
	}
	const iframe = element('iframe');
	iframe.setAttribute(
		'style',
		'display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; ' +
			'overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;'
	);
	iframe.setAttribute('aria-hidden', 'true');
	iframe.tabIndex = -1;
	const crossorigin = is_crossorigin();

	/**
	 * @type {() => void}
	 */
	let unsubscribe;
	if (crossorigin) {
		iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}</script>";
		unsubscribe = listen(
			window,
			'message',
			/** @param {MessageEvent} event */ (event) => {
				if (event.source === iframe.contentWindow) fn();
			}
		);
	} else {
		iframe.src = 'about:blank';
		iframe.onload = () => {
			unsubscribe = listen(iframe.contentWindow, 'resize', fn);
			// make sure an initial resize event is fired _after_ the iframe is loaded (which is asynchronous)
			// see https://github.com/sveltejs/svelte/issues/4233
			fn();
		};
	}
	append(node, iframe);
	return () => {
		if (crossorigin) {
			unsubscribe();
		} else if (unsubscribe && iframe.contentWindow) {
			unsubscribe();
		}
		detach(iframe);
	};
}
const resize_observer_content_box = /* @__PURE__ */ new _ResizeObserverSingleton_js__WEBPACK_IMPORTED_MODULE_1__.ResizeObserverSingleton({
	box: 'content-box'
});
const resize_observer_border_box = /* @__PURE__ */ new _ResizeObserverSingleton_js__WEBPACK_IMPORTED_MODULE_1__.ResizeObserverSingleton({
	box: 'border-box'
});
const resize_observer_device_pixel_content_box = /* @__PURE__ */ new _ResizeObserverSingleton_js__WEBPACK_IMPORTED_MODULE_1__.ResizeObserverSingleton(
	{ box: 'device-pixel-content-box' }
);


/**
 * @returns {void} */
function toggle_class(element, name, toggle) {
	// The `!!` is required because an `undefined` flag means flipping the current state.
	element.classList.toggle(name, !!toggle);
}

/**
 * @template T
 * @param {string} type
 * @param {T} [detail]
 * @param {{ bubbles?: boolean, cancelable?: boolean }} [options]
 * @returns {CustomEvent<T>}
 */
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	return new CustomEvent(type, { detail, bubbles, cancelable });
}

/**
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns {ChildNodeArray}
 */
function query_selector_all(selector, parent = document.body) {
	return Array.from(parent.querySelectorAll(selector));
}

/**
 * @param {string} nodeId
 * @param {HTMLElement} head
 * @returns {any[]}
 */
function head_selector(nodeId, head) {
	const result = [];
	let started = 0;
	for (const node of head.childNodes) {
		if (node.nodeType === 8 /* comment node */) {
			const comment = node.textContent.trim();
			if (comment === `HEAD_${nodeId}_END`) {
				started -= 1;
				result.push(node);
			} else if (comment === `HEAD_${nodeId}_START`) {
				started += 1;
				result.push(node);
			}
		} else if (started > 0) {
			result.push(node);
		}
	}
	return result;
}
/** */
class HtmlTag {
	/**
	 * @private
	 * @default false
	 */
	is_svg = false;
	/** parent for creating node */
	e = undefined;
	/** html tag nodes */
	n = undefined;
	/** target */
	t = undefined;
	/** anchor */
	a = undefined;
	constructor(is_svg = false) {
		this.is_svg = is_svg;
		this.e = this.n = null;
	}

	/**
	 * @param {string} html
	 * @returns {void}
	 */
	c(html) {
		this.h(html);
	}

	/**
	 * @param {string} html
	 * @param {HTMLElement | SVGElement} target
	 * @param {HTMLElement | SVGElement} anchor
	 * @returns {void}
	 */
	m(html, target, anchor = null) {
		if (!this.e) {
			if (this.is_svg)
				this.e = svg_element(/** @type {keyof SVGElementTagNameMap} */ (target.nodeName));
			/** #7364  target for <template> may be provided as #document-fragment(11) */ else
				this.e = element(
					/** @type {keyof HTMLElementTagNameMap} */ (
						target.nodeType === 11 ? 'TEMPLATE' : target.nodeName
					)
				);
			this.t =
				target.tagName !== 'TEMPLATE'
					? target
					: /** @type {HTMLTemplateElement} */ (target).content;
			this.c(html);
		}
		this.i(anchor);
	}

	/**
	 * @param {string} html
	 * @returns {void}
	 */
	h(html) {
		this.e.innerHTML = html;
		this.n = Array.from(
			this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes
		);
	}

	/**
	 * @returns {void} */
	i(anchor) {
		for (let i = 0; i < this.n.length; i += 1) {
			insert(this.t, this.n[i], anchor);
		}
	}

	/**
	 * @param {string} html
	 * @returns {void}
	 */
	p(html) {
		this.d();
		this.h(html);
		this.i(this.a);
	}

	/**
	 * @returns {void} */
	d() {
		this.n.forEach(detach);
	}
}

class HtmlTagHydration extends HtmlTag {
	/** @type {Element[]} hydration claimed nodes */
	l = undefined;

	constructor(is_svg = false, claimed_nodes) {
		super(is_svg);
		this.e = this.n = null;
		this.l = claimed_nodes;
	}

	/**
	 * @param {string} html
	 * @returns {void}
	 */
	c(html) {
		if (this.l) {
			this.n = this.l;
		} else {
			super.c(html);
		}
	}

	/**
	 * @returns {void} */
	i(anchor) {
		for (let i = 0; i < this.n.length; i += 1) {
			insert_hydration(this.t, this.n[i], anchor);
		}
	}
}

/**
 * @param {NamedNodeMap} attributes
 * @returns {{}}
 */
function attribute_to_object(attributes) {
	const result = {};
	for (const attribute of attributes) {
		result[attribute.name] = attribute.value;
	}
	return result;
}

/**
 * @param {HTMLElement} element
 * @returns {{}}
 */
function get_custom_elements_slots(element) {
	const result = {};
	element.childNodes.forEach(
		/** @param {Element} node */ (node) => {
			result[node.slot || 'default'] = true;
		}
	);
	return result;
}

function construct_svelte_component(component, props) {
	return new component(props);
}

/**
 * @typedef {Node & {
 * 	claim_order?: number;
 * 	hydrate_init?: true;
 * 	actual_end_child?: NodeEx;
 * 	childNodes: NodeListOf<NodeEx>;
 * }} NodeEx
 */

/** @typedef {ChildNode & NodeEx} ChildNodeEx */

/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

/**
 * @typedef {ChildNodeEx[] & {
 * 	claim_info?: {
 * 		last_index: number;
 * 		total_claimed: number;
 * 	};
 * }} ChildNodeArray
 */


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/each.js":
/*!**********************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/each.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "destroy_block": () => (/* binding */ destroy_block),
/* harmony export */   "ensure_array_like": () => (/* binding */ ensure_array_like),
/* harmony export */   "fix_and_destroy_block": () => (/* binding */ fix_and_destroy_block),
/* harmony export */   "fix_and_outro_and_destroy_block": () => (/* binding */ fix_and_outro_and_destroy_block),
/* harmony export */   "outro_and_destroy_block": () => (/* binding */ outro_and_destroy_block),
/* harmony export */   "update_keyed_each": () => (/* binding */ update_keyed_each),
/* harmony export */   "validate_each_keys": () => (/* binding */ validate_each_keys)
/* harmony export */ });
/* harmony import */ var _transitions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transitions.js */ "./node_modules/svelte/src/runtime/internal/transitions.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/runtime/internal/utils.js");



// general each functions:

function ensure_array_like(array_like_or_iterator) {
	return array_like_or_iterator?.length !== undefined
		? array_like_or_iterator
		: Array.from(array_like_or_iterator);
}

// keyed each functions:

/** @returns {void} */
function destroy_block(block, lookup) {
	block.d(1);
	lookup.delete(block.key);
}

/** @returns {void} */
function outro_and_destroy_block(block, lookup) {
	(0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.transition_out)(block, 1, 1, () => {
		lookup.delete(block.key);
	});
}

/** @returns {void} */
function fix_and_destroy_block(block, lookup) {
	block.f();
	destroy_block(block, lookup);
}

/** @returns {void} */
function fix_and_outro_and_destroy_block(block, lookup) {
	block.f();
	outro_and_destroy_block(block, lookup);
}

/** @returns {any[]} */
function update_keyed_each(
	old_blocks,
	dirty,
	get_key,
	dynamic,
	ctx,
	list,
	lookup,
	node,
	destroy,
	create_each_block,
	next,
	get_context
) {
	let o = old_blocks.length;
	let n = list.length;
	let i = o;
	const old_indexes = {};
	while (i--) old_indexes[old_blocks[i].key] = i;
	const new_blocks = [];
	const new_lookup = new Map();
	const deltas = new Map();
	const updates = [];
	i = n;
	while (i--) {
		const child_ctx = get_context(ctx, list, i);
		const key = get_key(child_ctx);
		let block = lookup.get(key);
		if (!block) {
			block = create_each_block(key, child_ctx);
			block.c();
		} else if (dynamic) {
			// defer updates until all the DOM shuffling is done
			updates.push(() => block.p(child_ctx, dirty));
		}
		new_lookup.set(key, (new_blocks[i] = block));
		if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
	}
	const will_move = new Set();
	const did_move = new Set();
	/** @returns {void} */
	function insert(block) {
		(0,_transitions_js__WEBPACK_IMPORTED_MODULE_0__.transition_in)(block, 1);
		block.m(node, next);
		lookup.set(block.key, block);
		next = block.first;
		n--;
	}
	while (o && n) {
		const new_block = new_blocks[n - 1];
		const old_block = old_blocks[o - 1];
		const new_key = new_block.key;
		const old_key = old_block.key;
		if (new_block === old_block) {
			// do nothing
			next = new_block.first;
			o--;
			n--;
		} else if (!new_lookup.has(old_key)) {
			// remove old block
			destroy(old_block, lookup);
			o--;
		} else if (!lookup.has(new_key) || will_move.has(new_key)) {
			insert(new_block);
		} else if (did_move.has(old_key)) {
			o--;
		} else if (deltas.get(new_key) > deltas.get(old_key)) {
			did_move.add(new_key);
			insert(new_block);
		} else {
			will_move.add(old_key);
			o--;
		}
	}
	while (o--) {
		const old_block = old_blocks[o];
		if (!new_lookup.has(old_block.key)) destroy(old_block, lookup);
	}
	while (n) insert(new_blocks[n - 1]);
	(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.run_all)(updates);
	return new_blocks;
}

/** @returns {void} */
function validate_each_keys(ctx, list, get_context, get_key) {
	const keys = new Map();
	for (let i = 0; i < list.length; i++) {
		const key = get_key(get_context(ctx, list, i));
		if (keys.has(key)) {
			let value = '';
			try {
				value = `with value '${String(key)}' `;
			} catch (e) {
				// can't stringify
			}
			throw new Error(
				`Cannot have duplicate keys in a keyed each: Keys at index ${keys.get(
					key
				)} and ${i} ${value}are duplicates`
			);
		}
		keys.set(key, i);
	}
}


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/environment.js":
/*!*****************************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/environment.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "is_client": () => (/* binding */ is_client),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "raf": () => (/* binding */ raf),
/* harmony export */   "set_now": () => (/* binding */ set_now),
/* harmony export */   "set_raf": () => (/* binding */ set_raf)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/runtime/internal/utils.js");


const is_client = typeof window !== 'undefined';

/** @type {() => number} */
let now = is_client ? () => window.performance.now() : () => Date.now();

let raf = is_client ? (cb) => requestAnimationFrame(cb) : _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop;

// used internally for testing
/** @returns {void} */
function set_now(fn) {
	now = fn;
}

/** @returns {void} */
function set_raf(fn) {
	raf = fn;
}


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/globals.js":
/*!*************************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/globals.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "globals": () => (/* binding */ globals)
/* harmony export */ });
/** @type {typeof globalThis} */
const globals =
	typeof window !== 'undefined'
		? window
		: typeof globalThis !== 'undefined'
		? globalThis
		: // @ts-ignore Node typings have this
		  global;


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HtmlTag": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.HtmlTag),
/* harmony export */   "HtmlTagHydration": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.HtmlTagHydration),
/* harmony export */   "ResizeObserverSingleton": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.ResizeObserverSingleton),
/* harmony export */   "SvelteComponent": () => (/* reexport safe */ _Component_js__WEBPACK_IMPORTED_MODULE_13__.SvelteComponent),
/* harmony export */   "SvelteComponentDev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.SvelteComponentDev),
/* harmony export */   "SvelteComponentTyped": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.SvelteComponentTyped),
/* harmony export */   "SvelteElement": () => (/* reexport safe */ _Component_js__WEBPACK_IMPORTED_MODULE_13__.SvelteElement),
/* harmony export */   "action_destroyer": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.action_destroyer),
/* harmony export */   "add_attribute": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.add_attribute),
/* harmony export */   "add_classes": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.add_classes),
/* harmony export */   "add_flush_callback": () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_8__.add_flush_callback),
/* harmony export */   "add_iframe_resize_listener": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.add_iframe_resize_listener),
/* harmony export */   "add_location": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.add_location),
/* harmony export */   "add_render_callback": () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_8__.add_render_callback),
/* harmony export */   "add_styles": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.add_styles),
/* harmony export */   "add_transform": () => (/* reexport safe */ _animations_js__WEBPACK_IMPORTED_MODULE_0__.add_transform),
/* harmony export */   "afterUpdate": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.afterUpdate),
/* harmony export */   "append": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.append),
/* harmony export */   "append_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.append_dev),
/* harmony export */   "append_empty_stylesheet": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.append_empty_stylesheet),
/* harmony export */   "append_hydration": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.append_hydration),
/* harmony export */   "append_hydration_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.append_hydration_dev),
/* harmony export */   "append_styles": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.append_styles),
/* harmony export */   "assign": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.assign),
/* harmony export */   "attr": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.attr),
/* harmony export */   "attr_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.attr_dev),
/* harmony export */   "attribute_to_object": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.attribute_to_object),
/* harmony export */   "beforeUpdate": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.beforeUpdate),
/* harmony export */   "bind": () => (/* reexport safe */ _Component_js__WEBPACK_IMPORTED_MODULE_13__.bind),
/* harmony export */   "binding_callbacks": () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_8__.binding_callbacks),
/* harmony export */   "blank_object": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.blank_object),
/* harmony export */   "bubble": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.bubble),
/* harmony export */   "check_outros": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_11__.check_outros),
/* harmony export */   "children": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.children),
/* harmony export */   "claim_comment": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.claim_comment),
/* harmony export */   "claim_component": () => (/* reexport safe */ _Component_js__WEBPACK_IMPORTED_MODULE_13__.claim_component),
/* harmony export */   "claim_element": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.claim_element),
/* harmony export */   "claim_html_tag": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.claim_html_tag),
/* harmony export */   "claim_space": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.claim_space),
/* harmony export */   "claim_svg_element": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.claim_svg_element),
/* harmony export */   "claim_text": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.claim_text),
/* harmony export */   "clear_loops": () => (/* reexport safe */ _loop_js__WEBPACK_IMPORTED_MODULE_7__.clear_loops),
/* harmony export */   "comment": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.comment),
/* harmony export */   "component_subscribe": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.component_subscribe),
/* harmony export */   "compute_rest_props": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.compute_rest_props),
/* harmony export */   "compute_slots": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.compute_slots),
/* harmony export */   "construct_svelte_component": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.construct_svelte_component),
/* harmony export */   "construct_svelte_component_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.construct_svelte_component_dev),
/* harmony export */   "contenteditable_truthy_values": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.contenteditable_truthy_values),
/* harmony export */   "createEventDispatcher": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.createEventDispatcher),
/* harmony export */   "create_animation": () => (/* reexport safe */ _animations_js__WEBPACK_IMPORTED_MODULE_0__.create_animation),
/* harmony export */   "create_bidirectional_transition": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_11__.create_bidirectional_transition),
/* harmony export */   "create_component": () => (/* reexport safe */ _Component_js__WEBPACK_IMPORTED_MODULE_13__.create_component),
/* harmony export */   "create_custom_element": () => (/* reexport safe */ _Component_js__WEBPACK_IMPORTED_MODULE_13__.create_custom_element),
/* harmony export */   "create_in_transition": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_11__.create_in_transition),
/* harmony export */   "create_out_transition": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_11__.create_out_transition),
/* harmony export */   "create_slot": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.create_slot),
/* harmony export */   "create_ssr_component": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.create_ssr_component),
/* harmony export */   "current_component": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.current_component),
/* harmony export */   "custom_event": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.custom_event),
/* harmony export */   "dataset_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.dataset_dev),
/* harmony export */   "debug": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.debug),
/* harmony export */   "destroy_block": () => (/* reexport safe */ _each_js__WEBPACK_IMPORTED_MODULE_5__.destroy_block),
/* harmony export */   "destroy_component": () => (/* reexport safe */ _Component_js__WEBPACK_IMPORTED_MODULE_13__.destroy_component),
/* harmony export */   "destroy_each": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.destroy_each),
/* harmony export */   "detach": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.detach),
/* harmony export */   "detach_after_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.detach_after_dev),
/* harmony export */   "detach_before_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.detach_before_dev),
/* harmony export */   "detach_between_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.detach_between_dev),
/* harmony export */   "detach_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.detach_dev),
/* harmony export */   "dirty_components": () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_8__.dirty_components),
/* harmony export */   "dispatch_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.dispatch_dev),
/* harmony export */   "each": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.each),
/* harmony export */   "element": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.element),
/* harmony export */   "element_is": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.element_is),
/* harmony export */   "empty": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.empty),
/* harmony export */   "end_hydrating": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.end_hydrating),
/* harmony export */   "ensure_array_like": () => (/* reexport safe */ _each_js__WEBPACK_IMPORTED_MODULE_5__.ensure_array_like),
/* harmony export */   "ensure_array_like_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.ensure_array_like_dev),
/* harmony export */   "escape": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.escape),
/* harmony export */   "escape_attribute_value": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.escape_attribute_value),
/* harmony export */   "escape_object": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.escape_object),
/* harmony export */   "exclude_internal_props": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.exclude_internal_props),
/* harmony export */   "fix_and_destroy_block": () => (/* reexport safe */ _each_js__WEBPACK_IMPORTED_MODULE_5__.fix_and_destroy_block),
/* harmony export */   "fix_and_outro_and_destroy_block": () => (/* reexport safe */ _each_js__WEBPACK_IMPORTED_MODULE_5__.fix_and_outro_and_destroy_block),
/* harmony export */   "fix_position": () => (/* reexport safe */ _animations_js__WEBPACK_IMPORTED_MODULE_0__.fix_position),
/* harmony export */   "flush": () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_8__.flush),
/* harmony export */   "flush_render_callbacks": () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_8__.flush_render_callbacks),
/* harmony export */   "getAllContexts": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.getAllContexts),
/* harmony export */   "getContext": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.getContext),
/* harmony export */   "get_all_dirty_from_scope": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.get_all_dirty_from_scope),
/* harmony export */   "get_binding_group_value": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.get_binding_group_value),
/* harmony export */   "get_current_component": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.get_current_component),
/* harmony export */   "get_custom_elements_slots": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.get_custom_elements_slots),
/* harmony export */   "get_root_for_style": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.get_root_for_style),
/* harmony export */   "get_slot_changes": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.get_slot_changes),
/* harmony export */   "get_spread_object": () => (/* reexport safe */ _spread_js__WEBPACK_IMPORTED_MODULE_9__.get_spread_object),
/* harmony export */   "get_spread_update": () => (/* reexport safe */ _spread_js__WEBPACK_IMPORTED_MODULE_9__.get_spread_update),
/* harmony export */   "get_store_value": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.get_store_value),
/* harmony export */   "get_svelte_dataset": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.get_svelte_dataset),
/* harmony export */   "globals": () => (/* reexport safe */ _globals_js__WEBPACK_IMPORTED_MODULE_4__.globals),
/* harmony export */   "group_outros": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_11__.group_outros),
/* harmony export */   "handle_promise": () => (/* reexport safe */ _await_block_js__WEBPACK_IMPORTED_MODULE_1__.handle_promise),
/* harmony export */   "hasContext": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.hasContext),
/* harmony export */   "has_prop": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.has_prop),
/* harmony export */   "head_selector": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.head_selector),
/* harmony export */   "identity": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.identity),
/* harmony export */   "init": () => (/* reexport safe */ _Component_js__WEBPACK_IMPORTED_MODULE_13__.init),
/* harmony export */   "init_binding_group": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.init_binding_group),
/* harmony export */   "init_binding_group_dynamic": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.init_binding_group_dynamic),
/* harmony export */   "insert": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.insert),
/* harmony export */   "insert_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.insert_dev),
/* harmony export */   "insert_hydration": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.insert_hydration),
/* harmony export */   "insert_hydration_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.insert_hydration_dev),
/* harmony export */   "intros": () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_8__.intros),
/* harmony export */   "invalid_attribute_name_character": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.invalid_attribute_name_character),
/* harmony export */   "is_client": () => (/* reexport safe */ _environment_js__WEBPACK_IMPORTED_MODULE_3__.is_client),
/* harmony export */   "is_crossorigin": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.is_crossorigin),
/* harmony export */   "is_empty": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.is_empty),
/* harmony export */   "is_function": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.is_function),
/* harmony export */   "is_promise": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.is_promise),
/* harmony export */   "is_void": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.is_void),
/* harmony export */   "listen": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.listen),
/* harmony export */   "listen_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.listen_dev),
/* harmony export */   "loop": () => (/* reexport safe */ _loop_js__WEBPACK_IMPORTED_MODULE_7__.loop),
/* harmony export */   "loop_guard": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.loop_guard),
/* harmony export */   "merge_ssr_styles": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.merge_ssr_styles),
/* harmony export */   "missing_component": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.missing_component),
/* harmony export */   "mount_component": () => (/* reexport safe */ _Component_js__WEBPACK_IMPORTED_MODULE_13__.mount_component),
/* harmony export */   "noop": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.noop),
/* harmony export */   "not_equal": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.not_equal),
/* harmony export */   "now": () => (/* reexport safe */ _environment_js__WEBPACK_IMPORTED_MODULE_3__.now),
/* harmony export */   "null_to_empty": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.null_to_empty),
/* harmony export */   "object_without_properties": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.object_without_properties),
/* harmony export */   "onDestroy": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.onDestroy),
/* harmony export */   "onMount": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.onMount),
/* harmony export */   "once": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.once),
/* harmony export */   "outro_and_destroy_block": () => (/* reexport safe */ _each_js__WEBPACK_IMPORTED_MODULE_5__.outro_and_destroy_block),
/* harmony export */   "prevent_default": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.prevent_default),
/* harmony export */   "prop_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.prop_dev),
/* harmony export */   "query_selector_all": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.query_selector_all),
/* harmony export */   "raf": () => (/* reexport safe */ _environment_js__WEBPACK_IMPORTED_MODULE_3__.raf),
/* harmony export */   "resize_observer_border_box": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.resize_observer_border_box),
/* harmony export */   "resize_observer_content_box": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.resize_observer_content_box),
/* harmony export */   "resize_observer_device_pixel_content_box": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.resize_observer_device_pixel_content_box),
/* harmony export */   "run": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.run),
/* harmony export */   "run_all": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.run_all),
/* harmony export */   "safe_not_equal": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.safe_not_equal),
/* harmony export */   "schedule_update": () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_8__.schedule_update),
/* harmony export */   "select_multiple_value": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.select_multiple_value),
/* harmony export */   "select_option": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.select_option),
/* harmony export */   "select_options": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.select_options),
/* harmony export */   "select_value": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.select_value),
/* harmony export */   "self": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.self),
/* harmony export */   "setContext": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.setContext),
/* harmony export */   "set_attributes": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.set_attributes),
/* harmony export */   "set_current_component": () => (/* reexport safe */ _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__.set_current_component),
/* harmony export */   "set_custom_element_data": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.set_custom_element_data),
/* harmony export */   "set_custom_element_data_map": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.set_custom_element_data_map),
/* harmony export */   "set_data": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.set_data),
/* harmony export */   "set_data_contenteditable": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.set_data_contenteditable),
/* harmony export */   "set_data_contenteditable_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.set_data_contenteditable_dev),
/* harmony export */   "set_data_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.set_data_dev),
/* harmony export */   "set_data_maybe_contenteditable": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.set_data_maybe_contenteditable),
/* harmony export */   "set_data_maybe_contenteditable_dev": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.set_data_maybe_contenteditable_dev),
/* harmony export */   "set_dynamic_element_data": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.set_dynamic_element_data),
/* harmony export */   "set_input_type": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.set_input_type),
/* harmony export */   "set_input_value": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.set_input_value),
/* harmony export */   "set_now": () => (/* reexport safe */ _environment_js__WEBPACK_IMPORTED_MODULE_3__.set_now),
/* harmony export */   "set_raf": () => (/* reexport safe */ _environment_js__WEBPACK_IMPORTED_MODULE_3__.set_raf),
/* harmony export */   "set_store_value": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.set_store_value),
/* harmony export */   "set_style": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.set_style),
/* harmony export */   "set_svg_attributes": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.set_svg_attributes),
/* harmony export */   "space": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.space),
/* harmony export */   "split_css_unit": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.split_css_unit),
/* harmony export */   "spread": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.spread),
/* harmony export */   "src_url_equal": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.src_url_equal),
/* harmony export */   "srcset_url_equal": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.srcset_url_equal),
/* harmony export */   "start_hydrating": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.start_hydrating),
/* harmony export */   "stop_immediate_propagation": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.stop_immediate_propagation),
/* harmony export */   "stop_propagation": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.stop_propagation),
/* harmony export */   "subscribe": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.subscribe),
/* harmony export */   "svg_element": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.svg_element),
/* harmony export */   "text": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.text),
/* harmony export */   "tick": () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_8__.tick),
/* harmony export */   "time_ranges_to_array": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.time_ranges_to_array),
/* harmony export */   "to_number": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.to_number),
/* harmony export */   "toggle_class": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.toggle_class),
/* harmony export */   "transition_in": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_11__.transition_in),
/* harmony export */   "transition_out": () => (/* reexport safe */ _transitions_js__WEBPACK_IMPORTED_MODULE_11__.transition_out),
/* harmony export */   "trusted": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.trusted),
/* harmony export */   "update_await_block_branch": () => (/* reexport safe */ _await_block_js__WEBPACK_IMPORTED_MODULE_1__.update_await_block_branch),
/* harmony export */   "update_keyed_each": () => (/* reexport safe */ _each_js__WEBPACK_IMPORTED_MODULE_5__.update_keyed_each),
/* harmony export */   "update_slot": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.update_slot),
/* harmony export */   "update_slot_base": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.update_slot_base),
/* harmony export */   "validate_component": () => (/* reexport safe */ _ssr_js__WEBPACK_IMPORTED_MODULE_10__.validate_component),
/* harmony export */   "validate_dynamic_element": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.validate_dynamic_element),
/* harmony export */   "validate_each_keys": () => (/* reexport safe */ _each_js__WEBPACK_IMPORTED_MODULE_5__.validate_each_keys),
/* harmony export */   "validate_slots": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.validate_slots),
/* harmony export */   "validate_store": () => (/* reexport safe */ _utils_js__WEBPACK_IMPORTED_MODULE_12__.validate_store),
/* harmony export */   "validate_void_dynamic_element": () => (/* reexport safe */ _dev_js__WEBPACK_IMPORTED_MODULE_14__.validate_void_dynamic_element),
/* harmony export */   "xlink_attr": () => (/* reexport safe */ _dom_js__WEBPACK_IMPORTED_MODULE_2__.xlink_attr)
/* harmony export */ });
/* harmony import */ var _animations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animations.js */ "./node_modules/svelte/src/runtime/internal/animations.js");
/* harmony import */ var _await_block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./await_block.js */ "./node_modules/svelte/src/runtime/internal/await_block.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom.js */ "./node_modules/svelte/src/runtime/internal/dom.js");
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environment.js */ "./node_modules/svelte/src/runtime/internal/environment.js");
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./globals.js */ "./node_modules/svelte/src/runtime/internal/globals.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./each.js */ "./node_modules/svelte/src/runtime/internal/each.js");
/* harmony import */ var _lifecycle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lifecycle.js */ "./node_modules/svelte/src/runtime/internal/lifecycle.js");
/* harmony import */ var _loop_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./loop.js */ "./node_modules/svelte/src/runtime/internal/loop.js");
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/svelte/src/runtime/internal/scheduler.js");
/* harmony import */ var _spread_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./spread.js */ "./node_modules/svelte/src/runtime/internal/spread.js");
/* harmony import */ var _ssr_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ssr.js */ "./node_modules/svelte/src/runtime/internal/ssr.js");
/* harmony import */ var _transitions_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./transitions.js */ "./node_modules/svelte/src/runtime/internal/transitions.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/runtime/internal/utils.js");
/* harmony import */ var _Component_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Component.js */ "./node_modules/svelte/src/runtime/internal/Component.js");
/* harmony import */ var _dev_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./dev.js */ "./node_modules/svelte/src/runtime/internal/dev.js");

















/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/lifecycle.js":
/*!***************************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/lifecycle.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterUpdate": () => (/* binding */ afterUpdate),
/* harmony export */   "beforeUpdate": () => (/* binding */ beforeUpdate),
/* harmony export */   "bubble": () => (/* binding */ bubble),
/* harmony export */   "createEventDispatcher": () => (/* binding */ createEventDispatcher),
/* harmony export */   "current_component": () => (/* binding */ current_component),
/* harmony export */   "getAllContexts": () => (/* binding */ getAllContexts),
/* harmony export */   "getContext": () => (/* binding */ getContext),
/* harmony export */   "get_current_component": () => (/* binding */ get_current_component),
/* harmony export */   "hasContext": () => (/* binding */ hasContext),
/* harmony export */   "onDestroy": () => (/* binding */ onDestroy),
/* harmony export */   "onMount": () => (/* binding */ onMount),
/* harmony export */   "setContext": () => (/* binding */ setContext),
/* harmony export */   "set_current_component": () => (/* binding */ set_current_component)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./node_modules/svelte/src/runtime/internal/dom.js");


let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

function get_current_component() {
	if (!current_component) throw new Error('Function called outside component initialization');
	return current_component;
}

/**
 * Schedules a callback to run immediately before the component is updated after any state change.
 *
 * The first time the callback runs will be before the initial `onMount`
 *
 * https://svelte.dev/docs/svelte#beforeupdate
 * @param {() => any} fn
 * @returns {void}
 */
function beforeUpdate(fn) {
	get_current_component().$$.before_update.push(fn);
}

/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs/svelte#onmount
 * @template T
 * @param {() => import('./private.js').NotFunction<T> | Promise<import('./private.js').NotFunction<T>> | (() => any)} fn
 * @returns {void}
 */
function onMount(fn) {
	get_current_component().$$.on_mount.push(fn);
}

/**
 * Schedules a callback to run immediately after the component has been updated.
 *
 * The first time the callback runs will be after the initial `onMount`
 *
 * https://svelte.dev/docs/svelte#afterupdate
 * @param {() => any} fn
 * @returns {void}
 */
function afterUpdate(fn) {
	get_current_component().$$.after_update.push(fn);
}

/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * https://svelte.dev/docs/svelte#ondestroy
 * @param {() => any} fn
 * @returns {void}
 */
function onDestroy(fn) {
	get_current_component().$$.on_destroy.push(fn);
}

/**
 * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * The event dispatcher can be typed to narrow the allowed event names and the type of the `detail` argument:
 * ```ts
 * const dispatch = createEventDispatcher<{
 *  loaded: never; // does not take a detail argument
 *  change: string; // takes a detail argument of type string, which is required
 *  optional: number | null; // takes an optional detail argument of type number
 * }>();
 * ```
 *
 * https://svelte.dev/docs/svelte#createeventdispatcher
 * @template {Record<string, any>} [EventMap=any]
 * @returns {import('./public.js').EventDispatcher<EventMap>}
 */
function createEventDispatcher() {
	const component = get_current_component();
	return (type, detail, { cancelable = false } = {}) => {
		const callbacks = component.$$.callbacks[type];
		if (callbacks) {
			// TODO are there situations where events could be dispatched
			// in a server (non-DOM) environment?
			const event = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.custom_event)(/** @type {string} */ (type), detail, { cancelable });
			callbacks.slice().forEach((fn) => {
				fn.call(component, event);
			});
			return !event.defaultPrevented;
		}
		return true;
	};
}

/**
 * Associates an arbitrary `context` object with the current component and the specified `key`
 * and returns that object. The context is then available to children of the component
 * (including slotted content) with `getContext`.
 *
 * Like lifecycle functions, this must be called during component initialisation.
 *
 * https://svelte.dev/docs/svelte#setcontext
 * @template T
 * @param {any} key
 * @param {T} context
 * @returns {T}
 */
function setContext(key, context) {
	get_current_component().$$.context.set(key, context);
	return context;
}

/**
 * Retrieves the context that belongs to the closest parent component with the specified `key`.
 * Must be called during component initialisation.
 *
 * https://svelte.dev/docs/svelte#getcontext
 * @template T
 * @param {any} key
 * @returns {T}
 */
function getContext(key) {
	return get_current_component().$$.context.get(key);
}

/**
 * Retrieves the whole context map that belongs to the closest parent component.
 * Must be called during component initialisation. Useful, for example, if you
 * programmatically create a component and want to pass the existing context to it.
 *
 * https://svelte.dev/docs/svelte#getallcontexts
 * @template {Map<any, any>} [T=Map<any, any>]
 * @returns {T}
 */
function getAllContexts() {
	return get_current_component().$$.context;
}

/**
 * Checks whether a given `key` has been set in the context of a parent component.
 * Must be called during component initialisation.
 *
 * https://svelte.dev/docs/svelte#hascontext
 * @param {any} key
 * @returns {boolean}
 */
function hasContext(key) {
	return get_current_component().$$.context.has(key);
}

// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
/**
 * @param component
 * @param event
 * @returns {void}
 */
function bubble(component, event) {
	const callbacks = component.$$.callbacks[event.type];
	if (callbacks) {
		// @ts-ignore
		callbacks.slice().forEach((fn) => fn.call(this, event));
	}
}


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/loop.js":
/*!**********************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/loop.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clear_loops": () => (/* binding */ clear_loops),
/* harmony export */   "loop": () => (/* binding */ loop)
/* harmony export */ });
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environment.js */ "./node_modules/svelte/src/runtime/internal/environment.js");


const tasks = new Set();

/**
 * @param {number} now
 * @returns {void}
 */
function run_tasks(now) {
	tasks.forEach((task) => {
		if (!task.c(now)) {
			tasks.delete(task);
			task.f();
		}
	});
	if (tasks.size !== 0) (0,_environment_js__WEBPACK_IMPORTED_MODULE_0__.raf)(run_tasks);
}

/**
 * For testing purposes only!
 * @returns {void}
 */
function clear_loops() {
	tasks.clear();
}

/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 * @param {import('./private.js').TaskCallback} callback
 * @returns {import('./private.js').Task}
 */
function loop(callback) {
	/** @type {import('./private.js').TaskEntry} */
	let task;
	if (tasks.size === 0) (0,_environment_js__WEBPACK_IMPORTED_MODULE_0__.raf)(run_tasks);
	return {
		promise: new Promise((fulfill) => {
			tasks.add((task = { c: callback, f: fulfill }));
		}),
		abort() {
			tasks.delete(task);
		}
	};
}


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/scheduler.js":
/*!***************************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/scheduler.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add_flush_callback": () => (/* binding */ add_flush_callback),
/* harmony export */   "add_render_callback": () => (/* binding */ add_render_callback),
/* harmony export */   "binding_callbacks": () => (/* binding */ binding_callbacks),
/* harmony export */   "dirty_components": () => (/* binding */ dirty_components),
/* harmony export */   "flush": () => (/* binding */ flush),
/* harmony export */   "flush_render_callbacks": () => (/* binding */ flush_render_callbacks),
/* harmony export */   "intros": () => (/* binding */ intros),
/* harmony export */   "schedule_update": () => (/* binding */ schedule_update),
/* harmony export */   "tick": () => (/* binding */ tick)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/runtime/internal/utils.js");
/* harmony import */ var _lifecycle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lifecycle.js */ "./node_modules/svelte/src/runtime/internal/lifecycle.js");



const dirty_components = [];
const intros = { enabled: false };
const binding_callbacks = [];

let render_callbacks = [];

const flush_callbacks = [];

const resolved_promise = /* @__PURE__ */ Promise.resolve();

let update_scheduled = false;

/** @returns {void} */
function schedule_update() {
	if (!update_scheduled) {
		update_scheduled = true;
		resolved_promise.then(flush);
	}
}

/** @returns {Promise<void>} */
function tick() {
	schedule_update();
	return resolved_promise;
}

/** @returns {void} */
function add_render_callback(fn) {
	render_callbacks.push(fn);
}

/** @returns {void} */
function add_flush_callback(fn) {
	flush_callbacks.push(fn);
}

// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();

let flushidx = 0; // Do *not* move this inside the flush() function

/** @returns {void} */
function flush() {
	// Do not reenter flush while dirty components are updated, as this can
	// result in an infinite loop. Instead, let the inner flush handle it.
	// Reentrancy is ok afterwards for bindings etc.
	if (flushidx !== 0) {
		return;
	}
	const saved_component = _lifecycle_js__WEBPACK_IMPORTED_MODULE_1__.current_component;
	do {
		// first, call beforeUpdate functions
		// and update components
		try {
			while (flushidx < dirty_components.length) {
				const component = dirty_components[flushidx];
				flushidx++;
				(0,_lifecycle_js__WEBPACK_IMPORTED_MODULE_1__.set_current_component)(component);
				update(component.$$);
			}
		} catch (e) {
			// reset dirty state to not end up in a deadlocked state and then rethrow
			dirty_components.length = 0;
			flushidx = 0;
			throw e;
		}
		(0,_lifecycle_js__WEBPACK_IMPORTED_MODULE_1__.set_current_component)(null);
		dirty_components.length = 0;
		flushidx = 0;
		while (binding_callbacks.length) binding_callbacks.pop()();
		// then, once components are updated, call
		// afterUpdate functions. This may cause
		// subsequent updates...
		for (let i = 0; i < render_callbacks.length; i += 1) {
			const callback = render_callbacks[i];
			if (!seen_callbacks.has(callback)) {
				// ...so guard against infinite loops
				seen_callbacks.add(callback);
				callback();
			}
		}
		render_callbacks.length = 0;
	} while (dirty_components.length);
	while (flush_callbacks.length) {
		flush_callbacks.pop()();
	}
	update_scheduled = false;
	seen_callbacks.clear();
	(0,_lifecycle_js__WEBPACK_IMPORTED_MODULE_1__.set_current_component)(saved_component);
}

/** @returns {void} */
function update($$) {
	if ($$.fragment !== null) {
		$$.update();
		(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.run_all)($$.before_update);
		const dirty = $$.dirty;
		$$.dirty = [-1];
		$$.fragment && $$.fragment.p($$.ctx, dirty);
		$$.after_update.forEach(add_render_callback);
	}
}

/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 * @param {Function[]} fns
 * @returns {void}
 */
function flush_render_callbacks(fns) {
	const filtered = [];
	const targets = [];
	render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
	targets.forEach((c) => c());
	render_callbacks = filtered;
}


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/spread.js":
/*!************************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/spread.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get_spread_object": () => (/* binding */ get_spread_object),
/* harmony export */   "get_spread_update": () => (/* binding */ get_spread_update)
/* harmony export */ });
/** @returns {{}} */
function get_spread_update(levels, updates) {
	const update = {};
	const to_null_out = {};
	const accounted_for = { $$scope: 1 };
	let i = levels.length;
	while (i--) {
		const o = levels[i];
		const n = updates[i];
		if (n) {
			for (const key in o) {
				if (!(key in n)) to_null_out[key] = 1;
			}
			for (const key in n) {
				if (!accounted_for[key]) {
					update[key] = n[key];
					accounted_for[key] = 1;
				}
			}
			levels[i] = n;
		} else {
			for (const key in o) {
				accounted_for[key] = 1;
			}
		}
	}
	for (const key in to_null_out) {
		if (!(key in update)) update[key] = undefined;
	}
	return update;
}

function get_spread_object(spread_props) {
	return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/ssr.js":
/*!*********************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/ssr.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add_attribute": () => (/* binding */ add_attribute),
/* harmony export */   "add_classes": () => (/* binding */ add_classes),
/* harmony export */   "add_styles": () => (/* binding */ add_styles),
/* harmony export */   "create_ssr_component": () => (/* binding */ create_ssr_component),
/* harmony export */   "debug": () => (/* binding */ debug),
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "escape": () => (/* binding */ escape),
/* harmony export */   "escape_attribute_value": () => (/* binding */ escape_attribute_value),
/* harmony export */   "escape_object": () => (/* binding */ escape_object),
/* harmony export */   "invalid_attribute_name_character": () => (/* binding */ invalid_attribute_name_character),
/* harmony export */   "is_void": () => (/* reexport safe */ _shared_utils_names_js__WEBPACK_IMPORTED_MODULE_4__.is_void),
/* harmony export */   "merge_ssr_styles": () => (/* binding */ merge_ssr_styles),
/* harmony export */   "missing_component": () => (/* binding */ missing_component),
/* harmony export */   "spread": () => (/* binding */ spread),
/* harmony export */   "validate_component": () => (/* binding */ validate_component)
/* harmony export */ });
/* harmony import */ var _lifecycle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lifecycle.js */ "./node_modules/svelte/src/runtime/internal/lifecycle.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/runtime/internal/utils.js");
/* harmony import */ var _shared_boolean_attributes_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/boolean_attributes.js */ "./node_modules/svelte/src/shared/boolean_attributes.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./each.js */ "./node_modules/svelte/src/runtime/internal/each.js");
/* harmony import */ var _shared_utils_names_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/utils/names.js */ "./node_modules/svelte/src/shared/utils/names.js");






const invalid_attribute_name_character =
	/[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
// https://infra.spec.whatwg.org/#noncharacter

/** @returns {string} */
function spread(args, attrs_to_add) {
	const attributes = Object.assign({}, ...args);
	if (attrs_to_add) {
		const classes_to_add = attrs_to_add.classes;
		const styles_to_add = attrs_to_add.styles;
		if (classes_to_add) {
			if (attributes.class == null) {
				attributes.class = classes_to_add;
			} else {
				attributes.class += ' ' + classes_to_add;
			}
		}
		if (styles_to_add) {
			if (attributes.style == null) {
				attributes.style = style_object_to_string(styles_to_add);
			} else {
				attributes.style = style_object_to_string(
					merge_ssr_styles(attributes.style, styles_to_add)
				);
			}
		}
	}
	let str = '';
	Object.keys(attributes).forEach((name) => {
		if (invalid_attribute_name_character.test(name)) return;
		const value = attributes[name];
		if (value === true) str += ' ' + name;
		else if (_shared_boolean_attributes_js__WEBPACK_IMPORTED_MODULE_2__.boolean_attributes.has(name.toLowerCase())) {
			if (value) str += ' ' + name;
		} else if (value != null) {
			str += ` ${name}="${value}"`;
		}
	});
	return str;
}

/** @returns {{}} */
function merge_ssr_styles(style_attribute, style_directive) {
	const style_object = {};
	for (const individual_style of style_attribute.split(';')) {
		const colon_index = individual_style.indexOf(':');
		const name = individual_style.slice(0, colon_index).trim();
		const value = individual_style.slice(colon_index + 1).trim();
		if (!name) continue;
		style_object[name] = value;
	}
	for (const name in style_directive) {
		const value = style_directive[name];
		if (value) {
			style_object[name] = value;
		} else {
			delete style_object[name];
		}
	}
	return style_object;
}

const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;

/**
 * Note: this method is performance sensitive and has been optimized
 * https://github.com/sveltejs/svelte/pull/5701
 * @param {unknown} value
 * @returns {string}
 */
function escape(value, is_attr = false) {
	const str = String(value);
	const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;
	let escaped = '';
	let last = 0;
	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;');
		last = i + 1;
	}
	return escaped + str.substring(last);
}

function escape_attribute_value(value) {
	// keep booleans, null, and undefined for the sake of `spread`
	const should_escape = typeof value === 'string' || (value && typeof value === 'object');
	return should_escape ? escape(value, true) : value;
}

/** @returns {{}} */
function escape_object(obj) {
	const result = {};
	for (const key in obj) {
		result[key] = escape_attribute_value(obj[key]);
	}
	return result;
}

/** @returns {string} */
function each(items, fn) {
	items = (0,_each_js__WEBPACK_IMPORTED_MODULE_3__.ensure_array_like)(items);
	let str = '';
	for (let i = 0; i < items.length; i += 1) {
		str += fn(items[i], i);
	}
	return str;
}

const missing_component = {
	$$render: () => ''
};

function validate_component(component, name) {
	if (!component || !component.$$render) {
		if (name === 'svelte:component') name += ' this={...}';
		throw new Error(
			`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`
		);
	}
	return component;
}

/** @returns {string} */
function debug(file, line, column, values) {
	console.log(`{@debug} ${file ? file + ' ' : ''}(${line}:${column})`); // eslint-disable-line no-console
	console.log(values); // eslint-disable-line no-console
	return '';
}

let on_destroy;

/** @returns {{ render: (props?: {}, { $$slots, context }?: { $$slots?: {}; context?: Map<any, any>; }) => { html: any; css: { code: string; map: any; }; head: string; }; $$render: (result: any, props: any, bindings: any, slots: any, context: any) => any; }} */
function create_ssr_component(fn) {
	function $$render(result, props, bindings, slots, context) {
		const parent_component = _lifecycle_js__WEBPACK_IMPORTED_MODULE_0__.current_component;
		const $$ = {
			on_destroy,
			context: new Map(context || (parent_component ? parent_component.$$.context : [])),
			// these will be immediately discarded
			on_mount: [],
			before_update: [],
			after_update: [],
			callbacks: (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.blank_object)()
		};
		(0,_lifecycle_js__WEBPACK_IMPORTED_MODULE_0__.set_current_component)({ $$ });
		const html = fn(result, props, bindings, slots);
		(0,_lifecycle_js__WEBPACK_IMPORTED_MODULE_0__.set_current_component)(parent_component);
		return html;
	}
	return {
		render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
			on_destroy = [];
			const result = { title: '', head: '', css: new Set() };
			const html = $$render(result, props, {}, $$slots, context);
			(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.run_all)(on_destroy);
			return {
				html,
				css: {
					code: Array.from(result.css)
						.map((css) => css.code)
						.join('\n'),
					map: null // TODO
				},
				head: result.title + result.head
			};
		},
		$$render
	};
}

/** @returns {string} */
function add_attribute(name, value, boolean) {
	if (value == null || (boolean && !value)) return '';
	const assignment = boolean && value === true ? '' : `="${escape(value, true)}"`;
	return ` ${name}${assignment}`;
}

/** @returns {string} */
function add_classes(classes) {
	return classes ? ` class="${classes}"` : '';
}

/** @returns {string} */
function style_object_to_string(style_object) {
	return Object.keys(style_object)
		.filter((key) => style_object[key])
		.map((key) => `${key}: ${escape_attribute_value(style_object[key])};`)
		.join(' ');
}

/** @returns {string} */
function add_styles(style_object) {
	const styles = style_object_to_string(style_object);
	return styles ? ` style="${styles}"` : '';
}


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/style_manager.js":
/*!*******************************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/style_manager.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clear_rules": () => (/* binding */ clear_rules),
/* harmony export */   "create_rule": () => (/* binding */ create_rule),
/* harmony export */   "delete_rule": () => (/* binding */ delete_rule)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./node_modules/svelte/src/runtime/internal/dom.js");
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environment.js */ "./node_modules/svelte/src/runtime/internal/environment.js");



// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
/** @type {Map<Document | ShadowRoot, import('./private.d.ts').StyleInformation>} */
const managed_styles = new Map();

let active = 0;

// https://github.com/darkskyapp/string-hash/blob/master/index.js
/**
 * @param {string} str
 * @returns {number}
 */
function hash(str) {
	let hash = 5381;
	let i = str.length;
	while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	return hash >>> 0;
}

/**
 * @param {Document | ShadowRoot} doc
 * @param {Element & ElementCSSInlineStyle} node
 * @returns {{ stylesheet: any; rules: {}; }}
 */
function create_style_information(doc, node) {
	const info = { stylesheet: (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.append_empty_stylesheet)(node), rules: {} };
	managed_styles.set(doc, info);
	return info;
}

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {number} a
 * @param {number} b
 * @param {number} duration
 * @param {number} delay
 * @param {(t: number) => number} ease
 * @param {(t: number, u: number) => string} fn
 * @param {number} uid
 * @returns {string}
 */
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
	const step = 16.666 / duration;
	let keyframes = '{\n';
	for (let p = 0; p <= 1; p += step) {
		const t = a + (b - a) * ease(p);
		keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
	}
	const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
	const name = `__svelte_${hash(rule)}_${uid}`;
	const doc = (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.get_root_for_style)(node);
	const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
	if (!rules[name]) {
		rules[name] = true;
		stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
	}
	const animation = node.style.animation || '';
	node.style.animation = `${
		animation ? `${animation}, ` : ''
	}${name} ${duration}ms linear ${delay}ms 1 both`;
	active += 1;
	return name;
}

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {string} [name]
 * @returns {void}
 */
function delete_rule(node, name) {
	const previous = (node.style.animation || '').split(', ');
	const next = previous.filter(
		name
			? (anim) => anim.indexOf(name) < 0 // remove specific animation
			: (anim) => anim.indexOf('__svelte') === -1 // remove all Svelte animations
	);
	const deleted = previous.length - next.length;
	if (deleted) {
		node.style.animation = next.join(', ');
		active -= deleted;
		if (!active) clear_rules();
	}
}

/** @returns {void} */
function clear_rules() {
	(0,_environment_js__WEBPACK_IMPORTED_MODULE_1__.raf)(() => {
		if (active) return;
		managed_styles.forEach((info) => {
			const { ownerNode } = info.stylesheet;
			// there is no ownerNode if it runs on jsdom.
			if (ownerNode) (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.detach)(ownerNode);
		});
		managed_styles.clear();
	});
}


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/transitions.js":
/*!*****************************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/transitions.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "check_outros": () => (/* binding */ check_outros),
/* harmony export */   "create_bidirectional_transition": () => (/* binding */ create_bidirectional_transition),
/* harmony export */   "create_in_transition": () => (/* binding */ create_in_transition),
/* harmony export */   "create_out_transition": () => (/* binding */ create_out_transition),
/* harmony export */   "group_outros": () => (/* binding */ group_outros),
/* harmony export */   "transition_in": () => (/* binding */ transition_in),
/* harmony export */   "transition_out": () => (/* binding */ transition_out)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/svelte/src/runtime/internal/utils.js");
/* harmony import */ var _environment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environment.js */ "./node_modules/svelte/src/runtime/internal/environment.js");
/* harmony import */ var _loop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loop.js */ "./node_modules/svelte/src/runtime/internal/loop.js");
/* harmony import */ var _style_manager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style_manager.js */ "./node_modules/svelte/src/runtime/internal/style_manager.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom.js */ "./node_modules/svelte/src/runtime/internal/dom.js");
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/svelte/src/runtime/internal/scheduler.js");







/**
 * @type {Promise<void> | null}
 */
let promise;

/**
 * @returns {Promise<void>}
 */
function wait() {
	if (!promise) {
		promise = Promise.resolve();
		promise.then(() => {
			promise = null;
		});
	}
	return promise;
}

/**
 * @param {Element} node
 * @param {INTRO | OUTRO | boolean} direction
 * @param {'start' | 'end'} kind
 * @returns {void}
 */
function dispatch(node, direction, kind) {
	node.dispatchEvent((0,_dom_js__WEBPACK_IMPORTED_MODULE_4__.custom_event)(`${direction ? 'intro' : 'outro'}${kind}`));
}

const outroing = new Set();

/**
 * @type {Outro}
 */
let outros;

/**
 * @returns {void} */
function group_outros() {
	outros = {
		r: 0,
		c: [],
		p: outros // parent group
	};
}

/**
 * @returns {void} */
function check_outros() {
	if (!outros.r) {
		(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.run_all)(outros.c);
	}
	outros = outros.p;
}

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} [local]
 * @returns {void}
 */
function transition_in(block, local) {
	if (block && block.i) {
		outroing.delete(block);
		block.i(local);
	}
}

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} local
 * @param {0 | 1} [detach]
 * @param {() => void} [callback]
 * @returns {void}
 */
function transition_out(block, local, detach, callback) {
	if (block && block.o) {
		if (outroing.has(block)) return;
		outroing.add(block);
		outros.c.push(() => {
			outroing.delete(block);
			if (callback) {
				if (detach) block.d(1);
				callback();
			}
		});
		block.o(local);
	} else if (callback) {
		callback();
	}
}

/**
 * @type {import('../transition/public.js').TransitionConfig}
 */
const null_transition = { duration: 0 };

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {TransitionFn} fn
 * @param {any} params
 * @returns {{ start(): void; invalidate(): void; end(): void; }}
 */
function create_in_transition(node, fn, params) {
	/**
	 * @type {TransitionOptions} */
	const options = { direction: 'in' };
	let config = fn(node, params, options);
	let running = false;
	let animation_name;
	let task;
	let uid = 0;

	/**
	 * @returns {void} */
	function cleanup() {
		if (animation_name) (0,_style_manager_js__WEBPACK_IMPORTED_MODULE_3__.delete_rule)(node, animation_name);
	}

	/**
	 * @returns {void} */
	function go() {
		const {
			delay = 0,
			duration = 300,
			easing = _utils_js__WEBPACK_IMPORTED_MODULE_0__.identity,
			tick = _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop,
			css
		} = config || null_transition;
		if (css) animation_name = (0,_style_manager_js__WEBPACK_IMPORTED_MODULE_3__.create_rule)(node, 0, 1, duration, delay, easing, css, uid++);
		tick(0, 1);
		const start_time = (0,_environment_js__WEBPACK_IMPORTED_MODULE_1__.now)() + delay;
		const end_time = start_time + duration;
		if (task) task.abort();
		running = true;
		(0,_scheduler_js__WEBPACK_IMPORTED_MODULE_5__.add_render_callback)(() => dispatch(node, true, 'start'));
		task = (0,_loop_js__WEBPACK_IMPORTED_MODULE_2__.loop)((now) => {
			if (running) {
				if (now >= end_time) {
					tick(1, 0);
					dispatch(node, true, 'end');
					cleanup();
					return (running = false);
				}
				if (now >= start_time) {
					const t = easing((now - start_time) / duration);
					tick(t, 1 - t);
				}
			}
			return running;
		});
	}
	let started = false;
	return {
		start() {
			if (started) return;
			started = true;
			(0,_style_manager_js__WEBPACK_IMPORTED_MODULE_3__.delete_rule)(node);
			if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.is_function)(config)) {
				config = config(options);
				wait().then(go);
			} else {
				go();
			}
		},
		invalidate() {
			started = false;
		},
		end() {
			if (running) {
				cleanup();
				running = false;
			}
		}
	};
}

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {TransitionFn} fn
 * @param {any} params
 * @returns {{ end(reset: any): void; }}
 */
function create_out_transition(node, fn, params) {
	/** @type {TransitionOptions} */
	const options = { direction: 'out' };
	let config = fn(node, params, options);
	let running = true;
	let animation_name;
	const group = outros;
	group.r += 1;
	/** @type {boolean} */
	let original_inert_value;

	/**
	 * @returns {void} */
	function go() {
		const {
			delay = 0,
			duration = 300,
			easing = _utils_js__WEBPACK_IMPORTED_MODULE_0__.identity,
			tick = _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop,
			css
		} = config || null_transition;

		if (css) animation_name = (0,_style_manager_js__WEBPACK_IMPORTED_MODULE_3__.create_rule)(node, 1, 0, duration, delay, easing, css);

		const start_time = (0,_environment_js__WEBPACK_IMPORTED_MODULE_1__.now)() + delay;
		const end_time = start_time + duration;
		(0,_scheduler_js__WEBPACK_IMPORTED_MODULE_5__.add_render_callback)(() => dispatch(node, false, 'start'));

		if ('inert' in node) {
			original_inert_value = /** @type {HTMLElement} */ (node).inert;
			node.inert = true;
		}

		(0,_loop_js__WEBPACK_IMPORTED_MODULE_2__.loop)((now) => {
			if (running) {
				if (now >= end_time) {
					tick(0, 1);
					dispatch(node, false, 'end');
					if (!--group.r) {
						// this will result in `end()` being called,
						// so we don't need to clean up here
						(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.run_all)(group.c);
					}
					return false;
				}
				if (now >= start_time) {
					const t = easing((now - start_time) / duration);
					tick(1 - t, t);
				}
			}
			return running;
		});
	}

	if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.is_function)(config)) {
		wait().then(() => {
			// @ts-ignore
			config = config(options);
			go();
		});
	} else {
		go();
	}

	return {
		end(reset) {
			if (reset && 'inert' in node) {
				node.inert = original_inert_value;
			}
			if (reset && config.tick) {
				config.tick(1, 0);
			}
			if (running) {
				if (animation_name) (0,_style_manager_js__WEBPACK_IMPORTED_MODULE_3__.delete_rule)(node, animation_name);
				running = false;
			}
		}
	};
}

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {TransitionFn} fn
 * @param {any} params
 * @param {boolean} intro
 * @returns {{ run(b: 0 | 1): void; end(): void; }}
 */
function create_bidirectional_transition(node, fn, params, intro) {
	/**
	 * @type {TransitionOptions} */
	const options = { direction: 'both' };
	let config = fn(node, params, options);
	let t = intro ? 0 : 1;

	/**
	 * @type {Program | null} */
	let running_program = null;

	/**
	 * @type {PendingProgram | null} */
	let pending_program = null;
	let animation_name = null;

	/** @type {boolean} */
	let original_inert_value;

	/**
	 * @returns {void} */
	function clear_animation() {
		if (animation_name) (0,_style_manager_js__WEBPACK_IMPORTED_MODULE_3__.delete_rule)(node, animation_name);
	}

	/**
	 * @param {PendingProgram} program
	 * @param {number} duration
	 * @returns {Program}
	 */
	function init(program, duration) {
		const d = /** @type {Program['d']} */ (program.b - t);
		duration *= Math.abs(d);
		return {
			a: t,
			b: program.b,
			d,
			duration,
			start: program.start,
			end: program.start + duration,
			group: program.group
		};
	}

	/**
	 * @param {INTRO | OUTRO} b
	 * @returns {void}
	 */
	function go(b) {
		const {
			delay = 0,
			duration = 300,
			easing = _utils_js__WEBPACK_IMPORTED_MODULE_0__.identity,
			tick = _utils_js__WEBPACK_IMPORTED_MODULE_0__.noop,
			css
		} = config || null_transition;

		/**
		 * @type {PendingProgram} */
		const program = {
			start: (0,_environment_js__WEBPACK_IMPORTED_MODULE_1__.now)() + delay,
			b
		};

		if (!b) {
			// @ts-ignore todo: improve typings
			program.group = outros;
			outros.r += 1;
		}

		if ('inert' in node) {
			if (b) {
				if (original_inert_value !== undefined) {
					// aborted/reversed outro — restore previous inert value
					node.inert = original_inert_value;
				}
			} else {
				original_inert_value = /** @type {HTMLElement} */ (node).inert;
				node.inert = true;
			}
		}

		if (running_program || pending_program) {
			pending_program = program;
		} else {
			// if this is an intro, and there's a delay, we need to do
			// an initial tick and/or apply CSS animation immediately
			if (css) {
				clear_animation();
				animation_name = (0,_style_manager_js__WEBPACK_IMPORTED_MODULE_3__.create_rule)(node, t, b, duration, delay, easing, css);
			}
			if (b) tick(0, 1);
			running_program = init(program, duration);
			(0,_scheduler_js__WEBPACK_IMPORTED_MODULE_5__.add_render_callback)(() => dispatch(node, b, 'start'));
			(0,_loop_js__WEBPACK_IMPORTED_MODULE_2__.loop)((now) => {
				if (pending_program && now > pending_program.start) {
					running_program = init(pending_program, duration);
					pending_program = null;
					dispatch(node, running_program.b, 'start');
					if (css) {
						clear_animation();
						animation_name = (0,_style_manager_js__WEBPACK_IMPORTED_MODULE_3__.create_rule)(
							node,
							t,
							running_program.b,
							running_program.duration,
							0,
							easing,
							config.css
						);
					}
				}
				if (running_program) {
					if (now >= running_program.end) {
						tick((t = running_program.b), 1 - t);
						dispatch(node, running_program.b, 'end');
						if (!pending_program) {
							// we're done
							if (running_program.b) {
								// intro — we can tidy up immediately
								clear_animation();
							} else {
								// outro — needs to be coordinated
								if (!--running_program.group.r) (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.run_all)(running_program.group.c);
							}
						}
						running_program = null;
					} else if (now >= running_program.start) {
						const p = now - running_program.start;
						t = running_program.a + running_program.d * easing(p / running_program.duration);
						tick(t, 1 - t);
					}
				}
				return !!(running_program || pending_program);
			});
		}
	}
	return {
		run(b) {
			if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.is_function)(config)) {
				wait().then(() => {
					const opts = { direction: b ? 'in' : 'out' };
					// @ts-ignore
					config = config(opts);
					go(b);
				});
			} else {
				go(b);
			}
		},
		end() {
			clear_animation();
			running_program = pending_program = null;
		}
	};
}

/** @typedef {1} INTRO */
/** @typedef {0} OUTRO */
/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

/**
 * @typedef {Object} Outro
 * @property {number} r
 * @property {Function[]} c
 * @property {Object} p
 */

/**
 * @typedef {Object} PendingProgram
 * @property {number} start
 * @property {INTRO|OUTRO} b
 * @property {Outro} [group]
 */

/**
 * @typedef {Object} Program
 * @property {number} a
 * @property {INTRO|OUTRO} b
 * @property {1|-1} d
 * @property {number} duration
 * @property {number} start
 * @property {number} end
 * @property {Outro} [group]
 */


/***/ }),

/***/ "./node_modules/svelte/src/runtime/internal/utils.js":
/*!***********************************************************!*\
  !*** ./node_modules/svelte/src/runtime/internal/utils.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "action_destroyer": () => (/* binding */ action_destroyer),
/* harmony export */   "add_location": () => (/* binding */ add_location),
/* harmony export */   "assign": () => (/* binding */ assign),
/* harmony export */   "blank_object": () => (/* binding */ blank_object),
/* harmony export */   "component_subscribe": () => (/* binding */ component_subscribe),
/* harmony export */   "compute_rest_props": () => (/* binding */ compute_rest_props),
/* harmony export */   "compute_slots": () => (/* binding */ compute_slots),
/* harmony export */   "contenteditable_truthy_values": () => (/* binding */ contenteditable_truthy_values),
/* harmony export */   "create_slot": () => (/* binding */ create_slot),
/* harmony export */   "exclude_internal_props": () => (/* binding */ exclude_internal_props),
/* harmony export */   "get_all_dirty_from_scope": () => (/* binding */ get_all_dirty_from_scope),
/* harmony export */   "get_slot_changes": () => (/* binding */ get_slot_changes),
/* harmony export */   "get_store_value": () => (/* binding */ get_store_value),
/* harmony export */   "has_prop": () => (/* binding */ has_prop),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "is_empty": () => (/* binding */ is_empty),
/* harmony export */   "is_function": () => (/* binding */ is_function),
/* harmony export */   "is_promise": () => (/* binding */ is_promise),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "not_equal": () => (/* binding */ not_equal),
/* harmony export */   "null_to_empty": () => (/* binding */ null_to_empty),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "run": () => (/* binding */ run),
/* harmony export */   "run_all": () => (/* binding */ run_all),
/* harmony export */   "safe_not_equal": () => (/* binding */ safe_not_equal),
/* harmony export */   "set_store_value": () => (/* binding */ set_store_value),
/* harmony export */   "split_css_unit": () => (/* binding */ split_css_unit),
/* harmony export */   "src_url_equal": () => (/* binding */ src_url_equal),
/* harmony export */   "srcset_url_equal": () => (/* binding */ srcset_url_equal),
/* harmony export */   "subscribe": () => (/* binding */ subscribe),
/* harmony export */   "update_slot": () => (/* binding */ update_slot),
/* harmony export */   "update_slot_base": () => (/* binding */ update_slot_base),
/* harmony export */   "validate_store": () => (/* binding */ validate_store)
/* harmony export */ });
/** @returns {void} */
function noop() {}

const identity = (x) => x;

/**
 * @template T
 * @template S
 * @param {T} tar
 * @param {S} src
 * @returns {T & S}
 */
function assign(tar, src) {
	// @ts-ignore
	for (const k in src) tar[k] = src[k];
	return /** @type {T & S} */ (tar);
}

// Adapted from https://github.com/then/is-promise/blob/master/index.js
// Distributed under MIT License https://github.com/then/is-promise/blob/master/LICENSE
/**
 * @param {any} value
 * @returns {value is PromiseLike<any>}
 */
function is_promise(value) {
	return (
		!!value &&
		(typeof value === 'object' || typeof value === 'function') &&
		typeof (/** @type {any} */ (value).then) === 'function'
	);
}

/** @returns {void} */
function add_location(element, file, line, column, char) {
	element.__svelte_meta = {
		loc: { file, line, column, char }
	};
}

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

/**
 * @param {any} thing
 * @returns {thing is Function}
 */
function is_function(thing) {
	return typeof thing === 'function';
}

/** @returns {boolean} */
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

let src_url_equal_anchor;

/**
 * @param {string} element_src
 * @param {string} url
 * @returns {boolean}
 */
function src_url_equal(element_src, url) {
	if (element_src === url) return true;
	if (!src_url_equal_anchor) {
		src_url_equal_anchor = document.createElement('a');
	}
	// This is actually faster than doing URL(..).href
	src_url_equal_anchor.href = url;
	return element_src === src_url_equal_anchor.href;
}

/** @param {string} srcset */
function split_srcset(srcset) {
	return srcset.split(',').map((src) => src.trim().split(' ').filter(Boolean));
}

/**
 * @param {HTMLSourceElement | HTMLImageElement} element_srcset
 * @param {string | undefined | null} srcset
 * @returns {boolean}
 */
function srcset_url_equal(element_srcset, srcset) {
	const element_urls = split_srcset(element_srcset.srcset);
	const urls = split_srcset(srcset || '');

	return (
		urls.length === element_urls.length &&
		urls.every(
			([url, width], i) =>
				width === element_urls[i][1] &&
				// We need to test both ways because Vite will create an a full URL with
				// `new URL(asset, import.meta.url).href` for the client when `base: './'`, and the
				// relative URLs inside srcset are not automatically resolved to absolute URLs by
				// browsers (in contrast to img.src). This means both SSR and DOM code could
				// contain relative or absolute URLs.
				(src_url_equal(element_urls[i][0], url) || src_url_equal(url, element_urls[i][0]))
		)
	);
}

/** @returns {boolean} */
function not_equal(a, b) {
	return a != a ? b == b : a !== b;
}

/** @returns {boolean} */
function is_empty(obj) {
	return Object.keys(obj).length === 0;
}

/** @returns {void} */
function validate_store(store, name) {
	if (store != null && typeof store.subscribe !== 'function') {
		throw new Error(`'${name}' is not a store with a 'subscribe' method`);
	}
}

function subscribe(store, ...callbacks) {
	if (store == null) {
		for (const callback of callbacks) {
			callback(undefined);
		}
		return noop;
	}
	const unsub = store.subscribe(...callbacks);
	return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}

/**
 * Get the current value from a store by subscribing and immediately unsubscribing.
 *
 * https://svelte.dev/docs/svelte-store#get
 * @template T
 * @param {import('../store/public.js').Readable<T>} store
 * @returns {T}
 */
function get_store_value(store) {
	let value;
	subscribe(store, (_) => (value = _))();
	return value;
}

/** @returns {void} */
function component_subscribe(component, store, callback) {
	component.$$.on_destroy.push(subscribe(store, callback));
}

function create_slot(definition, ctx, $$scope, fn) {
	if (definition) {
		const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
		return definition[0](slot_ctx);
	}
}

function get_slot_context(definition, ctx, $$scope, fn) {
	return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
	if (definition[2] && fn) {
		const lets = definition[2](fn(dirty));
		if ($$scope.dirty === undefined) {
			return lets;
		}
		if (typeof lets === 'object') {
			const merged = [];
			const len = Math.max($$scope.dirty.length, lets.length);
			for (let i = 0; i < len; i += 1) {
				merged[i] = $$scope.dirty[i] | lets[i];
			}
			return merged;
		}
		return $$scope.dirty | lets;
	}
	return $$scope.dirty;
}

/** @returns {void} */
function update_slot_base(
	slot,
	slot_definition,
	ctx,
	$$scope,
	slot_changes,
	get_slot_context_fn
) {
	if (slot_changes) {
		const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
		slot.p(slot_context, slot_changes);
	}
}

/** @returns {void} */
function update_slot(
	slot,
	slot_definition,
	ctx,
	$$scope,
	dirty,
	get_slot_changes_fn,
	get_slot_context_fn
) {
	const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
	update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn);
}

/** @returns {any[] | -1} */
function get_all_dirty_from_scope($$scope) {
	if ($$scope.ctx.length > 32) {
		const dirty = [];
		const length = $$scope.ctx.length / 32;
		for (let i = 0; i < length; i++) {
			dirty[i] = -1;
		}
		return dirty;
	}
	return -1;
}

/** @returns {{}} */
function exclude_internal_props(props) {
	const result = {};
	for (const k in props) if (k[0] !== '$') result[k] = props[k];
	return result;
}

/** @returns {{}} */
function compute_rest_props(props, keys) {
	const rest = {};
	keys = new Set(keys);
	for (const k in props) if (!keys.has(k) && k[0] !== '$') rest[k] = props[k];
	return rest;
}

/** @returns {{}} */
function compute_slots(slots) {
	const result = {};
	for (const key in slots) {
		result[key] = true;
	}
	return result;
}

/** @returns {(this: any, ...args: any[]) => void} */
function once(fn) {
	let ran = false;
	return function (...args) {
		if (ran) return;
		ran = true;
		fn.call(this, ...args);
	};
}

function null_to_empty(value) {
	return value == null ? '' : value;
}

function set_store_value(store, ret, value) {
	store.set(value);
	return ret;
}

const has_prop = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

function action_destroyer(action_result) {
	return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

/** @param {number | string} value
 * @returns {[number, string]}
 */
function split_css_unit(value) {
	const split = typeof value === 'string' && value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
	return split ? [parseFloat(split[1]), split[2] || 'px'] : [/** @type {number} */ (value), 'px'];
}

const contenteditable_truthy_values = ['', true, 1, 'true', 'contenteditable'];


/***/ }),

/***/ "./node_modules/svelte/src/shared/boolean_attributes.js":
/*!**************************************************************!*\
  !*** ./node_modules/svelte/src/shared/boolean_attributes.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boolean_attributes": () => (/* binding */ boolean_attributes)
/* harmony export */ });
const _boolean_attributes = /** @type {const} */ ([
	'allowfullscreen',
	'allowpaymentrequest',
	'async',
	'autofocus',
	'autoplay',
	'checked',
	'controls',
	'default',
	'defer',
	'disabled',
	'formnovalidate',
	'hidden',
	'inert',
	'ismap',
	'loop',
	'multiple',
	'muted',
	'nomodule',
	'novalidate',
	'open',
	'playsinline',
	'readonly',
	'required',
	'reversed',
	'selected'
]);

/**
 * List of HTML boolean attributes (e.g. `<input disabled>`).
 * Source: https://html.spec.whatwg.org/multipage/indices.html
 *
 * @type {Set<string>}
 */
const boolean_attributes = new Set([..._boolean_attributes]);

/** @typedef {typeof _boolean_attributes[number]} BooleanAttributes */


/***/ }),

/***/ "./node_modules/svelte/src/shared/utils/names.js":
/*!*******************************************************!*\
  !*** ./node_modules/svelte/src/shared/utils/names.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "is_html": () => (/* binding */ is_html),
/* harmony export */   "is_svg": () => (/* binding */ is_svg),
/* harmony export */   "is_void": () => (/* binding */ is_void)
/* harmony export */ });
/** regex of all html void element names */
const void_element_names =
	/^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;

/** regex of all html element names. svg and math are omitted because they belong to the svg elements namespace */
const html_element_names =
	/^(?:a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|main|map|mark|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|template|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr)$/;

/** regex of all svg element names */
const svg =
	/^(?:altGlyph|altGlyphDef|altGlyphItem|animate|animateColor|animateMotion|animateTransform|circle|clipPath|color-profile|cursor|defs|desc|discard|ellipse|feBlend|feColorMatrix|feComponentTransfer|feComposite|feConvolveMatrix|feDiffuseLighting|feDisplacementMap|feDistantLight|feDropShadow|feFlood|feFuncA|feFuncB|feFuncG|feFuncR|feGaussianBlur|feImage|feMerge|feMergeNode|feMorphology|feOffset|fePointLight|feSpecularLighting|feSpotLight|feTile|feTurbulence|filter|font|font-face|font-face-format|font-face-name|font-face-src|font-face-uri|foreignObject|g|glyph|glyphRef|hatch|hatchpath|hkern|image|line|linearGradient|marker|mask|mesh|meshgradient|meshpatch|meshrow|metadata|missing-glyph|mpath|path|pattern|polygon|polyline|radialGradient|rect|set|solidcolor|stop|svg|switch|symbol|text|textPath|tref|tspan|unknown|use|view|vkern)$/;

/**
 * @param {string} name
 * @returns {boolean}
 */
function is_void(name) {
	return void_element_names.test(name) || name.toLowerCase() === '!doctype';
}

/**
 * @param {string} name
 * @returns {boolean}
 */
function is_html(name) {
	return html_element_names.test(name);
}

/**
 * @param {string} name
 * @returns {boolean}
 */
function is_svg(name) {
	return svg.test(name);
}


/***/ }),

/***/ "./node_modules/svelte/src/shared/version.js":
/*!***************************************************!*\
  !*** ./node_modules/svelte/src/shared/version.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PUBLIC_VERSION": () => (/* binding */ PUBLIC_VERSION),
/* harmony export */   "VERSION": () => (/* binding */ VERSION)
/* harmony export */ });
// generated during release, do not modify

/**
 * The current version, as set in package.json.
 *
 * https://svelte.dev/docs/svelte-compiler#svelte-version
 * @type {string}
 */
const VERSION = '4.2.1';
const PUBLIC_VERSION = '4';


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./static/components/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppealForm_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppealForm/controller */ "./static/components/AppealForm/controller.js");
/* harmony import */ var _Counter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Counter */ "./static/components/Counter/index.js");
/* harmony import */ var _AppealFormDos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppealFormDos */ "./static/components/AppealFormDos/index.js");



(0,_AppealForm_controller__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;