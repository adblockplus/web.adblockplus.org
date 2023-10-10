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

var yt=Object.defineProperty;var gt=(e,t,n)=>t in e?yt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var $e=(e,t,n)=>(gt(e,typeof t!="symbol"?t+"":t,n),n),ve=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)};var d=(e,t,n)=>(ve(e,t,"read from private field"),n?n.call(e):t.get(e)),v=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},H=(e,t,n,o)=>(ve(e,t,"write to private field"),o?o.call(e,n):t.set(e,n),n);var w=(e,t,n)=>(ve(e,t,"access private method"),n);const J={AppealForm:{currency:typeof adblock=="object"&&adblock.settings.currency||"USD",selected:3},Paddle:{sandbox:{vendor:11004,products:{USD:{once:{1e3:46028,1500:46029,2e3:46030,3500:46031,5e3:46032,custom:500},monthly:{199:46074,299:46075,399:46076,499:46077,999:46078,custom:199},yearly:{1e3:46079,1500:46080,2e3:46081,3500:46082,5e3:46083,custom:500}},AUD:{once:{1e3:46033,1500:46034,2e3:46035,3500:46036,5e3:46037,custom:500},monthly:{199:46084,299:46085,399:46086,499:46087,999:46088,custom:199},yearly:{1e3:46089,1500:46090,2e3:46091,3500:46092,5e3:46093,custom:500}},CAD:{once:{1e3:46038,1500:46039,2e3:46040,3500:46041,5e3:46042,custom:500},monthly:{199:46094,299:46095,399:46096,499:46097,999:46098,custom:199},yearly:{1e3:46099,1500:46181,2e3:46182,3500:46183,5e3:46184,custom:500}},EUR:{once:{1e3:46048,1500:46049,2e3:46050,3500:46051,5e3:46052,custom:500},monthly:{199:46195,299:46196,399:46197,499:46198,999:46199,custom:199},yearly:{1e3:46200,1500:46201,2e3:46202,3500:46203,5e3:46204,custom:500}},GBP:{once:{1e3:46053,1500:46054,2e3:46055,3500:46056,5e3:46057,custom:500},monthly:{199:46205,299:46206,399:46207,499:46208,999:46209,custom:199},yearly:{1e3:46210,1500:46211,2e3:46212,3500:46213,5e3:46214,custom:500}},JPY:{once:{1500:46064,2e3:46065,2500:46066,3500:46067,5e3:46068,custom:500},monthly:{200:46225,300:46226,500:46227,1e3:46228,1500:46229,custom:200},yearly:{1500:46230,2e3:46231,2500:46232,3500:46233,5e3:46234,custom:500}},NZD:{once:{1e3:46058,1500:46059,2e3:46060,3500:46062,5e3:46063,custom:500},monthly:{199:46215,299:46216,399:46217,499:46218,999:46219,custom:199},yearly:{1e3:46220,1500:46221,2e3:46222,3500:46223,5e3:46224,custom:500}},CHF:{once:{1e3:46043,1500:46044,2e3:46045,3500:46046,5e3:46047,custom:500},monthly:{199:46185,299:46186,399:46187,499:46188,999:46189,custom:199},yearly:{1e3:46190,1500:46191,2e3:46192,3500:46193,5e3:46194,custom:500}},RUB:{once:{25e3:46069,5e4:46070,1e5:46071,25e4:46072,5e5:46073,custom:25e3},monthly:{15e3:46235,25e3:46236,4e4:46237,5e4:46238,1e5:46239,custom:15e3},yearly:{25e3:46240,5e4:46241,1e5:46242,25e4:46243,5e5:46244,custom:25e3}}}},live:{vendor:164164,products:{USD:{once:{1e3:816549,1500:816550,2e3:816551,3500:816552,5e3:816553,custom:500},monthly:{199:816774,299:816775,399:816776,499:816777,999:816778,custom:199},yearly:{1e3:816779,1500:816780,2e3:816781,3500:816782,5e3:816783,custom:500}},AUD:{once:{1e3:816522,1500:816523,2e3:816524,3500:816525,5e3:816526,custom:500},monthly:{199:816692,299:816693,399:816694,499:816696,999:816697,custom:199},yearly:{1e3:816699,1500:816700,2e3:816702,3500:816703,5e3:816705,custom:500}},CAD:{once:{1e3:816528,1500:816529,2e3:816530,3500:816531,5e3:816532,custom:500},monthly:{199:816706,299:816708,399:816710,499:816711,999:816712,custom:199},yearly:{1e3:816714,1500:816715,2e3:816716,3500:816717,5e3:816718,custom:500}},EUR:{once:{1e3:816517,1500:816518,2e3:816519,3500:816520,5e3:816521,custom:500},monthly:{199:816681,299:816682,399:816683,499:816684,999:816686,custom:199},yearly:{1e3:816687,1500:816688,2e3:816689,3500:816690,5e3:816691,custom:500}},GBP:{once:{1e3:816538,1500:816539,2e3:816540,3500:816541,5e3:816542,custom:500},monthly:{199:816734,299:816735,399:816736,499:816737,999:816738,custom:199},yearly:{1e3:816739,1500:816740,2e3:816741,3500:816743,5e3:816744,custom:500}},JPY:{once:{1500:816554,2e3:816555,2500:816556,3500:816557,5e3:816558,custom:500},monthly:{200:816784,300:816785,500:816786,1e3:816787,1500:816788,custom:200},yearly:{1500:816789,2e3:816791,2500:816792,3500:816794,5e3:816795,custom:500}},NZD:{once:{1e3:816543,1500:816544,2e3:816545,3500:816547,5e3:816548,custom:500},monthly:{199:816760,299:816762,399:816764,499:816766,999:816768,custom:199},yearly:{1e3:816769,1500:816770,2e3:816771,3500:816772,5e3:816773,custom:500}},CHF:{once:{1e3:816533,1500:816535,2e3:816534,3500:816536,5e3:816537,custom:500},monthly:{199:816720,299:816722,399:816723,499:816725,999:816726,custom:199},yearly:{1e3:816727,1500:816728,2e3:816730,3500:816731,5e3:816733,custom:500}},RUB:{once:{25e3:816559,5e4:816560,1e5:816561,25e4:816562,5e5:816563,custom:25e3},monthly:{15e3:816796,25e3:816797,4e4:816799,5e4:816800,1e5:816801,custom:15e3},yearly:{25e3:816802,5e4:816803,1e5:816804,25e4:816805,5e5:816806,custom:25e3}}}}}};class _t{constructor(){this.callbacks={}}on(t,n){this.callbacks[t]||(this.callbacks[t]=[]),this.callbacks[t].push(n)}fire(t,n){if(this.callbacks[t])for(const o of this.callbacks[t])try{o(n)}catch(r){console.error(r)}}}function ue(e,t){return e=="JPY"?t:t/100}function bt(e,t){return e=="JPY"?t:t*100}function Ie(e,t){return new Intl.NumberFormat(navigator.language,{style:"currency",currency:e,minimumFractionDigits:0}).format(ue(e,t))}const wt=document.getElementById("appeal-form"),St=document.getElementById("appeal-form-amount--fixed"),kt=document.getElementById("appeal-form-amount--custom");var O,R,A,B,I,Z,G,Y,Q,Ee,ee,qe,te,Ne,ne,Te,W,se,X,ie,he,He,ye,Ge,ge,ze,_e,Ke;let Oe=(O=class{constructor({placeholder:t,paddleConfig:n,formConfig:o}){v(this,Q);v(this,ee);v(this,te);v(this,ne);v(this,W);v(this,X);v(this,he);v(this,ye);v(this,ge);v(this,_e);$e(this,"events");v(this,R,void 0);v(this,A,void 0);v(this,B,void 0);v(this,I,void 0);v(this,Z,[]);v(this,G,void 0);v(this,Y,void 0);this.events=new _t,H(this,R,n),H(this,A,wt.content.cloneNode(!0).firstElementChild),d(this,A).querySelector(".appeal-form-header__heading").innerHTML=adblock.strings["appeal-form-header__heading"],d(this,A).querySelector(".appeal-form-checkout__submit").innerHTML=adblock.strings["appeal-form-checkout__submit"],H(this,G,d(this,A).querySelector(".appeal-form__error")),H(this,Y,d(this,A).querySelector(".appeal-form-checkout__submit")),H(this,B,d(this,A).querySelector(".appeal-form-header__select"));for(const r in n.products){const s=document.createElement("option");s.textContent=r.toUpperCase(),s.value=r.toUpperCase(),d(this,B).appendChild(s)}d(this,B).value=o.currency,H(this,I,d(this,A).querySelector(".appeal-form-frequencies"));for(const r in n.products[o.currency]){let s=1;const i=d(this,I).querySelector(`.appeal-form-frequency--${r}`);i.querySelector(".appeal-form-frequency__heading").innerHTML=adblock.strings[`appeal-form-frequency__heading--${r}`];const l=i.querySelector(".appeal-form-amounts");for(const u in n.products[o.currency][r]){let c,a,y;u=="custom"?(c=kt.content.cloneNode(!0).firstElementChild,y=c.querySelector(".appeal-form-amount__input"),y.dataset.testid=`appeal-form-amount__input--${r}`,y.dataset.frequency=r):c=St.content.cloneNode(!0).firstElementChild,a=c.querySelector(".appeal-form-amount__radio"),a.dataset.testid=`appeal-form-amount__radio--${r}-${s++}`,a.dataset.frequency=r,d(this,Z).push(c),l.appendChild(c)}}w(this,Q,Ee).call(this,o.currency),d(this,I).querySelectorAll(".appeal-form-amount__radio")[o.selected].checked=!0,d(this,B).addEventListener("change",r=>w(this,Q,Ee).call(this,r.currentTarget.value)),d(this,I).addEventListener("focusin",r=>w(this,ye,Ge).call(this,r)),d(this,I).addEventListener("input",r=>w(this,ge,ze).call(this,r)),d(this,A).addEventListener("submit",r=>w(this,_e,Ke).call(this,r)),t.replaceWith(d(this,A)),d(this,A).dataset.testid="appeal-form-constructed"}state(){const t=d(this,I).querySelector(".appeal-form-amount__radio:checked"),n=d(this,B).value,o=t.dataset.frequency,r=t.dataset.product;let s=t.value;if(s=="custom"){const i=w(this,X,ie).call(this,t);s=bt(n,parseFloat(i.value===""?i.placeholder:i.value))}else s=parseFloat(s);return{currency:n,frequency:o,product:r,amount:s}}disable(){d(this,A).classList.add("appeal-form--disabled"),d(this,A).querySelectorAll("input, button").forEach(t=>{t.disabled=!0})}enable(){d(this,A).classList.remove("appeal-form--disabled"),d(this,A).querySelectorAll("input, button").forEach(t=>{t.disabled=!1})}},R=new WeakMap,A=new WeakMap,B=new WeakMap,I=new WeakMap,Z=new WeakMap,G=new WeakMap,Y=new WeakMap,Q=new WeakSet,Ee=function(t){let n=0;for(const o in d(this,R).products[t])for(const r in d(this,R).products[t][o]){const s=d(this,Z)[n++],i=s.querySelector(".appeal-form-amount__radio");if(r=="custom"){const l=s.querySelector(".appeal-form-amount__input");l.placeholder=String(ue(t,Object.keys(d(this,R).products[t][o])[3])),l.dataset.minimum=ue(t,d(this,R).products[t][o][r]),i.dataset.product="custom"}else s.querySelector(".appeal-form-amount__text").textContent=Ie(t,r),i.value=r,i.dataset.product=d(this,R).products[t][o][r]}this.events.fire(O.EVENTS.CURRENCY_CHANGE)},ee=new WeakSet,qe=function(t){d(this,G).innerHTML=adblock.strings[`appeal-form__error--${t.dataset.frequency}`],d(this,G).hidden=!1,d(this,Y).disabled=!0,this.events.fire(O.EVENTS.MINIMUM_AMOUNT_ERROR_SHOW)},te=new WeakSet,Ne=function(){d(this,G).hidden=!0,d(this,Y).disabled=!1,this.events.fire(O.EVENTS.MINIMUM_AMOUNT_ERROR_HIDE)},ne=new WeakSet,Te=function(t){return t.value&&parseFloat(t.value)<parseFloat(t.dataset.minimum)},W=new WeakSet,se=function(t){w(this,ne,Te).call(this,t)?w(this,ee,qe).call(this,t):w(this,te,Ne).call(this)},X=new WeakSet,ie=function(t){return t.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__input")},he=new WeakSet,He=function(t){return t.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__radio")},ye=new WeakSet,Ge=function(t){t.target.type=="number"&&(w(this,he,He).call(this,t.target).checked=!0,w(this,W,se).call(this,t.target))},ge=new WeakSet,ze=function(t){t.target.type=="number"?w(this,W,se).call(this,t.target):t.target.type=="radio"&&(t.target.value=="custom"?w(this,W,se).call(this,w(this,X,ie).call(this,t.target)):w(this,te,Ne).call(this)),this.events.fire(O.EVENTS.AMOUNT_CHANGE)},_e=new WeakSet,Ke=function(t){t.preventDefault();const n=d(this,I).querySelector(".appeal-form-amount__radio:checked");if(n.value=="custom"){const o=w(this,X,ie).call(this,n);if(w(this,ne,Te).call(this,o))return w(this,ee,qe).call(this,o)}this.events.fire(O.EVENTS.SUBMIT,this.state())},$e(O,"EVENTS",{CURRENCY_CHANGE:"CURRENCY_CHANGE",MINIMUM_AMOUNT_ERROR_SHOW:"SHOW_MINIMUM_AMOUNT_ERROR",MINIMUM_AMOUNT_ERROR_HIDE:"HIDE_MINIMUM_AMOUNT_ERROR",AMOUNT_CHANGE:"AMOUNT_CHANGE",SUBMIT:"SUBMIT"}),O);adblock.lib.AppealForm=Oe;const $t=(e,t)=>e===t,vt=Symbol("solid-track"),fe={equals:$t};let Ct=Ze;const K=1,pe=2,Ve={owned:null,cleanups:null,context:null,owner:null};var S=null;let Ce=null,b=null,E=null,z=null,be=0;function le(e,t){const n=b,o=S,r=e.length===0,s=t===void 0?o:t,i=r?Ve:{owned:null,cleanups:null,context:s?s.context:null,owner:s},l=r?e:()=>e(()=>U(()=>Se(i)));S=i,b=null;try{return re(l,!0)}finally{b=n,S=o}}function D(e,t){t=t?Object.assign({},fe,t):fe;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},o=r=>(typeof r=="function"&&(r=r(n.value)),Ye(n,r));return[Je.bind(n),o]}function F(e,t,n){const o=We(e,t,!1,K);we(o)}function T(e,t,n){n=n?Object.assign({},fe,n):fe;const o=We(e,t,!0,0);return o.observers=null,o.observerSlots=null,o.comparator=n.equals||void 0,we(o),Je.bind(o)}function U(e){if(b===null)return e();const t=b;b=null;try{return e()}finally{b=t}}function xt(e){return S===null||(S.cleanups===null?S.cleanups=[e]:S.cleanups.push(e)),e}function At(e){const t=T(e),n=T(()=>Pe(t()));return n.toArray=()=>{const o=n();return Array.isArray(o)?o:o!=null?[o]:[]},n}function Je(){if(this.sources&&this.state)if(this.state===K)we(this);else{const e=E;E=null,re(()=>de(this),!1),E=e}if(b){const e=this.observers?this.observers.length:0;b.sources?(b.sources.push(this),b.sourceSlots.push(e)):(b.sources=[this],b.sourceSlots=[e]),this.observers?(this.observers.push(b),this.observerSlots.push(b.sources.length-1)):(this.observers=[b],this.observerSlots=[b.sources.length-1])}return this.value}function Ye(e,t,n){let o=e.value;return(!e.comparator||!e.comparator(o,t))&&(e.value=t,e.observers&&e.observers.length&&re(()=>{for(let r=0;r<e.observers.length;r+=1){const s=e.observers[r],i=Ce&&Ce.running;i&&Ce.disposed.has(s),(i?!s.tState:!s.state)&&(s.pure?E.push(s):z.push(s),s.observers&&Qe(s)),i||(s.state=K)}if(E.length>1e6)throw E=[],new Error},!1)),t}function we(e){if(!e.fn)return;Se(e);const t=S,n=b,o=be;b=S=e,Et(e,e.value,o),b=n,S=t}function Et(e,t,n){let o;try{o=e.fn(t)}catch(r){return e.pure&&(e.state=K,e.owned&&e.owned.forEach(Se),e.owned=null),e.updatedAt=n+1,et(r)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Ye(e,o):e.value=o,e.updatedAt=n)}function We(e,t,n,o=K,r){const s={fn:e,state:o,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:S,context:S?S.context:null,pure:n};return S===null||S!==Ve&&(S.owned?S.owned.push(s):S.owned=[s]),s}function Xe(e){if(e.state===0)return;if(e.state===pe)return de(e);if(e.suspense&&U(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<be);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===K)we(e);else if(e.state===pe){const o=E;E=null,re(()=>de(e,t[0]),!1),E=o}}function re(e,t){if(E)return e();let n=!1;t||(E=[]),z?n=!0:z=[],be++;try{const o=e();return qt(n),o}catch(o){n||(z=null),E=null,et(o)}}function qt(e){if(E&&(Ze(E),E=null),e)return;const t=z;z=null,t.length&&re(()=>Ct(t),!1)}function Ze(e){for(let t=0;t<e.length;t++)Xe(e[t])}function de(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const o=e.sources[n];if(o.sources){const r=o.state;r===K?o!==t&&(!o.updatedAt||o.updatedAt<be)&&Xe(o):r===pe&&de(o,t)}}}function Qe(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=pe,n.pure?E.push(n):z.push(n),n.observers&&Qe(n))}}function Se(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),o=e.sourceSlots.pop(),r=n.observers;if(r&&r.length){const s=r.pop(),i=n.observerSlots.pop();o<r.length&&(s.sourceSlots[i]=o,r[o]=s,n.observerSlots[o]=i)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)Se(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Nt(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function et(e,t=S){throw Nt(e)}function Pe(e){if(typeof e=="function"&&!e.length)return Pe(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const o=Pe(e[n]);Array.isArray(o)?t.push.apply(t,o):t.push(o)}return t}return e}const Tt=Symbol("fallback");function Ue(e){for(let t=0;t<e.length;t++)e[t]()}function Pt(e,t,n={}){let o=[],r=[],s=[],i=0,l=t.length>1?[]:null;return xt(()=>Ue(s)),()=>{let u=e()||[],c,a;return u[vt],U(()=>{let f=u.length,g,x,k,M,$,p,h,m,_;if(f===0)i!==0&&(Ue(s),s=[],o=[],r=[],i=0,l&&(l=[])),n.fallback&&(o=[Tt],r[0]=le(N=>(s[0]=N,n.fallback())),i=1);else if(i===0){for(r=new Array(f),a=0;a<f;a++)o[a]=u[a],r[a]=le(y);i=f}else{for(k=new Array(f),M=new Array(f),l&&($=new Array(f)),p=0,h=Math.min(i,f);p<h&&o[p]===u[p];p++);for(h=i-1,m=f-1;h>=p&&m>=p&&o[h]===u[m];h--,m--)k[m]=r[h],M[m]=s[h],l&&($[m]=l[h]);for(g=new Map,x=new Array(m+1),a=m;a>=p;a--)_=u[a],c=g.get(_),x[a]=c===void 0?-1:c,g.set(_,a);for(c=p;c<=h;c++)_=o[c],a=g.get(_),a!==void 0&&a!==-1?(k[a]=r[c],M[a]=s[c],l&&($[a]=l[c]),a=x[a],g.set(_,a)):s[c]();for(a=p;a<f;a++)a in k?(r[a]=k[a],s[a]=M[a],l&&(l[a]=$[a],l[a](a))):r[a]=le(y);r=r.slice(0,i=f),o=u.slice(0)}return r});function y(f){if(s[a]=f,l){const[g,x]=D(a);return l[a]=x,t(u[a],g)}return t(u[a])}}}function q(e,t){return U(()=>e(t||{}))}const tt=e=>`Stale read from <${e}>.`;function nt(e){const t="fallback"in e&&{fallback:()=>e.fallback};return T(Pt(()=>e.each,e.children,t||void 0))}function Re(e){const t=e.keyed,n=T(()=>e.when,void 0,{equals:(o,r)=>t?o===r:!o==!r});return T(()=>{const o=n();if(o){const r=e.children;return typeof r=="function"&&r.length>0?U(()=>r(t?o:()=>{if(!U(n))throw tt("Show");return e.when})):r}return e.fallback},void 0,void 0)}function Mt(e){let t=!1;const n=(s,i)=>s[0]===i[0]&&(t?s[1]===i[1]:!s[1]==!i[1])&&s[2]===i[2],o=At(()=>e.children),r=T(()=>{let s=o();Array.isArray(s)||(s=[s]);for(let i=0;i<s.length;i++){const l=s[i].when;if(l)return t=!!s[i].keyed,[i,l,s[i]]}return[-1]},void 0,{equals:n});return T(()=>{const[s,i,l]=r();if(s<0)return e.fallback;const u=l.children;return typeof u=="function"&&u.length>0?U(()=>u(t?i:()=>{if(U(r)[0]!==s)throw tt("Match");return l.when})):u},void 0,void 0)}function xe(e){return e}const ke=ot();adblock.config.paddle=ke;const rt=ke==J.Paddle.sandbox;rt&&Paddle.Environment.set("sandbox");Paddle.Setup({vendor:ke.vendor});const It=document.querySelector(".appeal-form"),Ot=J.AppealForm,ae=adblock.runtime.appealForm=new Oe({paddleConfig:ke,formConfig:Ot,placeholder:It});eyeo=eyeo||{};eyeo.payment=eyeo.payment||{};ae.events.on(Oe.EVENTS.SUBMIT,e=>{ae.disable();const t=st(e),n=it(e);eyeo.payment.shouldStoreContributionInfo&&localStorage.setItem("contributionInfo",t),eyeo.payment.shouldStoreContributionInfo&&eyeo.payment.productId=="ME"&&n.append("from__contributionInfo",t);const o=lt(e,n),r=e.product,s=at(n,()=>ae.enable());ct(r,o,s)});function ot(){let t=[/^localhost$/,/^[\w\-]+.staging-new-adblockplus-org-1.uplink.eyeo.it$/,/^dev--adblockplus-org--[\w\-]+.web.app$/].some(n=>n.test(location.hostname))?J.Paddle.sandbox:J.Paddle.live;return adblock.searchParameters.has("testmode")||adblock.searchParameters.get("mode")=="test"?t=J.Paddle.sandbox:adblock.searchParameters.get("mode")=="live"&&(t=J.Paddle.live),t}function st(e){return JSON.stringify({amount:e.amount,frequency:e.frequency,processor:"paddle",currency:e.currency,lang:document.documentElement.lang,source:eyeo.payment.sourceId||"U",clickTs:Date.now()})}function it(e){const t=new URLSearchParams;return eyeo.payment.productId=="ME"&&(t.append("thankyou",1),t.append("var",1),t.append("u",forceGetUserId()),t.append("from",eyeo.payment.variantName||"null"),t.append("from__currency",e.currency),t.append("from__amount",ue(e.currency,e.amount)),t.append("from__frequency",e.frequency)),t}function lt(e,t){return{testmode:rt,userid:eyeo.payment.productId=="ME"?forceGetUserId():"",tracking:recordTracking(),locale:"",country:"unknown",ga_id:"",premium:eyeo.payment.productId=="ME"?"true":"false",premium_cid:"0",premium_sid:"0",currency:e.currency,recurring:e.frequency!="once",subType:e.frequency!="once"?e.frequency:"",experiment:"",experiment_id:"",variant:"",variant_index:-1,amount_cents:parseInt(e.amount,10),success_url:`${eyeo.payment.paymentCompleteUrl||"/payment-complete"}?${t.toString()}`,cancel_url:location.href}}function at(e,t){return{locale:adblock.settings.language,title:adblock.strings["appeal-form-checkout__title"],success:`${eyeo.payment.paymentCompleteUrl||"/payment-complete"}?${e.toString()}`,closeCallback:t}}function ct(e,t,n,o){e=="custom"?fetch("https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(r=>r.json()).then(r=>{if(r.hasOwnProperty("success")&&r.success==!1)throw new Error;Paddle.Checkout.open(Object.assign(n,{override:r.url}))}).catch(r=>{console.error(r),adblock.error(adblock.strings["error--unexpected"]),o&&o(r),ae.enable()}):Paddle.Checkout.open(Object.assign(n,{allowQuantity:!1,passthrough:t,product:e}))}function Ut(e,t,n){let o=n.length,r=t.length,s=o,i=0,l=0,u=t[r-1].nextSibling,c=null;for(;i<r||l<s;){if(t[i]===n[l]){i++,l++;continue}for(;t[r-1]===n[s-1];)r--,s--;if(r===i){const a=s<o?l?n[l-1].nextSibling:n[s-l]:u;for(;l<s;)e.insertBefore(n[l++],a)}else if(s===l)for(;i<r;)(!c||!c.has(t[i]))&&t[i].remove(),i++;else if(t[i]===n[s-1]&&n[l]===t[r-1]){const a=t[--r].nextSibling;e.insertBefore(n[l++],t[i++].nextSibling),e.insertBefore(n[--s],a),t[r]=n[s]}else{if(!c){c=new Map;let y=l;for(;y<s;)c.set(n[y],y++)}const a=c.get(t[i]);if(a!=null)if(l<a&&a<s){let y=i,f=1,g;for(;++y<r&&y<s&&!((g=c.get(t[y]))==null||g!==a+f);)f++;if(f>a-l){const x=t[i];for(;l<a;)e.insertBefore(n[l++],x)}else e.replaceChild(n[l++],t[i++])}else i++;else t[i++].remove()}}}const Fe="_$DX_DELEGATE";function P(e,t,n){let o;const r=()=>{const i=document.createElement("template");return i.innerHTML=e,n?i.content.firstChild.firstChild:i.content.firstChild},s=t?()=>U(()=>document.importNode(o||(o=r()),!0)):()=>(o||(o=r())).cloneNode(!0);return s.cloneNode=s,s}function ut(e,t=window.document){const n=t[Fe]||(t[Fe]=new Set);for(let o=0,r=e.length;o<r;o++){const s=e[o];n.has(s)||(n.add(s),t.addEventListener(s,Ft))}}function L(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function ce(e,t,n,o){if(o)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const r=n[0];e.addEventListener(t,n[0]=s=>r.call(e,n[1],s))}else e.addEventListener(t,n)}function Rt(e,t,n){if(!t)return n?L(e,"style"):t;const o=e.style;if(typeof t=="string")return o.cssText=t;typeof n=="string"&&(o.cssText=n=void 0),n||(n={}),t||(t={});let r,s;for(s in n)t[s]==null&&o.removeProperty(s),delete n[s];for(s in t)r=t[s],r!==n[s]&&(o.setProperty(s,r),n[s]=r);return n}function je(e,t,n){return U(()=>e(t,n))}function C(e,t,n,o){if(n!==void 0&&!o&&(o=[]),typeof t!="function")return me(e,t,o,n);F(r=>me(e,t(),r,n),o)}function Ft(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const o=n[t];if(o&&!n.disabled){const r=n[`${t}Data`];if(r!==void 0?o.call(n,r,e):o.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function me(e,t,n,o,r){for(;typeof n=="function";)n=n();if(t===n)return n;const s=typeof t,i=o!==void 0;if(e=i&&n[0]&&n[0].parentNode||e,s==="string"||s==="number")if(s==="number"&&(t=t.toString()),i){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=V(e,n,o,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||s==="boolean")n=V(e,n,o);else{if(s==="function")return F(()=>{let l=t();for(;typeof l=="function";)l=l();n=me(e,l,n,o)}),()=>n;if(Array.isArray(t)){const l=[],u=n&&Array.isArray(n);if(Me(l,t,n,r))return F(()=>n=me(e,l,n,o,!0)),()=>n;if(l.length===0){if(n=V(e,n,o),i)return n}else u?n.length===0?Le(e,l,o):Ut(e,n,l):(n&&V(e),Le(e,l));n=l}else if(t.nodeType){if(Array.isArray(n)){if(i)return n=V(e,n,o,t);V(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function Me(e,t,n,o){let r=!1;for(let s=0,i=t.length;s<i;s++){let l=t[s],u=n&&n[s],c;if(!(l==null||l===!0||l===!1))if((c=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))r=Me(e,l,u)||r;else if(c==="function")if(o){for(;typeof l=="function";)l=l();r=Me(e,Array.isArray(l)?l:[l],Array.isArray(u)?u:[u])||r}else e.push(l),r=!0;else{const a=String(l);u&&u.nodeType===3&&u.data===a?e.push(u):e.push(document.createTextNode(a))}}return r}function Le(e,t,n=null){for(let o=0,r=t.length;o<r;o++)e.insertBefore(t[o],n)}function V(e,t,n,o){if(n===void 0)return e.textContent="";const r=o||document.createTextNode("");if(t.length){let s=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(r!==l){const u=l.parentNode===e;!s&&!i?u?e.replaceChild(r,l):e.insertBefore(r,n):u&&l.remove()}else s=!0}}else e.insertBefore(r,n);return[r]}function jt(e){return Object.keys(e).reduce((n,o)=>{const r=e[o];return n[o]=Object.assign({},r),pt(r.value)&&!Gt(r.value)&&!Array.isArray(r.value)&&(n[o].value=Object.assign({},r.value)),Array.isArray(r.value)&&(n[o].value=r.value.slice(0)),n},{})}function Lt(e){return e?Object.keys(e).reduce((n,o)=>{const r=e[o];return n[o]=pt(r)&&"value"in r?r:{value:r},n[o].attribute||(n[o].attribute=Ht(o)),n[o].parse="parse"in n[o]?n[o].parse:typeof n[o].value!="string",n},{}):{}}function Dt(e){return Object.keys(e).reduce((n,o)=>(n[o]=e[o].value,n),{})}function Bt(e,t){const n=jt(t);return Object.keys(t).forEach(r=>{const s=n[r],i=e.getAttribute(s.attribute),l=e[r];i&&(s.value=s.parse?ft(i):i),l!=null&&(s.value=Array.isArray(l)?l.slice(0):l),s.reflect&&De(e,s.attribute,s.value),Object.defineProperty(e,r,{get(){return s.value},set(u){const c=s.value;s.value=u,s.reflect&&De(this,s.attribute,s.value);for(let a=0,y=this.__propertyChangedCallbacks.length;a<y;a++)this.__propertyChangedCallbacks[a](r,u,c)},enumerable:!0,configurable:!0})}),n}function ft(e){if(e)try{return JSON.parse(e)}catch{return e}}function De(e,t,n){if(n==null||n===!1)return e.removeAttribute(t);let o=JSON.stringify(n);e.__updating[t]=!0,o==="true"&&(o=""),e.setAttribute(t,o),Promise.resolve().then(()=>delete e.__updating[t])}function Ht(e){return e.replace(/\.?([A-Z]+)/g,(t,n)=>"-"+n.toLowerCase()).replace("_","-").replace(/^-/,"")}function pt(e){return e!=null&&(typeof e=="object"||typeof e=="function")}function Gt(e){return Object.prototype.toString.call(e)==="[object Function]"}function zt(e){return typeof e=="function"&&e.toString().indexOf("class")===0}let Ae;function Kt(e,t){const n=Object.keys(t);return class extends e{static get observedAttributes(){return n.map(r=>t[r].attribute)}constructor(){super(),this.__initialized=!1,this.__released=!1,this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props={}}connectedCallback(){if(this.__initialized)return;this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props=Bt(this,t);const r=Dt(this.props),s=this.Component,i=Ae;try{Ae=this,this.__initialized=!0,zt(s)?new s(r,{element:this}):s(r,{element:this})}finally{Ae=i}}async disconnectedCallback(){if(await Promise.resolve(),this.isConnected)return;this.__propertyChangedCallbacks.length=0;let r=null;for(;r=this.__releaseCallbacks.pop();)r(this);delete this.__initialized,this.__released=!0}attributeChangedCallback(r,s,i){if(this.__initialized&&!this.__updating[r]&&(r=this.lookupProp(r),r in t)){if(i==null&&!this[r])return;this[r]=t[r].parse?ft(i):i}}lookupProp(r){if(t)return n.find(s=>r===s||r===t[s].attribute)}get renderRoot(){return this.shadowRoot||this.attachShadow({mode:"open"})}addReleaseCallback(r){this.__releaseCallbacks.push(r)}addPropertyChangedCallback(r){this.__propertyChangedCallbacks.push(r)}}}function Vt(e,t={},n={}){const{BaseElement:o=HTMLElement,extension:r}=n;return s=>{if(!e)throw new Error("tag is required to register a Component");let i=customElements.get(e);return i?(i.prototype.Component=s,i):(i=Kt(o,Lt(t)),i.prototype.Component=s,i.prototype.registeredTag=e,customElements.define(e,i,r),i)}}function Jt(e){const t=Object.keys(e),n={};for(let o=0;o<t.length;o++){const[r,s]=D(e[t[o]]);Object.defineProperty(n,t[o],{get:r,set(i){s(()=>i)}})}return n}function Yt(e){if(e.assignedSlot&&e.assignedSlot._$owner)return e.assignedSlot._$owner;let t=e.parentNode;for(;t&&!t._$owner&&!(t.assignedSlot&&t.assignedSlot._$owner);)t=t.parentNode;return t&&t.assignedSlot?t.assignedSlot._$owner:e._$owner}function Wt(e){return(t,n)=>{const{element:o}=n;return le(r=>{const s=Jt(t);o.addPropertyChangedCallback((l,u)=>s[l]=u),o.addReleaseCallback(()=>{o.renderRoot.textContent="",r()});const i=e(s,n);return C(o.renderRoot,i)},Yt(o))}}function Xt(e,t,n){return arguments.length===2&&(n=t,t={}),Vt(e,t)(Wt(n))}const Zt=P('<fieldset class="appeal-form-frequency"><legend class="appeal-form-frequency__heading"></legend><div class="appeal-form-frequency__options"><div class="appeal-form-amounts"><label class="appeal-form-amount appeal-form-amount--custom"><input type="radio" name="appeal-form-amount__radio" class="appeal-form-amount__radio" value="custom" data-product="custom"><input type="number" step=".01" class="appeal-form-amount__input" name="appeal-form-amount__input" data-product="custom" placeholder="35" data-minimum="5">'),Qt=P('<label class="appeal-form-amount appeal-form-amount--fixed"><input type="radio" name="appeal-form-amount__radio" class="appeal-form-amount__radio"><span class="appeal-form-amount__text">');function Be(e){let t,n;return(()=>{const o=Zt(),r=o.firstChild,s=r.nextSibling,i=s.firstChild,l=i.firstChild,u=l.firstChild,c=u.nextSibling;ce(o,"click",e.onClick,!0),r.$$click=f=>f.stopPropagation(),C(i,q(nt,{get each(){return Object.keys(e.products)},children:(f,g)=>{if(f!=="custom")return(()=>{const x=Qt(),k=x.firstChild,M=k.nextSibling;return ce(k,"change",e.onChange),k.value=f,C(M,()=>Ie(e.currency,f)),F($=>{const p=`appeal-form-amount__radio--${e.frequency}-${g()}`,h=e.frequency,m=e.products[f];return p!==$._v$7&&L(k,"data-testid",$._v$7=p),h!==$._v$8&&L(k,"data-frequency",$._v$8=h),m!==$._v$9&&L(k,"data-product",$._v$9=m),$},{_v$7:void 0,_v$8:void 0,_v$9:void 0}),F(()=>k.checked=e.products[f]===e.checkedProduct),x})()}}),l),u.$$click=()=>n.focus();const a=t;typeof a=="function"?je(a,u):t=u,ce(c,"input",e.onChange,!0),c.addEventListener("focus",()=>t.click());const y=n;return typeof y=="function"?je(y,c):n=c,C(o,()=>e.children,null),F(f=>{const g=`border-color: ${e.active?"#2196f3":"#e0e0e0"}`,x=e.legendText,k=`appeal-form-amount__radio--${e.frequency}-6`,M=e.frequency,$=`appeal-form-amount__input--${e.frequency}`,p=e.frequency;return f._v$=Rt(o,g,f._v$),x!==f._v$2&&(r.innerHTML=f._v$2=x),k!==f._v$3&&L(u,"data-testid",f._v$3=k),M!==f._v$4&&L(u,"data-frequency",f._v$4=M),$!==f._v$5&&L(c,"data-testid",f._v$5=$),p!==f._v$6&&L(c,"data-frequency",f._v$6=p),f},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0}),o})()}ut(["click","input"]);const en=P('<div class="toggle-wrap"><div class="toggle-main-txt">Monthly</div><label class="switch"><input class="toggle-input" type="checkbox" value="frequency"><span class="slider round"></span></label><div class="toggle-main-txt">Yearly');function tn(e){return(()=>{const t=en(),n=t.firstChild,o=n.nextSibling,r=o.firstChild;return ce(r,"click",e.onClick,!0),t})()}ut(["click"]);const nn=P('<p id="monthly" class="premium-upsell__monthly">Nice! A monthly <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium. Thanks for your support.'),rn=P('<p id="yearly" class="premium-upsell__yearly">Nice! A yearly <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium. Thanks for your support.'),on=P('<p id="one-year" class="premium-upsell__months">Nice! A <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium for <!> <span class="premium-upsell__duration"></span> <!>. Thanks for your support.'),sn=P('<div id="what-is-included" class="info premium-upsell"><span class="info-line premium-upsell__border-start">');function ln(e){const t=T(()=>an(e.products,e.amount,e.frequency)),n=T(()=>Ie(e.currency,e.amount));return(()=>{const o=sn();return o.firstChild,C(o,q(Mt,{get children(){return[q(xe,{get when(){return e.frequency==="monthly"},get children(){const r=nn(),s=r.firstChild,i=s.nextSibling,l=i.nextSibling;return C(l,n),r}}),q(xe,{get when(){return e.frequency==="yearly"},get children(){const r=rn(),s=r.firstChild,i=s.nextSibling,l=i.nextSibling;return C(l,n),r}}),q(xe,{get when(){return e.frequency==="once"},get children(){const r=on(),s=r.firstChild,i=s.nextSibling,l=i.nextSibling,u=l.nextSibling,c=u.nextSibling,a=c.nextSibling,y=a.nextSibling,f=y.nextSibling,g=f.nextSibling;return g.nextSibling,C(l,n),C(r,(()=>{const x=T(()=>!!t().frequencyClassSuffix.match(/month/));return()=>x()?t().durationMonths:t().durationText})(),c),C(r,()=>t().frequencyClassSuffix,g),r}})]}}),null),o})()}function an(e,t,n){const o=parseInt(t,10),r=parseInt(Object.keys(e.once)[2],10),s=parseInt(Object.keys(e.monthly)[0],10);let i,l,u=n;return o<r?(i=Math.floor(o/s),u="months",l=i):(i=Math.floor(o/r),u=i===1?"year":"years",l=12*i),{durationText:i,durationMonths:l,frequencyClassSuffix:u}}const cn=`.appeal-form{margin-top:1rem;margin-bottom:1rem}.appeal-form__placeholder{position:relative;display:inline-block;overflow:hidden;height:1em;border-radius:3px;background-color:#e6e6e6}.appeal-form__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;content:"";transform:translate(-100%);animation:shimmer 3s infinite;background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0))}@-webkit-keyframes shimmer{to{transform:translate(100%)}}@keyframes shimmer{to{transform:translate(100%)}}.appeal-form-header{margin-bottom:2.5rem}.appeal-form-header__heading{font-size:1.125rem;display:inline-block;margin:0;margin-right:.5rem}.appeal-form-header__select{font-size:.875rem}.appeal-form-frequencies{display:flex;flex-wrap:wrap;gap:3rem;max-width:53.125rem;margin-top:.5rem;margin-bottom:1.5rem}@media (min-width: 55.125rem){.appeal-form-frequencies{gap:2rem}}.appeal-form-frequency{position:relative;flex:0 0 90%;border-radius:.25rem;border-width:1px;border-color:#e6e6e6;padding:1rem 0}@media (min-width: 55.125rem){.appeal-form-frequency{flex:1}}.appeal-form-frequency__heading{position:absolute;top:-2rem;font-size:1rem;font-weight:400;margin-top:0;margin-bottom:.375rem}.appeal-form-frequency__options{padding:0 0 .5rem}.appeal-form-amounts{display:flex;flex-wrap:wrap;align-items:center;padding:0 1rem}[dir=rtl] .appeal-form-amounts{padding-left:1rem}.appeal-form-amount{line-height:1.7;display:flex;width:33.33333333%}[dir=rtl] .appeal-form-amount__radio{margin-right:0}.appeal-form-amount__text{padding-top:1.5px}.appeal-form-amount__input{font-size:.875rem;width:100%;height:1.2rem;margin-top:.1875rem;padding:.125rem .25rem;border:1px solid gray}[dir=rtl] .appeal-form-amount__input{margin-left:.1875rem}@media (min-width: 55.125rem){.appeal-form-checkout{display:flex}}.appeal-form-checkout__submit{font-size:.9375rem;font-weight:700;display:flex;align-items:center;justify-content:center;width:100%;height:2rem;margin-bottom:1rem;margin-right:1rem;text-align:center;color:#fff;border:0;border-radius:3.5px;background-color:#0047ff;box-shadow:0 0 1px #0003;cursor:pointer}.appeal-form-checkout__submit:disabled{filter:grayscale(100)}@media (min-width: 23.75rem){.appeal-form-checkout__submit{max-width:14rem}:not([dir=rtl]) .appeal-form-checkout__submit{margin-right:1rem}[dir=rtl] .appeal-form-checkout__submit{margin-left:1rem}}@media (min-width: 55.125rem){.appeal-form-checkout__submit{margin-bottom:0}}.appeal-form-checkout__icon{height:1rem}[dir=rtl] .appeal-form-checkout__icon{margin-left:.25rem}.appeal-form-checkout__image{width:100%;max-width:340px;max-height:32px}.toggle-wrap{position:absolute;top:-38px;right:-1rem;padding:0 2px;background-color:#fff;display:flex;align-items:center;font-family:Source Sans Pro;font-style:normal;font-weight:300;font-size:11px;line-height:34px;height:34px;color:#000}@media (min-width: 55.125rem){.toggle-wrap{right:.5rem}}.switch{position:relative;display:inline-block;width:44px;height:22px;margin:0 10px}.switch input{opacity:0;width:0;height:0}.slider.round{border-radius:34px}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#2196f3;-webkit-transition:.4s;transition:.4s}.slider.round:before{border-radius:50%}.slider:before{position:absolute;content:"";width:18px;height:18px;left:2px;bottom:2px;background-color:#fff;-webkit-transition:.4s;transition:.4s}input:checked+.slider:before{-webkit-transform:translateX(22px);-ms-transform:translateX(22px);transform:translate(22px)}.premium-upsell{display:flex;border:1px solid #666666;border-radius:10px;margin:1rem 0;padding:.5rem}.premium-upsell__border-start{display:flex;width:.5rem;background-color:#2284f7;border-radius:4px;align-items:stretch}.premium-upsell>p{margin:.5rem 0;margin-inline-start:1rem}.appeal-form__error{color:red;font-size:.875rem;padding:1rem;border:1px solid #ff0000;border-radius:10px;margin-bottom:1rem}
`,un=P('<header class="appeal-form-header"><h2 class="appeal-form-header__heading" data-testid="appeal-form-header__heading"></h2><select class="appeal-form-header__select" data-testid="appeal-form-header__select">'),fn=P('<div class="appeal-form__error" data-testid="appeal-form__error">'),pn=P('<form class="appeal-form"><div class="appeal-form-frequencies"></div><div class="appeal-form-checkout"><input class="appeal-form-checkout__submit" data-testid="appeal-form-checkout__submit" type="submit"><img alt="" src="/components/AppealForm/appeal-form-checkout__image.svg" class="appeal-form-checkout__image">'),dn=P("<style>"),mn=P("<option>"),j=ot(),hn=3500,oe=adblock.strings;function yn(e){const[t,n]=D("monthly"),[o,r]=D(hn),[s,i]=D("once"),[l,u]=D(!1),[c,a]=D(e.currency),[y,f]=D(null),g=()=>s()==="once"?"once":t(),x=p=>{if(p.preventDefault(),!o()){adblock.error("No amount selected.");return}u(!0);const h=g(),m={product:j.products[c()][h][o()],frequency:h,currency:c(),amount:o()},_=st(m),N=it(m);eyeo.payment.productId="ME",eyeo.payment.variantName="update__202308",eyeo.payment.paymentCompleteUrl="https://accounts.adblockplus.org/premium",eyeo.payment.shouldStoreContributionInfo&&localStorage.setItem("contributionInfo",_),eyeo.payment.shouldStoreContributionInfo&&eyeo.payment.productId=="ME"&&N.append("from__contributionInfo",_);const dt=lt(m,N),mt=at(N,()=>{u(!1)});ct(m.product,dt,mt,ht=>{u(!1),f(ht.message)})},k=p=>{const h=p.target.checked?"yearly":"monthly",m=3,_=Number(Object.keys(j.products[c()][h])[m]);r(_),n(h),i("recurring")},M=p=>{a(p.target.value)},$=p=>h=>{i(p);let m;h.target.type==="number"&&c()!=="JPY"?m=h.target.value*100:m=Number(h.target.value);const _=g();if((_==="once"||_==="yearly")&&m<500){f(adblock.strings[`appeal-form__error--${_}`]);return}if(m<199){console.log("twssdf"),f(adblock.strings["appeal-form__error--monthly"]);return}f(null),r(m)};return[(()=>{const p=un(),h=p.firstChild,m=h.nextSibling;return C(h,()=>oe["appeal-form-header__heading"]),m.addEventListener("change",M),C(m,q(nt,{get each(){return Object.keys(j.products)},children:_=>(()=>{const N=mn();return N.value=_,C(N,_),N})()})),p})(),(()=>{const p=pn(),h=p.firstChild,m=h.nextSibling,_=m.firstChild;return p.addEventListener("submit",x),C(h,q(Be,{frequency:"once",get products(){return j.products[c()].once},get legendText(){return oe["appeal-form-frequency__heading--once"]},get currency(){return c()},get checkedProduct(){return T(()=>g()==="once")()&&j.products[c()].once[o()]},get active(){return s()==="once"},get onChange(){return $("once")}}),null),C(h,q(Be,{get frequency(){return t()},get products(){return j.products[c()][t()]},get legendText(){return oe[`appeal-form-frequency__heading--${t()}`]},get currency(){return c()},get checkedProduct(){return T(()=>s()==="recurring")()&&j.products[c()][t()][o()]},get active(){return s()==="recurring"},get onChange(){return $("recurring")},get children(){return q(tn,{onClick:k})}}),null),C(p,q(Re,{get when(){return!y()},get children(){return q(ln,{get products(){return j.products[c()]},get currency(){return c()},get amount(){return o()},get frequency(){return g()}})}}),m),C(p,q(Re,{get when(){return y()},get children(){const N=fn();return F(()=>N.innerHTML=y()),N}}),m),F(()=>_.disabled=l()||y()),F(()=>_.value=oe["appeal-form-checkout__submit"]),p})(),(()=>{const p=dn();return C(p,cn),p})()]}Xt("appeal-form",{currency:"USD"},e=>q(yn,{get currency(){return e.currency}}));
//# sourceMappingURL=main.js.map
