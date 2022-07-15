/*
buildStripeMetadata: takes four params:
    obj to be modified,
    currency (default USD),
    recurring (default false),
    subType (default monthly)
    fn Adds metadata properties to obj directly.
*/
function buildStripeMetadata(obj, curr, recurring, subType, product) {
    obj.userid = getUserId();
    obj.tracking = recordTracking();
    obj.locale = getLanguage();
    obj.country = getCountryCode();
    obj.ga_id = getGAID();
    obj.premium = "false";
    obj.premium_cid = "0";
    obj.premium_sid = "0";
    obj.currency = curr;
    obj.recurring = recurring;
    obj.subType = "";
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
        obj.experiment = _experiment.name('Stripe');
        obj.experiment_id = _experiment.experimentId('Stripe');
        obj.variant = _experiment.variant('Stripe');
        obj.variant_index = _experiment.variantIndex('Stripe');
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
    var defaultPage = { url: "https://getadblock.com/thanks.php", queryParams: {} };
    if (thePage !== null && typeof thePage === "object") {
        if (thePage.url && typeof thePage.url === "string" && thePage.url.length !== 0) {
            if (thePage.queryParams && typeof thePage.queryParams === "object") {
                return thePage;
            }
        } else if (thePage.queryParams) {
            _logV2Error("Custom thank you page query params and window opening behavior ignored: no URL specified.");
        }
    }
    return defaultPage;
}

/*
To use:

Paypal.init(settings); // Makes the button initiate the PayPal payment.

When the payment button is clicked, the user will be directed to PayPal to complete their
purchase.
*/
var Paypal = {
    //  Initialize PayPal button.  settings object contains:
    //    button - DOM object: able to receive 'click' event
    //    getDollarsString - function(): a function that should return the number of
    //      dollars to be charged.  Format is a %.2f string, e.g. "44.50" or "5.00".  May
    //      be called multiple times.
    //    buttonClickPreCheck - function():  Function that is called before button click is
    //      followed through.  Basically lets the users of the object write a function that can
    //      check params, or whatever, to stop the button click from continuing.  E.g. check
    //      that amount is of a certain value.
    init: function(settings) {
        this._settings = settings;
        this.testmode = settings.testmode || false;
        var AUX_LIVE = {
            email: "adblockforchrome@gmail.com",
            url: "https://www.paypal.com/cgi-bin/webscr"
        };
        var AUX_TEST = {
            email: "adblock-sandbox@getadblock.com",
            url: "https://www.sandbox.paypal.com/cgi-bin/webscr"
        };
        this.AUX = (this.testmode ? AUX_TEST : AUX_LIVE);
        if (settings.button != null) {
            $(settings.button).click(function() {
                if (typeof settings.buttonClickPreCheck === "function" && settings.buttonClickPreCheck() === false) {
                // something is wrong, don't continue with PayPal request
                return;
                }
                Paypal.submitForm(this);
                return false;
            });
        }
    },

    submitForm: function(element) {
        if ($(element).hasClass('paypal-button-grey') || $(element).hasClass('disabled')) {
            return false;
        }
        var form = Paypal._buildForm(element);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        var amount = this._settings.getDollarsString(element) * 100;

        var subType = "";
        var isSub = false;
        if (typeof this._settings.recurring === 'function' && this._settings.recurring()) {
            isSub = true;
            if (typeof this._settings.subType === 'function') {
                subType = this._settings.subType();
            }
        }
        _logV2PaymentButtonClick("PayPal", amount, "", isSub, subType);
        if (typeof this._settings.buttonClickCallback === "function") {
            this._settings.buttonClickCallback();
        }
    },

  // Return a jQuery object pointing to a DOM form ready to submit to PayPal.
  _buildForm: function(element) {
        var form = document.createElement('form');
        form.action = this.AUX.url;
        form.method = "post";
        form.name = "_xclick";
        form.target = "_blank";
        var node = document.createElement('input');
        node.type = 'hidden';
        var add = function(name, value) {
            node.name = name;
            node.value = value;
            form.appendChild(node.cloneNode());
        };
        var isMonthly = false;
        var isSub = false;
        if (typeof this._settings.recurring === 'function' && this._settings.recurring()) {
            if (typeof this._settings.subType === 'function') {
                isMonthly = this._settings.subType() === 'monthly';
                isSub = true;
            }
        }
        var curr = typeof this._settings.currency === 'function' ? this._settings.currency() : "USD";
        var itemName = typeof this._settings.itemName === 'function' ? this._settings.itemName(element) : "AdBlock";
        add("item_name", itemName);
        add("cmd", isSub ? "_xclick-subscriptions" : "_xclick");
        add("currency_code", curr);
        add(isSub ? "a3" : "amount", this._settings.getDollarsString(element));
        if (isSub) {
            add("p3", "1"); // subscribe 1
            add("t3", isMonthly ? "M" : "Y"); // month
            add("src", "1"); // recurring
            add("sra", "1"); // try again if payment fails
        }
        var locale = typeof this._settings.locale === 'function' ? this._settings.locale() : "";
        if (locale !== "") {
            add("lc", locale);
        }
        add("no_note", "1");
        var trans_id = Math.floor((Math.random()*10000000)+10000000);
        add("business", this.AUX.email);
        var typ = "";
        typ = validateThankYouPage(this._settings.thankYouPage);
        add("return", typ.url + "?u=" + getUserIdOrUnknown() + queryString(typ.queryParams));
        add("cbt", "Return to AdBlock");
        add("item_number", recordTracking());
        add("custom", getPurchaseMetadata('PayPal', this.testmode));
        var image_url = "https://getadblock.com/images/updateAssets/core_logo_full_60x190.svg";
        if (typeof this._settings.customImageUrl === "string" && this._settings.customImageUrl.length > 0) {
            image_url = this._settings.customImageUrl;
        }
        add("cpp_logo_image", image_url);
        add("image_url", image_url);

        return form;
    }
};

