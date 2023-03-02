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

(()=>{"use strict";const e={AppealForm:{currency:(t=adblock.settings.country,"GB"==t?"GBP":"AU"==t?"AUD":"CA"==t?"CAD":"RU"==t?"RUB":"JP"==t?"JPY":"NZ"==t?"NZD":"CH"==t?"CHF":["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","GR","HU","IE","IT","LV","LT","LG","MT","NL","PL","PT","RO","SK","SI","ES","SE","DE","FR"].includes(t)?"EUR":"USD"),selected:3},Paddle:{sandbox:{vendor:11004,products:{USD:{once:{1e3:46028,1500:46029,2e3:46030,3500:46031,5e3:46032},monthly:{199:46074,299:46075,399:46076,499:46077,999:46078},yearly:{1e3:46079,1500:46080,2e3:46081,3500:46082,5e3:46083}},AUD:{once:{1e3:46033,1500:46034,2e3:46035,3500:46036,5e3:46037},monthly:{199:46084,299:46085,399:46086,499:46087,999:46088},yearly:{1e3:46089,1500:46090,2e3:46091,3500:46092,5e3:46093}},CAD:{once:{1e3:46038,1500:46039,2e3:46040,3500:46041,5e3:46042},monthly:{199:46094,299:46095,399:46096,499:46097,999:46098},yearly:{1e3:46099,1500:46181,2e3:46182,3500:46183,5e3:46184}},EUR:{once:{1e3:46048,1500:46049,2e3:46050,3500:46051,5e3:46052},monthly:{199:46195,299:46196,399:46197,499:46198,999:46199},yearly:{1e3:46200,1500:46201,2e3:46202,3500:46203,5e3:46204}},GBP:{once:{1e3:46053,1500:46054,2e3:46055,3500:46056,5e3:46057},monthly:{199:46205,299:46206,399:46207,499:46208,999:46209},yearly:{1e3:46210,1500:46211,2e3:46212,3500:46213,5e3:46214}},JPY:{once:{1500:46064,2e3:46065,2500:46066,3500:46067,5e3:46068},monthly:{200:46225,300:46226,500:46227,1e3:46228,1500:46229},yearly:{1500:46230,2e3:46231,2500:46232,3500:46233,5e3:46234}},NZD:{once:{1e3:46058,1500:46059,2e3:46060,3500:46062,5e3:46063},monthly:{199:46215,299:46216,399:46217,499:46218,999:46219},yearly:{1e3:46220,1500:46221,2e3:46222,3500:46223,5e3:46224}},CHF:{once:{1e3:46043,1500:46044,2e3:46045,3500:46046,5e3:46047},monthly:{199:46185,299:46186,399:46187,499:46188,999:46189},yearly:{1e3:46190,1500:46191,2e3:46192,3500:46193,5e3:46194}},RUB:{once:{25e3:46069,5e4:46070,1e5:46071,25e4:46072,5e5:46073},monthly:{15e3:46235,25e3:46236,4e4:46237,5e4:46238,1e5:46239},yearly:{25e3:46240,5e4:46241,1e5:46242,25e4:46243,5e5:46244}}}},live:{vendor:164164,products:{USD:{once:{1e3:816549,1500:816550,2e3:816551,3500:816552,5e3:816553},monthly:{199:816774,299:816775,399:816776,499:816777,999:816778},yearly:{1e3:816779,1500:816780,2e3:816781,3500:816782,5e3:816783}},AUD:{once:{1e3:816522,1500:816523,2e3:816524,3500:816525,5e3:816526},monthly:{199:816692,299:816693,399:816694,499:816696,999:816697},yearly:{1e3:816699,1500:816700,2e3:816702,3500:816703,5e3:816705}},CAD:{once:{1e3:816528,1500:816529,2e3:816530,3500:816531,5e3:816532},monthly:{199:816706,299:816708,399:816710,499:816711,999:816712},yearly:{1e3:816714,1500:816715,2e3:816716,3500:816717,5e3:816718}},EUR:{once:{1e3:816517,1500:816518,2e3:816519,3500:816520,5e3:816521},monthly:{199:816681,299:816682,399:816683,499:816684,999:816686},yearly:{1e3:816687,1500:816688,2e3:816689,3500:816690,5e3:816691}},GBP:{once:{1e3:816538,1500:816539,2e3:816540,3500:816541,5e3:816542},monthly:{199:816734,299:816735,399:816736,499:816737,999:816738},yearly:{1e3:816739,1500:816740,2e3:816741,3500:816743,5e3:816744}},JPY:{once:{1500:816554,2e3:816555,2500:816556,3500:816557,5e3:816558},monthly:{200:816784,300:816785,500:816786,1e3:816787,1500:816788},yearly:{1500:816789,2e3:816791,2500:816792,3500:816794,5e3:816795}},NZD:{once:{1e3:816543,1500:816544,2e3:816545,3500:816547,5e3:816548},monthly:{199:816760,299:816762,399:816764,499:816766,999:816768},yearly:{1e3:816769,1500:816770,2e3:816771,3500:816772,5e3:816773}},CHF:{once:{1e3:816533,1500:816535,2e3:816534,3500:816536,5e3:816537},monthly:{199:816720,299:816722,399:816723,499:816725,999:816726},yearly:{1e3:816727,1500:816728,2e3:816730,3500:816731,5e3:816733}},RUB:{once:{25e3:816559,5e4:816560,1e5:816561,25e4:816562,5e5:816563},monthly:{15e3:816796,25e3:816797,4e4:816799,5e4:816800,1e5:816801},yearly:{25e3:816802,5e4:816803,1e5:816804,25e4:816805,5e5:816806}}}}}};var t;const r=document.getElementById("appeal-form"),o=document.getElementById("appeal-form-frequency"),n=document.getElementById("appeal-form-amount--fixed"),a=document.getElementById("appeal-form-amount--custom");function c(e,t){return"JPY"==e?t:t/100}function l(e,t){const r=adblock.settings.language,o=c(e,t),n={style:"currency",currency:e},a=Object.assign({},n,{notation:"compact"}),l=Number.isInteger(o)?a:n;return new Intl.NumberFormat(r,l).format(o)}let s=e.Paddle.live;new URLSearchParams(location.search).get("testmode")&&(s=e.Paddle.sandbox),s==e.Paddle.sandbox&&Paddle.Environment.set("sandbox"),Paddle.Setup({vendor:s.vendor});const i=new class{#e;#t;#r;#o;#n;#a;constructor({placeholder:e,paddleConfiguration:t,formConfiguration:r}){this.#e=t,this.#t=r,this.#c(),this.#l(),this.#s(),this.#a=this.#r.querySelector(".appeal-form__error"),e.replaceWith(this.#r)}#c(){this.#r=r.content.cloneNode(!0).firstElementChild,this.#r.querySelector(".appeal-form-header__heading").innerHTML=adblock.strings["appeal-form-header__heading"],this.#r.querySelector(".appeal-form-checkout__submit span").innerHTML=adblock.strings["appeal-form-checkout__submit"],this.#r.addEventListener("submit",(e=>this.#i(e)))}#l(){this.#o=this.#r.querySelector(".appeal-form-header__select");for(const e in this.#e.products){const t=document.createElement("option");t.textContent=e,this.#o.appendChild(t)}this.#o.value=this.#t.currency,this.#o.addEventListener("change",(e=>this.#u(e)))}#s(){this.#n=this.#r.querySelector(".appeal-form-frequencies"),this.#d(this.#t.currency),this.#n.querySelectorAll(".appeal-form-amount__radio")[this.#t.selected].checked=!0,this.#n.addEventListener("focusin",(e=>this.#m(e))),this.#n.addEventListener("input",(e=>this.#p(e)))}#d(e){const t=[];for(const r in this.#e.products[e]){const s=o.content.cloneNode(!0).firstElementChild;s.querySelector(".appeal-form-frequency__heading").innerHTML=adblock.strings[`appeal-form-frequency__heading--${r}`];const i=s.querySelector(".appeal-form-amounts");for(const t in this.#e.products[e][r]){const o=n.content.cloneNode(!0).firstElementChild;o.querySelector(".appeal-form-amount__text").textContent=l(e,t);const a=o.querySelector(".appeal-form-amount__radio");a.value=t,a.dataset.frequency=r,a.dataset.product=this.#e.products[e][r][t],i.appendChild(o)}const u=a.content.cloneNode(!0).firstElementChild,d=u.querySelector(".appeal-form-amount__input");d.placeholder=l(e,Object.keys(this.#e.products[e][r])[3]),d.min=c(e,Object.keys(this.#e.products[e][r])[0]),d.dataset.frequency=r,d.dataset.product="custom",i.appendChild(u),t.push(s)}this.#n.replaceChildren(...t)}#u(e){const t=Array.from(this.#n.querySelectorAll(".appeal-form-amount__input")).map((e=>e.value)),r=Array.from(this.#n.querySelectorAll(".appeal-form-amount__radio")).find((e=>e.checked)),o=Array.from(this.#n.querySelectorAll(".appeal-form-amount__radio")).findIndex((e=>e.checked));this.#d(e.currentTarget.value),this.#n.querySelectorAll(".appeal-form-amount__input").forEach(((e,r)=>e.value=t[r])),this.#n.querySelectorAll(".appeal-form-amount__radio")[o].checked=!0,"custom"==r.value&&this.#y(r.parentElement.querySelector(".appeal-form-amount__input"))}#y(e){const t=parseFloat(e.value),r=parseFloat(e.min);if(t&&t<r){this.#a.innerHTML=adblock.strings[`appeal-form__error--${e.dataset.frequency}`];const t=this.#a.querySelector(".currency-symbol"),r=this.#a.querySelector(".minimum-amount"),o=parseFloat(e.min),n=new Intl.NumberFormat(adblock.settings.language,{style:"currency",notation:"compact",currency:this.#o.value});"$"==(t.textContent||"").trim()&&"5"==(r.textContent||"").trim()&&(t.textContent="",r.textContent=n.format(o)),this.#a.hidden=!1}else this.#a.hidden=!0}#m(e){if("number"==e.target.type){const t=e.target.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__radio");0==t.checked&&(t.checked=!0)}"number"!=e.target.type&&"radio"!=e.target.type||this.#y(e.target)}#p(e){"number"==e.target.type&&this.#y(e.target)}#h=[];onSubmit(e){this.#h.push(e)}#i(e){e.preventDefault();const t=this.#o.value;let r=this.#n.querySelector(":checked"),o=r.value;"custom"==o&&(r=r.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__input"),o=function(e,t){return"JPY"==e?t:100*t}(t,parseFloat(r.value)));const n=r.dataset.frequency,a=r.dataset.product;this.#h.forEach((e=>e({currency:t,frequency:n,amount:o,product:a})))}disable(){this.#r.classList.add("appeal-form--disabled"),this.#r.querySelectorAll("input, button").forEach((e=>{e.disabled=!0}))}enable(){this.#r.classList.remove("appeal-form--disabled"),this.#r.querySelectorAll("input, button").forEach((e=>{e.disabled=!1}))}}({paddleConfiguration:s,formConfiguration:e.AppealForm,placeholder:document.querySelector(".appeal-form")});i.onSubmit((e=>{i.disable(),eyeo&&eyeo.payment&&eyeo.payment.shouldStoreContributionInfo&&localStorage.setItem("contributionInfo",JSON.stringify({amount:e.amount,frequency:e.frequency,processor:"paddle",currency:e.currency,lang:document.documentElement.lang,source:eyeo.payment.sourceId||"U",clickTs:Date.now()}));const t={testmode:!1,userid:"",tracking:recordTracking(!0),locale:"",country:"unknown",ga_id:"",premium:"false",premium_cid:"0",premium_sid:"0",currency:e.currency,recurring:"once"!=e.frequency,subType:"once"!=e.frequency?e.frequency:"",experiment:"",experiment_id:"",variant:"",variant_index:-1,amount_cents:parseInt(e.amount,10),success_url:`${location.origin}/payment-complete`,cancel_url:location.href},r=e.product,o={locale:adblock.settings.language,title:adblock.strings["appeal-form-checkout__title"],success:t.success_url,closeCallback:()=>{i.enable()}};"custom"==r?fetch("https://getadblock.appspot.com/paddle/generate-pay-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((e=>e.json())).then((e=>{if(e.hasOwnProperity("success")&&0==e.success)throw new Error(adblock.strings["error--unexpected"]);Paddle.Checkout.open(Object.assign(o,{override:e.url}))})).catch((e=>adblock.error(e))):Paddle.Checkout.open(Object.assign(o,{allowQuantity:!1,passthrough:t,product:r}))}))})();
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
