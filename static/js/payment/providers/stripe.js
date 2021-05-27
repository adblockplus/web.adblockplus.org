function initStripeProvider(publishableKey, formProcessor, text) {
  'use strict';

  var donation = 'donation';
  var subscription = 'subscription';

  var siteURL = document.documentElement
    .getAttribute('data-siteurl') || 'https://adblockplus.org';

  var successURL = siteURL + '/payment-complete';

  var style = {
    base: {
      color: '#32325d',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': { color: '#aab7c4' }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  var stripe;

  var modal = document.createElement('div');

  modal.className = 'modal';

  document.body.insertBefore(modal, document.body.firstChild);

  document.addEventListener('keyup', function(keyupEvent) {
    if (keyupEvent.defaultPrevented) return;

    var key = keyupEvent.key || keyupEvent.keyCode;

    if (key == 'Escape' || key == 'Esc' || key == 27) hideModal();
  });

  function queryString(obj) {
    return new URLSearchParams(obj);
  }

  function hideModal() {
    modal.classList.remove('show-modal');
  }

  var paymentData;

  function paymentModalPopup(data) {
    var box, button, cardStripeElement, donationRequest, email, error,
      priceText, token;

    var donationTimeout = 4000;

    var localeOrderMap = {
      hu: orderHU,
      ko: orderKO,
      tr: orderTR
    };

    paymentData = data;

    if (data.successURL) {
      successURL = data.successURL;

      delete data.successURL;
    }

    stripe = Stripe(publishableKey, {
      locale: (document.documentElement.lang || 'en')
    });

    function createModalForm() {
      modal.innerHTML = '' +
        '<div class="modal-content">' +
          '<div class="top-banner">' +
            '<div class="sales-info">' +
              '<div class="top">' +
                '<div id="co-name" class="company"></div>' +
                '<button class="close">' +
                  '<img width="17" height="17" src="/img/close.png"></button>' +
              '</div>' +
              '<div id="product-name" ' +
                'class="product details">Adblock Plus</div>' +
            '</div>' +
            '<div class="subtitle details">' +
              text.securelyProcessed + '</div>' +
          '</div>' +
          '<hr style="margin: 0;">' +
          '<div class="payment-details">' +
            '<form class="payment-form" id="payment-form">' +
              '<div class="form-row">' +
                '<div class="forms">' +
                  '<div>' +
                    '<label for="email" class="email-label">' +
                      '<span class="form-label spacer"></span>' +
                      '<div class="StripeElement">' +
                        '<input type="email" id="email" class="email" ' +
                          'size="26" spellcheck="false" ' +
                          'placeholder="' + text.emailAddress + '" ' +
                          'autocomplete="email" autocorrect="no" ' +
                          'autocapitalize="no">' +
                      '</div>' +
                    '</label>' +
                    '</div>' +
                    '<div>' +
                    '<label for="card-element">' +
                      '<span class="form-label spacer"></span>' +
                      '<div class="StripeElement" id="card-element"></div>' +
                    '</label>' +
                    '<div id="card-errors" ' +
                      'class="error-message" role="alert"></div>' +
                  '</div>' +
                  '<div>' +
                    '<button id="pay-button" ' +
                      'class="pay-button"></button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</form>' +
          '</div>' +
        '</div><img width="123" height="30" class="pbs" ' +
          'src="/img/powered-by-stripe.png"></button>';

      box = document.querySelector('.modal-content');
      button = document.getElementById('pay-button');
      email = document.getElementById('email');
      error = document.getElementById('card-errors');

      createElements();

      payButtonText();

      if (email) email.focus();

      modal.querySelector('.close')
        .addEventListener('click', hideModal);
    }

    function isSubscription(type) {
      return [subscription, 'monthly-subscription', 'yearly-subscription']
        .includes(type || data.type);
    }

    function durtionText() {
      return /^yearly/.test(data.type)
        ? text.year
        : text.month;
    }

    function defaultTextOrder() {
      return isSubscription()
        ? text.subscribe + ' ' + priceText + ' / ' + durtionText()
        : text.donate + ' ' + priceText;
    }

    function orderHU() {
      return isSubscription()
        ? priceText + ' ' + text.subscribe + ' ' + durtionText()
        : text.donate + ' ' + priceText;
    }

    function orderKO() {
      return isSubscription()
        ? text.subscribe + ' ' + priceText + ' / ' + durtionText()
        : priceText + ' ' + text.donate;
    }

    function orderTR() {
      return isSubscription()
        ? durtionText() + ' ' + priceText + ' ' + text.subscribe
        : priceText + ' ' + text.donate;
    }

    function localeTextOrder(locale) {
      return localeOrderMap[locale]
        ? localeOrderMap[locale]()
        : defaultTextOrder();
    }

    function payButtonText() {
      priceText = (data.currencySign == '€')
        ? data.amount + data.currencySign
        : data.currencySign + data.amount;

      button.textContent = localeTextOrder(document.documentElement.lang);
    }

    function errorText(message) {
      error.textContent = message || '';
    }

    function enableButton() {
      button.disabled = false;
    }

    function createDonation(onSuccess) {
      if (donationRequest) {
        donationRequest.abort();
      }

      donationRequest = new XMLHttpRequest();

      donationRequest.open('POST', formProcessor, true);

      donationRequest.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded');

      donationRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          token = this.responseText;

          if (onSuccess) onSuccess();
        }
      };

      donationRequest.send(queryString(paymentData));
    }

    function confirmDonation() {
      if (token) {
        stripe.confirmCardPayment(token, {
          payment_method: {
            card: cardStripeElement,
            billing_details: {
              email: email.value
            }
          },
          receipt_email: email.value
        }).then(onDonationComplete);

      } else {
        createDonation(confirmDonation);

        setTimeout(function() {
          if (!token) {
            donationRequest.abort();

            onDonationComplete({ error: { message: text.sorry } });
          }
        }, donationTimeout);
      }
    }

    function onDonationComplete(result) {
      if (result.error) {

        if (result.error.message) errorText(result.error.message);

        enableButton();

      } else if (result.paymentIntent &&
        (result.paymentIntent.status == 'succeeded')) {
          stripePaymentConfirmed();
      }
    }

    function createSubscription() {
      stripe.createPaymentMethod({
        type: 'card',
        card: cardStripeElement,
        billing_details: {
         email: email.value,
        },
      }).then(function(response) {
        if (response && response.paymentMethod && response.paymentMethod.id) {
          var request = new XMLHttpRequest();

          data.method = response.paymentMethod.id;
          data.email = email.value;

          request.open('POST', formProcessor, true);

          request.setRequestHeader('Content-Type',
            'application/x-www-form-urlencoded');

          request.onreadystatechange = function() {
            if (this.readyState == 4) {

               if (this.status == 200) {
                 stripePaymentConfirmed();

               } else if (this.status == 402) {
                 errorText(text.declined);

                 enableButton();

               } else {
                 errorText(text.sorry);
               }
            }
          }

          request.send(queryString(data));
        }
      });
    }

    function processForm(submitEvent) {
      submitEvent.preventDefault();

      if (error.textContent) {
        box.classList.add('shake');

        setTimeout(function removeShake() {
          box.classList.remove('shake');
        }, 1000);
      }

      if (button.disabled) return;

      button.disabled = true;

      if (data.type == donation) {
        confirmDonation();

      } else if (isSubscription(data.type)) {
        createSubscription();
      }
    }

    function cardBrand(brand) {
      if (['diners', 'discover', 'jcb', 'unionpay'].indexOf(brand) != -1)
        errorText(text.notSupported);
    }

    function createElements() {
      cardStripeElement = stripe.elements()
        .create('card', {
          style: style
        });

      cardStripeElement.mount('#card-element');

      cardStripeElement.addEventListener('change', function(changeEvent) {
        errorText((changeEvent.error && changeEvent.error.message)
          ? changeEvent.error.message
          : enableButton());

        cardBrand(changeEvent.brand);
      });

      document.getElementById('payment-form')
        .addEventListener('submit', processForm);
    }

    function stripePaymentConfirmed() {
      var params = queryString({
        pp: 'stripe',
        sid: data.custom
      });

      window.location.href = successURL + '?' + params.toString();
    }

    createModalForm();

    modal.classList.add('show-modal');

    if (data.type == donation) createDonation();
  }

  return {
    submit: paymentModalPopup
  };
}