/*
To use:

StripeAB.init(settings); // must be called 1st.  Makes the button respond to clicks.

When thePaymentButton is clicked, a payment to Stripe will be made via the
AdBlock payment server.  settings.onSuccess(new_order_id) will be called when
it succeeds.  If you then request an email address from the user, once you have
it you can call:
*/
var StripeAB = {
    // Initialize StripeAB.  settings object contains:
    //   button - DOM object: able to receive 'click' event
    //   getAmountCents - function(): a function that should return the integer number of
    //     cents to be charged.  May be called multiple times.
    //   onAjaxStart? - function(): called with when AJAX to server starts
    //   onAjaxComplete? - function(): called when AJAX to server ends
    //   onSuccess? - function(new_order_id): called when charge succeeds.  You
    //     might hide the buttons and show an email request form at this point.
    //   onError? - [optional] function(errorMessage): called when either AJAX request to pmt server fails or
    //      pmt itself fails (e.g., wrong CVC, expired CC). Defaults to window.alert(errorMessage)
    //   testmode? - bool: true if Stripe testmode, defaults to false
    //   buttonClickPreCheck? - function():  Function that is called before button click is
    //     followed through.  Basically lets the users of the object write a function that can
    //     check params, or whatever, to stop the button click from continuing.  E.g. check
    //     that amount is of a certain value.
    //   thankYouPage - [optional]: Object that contains the following keys:
    //       => [required, default: "https://getadblock.com/thanks.php"] url (string): page to redirect to *without* any query parameters appended
    //       => [optional, default: {}] queryParams (object): key-value pairs (e.g., {"transid":1234} becomes '&transid=1234')
    //       => [optional, default: false] newWindow (boolean): true => window.open(url) false => window.location.href = url;
    //     If no url is provided, optional parameters are ignored and we fallback to defaults:
    //       => If !chargeResult.success => "https://getadblock.com/thanks.php?u=" + that.DATA.userid;
    //       => Else => "https://getadblock.com/thanks.php?u=" + that.DATA.userid + "&o=" + chargeResult.charge_id;
    // Needed properties:
    //   userid - string: AdBlock userid, access right before submitting purchase using
    //     getUserId()
    init: function (settings) {
        this.DATA = {
            testmode: settings.testmode || false,
        };
        var AUX_LIVE = {
            key: "pk_live_Zr0d52ZJA1wFGrhLGcIT2ZhB",
            charge_url: "https://getadblock.appspot.com/stripe/charges",
        };
        var AUX_TEST = {
            key: "pk_test_iqOTH7z37sT1seSKNzhhKzUu", //adblock's test key
            charge_url: "https://getadblock.appspot.com/stripe/charges", //adblock's charge url
        };

        this.AUX = (settings.testmode ? AUX_TEST : AUX_LIVE);
        this._onAjaxStart = settings.onAjaxStart || function () {};
        this._buttonClickCallback = settings.buttonClickCallback || function () {};
        this._onAjaxComplete = settings.onAjaxComplete || function () {};
        this._getAmountCents = settings.getAmountCents;
        this.onSuccess = settings.onSuccess || undefined;
        this._wireUpButton(settings.button);
        this._buttonClickPreCheck = typeof settings.buttonClickPreCheck === 'function' ? settings.buttonClickPreCheck : function() {return true;};
        this._currency = typeof settings.currency === 'function' ? settings.currency : function() {return "USD"};
        this._locale = typeof settings.locale === 'function' ? settings.locale : function() {return 'en';};
        this._description = typeof settings.description === 'function' ? settings.description : function() {
            return 'Securely processed by Stripe.com';
        }
        this._recurring = typeof settings.recurring === 'function' ? settings.recurring : function() {return false;};
        this._getSubType = typeof settings.subType === 'function' ? settings.subType : function() {return "monthly";};
        this._thankYouPage = validateThankYouPage(settings.thankYouPage);
        this._onCheckoutClose = typeof settings.onCheckoutClose === 'function' ? settings.onCheckoutClose : function () {};
        this._onError = typeof settings.onError === 'function' ? settings.onError : function (msg) {
            alert("Sorry, but there was a problem:\n\n" + msg + "\n\nPlease try again.");
        };
        this._getProduct = typeof settings.getProduct === 'function' ? settings.getProduct : function() { return null; };
    },
    _wireUpButton: function (buttonEl) {
        var that = this;
        $(buttonEl).click(function () {
            if (that._buttonClickPreCheck() === false) {
                return;
            }

            if ($(buttonEl).hasClass('disabled')) {
                return false;
            }
            that.DATA.amount_cents = that._getAmountCents();

            var buttonType = "Stripe";

            _logV2PaymentButtonClick("Stripe", that.DATA.amount_cents, buttonType, that._recurring(), that._getSubType());

            if (buttonType === "Stripe") {
                var name = 'AdBlock';
                if (typeof isPremium === "function" && isPremium()) {
                    name = 'AdBlock Premium';
                }
                var obj = {
                    name: name,
                    key: that.AUX.key,
                    amount: that.DATA.amount_cents,
                    description: that._description(),
                    //panelLabel: "Pay",
                    currency: that._currency(),
                    locale: that._locale(),
                    closed: that._onCheckoutClose,
                    token: function (res) {
                        that._onAjaxStart();
                        that.DATA.stripeToken = res.id;
                        that.DATA.email = res.email;
                        buildStripeMetadata(that.DATA, that._currency(), that._recurring(), that._getSubType(), that._getProduct());
                        $.ajax({
                            type: "POST",
                            url: that.AUX.charge_url,
                            data: that.DATA,
                            dataType: "json",
                            success: function (chargeResult) {
                                var thankYouPage = that._thankYouPage;
                                var query = "?u=" + that.DATA.userid + queryString(thankYouPage.queryParams);
                                var destination = "";
                                if (!chargeResult.success && getSource() !== "SY" && getSource() !== "SG") {
                                    that._onError(chargeResult.error);
                                } else {
                                    if (typeof that.onSuccess === "function") {
                                        that.onSuccess('');
                                    } else {
                                        window.location.href = thankYouPage.url + query;
                                    }
                                }
                            },
                            error: function () {
                                that._onError("Unknown error. Please e-mail help@getadblock.com for assistance.");
                            },
                            complete: that._onAjaxComplete,
                        });
                    }
                };
                if (typeof that._recurring === "function" && that._recurring() === true) {
                    if (typeof that._getSubType === "function" && that._getSubType() === "yearly") {
                        obj.panelLabel = "Subscribe {{amount}} / year";
                    } else {
                        obj.panelLabel = "Subscribe {{amount}} / month";
                    }
                }
                StripeCheckout.open(obj);
            }
            return false;
        });
    }
};

