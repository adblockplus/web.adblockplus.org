/*global PaymentForm, paypalProvider, paymentConfig, paymentTranslations*/
(function(){

function setupPaymentForm()
{
  var form = new PaymentForm(paymentConfig);

  form.addProviderListener("paypal", function()
  {
    var payment = form.toJSON();
    payment.item_name = paymentTranslations.item_name;
    payment.successURL = "https://adblockplus.org/update-payment-complete";
    paypalProvider.submit(payment);
  });
}

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', setupPaymentForm);
else
  setupPaymentForm();

}());
