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
    const pathParts = location.pathname.split("/");
    const firstPath = pathParts[1];
    try {
        if (pathParts.length < 3) throw new Error();
        Intl.getCanonicalLocales(firstPath.replace("_", "-"));
        return firstPath;
    } catch (error) {
        return ""
    }
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
        if (tracker) {
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

var at=Object.defineProperty;var ct=(e,t,r)=>t in e?at(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var be=(e,t,r)=>(ct(e,typeof t!="symbol"?t+"":t,r),r),ve=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var m=(e,t,r)=>(ve(e,t,"read from private field"),r?r.call(e):t.get(e)),w=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},U=(e,t,r,o)=>(ve(e,t,"write to private field"),o?o.call(e,r):t.set(e,r),r);var b=(e,t,r)=>(ve(e,t,"access private method"),r);const G={AppealForm:{currency:typeof adblock=="object"&&adblock.settings.currency||"USD",selected:3},Paddle:{sandbox:{vendor:11004,products:{USD:{once:{1e3:46028,1500:46029,2e3:46030,3500:46031,5e3:46032,custom:500},monthly:{199:46074,299:46075,399:46076,499:46077,999:46078,custom:199},yearly:{1e3:46079,1500:46080,2e3:46081,3500:46082,5e3:46083,custom:500}},AUD:{once:{1e3:46033,1500:46034,2e3:46035,3500:46036,5e3:46037,custom:500},monthly:{199:46084,299:46085,399:46086,499:46087,999:46088,custom:199},yearly:{1e3:46089,1500:46090,2e3:46091,3500:46092,5e3:46093,custom:500}},CAD:{once:{1e3:46038,1500:46039,2e3:46040,3500:46041,5e3:46042,custom:500},monthly:{199:46094,299:46095,399:46096,499:46097,999:46098,custom:199},yearly:{1e3:46099,1500:46181,2e3:46182,3500:46183,5e3:46184,custom:500}},EUR:{once:{1e3:46048,1500:46049,2e3:46050,3500:46051,5e3:46052,custom:500},monthly:{199:46195,299:46196,399:46197,499:46198,999:46199,custom:199},yearly:{1e3:46200,1500:46201,2e3:46202,3500:46203,5e3:46204,custom:500}},GBP:{once:{1e3:46053,1500:46054,2e3:46055,3500:46056,5e3:46057,custom:500},monthly:{199:46205,299:46206,399:46207,499:46208,999:46209,custom:199},yearly:{1e3:46210,1500:46211,2e3:46212,3500:46213,5e3:46214,custom:500}},JPY:{once:{1500:46064,2e3:46065,2500:46066,3500:46067,5e3:46068,custom:500},monthly:{200:46225,300:46226,500:46227,1e3:46228,1500:46229,custom:200},yearly:{1500:46230,2e3:46231,2500:46232,3500:46233,5e3:46234,custom:500}},NZD:{once:{1e3:46058,1500:46059,2e3:46060,3500:46062,5e3:46063,custom:500},monthly:{199:46215,299:46216,399:46217,499:46218,999:46219,custom:199},yearly:{1e3:46220,1500:46221,2e3:46222,3500:46223,5e3:46224,custom:500}},CHF:{once:{1e3:46043,1500:46044,2e3:46045,3500:46046,5e3:46047,custom:500},monthly:{199:46185,299:46186,399:46187,499:46188,999:46189,custom:199},yearly:{1e3:46190,1500:46191,2e3:46192,3500:46193,5e3:46194,custom:500}},RUB:{once:{25e3:46069,5e4:46070,1e5:46071,25e4:46072,5e5:46073,custom:25e3},monthly:{15e3:46235,25e3:46236,4e4:46237,5e4:46238,1e5:46239,custom:15e3},yearly:{25e3:46240,5e4:46241,1e5:46242,25e4:46243,5e5:46244,custom:25e3}}}},live:{vendor:164164,products:{USD:{once:{1e3:816549,1500:816550,2e3:816551,3500:816552,5e3:816553,custom:500},monthly:{199:816774,299:816775,399:816776,499:816777,999:816778,custom:199},yearly:{1e3:816779,1500:816780,2e3:816781,3500:816782,5e3:816783,custom:500}},AUD:{once:{1e3:816522,1500:816523,2e3:816524,3500:816525,5e3:816526,custom:500},monthly:{199:816692,299:816693,399:816694,499:816696,999:816697,custom:199},yearly:{1e3:816699,1500:816700,2e3:816702,3500:816703,5e3:816705,custom:500}},CAD:{once:{1e3:816528,1500:816529,2e3:816530,3500:816531,5e3:816532,custom:500},monthly:{199:816706,299:816708,399:816710,499:816711,999:816712,custom:199},yearly:{1e3:816714,1500:816715,2e3:816716,3500:816717,5e3:816718,custom:500}},EUR:{once:{1e3:816517,1500:816518,2e3:816519,3500:816520,5e3:816521,custom:500},monthly:{199:816681,299:816682,399:816683,499:816684,999:816686,custom:199},yearly:{1e3:816687,1500:816688,2e3:816689,3500:816690,5e3:816691,custom:500}},GBP:{once:{1e3:816538,1500:816539,2e3:816540,3500:816541,5e3:816542,custom:500},monthly:{199:816734,299:816735,399:816736,499:816737,999:816738,custom:199},yearly:{1e3:816739,1500:816740,2e3:816741,3500:816743,5e3:816744,custom:500}},JPY:{once:{1500:816554,2e3:816555,2500:816556,3500:816557,5e3:816558,custom:500},monthly:{200:816784,300:816785,500:816786,1e3:816787,1500:816788,custom:200},yearly:{1500:816789,2e3:816791,2500:816792,3500:816794,5e3:816795,custom:500}},NZD:{once:{1e3:816543,1500:816544,2e3:816545,3500:816547,5e3:816548,custom:500},monthly:{199:816760,299:816762,399:816764,499:816766,999:816768,custom:199},yearly:{1e3:816769,1500:816770,2e3:816771,3500:816772,5e3:816773,custom:500}},CHF:{once:{1e3:816533,1500:816535,2e3:816534,3500:816536,5e3:816537,custom:500},monthly:{199:816720,299:816722,399:816723,499:816725,999:816726,custom:199},yearly:{1e3:816727,1500:816728,2e3:816730,3500:816731,5e3:816733,custom:500}},RUB:{once:{25e3:816559,5e4:816560,1e5:816561,25e4:816562,5e5:816563,custom:25e3},monthly:{15e3:816796,25e3:816797,4e4:816799,5e4:816800,1e5:816801,custom:15e3},yearly:{25e3:816802,5e4:816803,1e5:816804,25e4:816805,5e5:816806,custom:25e3}}}}}};class ut{constructor(){this.callbacks={}}on(t,r){this.callbacks[t]||(this.callbacks[t]=[]),this.callbacks[t].push(r)}fire(t,r){if(this.callbacks[t])for(const o of this.callbacks[t])try{o(r)}catch(n){console.error(n)}}}function ie(e,t){return e=="JPY"?t:t/100}function pt(e,t){return e=="JPY"?t:t*100}function Ee(e,t){return new Intl.NumberFormat(navigator.language,{style:"currency",currency:e,minimumFractionDigits:0}).format(ie(e,t))}const ft=document.getElementById("appeal-form"),mt=document.getElementById("appeal-form-amount--fixed"),dt=document.getElementById("appeal-form-amount--custom");var N,T,C,M,q,Y,L,K,W,Se,X,Ce,Z,$e,Q,xe,V,re,z,ne,pe,Le,fe,je,me,Be,de,De;let qe=(N=class{constructor({placeholder:t,paddleConfig:r,formConfig:o}){w(this,W);w(this,X);w(this,Z);w(this,Q);w(this,V);w(this,z);w(this,pe);w(this,fe);w(this,me);w(this,de);be(this,"events");w(this,T,void 0);w(this,C,void 0);w(this,M,void 0);w(this,q,void 0);w(this,Y,[]);w(this,L,void 0);w(this,K,void 0);this.events=new ut,U(this,T,r),U(this,C,ft.content.cloneNode(!0).firstElementChild),m(this,C).querySelector(".appeal-form-header__heading").innerHTML=adblock.strings["appeal-form-header__heading"],m(this,C).querySelector(".appeal-form-checkout__submit").innerHTML=adblock.strings["appeal-form-checkout__submit"],U(this,L,m(this,C).querySelector(".appeal-form__error")),U(this,K,m(this,C).querySelector(".appeal-form-checkout__submit")),U(this,M,m(this,C).querySelector(".appeal-form-header__select"));for(const n in r.products){const s=document.createElement("option");s.textContent=n.toUpperCase(),s.value=n.toUpperCase(),m(this,M).appendChild(s)}m(this,M).value=o.currency,U(this,q,m(this,C).querySelector(".appeal-form-frequencies"));for(const n in r.products[o.currency]){let s=1;const i=m(this,q).querySelector(`.appeal-form-frequency--${n}`);i.querySelector(".appeal-form-frequency__heading").innerHTML=adblock.strings[`appeal-form-frequency__heading--${n}`];const l=i.querySelector(".appeal-form-amounts");for(const u in r.products[o.currency][n]){let c,a,y;u=="custom"?(c=dt.content.cloneNode(!0).firstElementChild,y=c.querySelector(".appeal-form-amount__input"),y.dataset.testid=`appeal-form-amount__input--${n}`,y.dataset.frequency=n):c=mt.content.cloneNode(!0).firstElementChild,a=c.querySelector(".appeal-form-amount__radio"),a.dataset.testid=`appeal-form-amount__radio--${n}-${s++}`,a.dataset.frequency=n,m(this,Y).push(c),l.appendChild(c)}}b(this,W,Se).call(this,o.currency),m(this,q).querySelectorAll(".appeal-form-amount__radio")[o.selected].checked=!0,m(this,M).addEventListener("change",n=>b(this,W,Se).call(this,n.currentTarget.value)),m(this,q).addEventListener("focusin",n=>b(this,fe,je).call(this,n)),m(this,q).addEventListener("input",n=>b(this,me,Be).call(this,n)),m(this,C).addEventListener("submit",n=>b(this,de,De).call(this,n)),t.replaceWith(m(this,C)),m(this,C).dataset.testid="appeal-form-constructed"}state(){const t=m(this,q).querySelector(".appeal-form-amount__radio:checked"),r=m(this,M).value,o=t.dataset.frequency,n=t.dataset.product;let s=t.value;if(s=="custom"){const i=b(this,z,ne).call(this,t);s=pt(r,parseFloat(i.value===""?i.placeholder:i.value))}else s=parseFloat(s);return{currency:r,frequency:o,product:n,amount:s}}disable(){m(this,C).classList.add("appeal-form--disabled"),m(this,C).querySelectorAll("input, button").forEach(t=>{t.disabled=!0})}enable(){m(this,C).classList.remove("appeal-form--disabled"),m(this,C).querySelectorAll("input, button").forEach(t=>{t.disabled=!1})}},T=new WeakMap,C=new WeakMap,M=new WeakMap,q=new WeakMap,Y=new WeakMap,L=new WeakMap,K=new WeakMap,W=new WeakSet,Se=function(t){let r=0;for(const o in m(this,T).products[t])for(const n in m(this,T).products[t][o]){const s=m(this,Y)[r++],i=s.querySelector(".appeal-form-amount__radio");if(n=="custom"){const l=s.querySelector(".appeal-form-amount__input");l.placeholder=String(ie(t,Object.keys(m(this,T).products[t][o])[3])),l.dataset.minimum=ie(t,m(this,T).products[t][o][n]),i.dataset.product="custom"}else s.querySelector(".appeal-form-amount__text").textContent=Ee(t,n),i.value=n,i.dataset.product=m(this,T).products[t][o][n]}this.events.fire(N.EVENTS.CURRENCY_CHANGE)},X=new WeakSet,Ce=function(t){m(this,L).innerHTML=adblock.strings[`appeal-form__error--${t.dataset.frequency}`],m(this,L).hidden=!1,m(this,K).disabled=!0,this.events.fire(N.EVENTS.MINIMUM_AMOUNT_ERROR_SHOW)},Z=new WeakSet,$e=function(){m(this,L).hidden=!0,m(this,K).disabled=!1,this.events.fire(N.EVENTS.MINIMUM_AMOUNT_ERROR_HIDE)},Q=new WeakSet,xe=function(t){return t.value&&parseFloat(t.value)<parseFloat(t.dataset.minimum)},V=new WeakSet,re=function(t){b(this,Q,xe).call(this,t)?b(this,X,Ce).call(this,t):b(this,Z,$e).call(this)},z=new WeakSet,ne=function(t){return t.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__input")},pe=new WeakSet,Le=function(t){return t.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__radio")},fe=new WeakSet,je=function(t){t.target.type=="number"&&(b(this,pe,Le).call(this,t.target).checked=!0,b(this,V,re).call(this,t.target))},me=new WeakSet,Be=function(t){t.target.type=="number"?b(this,V,re).call(this,t.target):t.target.type=="radio"&&(t.target.value=="custom"?b(this,V,re).call(this,b(this,z,ne).call(this,t.target)):b(this,Z,$e).call(this)),this.events.fire(N.EVENTS.AMOUNT_CHANGE)},de=new WeakSet,De=function(t){t.preventDefault();const r=m(this,q).querySelector(".appeal-form-amount__radio:checked");if(r.value=="custom"){const o=b(this,z,ne).call(this,r);if(b(this,Q,xe).call(this,o))return b(this,X,Ce).call(this,o)}this.events.fire(N.EVENTS.SUBMIT,this.state())},be(N,"EVENTS",{CURRENCY_CHANGE:"CURRENCY_CHANGE",MINIMUM_AMOUNT_ERROR_SHOW:"SHOW_MINIMUM_AMOUNT_ERROR",MINIMUM_AMOUNT_ERROR_HIDE:"HIDE_MINIMUM_AMOUNT_ERROR",AMOUNT_CHANGE:"AMOUNT_CHANGE",SUBMIT:"SUBMIT"}),N);adblock.lib.AppealForm=qe;const ht=(e,t)=>e===t,yt=Symbol("solid-track"),le={equals:ht};let gt=Je;const D=1,ae=2,He={owned:null,cleanups:null,context:null,owner:null};var v=null;let ke=null,_=null,$=null,j=null,he=0;function oe(e,t){const r=_,o=v,n=e.length===0,s=t===void 0?o:t,i=n?He:{owned:null,cleanups:null,context:s?s.context:null,owner:s},l=n?e:()=>e(()=>J(()=>ge(i)));v=i,_=null;try{return ee(l,!0)}finally{_=r,v=o}}function R(e,t){t=t?Object.assign({},le,t):le;const r={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},o=n=>(typeof n=="function"&&(n=n(r.value)),Ke(r,n));return[Ge.bind(r),o]}function B(e,t,r){const o=Ve(e,t,!1,D);ye(o)}function _t(e,t,r){r=r?Object.assign({},le,r):le;const o=Ve(e,t,!0,0);return o.observers=null,o.observerSlots=null,o.comparator=r.equals||void 0,ye(o),Ge.bind(o)}function J(e){if(_===null)return e();const t=_;_=null;try{return e()}finally{_=t}}function bt(e){return v===null||(v.cleanups===null?v.cleanups=[e]:v.cleanups.push(e)),e}function Ge(){if(this.sources&&this.state)if(this.state===D)ye(this);else{const e=$;$=null,ee(()=>ce(this),!1),$=e}if(_){const e=this.observers?this.observers.length:0;_.sources?(_.sources.push(this),_.sourceSlots.push(e)):(_.sources=[this],_.sourceSlots=[e]),this.observers?(this.observers.push(_),this.observerSlots.push(_.sources.length-1)):(this.observers=[_],this.observerSlots=[_.sources.length-1])}return this.value}function Ke(e,t,r){let o=e.value;return(!e.comparator||!e.comparator(o,t))&&(e.value=t,e.observers&&e.observers.length&&ee(()=>{for(let n=0;n<e.observers.length;n+=1){const s=e.observers[n],i=ke&&ke.running;i&&ke.disposed.has(s),(i?!s.tState:!s.state)&&(s.pure?$.push(s):j.push(s),s.observers&&Ye(s)),i||(s.state=D)}if($.length>1e6)throw $=[],new Error},!1)),t}function ye(e){if(!e.fn)return;ge(e);const t=v,r=_,o=he;_=v=e,vt(e,e.value,o),_=r,v=t}function vt(e,t,r){let o;try{o=e.fn(t)}catch(n){return e.pure&&(e.state=D,e.owned&&e.owned.forEach(ge),e.owned=null),e.updatedAt=r+1,We(n)}(!e.updatedAt||e.updatedAt<=r)&&(e.updatedAt!=null&&"observers"in e?Ke(e,o):e.value=o,e.updatedAt=r)}function Ve(e,t,r,o=D,n){const s={fn:e,state:o,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:v,context:v?v.context:null,pure:r};return v===null||v!==He&&(v.owned?v.owned.push(s):v.owned=[s]),s}function ze(e){if(e.state===0)return;if(e.state===ae)return ce(e);if(e.suspense&&J(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<he);)e.state&&t.push(e);for(let r=t.length-1;r>=0;r--)if(e=t[r],e.state===D)ye(e);else if(e.state===ae){const o=$;$=null,ee(()=>ce(e,t[0]),!1),$=o}}function ee(e,t){if($)return e();let r=!1;t||($=[]),j?r=!0:j=[],he++;try{const o=e();return kt(r),o}catch(o){r||(j=null),$=null,We(o)}}function kt(e){if($&&(Je($),$=null),e)return;const t=j;j=null,t.length&&ee(()=>gt(t),!1)}function Je(e){for(let t=0;t<e.length;t++)ze(e[t])}function ce(e,t){e.state=0;for(let r=0;r<e.sources.length;r+=1){const o=e.sources[r];if(o.sources){const n=o.state;n===D?o!==t&&(!o.updatedAt||o.updatedAt<he)&&ze(o):n===ae&&ce(o,t)}}}function Ye(e){for(let t=0;t<e.observers.length;t+=1){const r=e.observers[t];r.state||(r.state=ae,r.pure?$.push(r):j.push(r),r.observers&&Ye(r))}}function ge(e){let t;if(e.sources)for(;e.sources.length;){const r=e.sources.pop(),o=e.sourceSlots.pop(),n=r.observers;if(n&&n.length){const s=n.pop(),i=r.observerSlots.pop();o<n.length&&(s.sourceSlots[i]=o,n[o]=s,r.observerSlots[o]=i)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)ge(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function wt(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function We(e,t=v){throw wt(e)}const St=Symbol("fallback");function Pe(e){for(let t=0;t<e.length;t++)e[t]()}function Ct(e,t,r={}){let o=[],n=[],s=[],i=0,l=t.length>1?[]:null;return bt(()=>Pe(s)),()=>{let u=e()||[],c,a;return u[yt],J(()=>{let p=u.length,S,x,f,k,d,h,g,A,P;if(p===0)i!==0&&(Pe(s),s=[],o=[],n=[],i=0,l&&(l=[])),r.fallback&&(o=[St],n[0]=oe(Te=>(s[0]=Te,r.fallback())),i=1);else if(i===0){for(n=new Array(p),a=0;a<p;a++)o[a]=u[a],n[a]=oe(y);i=p}else{for(f=new Array(p),k=new Array(p),l&&(d=new Array(p)),h=0,g=Math.min(i,p);h<g&&o[h]===u[h];h++);for(g=i-1,A=p-1;g>=h&&A>=h&&o[g]===u[A];g--,A--)f[A]=n[g],k[A]=s[g],l&&(d[A]=l[g]);for(S=new Map,x=new Array(A+1),a=A;a>=h;a--)P=u[a],c=S.get(P),x[a]=c===void 0?-1:c,S.set(P,a);for(c=h;c<=g;c++)P=o[c],a=S.get(P),a!==void 0&&a!==-1?(f[a]=n[c],k[a]=s[c],l&&(d[a]=l[c]),a=x[a],S.set(P,a)):s[c]();for(a=h;a<p;a++)a in f?(n[a]=f[a],s[a]=k[a],l&&(l[a]=d[a],l[a](a))):n[a]=oe(y);n=n.slice(0,i=p),o=u.slice(0)}return n});function y(p){if(s[a]=p,l){const[S,x]=R(a);return l[a]=x,t(u[a],S)}return t(u[a])}}}function F(e,t){return J(()=>e(t||{}))}function Xe(e){const t="fallback"in e&&{fallback:()=>e.fallback};return _t(Ct(()=>e.each,e.children,t||void 0))}const _e=Qe();adblock.config.paddle=_e;const Ze=_e==G.Paddle.sandbox;Ze&&Paddle.Environment.set("sandbox");Paddle.Setup({vendor:_e.vendor});const $t=document.querySelector(".appeal-form"),xt=G.AppealForm,se=adblock.runtime.appealForm=new qe({paddleConfig:_e,formConfig:xt,placeholder:$t});eyeo=eyeo||{};eyeo.payment=eyeo.payment||{};se.events.on(qe.EVENTS.SUBMIT,e=>{se.disable();const t=et(e),r=tt(e);eyeo.payment.shouldStoreContributionInfo&&localStorage.setItem("contributionInfo",t),eyeo.payment.shouldStoreContributionInfo&&eyeo.payment.productId=="ME"&&r.append("from__contributionInfo",t);const o=rt(e,r),n=e.product,s=nt(r,()=>se.enable());ot(n,o,s)});function Qe(){let t=[/^localhost$/,/^[\w\-]+.staging-new-adblockplus-org-1.uplink.eyeo.it$/,/^dev--adblockplus-org--[\w\-]+.web.app$/].some(r=>r.test(location.hostname))?G.Paddle.sandbox:G.Paddle.live;return adblock.searchParameters.has("testmode")||adblock.searchParameters.get("mode")=="test"?t=G.Paddle.sandbox:adblock.searchParameters.get("mode")=="live"&&(t=G.Paddle.live),t}function et(e){return JSON.stringify({amount:e.amount,frequency:e.frequency,processor:"paddle",currency:e.currency,lang:document.documentElement.lang,source:eyeo.payment.sourceId||"U",clickTs:Date.now()})}function tt(e){const t=new URLSearchParams;return eyeo.payment.productId=="ME"&&(t.append("thankyou",1),t.append("var",1),t.append("u",forceGetUserId()),t.append("from",eyeo.payment.variantName||"null"),t.append("from__currency",e.currency),t.append("from__amount",ie(e.currency,e.amount)),t.append("from__frequency",e.frequency)),t}function rt(e,t){return{testmode:Ze,userid:eyeo.payment.productId=="ME"?forceGetUserId():"",tracking:recordTracking(),locale:"",country:"unknown",ga_id:"",premium:eyeo.payment.productId=="ME"?"true":"false",premium_cid:"0",premium_sid:"0",currency:e.currency,recurring:e.frequency!="once",subType:e.frequency!="once"?e.frequency:"",experiment:"",experiment_id:"",variant:"",variant_index:-1,amount_cents:parseInt(e.amount,10),success_url:`${eyeo.payment.paymentCompleteUrl||"/payment-complete"}?${t.toString()}`,cancel_url:location.href}}function nt(e,t){return{locale:adblock.settings.language,title:adblock.strings["appeal-form-checkout__title"],success:`${eyeo.payment.paymentCompleteUrl||"/payment-complete"}?${e.toString()}`,closeCallback:t}}function ot(e,t,r,o){e=="custom"?fetch("https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(n=>n.json()).then(n=>{if(n.hasOwnProperty("success")&&n.success==!1)throw new Error;Paddle.Checkout.open(Object.assign(r,{override:n.url}))}).catch(n=>{console.error(n),adblock.error(adblock.strings["error--unexpected"]),o&&o(n),se.enable()}):Paddle.Checkout.open(Object.assign(r,{allowQuantity:!1,passthrough:t,product:e}))}function At(e,t,r){let o=r.length,n=t.length,s=o,i=0,l=0,u=t[n-1].nextSibling,c=null;for(;i<n||l<s;){if(t[i]===r[l]){i++,l++;continue}for(;t[n-1]===r[s-1];)n--,s--;if(n===i){const a=s<o?l?r[l-1].nextSibling:r[s-l]:u;for(;l<s;)e.insertBefore(r[l++],a)}else if(s===l)for(;i<n;)(!c||!c.has(t[i]))&&t[i].remove(),i++;else if(t[i]===r[s-1]&&r[l]===t[n-1]){const a=t[--n].nextSibling;e.insertBefore(r[l++],t[i++].nextSibling),e.insertBefore(r[--s],a),t[n]=r[s]}else{if(!c){c=new Map;let y=l;for(;y<s;)c.set(r[y],y++)}const a=c.get(t[i]);if(a!=null)if(l<a&&a<s){let y=i,p=1,S;for(;++y<n&&y<s&&!((S=c.get(t[y]))==null||S!==a+p);)p++;if(p>a-l){const x=t[i];for(;l<a;)e.insertBefore(r[l++],x)}else e.replaceChild(r[l++],t[i++])}else i++;else t[i++].remove()}}}const Ie="_$DX_DELEGATE";function O(e,t,r){let o;const n=()=>{const i=document.createElement("template");return i.innerHTML=e,r?i.content.firstChild.firstChild:i.content.firstChild},s=t?()=>J(()=>document.importNode(o||(o=n()),!0)):()=>(o||(o=n())).cloneNode(!0);return s.cloneNode=s,s}function Ne(e,t=window.document){const r=t[Ie]||(t[Ie]=new Set);for(let o=0,n=e.length;o<n;o++){const s=e[o];r.has(s)||(r.add(s),t.addEventListener(s,qt))}}function I(e,t,r){r==null?e.removeAttribute(t):e.setAttribute(t,r)}function st(e,t,r,o){if(o)Array.isArray(r)?(e[`$$${t}`]=r[0],e[`$$${t}Data`]=r[1]):e[`$$${t}`]=r;else if(Array.isArray(r)){const n=r[0];e.addEventListener(t,r[0]=s=>n.call(e,r[1],s))}else e.addEventListener(t,r)}function Et(e,t,r){if(!t)return r?I(e,"style"):t;const o=e.style;if(typeof t=="string")return o.cssText=t;typeof r=="string"&&(o.cssText=r=void 0),r||(r={}),t||(t={});let n,s;for(s in r)t[s]==null&&o.removeProperty(s),delete r[s];for(s in t)n=t[s],n!==r[s]&&(o.setProperty(s,n),r[s]=n);return r}function Me(e,t,r){return J(()=>e(t,r))}function E(e,t,r,o){if(r!==void 0&&!o&&(o=[]),typeof t!="function")return ue(e,t,o,r);B(n=>ue(e,t(),n,r),o)}function qt(e){const t=`$$${e.type}`;let r=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==r&&Object.defineProperty(e,"target",{configurable:!0,value:r}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return r||document}});r;){const o=r[t];if(o&&!r.disabled){const n=r[`${t}Data`];if(n!==void 0?o.call(r,n,e):o.call(r,e),e.cancelBubble)return}r=r._$host||r.parentNode||r.host}}function ue(e,t,r,o,n){for(;typeof r=="function";)r=r();if(t===r)return r;const s=typeof t,i=o!==void 0;if(e=i&&r[0]&&r[0].parentNode||e,s==="string"||s==="number")if(s==="number"&&(t=t.toString()),i){let l=r[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),r=H(e,r,o,l)}else r!==""&&typeof r=="string"?r=e.firstChild.data=t:r=e.textContent=t;else if(t==null||s==="boolean")r=H(e,r,o);else{if(s==="function")return B(()=>{let l=t();for(;typeof l=="function";)l=l();r=ue(e,l,r,o)}),()=>r;if(Array.isArray(t)){const l=[],u=r&&Array.isArray(r);if(Ae(l,t,r,n))return B(()=>r=ue(e,l,r,o,!0)),()=>r;if(l.length===0){if(r=H(e,r,o),i)return r}else u?r.length===0?Oe(e,l,o):At(e,r,l):(r&&H(e),Oe(e,l));r=l}else if(t.nodeType){if(Array.isArray(r)){if(i)return r=H(e,r,o,t);H(e,r,null,t)}else r==null||r===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);r=t}else console.warn("Unrecognized value. Skipped inserting",t)}return r}function Ae(e,t,r,o){let n=!1;for(let s=0,i=t.length;s<i;s++){let l=t[s],u=r&&r[s],c;if(!(l==null||l===!0||l===!1))if((c=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))n=Ae(e,l,u)||n;else if(c==="function")if(o){for(;typeof l=="function";)l=l();n=Ae(e,Array.isArray(l)?l:[l],Array.isArray(u)?u:[u])||n}else e.push(l),n=!0;else{const a=String(l);u&&u.nodeType===3&&u.data===a?e.push(u):e.push(document.createTextNode(a))}}return n}function Oe(e,t,r=null){for(let o=0,n=t.length;o<n;o++)e.insertBefore(t[o],r)}function H(e,t,r,o){if(r===void 0)return e.textContent="";const n=o||document.createTextNode("");if(t.length){let s=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(n!==l){const u=l.parentNode===e;!s&&!i?u?e.replaceChild(n,l):e.insertBefore(n,r):u&&l.remove()}else s=!0}}else e.insertBefore(n,r);return[n]}function Nt(e){return Object.keys(e).reduce((r,o)=>{const n=e[o];return r[o]=Object.assign({},n),lt(n.value)&&!Ot(n.value)&&!Array.isArray(n.value)&&(r[o].value=Object.assign({},n.value)),Array.isArray(n.value)&&(r[o].value=n.value.slice(0)),r},{})}function Tt(e){return e?Object.keys(e).reduce((r,o)=>{const n=e[o];return r[o]=lt(n)&&"value"in n?n:{value:n},r[o].attribute||(r[o].attribute=Mt(o)),r[o].parse="parse"in r[o]?r[o].parse:typeof r[o].value!="string",r},{}):{}}function Pt(e){return Object.keys(e).reduce((r,o)=>(r[o]=e[o].value,r),{})}function It(e,t){const r=Nt(t);return Object.keys(t).forEach(n=>{const s=r[n],i=e.getAttribute(s.attribute),l=e[n];i&&(s.value=s.parse?it(i):i),l!=null&&(s.value=Array.isArray(l)?l.slice(0):l),s.reflect&&Ue(e,s.attribute,s.value),Object.defineProperty(e,n,{get(){return s.value},set(u){const c=s.value;s.value=u,s.reflect&&Ue(this,s.attribute,s.value);for(let a=0,y=this.__propertyChangedCallbacks.length;a<y;a++)this.__propertyChangedCallbacks[a](n,u,c)},enumerable:!0,configurable:!0})}),r}function it(e){if(e)try{return JSON.parse(e)}catch{return e}}function Ue(e,t,r){if(r==null||r===!1)return e.removeAttribute(t);let o=JSON.stringify(r);e.__updating[t]=!0,o==="true"&&(o=""),e.setAttribute(t,o),Promise.resolve().then(()=>delete e.__updating[t])}function Mt(e){return e.replace(/\.?([A-Z]+)/g,(t,r)=>"-"+r.toLowerCase()).replace("_","-").replace(/^-/,"")}function lt(e){return e!=null&&(typeof e=="object"||typeof e=="function")}function Ot(e){return Object.prototype.toString.call(e)==="[object Function]"}function Ut(e){return typeof e=="function"&&e.toString().indexOf("class")===0}let we;function Rt(e,t){const r=Object.keys(t);return class extends e{static get observedAttributes(){return r.map(n=>t[n].attribute)}constructor(){super(),this.__initialized=!1,this.__released=!1,this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props={}}connectedCallback(){if(this.__initialized)return;this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props=It(this,t);const n=Pt(this.props),s=this.Component,i=we;try{we=this,this.__initialized=!0,Ut(s)?new s(n,{element:this}):s(n,{element:this})}finally{we=i}}async disconnectedCallback(){if(await Promise.resolve(),this.isConnected)return;this.__propertyChangedCallbacks.length=0;let n=null;for(;n=this.__releaseCallbacks.pop();)n(this);delete this.__initialized,this.__released=!0}attributeChangedCallback(n,s,i){if(this.__initialized&&!this.__updating[n]&&(n=this.lookupProp(n),n in t)){if(i==null&&!this[n])return;this[n]=t[n].parse?it(i):i}}lookupProp(n){if(t)return r.find(s=>n===s||n===t[s].attribute)}get renderRoot(){return this.shadowRoot||this.attachShadow({mode:"open"})}addReleaseCallback(n){this.__releaseCallbacks.push(n)}addPropertyChangedCallback(n){this.__propertyChangedCallbacks.push(n)}}}function Ft(e,t={},r={}){const{BaseElement:o=HTMLElement,extension:n}=r;return s=>{if(!e)throw new Error("tag is required to register a Component");let i=customElements.get(e);return i?(i.prototype.Component=s,i):(i=Rt(o,Tt(t)),i.prototype.Component=s,i.prototype.registeredTag=e,customElements.define(e,i,n),i)}}function Lt(e){const t=Object.keys(e),r={};for(let o=0;o<t.length;o++){const[n,s]=R(e[t[o]]);Object.defineProperty(r,t[o],{get:n,set(i){s(()=>i)}})}return r}function jt(e){if(e.assignedSlot&&e.assignedSlot._$owner)return e.assignedSlot._$owner;let t=e.parentNode;for(;t&&!t._$owner&&!(t.assignedSlot&&t.assignedSlot._$owner);)t=t.parentNode;return t&&t.assignedSlot?t.assignedSlot._$owner:e._$owner}function Bt(e){return(t,r)=>{const{element:o}=r;return oe(n=>{const s=Lt(t);o.addPropertyChangedCallback((l,u)=>s[l]=u),o.addReleaseCallback(()=>{o.renderRoot.textContent="",n()});const i=e(s,r);return E(o.renderRoot,i)},jt(o))}}function Dt(e,t,r){return arguments.length===2&&(r=t,t={}),Ft(e,t)(Bt(r))}const Ht=O('<fieldset class="appeal-form-frequency"><legend class="appeal-form-frequency__heading"></legend><div class="appeal-form-frequency__options"><div class="appeal-form-amounts"><label class="appeal-form-amount appeal-form-amount--custom"><input type="radio" name="appeal-form-amount__radio" class="appeal-form-amount__radio" value="custom" data-product="custom"><input type="number" step=".01" class="appeal-form-amount__input" name="appeal-form-amount__input" data-product="custom" placeholder="35" data-minimum="5">'),Gt=O('<label class="appeal-form-amount appeal-form-amount--fixed"><input type="radio" name="appeal-form-amount__radio" class="appeal-form-amount__radio"><span class="appeal-form-amount__text">');function Re(e){let t,r;return(()=>{const o=Ht(),n=o.firstChild,s=n.nextSibling,i=s.firstChild,l=i.firstChild,u=l.firstChild,c=u.nextSibling;st(o,"click",e.onClick,!0),n.$$click=p=>p.stopPropagation(),E(i,F(Xe,{get each(){return Object.keys(e.products)},children:(p,S)=>{if(p!=="custom")return(()=>{const x=Gt(),f=x.firstChild,k=f.nextSibling;return f.value=p,E(k,()=>Ee(e.currency,p)),B(d=>{const h=`appeal-form-amount__radio--${e.frequency}-${S()}`,g=e.frequency,A=e.products[p];return h!==d._v$7&&I(f,"data-testid",d._v$7=h),g!==d._v$8&&I(f,"data-frequency",d._v$8=g),A!==d._v$9&&I(f,"data-product",d._v$9=A),d},{_v$7:void 0,_v$8:void 0,_v$9:void 0}),B(()=>f.checked=p===e.defaultProduct),x})()}}),l),u.$$click=()=>r.focus();const a=t;typeof a=="function"?Me(a,u):t=u,c.addEventListener("focus",()=>t.click());const y=r;return typeof y=="function"?Me(y,c):r=c,E(o,()=>e.children,null),B(p=>{const S=`border-color: ${e.active?"#2196f3":"#e0e0e0"}`,x=e.legendText,f=`appeal-form-amount__radio--${e.frequency}-6`,k=e.frequency,d=`appeal-form-amount__input--${e.frequency}`,h=e.frequency;return p._v$=Et(o,S,p._v$),x!==p._v$2&&(n.innerHTML=p._v$2=x),f!==p._v$3&&I(u,"data-testid",p._v$3=f),k!==p._v$4&&I(u,"data-frequency",p._v$4=k),d!==p._v$5&&I(c,"data-testid",p._v$5=d),h!==p._v$6&&I(c,"data-frequency",p._v$6=h),p},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0}),o})()}Ne(["click"]);const Kt=O('<div class="toggle-wrap"><div class="toggle-main-txt">Monthly</div><label class="switch"><input class="toggle-input" type="checkbox" value="frequency"><span class="slider round"></span></label><div class="toggle-main-txt">Yearly');function Vt(e){return(()=>{const t=Kt(),r=t.firstChild,o=r.nextSibling,n=o.firstChild;return t.$$click=s=>s.stopPropagation(),st(n,"click",e.onClick,!0),t})()}Ne(["click"]);const zt=O('<div id="what-is-included" class="info premium-upsell"><span class="info-line premium-upsell__border-start"></span><p id="one-year" class="premium-upsell__year">Nice! A <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium for one year. Thanks for your support.</p><p id="x-years" class="premium-upsell__years" hidden>Nice! A <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium for <span class="premium-upsell__duration"></span> years. Thanks for your support.</p><p id="x-months" class="premium-upsell__months" hidden>Nice! A <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium for <span class="premium-upsell__duration"></span> months. Thanks for your support.</p><p id="monthly" class="premium-upsell__monthly" hidden>Nice! A monthly <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium. Thanks for your support.</p><p id="yearly" class="premium-upsell__yearly" hidden>Nice! A yearly <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium. Thanks for your support.');function Jt(e){return(()=>{const t=zt(),r=t.firstChild,o=r.nextSibling,n=o.firstChild,s=n.nextSibling,i=s.nextSibling;return E(i,()=>e.amount),t})()}const Yt=`.appeal-form{margin-top:1rem;margin-bottom:1rem}.appeal-form__placeholder{position:relative;display:inline-block;overflow:hidden;height:1em;border-radius:3px;background-color:#e6e6e6}.appeal-form__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;content:"";transform:translate(-100%);animation:shimmer 3s infinite;background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0))}@-webkit-keyframes shimmer{to{transform:translate(100%)}}@keyframes shimmer{to{transform:translate(100%)}}.appeal-form-header{margin-bottom:2.5rem}.appeal-form-header__heading{font-size:1.125rem;display:inline-block;margin:0;margin-right:.5rem}.appeal-form-header__select{font-size:.875rem}.appeal-form-frequencies{display:flex;flex-wrap:wrap;gap:3rem;max-width:53.125rem;margin-top:.5rem;margin-bottom:1.5rem}@media (min-width: 55.125rem){.appeal-form-frequencies{gap:2rem}}.appeal-form-frequency{position:relative;flex:0 0 90%;border-radius:.25rem;border-width:1px;border-color:#e6e6e6;padding-top:1rem}@media (min-width: 55.125rem){.appeal-form-frequency{flex:1}}.appeal-form-frequency__heading{position:absolute;top:-2rem;font-size:1rem;font-weight:400;margin-top:0;margin-bottom:.375rem}.appeal-form-frequency__options{padding:0 0 .5rem}.appeal-form-amounts{display:flex;flex-wrap:wrap;align-items:center;padding:0 1rem}[dir=rtl] .appeal-form-amounts{padding-left:1rem}.appeal-form-amount{line-height:1.7;display:flex;width:33.33333333%}[dir=rtl] .appeal-form-amount__radio{margin-right:0}.appeal-form-amount__text{padding-top:1.5px}.appeal-form-amount__input{font-size:.875rem;width:100%;height:1.2rem;margin-top:.1875rem;padding:.125rem .25rem;border:1px solid gray}[dir=rtl] .appeal-form-amount__input{margin-left:.1875rem}@media (min-width: 55.125rem){.appeal-form-checkout{display:flex}}.appeal-form-checkout__submit{font-size:.9375rem;font-weight:700;display:flex;align-items:center;justify-content:center;width:100%;height:2rem;margin-bottom:1rem;margin-right:1rem;text-align:center;color:#fff;border:0;border-radius:3.5px;background-color:#0047ff;box-shadow:0 0 1px #0003;cursor:pointer}.appeal-form-checkout__submit:disabled{filter:grayscale(100)}@media (min-width: 23.75rem){.appeal-form-checkout__submit{max-width:14rem}:not([dir=rtl]) .appeal-form-checkout__submit{margin-right:1rem}[dir=rtl] .appeal-form-checkout__submit{margin-left:1rem}}@media (min-width: 55.125rem){.appeal-form-checkout__submit{margin-bottom:0}}.appeal-form-checkout__icon{height:1rem}[dir=rtl] .appeal-form-checkout__icon{margin-left:.25rem}.appeal-form-checkout__image{width:100%;max-width:340px;max-height:32px}.toggle-wrap{position:absolute;top:-38px;right:-1rem;padding:0 2px;background-color:#fff;display:flex;align-items:center;font-family:Source Sans Pro;font-style:normal;font-weight:300;font-size:11px;line-height:34px;height:34px;color:#000}@media (min-width: 55.125rem){.toggle-wrap{right:.5rem}}.switch{position:relative;display:inline-block;width:44px;height:22px;margin:0 10px}.switch input{opacity:0;width:0;height:0}.slider.round{border-radius:34px}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#2196f3;-webkit-transition:.4s;transition:.4s}.slider.round:before{border-radius:50%}.slider:before{position:absolute;content:"";width:18px;height:18px;left:2px;bottom:2px;background-color:#fff;-webkit-transition:.4s;transition:.4s}input:checked+.slider:before{-webkit-transform:translateX(22px);-ms-transform:translateX(22px);transform:translate(22px)}.premium-upsell{display:flex;border:1px solid #666666;border-radius:10px;margin:1rem 0;padding:.5rem}.premium-upsell__border-start{display:flex;width:.5rem;background-color:#2284f7;border-radius:4px;align-items:stretch}.premium-upsell>p{margin:.5rem 0;margin-inline-start:1rem}
`,Wt=O('<header class="appeal-form-header"><h2 class="appeal-form-header__heading" data-testid="appeal-form-header__heading">Name a fair amount:</h2><select class="appeal-form-header__select" data-testid="appeal-form-header__select">'),Xt=O('<form class="appeal-form"><div class="appeal-form-frequencies"></div><div class="appeal-form-checkout"><input class="appeal-form-checkout__submit" data-testid="appeal-form-checkout__submit" type="submit" value="Checkout Now"><img alt="" src="/components/AppealForm/appeal-form-checkout__image.svg" class="appeal-form-checkout__image">'),Zt=O("<style>"),Qt=O("<option>"),te=Qe(),Fe=3500;function er(e){const[t,r]=R("monthly"),[o,n]=R(Fe),[s,i]=R("once"),[l,u]=R(!1),[c,a]=R(e.currency),y=f=>{r(f.target.checked?"yearly":"monthly")},p=f=>{if(f.preventDefault(),!o()){adblock.error("No amount selected.");return}u(!0);const k=s()==="once"?"once":t(),d={product:te.products[c()][k][o()],frequency:k,currency:c(),amount:o()},h=et(d),g=tt(d);eyeo.payment.shouldStoreContributionInfo&&localStorage.setItem("contributionInfo",h),eyeo.payment.shouldStoreContributionInfo&&eyeo.payment.productId=="ME"&&g.append("from__contributionInfo",h);const A=rt(d,g),P=nt(g,()=>{u(!1)});ot(d.product,A,P,Te=>{u(!1)})},S=f=>{f.target.value==="custom"||f.target.type==="checkbox"||(f.target.type==="number"?f.target.value?n(f.target.value*100):n(0):n(f.target.value))},x=f=>{a(f.target.value)};return[(()=>{const f=Wt(),k=f.firstChild,d=k.nextSibling;return d.addEventListener("change",x),E(d,F(Xe,{get each(){return Object.keys(te.products)},children:h=>(()=>{const g=Qt();return g.value=h,E(g,h),g})()})),f})(),(()=>{const f=Xt(),k=f.firstChild,d=k.nextSibling,h=d.firstChild;return f.$$input=S,f.addEventListener("change",S),f.addEventListener("submit",p),E(k,F(Re,{frequency:"once",get products(){return te.products[c()].once},legendText:"Make a <strong>one-off</strong> contribution",get currency(){return c()},get defaultProduct(){return Fe.toString()},get active(){return s()==="once"},onClick:()=>i("once")}),null),E(k,F(Re,{get frequency(){return t()},get products(){return te.products[c()][t()]},legendText:"Make a <strong>Recurring</strong> contribution",get currency(){return c()},borderColor:"#2196f3",get active(){return s()==="recurring"},onClick:()=>i("recurring"),get children(){return F(Vt,{onClick:y})}}),null),E(f,F(Jt,{get amount(){return Ee(c(),o())}}),d),B(()=>h.disabled=l()),f})(),(()=>{const f=Zt();return E(f,Yt),f})()]}Dt("appeal-form",{currency:"USD"},e=>F(er,{get currency(){return e.currency}}));Ne(["input"]);
//# sourceMappingURL=main.js.map

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