var StripeCC = {
/* Initialize StripeCC for Credit Card input using Stripe Elements.
    https://stripe.com/docs/stripe-js/reference#stripe-elements

    To use:
        * create a form with divs to mount each input element and a single button with type="submit" to trigger the StripeCC form listener
            <form action="#" method="post" id="payment-form">
                <label>Card number
                    <div id="card-no" class="wide-input"></div>
                </label>
                <button id="upgrade_now" type="submit"></button>
            </form>
        * initialize the object passing in the form and div ids for element mounting plus required settings (see below)
        * code assumes an input element accepting an e-mail with an id of "email"

    Settings object contains:
        * onAjaxStart? - function(): called with when AJAX to server starts
        * elementSelectors [required]- an object mapping the three Stripe elements (cardNumber, cardExpiry, and cardCvc) to page selectors
            where Stripe will inject those input tags. For example:
            {
                "cardNumber": "#card-no",
                "cardExpiry": "#card-exp",
                "cardExpiry": "#card-exp",
            }
            The selectors must be unique to the page for a given form.
        * paymentFormSelector [required] - a page selector for the form element that drives StripeCC
        * getEmailAddress - function(): called on submit to obtain user's e-mail address, if available
        * onAjaxComplete - function(): called when AJAX to server ends
        * getAmountCents - function(): a function that should return the integer number of
            cents to be charged.  May be called multiple times.
        * onSuccess - function(new_order_id): called when charge succeeds. You
                might hide the buttons and show an email request form at this point.
        * currency - function that returns the currency of the transaction (default 'USD')
        * locale - function that returns the locale of the transaction (default 'en')
        * recurring - function that returns whether the purchase is recurring or not (default false)
        * getSubType - function that returns the subtype of the transaction (default 'monthly')
        * buttonClickPreCheck - function():  Function that is called before form is submitted.
            Can be used to prevent submission if amount is not large enough or invalid.
        * buttonClickCallback - a function that will be called after the payment button is clicked

    Optional:
        * extraMetadataParams - extra key-value pairs to be passed along to the charge endpoint in the
        POST body. Can be used to contain parameters relevant to processing the charge (e.g., information
        about which subscription to update).
    */
    init: function (settings) {
        this.DATA = {
            testmode: settings.testmode || false,
        };
        const AUX_KEYS = {
            LIVE: {
                key: "pk_live_Zr0d52ZJA1wFGrhLGcIT2ZhB",
                charge_url: "https://getadblock.appspot.com/stripe/charges",
            },
            TEST: {
                key: "pk_test_iqOTH7z37sT1seSKNzhhKzUu", //adblock's test key
                charge_url: "https://getadblock.appspot.com/stripe/charges", //adblock's charge url
            }
        };
        const UPDATE_KEYS = {
            LIVE: {
                key: "pk_live_Zr0d52ZJA1wFGrhLGcIT2ZhB",
                charge_url: "https://getadblock.appspot.com/stripe/cards",
            },
            TEST: {
                key: "pk_test_iqOTH7z37sT1seSKNzhhKzUu", //adblock's test key
                charge_url: "https://getadblock.appspot.com/stripe/cards",
            }
        }
        this._settings = settings;
        this._keys = AUX_KEYS;
        this._customChargeURL = settings.customChargeURL;
        if (this._customChargeURL === "UPDATE") {
            this._keys = UPDATE_KEYS;
        }
        this._extraMetadataParams = settings.extraMetadataParams;
        this.AUX = (settings.testmode ? this._keys.TEST : this._keys.LIVE);
        this._stripeHandle = Stripe(this.AUX.key);
        this._onAjaxStart = settings.onAjaxStart || function () {};
        this._elementSelectors = settings.elementSelectors || function () { return {}; };
        this._elementChangeListener = settings.elementChangeListener || false;
        this._onErrorCb = settings.onErrorCb || function (msg) { alert("Sorry, but there was a problem:\n\n" + msg + "\n\nPlease try again."); };
        this._paymentFormSelector = typeof settings.paymentFormSelector !== "undefined" ? settings.paymentFormSelector : "";
        this._getEmailAddress = typeof settings.getEmailAddress === 'function' ? settings.getEmailAddress : function() {return "";};
        this._onAjaxComplete = settings.onAjaxComplete || function () {};
        this._getAmountCents = settings.getAmountCents;
        this.onSuccess = settings.onSuccess || function () {};
        this._currency = typeof settings.currency === 'function' ? settings.currency : function() {return "USD";};
        this._locale = typeof settings.locale === 'function' ? settings.locale : function() {return 'en';};
        this._recurring = typeof settings.recurring === 'function' ? settings.recurring : function() {return false;};
        this._getSubType = typeof settings.subType === 'function' ? settings.subType : function() {return "monthly";};
        this._buttonClickPreCheck = typeof settings.buttonClickPreCheck === 'function' ? settings.buttonClickPreCheck : function() {return true;};
        this._buttonClickCallback = typeof settings.buttonClickCallback === 'function' ? settings.buttonClickCallback : function() { };
        this._submitUnderway = false;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._getProduct = typeof settings.getProduct === 'function' ? settings.getProduct : function() { return null; };
        this._elementsHandles = [];
        this._initializeContainers(settings.elementSelectors);
        return this;
    },
    clearElementsFields: function() {
        // clears out all Stripe elements fields to inital empty state.
        if (this._elementsHandles) {
            this._elementsHandles.forEach(element => element.clear());
        }
    },
    _showError: function (msg) {
        this._submitUnderway = false;
        $(this._submitButtonSelector).prop("disabled", false);
        this._onErrorCb(msg);
    },
    _initializeContainers: function (cardElements) {
        var that = this;
        if (that._paymentFormSelector === "") {
            console.warn("You must provide a form element to mount the Stripe Elements credit card fields to use StripeCC.");
            return false;
        }
        const requiredKeys = ["cardNumber", "cardExpiry", "cardCvc"];
        const missingKeys = Boolean(
            requiredKeys.filter(function(key) {
                return Object.keys(cardElements).includes(key) !== true;
            }).length !== 0);
        if (missingKeys === true) {
            console.warn("You must provide cardNumber, cardExpiry, and cardCvc keys with DOM selector values (mount targets) to use StripeCC.");
            return false;
        }

        var elements = that._stripeHandle.elements({
            fonts: [{
                family: "Lato",
                cssSrc: "https://fonts.googleapis.com/css?family=Lato:300,400,700,900"
            }]
        });

        // You can apply a limited number of styles to the elements based on state
        // https://stripe.com/docs/stripe-js/reference#elements-create
        var elementStyles = {
            "base": {
                "color": "#333",
                "fontFamily": "Lato, Arial, sans-serif",
                "fontSize": "18px",
                "::placeholder": {
                    "color": "#C4C4C4"
                }
            }
        };

        var elementHandles = {};
        Object.keys(cardElements).forEach(function(key) {
            const selector = cardElements[key];
            let element = elements.create(key, {style: elementStyles});
            element.mount(selector);
            elementHandles[key] = element;
            if (typeof that._elementChangeListener === "function") {
                element.addEventListener("change", that._elementChangeListener);
            }
            that._elementsHandles.push(element);
        });

        // Create a token or display an error when the form is submitted.
        var form = document.querySelector(that._paymentFormSelector);
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (that._submitUnderway === true) {
                return false;
            }
            if (that._buttonClickPreCheck() === false) {
                return;
            }

            that._submitUnderway = true;
            $(that._submitButtonSelector).prop("disabled", true);
            that._buttonClickCallback();
            /* Stripe grabs *all* elements made from a given element handle when you pass any one of those elements to createToken
            So, in this case we'll pass cardNumber and get cardExpiry and cardCvc automatically */
            that._stripeHandle.createToken(elementHandles.cardNumber).then(function(result) {
                if (result.error) {
                    that._showError(result.error.message);
                } else {
                    stripeTokenHandler(result.token);
                }
            });
        });

        /* This function processes the token we receive from elements in the same way StripeAB does,
        capturing amount information and passing it to the payment server */
        function stripeTokenHandler(token) {
            that._onAjaxStart();
            that.DATA.stripeToken = token.id;
            that.DATA.email = that._getEmailAddress();
            that.DATA.amount_cents = that._getAmountCents();
            if (that._extraMetadataParams) {
                Object.keys(that._extraMetadataParams).forEach(key => {
                    if (typeof that._extraMetadataParams[key] === "function") {
                        that.DATA[key] = that._extraMetadataParams[key]();
                    } else {
                        that.DATA[key] = that._extraMetadataParams[key];
                    }
                });
            }
            buildStripeMetadata(that.DATA, that._currency(), that._recurring(), that._getSubType(), that._getProduct());
            if (that._customChargeURL !== "UPDATE") {
                _logV2PaymentButtonClick("Stripe", that.DATA.amount_cents, "Stripe", that._recurring(), that._getSubType());
            }
            $.ajax({
                type: "POST",
                url: that.AUX.charge_url,
                data: that.DATA,
                dataType: "json",
                success: function (chargeResult) {
                    if (!chargeResult.success) {
                        if (getSource() == "SY" || getSource() == "SG") {
                            that.onSuccess('');
                        } else {
                            that._showError(chargeResult.error);
                        }
                    } else {
                        that.onSuccess(chargeResult.charge_id, chargeResult);
                    }
                    that._submitUnderway = false;
                },
                error: function () {
                    that._showError("Unknown error.");
                    that._submitUnderway = false;
                },
                complete: that._onAjaxComplete,
            });
        }
    }
};

