/*global PaymentForm*/
(function()
{
  function setupPaymentForm()
  {
    var form = new PaymentForm();
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', setupPaymentForm);
  else
    setupPaymentForm();
}());
