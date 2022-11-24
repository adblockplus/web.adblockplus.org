
/* global eyeo, URLSearchParams */
(function(doc, _, ns){

  var lang = doc.documentElement.lang;
  
  ns.stripeCardPayment = function stripeCardPayment(data)
  {
    function requestIntent()
    {
      return new Promise(function(resolve, reject)
      {
        var request = new XMLHttpRequest();
        
        request.open("POST", data.endpoint);
  
        request.setRequestHeader(
          "Content-Type", 
          "application/x-www-form-urlencoded"
        );
  
        request.onreadystatechange = function()
        {
          if (request.readyState == XMLHttpRequest.DONE)
            if (request.status == 200)
              resolve(request.responseText);
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
          "currency",
          "tracking"
        ];
  
        _.each(dataAllowlist, function (prop) { 
          if (data[prop])
            requestData[prop] = data[prop];
        });
  
        request.send(new URLSearchParams(requestData));
      });
    }
  
    function confirmIntent(intent)
    {
      return new Promise(function(resolve, reject)
      {
        data.stripe.confirmCardPayment(intent, {
          payment_method: {
            card: data.card,
            billing_details: {
              email: data.email
            }
          },
          receipt_email: data.email
        })
        .then(function(result)
        {
          if (result.hasOwnProperty("error"))
            reject(result.error);
          else
            resolve();
        })
        .catch(reject);  
      });
    }
  
    return requestIntent()
    .then(confirmIntent)
  };
  
  })(document, _, path("payment"));