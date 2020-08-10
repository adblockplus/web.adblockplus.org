/* global PaymentForm, paypalProvider, paymentConfig, paymentTranslations,
   stripeProvider */
(function(){

function setupPaymentForm()
{
  var form = new PaymentForm(paymentConfig);

  var siteURL = document.documentElement
    .getAttribute("data-siteurl") || "https://adblockplus.org";

  var successURL = siteURL + "/update-payment-complete";

  var stripeLoaded = false;

  form.addProviderListener("paypal", function()
  {
    var payment = form.toJSON();
    payment.item = paymentTranslations.item;
    payment.successURL = successURL;
    paypalProvider.submit(payment);
  });

  function onStripeSubmit()
  {
    var payment = form.toJSON();
    payment.currencySign = paymentConfig[payment.currency.toUpperCase()].sign;
    payment.successURL = successURL;
    stripeProvider.submit(payment);
  }

  form.addProviderListener("stripe", function()
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
  });
}

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', setupPaymentForm);
else
  setupPaymentForm();
})();
