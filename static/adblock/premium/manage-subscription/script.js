$(document).ready(function() {
    // translate the page
    // chrome.i18n._initialize("en", "/i18n/_locales/", function() {
    //     if (typeof localizePage === "function") {
    //         localizePage();
    //     }
    // });

    var paymentInfoObj = null; // global to hold the paymentInfoObj after it's fetched
    var _licenseCode = [(document.location.search.match(/(?:[?&])lic=([a-zA-Z0-9]+)/) || {})[1], "false"];
    var licenseCode =
        _licenseCode.filter(function(o) {
            return o !== undefined;
        })[0] || "false";

    /* Constants and cached selectors shared by the page */
    const Page = {
        FeaturesDontMissOut: $("div#cool-stuff-you-get"),
        RegistrationBox: $("div#registration-box"),
        EnterConfirmationCode: $("div#card2-page-2"),
        EWrongConfirmationCode: $("div#card2-error-2"),
        ENoUserId: $("div#card2-error-3"),
        EGenericError: $("div#card2-error-5"),
        SpinnerNoText: $("div#spinner-no-text"),
        ManageSubscriptionActivity: $("div#manage-subscription-activity"),
        FreeAccessMessage: $("div#you-have-free-access"),
        SubscriptionCanceledMessage: $("div#subscription-canceled"),
        SetupInProgress: $("div#card2-error-6"),
        SunsetPremiumInfinity: $("div#sunset-premium-infinity"),
    };

    const $emailAddressDisplay = $("h3#user-email-address");
    const $confirmationCodeInput = $("input#code");
    const $confirmationCodeError = $("div#confirmation-code-error");

    // Page.EnterConfirmationCode
    // "Please enter the 6 character code"
    $confirmationCodeInput.on("keypress", function() {
        if ($confirmationCodeError.is(":visible") === true) {
            $confirmationCodeError.hide();
        }
    });

    $("div#initial-cancel-button").click(function() {
        Page.ManageSubscriptionActivity.hide();
        Page.FeaturesDontMissOut.show();
    });

    $("div#keep-these-features").click(function() {
        Page.FeaturesDontMissOut.hide();
        Page.ManageSubscriptionActivity.show();
    });

    function showWrongCode() {
        Page.SpinnerNoText.fadeOut(1000, function() {
            Page.EWrongConfirmationCode.show();
        });
    }

    function showLicenseSetupInProgress() {
        Page.SpinnerNoText.fadeOut(1000, function() {
            Page.SetupInProgress.show();
        });
    }

    function showSunsetPremiumInfinity(paymentInfo) {
        Page.RegistrationBox.hide();
        Page.SunsetPremiumInfinity.show();
        if (paymentInfo && paymentInfo["createdAt"] !== null) {
            const updateDateString = localeDateFromTimestamp(paymentInfo["createdAt"]);
            $("span#sunset-premium-infinity-update-date").text("on " + updateDateString);
        }
    }

    let thisLang = "en";
    if (typeof getLanguage === "function") {
        thisLang = getLanguage();
    }

    $.ajax({
        url: "https://myadblock.licensing.adblockplus.dev/license/api/",
        headers: {
            "Accept-Language": thisLang,
        },
        method: "POST",
        dataType: "json",
        data: {
            cmd: "manage_subscription",
            action: "send_email",
            license: licenseCode,
            testmode: !!document.location.search.match(/testmode/),
        },
    })
        .done(function(msg) {
            if (msg) {
                if (msg.email) {
                    $emailAddressDisplay.text(msg.email);
                    Page.SpinnerNoText.fadeOut(1000, function() {
                        Page.EnterConfirmationCode.show();
                    });
                }
                if (msg.licenseSetupComplete !== null && msg.licenseSetupComplete === false) {
                    showLicenseSetupInProgress();
                }
                if (msg.error) {
                    showWrongCode();
                }
            } else {
                // we didn't get a response from the server at all...
                Page.SpinnerNoText.fadeOut(1000, function() {
                    Page.EGenericError.show();
                });
            }
        })
        .fail(showWrongCode);

    function localeDateFromTimestamp(timestamp) {
        let q = new Date(timestamp); // get the timezone offset for the subscription date to display
        let tzOffsetInMs = q.getTimezoneOffset() * 60 * 1000; // getTimezoneOffset returns minutes
        let nextBillDate = new Date(timestamp + tzOffsetInMs); // nextBillTimestamp is ms since epoch
        // Display date with long month, day, and year, e.g., October 21, 2018
        let locale = "en-US";
        if (typeof getLanguage === "function") {
            const thisLang = getLanguage();
            if (typeof thisLang === "string" && thisLang.length >= 2) {
                locale = thisLang;
            }
        }
        return nextBillDate.toLocaleString(locale, {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    function handleSubmitCode() {
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
        Page.SpinnerNoText.show();

        function populateOneTimeInfo(paymentInfoObj) {
            Page.RegistrationBox.hide();
            const freeExpiresElement = $("span#free-license-expires-date");
            const freeExpiresMsg = freeExpiresElement.text();
            freeExpiresElement.text(freeExpiresMsg.replace("$1", localeDateFromTimestamp(paymentInfoObj["expiresAt"])));
            Page.FreeAccessMessage.show();
        }

        function setCardBrandAndExpDate(cardBrand, expMonth, expYear) {
            $("span#card-brand").text(cardBrand);
            $("span#current-card").text(cardBrand);
            $("span.current-card-expiration").each(function() {
                $(this).text(`${expMonth}/${expYear}`);
            });
        }

        function populateSubscriptionInfo(paymentInfoObj) {
            Page.RegistrationBox.hide();
            Page.ManageSubscriptionActivity.show();
            let currencyText = paymentInfoObj["currency"].toUpperCase();
            if (typeof _currency !== "undefined" && typeof _currency.getSymbol === "function") {
                currencyText = _currency.getSymbol(paymentInfoObj["currency"]);
            }
            const amount = (paymentInfoObj["amount"] / 100).toFixed(2);
            const nextBill = $("span#amount-next-bill");
            nextBill.text(nextBill.text().replace("$1", currencyText + amount));
            const renewsOnDate = $("span#renews-on-date");
            const renewsText = renewsOnDate.text().replace("$1", (localeDateFromTimestamp(paymentInfoObj["nextBillTimestamp"])));
            renewsOnDate.text(renewsText);
            setCardBrandAndExpDate(paymentInfoObj["last4_brand"], paymentInfoObj["exp_month"], paymentInfoObj["exp_year"]);
            $("span#next-bill").text(localeDateFromTimestamp(paymentInfoObj["nextBillTimestamp"]));
            $("span.current-card-expiration").each(function() {
                $(this).text(`${paymentInfoObj["exp_month"]}/${paymentInfoObj["exp_year"]}`);
            });
            // $("div#update-payment-method").click(function(event) {
            //     $("div#update-card-activity").toggle("hidden");
            // });

            // if (paymentInfoObj["processor"] === "paypal") {
            //     $("div#stripe-update-card").hide();
            //     $("div#paypal-update-card").show();
            //     const isTestmode = !!document.location.search.match(/testmode/);
            //     const payPalDomain = isTestmode ? "https://sandbox.paypal.com" : "https://www.paypal.com"
            //     $("a#paypal-manage-href").attr("href", `${payPalDomain}/myaccount/autopay/connect/${paymentInfoObj["subscriptionId"]}`);
            // } else if (paymentInfoObj["processor"] === "stripe") {
            //     $("div#paypal-update-card").hide();
            //     $("div#top-card-info").show();
            //     $("div#stripe-update-card").show();
            //     if card needs update and biller is Stripe, show the manage subscription box.
            //     if (paymentInfoObj["card_needs_update"] === true) {
            //         $("span.current-card-expiration").each(function() {
            //             $(this).addClass("warning");
            //         });
            //         // Show the card as action is needed.
            //         $("div#update-card-required").show();
            //         $("div#update-card-activity").show();
            //     } else {
            //         // User can view card if they click "Update Payment Method" but not shown by default.
            //         $("div#update-card-optional").show();
            //     }
            // } else {
            //     console.log("unknown payment processor...", paymentInfoObj["processor"]);
            // }
        }

        $.ajax({
            url: "https://myadblock.licensing.adblockplus.dev/license/api/",
            method: "POST",
            dataType: "json",
            data: {
                cmd: "manage_subscription",
                action: "get_info",
                license: licenseCode,
                token: enteredCode,
                testmode: !!document.location.search.match(/testmode/),
            },
        })
            .done(function(msg) {
                if (msg && typeof msg.paymentInfo !== "undefined") {
                    paymentInfoObj = msg.paymentInfo;
                    if (paymentInfoObj === false || paymentInfoObj["cancelled"] === true) {
                        Page.RegistrationBox.fadeOut(1000, function() {
                            Page.SubscriptionCanceledMessage.show();
                        });
                    } else if (
                        paymentInfoObj.hasOwnProperty("isSubscription") &&
                        paymentInfoObj["isSubscription"] === false
                    ) {
                        populateOneTimeInfo(paymentInfoObj);
                    } else if (paymentInfoObj["transactionId"] === "SUNSET-PREMIUM-INFINITY") {
                        showSunsetPremiumInfinity(paymentInfoObj);
                    } else {
                        populateSubscriptionInfo(paymentInfoObj);
                    }
                } else {
                    // we didn't get a response from the server at all...
                    Page.SpinnerNoText.fadeOut(1000, function() {
                        Page.EGenericError.show();
                    });
                }
            })
            .fail(showWrongCode);
    }

    $("#no-really-cancel").click(function() {
        if (!paymentInfoObj || !paymentInfoObj["subscriptionId"] || !paymentInfoObj["processor"]) {
            Page.SpinnerNoText.fadeOut(1000, function() {
                Page.EGenericError.show();
            });
            return false;
        }
        Page.EnterConfirmationCode.hide();
        Page.FeaturesDontMissOut.hide();
        Page.RegistrationBox.show();
        Page.SpinnerNoText.show();
        $.ajax({
            url: "https://myadblock.licensing.adblockplus.dev/license/api/",
            method: "POST",
            dataType: "json",
            data: {
                cmd: "manage_subscription",
                action: "cancel",
                license: licenseCode,
                token: enteredCode,
                transactionId: paymentInfoObj["subscriptionId"],
                processor: paymentInfoObj["processor"],
                testmode: !!document.location.search.match(/testmode/),
            },
        })
            .done(function(msg) {
                if (msg && msg.success) {
                    Page.RegistrationBox.fadeOut(1000, function() {
                        Page.SubscriptionCanceledMessage.show();
                    });
                } else {
                    // we didn't get a response from the server at all...
                    Page.SpinnerNoText.fadeOut(1000, function() {
                        Page.EGenericError.show();
                    });
                }
            })
            .fail(showWrongCode);
    });

    // Submit and verify the confirmation code...
    $("div#submit_code").click(function(e) {
        e.preventDefault();
        $("form#confirmation-code")
            .find(":submit")
            .click();
    });

    $("form#confirmation-code").on("submit", function(e) {
        e.preventDefault();
        handleSubmitCode();
    });

    if (typeof _logV2PageView !== "undefined") {
        _logV2PageView("myadblock_manage_subscription");
    }

    function getSubscriptionId() {
        return paymentInfoObj["subscriptionId"];
    }

    const ccFormSelectors = {
        cardNumber: "#card-no",
        cardExpiry: "#card-exp",
        cardCvc: "#card-cvc",
    };
    const stripePaymentButton = "div#donate_now";
    const $stripePaymentButton = $(stripePaymentButton);
    const paymentForm = "form#payment-form";
    const $paymentForm = $(paymentForm);


    // Code for the Payment Card
    // Set up Stripe form.
    $stripePaymentButton.click(function () {
        // submit button is a div, not a button, so we trigger
        // a synthetic click when the user clicks the submit div
        $paymentForm.find(":submit").click();
    });

    const $PaymentFormError = $("div#payment_form_error");
    function showError(message) {
        $PaymentFormError.text(message);
        $PaymentFormError.show();
        if (typeof _logV2MiscEvent !== "undefined") {
            _logV2MiscEvent("premium_card_update_error", {"error": message});
        }
    }

    function clearError() {
        $PaymentFormError.text("");
        $PaymentFormError.hide();
    }

    // stores the completion / error status of Stripe Elements custom fields
    const stripeElDict = {};

    function stripeFormFieldsAreValid() {
        // check @stripeElDict for errors or incomplete fields.
        const fieldsWithErrors = Object.values(stripeElDict).filter((e) => e.isError === true);
        if (fieldsWithErrors.length > 0) {
            // show the first error, return invalid.
            showError(fieldsWithErrors[0].message);
            return false;
        }

        const incompleteFields = Object.values(stripeElDict).filter((e) => e.isComplete === false);
        if (incompleteFields.length > 0) {
            return false;
        }

        // Stripe Elements fields are good... confirm non-empty e-mail
        var theEmailField = $paymentForm[0];
        if (typeof theEmailField === "object" && typeof theEmailField.checkValidity === "function") {
            if (theEmailField.checkValidity() === false) {
                /* If the form is invalid, trigger submit to display HTML5 validation error
                message. Otherwise this validation is bypassed when user submits with Enter. */
                $paymentForm.find(":submit").click();
                return false;
            }
            return true;
        }
        console.warn("Email field not set up correctly.");
        return false;
    }

    // Listener registered with Stripe Elements: gets
    // information on change about validity and completion
    // status of the input fields. Display error / prevent
    // form submission if incomplete or invalid fields.
    // https://stripe.com/docs/stripe-js/elements/migrating#events-error-handling
    function onStripeElementsChange(ev) {
        if (ev.error && ev.error.type === "validation_error") {
            stripeElDict[ev.elementType] = {
                isError: true,
                isComplete: ev.complete,
                message: ev.error.message,
            };
            showError(ev.error.message);
        } else {
            stripeElDict[ev.elementType] = {
                isError: false,
                isComplete: ev.complete,
            };
            clearError();
        }
    }

    const stripeCC = StripeCC.init({
        extraMetadataParams: {
            "subscription_id": getSubscriptionId, // the subscription ID to update assoc. customer's card on
        },
        customChargeURL: "UPDATE",
        testmode: !!document.location.search.match(/testmode/),
        elementSelectors: ccFormSelectors,
        elementChangeListener: onStripeElementsChange,
        onErrorCb: showError,
        paymentFormSelector: paymentForm,
        submitButtonSelector: stripePaymentButton,
        buttonClickPreCheck: stripeFormFieldsAreValid,
        getAmountCents: function () {
            return null;
        },
        onSuccess: function (_, responseData) {
            const newCard = responseData.data;

            // update card fields
            $("span#card-brand").text(newCard.new_brand_last4);
            $("span#current-card").text(newCard.new_brand_last4);
            $("span.current-card-expiration").each(function() {
                $(this).text(`${newCard.new_exp_month}/${newCard.new_exp_year}`);
            });

            // the user could update to a card that's still going to expire before
            // the next bill date ...
            const dt = new Date(paymentInfoObj["nextBillTimestamp"]);
            const nextBillMonth = dt.getMonth() + 1; // +1 because in JS Jan=0, Dec=11
            const nextBillYear = dt.getFullYear(); // getYear is deprecated, use getFullYear instead

            if (typeof _logV2MiscEvent !== "undefined") {
                _logV2MiscEvent("premium_card_update_success");
            }

            // if (newCard.new_exp_year > nextBillYear || newCard.new_exp_year === nextBillYear && newCard.new_exp_month > nextBillMonth) {
            //     $("span.current-card-expiration").each(function() {
            //         $(this).removeClass("warning");
            //     });
            //     $("div#update-card-required").hide();
            //     $("div#update-card-optional").show();
            //     $("div#update-card-activity").toggle("hidden");
            // } else {
            //     // the card was updated to a card that's still going to expire.
            //     // Show warnings and don't hide the payment form.
            //     $("span.current-card-expiration").each(function() {
            //         $(this).addClass("warning");
            //     });
            //     // notify the user.
            //     $("div#payment_form_error").text("This updated card will also expire before the next bill date. Please try another card.");
            // }
            stripeCC.clearElementsFields();
        },
        onError: function () {
            console.log("error");
            paymentInProgress = false;
        },
        onAjaxStart: function () {
            paymentInProgress = true;
            $("body").css("cursor", "wait");
            $(stripePaymentButton).prop("disabled", true);
            $("html *").addClass("waiting");
        },
        onAjaxComplete: function () {
            paymentInProgress = false;
            $("body").css("cursor", "auto");
            $(stripePaymentButton).prop("disabled", false);
            $("html *").removeClass("waiting");
        },
    });
});
