// chrome.i18n.getMessage() shim

// This file is based on:
// Chrome to Safari port
// Author: Michael Gundlach (gundlach@gmail.com)
// License: GPLv3

// To initialize: call 
// chrome.i18n._initialize(default_locale, locale_path, callback).  
// callback() will be executed after i18n is initialized.  default_locale is
// e.g. "en", and locale_path is the relative or absolute path where locale
// folders containing messages.json files can be found, e.g.  "_locales/" or
// "http://example.com/locales/".
//
// To use: call chrome.i18n.getMessage() as defined at
// https://developer.chrome.com/extensions/i18n.html.

if ((window.chrome || {}).i18n === undefined) {
(function() {

chrome = window.chrome || {};
chrome.i18n = (function() {
  var availableLocales = [];
  if (typeof getLocalesIndex !== "undefined" && typeof getLocalesIndex === "function") {
    // Get the list of available locales from localesIndex.js
    availableLocales = getLocalesIndex();
  }

  function fetch(details) {
    details.success = details.success || function() {};
    details.complete = details.complete || function() {};

    var xhr = new XMLHttpRequest();
    xhr.open("GET", details.file, true);
    xhr.onreadystatechange = function() {
      if (this.readyState !== 4)
        return;
      if (this.responseText !== "" && this.status === 200)
        details.success(this.responseText);
      details.complete();
    };
    try {
      xhr.send();
    }
    catch (e) {
      // File not found, perhaps
      details.complete();
    }
  }

  // Insert substitution args into a localized string.
  function parseString(msgData, args) {
    // If no substitution, just turn $$ into $ and short-circuit.
    if (msgData.placeholders === undefined && args === undefined)
      return msgData.message.replace(/\$\$/g, '$');

    // Substitute a regex while understanding that $$ should be untouched
    function safesub(txt, re, replacement) {
      var dollaRegex = /\$\$/g, dollaSub = "~~~I18N~~:";
      txt = txt.replace(dollaRegex, dollaSub);
      txt = txt.replace(re, replacement);
      // Put back in "$$" ("$$$$" somehow escapes down to "$$")
      var undollaRegex = /~~~I18N~~:/g, undollaSub = "$$$$";
      txt = txt.replace(undollaRegex, undollaSub);
      return txt;
    }

    var $n_re = /\$([1-9])/g;
    var $n_subber = function(_, num) { 
      // Check that the string isn't a number after a placeholder tag, e.g. $opentag$7 Million, etc
      // Check makes sure that the args object is populated and has the replacement value
      if (typeof args === "object" &&
          typeof args[num] !== 'undefined') {
        return args[num - 1]; 
      }
      return _;
    };

    var placeholders = {};
    // Fill in $N in placeholders
    for (var name in msgData.placeholders) {
      var content = msgData.placeholders[name].content;
      placeholders[name.toLowerCase()] = safesub(content, $n_re, $n_subber);
    }
    // Fill in $N in message
    var message = safesub(msgData.message, $n_re, $n_subber);
    // Fill in $Place_Holder1$ in message
    message = safesub(message, /\$(\w+?)\$/g, function(full, name) {
      var lowered = name.toLowerCase();
      if (lowered in placeholders)
        return placeholders[lowered];
      return full; // e.g. '$FoO$' instead of 'foo'
    });
    // Replace $$ with $
    message = message.replace(/\$\$/g, '$');

    return message;
  }

  var l10nData = undefined;

  var isStaticlyTranslated = false;

  const getLocale = function(result) {
    if (typeof result !== "object") return "en";
    if (!result.locales.length) return "en";
    if (!result.messages.hasOwnProperty(result.locales[0])) return "en";
    return result.locales[0];
  };

  var theI18nObject = {
    // Asynchronously initializes chrome.i18n.
    // |default_locale|: the locale code to fall back upon if the user's locale
    //                   is not supported.
    // |locale_path|: URL of locale file directory, including trailing '/'
    // |callback()|: called after initialization is complete.
    _initialize: function(default_locale, locale_path, callback) {
      chrome.i18n._getL10nData(default_locale, locale_path, function(data) {
        chrome.i18n._setL10nData(data);
        if (callback)
          callback();
      });
    },

    // Calls |callback|, passing L10n data fetched from locale_path.
    // |default_locale|: the locale code to fall back upon if the user's locale
    //                   is not supported.
    // |locale_path|: URL of locale file directory, including trailing '/'
    _getL10nData: function(default_locale, locale_path, callback) {
      var result = { locales: [] };

      // == Find all locales we might need to pull messages from, in order
      // 0: if the site was translated by the static build then the locale is in the URL
      availableLocales.forEach(function(locale) {
        if (document.location.href.indexOf('/' + locale + '/') !== -1) {
          result.locales.push(locale);
          isStaticlyTranslated = true;
        }
      });
      if (isStaticlyTranslated) {
        if (callback) {
          callback();
        }
        return;
      }
      // 1: URL override locale
      var _i18nSetting = [
        (document.location.search.match(/(?:[?&])lang=([a-z_]+)/i) || {})[1],
        ""
      ];
      var setting = _i18nSetting.filter(function(o) { return o !== undefined; })[0];
      if (setting !== "") {
          result.locales.push(setting);
      }
      // 2: The user's current locale, converted to match the format of
      //    the _locales directories (e.g. "en-US" becomes "en_US"
      result.locales.push(navigator.language.replace('-', '_'));
      // 3: Perhaps a region-agnostic version of the current locale
      if (navigator.language.length > 2)
        result.locales.push(navigator.language.substring(0, 2));
      // 4: The default locale
      if (result.locales.indexOf(default_locale) === -1)
        result.locales.push(default_locale);
      // If we have a list of available locales, then
      // Only request locales that we are likely to have files for
      if (availableLocales.length > 0) {
        result.locales = result.locales.filter(function(locale) {
          return (availableLocales.indexOf(locale) !== -1);
        });
      }
      // Load all locale files that exist in that list
      result.messages = {};

      var remaining = result.locales.length;
      result.locales.forEach(function(locale) {
        fetch({
          file: locale_path + locale + "/messages.json?v=1646770547",
          success: function(text) {
            // Not called if file doesn't exist
            result.messages[locale] = JSON.parse(text);
          },
          complete: function() {
            remaining -= 1;
            if (remaining === 0) {// Async fetches are complete
              $("html").attr("lang", getLocale(result));
              (callback || function() {})(result);
            }
          }
        });
      });
    },

    _setL10nData: function(data) {
      l10nData = data;
    },

    _getIsStaticlyTranslated: function() {
      return isStaticlyTranslated;
    },

    getMessage: function(HtmlTag, messageID, args) {
      if (l10nData === undefined && isStaticlyTranslated) {
        console.info("Translated statically already");
        return "";
      } else if (l10nData === undefined) {
        console.error("Do not call chrome.i18n.getMessage() before chrome.i18n._initialize() has finished.");
      }
      if (typeof args === "string")
        args = [args];
      for (var i = 0; i < l10nData.locales.length; i++) {
        var map = l10nData.messages[l10nData.locales[i]];
        // We must have the locale, and the locale must have the message
        if (map && messageID in map) {
          // Set lang attribute to English if we didn't find a translation
          if ($("html").attr("lang") !== l10nData.locales[i] && typeof HtmlTag !== "undefined") {
            HtmlTag.lang = "en";
          }
          return parseString(map[messageID], args);
        }
      }
      return "";
    }
  };

  return theI18nObject;
})();

})(); } // end if (chrome.i18n is missing) { (function() {

