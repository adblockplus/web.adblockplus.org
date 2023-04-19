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
/* global adblock */

const formTemplate = document.getElementById("appeal-form");
const frequencyTemplate = document.getElementById("appeal-form-frequency");
const fixedAmountTemplate = document.getElementById("appeal-form-amount--fixed");
const customAmountTemplate = document.getElementById("appeal-form-amount--custom");

function getLanguage() {
  // prefer navigator language to settings language so that more specific language variants can differentiate currencies
  // e.g. 10 USD in "en" is $10 but 10 USD in "en-CA" is US$10
  return (navigator.language || adblock.settings.language).replace("_", "-");
}

function toDollarNumber(currency, cents) {
  return currency == "JPY" ? cents : cents / 100;
}

function toCentsNumber(currency, dollars) {
  return currency == "JPY" ? dollars : dollars * 100;
}

function toDollarString(currency, cents) {
  return new Intl.NumberFormat(
    getLanguage(),
    { style: "currency", currency, minimumFractionDigits: 0 }
  ).format(toDollarNumber(currency, cents));
}

class AppealForm {

  #paddleConfiguration;

  #formConfiguration;

  #form;

  #currencySelect;

  #frequencies;

  #error;

  constructor({placeholder, paddleConfiguration, formConfiguration}) {
    this.#paddleConfiguration = paddleConfiguration;
    this.#formConfiguration = formConfiguration;
    this.#constructForm()
    this.#constructCurrencies();
    this.#constructFrequencies();
    this.#error = this.#form.querySelector(".appeal-form__error");
    placeholder.replaceWith(this.#form);
  }

  #constructForm() {
    this.#form = formTemplate.content.cloneNode(true).firstElementChild;
    this.#form.querySelector(".appeal-form-header__heading").innerHTML = adblock.strings["appeal-form-header__heading"];
    this.#form.querySelector(".appeal-form-checkout__submit span").innerHTML = adblock.strings["appeal-form-checkout__submit"]
    this.#form.addEventListener("submit", event => this.#onSubmit(event));
  }

  #constructCurrencies() {
    this.#currencySelect = this.#form.querySelector(".appeal-form-header__select");
    for (const currency in this.#paddleConfiguration.products) {
      const option = document.createElement("option");
      option.textContent = currency;
      this.#currencySelect.appendChild(option);
    }
    this.#currencySelect.value = this.#formConfiguration.currency;
    this.#currencySelect.addEventListener("change", event => this.#onCurrencyChange(event));
  }

  #constructFrequencies() {
    this.#frequencies = this.#form.querySelector(".appeal-form-frequencies");
    this.#replaceFrequencies(this.#formConfiguration.currency);
    this.#frequencies.querySelectorAll(".appeal-form-amount__radio")[this.#formConfiguration.selected].checked = true;
    this.#frequencies.addEventListener("focusin", event => this.#onAmountFocusin(event));
    this.#frequencies.addEventListener("input", event => this.#handleAmountInput(event));
  }

  #replaceFrequencies(currency) {
    const frequencies = [];
    for (const frequency in this.#paddleConfiguration.products[currency]) {
      const frequencySection = frequencyTemplate.content.cloneNode(true).firstElementChild;
      frequencySection.querySelector(".appeal-form-frequency__heading").innerHTML = adblock.strings[`appeal-form-frequency__heading--${frequency}`];
      const amountsParent = frequencySection.querySelector(".appeal-form-amounts");
      for (const amount in this.#paddleConfiguration.products[currency][frequency]) {
        if (amount == "custom") {
          const customAmount = customAmountTemplate.content.cloneNode(true).firstElementChild;
          const input = customAmount.querySelector(".appeal-form-amount__input");
          input.placeholder = toDollarString(currency, Object.keys(this.#paddleConfiguration.products[currency][frequency])[3]);
          input.min = toDollarNumber(currency, this.#paddleConfiguration.products[currency][frequency][amount]);
          input.dataset.frequency = frequency;
          input.dataset.product = "custom";
          input.dataset.value = customAmount;
          amountsParent.appendChild(customAmount);
        } else {
          const fixedAmount = fixedAmountTemplate.content.cloneNode(true).firstElementChild;
          fixedAmount.querySelector(".appeal-form-amount__text").textContent = toDollarString(currency, amount);
          const radio = fixedAmount.querySelector(".appeal-form-amount__radio");
          radio.value = amount;
          radio.dataset.frequency = frequency;
          radio.dataset.product = this.#paddleConfiguration.products[currency][frequency][amount];
          amountsParent.appendChild(fixedAmount);
        }
      }
      frequencies.push(frequencySection);
    }
    this.#frequencies.replaceChildren(...frequencies);
  }

  #onCurrencyChange(event) {
    const inputValues = Array.from(this.#frequencies.querySelectorAll(".appeal-form-amount__input")).map(element => element.value);
    const selectedRadio = Array.from(this.#frequencies.querySelectorAll(".appeal-form-amount__radio")).find(element => element.checked);
    const selectedRadioIndex = Array.from(this.#frequencies.querySelectorAll(".appeal-form-amount__radio")).findIndex(element => element.checked);
    this.#replaceFrequencies(event.currentTarget.value);
    this.#frequencies.querySelectorAll(".appeal-form-amount__input").forEach((input, i) => input.value = inputValues[i]);
    this.#frequencies.querySelectorAll(".appeal-form-amount__radio")[selectedRadioIndex].checked = true;
    if (selectedRadio.value == "custom") {
      this.#handleInputError(
        selectedRadio.parentElement.querySelector(".appeal-form-amount__input")
      );
    }
  }

  #handleInputError(target) {
    const targetValue = parseFloat(target.value);
    const targetMinimum = parseFloat(target.min);
    if (targetValue && targetValue < targetMinimum) {
      const minimumAmount = parseFloat(target.min);
      const numberFormat = new Intl.NumberFormat(
        getLanguage(), {
          style: "currency",
          currency: this.#currencySelect.value
      });
      this.#error.innerHTML = adblock.strings[`appeal-form__error--${target.dataset.frequency}`].replace(
        '<span class="amount"></span>',
        numberFormat.format(minimumAmount)
      );
      this.#error.hidden = false;
    } else {
      this.#error.hidden = true;
    }
  }

  #onAmountFocusin(event) {
    if (event.target.type == "number") {
      const radio = event.target.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__radio");
      if (false == radio.checked) radio.checked = true;
    }
    if (event.target.type == "number" || event.target.type == "radio") {
      this.#handleInputError(event.target);
    }
  }

  #handleAmountInput(event) {
    if (event.target.type == "number") {
      this.#handleInputError(event.target);
    }
  }

  #submitCallbacks = [];

  onSubmit(callback) {
    this.#submitCallbacks.push(callback);
  }

  #onSubmit(event) { 
    event.preventDefault();
    const currency = this.#currencySelect.value;
    let selected = this.#frequencies.querySelector(":checked");
    let amount = selected.value;
    if (amount == "custom") {
      selected = selected.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__input");
      amount = toCentsNumber(currency, parseFloat(selected.value));
    }
    const frequency = selected.dataset.frequency;
    const product = selected.dataset.product;
    this.#submitCallbacks.forEach(callback => callback({
      currency, 
      frequency, 
      amount, 
      product,
    }));
  }

  disable() {
    this.#form.classList.add("appeal-form--disabled");
    this.#form.querySelectorAll("input, button").forEach(field => { field.disabled = true; });
  }

  enable() {
    this.#form.classList.remove("appeal-form--disabled");
    this.#form.querySelectorAll("input, button").forEach(field => { field.disabled = false; });
  }

}

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
        },
      },
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
        },
      },
    },
  },
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




