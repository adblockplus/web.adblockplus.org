/* global PaymentForm, paypalProvider, paymentConfig, paymentTranslations,
   stripeProvider */

(function(){

function setupPaymentForm()
{
  var form = new PaymentForm(paymentConfig);

  form.addProviderListener("paypal", function()
  {
    var payment = form.toJSON();
    payment.item = paymentTranslations.item;
    payment.successURL = "https://adblockplus.org/update-payment-complete";
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

// I prefer the smooth appearance of "}());" too, but the correct way is:
})();