translate = function(HtmlTag, messageID, args) {
  return chrome.i18n.getMessage(HtmlTag, messageID, args);
};

localizePage = function() {
  if (chrome.i18n._getIsStaticlyTranslated()) {
    // no need to do anything as translation already happened as part of the site build
    return;
  }

  //translate a page into the users language
  $("[i18n]:not(.i18n-replaced)").each(function() {
    $(this).html(translate(this, $(this).attr("i18n")));
  });
  $("[i18n_value]:not(.i18n-replaced)").each(function() {
    $(this).val(translate(this, $(this).attr("i18n_value")));
  });
  $("[i18n_title]:not(.i18n-replaced)").each(function() {
    $(this).attr("title", translate(this, $(this).attr("i18n_title")));
  });
  $("[i18n_placeholder]:not(.i18n-replaced)").each(function() {
    $(this).attr("placeholder", translate(this, $(this).attr("i18n_placeholder")));
  });
  $("[i18n_replacement_text]:not(.i18n-replaced)").each(function() {
    // Replace $replace$ inside of localized text with replacement text.
    var real_text = $(this).attr("i18n_replacement_text");
    var text = $(this).text();
    text = text.replace(/\$replace\$/g, real_text);
    $(this).text(text);
    // If localizePage is run again, don't let the [i18n] code above 
    // clobber our work
    $(this).addClass("i18n-replaced");
  });
  $("[i18n_replacement_el]:not(.i18n_replacement_el_replaced)").each(function() {
    // Replace a dummy <a/> inside of localized text with a real element.
    // Give the real element the same text as the dummy link.
    const $dummyLink = $($("a", this)[0]);
    const text = $dummyLink.text();
    const $realLink = $("#" + $(this).attr("i18n_replacement_el"));
    $dummyLink.replaceWith($realLink.text(text).val(text));

    // If localizePage is run again, don't let the [i18n] code above
    // clobber our work
    $(this).addClass("i18n_replacement_el_replaced");
  });
  $("[i18n_replacement_el_2]:not(.i18n_replacement_el_replaced_2)").each(function() {
    // Replace a dummy <a/> inside of localized text with a real element.
    // Give the real element the same text as the dummy link.
    const $dummyLink = $($("a", this)[1]);
    const text = $dummyLink.text();
    const $realLink = $("#" + $(this).attr("i18n_replacement_el_2"));
    $dummyLink.replaceWith($realLink.text(text).val(text));

    // If localizePage is run again, don't let the [i18n] code above
    // clobber our work
    $(this).addClass("i18n_replacement_el_replaced_2");
  });
  
  $("[i18n-alt]").each(function i18nImgAlt() {
    $(this).attr("alt", translate(this, $(this).attr("i18n-alt")));
  });

  $("[i18n-aria-label]").each(function i18nAriaLabel() {
    $(this).attr("aria-label", translate(this, $(this).attr("i18n-aria-label")));
  });

  // Replace $replace$ inside of localized text in an alt attribute.
  $("[i18n-alt-replacement-text]:not(.i18n-alt-replacement-text-replaced)").each(function() {
    const $element = $(this);
    const replacement = $element.attr("i18n-alt-replacement-text");
    const altTextReplaced = $element.attr("alt").replace(/\$replace\$/g, replacement);
    $element.attr("alt", altTextReplaced);
    $element.addClass(".i18n-alt-replacement-text-replaced");
  });

  // Make a right-to-left translation for Arabic and Hebrew languages
  var language = determineUserLanguage();
  if (language === "ar" || language === "he" ) {
    document.documentElement.dir = "rtl";
  }
};

// Determine what language the user's browser is set to use
determineUserLanguage = function() {
  var _i18nSetting = [
    (document.location.search.match(/(?:[?&])lang=([a-z_]+)/i) || {})[1],
    ""
  ];
  var setting = _i18nSetting.filter(function(o) { return o !== undefined; })[0];

  if (setting === "") {
    var langMatch = navigator.language.match(/^[a-z]+/i);
    if (langMatch !== null && typeof langMatch !== "undefined") {
      return langMatch[0];
    } else {
      return "en";
    }
  } else {
    return setting;
  }
};
