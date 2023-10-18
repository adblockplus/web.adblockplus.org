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

var ut=Object.defineProperty;var mt=(e,t,n)=>t in e?ut(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var we=(e,t,n)=>(mt(e,typeof t!="symbol"?t+"":t,n),n),ve=(e,t,n)=>{if(!t.has(e))throw TypeError("Cannot "+n)};var p=(e,t,n)=>(ve(e,t,"read from private field"),n?n.call(e):t.get(e)),v=(e,t,n)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,n)},L=(e,t,n,o)=>(ve(e,t,"write to private field"),o?o.call(e,n):t.set(e,n),n);var k=(e,t,n)=>(ve(e,t,"access private method"),n);const z={AppealForm:{currency:typeof adblock=="object"&&adblock.settings.currency||"USD",selected:3},Paddle:{sandbox:{vendor:11004,products:{USD:{once:{1e3:46028,1500:46029,2e3:46030,3500:46031,5e3:46032,custom:500},monthly:{199:46074,299:46075,399:46076,499:46077,999:46078,custom:199},yearly:{1e3:46079,1500:46080,2e3:46081,3500:46082,5e3:46083,custom:500}},AUD:{once:{1e3:46033,1500:46034,2e3:46035,3500:46036,5e3:46037,custom:500},monthly:{199:46084,299:46085,399:46086,499:46087,999:46088,custom:199},yearly:{1e3:46089,1500:46090,2e3:46091,3500:46092,5e3:46093,custom:500}},CAD:{once:{1e3:46038,1500:46039,2e3:46040,3500:46041,5e3:46042,custom:500},monthly:{199:46094,299:46095,399:46096,499:46097,999:46098,custom:199},yearly:{1e3:46099,1500:46181,2e3:46182,3500:46183,5e3:46184,custom:500}},EUR:{once:{1e3:46048,1500:46049,2e3:46050,3500:46051,5e3:46052,custom:500},monthly:{199:46195,299:46196,399:46197,499:46198,999:46199,custom:199},yearly:{1e3:46200,1500:46201,2e3:46202,3500:46203,5e3:46204,custom:500}},GBP:{once:{1e3:46053,1500:46054,2e3:46055,3500:46056,5e3:46057,custom:500},monthly:{199:46205,299:46206,399:46207,499:46208,999:46209,custom:199},yearly:{1e3:46210,1500:46211,2e3:46212,3500:46213,5e3:46214,custom:500}},JPY:{once:{1500:46064,2e3:46065,2500:46066,3500:46067,5e3:46068,custom:500},monthly:{200:46225,300:46226,500:46227,1e3:46228,1500:46229,custom:200},yearly:{1500:46230,2e3:46231,2500:46232,3500:46233,5e3:46234,custom:500}},NZD:{once:{1e3:46058,1500:46059,2e3:46060,3500:46062,5e3:46063,custom:500},monthly:{199:46215,299:46216,399:46217,499:46218,999:46219,custom:199},yearly:{1e3:46220,1500:46221,2e3:46222,3500:46223,5e3:46224,custom:500}},CHF:{once:{1e3:46043,1500:46044,2e3:46045,3500:46046,5e3:46047,custom:500},monthly:{199:46185,299:46186,399:46187,499:46188,999:46189,custom:199},yearly:{1e3:46190,1500:46191,2e3:46192,3500:46193,5e3:46194,custom:500}},RUB:{once:{25e3:46069,5e4:46070,1e5:46071,25e4:46072,5e5:46073,custom:25e3},monthly:{15e3:46235,25e3:46236,4e4:46237,5e4:46238,1e5:46239,custom:15e3},yearly:{25e3:46240,5e4:46241,1e5:46242,25e4:46243,5e5:46244,custom:25e3}}}},live:{vendor:164164,products:{USD:{once:{1e3:816549,1500:816550,2e3:816551,3500:816552,5e3:816553,custom:500},monthly:{199:816774,299:816775,399:816776,499:816777,999:816778,custom:199},yearly:{1e3:816779,1500:816780,2e3:816781,3500:816782,5e3:816783,custom:500}},AUD:{once:{1e3:816522,1500:816523,2e3:816524,3500:816525,5e3:816526,custom:500},monthly:{199:816692,299:816693,399:816694,499:816696,999:816697,custom:199},yearly:{1e3:816699,1500:816700,2e3:816702,3500:816703,5e3:816705,custom:500}},CAD:{once:{1e3:816528,1500:816529,2e3:816530,3500:816531,5e3:816532,custom:500},monthly:{199:816706,299:816708,399:816710,499:816711,999:816712,custom:199},yearly:{1e3:816714,1500:816715,2e3:816716,3500:816717,5e3:816718,custom:500}},EUR:{once:{1e3:816517,1500:816518,2e3:816519,3500:816520,5e3:816521,custom:500},monthly:{199:816681,299:816682,399:816683,499:816684,999:816686,custom:199},yearly:{1e3:816687,1500:816688,2e3:816689,3500:816690,5e3:816691,custom:500}},GBP:{once:{1e3:816538,1500:816539,2e3:816540,3500:816541,5e3:816542,custom:500},monthly:{199:816734,299:816735,399:816736,499:816737,999:816738,custom:199},yearly:{1e3:816739,1500:816740,2e3:816741,3500:816743,5e3:816744,custom:500}},JPY:{once:{1500:816554,2e3:816555,2500:816556,3500:816557,5e3:816558,custom:500},monthly:{200:816784,300:816785,500:816786,1e3:816787,1500:816788,custom:200},yearly:{1500:816789,2e3:816791,2500:816792,3500:816794,5e3:816795,custom:500}},NZD:{once:{1e3:816543,1500:816544,2e3:816545,3500:816547,5e3:816548,custom:500},monthly:{199:816760,299:816762,399:816764,499:816766,999:816768,custom:199},yearly:{1e3:816769,1500:816770,2e3:816771,3500:816772,5e3:816773,custom:500}},CHF:{once:{1e3:816533,1500:816535,2e3:816534,3500:816536,5e3:816537,custom:500},monthly:{199:816720,299:816722,399:816723,499:816725,999:816726,custom:199},yearly:{1e3:816727,1500:816728,2e3:816730,3500:816731,5e3:816733,custom:500}},RUB:{once:{25e3:816559,5e4:816560,1e5:816561,25e4:816562,5e5:816563,custom:25e3},monthly:{15e3:816796,25e3:816797,4e4:816799,5e4:816800,1e5:816801,custom:15e3},yearly:{25e3:816802,5e4:816803,1e5:816804,25e4:816805,5e5:816806,custom:25e3}}}}}};class pt{constructor(){this.callbacks={}}on(t,n){this.callbacks[t]||(this.callbacks[t]=[]),this.callbacks[t].push(n)}fire(t,n){if(this.callbacks[t])for(const o of this.callbacks[t])try{o(n)}catch(r){console.error(r)}}}function Z(e,t){return e=="JPY"?t:t/100}function dt(e,t){return e=="JPY"?t:t*100}function Oe(e,t){return new Intl.NumberFormat(navigator.language,{style:"currency",currency:e,minimumFractionDigits:0}).format(Z(e,t))}const ft=document.getElementById("appeal-form"),ht=document.getElementById("appeal-form-amount--fixed"),yt=document.getElementById("appeal-form-amount--custom");var O,U,A,B,I,Q,H,V,ee,Ee,te,qe,ne,Pe,re,Ne,Y,le,X,ae,fe,He,he,Ge,ye,Je,ge,ze;let Ae=(O=class{constructor({placeholder:t,paddleConfig:n,formConfig:o}){v(this,ee);v(this,te);v(this,ne);v(this,re);v(this,Y);v(this,X);v(this,fe);v(this,he);v(this,ye);v(this,ge);we(this,"events");v(this,U,void 0);v(this,A,void 0);v(this,B,void 0);v(this,I,void 0);v(this,Q,[]);v(this,H,void 0);v(this,V,void 0);this.events=new pt,L(this,U,n),L(this,A,ft.content.cloneNode(!0).firstElementChild),p(this,A).querySelector(".appeal-form-header__heading").innerHTML=adblock.strings["appeal-form-header__heading"],p(this,A).querySelector(".appeal-form-checkout__submit").innerHTML=adblock.strings["appeal-form-checkout__submit"],L(this,H,p(this,A).querySelector(".appeal-form__error")),L(this,V,p(this,A).querySelector(".appeal-form-checkout__submit")),L(this,B,p(this,A).querySelector(".appeal-form-header__select"));for(const r in n.products){const s=document.createElement("option");s.textContent=r.toUpperCase(),s.value=r.toUpperCase(),p(this,B).appendChild(s)}p(this,B).value=o.currency,L(this,I,p(this,A).querySelector(".appeal-form-frequencies"));for(const r in n.products[o.currency]){let s=1;const l=p(this,I).querySelector(`.appeal-form-frequency--${r}`);l.querySelector(".appeal-form-frequency__heading").innerHTML=adblock.strings[`appeal-form-frequency__heading--${r}`];const a=l.querySelector(".appeal-form-amounts");for(const c in n.products[o.currency][r]){let m,i,y;c=="custom"?(m=yt.content.cloneNode(!0).firstElementChild,y=m.querySelector(".appeal-form-amount__input"),y.dataset.testid=`appeal-form-amount__input--${r}`,y.dataset.frequency=r):m=ht.content.cloneNode(!0).firstElementChild,i=m.querySelector(".appeal-form-amount__radio"),i.dataset.testid=`appeal-form-amount__radio--${r}-${s++}`,i.dataset.frequency=r,p(this,Q).push(m),a.appendChild(m)}}k(this,ee,Ee).call(this,o.currency),p(this,I).querySelectorAll(".appeal-form-amount__radio")[o.selected].checked=!0,p(this,B).addEventListener("change",r=>k(this,ee,Ee).call(this,r.currentTarget.value)),p(this,I).addEventListener("focusin",r=>k(this,he,Ge).call(this,r)),p(this,I).addEventListener("input",r=>k(this,ye,Je).call(this,r)),p(this,A).addEventListener("submit",r=>k(this,ge,ze).call(this,r)),t.replaceWith(p(this,A)),p(this,A).dataset.testid="appeal-form-constructed"}state(){const t=p(this,I).querySelector(".appeal-form-amount__radio:checked"),n=p(this,B).value,o=t.dataset.frequency,r=t.dataset.product;let s=t.value;if(s=="custom"){const l=k(this,X,ae).call(this,t);s=dt(n,parseFloat(l.value===""?l.placeholder:l.value))}else s=parseFloat(s);return{currency:n,frequency:o,product:r,amount:s}}disable(){p(this,A).classList.add("appeal-form--disabled"),p(this,A).querySelectorAll("input, button").forEach(t=>{t.disabled=!0})}enable(){p(this,A).classList.remove("appeal-form--disabled"),p(this,A).querySelectorAll("input, button").forEach(t=>{t.disabled=!1})}},U=new WeakMap,A=new WeakMap,B=new WeakMap,I=new WeakMap,Q=new WeakMap,H=new WeakMap,V=new WeakMap,ee=new WeakSet,Ee=function(t){let n=0;for(const o in p(this,U).products[t])for(const r in p(this,U).products[t][o]){const s=p(this,Q)[n++],l=s.querySelector(".appeal-form-amount__radio");if(r=="custom"){const a=s.querySelector(".appeal-form-amount__input");a.placeholder=String(Z(t,Object.keys(p(this,U).products[t][o])[3])),a.dataset.minimum=Z(t,p(this,U).products[t][o][r]),l.dataset.product="custom"}else s.querySelector(".appeal-form-amount__text").textContent=Oe(t,r),l.value=r,l.dataset.product=p(this,U).products[t][o][r]}this.events.fire(O.EVENTS.CURRENCY_CHANGE)},te=new WeakSet,qe=function(t){p(this,H).innerHTML=adblock.strings[`appeal-form__error--${t.dataset.frequency}`],p(this,H).hidden=!1,p(this,V).disabled=!0,this.events.fire(O.EVENTS.MINIMUM_AMOUNT_ERROR_SHOW)},ne=new WeakSet,Pe=function(){p(this,H).hidden=!0,p(this,V).disabled=!1,this.events.fire(O.EVENTS.MINIMUM_AMOUNT_ERROR_HIDE)},re=new WeakSet,Ne=function(t){return t.value&&parseFloat(t.value)<parseFloat(t.dataset.minimum)},Y=new WeakSet,le=function(t){k(this,re,Ne).call(this,t)?k(this,te,qe).call(this,t):k(this,ne,Pe).call(this)},X=new WeakSet,ae=function(t){return t.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__input")},fe=new WeakSet,He=function(t){return t.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__radio")},he=new WeakSet,Ge=function(t){t.target.type=="number"&&(k(this,fe,He).call(this,t.target).checked=!0,k(this,Y,le).call(this,t.target))},ye=new WeakSet,Je=function(t){t.target.type=="number"?k(this,Y,le).call(this,t.target):t.target.type=="radio"&&(t.target.value=="custom"?k(this,Y,le).call(this,k(this,X,ae).call(this,t.target)):k(this,ne,Pe).call(this)),this.events.fire(O.EVENTS.AMOUNT_CHANGE)},ge=new WeakSet,ze=function(t){t.preventDefault();const n=p(this,I).querySelector(".appeal-form-amount__radio:checked");if(n.value=="custom"){const o=k(this,X,ae).call(this,n);if(k(this,re,Ne).call(this,o))return k(this,te,qe).call(this,o)}this.events.fire(O.EVENTS.SUBMIT,this.state())},we(O,"EVENTS",{CURRENCY_CHANGE:"CURRENCY_CHANGE",MINIMUM_AMOUNT_ERROR_SHOW:"SHOW_MINIMUM_AMOUNT_ERROR",MINIMUM_AMOUNT_ERROR_HIDE:"HIDE_MINIMUM_AMOUNT_ERROR",AMOUNT_CHANGE:"AMOUNT_CHANGE",SUBMIT:"SUBMIT"}),O);adblock.lib.AppealForm=Ae;function gt(){let t=[/^localhost$/,/^[\w\-]+.staging-new-adblockplus-org-1.uplink.eyeo.it$/,/^dev--adblockplus-org--[\w\-]+.web.app$/].some(l=>l.test(location.hostname))?z.Paddle.sandbox:z.Paddle.live;adblock.searchParameters.has("testmode")||adblock.searchParameters.get("mode")=="test"?t=z.Paddle.sandbox:adblock.searchParameters.get("mode")=="live"&&(t=z.Paddle.live),adblock.config.paddle=t;const n=t==z.Paddle.sandbox;n&&Paddle.Environment.set("sandbox"),Paddle.Setup({vendor:t.vendor});const o=document.querySelector(".appeal-form"),r=z.AppealForm,s=adblock.runtime.appealForm=new Ae({paddleConfig:t,formConfig:r,placeholder:o});eyeo=eyeo||{},eyeo.payment=eyeo.payment||{},s.events.on(Ae.EVENTS.SUBMIT,l=>{s.disable();const a=JSON.stringify({amount:l.amount,frequency:l.frequency,processor:"paddle",currency:l.currency,lang:document.documentElement.lang,source:eyeo.payment.sourceId||"U",clickTs:Date.now()}),c=new URLSearchParams;eyeo.payment.productId=="ME"&&(c.append("thankyou",1),c.append("var",1),c.append("u",forceGetUserId()),c.append("from",eyeo.payment.variantName||"null"),c.append("from__currency",l.currency),c.append("from__amount",Z(l.currency,l.amount)),c.append("from__frequency",l.frequency)),eyeo.payment.shouldStoreContributionInfo&&localStorage.setItem("contributionInfo",a),eyeo.payment.shouldStoreContributionInfo&&eyeo.payment.productId=="ME"&&c.append("from__contributionInfo",a);const m={testmode:n,userid:eyeo.payment.productId=="ME"?forceGetUserId():"",tracking:recordTracking(),locale:"",country:"unknown",ga_id:"",premium:eyeo.payment.productId=="ME"?"true":"false",premium_cid:"0",premium_sid:"0",currency:l.currency,recurring:l.frequency!="once",subType:l.frequency!="once"?l.frequency:"",experiment:"",experiment_id:"",variant:"",variant_index:-1,amount_cents:parseInt(l.amount,10),success_url:`${eyeo.payment.paymentCompleteUrl||"/payment-complete"}?${c.toString()}`,cancel_url:location.href},i=l.product,y={locale:adblock.settings.language,title:adblock.strings["appeal-form-checkout__title"],success:m.success_url,closeCallback:()=>{s.enable()}};i=="custom"?fetch("https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)}).then(u=>u.json()).then(u=>{if(u.hasOwnProperty("success")&&u.success==!1)throw new Error;Paddle.Checkout.open(Object.assign(y,{override:u.url}))}).catch(u=>{adblock.error(adblock.strings["error--unexpected"]),s.enable()}):Paddle.Checkout.open(Object.assign(y,{allowQuantity:!1,passthrough:m,product:i}))})}document.querySelector(".appeal-form")&&gt();const _t=(e,t)=>e===t,bt=Symbol("solid-track"),ue={equals:_t};let kt=Ze;const J=1,me=2,Ke={owned:null,cleanups:null,context:null,owner:null};var S=null;let Ce=null,_=null,E=null,G=null,_e=0;function ie(e,t){const n=_,o=S,r=e.length===0,s=t===void 0?o:t,l=r?Ke:{owned:null,cleanups:null,context:s?s.context:null,owner:s},a=r?e:()=>e(()=>M(()=>ke(l)));S=l,_=null;try{return oe(a,!0)}finally{_=n,S=o}}function j(e,t){t=t?Object.assign({},ue,t):ue;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},o=r=>(typeof r=="function"&&(r=r(n.value)),Ye(n,r));return[Ve.bind(n),o]}function R(e,t,n){const o=Xe(e,t,!1,J);be(o)}function N(e,t,n){n=n?Object.assign({},ue,n):ue;const o=Xe(e,t,!0,0);return o.observers=null,o.observerSlots=null,o.comparator=n.equals||void 0,be(o),Ve.bind(o)}function M(e){if(_===null)return e();const t=_;_=null;try{return e()}finally{_=t}}function St(e){return S===null||(S.cleanups===null?S.cleanups=[e]:S.cleanups.push(e)),e}function wt(e){const t=N(e),n=N(()=>Te(t()));return n.toArray=()=>{const o=n();return Array.isArray(o)?o:o!=null?[o]:[]},n}function Ve(){if(this.sources&&this.state)if(this.state===J)be(this);else{const e=E;E=null,oe(()=>pe(this),!1),E=e}if(_){const e=this.observers?this.observers.length:0;_.sources?(_.sources.push(this),_.sourceSlots.push(e)):(_.sources=[this],_.sourceSlots=[e]),this.observers?(this.observers.push(_),this.observerSlots.push(_.sources.length-1)):(this.observers=[_],this.observerSlots=[_.sources.length-1])}return this.value}function Ye(e,t,n){let o=e.value;return(!e.comparator||!e.comparator(o,t))&&(e.value=t,e.observers&&e.observers.length&&oe(()=>{for(let r=0;r<e.observers.length;r+=1){const s=e.observers[r],l=Ce&&Ce.running;l&&Ce.disposed.has(s),(l?!s.tState:!s.state)&&(s.pure?E.push(s):G.push(s),s.observers&&Qe(s)),l||(s.state=J)}if(E.length>1e6)throw E=[],new Error},!1)),t}function be(e){if(!e.fn)return;ke(e);const t=S,n=_,o=_e;_=S=e,vt(e,e.value,o),_=n,S=t}function vt(e,t,n){let o;try{o=e.fn(t)}catch(r){return e.pure&&(e.state=J,e.owned&&e.owned.forEach(ke),e.owned=null),e.updatedAt=n+1,et(r)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Ye(e,o):e.value=o,e.updatedAt=n)}function Xe(e,t,n,o=J,r){const s={fn:e,state:o,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:S,context:S?S.context:null,pure:n};return S===null||S!==Ke&&(S.owned?S.owned.push(s):S.owned=[s]),s}function We(e){if(e.state===0)return;if(e.state===me)return pe(e);if(e.suspense&&M(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<_e);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===J)be(e);else if(e.state===me){const o=E;E=null,oe(()=>pe(e,t[0]),!1),E=o}}function oe(e,t){if(E)return e();let n=!1;t||(E=[]),G?n=!0:G=[],_e++;try{const o=e();return Ct(n),o}catch(o){n||(G=null),E=null,et(o)}}function Ct(e){if(E&&(Ze(E),E=null),e)return;const t=G;G=null,t.length&&oe(()=>kt(t),!1)}function Ze(e){for(let t=0;t<e.length;t++)We(e[t])}function pe(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const o=e.sources[n];if(o.sources){const r=o.state;r===J?o!==t&&(!o.updatedAt||o.updatedAt<_e)&&We(o):r===me&&pe(o,t)}}}function Qe(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=me,n.pure?E.push(n):G.push(n),n.observers&&Qe(n))}}function ke(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),o=e.sourceSlots.pop(),r=n.observers;if(r&&r.length){const s=r.pop(),l=n.observerSlots.pop();o<r.length&&(s.sourceSlots[l]=o,r[o]=s,n.observerSlots[o]=l)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)ke(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function $t(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function et(e,t=S){throw $t(e)}function Te(e){if(typeof e=="function"&&!e.length)return Te(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const o=Te(e[n]);Array.isArray(o)?t.push.apply(t,o):t.push(o)}return t}return e}const xt=Symbol("fallback");function Ue(e){for(let t=0;t<e.length;t++)e[t]()}function At(e,t,n={}){let o=[],r=[],s=[],l=0,a=t.length>1?[]:null;return St(()=>Ue(s)),()=>{let c=e()||[],m,i;return c[bt],M(()=>{let u=c.length,b,$,w,P,d,f,h,g,x;if(u===0)l!==0&&(Ue(s),s=[],o=[],r=[],l=0,a&&(a=[])),n.fallback&&(o=[xt],r[0]=ie(Se=>(s[0]=Se,n.fallback())),l=1);else if(l===0){for(r=new Array(u),i=0;i<u;i++)o[i]=c[i],r[i]=ie(y);l=u}else{for(w=new Array(u),P=new Array(u),a&&(d=new Array(u)),f=0,h=Math.min(l,u);f<h&&o[f]===c[f];f++);for(h=l-1,g=u-1;h>=f&&g>=f&&o[h]===c[g];h--,g--)w[g]=r[h],P[g]=s[h],a&&(d[g]=a[h]);for(b=new Map,$=new Array(g+1),i=g;i>=f;i--)x=c[i],m=b.get(x),$[i]=m===void 0?-1:m,b.set(x,i);for(m=f;m<=h;m++)x=o[m],i=b.get(x),i!==void 0&&i!==-1?(w[i]=r[m],P[i]=s[m],a&&(d[i]=a[m]),i=$[i],b.set(x,i)):s[m]();for(i=f;i<u;i++)i in w?(r[i]=w[i],s[i]=P[i],a&&(a[i]=d[i],a[i](i))):r[i]=ie(y);r=r.slice(0,l=u),o=c.slice(0)}return r});function y(u){if(s[i]=u,a){const[b,$]=j(i);return a[i]=$,t(c[i],b)}return t(c[i])}}}function q(e,t){return M(()=>e(t||{}))}const tt=e=>`Stale read from <${e}>.`;function nt(e){const t="fallback"in e&&{fallback:()=>e.fallback};return N(At(()=>e.each,e.children,t||void 0))}function Re(e){const t=e.keyed,n=N(()=>e.when,void 0,{equals:(o,r)=>t?o===r:!o==!r});return N(()=>{const o=n();if(o){const r=e.children;return typeof r=="function"&&r.length>0?M(()=>r(t?o:()=>{if(!M(n))throw tt("Show");return e.when})):r}return e.fallback},void 0,void 0)}function Et(e){let t=!1;const n=(s,l)=>s[0]===l[0]&&(t?s[1]===l[1]:!s[1]==!l[1])&&s[2]===l[2],o=wt(()=>e.children),r=N(()=>{let s=o();Array.isArray(s)||(s=[s]);for(let l=0;l<s.length;l++){const a=s[l].when;if(a)return t=!!s[l].keyed,[l,a,s[l]]}return[-1]},void 0,{equals:n});return N(()=>{const[s,l,a]=r();if(s<0)return e.fallback;const c=a.children;return typeof c=="function"&&c.length>0?M(()=>c(t?l:()=>{if(M(r)[0]!==s)throw tt("Match");return a.when})):c},void 0,void 0)}function $e(e){return e}function qt(e,t,n){let o=n.length,r=t.length,s=o,l=0,a=0,c=t[r-1].nextSibling,m=null;for(;l<r||a<s;){if(t[l]===n[a]){l++,a++;continue}for(;t[r-1]===n[s-1];)r--,s--;if(r===l){const i=s<o?a?n[a-1].nextSibling:n[s-a]:c;for(;a<s;)e.insertBefore(n[a++],i)}else if(s===a)for(;l<r;)(!m||!m.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[s-1]&&n[a]===t[r-1]){const i=t[--r].nextSibling;e.insertBefore(n[a++],t[l++].nextSibling),e.insertBefore(n[--s],i),t[r]=n[s]}else{if(!m){m=new Map;let y=a;for(;y<s;)m.set(n[y],y++)}const i=m.get(t[l]);if(i!=null)if(a<i&&i<s){let y=l,u=1,b;for(;++y<r&&y<s&&!((b=m.get(t[y]))==null||b!==i+u);)u++;if(u>i-a){const $=t[l];for(;a<i;)e.insertBefore(n[a++],$)}else e.replaceChild(n[a++],t[l++])}else l++;else t[l++].remove()}}}const De="_$DX_DELEGATE";function T(e,t,n){let o;const r=()=>{const l=document.createElement("template");return l.innerHTML=e,n?l.content.firstChild.firstChild:l.content.firstChild},s=t?()=>M(()=>document.importNode(o||(o=r()),!0)):()=>(o||(o=r())).cloneNode(!0);return s.cloneNode=s,s}function rt(e,t=window.document){const n=t[De]||(t[De]=new Set);for(let o=0,r=e.length;o<r;o++){const s=e[o];n.has(s)||(n.add(s),t.addEventListener(s,Nt))}}function F(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function ce(e,t,n,o){if(o)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const r=n[0];e.addEventListener(t,n[0]=s=>r.call(e,n[1],s))}else e.addEventListener(t,n)}function Pt(e,t,n){if(!t)return n?F(e,"style"):t;const o=e.style;if(typeof t=="string")return o.cssText=t;typeof n=="string"&&(o.cssText=n=void 0),n||(n={}),t||(t={});let r,s;for(s in n)t[s]==null&&o.removeProperty(s),delete n[s];for(s in t)r=t[s],r!==n[s]&&(o.setProperty(s,r),n[s]=r);return n}function Fe(e,t,n){return M(()=>e(t,n))}function C(e,t,n,o){if(n!==void 0&&!o&&(o=[]),typeof t!="function")return de(e,t,o,n);R(r=>de(e,t(),r,n),o)}function Nt(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}});n;){const o=n[t];if(o&&!n.disabled){const r=n[`${t}Data`];if(r!==void 0?o.call(n,r,e):o.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function de(e,t,n,o,r){for(;typeof n=="function";)n=n();if(t===n)return n;const s=typeof t,l=o!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,s==="string"||s==="number")if(s==="number"&&(t=t.toString()),l){let a=n[0];a&&a.nodeType===3?a.data=t:a=document.createTextNode(t),n=K(e,n,o,a)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t;else if(t==null||s==="boolean")n=K(e,n,o);else{if(s==="function")return R(()=>{let a=t();for(;typeof a=="function";)a=a();n=de(e,a,n,o)}),()=>n;if(Array.isArray(t)){const a=[],c=n&&Array.isArray(n);if(Ie(a,t,n,r))return R(()=>n=de(e,a,n,o,!0)),()=>n;if(a.length===0){if(n=K(e,n,o),l)return n}else c?n.length===0?je(e,a,o):qt(e,n,a):(n&&K(e),je(e,a));n=a}else if(t.nodeType){if(Array.isArray(n)){if(l)return n=K(e,n,o,t);K(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function Ie(e,t,n,o){let r=!1;for(let s=0,l=t.length;s<l;s++){let a=t[s],c=n&&n[s],m;if(!(a==null||a===!0||a===!1))if((m=typeof a)=="object"&&a.nodeType)e.push(a);else if(Array.isArray(a))r=Ie(e,a,c)||r;else if(m==="function")if(o){for(;typeof a=="function";)a=a();r=Ie(e,Array.isArray(a)?a:[a],Array.isArray(c)?c:[c])||r}else e.push(a),r=!0;else{const i=String(a);c&&c.nodeType===3&&c.data===i?e.push(c):e.push(document.createTextNode(i))}}return r}function je(e,t,n=null){for(let o=0,r=t.length;o<r;o++)e.insertBefore(t[o],n)}function K(e,t,n,o){if(n===void 0)return e.textContent="";const r=o||document.createTextNode("");if(t.length){let s=!1;for(let l=t.length-1;l>=0;l--){const a=t[l];if(r!==a){const c=a.parentNode===e;!s&&!l?c?e.replaceChild(r,a):e.insertBefore(r,n):c&&a.remove()}else s=!0}}else e.insertBefore(r,n);return[r]}function Tt(e){return Object.keys(e).reduce((n,o)=>{const r=e[o];return n[o]=Object.assign({},r),st(r.value)&&!Rt(r.value)&&!Array.isArray(r.value)&&(n[o].value=Object.assign({},r.value)),Array.isArray(r.value)&&(n[o].value=r.value.slice(0)),n},{})}function It(e){return e?Object.keys(e).reduce((n,o)=>{const r=e[o];return n[o]=st(r)&&"value"in r?r:{value:r},n[o].attribute||(n[o].attribute=Ut(o)),n[o].parse="parse"in n[o]?n[o].parse:typeof n[o].value!="string",n},{}):{}}function Ot(e){return Object.keys(e).reduce((n,o)=>(n[o]=e[o].value,n),{})}function Mt(e,t){const n=Tt(t);return Object.keys(t).forEach(r=>{const s=n[r],l=e.getAttribute(s.attribute),a=e[r];l&&(s.value=s.parse?ot(l):l),a!=null&&(s.value=Array.isArray(a)?a.slice(0):a),s.reflect&&Be(e,s.attribute,s.value),Object.defineProperty(e,r,{get(){return s.value},set(c){const m=s.value;s.value=c,s.reflect&&Be(this,s.attribute,s.value);for(let i=0,y=this.__propertyChangedCallbacks.length;i<y;i++)this.__propertyChangedCallbacks[i](r,c,m)},enumerable:!0,configurable:!0})}),n}function ot(e){if(e)try{return JSON.parse(e)}catch{return e}}function Be(e,t,n){if(n==null||n===!1)return e.removeAttribute(t);let o=JSON.stringify(n);e.__updating[t]=!0,o==="true"&&(o=""),e.setAttribute(t,o),Promise.resolve().then(()=>delete e.__updating[t])}function Ut(e){return e.replace(/\.?([A-Z]+)/g,(t,n)=>"-"+n.toLowerCase()).replace("_","-").replace(/^-/,"")}function st(e){return e!=null&&(typeof e=="object"||typeof e=="function")}function Rt(e){return Object.prototype.toString.call(e)==="[object Function]"}function Dt(e){return typeof e=="function"&&e.toString().indexOf("class")===0}let xe;function Ft(e,t){const n=Object.keys(t);return class extends e{static get observedAttributes(){return n.map(r=>t[r].attribute)}constructor(){super(),this.__initialized=!1,this.__released=!1,this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props={}}connectedCallback(){if(this.__initialized)return;this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props=Mt(this,t);const r=Ot(this.props),s=this.Component,l=xe;try{xe=this,this.__initialized=!0,Dt(s)?new s(r,{element:this}):s(r,{element:this})}finally{xe=l}}async disconnectedCallback(){if(await Promise.resolve(),this.isConnected)return;this.__propertyChangedCallbacks.length=0;let r=null;for(;r=this.__releaseCallbacks.pop();)r(this);delete this.__initialized,this.__released=!0}attributeChangedCallback(r,s,l){if(this.__initialized&&!this.__updating[r]&&(r=this.lookupProp(r),r in t)){if(l==null&&!this[r])return;this[r]=t[r].parse?ot(l):l}}lookupProp(r){if(t)return n.find(s=>r===s||r===t[s].attribute)}get renderRoot(){return this.shadowRoot||this.attachShadow({mode:"open"})}addReleaseCallback(r){this.__releaseCallbacks.push(r)}addPropertyChangedCallback(r){this.__propertyChangedCallbacks.push(r)}}}function jt(e,t={},n={}){const{BaseElement:o=HTMLElement,extension:r}=n;return s=>{if(!e)throw new Error("tag is required to register a Component");let l=customElements.get(e);return l?(l.prototype.Component=s,l):(l=Ft(o,It(t)),l.prototype.Component=s,l.prototype.registeredTag=e,customElements.define(e,l,r),l)}}function Bt(e){const t=Object.keys(e),n={};for(let o=0;o<t.length;o++){const[r,s]=j(e[t[o]]);Object.defineProperty(n,t[o],{get:r,set(l){s(()=>l)}})}return n}function Lt(e){if(e.assignedSlot&&e.assignedSlot._$owner)return e.assignedSlot._$owner;let t=e.parentNode;for(;t&&!t._$owner&&!(t.assignedSlot&&t.assignedSlot._$owner);)t=t.parentNode;return t&&t.assignedSlot?t.assignedSlot._$owner:e._$owner}function Ht(e){return(t,n)=>{const{element:o}=n;return ie(r=>{const s=Bt(t);o.addPropertyChangedCallback((a,c)=>s[a]=c),o.addReleaseCallback(()=>{o.renderRoot.textContent="",r()});const l=e(s,n);return C(o.renderRoot,l)},Lt(o))}}function Gt(e,t,n){return arguments.length===2&&(n=t,t={}),jt(e,t)(Ht(n))}const W={AppealForm:{currency:typeof adblock=="object"&&adblock.settings.currency||"USD",selected:3},Paddle:{sandbox:{vendor:11004,products:{USD:{once:{1e3:46028,1500:46029,2e3:46030,3500:46031,5e3:46032,custom:500},monthly:{199:46074,299:46075,399:46076,499:46077,999:46078,custom:199},yearly:{1e3:46079,1500:46080,2e3:46081,3500:46082,5e3:46083,custom:500}},AUD:{once:{1e3:46033,1500:46034,2e3:46035,3500:46036,5e3:46037,custom:500},monthly:{199:46084,299:46085,399:46086,499:46087,999:46088,custom:199},yearly:{1e3:46089,1500:46090,2e3:46091,3500:46092,5e3:46093,custom:500}},CAD:{once:{1e3:46038,1500:46039,2e3:46040,3500:46041,5e3:46042,custom:500},monthly:{199:46094,299:46095,399:46096,499:46097,999:46098,custom:199},yearly:{1e3:46099,1500:46181,2e3:46182,3500:46183,5e3:46184,custom:500}},EUR:{once:{1e3:46048,1500:46049,2e3:46050,3500:46051,5e3:46052,custom:500},monthly:{199:46195,299:46196,399:46197,499:46198,999:46199,custom:199},yearly:{1e3:46200,1500:46201,2e3:46202,3500:46203,5e3:46204,custom:500}},GBP:{once:{1e3:46053,1500:46054,2e3:46055,3500:46056,5e3:46057,custom:500},monthly:{199:46205,299:46206,399:46207,499:46208,999:46209,custom:199},yearly:{1e3:46210,1500:46211,2e3:46212,3500:46213,5e3:46214,custom:500}},JPY:{once:{1500:46064,2e3:46065,2500:46066,3500:46067,5e3:46068,custom:500},monthly:{200:46225,300:46226,500:46227,1e3:46228,1500:46229,custom:200},yearly:{1500:46230,2e3:46231,2500:46232,3500:46233,5e3:46234,custom:500}},NZD:{once:{1e3:46058,1500:46059,2e3:46060,3500:46062,5e3:46063,custom:500},monthly:{199:46215,299:46216,399:46217,499:46218,999:46219,custom:199},yearly:{1e3:46220,1500:46221,2e3:46222,3500:46223,5e3:46224,custom:500}},CHF:{once:{1e3:46043,1500:46044,2e3:46045,3500:46046,5e3:46047,custom:500},monthly:{199:46185,299:46186,399:46187,499:46188,999:46189,custom:199},yearly:{1e3:46190,1500:46191,2e3:46192,3500:46193,5e3:46194,custom:500}},RUB:{once:{25e3:46069,5e4:46070,1e5:46071,25e4:46072,5e5:46073,custom:25e3},monthly:{15e3:46235,25e3:46236,4e4:46237,5e4:46238,1e5:46239,custom:15e3},yearly:{25e3:46240,5e4:46241,1e5:46242,25e4:46243,5e5:46244,custom:25e3}}}},live:{vendor:164164,products:{USD:{once:{1e3:816549,1500:816550,2e3:816551,3500:816552,5e3:816553,custom:500},monthly:{199:816774,299:816775,399:816776,499:816777,999:816778,custom:199},yearly:{1e3:816779,1500:816780,2e3:816781,3500:816782,5e3:816783,custom:500}},AUD:{once:{1e3:816522,1500:816523,2e3:816524,3500:816525,5e3:816526,custom:500},monthly:{199:816692,299:816693,399:816694,499:816696,999:816697,custom:199},yearly:{1e3:816699,1500:816700,2e3:816702,3500:816703,5e3:816705,custom:500}},CAD:{once:{1e3:816528,1500:816529,2e3:816530,3500:816531,5e3:816532,custom:500},monthly:{199:816706,299:816708,399:816710,499:816711,999:816712,custom:199},yearly:{1e3:816714,1500:816715,2e3:816716,3500:816717,5e3:816718,custom:500}},EUR:{once:{1e3:816517,1500:816518,2e3:816519,3500:816520,5e3:816521,custom:500},monthly:{199:816681,299:816682,399:816683,499:816684,999:816686,custom:199},yearly:{1e3:816687,1500:816688,2e3:816689,3500:816690,5e3:816691,custom:500}},GBP:{once:{1e3:816538,1500:816539,2e3:816540,3500:816541,5e3:816542,custom:500},monthly:{199:816734,299:816735,399:816736,499:816737,999:816738,custom:199},yearly:{1e3:816739,1500:816740,2e3:816741,3500:816743,5e3:816744,custom:500}},JPY:{once:{1500:816554,2e3:816555,2500:816556,3500:816557,5e3:816558,custom:500},monthly:{200:816784,300:816785,500:816786,1e3:816787,1500:816788,custom:200},yearly:{1500:816789,2e3:816791,2500:816792,3500:816794,5e3:816795,custom:500}},NZD:{once:{1e3:816543,1500:816544,2e3:816545,3500:816547,5e3:816548,custom:500},monthly:{199:816760,299:816762,399:816764,499:816766,999:816768,custom:199},yearly:{1e3:816769,1500:816770,2e3:816771,3500:816772,5e3:816773,custom:500}},CHF:{once:{1e3:816533,1500:816535,2e3:816534,3500:816536,5e3:816537,custom:500},monthly:{199:816720,299:816722,399:816723,499:816725,999:816726,custom:199},yearly:{1e3:816727,1500:816728,2e3:816730,3500:816731,5e3:816733,custom:500}},RUB:{once:{25e3:816559,5e4:816560,1e5:816561,25e4:816562,5e5:816563,custom:25e3},monthly:{15e3:816796,25e3:816797,4e4:816799,5e4:816800,1e5:816801,custom:15e3},yearly:{25e3:816802,5e4:816803,1e5:816804,25e4:816805,5e5:816806,custom:25e3}}}}}},Me=at();adblock.config.paddle=Me;const lt=Me==W.Paddle.sandbox;lt&&Paddle.Environment.set("sandbox");Paddle.Setup({vendor:Me.vendor});eyeo=eyeo||{};eyeo.payment=eyeo.payment||{};function at(){let t=[/^localhost$/,/^[\w\-]+.staging-new-adblockplus-org-1.uplink.eyeo.it$/,/^dev--adblockplus-org--[\w\-]+.web.app$/].some(n=>n.test(location.hostname))?W.Paddle.sandbox:W.Paddle.live;return adblock.searchParameters.has("testmode")||adblock.searchParameters.get("mode")=="test"?t=W.Paddle.sandbox:adblock.searchParameters.get("mode")=="live"&&(t=W.Paddle.live),t}function Jt(e){return JSON.stringify({amount:e.amount,frequency:e.frequency,processor:"paddle",currency:e.currency,lang:document.documentElement.lang,source:eyeo.payment.sourceId||"U",clickTs:Date.now()})}function zt(e){const t=new URLSearchParams;return eyeo.payment.productId=="ME"&&(t.append("thankyou",1),t.append("var",1),t.append("u",forceGetUserId()),t.append("from",eyeo.payment.variantName||"null"),t.append("from__currency",e.currency),t.append("from__amount",Z(e.currency,e.amount)),t.append("from__frequency",e.frequency)),t}function Kt(e,t){return{testmode:lt,userid:eyeo.payment.productId=="ME"?forceGetUserId():"",tracking:recordTracking(),locale:"",country:"unknown",ga_id:"",premium:eyeo.payment.productId=="ME"?"true":"false",premium_cid:"0",premium_sid:"0",currency:e.currency,recurring:e.frequency!="once",subType:e.frequency!="once"?e.frequency:"",experiment:"",experiment_id:"",variant:"",variant_index:-1,amount_cents:parseInt(e.amount,10),success_url:`${eyeo.payment.paymentCompleteUrl||"/payment-complete"}?${t.toString()}`,cancel_url:location.href}}function Vt(e,t){return{locale:adblock.settings.language,title:adblock.strings["appeal-form-checkout__title"],success:`${eyeo.payment.paymentCompleteUrl||"/payment-complete"}?${e.toString()}`,closeCallback:t}}function Yt(e,t,n,o){e=="custom"?fetch("https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then(r=>r.json()).then(r=>{if(r.hasOwnProperty("success")&&r.success==!1)throw new Error;Paddle.Checkout.open(Object.assign(n,{override:r.url}))}).catch(r=>{console.error(r),adblock.error(adblock.strings["error--unexpected"]),o&&o(r),appealForm.enable()}):Paddle.Checkout.open(Object.assign(n,{allowQuantity:!1,passthrough:t,product:e}))}const Xt=T('<fieldset class="appeal-form-frequency"><legend class="appeal-form-frequency__heading"></legend><div class="appeal-form-frequency__options"><div class="appeal-form-amounts"><label class="appeal-form-amount appeal-form-amount--custom"><input type="radio" name="appeal-form-amount__radio" class="appeal-form-amount__radio" value="custom" data-product="custom"><input type="number" step=".01" class="appeal-form-amount__input" name="appeal-form-amount__input" data-product="custom" placeholder="35" data-minimum="5">'),Wt=T('<label class="appeal-form-amount appeal-form-amount--fixed"><input type="radio" name="appeal-form-amount__radio" class="appeal-form-amount__radio"><span class="appeal-form-amount__text">');function Le(e){let t,n;return(()=>{const o=Xt(),r=o.firstChild,s=r.nextSibling,l=s.firstChild,a=l.firstChild,c=a.firstChild,m=c.nextSibling;ce(o,"click",e.onClick,!0),r.$$click=u=>u.stopPropagation(),C(l,q(nt,{get each(){return Object.keys(e.products)},children:(u,b)=>{if(u!=="custom")return(()=>{const $=Wt(),w=$.firstChild,P=w.nextSibling;return ce(w,"change",e.onChange),w.value=u,C(P,()=>Oe(e.currency,u)),R(d=>{const f=`appeal-form-amount__radio--${e.frequency}-${b()}`,h=e.frequency,g=e.products[u];return f!==d._v$7&&F(w,"data-testid",d._v$7=f),h!==d._v$8&&F(w,"data-frequency",d._v$8=h),g!==d._v$9&&F(w,"data-product",d._v$9=g),d},{_v$7:void 0,_v$8:void 0,_v$9:void 0}),R(()=>w.checked=e.products[u]===e.checkedProduct),$})()}}),a),c.$$click=()=>n.focus();const i=t;typeof i=="function"?Fe(i,c):t=c,ce(m,"input",e.onChange,!0),m.addEventListener("focus",()=>t.click());const y=n;return typeof y=="function"?Fe(y,m):n=m,C(o,()=>e.children,null),R(u=>{const b=`border-color: ${e.active?"#2196f3":"#e0e0e0"}`,$=e.legendText,w=`appeal-form-amount__radio--${e.frequency}-6`,P=e.frequency,d=`appeal-form-amount__input--${e.frequency}`,f=e.frequency;return u._v$=Pt(o,b,u._v$),$!==u._v$2&&(r.innerHTML=u._v$2=$),w!==u._v$3&&F(c,"data-testid",u._v$3=w),P!==u._v$4&&F(c,"data-frequency",u._v$4=P),d!==u._v$5&&F(m,"data-testid",u._v$5=d),f!==u._v$6&&F(m,"data-frequency",u._v$6=f),u},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0}),o})()}rt(["click","input"]);const Zt=T('<div class="toggle-wrap"><div class="toggle-main-txt">Monthly</div><label class="switch"><input class="toggle-input" type="checkbox" value="frequency"><span class="slider round"></span></label><div class="toggle-main-txt">Yearly');function Qt(e){return(()=>{const t=Zt(),n=t.firstChild,o=n.nextSibling,r=o.firstChild;return ce(r,"click",e.onClick,!0),t})()}rt(["click"]);const en=T('<p id="monthly" class="premium-upsell__monthly">Nice! A monthly <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium. Thanks for your support.'),tn=T('<p id="yearly" class="premium-upsell__yearly">Nice! A yearly <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium. Thanks for your support.'),nn=T('<p id="one-year" class="premium-upsell__months">Nice! A <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium for <!> <span class="premium-upsell__duration"></span> <!>. Thanks for your support.'),rn=T('<div id="what-is-included" class="info premium-upsell"><span class="info-line premium-upsell__border-start">');function on(e){const t=N(()=>sn(e.products,e.amount,e.frequency)),n=N(()=>Oe(e.currency,e.amount));return(()=>{const o=rn();return o.firstChild,C(o,q(Et,{get children(){return[q($e,{get when(){return e.frequency==="monthly"},get children(){const r=en(),s=r.firstChild,l=s.nextSibling,a=l.nextSibling;return C(a,n),r}}),q($e,{get when(){return e.frequency==="yearly"},get children(){const r=tn(),s=r.firstChild,l=s.nextSibling,a=l.nextSibling;return C(a,n),r}}),q($e,{get when(){return e.frequency==="once"},get children(){const r=nn(),s=r.firstChild,l=s.nextSibling,a=l.nextSibling,c=a.nextSibling,m=c.nextSibling,i=m.nextSibling,y=i.nextSibling,u=y.nextSibling,b=u.nextSibling;return b.nextSibling,C(a,n),C(r,(()=>{const $=N(()=>!!t().frequencyClassSuffix.match(/month/));return()=>$()?t().durationMonths:t().durationText})(),m),C(r,()=>t().frequencyClassSuffix,b),r}})]}}),null),o})()}function sn(e,t,n){const o=parseInt(t,10),r=parseInt(Object.keys(e.once)[2],10),s=parseInt(Object.keys(e.monthly)[0],10);let l,a,c=n;return o<r?(l=Math.floor(o/s),c="months",a=l):(l=Math.floor(o/r),c=l===1?"year":"years",a=12*l),{durationText:l,durationMonths:a,frequencyClassSuffix:c}}const ln=`.appeal-form{margin-top:1rem;margin-bottom:1rem}.appeal-form__placeholder{position:relative;display:inline-block;overflow:hidden;height:1em;border-radius:3px;background-color:#e6e6e6}.appeal-form__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;content:"";transform:translate(-100%);animation:shimmer 3s infinite;background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0))}@-webkit-keyframes shimmer{to{transform:translate(100%)}}@keyframes shimmer{to{transform:translate(100%)}}.appeal-form-header{margin-bottom:2.5rem}.appeal-form-header__heading{font-size:1.125rem;display:inline-block;margin:0;margin-right:.5rem}.appeal-form-header__select{font-size:.875rem}.appeal-form-frequencies{display:flex;flex-wrap:wrap;gap:3rem;max-width:53.125rem;margin-top:.5rem;margin-bottom:1.5rem}@media (min-width: 55.125rem){.appeal-form-frequencies{gap:2rem}}.appeal-form-frequency{position:relative;flex:0 0 90%;border-radius:.25rem;border-width:1px;border-color:#e6e6e6;padding:1rem 0}@media (min-width: 55.125rem){.appeal-form-frequency{flex:1}}.appeal-form-frequency__heading{position:absolute;top:-2rem;font-size:1rem;font-weight:400;margin-top:0;margin-bottom:.375rem}.appeal-form-frequency__options{padding:0 0 .5rem}.appeal-form-amounts{display:flex;flex-wrap:wrap;align-items:center;padding:0 1rem}[dir=rtl] .appeal-form-amounts{padding-left:1rem}.appeal-form-amount{line-height:1.7;display:flex;width:33.33333333%}[dir=rtl] .appeal-form-amount__radio{margin-right:0}.appeal-form-amount__text{padding-top:1.5px}.appeal-form-amount__input{font-size:.875rem;width:100%;height:1.2rem;margin-top:.1875rem;padding:.125rem .25rem;border:1px solid gray}[dir=rtl] .appeal-form-amount__input{margin-left:.1875rem}@media (min-width: 55.125rem){.appeal-form-checkout{display:flex}}.appeal-form-checkout__submit{font-size:.9375rem;font-weight:700;display:flex;align-items:center;justify-content:center;width:100%;height:2rem;margin-bottom:1rem;margin-right:1rem;text-align:center;color:#fff;border:0;border-radius:3.5px;background-color:#0047ff;box-shadow:0 0 1px #0003;cursor:pointer}.appeal-form-checkout__submit:disabled{filter:grayscale(100)}@media (min-width: 23.75rem){.appeal-form-checkout__submit{max-width:14rem}:not([dir=rtl]) .appeal-form-checkout__submit{margin-right:1rem}[dir=rtl] .appeal-form-checkout__submit{margin-left:1rem}}@media (min-width: 55.125rem){.appeal-form-checkout__submit{margin-bottom:0}}.appeal-form-checkout__icon{height:1rem}[dir=rtl] .appeal-form-checkout__icon{margin-left:.25rem}.appeal-form-checkout__image{width:100%;max-width:340px;max-height:32px}.toggle-wrap{position:absolute;top:-38px;right:-1rem;padding:0 2px;background-color:#fff;display:flex;align-items:center;font-family:Source Sans Pro;font-style:normal;font-weight:300;font-size:11px;line-height:34px;height:34px;color:#000}@media (min-width: 55.125rem){.toggle-wrap{right:.5rem}}.switch{position:relative;display:inline-block;width:44px;height:22px;margin:0 10px}.switch input{opacity:0;width:0;height:0}.slider.round{border-radius:34px}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#2196f3;-webkit-transition:.4s;transition:.4s}.slider.round:before{border-radius:50%}.slider:before{position:absolute;content:"";width:18px;height:18px;left:2px;bottom:2px;background-color:#fff;-webkit-transition:.4s;transition:.4s}input:checked+.slider:before{-webkit-transform:translateX(22px);-ms-transform:translateX(22px);transform:translate(22px)}.premium-upsell{display:flex;border:1px solid #666666;border-radius:10px;margin:1rem 0;padding:.5rem}.premium-upsell__border-start{display:flex;width:.5rem;background-color:#2284f7;border-radius:4px;align-items:stretch}.premium-upsell>p{margin:.5rem 0;margin-inline-start:1rem}.appeal-form__error{color:red;font-size:.875rem;padding:1rem;border:1px solid #ff0000;border-radius:10px;margin-bottom:1rem}
`,an=T('<header class="appeal-form-header"><h2 class="appeal-form-header__heading" data-testid="appeal-form-header__heading"></h2><select class="appeal-form-header__select" data-testid="appeal-form-header__select">'),cn=T('<div class="appeal-form__error" data-testid="appeal-form__error">'),un=T('<form class="appeal-form"><div class="appeal-form-frequencies"></div><div class="appeal-form-checkout"><input class="appeal-form-checkout__submit" data-testid="appeal-form-checkout__submit" type="submit"><img alt="" src="/components/AppealForm/appeal-form-checkout__image.svg" class="appeal-form-checkout__image">'),mn=T("<style>"),pn=T("<option>"),D=at(),dn=3500,fn=typeof adblock=="object"&&adblock.settings.currency||"USD",se=adblock.strings;function hn(){const[e,t]=j("monthly"),[n,o]=j(dn),[r,s]=j("once"),[l,a]=j(!1),[c,m]=j(fn),[i,y]=j(null),u=()=>r()==="once"?"once":e(),b=d=>{if(d.preventDefault(),!n()){adblock.error("No amount selected.");return}a(!0);const f=u(),h={product:D.products[c()][f][n()],frequency:f,currency:c(),amount:n()},g=Jt(h),x=zt(h);eyeo.payment.productId="ME",eyeo.payment.variantName="update__202308",eyeo.payment.paymentCompleteUrl="https://accounts.adblockplus.org/premium",eyeo.payment.shouldStoreContributionInfo&&localStorage.setItem("contributionInfo",g),eyeo.payment.shouldStoreContributionInfo&&eyeo.payment.productId=="ME"&&x.append("from__contributionInfo",g);const Se=Kt(h,x),it=Vt(x,()=>{a(!1)});Yt(h.product,Se,it,ct=>{a(!1),y(ct.message)})},$=d=>{const f=d.target.checked?"yearly":"monthly",h=3,g=Number(Object.keys(D.products[c()][f])[h]);o(g),t(f),s("recurring")},w=d=>{m(d.target.value)},P=d=>f=>{s(d);let h;f.target.type==="number"&&c()!=="JPY"?h=f.target.value*100:h=Number(f.target.value);const g=u();if((g==="once"||g==="yearly")&&h<500){y(adblock.strings[`appeal-form__error--${g}`]);return}if(h<199){y(adblock.strings["appeal-form__error--monthly"]);return}y(null),o(h)};return[(()=>{const d=an(),f=d.firstChild,h=f.nextSibling;return C(f,()=>se["appeal-form-header__heading"]),h.addEventListener("change",w),C(h,q(nt,{get each(){return Object.keys(D.products)},children:g=>(()=>{const x=pn();return x.value=g,C(x,g),x})()})),d})(),(()=>{const d=un(),f=d.firstChild,h=f.nextSibling,g=h.firstChild;return d.addEventListener("submit",b),C(f,q(Le,{frequency:"once",get products(){return D.products[c()].once},get legendText(){return se["appeal-form-frequency__heading--once"]},get currency(){return c()},get checkedProduct(){return N(()=>u()==="once")()&&D.products[c()].once[n()]},get active(){return r()==="once"},get onChange(){return P("once")}}),null),C(f,q(Le,{get frequency(){return e()},get products(){return D.products[c()][e()]},get legendText(){return se[`appeal-form-frequency__heading--${e()}`]},get currency(){return c()},get checkedProduct(){return N(()=>r()==="recurring")()&&D.products[c()][e()][n()]},get active(){return r()==="recurring"},get onChange(){return P("recurring")},get children(){return q(Qt,{onClick:$})}}),null),C(d,q(Re,{get when(){return!i()},get children(){return q(on,{get products(){return D.products[c()]},get currency(){return c()},get amount(){return n()},get frequency(){return u()}})}}),h),C(d,q(Re,{get when(){return i()},get children(){const x=cn();return R(()=>x.innerHTML=i()),x}}),h),R(()=>g.disabled=l()||i()),R(()=>g.value=se["appeal-form-checkout__submit"]),d})(),(()=>{const d=mn();return C(d,ln),d})()]}Gt("appeal-form",()=>q(hn,{}));
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
