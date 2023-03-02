// Generates a userId based on same code as within the adblock extension
function generateUserId() {
    const timeSuffix = (Date.now()) % 1e8; // 8 digits from end of timestamp
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const result = [];
    for (let i = 0; i < 8; i++) {
        const choice = Math.floor(Math.random() * alphabet.length);
        result.push(alphabet[choice]);
    }
    return result.join('') + timeSuffix;
}

/** get userId or generate and get user Id  */
function forceGetUserId()
{
    let userId = getUserId();
    if (userId) {
        return userId;
    } else {
        setUserIdDiv();
        return getUserId();
    }
}

// Returns the adblock userid, if known
function getUserId() {
    var _userIdOptions = [
      (document.location.search.match(/(?:[?&])u=([a-zA-Z0-9]+)/) || {})[1],
      typeof adblock_userid !== "undefined" ? adblock_userid : undefined,
      (document.getElementById('adblock_user_id') || {}).innerText,
      ""
    ];
    // Use the first one that has a value.
    return _userIdOptions.filter(function(o) { return o !== undefined; })[0];
}

// Returns the adblock userid if exists, else return unknown
function getUserIdOrUnknown() {
    var userId = getUserId();
    return userId === "" ? "unknown" : userId;
}

// Returns the adblock premium userid, if known
function getPremiumUserId() {
    var _userIdOptions = [
      (document.location.search.match(/(?:[?&])u=([a-zA-Z0-9]+)/) || {})[1],
      typeof adblock_premium_userid !== "undefined" ? adblock_premium_userid : undefined,
      (document.getElementById('adblock_premium_user_id') || {}).innerText,
      ""
    ];
    // Use the first one that has a value.
    return _userIdOptions.filter(function(o) { return o !== undefined; })[0];
}

// Returns the adblock userid if exists, else return unknown
function getPremiumUserIdOrUnknown() {
    var userId = getPremiumUserId();
    return userId === "" ? "unknown" : userId;
}

function getCountryCode() {
    var _geoOptions = [
      (document.location.search.match(/(?:[?&])geo=([a-zA-Z0-9]+)/) || {})[1],
      (typeof adblockGeo === "object" && typeof adblockGeo.countryCode === "string") ? adblockGeo.countryCode : "unknown",
      "unknown"
    ];
    return _geoOptions.filter(function(o) { return o !== undefined; })[0];
}

function getLanguage() {
    var lan = (document.location.search.match(/(?:[?&])lang=([a-zA-Z0-9_]+)/) || {})[1];
    if (!lan) {
        lan = getLanguageInPath();
    }
    if (!lan) {
        lan = window.navigator.userLanguage || window.navigator.language || "";
    }
    return lan;
}

function getLanguageQueryString() {
    var lan = (document.location.search.match(/(?:[?&])lang=([a-zA-Z0-9_]+)/) || {})[1]
    if (lan === undefined) {
        return "";
    }
    return lan;
}

function getLanguageInPath() {
    const firstPath = window.location.pathname.split('/')[1];
    try {
        Intl.getCanonicalLocales(firstPath.replace("_", "-"));
    } catch (error) {
        return ""
    }
    return firstPath;
}

function getTwoLetterLocale() {
    var lan = getLanguage();
    return lan.slice(0, 2);
}

function getFirstRunBool() {
    var innerText = (document.getElementById('adblock_first_run_id') || {}).innerText;
    if (innerText === undefined) {
        return undefined;
    }
    return innerText === 'true';
}

// Returns "SI" if /installed, "SY" if /pay, "SG" if /, and "SU" for unknown
function getSource() {
    return "S" + getPlainSource();
}

