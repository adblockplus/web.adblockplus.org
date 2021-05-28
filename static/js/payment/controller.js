/* global eyeo */
(function() {

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
      /* eyeo.vid will be set to 0-N where 0 is the original variant and N is
         a challenger variant whenever an optimize variant is applied */
      custom: typeof eyeo.vid != "undefined" ? eyeo.vid + eyeo.sid.slice(1) : eyeo.sid,
      successURL: (docEl.getAttribute('data-siteurl') ||
        'https://adblockplus.org') + '/payment-complete'
    };

    return _.extend(form.toJSON(), fromController);
  }

  function onPayPalProvider() {
    var payment = getPayment();

    var cancelParams = new URLSearchParams({
      pp: 'paypal',
      sid: payment.custom
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
}

eyeo.vid = typeof eyeo.vid == "undefined" ? "x" : eyeo.vid;

var campaignID = window.campaignID || "0";

/* Prefex "x" applies by default when optimize does not apply a variant.
   Since we share SID on load below without waiting for optimize to apply a
   variant SIDs will not match 1to1 with payment.custom when experiments
   are running. Instead, we must match SID.slice(1) to coorilate payments. */
eyeo.sid = URLParams.get("sid") || [eyeo.vid, campaignID, uuidv4()].join("-");

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
  cid: campaignID,
  sid: eyeo.sid
};

if (typeof performance == "object" && typeof performance.now == "function")
  loadReport.pn = (performance.now() + '').split('.')[0];

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

}());
