/*
buildPaymentMetadata: takes four params:
    obj to be modified,
    currency (default USD),
    recurring (default false),
    subType (default monthly)
    fn Adds metadata properties to obj directly.
*/
function buildPaymentMetadata(obj, curr, recurring, subType, product) {
    obj.userid = getUserId();
    obj.tracking = recordTracking() || "";
    obj.locale = getLanguage();
    obj.country = getCountryCode();
    obj.ga_id = getGAID();
    obj.premium = "false";
    obj.premium_cid = "0";
    obj.premium_sid = "0";
    obj.currency = curr;
    obj.recurring = recurring;
    obj.subType = "";
    obj.experiment = null;
    obj.experiment_id = null;
    obj.variant = null;
    obj.variant_index = null;

    if (recurring === true) {
      /* subType is one of "monthly" "yearly" and only has an
       * effect if recurring is True */
      obj.subType = subType;
    }
    if (product !== null) {
        obj.product = product;
    }

    if (typeof isPremium === "function" && isPremium()) {
        obj.premium = "true";
        obj.premium_cid = getPremiumCid();
        obj.premium_sid = getPremiumSid();
    }
    if (typeof _experiment !== 'undefined') {
        obj.experiment = _experiment.name('Paddle');
        obj.experiment_id = _experiment.experimentId('Paddle');
        obj.variant = _experiment.variant('Paddle');
        obj.variant_index = _experiment.variantIndex('Paddle');
    }
}
/* queryString creates a string of "key=value" from an object of key:value 
    => "key=value" pairs are concatenated with "&"
    => string is prepended with a "?"
    => returns empty string for empty object, non-object, null, or undefined.
*/
function queryString(obj) {
    if (obj === null || typeof obj !== "object") { return ""; }
    var concatenated = Object.keys(obj).map(function(key) {
        return [key, obj[key]].join("=");
    }).join("&"); 
    if (concatenated.length > 0) { 
        return "&" + concatenated; 
    } else {
        return "";
    }
}
/* validateThankYouPage checks thePage for a URL and query params and returns them if they exist
    => if no URL, or missing query params, it returns a default and warns if query parameters are being ignored
*/
function validateThankYouPage(thePage) { // VALIDATE that queryParams exists
    var defaultPage = { url: "https://adblockplus.org/payment-complete", queryParams: {} };
    if (thePage !== null && typeof thePage === "object") {
        if (thePage.url && typeof thePage.url === "string" && thePage.url.length !== 0) {
            if (thePage.queryParams && typeof thePage.queryParams === "object") {
                return thePage;
            }
        } else if (thePage.queryParams) {
            if (typeof _logV2Error == "function") _logV2Error("Custom thank you page query params and window opening behavior ignored: no URL specified.");
        }
    } 
    return defaultPage;
}

/*
If amount and currency match this map (TODO this is just for sandbox) then use the product ID directly
rather than sending a request to generate-pay-link (as it's faster).
*/