/*
StripeCheckoutSession
The new Stripe Checkout from Stripe.
*/
const StripeCheckoutSession = {
    init: function (settings) {
        this.DATA = {
            testmode: settings.testmode || false,
        };
        const AUX_KEYS = {
            LIVE: {
                key: "pk_live_Zr0d52ZJA1wFGrhLGcIT2ZhB",
                charge_url: "https://getadblock.appspot.com/stripe/create-checkout-session",
            },
            TEST: {
                key: "pk_test_iqOTH7z37sT1seSKNzhhKzUu",
                charge_url: "https://getadblock.appspot.com/stripe/create-checkout-session",
            }
        };
        this._settings = settings;
        this._keys = AUX_KEYS;
        this.AUX = (settings.testmode ? this._keys.TEST : this._keys.LIVE);
        this._stripeHandle = Stripe(this.AUX.key);
        this._submitButtonId = settings.submitButtonId || null;
        this._elementChangeListener = settings.elementChangeListener || false;
        this._onSuccessURL = settings.onSuccessURL || 'https://getadblock.com/thanks.php';
        this._onErrorCb = settings.onErrorCb || function (msg) { alert("Sorry, but there was a problem:\n\n" + msg + "\n\nPlease try again."); };
        this._getAmountCents = settings.getAmountCents;
        this._currency = typeof settings.currency === 'function' ? settings.currency : function() {return "USD";};
        this._locale = typeof settings.locale === 'function' ? settings.locale : function() {return 'en';};
        this._recurring = typeof settings.recurring === 'function' ? settings.recurring : function() {return false;};
        this._getSubType = typeof settings.subType === 'function' ? settings.subType : function() {return "monthly";};
        this._buttonClickPreCheck = typeof settings.buttonClickPreCheck === 'function' ? settings.buttonClickPreCheck : function() {return true;};
        this._buttonClickCallback = typeof settings.buttonClickCallback === 'function' ? settings.buttonClickCallback : function() { };
        this._getProduct = typeof settings.getProduct === 'function' ? settings.getProduct : function() { return null; };
        this._init();
        return this;
    },
    _init: function () {
        var that = this;
        if (that._submitButtonId === null) {
            console.error("StripeCheckout failure: no _submitButtonId");
            return;
        }
        var checkoutButton = document.getElementById(that._submitButtonId);
        checkoutButton.addEventListener('click', function() {
            buildStripeMetadata(that.DATA, that._currency(), that._recurring(), that._getSubType(), that._getProduct());
            that.DATA.amount_cents = that._getAmountCents();
            _logV2PaymentButtonClick("Stripe", that.DATA.amount_cents, "Stripe", that._recurring(), that._getSubType());
            that.DATA.success_url = that._onSuccessURL;
            that.DATA.cancel_url = window.location.href; // the url to go back to if user clicks "back". Will be current page url.
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
                return that._stripeHandle.redirectToCheckout({ sessionId: session.id });
            })
            .then(function(result) {
                if (result.error) {
                    that._onErrorCb(result.error.message);
                }
            })
            .catch(function(error) {
                that._onErrorCb(error);
            });
        });
    },
};

