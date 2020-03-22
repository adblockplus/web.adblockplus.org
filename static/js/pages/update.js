/*global PaymentForm, paypalProvider, paymentConfig*/
(function(){

function setupPaymentForm()
{
  var form = new PaymentForm(paymentConfig);

  form.addProviderListener("paypal", function()
  {
    paypalProvider.submit(form.toJSON());
  });
}

if (document.readyState === 'loading')
  document.addEventListener('DOMContentLoaded', setupPaymentForm);
else
  setupPaymentForm();

}());