// This map is in strings of amount cents (to not have to deal with decimals...)
const currencyFrequencyAmountToPaddleProductIdDev = {
    "USD": {
        "once": {
            "500": 34508,
            "1000": 34509,
            "2000": 34510,
            "3500": 34511,
            "5000": 34512
        },
        "monthly": {
            "199": 34514,
            "299": 34515,
            "399": 34516,
            "499": 34517,
            "999": 34518
        },
        "yearly": {
            "500": 34519,
            "1000": 34520,
            "2000": 34521,
            "3500": 34522,
            "5000": 34523
        }
    },
    "AUD": {
        "once": {
            "500": 34524,
            "1000": 34525,
            "2000": 34526,
            "3500": 34527,
            "5000": 34528
        },
        "monthly": {
            "199": 34529,
            "299": 34530,
            "399": 34531,
            "499": 34532,
            "999": 34533
        },
        "yearly": {
            "500": 34534,
            "1000": 34535,
            "2000": 34536,
            "3500": 34537,
            "5000": 34538
        }
    },
    "CAD": {
        "once": {
            "500": 34539,
            "1000": 34540,
            "2000": 34541,
            "3500": 34542,
            "5000": 34543
        },
        "monthly": {
            "199": 34545,
            "299": 34546,
            "399": 34547,
            "499": 34548,
            "999": 34549
        },
        "yearly": {
            "500": 34550,
            "1000": 34551,
            "2000": 34552,
            "3500": 34553,
            "5000": 34554
        }
    },
    "EUR": {
        "once": {
            "500": 34555,
            "1000": 34556,
            "2000": 34557,
            "3500": 34558,
            "5000": 34559
        },
        "monthly": {
            "199": 34560,
            "299": 34561,
            "399": 34562,
            "499": 34563,
            "999": 34564
        },
        "yearly": {
            "500": 34565,
            "1000": 34566,
            "2000": 34567,
            "3500": 34568,
            "5000": 34569
        }
    },
    "GBP": {
        "once": {
            "500": 34570,
            "1000": 34571,
            "2000": 34572,
            "3500": 34573,
            "5000": 34574
        },
        "monthly": {
            "199": 34575,
            "299": 34576,
            "399": 34577,
            "499": 34578,
            "999": 34579
        },
        "yearly": {
            "500": 34580,
            "1000": 34581,
            "2000": 34582,
            "3500": 34583,
            "5000": 34584
        }
    },
    "JPY": {
        "once": {
            "500": 34585,
            "1000": 34586,
            "1500": 34587,
            "3000": 34588,
            "5000": 34589
        },
        "monthly": {
            "200": 34590,
            "300": 34591,
            "500": 34592,
            "1000": 34593,
            "1500": 34594
        },
        "yearly": {
            "500": 34595,
            "1000": 34596,
            "1500": 34597,
            "3000": 34598,
            "5000": 34599
        }
    },
    "MXN": {
        "once": {
            "10000": 34600,
            "20000": 34601,
            "30000": 34602,
            "50000": 34603,
            "60000": 34604
        },
        "monthly": {
            "4000": 34605,
            "6000": 34606,
            "8000": 34607,
            "10000": 34608,
            "20000": 34609
        },
        "yearly": {
            "10000": 34610,
            "20000": 34611,
            "30000": 34612,
            "50000": 34613,
            "60000": 34614
        }
    },
    "RUB": {
        "once": {
            "25000": 34615,
            "40000": 34616,
            "50000": 34617,
            "100000": 34618,
            "200000": 34619
        },
        "monthly": {
            "15000": 34620,
            "25000": 34621,
            "40000": 34622,
            "50000": 34623,
            "100000": 34624
        },
        "yearly": {
            "25000": 34625,
            "40000": 34626,
            "50000": 34627,
            "100000": 34628,
            "200000": 34629
        }
    }
};