/*
StripeSourceInstance
    The non-singleton version of StripeSource.
    Supports multiple sources on the same page.
    Called with same settings parameter as StripeSource.init(settings)
*/

var StripeSourceInstance = function(settings) {
    this.DATA = {
        testmode: settings.testmode || false,
    };
    var AUX_LIVE = {
        key: "pk_live_Zr0d52ZJA1wFGrhLGcIT2ZhB",
        source_url: "https://getadblock.appspot.com/stripe/sources",
    };
    var AUX_TEST = {
        key: "pk_test_iqOTH7z37sT1seSKNzhhKzUu", //adblock's test key
        source_url: "https://getadblock.appspot.com/stripe/sources", //adblock's charge url
    };

    this.AUX = (settings.testmode ? AUX_TEST : AUX_LIVE);
    this._onAjaxStart = settings.onAjaxStart || function () {};
    this._onAjaxComplete = settings.onAjaxComplete || function () {};
    this._getAmountCents = settings.getAmountCents;
    this.onSuccess = settings.onSuccess || function () {};
    this._buttonClickPreCheck = typeof settings.buttonClickPreCheck === 'function' ? settings.buttonClickPreCheck : function() {return true;};
    this._wireUpButton(settings.button);
    this._currency = typeof settings.currency === 'function' ? settings.currency : function() {return "USD"};
    this._locale = typeof settings.locale === 'function' ? settings.locale : function() {return 'en';};
    this._description = typeof settings.description === 'function' ? settings.description : function() {
        return 'Securely processed by Stripe.com';
    }
    this._recurring = typeof settings.recurring === 'function' ? settings.recurring : function() {return false;};
    this._getSubType = typeof settings.subType === 'function' ? settings.subType : function() {return "monthly";};
    this._getSourceType = typeof settings.sourceType === 'function' ? settings.sourceType : function() {return "none";};
}

