/*
 ** Author: Marco Lilliu
 ** Company: Conversion
 ** Date: Feb 2023
*/

(function (w) {
	"use strict";

	let expId = '8-0',
		expType = 'variation2',
		tag = `cv-${expId}`,
		tagCl = `cv-adb-${expId}`,
		tagSl = `.${tagCl}`,
		hjLabel = `ADB ${expId}_${expType}`,
		debug = document.cookie.indexOf("cfQA") > -1,
		window = typeof unsafeWindow !== "undefined" ? unsafeWindow : w,
		siteLang = window.location.pathname.indexOf('/en/') > -1 ? 'EN' : window.location.pathname.indexOf('/es/') > -1 ? 'ES' : 'EN';

	window["optimizely"] = window["optimizely"] || [];

	window[tag] = {
		log: function (msg) {
			if (debug) console.log("[CONV]", tag, "-->", msg);
		},

		waitForElement: function (cssSelector, condition, duration, callback) {
			let stop,
				elementCached,
				timeout,
				check = function () {
					try {
						elementCached = document.querySelector(cssSelector);

						if (stop) return;

						if (elementCached) {
							if (condition === 'selector') {
								callback(elementCached);
								clearTimeout(timeout);

								window[tag].log(`${cssSelector} found`);
							} else if (condition === 'expression') {
								if (elementCached.style.display === 'block') {
									callback(elementCached);
									clearTimeout(timeout);

									window[tag].log(`${cssSelector} condition matched`);
								} else {
									window.requestAnimationFrame(check);
								}
							}
						} else {
							window.requestAnimationFrame(check);
						}
					} catch (err) {
						window[tag].log(err.message);
					}
				};

			window.requestAnimationFrame(check);

			timeout = setTimeout(function () {
				stop = true;
				window[tag].log(`${cssSelector} not found`);
			}, duration);
		},

		sendEventOpt: function (eventType, apiKey, eventName, eventAmount) {
			try {
				if (eventType === 'event') {
					if (!eventAmount) {
						window["optimizely"].push({
							type: "event",
							eventName: apiKey,
						});

						window[tag].log('metric triggered: ' + eventName);
					} else {
						let amountInCents = eventAmount * 100;

						window["optimizely"].push({
							type: "event",
							eventName: apiKey,
							tags: {
								revenue: amountInCents,
							},
						});

						window[tag].log('metric triggered: ' + eventName + ' amount: ' + eventAmount);
					}
				} else if (eventType === 'segment') {
					let segObj = {
						type: "user",
						attributes: {},
					};

					segObj.attributes[apiKey] = eventName;
					window["optimizely"].push(segObj);

					window[tag].log('user segmented: ' + apiKey + ' value: ' + eventName);
				}
			} catch (err) {
				window[tag].log(err);
			}
		},

		init: function () {
			try {
				this.waitForElement("body", 'selector', 5000, function (docBody) {
					docBody.classList.add(tag);
				});

				if (debug && document.title.indexOf("CONV QA") < 0) {
					document.title = `[CONV QA] ${document.title}`;
				}

				window[tag].initHotjar();
				initVariation();

				window[tag].log(`${expType} running`);
			} catch (err) {
				window[tag].log(err.message);
			}
		},

		initHotjar: function () {
			try {
				if (hjLabel) {
					let maxCalls = 10,
						waitForHj = setInterval(function () {
							if (typeof window.hj === "function") {
								clearInterval(waitForHj);

								hj("trigger", hjLabel);
								hj("tagRecording", [hjLabel]);

								window[tag].log("Hotjar initialised: " + hjLabel);
							}

							if (--maxCalls < 0) {
								clearInterval(waitForHj);

								window[tag].log("Hotjar failed to load");
							}
						}, 500);
				}
			} catch (err) {
				window[tag].log(err);
			}
		},
	};

	// IMAGES
	let adbpLogo = '<svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="//www.w3.org/2000/svg"><g clip-path="url(#clip0_7_75)"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.3811 0L0 21.3811V51.6189L21.3811 73H51.6182L73 51.6189V21.3811L51.6182 0H21.3811Z" fill="#D8D9D9"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.581 0.481934L0.481689 21.5805V51.419L21.581 72.5176H51.4195L72.5181 51.419V21.5805L51.4195 0.481934H21.581Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.9724 69.158L3.84143 50.027V22.9726L22.9724 3.84158H50.0276L69.1578 22.9726V50.027L50.0276 69.158H22.9724Z" fill="#ED1E45"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18.6583 38.3401L18.1471 35.9863C17.8286 34.7057 17.5219 33.3457 17.2269 31.9069C16.9312 30.4689 16.6355 29.0824 16.3406 27.7488H16.2045C15.9316 29.1089 15.6528 30.5013 15.3696 31.9268C15.085 33.3523 14.7841 34.7057 14.4664 35.9863L13.9206 38.3401H18.6583ZM19.6807 42.8512H12.8982L11.5352 48.9313H6.4231L13.3755 23.3554H19.4078L26.361 48.9313H21.0437L19.6807 42.8512Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M37.3011 44.4594C40.0498 44.4594 41.4246 43.2958 41.4246 40.9685C41.4246 39.8438 41.084 39.0266 40.4022 38.5169C39.7203 38.0064 38.6861 37.7519 37.3011 37.7519H34.4721V44.4594H37.3011ZM36.8237 33.6718C38.0506 33.6718 38.9421 33.3915 39.4989 32.8288C40.0557 32.2669 40.3345 31.5019 40.3345 30.5339C40.3345 29.5667 40.0498 28.8738 39.482 28.4552C38.9141 28.0367 38.0388 27.8271 36.8575 27.8271H34.4721V33.6718H36.8237ZM29.4623 23.3557H37.062C38.2213 23.3557 39.2944 23.4535 40.283 23.6499C41.2716 23.8463 42.1344 24.1927 42.8736 24.6892C43.6114 25.1864 44.191 25.8404 44.6117 26.6502C45.0317 27.4615 45.2421 28.4817 45.2421 29.7101C45.2421 30.286 45.1678 30.8612 45.0207 31.4364C44.8721 32.0116 44.6507 32.5479 44.3558 33.0444C44.0601 33.5416 43.6739 33.9859 43.1973 34.3779C42.7199 34.7707 42.1631 35.0583 41.5268 35.2415V35.3981C43.1171 35.738 44.316 36.3926 45.1229 37.3591C45.9291 38.3271 46.3322 39.6739 46.3322 41.3995C46.3322 42.7073 46.1108 43.832 45.668 44.7735C45.2252 45.715 44.6117 46.4932 43.8276 47.1074C43.0435 47.7223 42.1285 48.1798 41.084 48.4799C40.0388 48.7815 38.9141 48.9316 37.71 48.9316H29.4623V23.3557Z" fill="white"/><path fill-rule="evenodd" clip-rule="evenodd" d="M57.5794 35.6726C60.3061 35.6726 61.6691 34.3133 61.6691 31.5933C61.6691 30.2597 61.3226 29.3182 60.6297 28.7687C59.9361 28.2193 58.9196 27.9449 57.5794 27.9449H54.785V35.6726H57.5794ZM49.7744 23.3558H57.8861C59.0902 23.3558 60.2207 23.4926 61.277 23.7677C62.334 24.0421 63.2542 24.4996 64.0375 25.1403C64.8216 25.7817 65.4402 26.6312 65.8955 27.6904C66.3494 28.7489 66.5767 30.0501 66.5767 31.5933C66.5767 33.0835 66.3435 34.3781 65.8779 35.4763C65.4123 36.5752 64.7819 37.477 63.9868 38.1831C63.1909 38.8892 62.2707 39.4129 61.2262 39.752C60.1803 40.0926 59.0674 40.2625 57.8861 40.2625H54.785V48.931H49.7744V23.3558Z" fill="white"/></g><defs><clipPath id="clip0_7_75"><rect width="73" height="73" fill="white"/></clipPath></defs></svg>';

	// LOCALISED TEXT
	let navTitle = 'Adblock Plus has been updated!',
		toggleMonthlyText = 'Monthly',
		toggleYearlyText = 'Yearly',
		oneOffTextHtml = 'Make a <strong>one-off</strong> contribution',
		recurringTextHtml = 'Make a <strong>recurring</strong> contribution',
		originalMonthlyTextHtmlMobile = 'Or a <strong>monthly</strong> contribution:',
		originalYearlyTextHtmlMobile = 'Or a <strong>yearly</strong> contribution:';

	if (siteLang === 'ES') {
		navTitle = '¡Tu Adblock Plus puede mejorarse!';
		toggleMonthlyText = 'Mensual';
		toggleYearlyText = 'Anual';
		oneOffTextHtml = 'Realiza una contribución <strong>puntual</strong>';
		recurringTextHtml = 'Realiza una contribución <strong>mensual</strong>';
		originalMonthlyTextHtmlMobile = 'O una contribución <strong>mensual</strong>:';
		originalYearlyTextHtmlMobile = 'O una contribución <strong>anual</strong>:';
	}

	// HTML
	let newNavBar = `<div class="${tagCl}-nav-top-bar"><div class="${tagCl}-nav-top-logo">${adbpLogo}</div><div class="${tagCl}-nav-top-title">${navTitle}</div></div>`,
		toggleHtml = `<div class="${tagCl}-toggle-wrap"><div class="${tagCl}-toggle-main-txt">${toggleMonthlyText}</div><label class="${tagCl}-switch"><input class="${tagCl}-toggle-input" type="checkbox"><span class="${tagCl}-slider ${tagCl}-round"></span></label><div class="${tagCl}-toggle-main-txt">${toggleYearlyText}</div></div>`;

	// NEW BOTTOM TEXT
	let newText1 = `Here's an overview of the work we've recently introduced in AdBlock.`,
		newText2 = `<b>Improved ad blocking functionality.</b> Many websites look for ways to prevent Adblock Plus from blocking annoying ads. As a result, we've focused on improving our functionality so that we can overcome these anti-ad blocking attempts.`,
		newText3 = `<b>Improved foundation for the future.</b> Manifest V3, the latest version of the extension platform for Chromium based browsers, is on the horizon. And we've been getting ready for it! MV3 represents a large shift in how browser extensions will work, requiring our team to make some big changes to how Adblock Plus works. We've made lots of progress so that we can continue to help Adblock Plus users stay in control of their online experience as the web evolves.`,
		newText4 = `<b>Hide cookie consent notices.</b> Soon you’ll be able to put an end to those annoying cookie consent banners used on most websites thanks to a new cookie blocking feature we’re finishing up.`,
		newText5 = `<b>Block more pop-ups and distractions.</b> Say goodbye to survey requests, newsletter pop-ups, and annoying autoplay video ads when you unlock Adblock Plus Premium.`;

	window[tag].init();

	function initVariation() {
		let isActive = document.querySelector(`${tagSl}-nav-top-bar`);
		if (!isActive) {
			// UPDATE PAYMENTS
			window[tag].waitForElement('fieldset.payment-frequency.yearly', 'selector', 5000, (paymentFreq) => {
				paymentFreq.insertAdjacentHTML('afterend', toggleHtml);
				setDefaultActive();
				addToggleEvents();
				selectActiveBox();
			});

			// UPDATE HEADER
			window[tag].waitForElement('.update-header', 'selector', 5000, (updHeader) => {
				updHeader.classList.add(`${tagCl}-upd-header`);
				updHeader.insertAdjacentHTML('beforebegin', newNavBar);
				window[tag].sendEventOpt('segment', 'conv_experiment_shown', 'true');
			});
			window[tag].waitForElement('.update-header img', 'selector', 5000, (imgLogo) => {
				imgLogo.style.display = "none";
			});
			window[tag].waitForElement('.update-header h1', 'selector', 5000, (h1Nav) => {
				h1Nav.style.display = "none";
			});
			window[tag].waitForElement('.update-header p.update-header-lead', 'selector', 5000, (descNav) => {
				descNav.classList.add(`${tagCl}-desc-nav`);
			});
			// UPDTE LEGEND TEXTS
			if (window.innerWidth > 849) {
				window[tag].waitForElement('fieldset.payment-frequency.once legend', 'selector', 5000, (oneOffLegend) => {
					oneOffLegend.innerHTML = oneOffTextHtml;
				});
				window[tag].waitForElement('fieldset.payment-frequency.monthly legend', 'selector', 5000, (monthlyLegend) => {
					monthlyLegend.innerHTML = recurringTextHtml;
				});
				window[tag].waitForElement('fieldset.payment-frequency.yearly legend', 'selector', 5000, (yearlyLegend) => {
					yearlyLegend.innerHTML = recurringTextHtml;
				});
			}
			// ADJUST CSS
			if (siteLang === 'ES') {
				window[tag].waitForElement(`fieldset.payment-frequency.monthly ${tagSl}-active-not-freq`, 'selector', 5000, (notFreq) => {
					notFreq.classList.add(`${tagCl}-es-adjust-nf`);
				});
				window[tag].waitForElement(`fieldset.payment-frequency.yearly ${tagSl}-active-not-freq`, 'selector', 5000, (notFreq) => {
					notFreq.classList.add(`${tagCl}-es-adjust-nf`);
				});
				window[tag].waitForElement(`${tagSl}-toggle-wrap`, 'selector', 5000, (toggleWrap) => {
					toggleWrap.classList.add(`${tagCl}-es-adjust-tw`);
				});
			}
			window[tag].waitForElement('.cv-adb-7-1-nav-top-bar', 'selector', 5000, (navTopBar7_0) => {
				window[tag].waitForElement(`${tagSl}-nav-top-bar`, 'selector', 5000, (navTopBar8_0) => {
					navTopBar8_0.style.display = "none";
				});
			});
			// UPDATE TEXT ON WINDOW RESIZE
			window.addEventListener("resize", () => {
				if (window.innerWidth > 849) {
					window[tag].waitForElement('fieldset.payment-frequency.monthly legend', 'selector', 5000, (monthlyLegend) => {
						monthlyLegend.innerHTML = recurringTextHtml;
					});
					window[tag].waitForElement('fieldset.payment-frequency.yearly legend', 'selector', 5000, (yearlyLegend) => {
						yearlyLegend.innerHTML = recurringTextHtml;
					});
				} else {
					window[tag].waitForElement('fieldset.payment-frequency.monthly legend', 'selector', 5000, (monthlyLegend) => {
						monthlyLegend.innerHTML = originalMonthlyTextHtmlMobile;
					});
					window[tag].waitForElement('fieldset.payment-frequency.yearly legend', 'selector', 5000, (yearlyLegend) => {
						yearlyLegend.innerHTML = originalYearlyTextHtmlMobile;
					});
				}
			});
		}
	}

	function addToggleEvents() {
		window[tag].waitForElement('fieldset.payment-frequency.monthly', 'selector', 5000, () => {
			window[tag].waitForElement('fieldset.payment-frequency.yearly', 'selector', 5000, (yearlyField) => {
				yearlyField.classList.add(`${tagCl}-hide-elem`);
				let switchInput = document.querySelector(`${tagSl}-toggle-input`);

				if (switchInput) {
					switchInput.addEventListener('change', function () {
						let paymentMonthly = document.querySelector('fieldset.payment-frequency.monthly'),
							paymentYearly = document.querySelector('fieldset.payment-frequency.yearly'),
							defaultMonthly = paymentMonthly.querySelector('input[value="4.99"]'),
							defaultYearly = paymentYearly.querySelector('input[value="35"]');
						if (switchInput.checked) { //ANNUAL PAYMENT
							window[tag].log('annual checked');
							paymentMonthly.classList.add(`${tagCl}-hide-elem`);
							paymentYearly.classList.remove(`${tagCl}-hide-elem`);
							defaultYearly.click();
						} else { // MONTHLY PAYMENT
							window[tag].log('monthly checked');
							paymentMonthly.classList.remove(`${tagCl}-hide-elem`);
							paymentYearly.classList.add(`${tagCl}-hide-elem`);
							defaultMonthly.click();
						}
					});
				}
			});
		});
	}

	function setDefaultActive() {
		window[tag].waitForElement('fieldset.payment-frequency.once .payment-amounts', 'selector', 5000, (frequencyOnce) => {
			frequencyOnce.classList.add(`${tagCl}-active-freq`);
		});
		window[tag].waitForElement('fieldset.payment-frequency.monthly .payment-amounts', 'selector', 5000, (frequencyMonthly) => {
			frequencyMonthly.classList.add(`${tagCl}-active-not-freq`);
		});
		window[tag].waitForElement('fieldset.payment-frequency.yearly .payment-amounts', 'selector', 5000, (frequencyYearly) => {
			frequencyYearly.classList.add(`${tagCl}-active-not-freq`);
		});
	}

	function selectActiveBox() {
		window[tag].waitForElement('#payment-frequencies input', 'selector', 5000, () => {
			let allCheckBoxes = document.querySelectorAll(`#payment-frequencies input:not(${tagSl}-toggle-input)`);

			allCheckBoxes.forEach(checkBox => {
				checkBox.addEventListener('change', function () {
					if (checkBox.checked) {
						let freqType = checkBox.getAttribute('data-frequency'),
							freqOnce = document.querySelector('fieldset.payment-frequency.once .payment-amounts'),
							freqMonthly = document.querySelector('fieldset.payment-frequency.monthly .payment-amounts'),
							freqYearly = document.querySelector('fieldset.payment-frequency.yearly .payment-amounts');

						removeAllClasses(freqOnce);
						removeAllClasses(freqMonthly);
						removeAllClasses(freqYearly);

						if (freqType.indexOf('once') > -1) {
							freqOnce.classList.add(`${tagCl}-active-freq`);
							freqMonthly.classList.add(`${tagCl}-active-not-freq`);
							freqYearly.classList.add(`${tagCl}-active-not-freq`);
						} else if (freqType.indexOf('monthly') > -1) {
							freqOnce.classList.add(`${tagCl}-active-not-freq`);
							freqMonthly.classList.add(`${tagCl}-active-freq`);
							freqYearly.classList.add(`${tagCl}-active-not-freq`);
						} else if (freqType.indexOf('yearly') > -1) {
							freqOnce.classList.add(`${tagCl}-active-not-freq`);
							freqMonthly.classList.add(`${tagCl}-active-not-freq`);
							freqYearly.classList.add(`${tagCl}-active-freq`);
						}
					}
				});
			});
		});
	}

	function removeAllClasses(freqT) {
		if (freqT.className.indexOf(`${tagCl}-active-freq`) > -1) {
			freqT.classList.remove(`${tagCl}-active-freq`);
		}

		if (freqT.className.indexOf(`${tagCl}-active-not-freq`) > -1) {
			freqT.classList.remove(`${tagCl}-active-not-freq`);
		}
	}
})(window);