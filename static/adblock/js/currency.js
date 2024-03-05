var _currency = (function() {
  const symbolMap = {
    "usd": "$",
    "eur": "€",
    "gbp": "£",
    "aud": "$",
    "cad": "$",
    "chf": "CHF ",
    "jpy": "¥",
    "rub": "₽",
    //"brl": "R$",
    "mxn": "$"
  };

  const usesDecimalsMap = {
    "usd": true,
    "eur": true,
    "gbp": true,
    "aud": true,
    "cad": true,
    "chf": true,
    "jpy": false,
    "rub": true,
    //"brl": true,
    "mxn": true
  };

  const oneTimeAmountsMap = {
    "usd": ["5", "10", "20", "35", "50", "100"],
    "eur": ["5", "10", "20", "35", "50", "100"],
    "gbp": ["5", "10", "20", "35", "50", "100"],
    "aud": ["5", "10", "20", "35", "50", "100"],
    "cad": ["5", "10", "20", "35", "50", "100"],
    "chf": ["5", "10", "20", "35", "50", "100"],
    "jpy": ["500", "1000", "1500", "3000", "5000", "10000"],
    "rub": ["250", "400", "500", "1000", "2000", "5000"],
    //"brl": ["15", "20", "30", "50", "100", "300"],
    "mxn": ["100", "200", "300", "500", "600", "1000"]
  };

  const oneTimeRegionalAmountsMap = {
    "cn": {
      "usd": ["3", "5", "7", "8", "10", "20"]    
    },
    "tw": {
      "usd": ["3", "5", "7", "8", "10", "20"]    
    },
    "hk": {
      "usd": ["3", "5", "7", "8", "10", "20"]    
    }
  };

  const dropdownMap = {
    "eur": [["eur", "EUR"], ["usd", "USD"], ["gbp", "GBP"]],
    "gbp": [["gbp", "GBP"], ["eur", "EUR"], ["usd", "USD"]],
    "aud": [["aud", "AUD"], ["usd", "USD"]],
    "cad": [["cad", "CAD"], ["usd", "USD"]],
    "jpy": [["jpy", "JPY"], ["usd", "USD"]],
    "rub": [["rub", "RUB"], ["usd", "USD"], ["eur", "EUR"]],
    //"brl": [["brl", "BRL"], ["usd", "USD"]],
    "chf": [["chf", "CHF"], ["usd", "USD"], ["eur", "EUR"]],
    "sek": [["sek", "SEK"], ["eur", "EUR"], ["usd", "USD"]],
    "mxn": [["mxn", "MXN"], ["usd", "USD"]],
  }

  getCurrencySymbol = function(currency) {
    var curr = currency.toLowerCase();
    if (curr in symbolMap) {
      return symbolMap[curr];
    }
    return "$";
  }

  var usingCurrency = "usd";
  var currencySymbol = "$";
  var locale = "";
  var canShowCurrencyDropdownBool = false;
  var canShowRecurringPaymentsBool = false;
  var hasDiffPaymentAmounts = false;
  var geo = "unknown";
  var eurCountries = ['fr', 'es', 'it', 'de', 'nl', 'be', 'gr', 'pt', 'at', 
                      'fi', 'sk', 'ie', 'li', 'si', 'lv', 'ee', 'cy', 'lu', 
                      'mt'];

  var setup = function() {
    if (typeof adblockGeo === "object") {
      geo = adblockGeo.countryCode.toLowerCase();
    }

    if (typeof getTwoLetterLocale === "function") {
      locale = getTwoLetterLocale();
    } else {
      var lan = (document.location.search.match(/(?:[?&])lang=([a-zA-Z0-9_]+)/) || {})[1]
      if (lan === undefined) {
          lan = window.navigator.userLanguage || window.navigator.language || "";
      }
      if (lan.length >= 2) {
        locale = lan.slice(0, 2);
      }
    }

    // setup defaults by country code
    canShowCurrencyDropdownBool = true;
    if (eurCountries.indexOf(geo) !== -1) {
      defaultCurrency = "eur";
      if (geo === "fr" && locale === "fr") { // Experiment 478: Enable FR Recurring Payments
        canShowRecurringPaymentsBool = true; 
      } else if (geo === "de" && locale === "de") { // Experiment 479: Enable DE Recurring Payments
        canShowRecurringPaymentsBool = true;
      }
    } else if (geo === "us") { // United States
      defaultCurrency = "usd";
      canShowCurrencyDropdownBool = false;
      if (locale === "en") {
        canShowRecurringPaymentsBool = true;
      }
    } else if (geo === "gb") { // Great Britain
      defaultCurrency = "gbp";
      if (locale === "en") {
        canShowRecurringPaymentsBool = true;
      }
    } else if (geo === "ca") { // Canada
      defaultCurrency = "cad";
      if (locale === "en") {
        canShowRecurringPaymentsBool = true;
      }
    } else if (geo === "au") { // Australia
      defaultCurrency = "aud";
    } else if (geo === "ch") { // Swizterland
      defaultCurrency = "chf";
    } else if (geo === "jp") { // Japan
      defaultCurrency = "jpy";
    } else if (geo === "ru") { // Russia
      defaultCurrency = "rub";
    //} else if (geo === "br") { // Brazil
    //  defaultCurrency = "brl";
    } else if (geo === "mx") { // Mexico
      defaultCurrency = "mxn";
    } else if (geo === "cn" || geo === "tw" || geo === "hk") { // China
      canShowCurrencyDropdownBool = false;
      hasDiffPaymentAmounts = true;
      defaultCurrency = "usd";
    } else {
      // Default is USD no dropdown
      defaultCurrency = "usd";
      canShowCurrencyDropdownBool = false;
    }
    usingCurrency = defaultCurrency;
    currencySymbol = getCurrencySymbol(defaultCurrency);
  }
  setup();

  return {
    defaultCurrency: usingCurrency,
    canShowCurrencyDropdown: function() {
      return canShowCurrencyDropdownBool;
    },
    oneTimeAmountsForCurrency: function(currency) {
      if (typeof currency !== "string") { return ["5", "10", "20", "35", "50", "100"]; }
      var curr = currency.toLowerCase();
      // first check for a geo specific one time amounts list
      if (geo in oneTimeRegionalAmountsMap) {
        var map = oneTimeRegionalAmountsMap[geo];
        if (curr in map) {
          return map[curr];
        }
      }
      // if not present, check for currency specific list
      if (curr in oneTimeAmountsMap) {
        return oneTimeAmountsMap[curr];
      }
      return ["5", "10", "20", "35", "50", "100"];
    },
    hasDifferentPaymentAmounts: function() {
      return hasDiffPaymentAmounts;
    },
    canShowMonthlyPayments: function() {
      return canShowRecurringPaymentsBool;
    },
    recurringMinimumAmount: function(currency) {
      // when we update recurringAmountsForCurrency in this file
      // to handle more than USD, perhaps update this fn too
      return "0.99";
    },
    recurringAmountsForCurrency: function(currency) {
      var curr = currency.toLowerCase();
      // handle other currencies once recurring in more than USD is allowed
      return ["10", "15", "20", "35", "50", "1.99", "2.99", "3.99", "4.99", "9.99"];
    },
    getSymbol: function(currency) {
      if (typeof currency !== "string") { return "$"; }
      var curr = currency.toLowerCase();
      return getCurrencySymbol(curr);
    },
    formatAmount: function(amount, currency) {
      var curr = currency ? currency.toLowerCase() : "usd";
      var symbol = this.getSymbol(curr);
      return symbol + "" + amount;
    },
    currencyUsesDecimals: function(currency) {
      if (typeof currency !== "string") { return true; }
      var curr = currency.toLowerCase();
      if (curr in usesDecimalsMap) {
        return usesDecimalsMap[curr];
      }
      return true;
    },
    getDropdownList: function(currency) {
      if (typeof currency !== "string") { return [["usd", "USD"], ["eur", "EUR"]]; }
      var curr = currency.toLowerCase();
      if (curr in dropdownMap) {
        return dropdownMap[curr];
      }
      return [["usd", "USD"], ["eur", "EUR"]];
    },
    getDefaultDropdownList: function() {
      return this.getDropdownList(usingCurrency);
    }
  }
})();