StripeSourceInstance.prototype._showError = function (msg) {
    alert("Sorry, but there was a problem:\n\n" + msg + "\n\nPlease try again.");
}

StripeSourceInstance.prototype._wireUpButton = function (buttonEl) {
    var that = this;
    $(buttonEl).click(function() {
        if ($(buttonEl).hasClass('disabled')) {
            return false;
        }
        if (that._buttonClickPreCheck() === false) {
            return;
        }
        that.DATA.amount_cents = that._getAmountCents();

        // YOU HAVE TO SET THE TYPE CORRECTLY
        var buttonType = that._getSourceType();
        if (buttonType === "none") {
            _logV2Error("Source not set up correctly");
            alert("Source not set up correctly\n\nPlease post a ticket to help.getadblock.com");
        }
        that.DATA.type = buttonType;

        _logV2PaymentButtonClick(buttonType, that.DATA.amount_cents, buttonType, that._recurring(), that._getSubType());

        that._onAjaxStart();
        buildStripeMetadata(that.DATA, that._currency(), that._recurring(), that._getSubType());
        $.ajax({
            type: "POST",
            url: that.AUX.source_url,
            data: that.DATA,
            dataType: 'json',
            success: function (sourceResult) {
                if (sourceResult.success) {
                    that.onSuccess(sourceResult.redirect_url);
                }
            },
            error: function (jqXHR, number, text) {
                that._showError("Unknown error.");
                // console.log("number:" + number + "text: " + text);
            },
            complete: that._onAjaxComplete,
        });
        return false;
    });
}

