function initStripeProvider(publishableKey, formProcessor, dictionary) {
  'use strict';

  var donation = 'donation';
  var subscription = 'subscription';

  var currencySigns = {
    'AUD': 'AU$',
    'CAD': 'CA$',
    'CHF': 'CHF ',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'NZD': 'NZ$',
    'USD': '$',
  };

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

  var stripe = Stripe(publishableKey, {
    locale: (document.documentElement.lang || 'en')
  });

  var modal = document.createElement('div');

  modal.className = 'modal';

  document.body.insertBefore(modal, document.body.firstChild);

  document.addEventListener('keyup', function(keyupEvent) {
    var key;

    if (keyupEvent.defaultPrevented) return;

    key = event.key || event.keyCode;

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
    var request, token, box, email, cardStripeElement, error, button;

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
            'Securely processed by Stripe.com</div>' +
          '</div>' +
          '<hr style="margin: 0;">' +
          '<div class="payment-details">' +
            '<form class="payment-form" id="payment-form">' +
              '<div class="form-row">' +
                '<div class="forms">' +
                  '<div>' +
                    '<label for="email">' +
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

      modal.querySelector('.close')
        .addEventListener('click', hideModal);

      box = document.querySelector('.modal-content');
      email = document.getElementById('email');
      button = document.getElementById('pay-button');
      error = document.getElementById('card-errors');

      createElements();

      payButtonText();

      email && email.focus();
    }

    function payButtonText() {
      var currencySign = currencySigns[data.currency.toUpperCase()];
      var price = (currencySign == '€')
        ? data.amount + currencySign
        : currencySign + data.amount;

      // abbr element?
      button.textContent = (data.type == subscription)
        ? (dictionary.subscribe + ' ' + price
          + ' / ' + dictionary.month)
        : (dictionary.pay + ' ' + price);
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
            (error.textContent = result.error.message);

          enableButton();

        } else if (result.paymentIntent &&
          (result.paymentIntent.status == 'succeeded')) {
          stripePaymentConfirmed();
        }
      });
    }

    function createDonation(data) {
      request = new XMLHttpRequest();

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
          data.method = response.paymentMethod.id;
          data.email = email.value;

          request = new XMLHttpRequest();

          request.open('POST', formProcessor, true);

          request.setRequestHeader('Content-Type',
            'application/x-www-form-urlencoded');

          request.onreadystatechange = function() {
            if (this.readyState == 4) {
               if (this.status == 200) {
                 stripePaymentConfirmed();

               } else if (this.status == 402) {
                 error.textContent = dictionary.declined;

                 enableButton();

               } else {
                 error.textContent = dictionary.sorry;
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

    function createElements() {
      cardStripeElement = stripe.elements()
        .create('card', {
          style: style
        });

      cardStripeElement.mount('#card-element');

      cardStripeElement.addEventListener('change', function(changeEvent) {
        error.textContent =
          (changeEvent.error && changeEvent.error.message)
            ? changeEvent.error.message
            : (enableButton(), '');
      });

      document.getElementById('payment-form')
        .addEventListener('submit', processForm);
    }

    function stripePaymentConfirmed() {
      window.location.href = 'https://adblockplus.org/thank-you';
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
