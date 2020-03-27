/* global PaymentForm, paypalProvider, paymentConfig, paymentTranslations,
   stripeProvider */
(function(){

function setupPaymentForm()
{
  var form = new PaymentForm(paymentConfig);
  var siteURL = document.documentElement
    .getAttribute("data-siteurl") || "https://adblockplus.org";

  form.addProviderListener("paypal", function()
  {
    var payment = form.toJSON();
    payment.item = paymentTranslations.item;
    payment.successURL = siteURL + "/update-payment-complete";
    paypalProvider.submit(payment);
  });

  form.addProviderListener("stripe", function()
  {
    stripeProvider.submit(form.toJSON());
  });
}

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', setupPaymentForm);
else
  setupPaymentForm();
})();