function getPlainSource() {
    var a = "U";
    if (location.pathname.indexOf('premium') == -1) {
        if (location.pathname.indexOf('mobile/installed') != -1)
            a = "MI"
        else if (location.pathname.indexOf('install') != -1)
            a = "I";
        else if (location.pathname.indexOf('mobile/pay') != -1)
            a = "M"
        else if (location.pathname.indexOf('mobile/test') != -1)
            a = "T"
        else if (location.pathname.indexOf('pay') != -1)
            a = "Y"
        else if (location.pathname.length == 1)
            a = "G";
        else if (
            location.pathname.length > 1
            && typeof getLocalesIndex == "function"
            && getLocalesIndex().includes(location.pathname.split("/")[1])
            && location.pathname.split("/").length === 3
        )
            a = "G";
        else if (location.pathname.indexOf('survey') != -1)
            a = "Q";
        else if (location.pathname.indexOf('update') != -1)
            a = "B";
        else if (location.pathname.indexOf('chrome') != -1)
            a = "GC";
        else if (location.pathname.indexOf('edge') != -1)
            a = "GE";
        else if (location.pathname.indexOf('firefox') != -1)
            a = "GF";
        else if (location.pathname.indexOf('safari') != -1)
            a = "GS";
        else if (location.pathname.indexOf('iOS') != -1)
            a = "GI";
        else if (location.pathname.indexOf('android') != -1)
            a = "GA";
        else if (location.pathname.indexOf('thanks') != -1)
            a = "GT";
        else if (location.pathname.indexOf('block-ads-and-popups') != -1)
            a = "BAAP";
        else if (location.pathname.indexOf('block-facebook-ads-with-adblock') != -1)
            a = "BFBA";
        else if (location.pathname.indexOf('block-youtube-ads-with-adblock') != -1)
            a = "BYTA";
        else if (location.pathname.indexOf('block-twitch-ads-with-adblock') != -1)
            a = "BTA";
        else if (location.pathname.indexOf('cryptocurrency-mining') != -1)
            a = "CM";
        else if (location.pathname.indexOf('malware-protection') != -1)
            a = "MP";
    } else {
        // Must be before otherwise returns 'ME'
        if (location.pathname.indexOf('premium/enrollment/distraction-control')  != -1) {
            a = "MEDC";
        } else if (location.pathname.indexOf('premium/enrollment') != -1) {
            a = "ME";
        } else if (location.pathname.indexOf('premium') != -1) {
            a = "HME";
        } else if (location.pathname.indexOf('installed') != -1) {
            a = "Z";
        } else if (location.pathname.indexOf('payment') != -1) {
            a = "X";
        } else if (location.pathname.indexOf('terms') != -1) {
            a = "PS";
        } else if (location.pathname.indexOf('privacy') != -1) {
            a = "PP";
        } else if (location.pathname.indexOf('thankyou') != -1) {
            a = "PT";
        } else if (location.pathname.indexOf('uninstall') != -1) {
            a = "PU";
        }
    }
    if ((location.pathname.indexOf('/update/4.6.0/1') != -1) ||
        (location.pathname.indexOf('/update/4.6.0/2') != -1) ||
        (location.pathname.indexOf('/update/4.6.0/3') != -1) ||
        (location.pathname.indexOf('/update/4.7.3/1') != -1) ||
        (location.pathname.indexOf('/update/4.7.3/2') != -1)) {
        // TODO: remove me after the current /update/4.6.0 and / update/4.7.3 experiments.
        a = "ME";
    }
    return a
}

function isProd() {
    if (document.location.href.indexOf('localhost') == -1 &&
        document.location.href.indexOf('dev.getadblock') == -1) {
        return true;
    }
    return false;
}

function isEnglish() {
    var lan = window.navigator.userLanguage || window.navigator.language;
    var nonEnglish = (lan.slice(0, 2) !== "en");
    if (nonEnglish) {
        return false;
    }
    return true;
}

function isIOS() {
    if (navigator.userAgent.indexOf("iPhone") != -1 ||
        navigator.userAgent.indexOf("iPad") != -1 ||
        navigator.userAgent.indexOf("iPod") != -1) {
        return true;
    }
    return false;
}

function getOSSingleChar() {
    var a = "U";
    if (- 1 != navigator.appVersion.indexOf("Win")) {
        a = "W";
    } else if (isIOS()) {
        a = "I";
    } else if (- 1 != navigator.appVersion.indexOf("Mac")) {
        a = "M";
    } else if (- 1 != navigator.appVersion.indexOf("X11")) {
        a = "L";
    } else if (- 1 != navigator.appVersion.indexOf("Linux")) {
        a = "L";
    }
    return a

}

// Returns OS from navigator object
function getOS() {
    return "O" + getOSSingleChar();
}

