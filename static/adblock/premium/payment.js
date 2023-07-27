$(document).ready(function () {
    /* Constants and cached selectors shared by the page */
    const Page = {
        PaymentCard: $("#pay"),
        AlreadyDonatedCard: $("#already-donated-activity"),
        EnterPurchaseEmail: $("#already-donated-card-1"),
        EnterConfirmationCode: $("#already-donated-card-2-code"),
        InProgressSpinner: $("#already-donated-activity-waiting"),
        SuccessCard: $("#already-donated-card-4-goodtogo"),
        ENoDonations: $("#card2-error-1"),
        EWrongConfirmationCode: $("#card2-error-2"),
        ENoUserId: $("#card2-error-3"),
        EProblemActivating: $("#card2-error-4"),
        EGenericError: $("#card2-error5"),
        ThankYou: $("div#card-3"),
        PmtSuccessInfo: $("div#pmt-success-left"),
    };

    // Utility fn to show/hide cards using query params for testing.
    const urlParams = new URLSearchParams(window.location.search);
    const cardPageToShow = urlParams.get("showcards");
    const cardPageToHide = urlParams.get("hidecards");
    if (cardPageToShow && cardPageToShow.length) {
        Page.PaymentCard.hide();
        const cards = cardPageToShow.split(",");
        cards.forEach((cardId) => {
            $("#" + cardId).show();
        });
        if (cardPageToHide && cardPageToHide.length) {
            const hideCards = cardPageToHide.split(",");
            hideCards.forEach((cardId) => {
                $("#" + cardId).hide();
            });
        }
    }

    // Scroll on down to the payment block when the user clicks a CTA
    $(".get-premium, .your-plan:not('.free')").on("click", function (ev) {
        ev.preventDefault();
        const recInt = $(this).data("recurring-interval");
        if (recInt === "monthly" || recInt === "yearly") {
            $("#r_" + recInt).click();
        } else {
            let maybeId = $("div.header.selected").attr("id") || "";
            maybeId = "r_" + maybeId.split("-")[0];
            if (maybeId !== null) {
                $("#" + maybeId).click();
            }
        }
        $("#payments-content")[0].scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });

    function resetAlreadyDonatedActivity() {
        $("#already-donated-card-2-code").hide();
        $("#already-donated-activity-waiting").hide();
        $("#already-donated-card-3-oops").hide();
        $("#already-donated-card-4-goodtogo").hide();
        $("#already-donated-card-1").show();
        $("#card2-error-1").hide();
        $("#card2-error-2").hide();
        $("#card2-error-3").hide();
        $("#card2-error-4").hide();
        $("#card2-error-5").hide();
        $("#already-donated-card-4-goodtogo").hide();
        $("input#email-address").focus();
    }

    $("i.back-to-payments").on("click", function (ev) {
        $("#already-donated-activity").hide();
        $("#pay").show();
        resetAlreadyDonatedActivity();
    });

    $("#already-donated").on("click", function () {
        // "I've donated to Adblock before..."
        resetAlreadyDonatedActivity();
        $("#pay").hide();
        $("#already-donated-activity").show();
    });

    let monthlyPrice = 1.99;
    let yearlyPrice = 19.99;

    // see if we're still doing the EUR GBP etectera
    // see if we should show the default based on geo
    const yearlyID = "yearly-medium";
    const monthlyID = "monthly-medium";
    const $yearly = $("#yearly-medium");
    const $monthly = $("#monthly-medium");
    let selected = yearlyID;
    let $selectedEl = $yearly;
    function updatePrice(currency, amount, frequency) {
        $("#payment-options-medium .price-small:not('.free')").text(currency);
        $("#payment-options-medium .price-big:not('.free')").text(amount);
        $("#payment-options-medium .price-interval:not('.free')").text(frequency);
    }
    function showYearly() {
        $monthly.removeClass("selected");
        $yearly.addClass("selected");
        updatePrice("$", yearlyPrice, "/yr");
        $("#r_yearly").click();
    }
    function showMonthly() {
        $monthly.addClass("selected");
        $yearly.removeClass("selected");
        updatePrice("$", monthlyPrice, "/mo");
        $("#r_monthly").click();
    }
    $(".header").on("click", function (ev) {
        if (ev.target.id == yearlyID) {
            showYearly();
        } else {
            showMonthly();
        }
    });

    // Holds the state of the user's choice, default: monthly
    var ___AB_USING_CURRENCY_LIB = false;
    var selectedInterval = "r_yearly";
    var selectedCurrency = "USD";
    var currentProcessor = "stripe";

    const pmtMethodTransitionMs = 300;
    const $paypalPaymentBox = $("div#paypal-pay-box");
    const $paypalPay = $("div#paypal_pay");
    const $paypalButton = $("#paypal_button");
    const $paypalRadio = $("#paypal_radio_input");

    const $stripePay = $("div#stripe_pay");
    const stripePaymentButton = "div#donate_now";
    const $stripePaymentButton = $("#stripe_pay");
    const $stripeRadio = $("#stripe_radio_input");

    const $confirmationCodeInput = $("#code");
    const $confirmationCodeError = $("#confirmation-code-error");

    const selectors = {
        amountInputs: 'input[name="amount"]',
        monthlyAmountInput: '#monthly',
        yearlyAmountInput: '#yearly',
        monthlyLabel: '#monthly-rate',
        yearlyLabel: '#yearly-rate',
        currencyDropdown: '#currency_dropdown',
    };

    // Holds the state of the user's choice, default: monthly
    var ___AB_USING_CURRENCY_LIB = false;
    var selectedCurrency = "USD";
    var currentProcessor = "stripe";

    // translate the page
    // chrome.i18n._initialize("en", "/adblock/i18n/_locales/", function() {
    //     if (typeof localizePage === "function") {
    //         initializePaymentBox(localizePage);
    //     }
    //     // TODO - bit of a hack, right now this translated string is not replacing the specified
    //     // email text -- this updates the email text to match the actual href.
    //     $(".helpdesk-email").text("support@adblockplus.org");
    // });

    function initializePaymentBox(callback) {
        var firstCurrency = "USD";
        var dropdownItems = [];
        const acceptedCurrencies = new Set(["USD", "EUR", "CAD", "GBP"]);
        if (
            typeof _currency === "object" &&
            typeof _currency.getDefaultDropdownList === "function" &&
            typeof _currency.canShowCurrencyDropdown === "function" &&
            _currency.canShowCurrencyDropdown() === true
        ) {
            dropdownItems = _currency.getDefaultDropdownList();
            dropdownItems = dropdownItems.filter(item => acceptedCurrencies.has(item[0].toUpperCase()) === true);
            // we don't need a dropdown if there's only one thing to choose
            if (dropdownItems.length > 1) {
                for (var i = 0; i < dropdownItems.length; i++) {
                    var option = document.createElement("option");
                    option.text = dropdownItems[i][1];
                    option.value = dropdownItems[i][0];
                    $(selectors.currencyDropdown).append(option);
                }
                firstCurrency = dropdownItems[0][0];
                ___AB_USING_CURRENCY_LIB = true;
                $(selectors.currencyDropdown).show();
            }
        }

        changeCurrencySymbolAndAmounts(firstCurrency);
        callback();
    }

    initializePaymentBox(function(){});

    function updateCurrency(newCurrency) {
        // changeCurrencySymbolAndAmounts(newCurrency.toLowerCase(), true);
        selectedCurrency = newCurrency.toUpperCase();
        updatePlanText();
        if (!document.location.search.match(/thankyou/)) {
            localStorage.setItem("selectedCurrency", newCurrency);
        }
    }

    function changeCurrencySymbolAndAmounts(currencyCode) {
        selectedCurrency = currencyCode.toUpperCase();
        const currency = _currency.getSymbol(currencyCode);

        $("span.currency-symbol").each(function(element) {
            $(this).text(currency);
        });

        const yearlyAmount = 19.99;
        const monthlyAmount = 1.99;

        // Override default input values
        $(selectors.monthlyAmountInput).val(monthlyAmount);
        $(selectors.yearlyAmountInput).val(yearlyAmount);

        // Set the replacement text attr before translating the whole page
        $(selectors.monthlyLabel).attr('i18n_replacement_text', `${currency}${monthlyAmount}`);
        $(selectors.yearlyLabel).attr('i18n_replacement_text', `${currency}${yearlyAmount}`);

        // We don't have an i18n utility fn translating text on a user action so here we use regex
        // for updating the text when users change it from the dropdown
        const monthly = $(selectors.monthlyLabel).text().replace(/[^/]*/, `${currency}${monthlyAmount}`);
        const yearly = $(selectors.yearlyLabel).text().replace(/[^/]*/, `${currency}${yearlyAmount}`);
        $(selectors.monthlyLabel).text(monthly);
        $("#monthly-rate").text(monthly);
        $(selectors.yearlyLabel).text(yearly);
        $("#yearly-rate").text(yearly);
        updateCurrency(selectedCurrency);
    }


    $(selectors.currencyDropdown).on("change", function(ev) {
        // when currency box changes, update the amount and currency
        const newCurrency = ev.target.value;
        updateCurrency(newCurrency);
        changeCurrencySymbolAndAmounts(newCurrency);
    });

    function scrollToRegistrationBox() {
        $("#payments-content")[0].scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    // On successful activation, tell extension to activate MyAdBlock.
    function sendPaymentSuccessToExtension() {
        // The extension checks for falsy values with !data.userId
        const userId = getUserId();
        return new Promise(function (resolve, reject) {
            const version = 1;
            const payload = {
                command: "payment_success",
                userId: userId,
                version: version,
            };
            window.addEventListener("message", function (response) {
                if (response && response.data && typeof response.data.ack === "boolean") {
                    if (response.data.ack === true) {
                        console.log("Extension responded with success.");
                        resolve();
                    } else {
                        console.log("Exension responded with failure.");
                        reject();
                    }
                }
            });
            window.postMessage(payload, "*");
        });
    }

    function activateExtension(onSuccess, onFailure) {
        eyeo.beacon({premiumActivationAttempt: true});
        // wait up to 10 seconds to receive pmt success receipt verification from extension
        const maxWait = new Promise(function (_, reject) {
            setTimeout(function () {
                reject();
            }, 10000);
        });
        Promise.race([sendPaymentSuccessToExtension(), maxWait])
            .then(function () {
                if (typeof onSuccess === "function") {
                    onSuccess();
                }
                eyeo.beacon({premiumActivationSuccessful: true});
                eyeo.log("premium_activation", {
                    successful: true,
                    id: forceGetUserId()
                });
            })
            .catch(function (err) {
                eyeo.beacon({premiumActivationSuccessful: false});
                eyeo.log("premium_activation", {
                    successful: false,
                    id: forceGetUserId()
                });
                if (typeof onFailure === "function") {
                    onFailure(err);
                }
            });
    }

    // User was redirected here from PayPal, so just activate extension
    // then jump to "You're ready to go" message.
    if (document.location.search.match(/thankyou/)) {
        eyeo.beacon({
            premiumId: forceGetUserId(),
            premiumActivationIntended: true,
            premiumActivationSource: urlParams.get("from") || "premium"
        });
        eyeo.log("premium_activation_intent", {
            from: urlParams.get("from") || "premium",
            id: forceGetUserId()
        });
        Page.PaymentCard.hide();
        Page.AlreadyDonatedCard.show();
        Page.EnterPurchaseEmail.hide();
        Page.InProgressSpinner.show();
        scrollToRegistrationBox();

        // wait 500 ms for things to load before attempting to enroll the extension
        // mainly get at the back of the event loop
        setTimeout(function () {
            // Listeners for links in activities that switch users between cards
            var getInjectedUseridDiv = function () {
                var el = document.getElementById("adblockUserId");
                if (el !== null && typeof el === "object" && typeof el["textContent"] === "string") {
                    return el["textContent"];
                }

                return "";
            };
            var getInjectedUseridVariable = function () {
                if (typeof adblock_userid === "string" && adblock_userid.length > 0) {
                    return adblock_userid;
                }

                return "";
            };
            var useridDivBefore = getInjectedUseridDiv();
            var useridVarBefore = getInjectedUseridVariable();

            const showActivationError = function () {
                Page.InProgressSpinner.fadeOut(1000, function () {
                    Page.EProblemActivating.show();
                    var useridDivAfter = getInjectedUseridDiv();
                    var useridVarAfter = getInjectedUseridVariable();
                    if (typeof _logV2Error !== "undefined") {
                        var error =
                            "premium_enrollment_error: userid different div before: " +
                            useridDivBefore +
                            " and after: " +
                            useridDivAfter +
                            " var before: " +
                            useridVarBefore +
                            " and after: " +
                            useridVarAfter +
                            "";
                        _logV2Error(error);
                    }
                });
            };

            const callActivateExtension = function () {
                activateExtension(
                    function onSuccess() {
                        Page.InProgressSpinner.fadeOut(1000, function () {
                            // Extension activated, show "You're ready to go" message
                            const showCards = ["pay", "card-3", "pmt-success-left"];
                            const hideCards = ["card-1", "card-2", "choose-plans", "other-options"];
                            showCards.forEach((card) => {
                                $("#" + card).show();
                            });
                            hideCards.forEach((card) => {
                                $("#" + card).hide();
                            });
                            Page.AlreadyDonatedCard.hide();
                        });
                    },
                    function onFailure() {
                        showActivationError();
                    }
                );
            };

            /*
             *  Check for the injection of the userid in the `adblockUserId` div before sending the
             *  message to the extension.  Check every second for 10 seconds.
             */
            var numTrys = 0;
            (function checkForInjection() {
                // Run later to get behind the userid injection.
                setTimeout(function () {
                    var userId = getUserIdOrUnknown();
                    if (userId === "unknown") {
                        numTrys++;
                        if (numTrys <= 10) {
                            checkForInjection();
                        } else {
                            showActivationError();
                        }
                    } else {
                        callActivateExtension();
                    }
                }, 1000);
            })();

            if (typeof _logV2MiscEvent !== "undefined") {
                _logV2MiscEvent("premium_enrollment_thankyou");
            }
        }, 500);
    }

    // This code supports the "Already Donated flow".

    // Page.EnterPurchaseEmail
    // "Enter your email to find a previous donation."

    let thisLang = "en";
    if (typeof getLanguage === "function") {
        thisLang = getLanguage();
    }

    function handleEmailSubmit() {
        Page.EnterPurchaseEmail.hide();
        Page.InProgressSpinner.show();
        $.ajax({
            url: "https://myadblock.licensing.adblockplus.dev/license/api/",
            headers: {
                "Accept-Language": thisLang,
            },
            method: "POST",
            dataType: "json",
            data: {
                cmd: "already_donated",
                email: $("input#prev_donation_email").val(),
            },
        })
            .done(function (msg) {
                Page.InProgressSpinner.fadeOut(1000, function () {
                    if (msg && msg.success === true) {
                        // clear the code input field in case there's pre-existing text
                        $confirmationCodeInput.val("");
                        Page.EnterConfirmationCode.show();
                        $confirmationCodeInput.focus();
                    } else {
                        Page.EGenericError.show();
                    }
                });
            })
            .fail(function () {
                Page.InProgressSpinner.fadeOut(1000, function () {
                    Page.EGenericError.show();
                });
            });
    }

    $("form#prev_donation").on("submit", function (e) {
        e.preventDefault();
        handleEmailSubmit();
        eyeo.beacon({premiumEntitlementAttempted: true});
    });

    $("#submit_email").on("click", function (e) {
        e.preventDefault();
        $("form#prev_donation").find(":submit").trigger("click");
    });

    // Page.EnterConfirmationCode
    // "Please enter the 6 character code"
    $confirmationCodeInput.on("keypress", function () {
        if ($confirmationCodeError.is(":visible") === true) {
            $confirmationCodeError.hide();
        }
    });

    function handleSubmitCode() {
        const userId = getUserIdOrUnknown();
        if (!userId || userId === "") {
            Page.EnterConfirmationCode.hide();
            Page.ENoUserId.show();
            return;
        }

        // CSS transforms the entry visually to uppercase, but val could still be lowercase
        enteredCode = $confirmationCodeInput.val();
        if (enteredCode && typeof enteredCode === "string") {
            enteredCode = enteredCode.toUpperCase();
        }
        // Validate code matches format, if not, show error and reject.
        if (!enteredCode.match(/^[A-Z0-9]{6}$/)) {
            $confirmationCodeError.show();
            return;
        }

        Page.EnterConfirmationCode.hide();
        Page.InProgressSpinner.show();

        function showWrongCode() {
            Page.InProgressSpinner.fadeOut(1000, function () {
                Page.EWrongConfirmationCode.show();
            });
        }

        $.ajax({
            url: "https://myadblock.licensing.adblockplus.dev/license/api/",
            method: "POST",
            dataType: "json",
            data: {
                cmd: "validate_already_donated",
                code: enteredCode,
                userid: userId,
            },
        })
            .done(function (msg) {
                if (msg) {
                    if (msg.success === true) {
                        activateExtension(
                            function onSuccess() {
                                Page.InProgressSpinner.fadeOut(1000, function () {
                                    // Extension activated, show "You're ready to go" message
                                    Page.SuccessCard.show();
                                });
                            },
                            function onFailure() {
                                Page.InProgressSpinner.fadeOut(1000, function () {
                                    Page.EProblemActivating.show();
                                });
                            }
                        );
                    }
                } else {
                    // we didn't get a response from the server at all...
                    Page.InProgressSpinner.fadeOut(1000, function () {
                        Page.EGenericError.show();
                    });
                }
            })
            .error(function (request) {
                if (request && request.responseJSON && request.responseJSON.code) {
                    if (request.responseJSON.code === "no-donations") {
                        Page.InProgressSpinner.fadeOut(1000, function () {
                            Page.ENoDonations.show();
                        });
                    } else {
                        // default error case
                        showWrongCode();
                    }
                }
            });
    }

    // Submit and verify the confirmation code...
    $("#submit_code").on("click", function (e) {
        e.preventDefault();
        $("form#confirmation-code").find(":submit").trigger("click");
    });

    $("form#confirmation-code").on("submit", function (e) {
        e.preventDefault();
        handleSubmitCode();
    });

    // End already donated flow.

    // Payment helper functions
    function isRecurring() {
        // right now all options are recurring
        return true;
    }
    function getSubType() {
        // selected intervals are in the format r_monthly and r_yearly
        const selected = selectedInterval.split("_")[1];
        if (selected !== "monthly" && selected !== "yearly") {
            return "yearly"; // default
        } else {
            return selected;
        }
    }
    function getAmountString() {
        return $(".option.selected").data("amount");
    }
    function getAmountCents() {
        var v = getAmountString();
        return Math.round(v * 100);
    }
    function getCurrency() {
        if (selectedCurrency !== "") {
            return selectedCurrency;
        } else {
            return "USD";
        }
    }

    //
    // PAYMENT CARD
    //

    // updates the "yearly / monthly" plan text at bottom of pmt form.
    function updatePlanText() {
        const params = new URLSearchParams(window.location.search);
        if (params.has("anti_adblock_pass__already_donated")) {
            $('.premium-success-details').hide();
            return;
        }
        const amount = params.get("from__amount") || params.get("anti_adblock_pass__amount") || $("button.option.selected").attr("data-amount");
        const prevSelectedCurrency = localStorage.getItem("selectedCurrency");
        if (document.location.search.match(/thankyou/)) {
            if (prevSelectedCurrency && typeof prevSelectedCurrency === "string" && prevSelectedCurrency.length > 0) {
                selectedCurrency = prevSelectedCurrency;
            }
            localStorage.removeItem("selectedCurrency");
        }
        const currencySymbol = _currency.getSymbol(selectedCurrency);
        const amountString = `${currencySymbol}${amount}`;
        const recurringFrequency = params.get("from__frequency") || params.get("anti_adblock_pass__frequency") || $("button.option.selected").attr("data-recurring-frequency");
        const recurringFrequencyWithoutLy = recurringFrequency.slice(0, -2); // slice off the "ly"
        const recurringFrequencyAbbreviation = { yearly: "/yr", monthly: "/mo" }[recurringFrequency];

        $("span.selected-plan-name").each(function () {
            const recurringText = recurringFrequency[0].toUpperCase() + recurringFrequency.slice(1);
            $(this).text(`${recurringText} Plan`);
        });

        $("span.selected-plan-price").each(function () {
            $(this).text(amountString);
        });

        // Update what gets displayed on payment success.
        $("span.amount-with-currency").each(function () {
            $(this).text(amountString);
        });
        $("span.recurring-frequency").each(function () {
            $(this).text(recurringFrequency);
        });
        $("span.recurring-frequency-no-ly").each(function () {
            $(this).text(recurringFrequencyWithoutLy);
        });
        $("span.selected-plan-recurring-frequency-abbreviation").each(function () {
            $(this).text(recurringFrequencyAbbreviation);
        });
    }

    const prevSelectedInterval = localStorage.getItem("selectedInterval");
    if (!prevSelectedInterval) {
        localStorage.setItem("selectedInterval", "r_yearly");
    } else if (document.location.search.match(/thankyou/)) {
        // Swap out the selected payment amount
        let other = "";
        if (prevSelectedInterval === "r_monthly") {
            other = "r_yearly";
        } else {
            other = "r_monthly";
        }
        $("#" + other).removeClass("selected");
        $("#" + prevSelectedInterval).addClass("selected");
    }

    // Also call this to initialize the text w/ the currently selected values on page load.
    updatePlanText();

    // choose between prices
    $("div#amount_select_row").click(function (ev) {
        let id = ev.target.id;
        if (id === "monthly-rate") {
            id = "r_monthly";
        } else if (id === "yearly-rate") {
            id = "r_yearly";
        }
        // yearly-rate and monthly-rate are the spans in the divs users could also
        // click on to select ^^ so overwrite the ID to make the logic below simpler
        // and only key off r_monthly or r_yearly
        if (id !== null && (id === "r_monthly" || id === "r_yearly")) {
            localStorage.setItem("selectedInterval", id);
            if (id !== selectedInterval) {
                // Swap out the selected payment amount
                $("#" + selectedInterval).removeClass("selected");
                selectedInterval = id;
                $("#" + selectedInterval).addClass("selected");
            }
        }
        updatePlanText();
    });

    // code to switch between processors and animate box
    function switchToStripe() {
        const currentlyOnStripe = $stripePaymentButton.is(":visible") === true || currentProcessor === "stripe";
        if (currentlyOnStripe === true) {
            return false;
        }
        currentProcessor = "stripe";
        $paypalPaymentBox.fadeOut(pmtMethodTransitionMs, function () {
            $paypalRadio.prop("checked", false);
            $stripePay.fadeIn(pmtMethodTransitionMs);
            $stripeRadio.prop("checked", true);
        });
    }

    function switchToPaypal() {
        const currentlyOnPaypal = $paypalButton.is(":visible") === true || currentProcessor === "paypal";
        if (currentlyOnPaypal === true) {
            return false;
        }
        currentProcessor = "paypal";
        $stripePay.fadeOut(pmtMethodTransitionMs, function () {
            $stripeRadio.prop("checked", false);
            $paypalRadio.prop("checked", true);
            $paypalPay.fadeIn(pmtMethodTransitionMs);
            $paypalPaymentBox.fadeIn(pmtMethodTransitionMs);
        });
    }

    // choose between payment processors
    $("button#stripe_radio").on("click", switchToStripe);
    $("button#paypal_radio").on("click", switchToPaypal);

    // Compute URL to send the user to after a successful payment @onPaymentSuccessURL
    const theURL = new URL(window.location);
    const queryParams = new URLSearchParams(theURL.search);
    queryParams.append("thankyou", 1);
    var u = getUserId();
    if (u === "") {
        setUserIdDiv();
        u = getUserId();
    }
    queryParams.append("u", u);
    const onPaymentSuccessURL = theURL.origin + theURL.pathname + "?" + queryParams.toString();

    // Set up Paypal and Stripe forms.
    Paypal.init({
        testmode: !!document.location.search.match(/testmode/),
        button: $paypalButton,
        currency: getCurrency,
        getDollarsString: function () {
            v = getAmountString();
            return v;
        },
        buttonClickPreCheck: async function () {
            // return true to tell PayPal to go ahead with the transaction
            if (typeof logPaymentButtonClick === "function") {
                logPaymentButtonClick({
                    processor: "paypal",
                    amount: getAmountCents(),
                    recurring_frequency: getSubType(),
                });
            }
            return true;
        },
        itemName: function () {
            return "Adblock Plus Premium";
        },
        recurring: isRecurring,
        subType: getSubType,
        locale: function () {
            if (___AB_USING_CURRENCY_LIB === true) {
                var langOverride = getLanguageQueryString();
                if (langOverride !== "") {
                    return langOverride;
                }
                return getLanguage();
            }
            return "en_US";
        },
        thankYouPage: {
            url: onPaymentSuccessURL,
            queryParams: {},
        },
        customImageUrl: "https://adblockplus.org/img/adblock-plus-paypal.png",
    });

    function getStripeLocale() {
        if (___AB_USING_CURRENCY_LIB === true) {
            var langOverride = getLanguageQueryString();
            if (langOverride !== "") {
                return langOverride;
            }
            return "auto";
        }
        return "en";
    }

    // Stripe checkout initialization
    StripeCheckoutSession.init({
        testmode: !!document.location.search.match(/testmode/),
        submitButtonId: "donate_now",
        currency: getCurrency,
        recurring: isRecurring,
        subType: getSubType,
        locale: getStripeLocale,
        onSuccessURL: onPaymentSuccessURL,
        description: function () {
            return "Securely processed by Stripe.com";
        },
        getAmountCents: function () {
            v = getAmountString();
            if (_currency.currencyUsesDecimals(getCurrency()) === false) {
                return Number(v);
            }
            return Math.round(v * 100);
        },
        onAjaxStart: function () {
            $("body").css("cursor", "wait");
            $(stripePaymentButton).prop("disabled", true);
            $("html *").addClass("waiting");
        },
        onAjaxComplete: function () {
            $("body").css("cursor", "auto");
            $(stripePaymentButton).prop("disabled", false);
            $("html *").removeClass("waiting");
        },
    });

    if (typeof _logV2PageView !== "undefined") {
        _logV2PageView("myadblock_enrollment");
    }
});
