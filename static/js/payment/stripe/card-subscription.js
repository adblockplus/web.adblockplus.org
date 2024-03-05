/* global eyeo, URLSearchParams */
(function(doc, _, ns){

var lang = doc.documentElement.lang;

ns.stripeCardSubscription = function stripeCardSubscription(data)
{
  function confirmPayment(result)
  {
    return new Promise(function(resolve, reject)
    {
      var request = new XMLHttpRequest();

      data.method = result.paymentMethod.id;

      request.open("POST", data.endpoint);

      request.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );

      request.onreadystatechange = function()
      {
        if (request.readyState == XMLHttpRequest.DONE)
          if (request.status == 200)
            resolve();
          else
            reject(request);
      }

      var requestData = {
        lang: lang
      };

      var dataAllowlist = [
        "amount",
        "type",
        "email",
        "custom",
        "currency"
      ];

      _.each(dataAllowlist, function (prop) { 
        if (data[prop])
          requestData[prop] = data[prop];
      });

      request.send(new URLSearchParams(data));
    });
  }

  return new Promise(function(resolve, reject)
  {
    data.stripe.createPaymentMethod({
      type: "card",
      card: data.card,
      billing_details: {
        email: data.email
      }
    })
    .then(function(result)
    {
      if (result.hasOwnProperty("error"))
        reject(result.error);
      else
        confirmPayment(result)
        .then(resolve)
        .catch(reject);
    })
    .catch(reject);
  });

};

})(document, _, path("payment"));