function getOSVersion() {
    var forcedOSVersion = (document.location.search.match(/(?:[?&])ov=([0-9_]+)/) || {})[1];
    if (typeof forcedOSVersion !== "undefined") {
        return forcedOSVersion;
    }
    var match = navigator.userAgent.match(/(CrOS\ \w+|Windows\ NT|Mac\ OS\ X|Linux)\ ([\d\._]+)?/);
    return (match || [])[2] || "unknown";
}

function getBrowser() {
    var a = "U";
    var forcedBrowser = (document.location.search.match(/(?:[?&])bro=([A-Z])/) || {})[1]
    if (forcedBrowser !== undefined) {
        return forcedBrowser;
    }

    var chrome = navigator.userAgent.indexOf("Chrome");
    var opera = navigator.userAgent.indexOf("OPR");
    var edg = navigator.userAgent.indexOf("Edg");
    var edge = navigator.userAgent.indexOf("Edge");
    var safari = navigator.userAgent.indexOf("Safari");
    var firefox = navigator.userAgent.indexOf("Firefox");
    var samsung = navigator.userAgent.indexOf("Samsung");
    var trident = navigator.userAgent.indexOf("Trident");
    if ((chrome !== -1) &&
        (opera === -1) &&
        (samsung === -1) &&
        (edg === -1) &&
        (edge === -1)) {
        a = "E";
    } else if ((safari !== -1) &&
               (opera === -1) &&
               (samsung === -1) &&
               (edg === -1) &&
               (edge === -1)) {
        a = "S";
    } else if (firefox !== -1) {
        a = "F";
    } else if (opera !== -1) {
        a = "O";
    } else if (edge !== -1) {
        a = "M";
    } else if (edg !== -1) {
        a = "CM";
    } else if (navigator.appName === 'Microsoft Internet Explorer') {
        a = "T";
    } else if (trident !== -1) {
        a = "T";
    } else if (samsung !== -1) {
        a = "G";
    }
    return a;
}

// setUserIdDiv creates a userid and sets it in a div#adblock_user_id with CSS 'display: none;'
function setUserIdDiv() {
    const newDiv = document.createElement("div");
    newDiv.id = "adblock_user_id";
    newDiv.style.display = "none";
    const newContent = document.createTextNode(generateUserId());
    newDiv.appendChild(newContent);
    document.body.appendChild(newDiv);
}

var MABTracking = {
    /** A Tracking.Id is made of space separated Sections */
    Id: function(sections) {
        // Filter out empty sections and join by space
        return sections.reduce(function(sections, section) {
            if (section) sections.push(section);
            return sections;
        }, []).join(" ");
    },
    /** A Tracking.Section is made of server side allowlisted values */
    Section: function(values) {
        // Allowlisted values are always the same length when the length matters
        return values.join("");
    }
};

// Builds tracking information
// TODO name this something better
function recordTracking(omitUserId) {
    // Adblock Plus is not yet integrating with AdBlock experiments
    var experimentId = "0";
    var experimentVariant = "0";
    return MABTracking.Id([
        MABTracking.Section([eyeo.payment.productId]),
        MABTracking.Section(["X", experimentId, "G", experimentVariant]),
        MABTracking.Section(["F", getBrowser(), getOS(), getSource()]),
        MABTracking.Section([omitUserId ? "unknown" : forceGetUserId()])
    ]);
}

function getGAID() {
    if (typeof ga !== 'undefined' && typeof ga.getByName === 'function') {
        var tracker = ga.getByName('gatracker');
        if (tracker != null) {
            return tracker.get('clientId');
        }
        return '';
    }
    return '';
};

function isPremium() {
    var abPremium = !!document.location.pathname.match(/premium/);
    return abPremium;
}

function getPremiumCid() {
    if (isPremium()) {
        if (typeof premiumVars === 'object' && typeof premiumVars.cid === "string") {
            return premiumVars.cid;
        }
    }
    return "0";
}

function getPremiumSid() {
    if (isPremium()) {
        if (typeof premiumVars === 'object' && typeof premiumVars.sid === "string") {
            return premiumVars.sid;
        }
    }
    return "0";
}

function getPremiumSession() {
    if (isPremium()) {
        if (typeof premiumVars === 'object' && typeof premiumVars.sess === "string") {
            return premiumVars.sess;
        }
    }
    return "";
}