/*
StripeSource: a configurable singleton to pay via Stripe Sources
To use:

StripeSource.init(settings); // must be called 1st.  Makes the button respond to clicks.

When thePaymentButton is clicked, a payment to Stripe will be made via the
AdBlock payment server.  settings.onSuccess(new_order_id) will be called when
it succeeds.  If you then request an email address from the user, once you have
it you can call:
*/
var StripeSource = {
    // Initialize StripeSource.  settings object contains:
    //   button - DOM object: able to receive 'click' event
    //   getAmountCents - function(): a function that should return the integer number of
    //     cents to be charged.  May be called multiple times.
    //   onAjaxStart? - function(): called with when AJAX to server starts
    //   onAjaxComplete? - function(): called when AJAX to server ends
    //   onSuccess? - function(new_order_id): called when charge succeeds.  You
    //     might hide the buttons and show an email request form at this point.
    //   testmode? - bool: true if Stripe testmode, defaults to false
    // Needed properties:
    //   userid - string: AdBlock userid, access right before submitting purchase using
    //     getUserId()
    init: function (settings) {
        this.DATA = {
            testmode: settings.testmode || false,
        };
        var AUX_LIVE = {
            key: "pk_live_Zr0d52ZJA1wFGrhLGcIT2ZhB",
            source_url: "https://getadblock.appspot.com/stripe/sources",
        };
        var AUX_TEST = {
            key: "pk_test_iqOTH7z37sT1seSKNzhhKzUu", //adblock's test key
            source_url: "https://getadblock.appspot.com/stripe/sources", //adblock's charge url
        };

        this.AUX = (settings.testmode ? AUX_TEST : AUX_LIVE);
        this._onAjaxStart = settings.onAjaxStart || function () {};
        this._onAjaxComplete = settings.onAjaxComplete || function () {};
        this._getAmountCents = settings.getAmountCents;
        this.onSuccess = settings.onSuccess || function () {};
        this._buttonClickPreCheck = typeof settings.buttonClickPreCheck === 'function' ? settings.buttonClickPreCheck : function() {return true;};
        this._wireUpButton(settings.button);
        this._currency = typeof settings.currency === 'function' ? settings.currency : function() {return "USD"};
        this._locale = typeof settings.locale === 'function' ? settings.locale : function() {return 'en';};
        this._description = typeof settings.description === 'function' ? settings.description : function() {
            return 'Securely processed by Stripe.com';
        }
        this._recurring = typeof settings.recurring === 'function' ? settings.recurring : function() {return false;};
        this._getSubType = typeof settings.subType === 'function' ? settings.subType : function() {return "monthly";};
        this._getSourceType = typeof settings.sourceType === 'function' ? settings.sourceType : function() {return "none";};
    },
    _showError: function (msg) {
        alert("Sorry, but there was a problem:\n\n" + msg + "\n\nPlease try again.");
    },
    _wireUpButton: function (buttonEl) {
        var that = this;
        $(buttonEl).click(function() {
            if ($(buttonEl).hasClass('disabled')) {
                return false;
            }
            if (that._buttonClickPreCheck() === false) {
                return;
            }
            that.DATA.amount_cents = that._getAmountCents();

            // YOU HAVE TO SET THE TYPE CORRECTLY
            var buttonType = that._getSourceType();
            if (buttonType === "none") {
                _logV2Error("Source not set up correctly");
                alert("Source not set up correctly\n\nPlease post a ticket to help.getadblock.com");
            }
            that.DATA.type = buttonType;

            _logV2PaymentButtonClick(buttonType, that.DATA.amount_cents, buttonType, that._recurring(), that._getSubType());

            that._onAjaxStart();
            buildStripeMetadata(that.DATA, that._currency(), that._recurring(), that._getSubType());
            $.ajax({
                type: "POST",
                url: that.AUX.source_url,
                data: that.DATA,
                dataType: 'json',
                success: function (sourceResult) {
                    if (sourceResult.success) {
                        that.onSuccess(sourceResult.redirect_url);
                    }
                },
                error: function (jqXHR, number, text) {
                    that._showError("Unknown error.");
                    console.log(jqXHR);
                    console.log("number:" + number + "text: " + text);
                },
                complete: that._onAjaxComplete,
            });

            return false;
        });
    },
};

