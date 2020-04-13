function initStripeProvider(publishableKey, formProcessor, dictionary) {
  'use strict';

  var donation = 'donation';
  var subscription = 'subscription';

  var siteURL = document.documentElement
    .getAttribute("data-siteurl") || "https://adblockplus.org";

  var successURL = siteURL + "/payment-thank-you";

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

    ((key == 'Escape') || (key == 'Esc') || (key == 27)) &&
      hideModal();
  });

  function queryString(obj) {
    return Object.keys(obj)
      .map(function(key) {
        return key + '=' + obj[key];
      }).join('&');
  }

  function hideModal() {
    modal.classList.remove('show-modal');
  }

  function paymentModalPopup(data) {
    var box, button, cardStripeElement, email, error, token;

    if (data.successURL) {
      successURL = data.successURL;

      // don't submit successURL - client-side redirect
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
          dictionary.securelyProcessed + '</div>' +
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
                          'size="26" spellcheck="false" placeholder="Email" ' +
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
        '</div><img width="123" height="30" class="pbs"' +
          ' src="/img/powered-by-stripe.png"></button>';

      box = document.querySelector('.modal-content');
      button = document.getElementById('pay-button');
      email = document.getElementById('email');
      error = document.getElementById('card-errors');

      createElements();

      payButtonText();

      email && email.focus();

      modal.querySelector('.close')
        .addEventListener('click', hideModal);
    }

    function payButtonText() {
      var pageLocale = document.documentElement.lang;

      var price = (data.currencySign == '€')
          ? data.amount + data.currencySign
          : data.currencySign + data.amount;

      if (pageLocale == 'ko' || pageLocale == 'tr') {
        button.textContent = (data.type == subscription)
          ? (dictionary.subscribe + ' ' + price + ' / ' + dictionary.month)
          : (price + ' ' + dictionary.donate);

      } else {
        button.textContent = (data.type == subscription)
          ? (dictionary.subscribe + ' ' + price + ' / ' + dictionary.month)
          : (dictionary.donate + ' ' + price);
      }
    }

    function errorText(message) {
      error.textContent = message || '';
    }

    function enableButton() {
      button.disabled = false;
    }

    function confirmDonation() {
      stripe.confirmCardPayment(token, {
        payment_method: {
          card: cardStripeElement,
          billing_details: {
            email: email.value
          }
        }
      })
      .then(function(result) {
        if (result.error) {
          result.error.message &&
            errorText(result.error.message);

          enableButton();

        } else if (result.paymentIntent &&
          (result.paymentIntent.status == 'succeeded')) {
          stripePaymentConfirmed();
        }
      });
    }

    function createDonation(data) {
      var request = new XMLHttpRequest();

      request.open('POST', formProcessor, true);

      request.setRequestHeader('Content-Type',
        'application/x-www-form-urlencoded');

      request.onreadystatechange = function() {
        ((this.readyState == 4) && (this.status == 200)) &&
          (token = this.responseText);
      };

      request.send(queryString(data));
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
                 errorText(dictionary.declined);

                 enableButton();

               } else {
                 errorText(dictionary.sorry);
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

      if (token) {
        confirmDonation();

      } else if (data.type == subscription) {
        createSubscription();
      }
    }

    function cardBrand(brand) {
      if (brand == 'alipay' ||
        brand == 'diners' ||
        brand == 'discover' ||
        brand == 'jcb') {
          errorText(dictionary.notSupported);
      }
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
      window.location.href = successURL;
    }

    createModalForm();

    modal.classList.add('show-modal');

    (data.type == donation) &&
      createDonation(data);
  }

  return {
    submit: paymentModalPopup
  };
}