function getPurchaseMetadata(flavor, testMode) {
    var string = "";
    if (typeof _experiment !== 'undefined') {
        string = "E="+_experiment.name(flavor)+"EI="+_experiment.experimentId(flavor)+"V="+_experiment.variant(flavor)+
                  "VI="+_experiment.variantIndex(flavor);
    } else {
        string = "E=EI=V=VI=";
    }

    if (typeof getUserId === 'function') {
        string = string + "U="+getUserId();
    } else {
        string = string + "U=";
    }

    string = string + "G=" + getGAID();
    string = string + "L=" + getLanguage();
    string = string + "C=" + getCountryCode();
    string = string + "P=" + (typeof isPremium === "function" ? (isPremium() ? "true" : "false") : "false");
    string = string + "CID=" + (typeof getPremiumCid === "function" ? getPremiumCid() : "0");
    string = string + "SID=" + (typeof getPremiumSid === "function" ? getPremiumSid() : "0");
    return string;
}

// Should be used to run a function that expects the userId to
// be present.  This functionality is useful since the userId is
// not present until window.onload.
//
// To register a function to run call _userIdDispatch.runWithUserId(func)
// with the desired function.  The user ID will be supplied as the only
// parameter.  The user ID can be an empty string.
//
// ** Call runWithUserId before window.onload
var _userIdDispatch = (function() {
    var callbacks = [];

    var runCallbacks = function() {
        var numTrys = 0;
        (function checkForInjection() {
            // Run later to get behind the userid injection.
            setTimeout(function() {
                var userId = getUserIdOrUnknown();
                var firstRun = getFirstRunBool();
                var dispatchNow = false;
                if (userId === "unknown" || firstRun === undefined) {
                    numTrys++;
                    if (numTrys <= 10) {
                        checkForInjection();
                    } else {
                        dispatchNow = true;
                    }
                } else {
                    dispatchNow = true;
                }

                if (dispatchNow) {
                    for (var i = 0; i < callbacks.length; i++) {
                        callbacks[i](userId, firstRun);
                    }
                }
            }, 1000);
        })();
    };
    window.addEventListener('load', runCallbacks, false);

    return {
        runWithUserId: function(func) {
            callbacks.push(func);
        }
    }
})();

/*!
 * This file is part of website-defaults
 * Copyright (C) 2016-present eyeo GmbH
 *
 * website-defaults is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * website-defaults is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with website-defaults.  If not, see <http://www.gnu.org/licenses/>.
 */
var ADDRESS_MASKING_DELAY = 250;

function unmaskAddress(target)
{
  var attributes = JSON.parse(target.getAttribute("data-mask"));

  for (var attr in attributes)
    target[attr] = atob(attributes[attr]);

  target.removeAttribute("data-mask");
}

document.addEventListener("DOMContentLoaded", function()
{
  var unmaskAfterTimeout = setTimeout.bind(
    this,
    unmaskAddress,
    ADDRESS_MASKING_DELAY
  );

  var linksToBeMasked = [].slice.call(
    document.querySelectorAll("[data-mask]")
  );

  linksToBeMasked.forEach(unmaskAddress);
});

