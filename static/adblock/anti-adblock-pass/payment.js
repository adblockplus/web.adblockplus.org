$(document).ready(function() {
    // The pricing code...
    const monthlyPricesUSD = [0, 2, 4];
    const yearlyPricesUSD = [0, 20, 40];
    const premiumPaddleProductIds = {
        "sandbox": {
            "monthly": {
                "me": 55427,
                "mevpn": 47981
            },
            "yearly": {
                "me": 55428,
                "mevpn": 47980
            }
        },
        "prod": {
            "monthly": {
                "me": 842007,
                "mevpn": 822817
            },
            "yearly": {
                "me": 842011,
                "mevpn": 822814
            }
        }
    }
    const monthlyPriceInterval = $("#i18n-slash_mo_no_replace").text();
    const yearlyPriceInterval = $("#i18n-slash_yr_no_replace").text();

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
        CloseAlreadyContributedBtn: $(".back-to-payments"),
        SubmitEmailBtn: $("#submit_email"),
        AlreadyDonatedBtn: $("#already-donated"),
        AlreadyDonatedProgress: $(".progress-box"),
        AlreadyDonatedPages: $("#already-donated-activity .box-step not[id=already-donated-activity-waiting]"),
        EmailAddressInput: $("#prev_donation_email"),
        AlreadyDonatedNewsletter: $("#newsletter-synthetic-checkbox-2"),
        PaymentBox: $("#payments-content")
    };

    const isYearly = () => $(".slider").hasClass("active");
    const isTestmode = () => !!document.location.search.match(/testmode/);
    const toggleSliders = () => $(".slider").each(function() { $(this).toggleClass("active"); });
    const getPricesForRecurringFrequency = () => isYearly() ? yearlyPricesUSD : monthlyPricesUSD;
    const getPaddleProductsIdsForRecurringFrequency = () => {
        if (isTestmode()) {
            if (isYearly()) 
                return premiumPaddleProductIds["sandbox"]["yearly"] 
            else
                return premiumPaddleProductIds["sandbox"]["monthly"] 
        } else {
            if (isYearly()) 
                return premiumPaddleProductIds["prod"]["yearly"] 
            else
                return premiumPaddleProductIds["prod"]["monthly"] 
        }
    }

    const setPrices = (prices) => {
        const [free, me, mevpn] = prices;
        $(".price-free").each(function() { $(this).text(free); })
        $(".price-me").each(function() { $(this).text(me); });
        $(".price-mevpn").each(function() { $(this).text(mevpn); });
        if (isYearly()) {
            $(".price-interval").each(function() { $(this).text(yearlyPriceInterval); });
            $("#r_yearly").attr("data-recurring-frequency", "yearly");
            $("#r_monthly").attr("data-recurring-frequency", "yearly");
        } else {
            $(".price-interval").each(function() { $(this).text(monthlyPriceInterval); });
            $("#r_yearly").attr("data-recurring-frequency", "monthly");
            $("#r_monthly").attr("data-recurring-frequency", "monthly");
        }
        $("#r_yearly").attr("data-amount", mevpn);
        $("#r_monthly").attr("data-amount", me);
    };

    const setPaddleProductIds = (productIds) => {
        $("button[data-plan=mevpn]").attr("data-product-id", productIds["mevpn"]);
        $("button[data-plan=me]").attr("data-product-id", productIds["me"]);
    };

    const getSelectedAmountFrequencyPlan = () => {
        const $selectedOption = $("#amount_select_row button.selected");
        const amount = $selectedOption.attr("data-amount");
        const frequency = $selectedOption.attr("data-recurring-frequency");
        const plan = $selectedOption.attr("data-plan");
        let suffix =  $("#i18n-slash_yr_no_replace").text();
        if (frequency === "monthly") {
            suffix = $("#i18n-slash_mo_no_replace").text();
        }
        const planName = $("#amount_select_row button.selected .amount-text").html();
        const paddleProductId = $selectedOption.attr("data-product-id");
        return [amount, frequency, plan, suffix, planName, paddleProductId]
    }

    const updateSelectedPlanText = () => {
        const [amount, frequency, plan, suffix, planName, productId] = getSelectedAmountFrequencyPlan();
        const currencySymbol = "$"; // right now only USD.
        $(".plan-name").each(function() { $(this).text(planName); })
        $(".selected-plan-price").each(function() { $(this).text(`${currencySymbol}${amount}`); });
        $(".selected-plan-recurring-frequency-abbreviation").each(function() { $(this).text(suffix); });
        if (!document.location.search.match(/thankyou/)) {
            // Stash last set plan text to localStorage.
            localStorage.setItem("purchaseinfo", JSON.stringify({ amount, frequency, plan, suffix, planName }));
        } else {
            // Restore last set plan text from localStorage.
            let purchasedPlan = "mevpn";  // default to this
            try {
                const purchaseInfoObj = JSON.parse(localStorage.getItem("purchaseinfo"));
                console.log("RESTORING PURCHASE INFO FROM LOCAL STORAGE:", purchaseInfoObj);
                $(".plan-name").each(function() { $(this).text(purchaseInfoObj.planName); })
                $(".selected-plan-price").each(function() { $(this).text(`${currencySymbol}${purchaseInfoObj.amount}`); });
                $(".selected-plan-recurring-frequency-abbreviation").each(function() { $(this).text(purchaseInfoObj.suffix); });
                // Check localStorage for purchased plan "me" or "mevpn"
                if (purchaseInfoObj.plan !== "free") {
                    purchasedPlan = purchaseInfoObj.plan;
                }
            } catch (err) {
                console.error("error restoring persisted plan:", err);
            }
            $(`#${purchasedPlan}-success`).show();
            // The selector is "#(me|mevp)-success"
        }
    }

    updateSelectedPlanText();

    function resetAlreadyDonatedActivity() {
        Page.EnterConfirmationCode.hide();
        Page.InProgressSpinner.hide();
        Page.SuccessCard.hide();
        Page.EnterPurchaseEmail.show();
        Page.ENoDonations.hide();
        Page.EWrongConfirmationCode.hide();
        Page.ENoUserId.hide();
        Page.EProblemActivating.hide();
        Page.EGenericError.hide();
        Page.EmailAddressInput.val("");
        Page.EmailAddressInput.focus();
        Page.AlreadyDonatedProgress.css('opacity', 0);
        Page.AlreadyDonatedNewsletter.prop("checked", false);
        $("#newsletter-synthetic-checkbox-2").prop("checked", false);
    }

    Page.CloseAlreadyContributedBtn.on("click", function () {
        Page.AlreadyDonatedCard.hide();
        resetAlreadyDonatedActivity();
        Page.PaymentCard.show();
    });

    function scrollToPaymentBox() {
        const scrollOffset = Page.PaymentBox.offset().top - 24;
        $("html, body").animate({ scrollTop: scrollOffset }, 600);
    }

    const planInverseMap = {
        "me": "mevpn",
        "mevpn": "me"
    };

    $("#amount_select_row button").on("click", function() {
        const thisButtonPlan = $(this).data("plan");
        $(this).addClass("selected");
        const otherPlan = planInverseMap[thisButtonPlan];
        $(`#amount_select_row button[data-plan="${otherPlan}"]`).removeClass("selected");
        updateSelectedPlanText();
    });

    $(".your-plan").on("click", function() {
        const thisPlan = $(this).data("plan");
        if (thisPlan !== "free") {
            $("#amount_select_row button").each(function() {
                const thisButtonPlan = $(this).data("plan");
                if (thisButtonPlan === thisPlan) {
                    $(this).addClass("selected");
                } else {
                    $(this).removeClass("selected");
                }
            });
            updateSelectedPlanText();
            scrollToPaymentBox();
        }
    });

    $(".monthly-yearly-slider").on("click", function(ev) {
        toggleSliders();
        setPrices(getPricesForRecurringFrequency());
        setPaddleProductIds(getPaddleProductsIdsForRecurringFrequency());
        updateSelectedPlanText();
    });

    $("p.get-it-now, #upgrade-to-premium, .premium-cta").on("click", function(event) {
        event.preventDefault();
        scrollToPaymentBox();
    });

    $("#get-premium-and-vpn").on("click", function() {
        $("#r_yearly").click();
        scrollToPaymentBox();
    });

    // VPN download logic
    // osToURL maps single char OS abbreviation to download link for that URL.
     const osToURL = {
        W: "https://dl.adblock.dev/windows/vpn/AdBlockVPN.exe",
        I: "https://apps.apple.com/us/app/adblock-vpn/id1528366502",
        A: "https://play.google.com/store/apps/details?id=com.adblock.vpn",
        M: "https://dl.adblock.dev/mac/vpn/AdBlockVPN.dmg",
    };
    const osToDisplayName = {
        W: "Windows",
        I: "iOS",
        A: "Android",
        M: "Mac",
    }
    let downloadURL = osToURL[getOSSingleChar()];
    let osDisplayName = osToDisplayName[getOSSingleChar()];
    const missingPlatformMessage =
        "We don't have a download available for your platform just yet. Please check back soon!";
    if (downloadURL === null || typeof downloadURL === "undefined") {
        downloadURL = `javascript:window.alert("${missingPlatformMessage}");`;
    }
    $("a#download-vpn").attr("href", downloadURL);
    $("#vpn-os-display-name").text(osDisplayName);


    const urlParams = new URLSearchParams(window.location.search);
    const maybeAction = urlParams.get("action");
    const pageActionAlreadyDonated = maybeAction === "already_donated";

    // Holds the state of the user's choice, default: monthly
    var ___AB_USING_CURRENCY_LIB = false;

    // setup paddle product IDs
    setPaddleProductIds(getPaddleProductsIdsForRecurringFrequency());

    // Utility fn to show/hide cards using query params for testing.
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

    function scrollToRegistrationBox() {
        Page.PaymentBox[0].scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    // On successful activation, tell extension to activate MyAdBlock.
    function sendPaymentSuccessToExtension() {
        return new Promise(function(resolve, reject) {
            const version = 1;
            const payload = {
                command: "payment_success",
                transID: "",
                version: version,
            };
            window.addEventListener("message", function(response) {
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
        // wait up to 10 seconds to receive pmt success receipt verification from extension
        const maxWait = new Promise(function(_, reject) {
            setTimeout(function() {
                reject();
            }, 10000);
        });
        Promise.race([sendPaymentSuccessToExtension(), maxWait])
            .then(function() {
                if (typeof onSuccess === "function") {
                    onSuccess();
                }
            })
            .catch(function(err) {
                if (typeof onFailure === "function") {
                    onFailure(err);
                }
            });
    }

    // User was redirected here, so just activate extension
    // then jump to "You're ready to go" message.
    if (document.location.search.match(/thankyou/)) {
        Page.PaymentCard.hide();
        Page.AlreadyDonatedCard.show();
        Page.InProgressSpinner.show();
        scrollToPaymentBox();

        // wait 500 ms for things to load before attempting to enroll the extension
        // mainly get at the back of the event loop
        setTimeout(function() {
            var getInjectedUseridDiv = function() {
                var el = document.getElementById("adblockUserId");
                if (el !== null && typeof el === "object" && typeof el["textContent"] === "string") {
                    return el["textContent"];
                }

                return "";
            };
            var getInjectedUseridVariable = function() {
                if (typeof adblock_userid === "string" && adblock_userid.length > 0) {
                    return adblock_userid;
                }

                return "";
            };
            var useridDivBefore = getInjectedUseridDiv();
            var useridVarBefore = getInjectedUseridVariable();

            const showActivationError = function() {
                Page.InProgressSpinner.fadeOut(1000, function() {
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

            const showSuccess = () => {
                const showCards = ["pay", "card-3", "pmt-success-left"];
                const hideCards = ["card-1", "card-2", "choose-plans", "other-options", "already-donated-activity"];
                showCards.forEach((card) => {
                    $("#" + card).show();
                });
                hideCards.forEach((card) => {
                    $("#" + card).hide();
                });
            };
            showSuccess();

            const callActivateExtension = function () {
                activateExtension(
                    function onSuccess() {
                        Page.InProgressSpinner.fadeOut(1000, function () {
                            // Extension activated, show "You're ready to go" message
                            showSuccess();
                            // If user opted in to receive newsletter, send log message.
                            if (
                                localStorage !== null &&
                                typeof localStorage !== "undefined" &&
                                typeof localStorage.getItem === "function"
                            ) {
                                try {
                                    if (Boolean(localStorage.getItem("email-optin")) === true) {
                                        if (typeof _logV2MiscEvent === "function") {
                                            _logV2MiscEvent("newsletter_optin");
                                        }
                                        localStorage.removeItem("email-optin");
                                    }
                                } catch (err) {
                                    console.warn("Failed to get localStorage e-mail opt-in preference. Err: ", err);
                                }
                            }
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
                setTimeout(function() {
                    var userId = getUserIdOrUnknown();
                    var dispatchNow = false;
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
    
    // Always true on /premium right now
    function isRecurring() {
        return true;
    }

    function getSubType() {
        const [amount, frequency, plan, suffix, planName, productId] = getSelectedAmountFrequencyPlan();
        let recurringType = frequency;
        return recurringType;
    }

    function getAmountString() {
        const [amount, frequency, plan, suffix, planName, productId] = getSelectedAmountFrequencyPlan();
        return amount;
    }

    function getProductId() {
        const [amount, frequency, plan, suffix, planName, productId] = getSelectedAmountFrequencyPlan();
        return productId;
    }

    function getTitle() {
        const [amount, frequency, plan, suffix, planName, productId] = getSelectedAmountFrequencyPlan();
        if (plan === "me") {
            return "Adblock Plus Premium";
        } else if (plan === "mevpn") {
            return "Adblock Plus Premium + VPN";
        }

        return "Adblock Plus";
    }

    function getCurrency() {
        // right now, all USD.
        return "USD";
    }

    // We add thankyou query param to the URL to signify successful payment and show the thank you div.
    const theURL = new URL(window.location);
    const queryParams = new URLSearchParams(theURL.search);
    if (!queryParams.get("thankyou")) {
        // On page load, when no thankyou query param present, remove localStorage 'email-optin'
        // in case it was populated before a reload of the page. In this way it reflects the checkbox
        localStorage.removeItem("email-optin");

        queryParams.append("thankyou", 1);
        queryParams.append("var", 1);
    }
    queryParams.append("u", getUserId());
    const onSuccessURL = `https://accounts.adblockplus.org/premium?${queryParams.toString()}`;

    var ___AB_DROPDOWN_SHOW = false;
    var ___AB_USING_CURRENCY_LIB = false;

    // Paddle Checkout initialization
    PaddleCheckout.init({
        testmode: isTestmode(),
        submitButtonId: "donate_now",
        currency: getCurrency,
        recurring: isRecurring,
        subType: getSubType,
        locale: getLanguageInPath,
        getProductId: getProductId,
        title: getTitle,
        getAmountCents: function() {
            v=getAmountString();
            if (___AB_DROPDOWN_SHOW === true && _currency.currencyUsesDecimals(getCurrency()) === false) {
                return Number(v);
            }
            return Math.round(v*100);
        },
        onAjaxStart: function() {
            $("body").css("cursor", "wait");
            $paddleCheckoutBtn.prop("disabled", true);
            $("html *").addClass("waiting");
        },
        onAjaxComplete: function() {
            $("body").css("cursor", "auto");
            $paddleCheckoutBtn.prop("disabled", false);
            $("html *").removeClass("waiting");
        },
        onSuccessURL: onSuccessURL,
    });

    function setProgressIndicatorTo(numCompleted) {
        if (numCompleted < 0 || numCompleted > 3) {
            return false;
        }
        for (var i = 1; i <= 3; i++) {
            if (i <= numCompleted) {
                $("#progress-" + i).addClass("progress-circle-completed");
            } else {
                $("#progress-" + i).removeClass("progress-circle-completed");
            }
        }
    }

    function showAlreadyDonatedFlow() {
        console.log("showAlreadyDonatedFlow");
        Page.PaymentCard.hide();
        Page.AlreadyDonatedCard.show();
        Page.EnterPurchaseEmail.show();
        Page.AlreadyDonatedProgress.css('opacity', 1);
        setProgressIndicatorTo(1);
    }

    // Listeners for links in activities that switch users between cards
    Page.AlreadyDonatedBtn.on("click", function(event) {
        // "I've donated to AdBlock before..."
        event.preventDefault();
        console.log("prevented default");
        showAlreadyDonatedFlow();
        if ($("#newsletter-synthetic-checkbox-1").is(":checked")) {
            $("#newsletter-synthetic-checkbox-2").prop("checked", true);
        }
    });

    let thisLang = "en";
    if (typeof getLanguage === "function") {
        thisLang = getLanguage();
    }

    const $confirmationCodeInput = $("#code");
    const $confirmationCodeError = $("#confirmation-code-error");

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
                email: Page.EmailAddressInput.val(),
            },
        })
            .done(function(msg) {
                Page.InProgressSpinner.fadeOut(1000, function() {
                    if (msg && msg.success === true) {
                        // clear the code input field in case there's pre-existing text
                        $confirmationCodeInput.val("");
                        Page.EnterConfirmationCode.show();
                        $confirmationCodeInput.focus();
                        setProgressIndicatorTo(2);
                    } else {
                        Page.EGenericError.show();
                        setProgressIndicatorTo(0);
                    }
                });
            })
            .fail(function() {
                Page.InProgressSpinner.fadeOut(1000, function() {
                    Page.EGenericError.show();
                    setProgressIndicatorTo(0);
                });
            });
    }

    $("form#prev_donation").on("submit", function(e) {
        e.preventDefault();
        if (pageActionAlreadyDonated && typeof _logV2MiscEvent === "function") {
            // Log if user successfully submits their email to the already donated flow from the email link.
            _logV2MiscEvent("email_already_donated_submit");
        }
        handleEmailSubmit();
    });

    Page.SubmitEmailBtn.on("click", function(e) {
        e.preventDefault();
        $("form#prev_donation")
            .find(":submit")
            .trigger('click');
    });

    $("input.newsletter-synthetic-checkbox").on("change", function() {
        localStorage.setItem("email-optin", $(this).is(":checked"));
    })

    // Page.EnterConfirmationCode
    // "Please enter the 6 character code"
    $confirmationCodeInput.on("keypress", function() {
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
            Page.InProgressSpinner.fadeOut(1000, function() {
                Page.EWrongConfirmationCode.show();
                setProgressIndicatorTo(0);
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
            .done(function(msg) {
                if (msg) {
                    if (msg.success === true) {
                        // FIXME: Temporary solution for the anti-adblock-pass page since ABP won't activate from anywhere other than /premium
                        const activationParams = new URLSearchParams();
                        activationParams.add("thankyou", 1);
                        activationParams.add("var", 1);
                        activationParams.add("u", getUserId());
                        window.location.href = `https://accounts.adblockplus.org/premium?${activationParams.toString()}`;
                        return;
                        // activateExtension(
                        //     function onSuccess() {
                        //         setProgressIndicatorTo(3);
                        //         Page.InProgressSpinner.fadeOut(1000, function() {
                        //             Page.SuccessCard.show();
                        //         });
                        //         // If user opted in to receive newsletter, send log message.
                        //         if (
                        //             localStorage !== null &&
                        //             typeof localStorage !== "undefined" &&
                        //             typeof localStorage.getItem === "function"
                        //         ) {
                        //             try {
                        //                 if (Boolean(localStorage.getItem("email-optin")) === true) {
                        //                     if (typeof _logV2MiscEvent === "function") {
                        //                         _logV2MiscEvent("newsletter_optin");
                        //                     }
                        //                     localStorage.removeItem("email-optin");
                        //                 }
                        //             } catch (err) {
                        //                 console.warn("Failed to get localStorage e-mail opt-in preference. Err: ", err);
                        //             }
                        //         }
                        //         if (pageActionAlreadyDonated && typeof _logV2MiscEvent === "function") {
                        //             // Log if user successfully completes already donated flow from email link.
                        //             _logV2MiscEvent("email_already_donated_success");
                        //         }
                        //     },
                        //     function onFailure() {
                        //         Page.InProgressSpinner.fadeOut(1000, function() {
                        //             Page.EProblemActivating.show();
                        //             setProgressIndicatorTo(0);
                        //             if (pageActionAlreadyDonated && typeof _logV2MiscEvent === "function") {
                        //                 // Log if user successfully completes already donated flow.
                        //                 _logV2MiscEvent("email_already_donated_fail");
                        //             }
                        //         });
                        //     }
                        // );
                    }
                } else {
                    // we didn't get a response from the server at all...
                    Page.InProgressSpinner.fadeOut(1000, function() {
                        Page.EGenericError.show();
                        setProgressIndicatorTo(0);
                    });
                }
            })
            .error(function(request) {
                if (request && request.responseJSON && request.responseJSON.code) {
                    if (request.responseJSON.code === "no-donations") {
                        Page.InProgressSpinner.fadeOut(1000, function() {
                            Page.ENoDonations.show();
                            setProgressIndicatorTo(0);
                        });
                    } else {
                        // default error case
                        showWrongCode();
                    }
                }
            });
    }

    // Submit and verify the confirmation code...
    $("#submit_code").on("click", function(e) {
        e.preventDefault();
        $("form#confirmation-code")
            .find(":submit")
            .trigger('click');
    });

    $("form#confirmation-code").on("submit", function(e) {
        e.preventDefault();
        handleSubmitCode();
    });

    // scrollToAlreadyDonatedFlowAndFillInEmail scrolls down to the Already Donated
    // box as though the user scrolled to the bottom of the page and clicked the
    // "I'm an AdBlock Premium User / I've donated to AdBlock before" button.
    // If @email is present it populates the email input box.
    function scrollToAlreadyDonatedFlowAndFillInEmail(email) {
        if (typeof _logV2MiscEvent === "function") {
            // Log if user visits the page from the already donated flow link in the email.
            _logV2MiscEvent("email_already_donated_scroll");
        }
        showAlreadyDonatedFlow();
        // Adding a little 1 second delay so there is not page load followed by
        // an immediate jolt to the bottom of the page.
        setTimeout(() => {
            scrollToRegistrationBox();
            if (typeof email === "string" && email.length > 0 && email.includes("@")) {
                // If the email isn't empty and could be valid,
                // populate it and focus on submit button.
                Page.EmailAddressInput.val(email);
                Page.SubmitEmailBtn.focus();
            } else {
                // Otherwise just focus on the email input box.
                Page.EmailAddressInput.focus();
            }
        }, 1);
    }

    // The page supports a query parameter named "action". Action can refer to
    // navigating the user on the page to some state that is useful. Right now
    // the only action is "already_donated", which scrolls the user to the
    // already donated box and inserts an email, if present in the "email"
    // query parameter. maybeAction is defined at the top of this file.
    if (maybeAction === "already_donated") {
        const maybeEmail = urlParams.get("email");
        scrollToAlreadyDonatedFlowAndFillInEmail(maybeEmail);
    }

    if (typeof _logV2PageView !== "undefined") {
        _logV2PageView("myadblock_enrollment");
    }
});