const currencyFrequencyAmountToPaddleProductIdProd = {
    "USD": {
        "once": {
            "500": 790804,
            "1000": 790807,
            "2000": 790808,
            "3500": 790809,
            "5000": 790811
        },
        "monthly": {
            "199": 787466,
            "299": 787467,
            "399": 787468,
            "499": 787469,
            "999": 787470
        },
        "yearly": {
            "500": 787471,
            "1000": 787472,
            "2000": 787473,
            "3500": 787474,
            "5000": 787475
        }
    },
    "AUD": {
        "once": {
            "500": 790813,
            "1000": 790814,
            "2000": 790815,
            "3500": 790816,
            "5000": 790817
        },
        "monthly": {
            "199": 787485,
            "299": 787487,
            "399": 787488,
            "499": 787489,
            "999": 787490
        },
        "yearly": {
            "500": 787491,
            "1000": 787492,
            "2000": 787493,
            "3500": 787494,
            "5000": 787495
        }
    },
    "CAD": {
        "once": {
            "500": 790818,
            "1000": 790819,
            "2000": 790820,
            "3500": 790821,
            "5000": 790822
        },
        "monthly": {
            "199": 787501,
            "299": 787502,
            "399": 787503,
            "499": 787504,
            "999": 787505
        },
        "yearly": {
            "500": 787506,
            "1000": 787507,
            "2000": 787508,
            "3500": 787509,
            "5000": 787510
        }
    },
    "EUR": {
        "once": {
            "500": 790823,
            "1000": 790824,
            "2000": 790825,
            "3500": 790826,
            "5000": 790827
        },
        "monthly": {
            "199": 787516,
            "299": 787517,
            "399": 787518,
            "499": 787520,
            "999": 787521
        },
        "yearly": {
            "500": 787522,
            "1000": 787523,
            "2000": 787524,
            "3500": 787525,
            "5000": 787526
        }
    },
    "GBP": {
        "once": {
            "500": 790828,
            "1000": 790829,
            "2000": 790830,
            "3500": 790831,
            "5000": 790833
        },
        "monthly": {
            "199": 787533,
            "299": 787534,
            "399": 787535,
            "499": 787536,
            "999": 787537
        },
        "yearly": {
            "500": 787538,
            "1000": 787539,
            "2000": 787540,
            "3500": 787541,
            "5000": 787542
        }
    },
    "JPY": {
        "once": {
            "500": 790834,
            "1000": 790835,
            "1500": 790836,
            "3000": 790837,
            "5000": 790838
        },
        "monthly": {
            "200": 787548,
            "300": 787549,
            "500": 787550,
            "1000": 787551,
            "1500": 787552
        },
        "yearly": {
            "500": 787553,
            "1000": 787554,
            "1500": 787555,
            "3000": 787556,
            "5000": 787557
        }
    },
    "MXN": {
        "once": {
            "10000": 790839,
            "20000": 790840,
            "30000": 790841,
            "50000": 790842,
            "60000": 790843
        },
        "monthly": {
            "4000": 787563,
            "6000": 787564,
            "8000": 787565,
            "10000": 787566,
            "20000": 787567
        },
        "yearly": {
            "10000": 787568,
            "20000": 787569,
            "30000": 787570,
            "50000": 787571,
            "60000": 787572
        }
    },
    "RUB": {
        "once": {
            "25000": 790844,
            "40000": 790845,
            "50000": 790846,
            "100000": 790847,
            "200000": 790848
        },
        "monthly": {
            "15000": 787579,
            "25000": 787580,
            "40000": 787581,
            "50000": 787583,
            "100000": 787584
        },
        "yearly": {
            "25000": 787585,
            "40000": 787586,
            "50000": 787587,
            "100000": 787588,
            "200000": 787589
        }
    }
};