(()=>{"use strict";const e={AppealForm:{currency:(t=adblock.settings.country,"GB"==t?"GBP":"AU"==t?"AUD":"CA"==t?"CAD":"RU"==t?"RUB":"JP"==t?"JPY":"MX"==t?"MXN":["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","GR","HU","IE","IT","LV","LT","LG","MT","NL","PL","PT","RO","SK","SI","ES","SE","DE","FR"].includes(t)?"EUR":"USD"),selected:3},Paddle:{sandbox:{vendor:7645,products:{USD:{once:{500:34508,1e3:34509,2e3:34510,3500:34511,5e3:34512},monthly:{199:34514,299:34515,399:34516,499:34517,999:34518},yearly:{500:34519,1e3:34520,2e3:34521,3500:34522,5e3:34523}},AUD:{once:{500:34524,1e3:34525,2e3:34526,3500:34527,5e3:34528},monthly:{199:34529,299:34530,399:34531,499:34532,999:34533},yearly:{500:34534,1e3:34535,2e3:34536,3500:34537,5e3:34538}},CAD:{once:{500:34539,1e3:34540,2e3:34541,3500:34542,5e3:34543},monthly:{199:34545,299:34546,399:34547,499:34548,999:34549},yearly:{500:34550,1e3:34551,2e3:34552,3500:34553,5e3:34554}},EUR:{once:{500:34555,1e3:34556,2e3:34557,3500:34558,5e3:34559},monthly:{199:34560,299:34561,399:34562,499:34563,999:34564},yearly:{500:34565,1e3:34566,2e3:34567,3500:34568,5e3:34569}},GBP:{once:{500:34570,1e3:34571,2e3:34572,3500:34573,5e3:34574},monthly:{199:34575,299:34576,399:34577,499:34578,999:34579},yearly:{500:34580,1e3:34581,2e3:34582,3500:34583,5e3:34584}},JPY:{once:{500:34585,1e3:34586,1500:34587,3e3:34588,5e3:34589},monthly:{200:34590,300:34591,500:34592,1e3:34593,1500:34594},yearly:{500:34595,1e3:34596,1500:34597,3e3:34598,5e3:34599}},MXN:{once:{1e4:34600,2e4:34601,3e4:34602,5e4:34603,6e4:34604},monthly:{4e3:34605,6e3:34606,8e3:34607,1e4:34608,2e4:34609},yearly:{1e4:34610,2e4:34611,3e4:34612,5e4:34613,6e4:34614}},RUB:{once:{25e3:34615,4e4:34616,5e4:34617,1e5:34618,2e5:34619},monthly:{15e3:34620,25e3:34621,4e4:34622,5e4:34623,1e5:34624},yearly:{25e3:34625,4e4:34626,5e4:34627,1e5:34628,2e5:34629}}}}}};var t;const r=document.getElementById("appeal-form"),o=document.getElementById("appeal-form-frequency"),n=document.getElementById("appeal-form-amount--fixed"),a=document.getElementById("appeal-form-amount--custom");function c(e,t){return"JPY"==e?t:t/100}function s(e,t){const r=adblock.settings.locale,o=c(e,t),n={style:"currency",currency:e},a=Object.assign({},n,{notation:"compact"}),s=Number.isInteger(o)?a:n;return new Intl.NumberFormat(r,s).format(o)}let i=e.Paddle.sandbox;new URLSearchParams(location.search).get("testmode")&&(i=e.Paddle.sandbox),i==e.Paddle.sandbox&&Paddle.Environment.set("sandbox"),Paddle.Setup({vendor:i.vendor});const l=new class{#e;#t;#r;#o;#n;#a;constructor({placeholder:e,paddleConfiguration:t,formConfiguration:r}){this.#e=t,this.#t=r,this.#c(),this.#s(),this.#i(),this.#a=this.#r.querySelector(".appeal-form__error"),e.replaceWith(this.#r)}#c(){this.#r=r.content.cloneNode(!0).firstElementChild,this.#r.querySelector(".appeal-form-header__heading").innerHTML=adblock.strings["appeal-form-header__heading"],this.#r.querySelector(".appeal-form-checkout__submit span").innerHTML=adblock.strings["appeal-form-checkout__submit"],this.#r.addEventListener("submit",(e=>this.#l(e)))}#s(){this.#o=this.#r.querySelector(".appeal-form-header__select");for(const e in this.#e.products){const t=document.createElement("option");t.textContent=e,this.#o.appendChild(t)}this.#o.value=this.#t.currency,this.#o.addEventListener("change",(e=>this.#u(e)))}#i(){this.#n=this.#r.querySelector(".appeal-form-frequencies"),this.#d(this.#t.currency),this.#n.querySelectorAll(".appeal-form-amount__radio")[this.#t.selected].checked=!0,this.#n.addEventListener("focusin",(e=>this.#m(e))),this.#n.addEventListener("input",(e=>this.#p(e)))}#d(e){const t=[];for(const r in this.#e.products[e]){const i=o.content.cloneNode(!0).firstElementChild;i.querySelector(".appeal-form-frequency__heading").innerHTML=adblock.strings[`appeal-form-frequency__heading--${r}`];const l=i.querySelector(".appeal-form-amounts");for(const t in this.#e.products[e][r]){const o=n.content.cloneNode(!0).firstElementChild;o.querySelector(".appeal-form-amount__text").textContent=s(e,t);const a=o.querySelector(".appeal-form-amount__radio");a.value=t,a.dataset.frequency=r,a.dataset.product=this.#e.products[e][r][t],l.appendChild(o)}const u=a.content.cloneNode(!0).firstElementChild,d=u.querySelector(".appeal-form-amount__input");d.placeholder=s(e,Object.keys(this.#e.products[e][r])[3]),d.min=c(e,Object.keys(this.#e.products[e][r])[0]),d.dataset.frequency=r,d.dataset.product="custom",l.appendChild(u),t.push(i)}this.#n.replaceChildren(...t)}#u(e){const t=Array.from(this.#n.querySelectorAll(".appeal-form-amount__input")).map((e=>e.value)),r=Array.from(this.#n.querySelectorAll(".appeal-form-amount__radio")).findIndex((e=>e.checked));this.#d(e.currentTarget.value),this.#n.querySelectorAll(".appeal-form-amount__input").forEach(((e,r)=>e.value=t[r])),this.#n.querySelectorAll(".appeal-form-amount__radio")[r].checked=!0}#h(e){const t=parseFloat(e.value),r=parseFloat(e.min);t&&t<r?(this.#a.innerHTML=adblock.strings[`appeal-form__error--${e.dataset.frequency}`],this.#a.hidden=!1):this.#a.hidden=!0}#m(e){if("number"==e.target.type){const t=e.target.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__radio");0==t.checked&&(t.checked=!0)}"number"!=e.target.type&&"radio"!=e.target.type||this.#h(e.target)}#p(e){"number"==e.target.type&&this.#h(e.target)}#f=[];onSubmit(e){this.#f.push(e)}#l(e){e.preventDefault();const t=this.#o.value;let r=this.#n.querySelector(":checked"),o=r.value;"custom"==o&&(r=r.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__input"),o=r.value);const n=r.dataset.frequency,a=r.dataset.product;this.#f.forEach((e=>e({currency:t,frequency:n,amount:o,product:a})))}disable(){this.#r.classList.add("appeal-form--disabled"),this.#r.querySelectorAll("input, button").forEach((e=>{e.disabled=!0}))}enable(){this.#r.classList.remove("appeal-form--disabled"),this.#r.querySelectorAll("input, button").forEach((e=>{e.disabled=!1}))}}({paddleConfiguration:i,formConfiguration:e.AppealForm,placeholder:document.querySelector(".appeal-form")});l.onSubmit((e=>{l.disable(),eyeo&&eyeo.payment&&eyeo.payment.shouldStoreContributionInfo&&localStorage.setItem("contributionInfo",JSON.stringify({amount:e.amount,frequency:e.frequency,processor:"paddle",currency:e.currency,lang:document.documentElement.lang,source:eyeo.payment.sourceId||"U",clickTs:Date.now()}));const t={testmode:!1,userid:"",tracking:recordTracking(!0),locale:"",country:"unknown",ga_id:"",premium:"false",premium_cid:"0",premium_sid:"0",currency:e.currency,recurring:"once"!=e.frequency,subType:"once"!=e.frequency?e.frequency:"",experiment:"",experiment_id:"",variant:"",variant_index:-1,amount_cents:parseInt(e.amount,10),success_url:`${location.origin}/payment-complete`,cancel_url:location.href},r=e.product,o={locale:adblock.settings.language,title:adblock.strings["appeal-form-checkout__title"],success:t.success_url,closeCallback:()=>{l.enable()}};"custom"==r?fetch("https://getadblock.appspot.com/paddle/generate-pay-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((e=>e.json())).then((e=>{Paddle.Checkout.open(Object.assign(o,{override:e.url}))})).catch((e=>adblock.error(e))):Paddle.Checkout.open(Object.assign(o,{allowQuantity:!1,passthrough:t,product:r}))}))})();
'use strict';

var SCROLL_TICK_LENGTH = 10;
var SCROLL_TIME = 500;

var page = document.scrollingElement || document.documentElement; // IE
var body = document.body;
var donationHeading = document.querySelector('.payment-heading');

window.addEventListener('resize', function() {
  if (window.innerWidth > 991)
    if (!page.classList.contains('hide-form'))
      page.classList.add('show-form');
  else
    page.classList.remove('show-form');
});

document.documentElement.classList.remove('no-js');

// sticky footer
document.querySelector('main.container').setAttribute('id', 'content');
