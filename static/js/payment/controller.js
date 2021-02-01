/* global eyeo */
(function() {

var gtag = gtag || function(){};

gtag("event", "payment_flow_started", {
  "event_label": "Payment flow started",
  "event_category": "payment_flow",
  "non_interaction": true
});

var docEl = document.documentElement;

var URLParams = new URLSearchParams(location.search);

var URLSubDirs = location.pathname.split('/');

var paymentConfig = {
  USD: {
    sign: '$',
    donation: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5
    },
    subscription: {
      amounts: [1.99, 2.99, 3.99, 4.99, 9.99],
      placeholder: 4.99,
      minimum: 1
    }
  },
  EUR: {
    sign: '€',
    donation: {
      amounts: [10, 15, 20, 35, 50],
      placeholder: 35,
      minimum: 5
    },
    subscription: {
      amounts: [1.99, 2.99, 3.99, 4.99, 9.99],
      placeholder: 4.99,
      minimum: 1
    }
  }
};

function setupPaymentForm() {
  if (window.paymentConfig)
    paymentConfig = window.paymentConfig;

  var form = new PaymentForm(paymentConfig);

  function getPayment() {
    var fromController = {
      custom: SID,
      successURL: (docEl.getAttribute('data-siteurl') ||
        'https://adblockplus.org') + '/payment-complete'
    };

    return _.extend(form.toJSON(), fromController);
  }

  function onPayPalProvider() {
    var payment = getPayment();

    var cancelParams = new URLSearchParams({
      pp: 'paypal',
      sid: SID
    });

    payment.cancelURL = [
      location.origin,
      location.pathname,
      '?',
      cancelParams.toString()
    ].join('');

    payment.item = paymentTranslations.item;

    paypalProvider.submit(payment);
  }

  eyeo.disablePayPal || form.addProviderListener('paypal', onPayPalProvider);

  function onStripeSubmit() {
    var payment = getPayment();

    payment.currencySign = paymentConfig[payment.currency.toUpperCase()].sign;

    stripeProvider.submit(payment);
  }

  var stripeLoaded = false;

  function onStripeProvider() {
    if (!stripeLoaded) {
      var script = document.createElement('script');
      var button = document.querySelector('.stripe-button');
      var buttonContent = button.innerHTML;

      button.disabled = true;
      button.innerHTML = '<div class="loader">Loading...</div>';

      script.onload = function() {
        stripeLoaded = true;

        onStripeSubmit();

        button.disabled = false;
        button.innerHTML = buttonContent;
      };

      script.src = 'https://js.stripe.com/v3/';

      document.head.appendChild(script);

    } else {
      onStripeSubmit();
    }
  }

  eyeo.disableStripe || form.addProviderListener('stripe', onStripeProvider);

  gtag("event", "payment_form_setup", {
    "event_label": "Payment form setup",
    "event_category": "payment_flow",
    "non_interaction": true
  });
}

var SID;

/**
 * report session and load amounts
 * @param {string} variant optimize variant (or lackthereof) applied
 *   a: Not user testing
 *   b: GDPR exception
 *   c: Testing disabled analytics
 *   d: Testing disabled optimize
 *   e: Anti-flicker timed out
 *   0: Original variant
 *   1-9: Challenger variants
 */
function reportSession(variant)
{
  variant = variant || 0;

  var SID = URLParams.get('sid') || variant + "-" + uuidv4();

  var fromABP = {
    an: URLParams.get('an'),
    av: URLParams.get('av'),
    ap: URLParams.get('ap'),
    apv: URLParams.get('apv'),
    p: URLParams.get('p'),
    pv: URLParams.get('pv')
  };

  var loadReport = {
    bn: bowser.name,
    bv: bowser.version,
    bp: URLSubDirs[URLSubDirs.length - 1],
    bl: docEl.lang,
    vid: variant,
    cid: window.campaignID || 0,
    sid: SID
  };

  if (fromABP.an)
    loadReport = _.extend(loadReport, fromABP);

  var script = document.createElement('script');

  var params = new URLSearchParams(loadReport);

  function onLoadReportSuccess() {
    (document.readyState == 'loading')
      ? document.addEventListener('DOMContentLoaded', setupPaymentForm)
      : setupPaymentForm();
  }

  script.onload = onLoadReportSuccess;
  script.onerror = onLoadReportSuccess;
  script.src = '/js/payment/config/load.js?' + params.toString();

  document.head.appendChild(script);

  gtag("event", "payment_session_sent", {
    "event_label": "Payment session sent",
    "event_category": "payment_flow",
    "non_interaction": true
  });
}

if (typeof eyeo.onOptimizeComplete == "function")
  eyeo.onOptimizeComplete(reportSession);
else
  reportSession("a");

}());