/*
Stripe Payment Request API - https://stripe.com/docs/payment-request-api
Supported by Chrome Desktop, Chrome Android, Microsoft Edge, and
Apple Pay for users with a configured Wallet and compatible device.

To use: StripePaymentRequestAPI.init(settings, unsupportedCallback);
    => settings [required] - same base settings object as StripeAB with the following additions:
        => isApplePay [optional] - if true, the payment request will be configured for Apple Pay.
        => onSetupSuccess [optional] - function that will be called if the payment method
            being initialized is supported by the user's browser.
        => onSetupFailure [required] - in the event that the PaymentRequestAPI is unavailable, this can
            be used to provide fallback to default StripeAB handling, e.g., StripeAB.init(settings);
*/
var StripePaymentRequestAPI = {
    init: function (settings) {
        if (typeof settings.onSetupFailure !== "function") {
            console.error("You cannot initialize Payment Request API without a fallback method for unsupported browsers");
            _logV2Error("Attempted to initialize Payment Request API without an unsupported browser fallback method.");
            return false;
        }

        this.DATA = {
            testmode: settings.testmode || false,
        };

        var AUX_LIVE = {
            key: "pk_live_Zr0d52ZJA1wFGrhLGcIT2ZhB",
            charge_url: "https://getadblock.appspot.com/stripe/charges",
        };
        var AUX_TEST = {
            key: "pk_test_iqOTH7z37sT1seSKNzhhKzUu", // AdBlock's test key
            charge_url: "https://getadblock.appspot.com/stripe/charges", // AdBlock's test charge url
        };

        this.AUX = (settings.testmode ? AUX_TEST : AUX_LIVE);
        this._onSetupFailure = settings.onSetupFailure;
        this._onSetupSuccess = typeof settings.onSetupSuccess !== "undefined" ? settings.onSetupSuccess : function() {return true;}
        this._onAjaxStart = settings.onAjaxStart || function () {};
        this._buttonClickCallback = settings.buttonClickCallback || function () {};
        this._onAjaxComplete = settings.onAjaxComplete || function () {};
        this._getAmountCents = settings.getAmountCents;
        this._onSuccess = settings.onSuccess || undefined;
        this._buttonClickPreCheck = typeof settings.buttonClickPreCheck === "function" ? settings.buttonClickPreCheck : function() {return true;};
        this._currency = typeof settings.currency === "function" ? settings.currency : function() {return "USD";};
        this._recurring = typeof settings.recurring === "function" ? settings.recurring : function() {return false;};
        this._getSubType = typeof settings.subType === "function" ? settings.subType : function() {return "monthly";};
        this._country = typeof getCountryCode === "function" ? getCountryCode : function() {return "US";}
        this._thankYouPage = validateThankYouPage(settings.thankYouPage);
        this._onError = typeof settings.onError === "function" ? settings.onError : function (msg) {
            // Payment Requests launch a modal. Do not use window.alert here. It pops *under* and hangs indefinitely.
            console.error("There was a problem: ", msg);
        };
        this._isApplePay = (typeof settings.isApplePay !== "undefined" && settings.isApplePay === true) ? true : false;
        this._buttonType = this._isApplePay === true ? "Stripe ApplePay" : "Stripe PaymentRequestAPI";
        this._paymentRequest = Stripe(this.AUX.key).paymentRequest({
            country: this._country(),
            currency: this._currency().toLowerCase(),
            total: {
                label: "A pending amount to be updated on button click.",
                amount: 500,
                pending: true
            },
            requestPayerEmail: true
        });
        var that = this;
        this._paymentRequest.canMakePayment().then(function(result) {
            if (result !== null && typeof result === "object") {
                if (that._isApplePay === true && result.applePay === false) {
                    // We want Apple Pay, but it's not supported
                    that._onSetupFailure();
                    return false;
                }
                // Supported. Complete initialization.
                that._onSetupSuccess();
                that._initializeTokenListener();
                that._wireUpButton(settings.button);
            } else { // Payment not supported / missing CC / etc.
                that._onSetupFailure();
                return false;
            }
        });
    },
    _initializeTokenListener: function() {
        var that = this;
        that._paymentRequest.on("token", function(ev) { // When we receive a token...
            that.DATA.stripeToken = ev.token.id;
            that.DATA.email = ev.payerEmail;
            that.DATA.button_type = that._buttonType;
            buildStripeMetadata(that.DATA, that._currency(), that._recurring(), that._getSubType());
            that._onAjaxStart();
            $.ajax({ // ...then we can post a charge to the back-end
                type: "POST",
                url: that.AUX.charge_url,
                data: that.DATA,
                dataType: "json",
                success: function (chargeResult) {
                    if (!chargeResult.success && getSource() !== "SY" && getSource() !== "SG") {
                        // Report to the browser that the payment failed, prompting it to
                        // re-show the payment interface, or show an error message and close
                        // the payment interface.
                        ev.complete("fail");
                        that._onError(chargeResult.error);
                    } else {
                        // Report to the browser that the payment was successful, prompting
                        // it to close the browser payment interface.
                        ev.complete("success");
                        if (typeof that._onSuccess === "function") {
                            that._onSuccess("");
                        } else {
                            var thankYouPage = that._thankYouPage;
                            var query = "?u=" + that.DATA.userid + queryString(thankYouPage.queryParams);
                            window.location.href = thankYouPage.url + query;
                        }
                    }
                },
                error: function () {
                    ev.complete("fail");
                    that._onError("Unknown error.");
                },
                complete: function() {
                    that._onAjaxComplete();
                }
            });
        });
    },
    _wireUpButton: function (buttonEl) {
        var that = this;
        $(buttonEl).click(function() {
            that._buttonClickCallback();
            if (that._buttonClickPreCheck() === false || $(buttonEl).hasClass("disabled")) {
                return false;
            }

            that.DATA.amount_cents = that._getAmountCents();
            const pmtRecurs = that._recurring();
            function capitalizeFirst(string) {
                if (typeof string !== "string" || string.length === 0) {
                    return string;
                }
                return string[0].toUpperCase() + string.slice(1);
            }
            const recurringInterval = capitalizeFirst(that._getSubType());
            var paymentWindowLabel = pmtRecurs === true ? "Adblock " + recurringInterval : "Adblock";
            _logV2PaymentButtonClick("Stripe", that.DATA.amount_cents, that._buttonType, pmtRecurs, that._getSubType());
            that._paymentRequest.update({
                currency: that._currency().toLowerCase(),
                total: {
                    label: paymentWindowLabel,
                    amount: that.DATA.amount_cents,
                    pending: false
                }
            });
            that._paymentRequest.show(); // Show the payment request screen.
        });
    }
};
