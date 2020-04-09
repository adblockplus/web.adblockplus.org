/* global PaymentForm, paypalProvider, paymentConfig, paymentTranslations,
   stripeProvider */
(function(){

function setupPaymentForm()
{
  var form = new PaymentForm(paymentConfig);

  var siteURL = document.documentElement
    .getAttribute("data-siteurl") || "https://adblockplus.org";

  var successURL = siteURL + "/update-payment-complete";

  form.addProviderListener("paypal", function()
  {
    var payment = form.toJSON();
    payment.item = paymentTranslations.item;
    payment.successURL = successURL;
    paypalProvider.submit(payment);
  });

  form.addProviderListener("stripe", function()
  {
    var payment = form.toJSON();
    payment.currencySign = paymentConfig[payment.currency.toUpperCase()].sign;
    payment.successURL = successURL;
    stripeProvider.submit(payment);
  });
}

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', setupPaymentForm);
else
  setupPaymentForm();
})();