const SANDBOX_HOSTNAMES = [
  /^localhost$/,
  /^[\w\-]+.staging-new-adblockplus-org-1.uplink.eyeo.it$/,
  /^dev--adblockplus-org--[\w\-]+.web.app$/,
];

let paddleConfiguration = SANDBOX_HOSTNAMES.some((originPattern) => {
  return originPattern.test(location.hostname)
}) ? _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.sandbox : _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.live;

if (
  // For compatibility with AdBlock
  adblock.searchParameters.has("testmode")
  || adblock.searchParameters.get("mode") == "test"
) {
  paddleConfiguration = _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.sandbox;
} else if (adblock.searchParameters.get("mode") == "live") {
  paddleConfiguration = _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.live;
}

const isTestmode = paddleConfiguration == _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.sandbox;

if (isTestmode) {
  Paddle.Environment.set("sandbox");
}

Paddle.Setup({ vendor: paddleConfiguration.vendor });

const appealForm = new _AppealForm_js__WEBPACK_IMPORTED_MODULE_1__.AppealForm({
  paddleConfiguration,
  formConfiguration: _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.AppealForm,
  placeholder: document.querySelector(".appeal-form"),
});

appealForm.onSubmit((data) => {

  appealForm.disable();

  // Storing information to be consumed by optimizely and hotjar experiments
  if (eyeo && eyeo.payment && eyeo.payment.shouldStoreContributionInfo) {
    localStorage.setItem("contributionInfo", JSON.stringify({
      amount: data.amount,
      frequency: data.frequency,
      processor: "paddle",
      currency: data.currency,
      lang: document.documentElement.lang,
      source: eyeo.payment.sourceId || "U",
      clickTs: Date.now(),
    }));
  }

  const omitUserId = true;

  const passthrough = {
    testmode: isTestmode,
    userid: "",
    tracking: recordTracking(omitUserId),
    locale: "",
    country: "unknown",
    ga_id: "",
    premium: "false",
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
    success_url: `${location.origin}/payment-complete`,
    cancel_url: location.href,
  };

  const product = data.product;

  const checkoutOptions = {
    locale: adblock.settings.language,
    title: adblock.strings["appeal-form-checkout__title"],
    success: passthrough.success_url,
    closeCallback: () => { appealForm.enable(); },
  };

  if (product == "custom") {
    fetch("https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passthrough),
    })
    .then(response => response.json())
    .then(session => {
      if (session.hasOwnProperty("success") && session.success == false) {
        throw new Error(
          adblock.strings["error--unexpected"]
        );  
      }
      Paddle.Checkout.open(Object.assign(checkoutOptions, {
        override: session.url,
      }));
    })
    .catch((error) => {
      adblock.error(adblock.strings["error--unexpected"]);
    });
  } else {
    Paddle.Checkout.open(Object.assign(checkoutOptions, {
      allowQuantity: false,
      passthrough,
      product,
    }));
  }
  
});
})();

/******/ })()
;