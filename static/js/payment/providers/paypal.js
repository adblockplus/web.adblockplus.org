/* global _*/
(function(root, doc, _){

var siteURL = document.documentElement
  .getAttribute("data-siteurl") || "https://adblockplus.org";

/**
 * PayPal payment provider
 * @global
 * @requires _.each
 * @requires _.extend
 * @see https://developer.paypal.com/docs/integration/web/
 */
root.paypalProvider = {

  /**
   * Submit one-time or recurring payment
   * @function
   * @param {Object} payment - Payment options submitted to PayPal
   * @param {String} payment.item - Human readable translated item name
   * @param {Number} payment.amount - Amount to be paid for item
   * @param {String} payment.currency - 3 letter currency code supported by PayPal
   * @param {String} [payment.type=] - "subscirption" if recurring
   * @param {String} [payment.image=https://adblockplus.org/img/adblock-plus-paypal.png] - 90px tall logo image
   * @param {String} [payment.lang=doc.documentElement.lang] - 2 letter language code supported by PayPal
   * @param {String} [payment.successURL=https://adblockplus.org/payment-complete] - URL to direct to after checkout success
   * @param {String} [payment.cancelURL=location.hrf] - URL to direct to after checkout cancelled
   * @see https://developer.paypal.com/docs/archive/nvp-soap-api/currency-codes/#paypal
   * @see https://developer.paypal.com/docs/api/reference/locale-codes/
   */
  submit: function (payment)
  {
    // Locales supported by our website that have different PayPal codes
    var LOCALES = {
      "en": "US",
      "zh_cn": "C2",
      "pt_br": "BR",
      "tr": "TM",
      "el_gr": "GR",
      "jp": "JP",
      "kr": "KO",
      "ar": "DZ"
    };

    // Get unique PayPal locale code or fall back to lang in PayPal format
    function getLocale(lang)
    {
      return LOCALES[lang] || lang.toUpperCase();
    }

    var submission = {
      charset: "utf-8",
      business: "till@adblockplus.org",
      item_name: payment.item,
      custom: payment.custom,
      image_url: payment.image || siteURL + "/img/adblock-plus-paypal.png",
      return: payment.successURL || siteURL + "/payment-complete",
      cancel_return: payment.cancelURL || root.location.href,
      no_note: 1,
      currency_code: payment.currency,
      lc: getLocale(payment.lang || doc.documentElement.lang)
    };

    if (payment.type == "subscription")
    {
      _.extend(submission, {
        cmd: "_xclick-subscriptions",
        a3: payment.amount, // Subscription price
        p3: 1, // Subscription duration (N*p3)
        t3: "M", // Regular subscription units of duration. (D/W/M/Y)
        src: 1 // Subscription payments recur 1 or not 0
      });
    }
    else
    {
      _.extend(submission, {
        cmd: "_xclick",
        amount: payment.amount
      });
    }

    var form = doc.createElement("form");
    form.target = "_blank";
    form.method = "post";
    form.action = "https://www.paypal.com/cgi-bin/webscr";

    var field;
    _.each(submission, function(value, key)
    {
      field = doc.createElement("input");
      field.type = "hidden";
      field.name = key;
      field.value = value;
      form.appendChild(field);
    });

    var documentHead = doc.getElementsByTagName("head")[0];
    documentHead.appendChild(form);
    form.submit();
    documentHead.removeChild(form);
  }
};

})(window, document, _);