/*
PaddlePaymentLink
The new Paddle Checkout.

TODO remove CHF they don't support it right now.

TODO based on testmode flag, look up a different currencyFrequencyAmountToPaddleProductId
map for sandbox vs livemode

TODO based on testmode flag be sure backend is selectnig right product ids too

*/
const PaddleCheckout = {
    init: function (settings) {
        this.DATA = {
            testmode: settings.testmode || false,
        };
        const AUX_KEYS = {
            LIVE: {
                key: "pk_live_Zr0d52ZJA1wFGrhLGcIT2ZhB",
                charge_url: "https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",
            },
            TEST: {
                key: "pk_test_iqOTH7z37sT1seSKNzhhKzUu",
                charge_url: "https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",
            }
        };
        this._settings = settings;
        this._keys = AUX_KEYS;
        this.AUX = (settings.testmode ? this._keys.TEST : this._keys.LIVE);
        this._submitButtonId = settings.submitButtonId || null;
        this._title = typeof settings.title === 'function' ? settings.title : function() { return "AdBlock" };
        this._elementChangeListener = settings.elementChangeListener || false;
        this._onSuccessURL = settings.onSuccessURL || 'https://adblockplus.org/payment-complete';
        this._onErrorCb = settings.onErrorCb || function (msg) { alert("Sorry, but there was a problem:\n\n" + msg + "\n\nPlease try again."); };
        this._getAmountCents = settings.getAmountCents;
        this._currency = typeof settings.currency === 'function' ? settings.currency : function() {return "USD";};
        this._locale = typeof settings.locale === 'function' ? settings.locale : function() {return "en";};
        this._recurring = typeof settings.recurring === 'function' ? settings.recurring : function() {return false;};
        this._getSubType = typeof settings.subType === 'function' ? settings.subType : function() {return "monthly";};
        this._buttonClickPreCheck = typeof settings.buttonClickPreCheck === 'function' ? settings.buttonClickPreCheck : function() {return true;};
        this._buttonClickCallback = typeof settings.buttonClickCallback === 'function' ? settings.buttonClickCallback : function() { };
        this._getProduct = typeof settings.getProduct === 'function' ? settings.getProduct : function() { return null; };
        this._getProductId = typeof settings.getProductId === 'function' ? settings.getProductId : function() { return null; };
        this._save = typeof settings.save === 'function' ? settings.save : function() { return null; };
        this._init();
        return this;
    },
    _init: function () {
        var that = this;
        if (that._submitButtonId === null) {
            console.error("PaddleCheckout failure: no _submitButtonId");
            return;
        }

        const sandboxVendorID = 11004;
        const prodVendorID = 164164;
        if (that.DATA.testmode) {
            Paddle.Environment.set('sandbox');
            Paddle.Setup({ vendor: sandboxVendorID });
        } else {
            Paddle.Setup({ vendor: prodVendorID });
        }
        // List of locales supported by Paddle:
        // https://developer.paddle.com/reference/ZG9jOjI1MzU0MDI0-supported-locales
        const paddleLocalesMap = {
            "ar": "ar",
            "zh_CN": "zh-Hans",
            "sv": "da",
            "nl": "nl",
            "fr": "fr",
            "de": "de",
            "it": "it",
            "ja": "ja",
            "ko": "ko",
            "no": "no",
            "pl": "pl",
            "pt_BR": "pt",
            "ru": "ru",
            "es": "es",
            "sv": "sv",
            "ko_KR": "ko",
            "pl_PL": "pl",
            "pt": "pt",
            "en": "en",
            "ca": "en",
            "uk": "en",
        }
        // Add event listeners to all checkout submit buttons with the given class name
        $(`#${this._submitButtonId}`).on("click", function() { 
            buildPaymentMetadata(that.DATA, that._currency(), that._recurring(), that._getSubType(), that._getProduct());
            that.DATA.amount_cents = that._getAmountCents();
            if (typeof _logV2PaymentButtonClick == "function") _logV2PaymentButtonClick("Paddle", that.DATA.amount_cents, "Stripe", that._recurring(), that._getSubType());
            that._save();
            that.DATA.success_url = that._onSuccessURL;
            that.DATA.cancel_url = window.location.href; // the url to go back to if user clicks "back". Will be current page url.

            // If the language on page isn't found on respective Paddle, use Paddle default locale browser detection
            // 'auto' isn't an official API value, but it isn't a valid locale so they default to their own detection.
            page_locale = that._locale();
            that.DATA.locale = page_locale in paddleLocalesMap ? paddleLocalesMap[page_locale] : "auto";

            const isRecurring = that._recurring();
            const amt_cents = String(that.DATA.amount_cents);
            const currency = that._currency();
            const subType = that._getSubType();
            console.log("values", isRecurring, amt_cents, currency, subType);
            const billingFrequency = isRecurring === false ? "once" : subType;

            let maybeProductID = that._getProductId();
            if (maybeProductID === null) {
                try {
                    // OK, so if there is a product ID for the currency, recurring frequency, and amount
                    // then we can open Paddle Checkout immediately without a call to our backend to
                    // generate a Pay Link URL. This is faster, so we do it if we can.
                    const productIdMap = that.DATA.testmode === true ? currencyFrequencyAmountToPaddleProductIdDev : currencyFrequencyAmountToPaddleProductIdProd;
                    maybeProductID = productIdMap[currency][billingFrequency][amt_cents];
                    console.log("got product ID", maybeProductID, "testmode", that.DATA.testmode, "currency, frequency, amount cents", currency, billingFrequency, amt_cents);
                } catch(e) {
                    console.error("could not find product ID...", e);
                } 
            }

            if (maybeProductID) {
                Paddle.Checkout.open({
                    title: that._title(),
                    product: maybeProductID,
                    allowQuantity: false,
                    success: typeof that.DATA.success_url == "function" ? that.DATA.success_url() : that.DATA.success_url,
                    locale: that.DATA.locale,
                    passthrough: that.DATA,
                });
            } else {
                // If there is no product ID for the currency, it means the user has selected a custom
                // amount for one of the currencies for a one-time, monthly, or yearly purchase. In
                // this case, we send a request to the backend in order to fetch a Pay Link URL.

                fetch(that.AUX.charge_url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(that.DATA),
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(session) {
                    Paddle.Checkout.open({
                        override: session.url,
                        title: "Adblock Plus",
                        locale: that.DATA.locale
                    });
                })
                .catch(function(error) {
                    that._onErrorCb(error);
                });
            }
        });
    },
};

