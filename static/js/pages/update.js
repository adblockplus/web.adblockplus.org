/*global PaymentForm, paypalProvider*/
(function()
{
  function setupPaymentForm()
  {
    var form = new PaymentForm();

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
