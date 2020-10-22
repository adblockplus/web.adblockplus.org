(function(){

var eyeo = window.eyeo || {};

var URLParams = new URLSearchParams(location.search);

var URLSubDirs = location.pathname.split("/");

var SID = URLParams.get("sid") || uuidv4();

var paymentConfig = {
  USD: {
    sign: "$",
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
    sign: "€",
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

function setupPaymentForm()
{
  if (window.paymentConfig)
    paymentConfig = window.paymentConfig;

  var form = new PaymentForm(paymentConfig);

  function getPayment()
  {
    var fromController = {
      custom: SID,
      successURL: ""
        + (document.documentElement
            .getAttribute("data-siteurl") || "https://adblockplus.org")
        + "/payment-complete"
    };

    return _.extend(form.toJSON(), fromController);
  }

  function onPayPalProvider()
  {
    var payment = getPayment();

    var cancelParams = new URLSearchParams({
      pp: "paypal",
      sid: SID
    });

    payment.cancelURL = ""
      + location.origin 
      + location.pathname 
      + "?"
      + cancelParams.toString();

    payment.item = paymentTranslations.item;

    paypalProvider.submit(payment);
  }

  if (!eyeo.disablePayPal)
    form.addProviderListener("paypal", onPayPalSubmit);

  function onStripeSubmit()
  {
    var payment = getPayment();

    payment.currencySign = paymentConfig[payment.currency.toUpperCase()].sign;

    stripeProvider.submit(payment);
  }

  var stripeLoaded = false;

  function onStripeProvider()
  {
    if (!stripeLoaded)
    {
      var button = document.querySelector(".stripe-button");
      var buttonContent = button.innerHTML;
      button.disabled = true;
      button.innerHTML = "<div class='loader'>Loading...</div>";
      var script = document.createElement("script");
      script.onload = function() {
        stripeLoaded = true;
        onStripeSubmit();
        button.disabled = false;
        button.innerHTML = buttonContent;
      };
      script.src = "https://js.stripe.com/v3/";
      document.head.appendChild(script);
    }
    else
    {
      onStripeSubmit();
    }
  }

  if (!eyeo.disableStripe)
    form.addProviderListener("stripe", onStripeProvider);
}

var fromABP = {
  an: URLParams.get("an"),
  av: URLParams.get("av"),
  ap: URLParams.get("ap"),
  apv: URLParams.get("apv"),
  p: URLParams.get("p"),
  pv: URLParams.get("pv")
};

var loadReport = {
  bn: bowser.name,
  bv: bowser.version,
  bp: URLSubDirs[URLSubDirs.length - 1],
  bl: document.documentElement.lang,
  cid: window.campaignID || 0,
  sid: SID
};

if (fromABP.an)
  loadReport = _.extend(loadReport, fromABP);

function onLoadReportSuccess()
{
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', setupPaymentForm);
  else
    setupPaymentForm();
}

var script = document.createElement('script');
var params = new URLSearchParams(loadReport);
script.onload = onLoadReportSuccess;
script.onerror = onLoadReportSuccess;
script.src = "/js/payment/config/load.js?" + params.toString();
document.head.appendChild(script);

}());
