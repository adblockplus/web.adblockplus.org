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
      amount = (0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.getCentNumber)(currency, parseFloat(input.value === "" ? input.placeholder : input.value));
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

  // temporarily adding the update premium reward feature to installed for testing
  setRewardDuration(currency, amount, duration) {
    let baseTranslation;
    if (duration > 12) {
      baseTranslation = adblock.strings["update-payment-reward__n-years"];
    } else if (duration == 12) {
      baseTranslation = adblock.strings["update-payment-reward__1-year"];
    } else if (duration > 1) {
      baseTranslation = adblock.strings["update-payment-reward__n-months"];
    } else if (duration == 1) {
      baseTranslation = adblock.strings["update-payment-reward__1-month"];
    } else {
      baseTranslation = adblock.strings["update-payment-reward"];
    }
    document.querySelector(".update-payment-reward__text").innerHTML = baseTranslation.replace(`<span>35.00</span>`, `<span class="amount">${(0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.getDollarString)(currency, amount)}</span>`).replace(`<span>Adblock Plus Premium</span>`, `<span class="product">${adblock.strings["product__premium"]}</span>`).replace(`<span>8</span>`, `<span class="duration">${Math.floor(duration > 12 ? duration / 12 : duration)}</span>`);
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
        input.placeholder = String((0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.getDollarNumber)(currency, Object.keys(_classPrivateFieldGet(this, _paddleConfig).products[currency][frequency])[3]));
        input.dataset.minimum = (0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.getDollarNumber)(currency, _classPrivateFieldGet(this, _paddleConfig).products[currency][frequency][amount]);
        radio.dataset.product = "custom";
      } else {
        control.querySelector(".appeal-form-amount__text").textContent = (0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.getDollarString)(currency, amount);
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
    this.events.fire(AppealForm.EVENTS.AMOUNT_CHANGE);
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
    currency: typeof adblock == "object" ? adblock.settings.defaultCurrency || "USD" : "USD",
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
/* harmony export */   "getCentNumber": () => (/* binding */ getCentNumber),
/* harmony export */   "getDollarNumber": () => (/* binding */ getDollarNumber),
/* harmony export */   "getDollarString": () => (/* binding */ getDollarString),
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
function getDollarNumber(currency, centAmountString) {
  const centAmountNumber = parseInt(centAmountString, 10);
  return currency == "JPY" ? centAmountNumber : centAmountNumber / 100;
}
function getCentNumber(currency, dollarString) {
  const dollarNumber = parseFloat(dollarString);
  return currency == "JPY" ? dollarNumber : dollarNumber * 100;
}
function getDollarString(currency, centAmountString) {
  const dollarNumber = getDollarNumber(currency, centAmountString);
  const formatOptions = {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol'
  };
  if (dollarNumber % 1 === 0) {
    formatOptions.minimumFractionDigits = 0;
    formatOptions.maximumFractionDigits = 0;
  }
  const language = String(document.documentElement.lang) || "en";
  return new Intl.NumberFormat(language.replace("_", "-"), formatOptions).format(dollarNumber);
}

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
/*!****************************************************!*\
  !*** ./static/components/AppealForm/controller.js ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _configuration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configuration.js */ "./static/components/AppealForm/configuration.js");
/* harmony import */ var _AppealForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppealForm.js */ "./static/components/AppealForm/AppealForm.js");
/* global adblock, eyeo, Paddle */



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
let upsellPremium = document.documentElement.dataset.page == "installed" && !adblock.settings.restrictPremium;
const rewardController = adblock.runtime.rewardController = {};
const getReward = rewardController.getReward = (currency, frequency, amount) => {
  let plan = "ME";
  let months;
  if (frequency == "once") {
    const amountNumerator = parseInt(amount, 10);
    const onceDenominator = parseInt(Object.keys(paddleConfig.products[currency].once)[2], 10);
    const monthlyDenominator = parseInt(Object.keys(paddleConfig.products[currency].monthly)[0], 10);
    if (amountNumerator < onceDenominator) {
      months = Math.floor(amountNumerator / monthlyDenominator);
    } else {
      months = 12 * Math.floor(amountNumerator / onceDenominator);
    }
  }
  return {
    plan,
    months
  };
};
const updateReward = rewardController.renderReward = () => {
  const {
    currency,
    frequency,
    product,
    amount
  } = appealForm.state();
  if (!upsellPremium) return;
  document.querySelector(".update-payment-reward").removeAttribute("hidden");
  eyeo.payment.productId = "ME";
  const frequencySuffixes = {
    "once": "",
    "monthly": adblock.strings["suffix__monthly"],
    "yearly": adblock.strings["suffix__yearly"]
  };
  const {
    plan,
    months
  } = getReward(currency, frequency, amount);
  const planName = adblock.strings["adblock__premium"];
  const suffix = frequencySuffixes[frequency];
  appealForm.setRewardDuration(currency, amount, months);
  localStorage.setItem("planinfo", JSON.stringify({
    durationMonths: months,
    plan
  }));
  localStorage.setItem("purchaseinfo", JSON.stringify({
    amount,
    frequency,
    plan,
    suffix,
    planName
  }));
};
appealForm.events.on(_AppealForm_js__WEBPACK_IMPORTED_MODULE_1__.AppealForm.EVENTS.AMOUNT_CHANGE, updateReward);
appealForm.events.on(_AppealForm_js__WEBPACK_IMPORTED_MODULE_1__.AppealForm.EVENTS.CURRENCY_CHANGE, updateReward);
updateReward();
appealForm.events.on(_AppealForm_js__WEBPACK_IMPORTED_MODULE_1__.AppealForm.EVENTS.SUBMIT, data => {
  appealForm.disable();
  let productId = eyeo.payment.productId;
  let paymentCompleteUrl = eyeo.payment.paymentCompleteUrl;
  if (productId == "ME") paymentCompleteUrl = "https://accounts.adblockplus.org/premium";
  const language = document.documentElement.lang || "en";
  const clickTimestamp = Date.now();
  const contributionInfo = JSON.stringify({
    amount: data.amount,
    frequency: data.frequency,
    processor: "paddle",
    currency: data.currency,
    lang: document.documentElement.lang,
    source: document.documentElement.getAttribute("data-page"),
    clickTs: clickTimestamp
  });
  const successParameters = new URLSearchParams();
  if (productId == "ME") {
    const _userid = forceGetUserId();
    successParameters.set("premium-checkout__handoff", 1);
    successParameters.set("premium-checkout__flow", document.documentElement.getAttribute("data-page"));
    successParameters.set("premium-checkout__userid", _userid);
    successParameters.set("premium-checkout__currency", data.currency);
    successParameters.set("premium-checkout__amount", data.amount);
    successParameters.set("premium-checkout__frequency", data.frequency);
    successParameters.set("premium-checkout__language", language);
    successParameters.set("premium-checkout__timestamp", clickTimestamp);
  }

  // Storing information to be consumed by optimizely and hotjar experiments
  if (eyeo.payment.shouldStoreContributionInfo) {
    localStorage.setItem("contributionInfo", contributionInfo);
  }
  let successURL = paymentCompleteUrl || "/payment-complete";
  if (false == successURL.startsWith("https://")) successURL = `/${language}/${successURL}`;
  const passthrough = {
    testmode: isTestmode,
    userid: productId == "ME" ? forceGetUserId() : "",
    tracking: recordTracking(),
    locale: "",
    country: adblock.settings.country || "unknown",
    ga_id: "",
    premium: productId == "ME" ? "true" : "false",
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
    success_url: `${successURL}?${successParameters.toString()}`,
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
})();

/******/ })()
;