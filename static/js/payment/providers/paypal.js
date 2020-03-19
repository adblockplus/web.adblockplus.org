/**
 * PayPal payment provider for update page donation payment form
 * @global
 * @requires _.each
 * @requires _.extend
 */
window.paypalProvider = {

  /**
   * Submit donation or recurring donation to PayPal
   * @function
   */
  submit: function (payment)
  {
    //https://developer.paypal.com/docs/api/reference/locale-codes/
    var locales = {
      "en": "US",
      "de": "DE",
      "fr": "FR",
      "es": "ES",
      "ru": "RU",
      "zh_cn": "C2",
      "pt_br": "BR",
      "it": "IT",
      "nl": "NL",
      "tr": "TM",
      "pl": "PL",
      "hu": "HU",
      "el_gr": "GR",
      "jp": "JP",
      "kr": "KO",
      "ar": "DZ"
    };

    var options = {
      charset: "utf-8",
      business: "till@adblockplus.org",
      currency_code: payment.currency,
      return: "https://adblockplus.org/thank-you",
      lc: locales[payment.lang]
    };

    if (payment.type == "subscription")
      _.extend(options, {
        cmd: "_xclick-subscriptions",
        a3: payment.amount,
        p3: 1,
        t3: "M"
      });
    else
      _.extend(options, {
        cmd: "_donations",
        amount: payment.amount
      });

    var form = document.createElement("form");
    form.target = "_blank";
    form.action = "https://www.paypal.com/cgi-bin/webscr";

    var field;

    _.each(options, function(value, key)
    {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = key;
      field.value = value;
      form.appendChild(field);
    });

    var documentHead = document.getElementsByTagName("head")[0];

    documentHead.appendChild(form);

    form.submit();

    documentHead.removeChild(form);
  }
};
