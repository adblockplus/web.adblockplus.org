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

var Ne=Object.defineProperty;var qe=(e,t,r)=>t in e?Ne(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Q=(e,t,r)=>(qe(e,typeof t!="symbol"?t+"":t,r),r),X=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var i=(e,t,r)=>(X(e,t,"read from private field"),r?r.call(e):t.get(e)),d=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},A=(e,t,r,n)=>(X(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r);var f=(e,t,r)=>(X(e,t,"access private method"),r);const v={AppealForm:{currency:typeof adblock=="object"&&adblock.settings.currency||"USD",selected:3},Paddle:{sandbox:{vendor:11004,products:{USD:{once:{1e3:46028,1500:46029,2e3:46030,3500:46031,5e3:46032,custom:500},monthly:{199:46074,299:46075,399:46076,499:46077,999:46078,custom:199},yearly:{1e3:46079,1500:46080,2e3:46081,3500:46082,5e3:46083,custom:500}},AUD:{once:{1e3:46033,1500:46034,2e3:46035,3500:46036,5e3:46037,custom:500},monthly:{199:46084,299:46085,399:46086,499:46087,999:46088,custom:199},yearly:{1e3:46089,1500:46090,2e3:46091,3500:46092,5e3:46093,custom:500}},CAD:{once:{1e3:46038,1500:46039,2e3:46040,3500:46041,5e3:46042,custom:500},monthly:{199:46094,299:46095,399:46096,499:46097,999:46098,custom:199},yearly:{1e3:46099,1500:46181,2e3:46182,3500:46183,5e3:46184,custom:500}},EUR:{once:{1e3:46048,1500:46049,2e3:46050,3500:46051,5e3:46052,custom:500},monthly:{199:46195,299:46196,399:46197,499:46198,999:46199,custom:199},yearly:{1e3:46200,1500:46201,2e3:46202,3500:46203,5e3:46204,custom:500}},GBP:{once:{1e3:46053,1500:46054,2e3:46055,3500:46056,5e3:46057,custom:500},monthly:{199:46205,299:46206,399:46207,499:46208,999:46209,custom:199},yearly:{1e3:46210,1500:46211,2e3:46212,3500:46213,5e3:46214,custom:500}},JPY:{once:{1500:46064,2e3:46065,2500:46066,3500:46067,5e3:46068,custom:500},monthly:{200:46225,300:46226,500:46227,1e3:46228,1500:46229,custom:200},yearly:{1500:46230,2e3:46231,2500:46232,3500:46233,5e3:46234,custom:500}},NZD:{once:{1e3:46058,1500:46059,2e3:46060,3500:46062,5e3:46063,custom:500},monthly:{199:46215,299:46216,399:46217,499:46218,999:46219,custom:199},yearly:{1e3:46220,1500:46221,2e3:46222,3500:46223,5e3:46224,custom:500}},CHF:{once:{1e3:46043,1500:46044,2e3:46045,3500:46046,5e3:46047,custom:500},monthly:{199:46185,299:46186,399:46187,499:46188,999:46189,custom:199},yearly:{1e3:46190,1500:46191,2e3:46192,3500:46193,5e3:46194,custom:500}},RUB:{once:{25e3:46069,5e4:46070,1e5:46071,25e4:46072,5e5:46073,custom:25e3},monthly:{15e3:46235,25e3:46236,4e4:46237,5e4:46238,1e5:46239,custom:15e3},yearly:{25e3:46240,5e4:46241,1e5:46242,25e4:46243,5e5:46244,custom:25e3}}}},live:{vendor:164164,products:{USD:{once:{1e3:816549,1500:816550,2e3:816551,3500:816552,5e3:816553,custom:500},monthly:{199:816774,299:816775,399:816776,499:816777,999:816778,custom:199},yearly:{1e3:816779,1500:816780,2e3:816781,3500:816782,5e3:816783,custom:500}},AUD:{once:{1e3:816522,1500:816523,2e3:816524,3500:816525,5e3:816526,custom:500},monthly:{199:816692,299:816693,399:816694,499:816696,999:816697,custom:199},yearly:{1e3:816699,1500:816700,2e3:816702,3500:816703,5e3:816705,custom:500}},CAD:{once:{1e3:816528,1500:816529,2e3:816530,3500:816531,5e3:816532,custom:500},monthly:{199:816706,299:816708,399:816710,499:816711,999:816712,custom:199},yearly:{1e3:816714,1500:816715,2e3:816716,3500:816717,5e3:816718,custom:500}},EUR:{once:{1e3:816517,1500:816518,2e3:816519,3500:816520,5e3:816521,custom:500},monthly:{199:816681,299:816682,399:816683,499:816684,999:816686,custom:199},yearly:{1e3:816687,1500:816688,2e3:816689,3500:816690,5e3:816691,custom:500}},GBP:{once:{1e3:816538,1500:816539,2e3:816540,3500:816541,5e3:816542,custom:500},monthly:{199:816734,299:816735,399:816736,499:816737,999:816738,custom:199},yearly:{1e3:816739,1500:816740,2e3:816741,3500:816743,5e3:816744,custom:500}},JPY:{once:{1500:816554,2e3:816555,2500:816556,3500:816557,5e3:816558,custom:500},monthly:{200:816784,300:816785,500:816786,1e3:816787,1500:816788,custom:200},yearly:{1500:816789,2e3:816791,2500:816792,3500:816794,5e3:816795,custom:500}},NZD:{once:{1e3:816543,1500:816544,2e3:816545,3500:816547,5e3:816548,custom:500},monthly:{199:816760,299:816762,399:816764,499:816766,999:816768,custom:199},yearly:{1e3:816769,1500:816770,2e3:816771,3500:816772,5e3:816773,custom:500}},CHF:{once:{1e3:816533,1500:816535,2e3:816534,3500:816536,5e3:816537,custom:500},monthly:{199:816720,299:816722,399:816723,499:816725,999:816726,custom:199},yearly:{1e3:816727,1500:816728,2e3:816730,3500:816731,5e3:816733,custom:500}},RUB:{once:{25e3:816559,5e4:816560,1e5:816561,25e4:816562,5e5:816563,custom:25e3},monthly:{15e3:816796,25e3:816797,4e4:816799,5e4:816800,1e5:816801,custom:15e3},yearly:{25e3:816802,5e4:816803,1e5:816804,25e4:816805,5e5:816806,custom:25e3}}}}}};class Te{constructor(){this.callbacks={}}on(t,r){this.callbacks[t]||(this.callbacks[t]=[]),this.callbacks[t].push(r)}fire(t,r){if(this.callbacks[t])for(const n of this.callbacks[t])try{n(r)}catch(o){console.error(o)}}}function j(e,t){return e=="JPY"?t:t/100}function Oe(e,t){return e=="JPY"?t:t*100}function Me(e,t){return new Intl.NumberFormat(navigator.language,{style:"currency",currency:e,minimumFractionDigits:0}).format(j(e,t))}const Ue=document.getElementById("appeal-form"),Ie=document.getElementById("appeal-form-amount--fixed"),Re=document.getElementById("appeal-form-amount--custom");var E,w,h,C,S,U,k,T,I,oe,R,ne,P,se,F,ae,O,B,M,H,V,de,z,he,K,ye,J,ge;let re=(E=class{constructor({placeholder:t,paddleConfig:r,formConfig:n}){d(this,I);d(this,R);d(this,P);d(this,F);d(this,O);d(this,M);d(this,V);d(this,z);d(this,K);d(this,J);Q(this,"events");d(this,w,void 0);d(this,h,void 0);d(this,C,void 0);d(this,S,void 0);d(this,U,[]);d(this,k,void 0);d(this,T,void 0);this.events=new Te,A(this,w,r),A(this,h,Ue.content.cloneNode(!0).firstElementChild),i(this,h).querySelector(".appeal-form-header__heading").innerHTML=adblock.strings["appeal-form-header__heading"],i(this,h).querySelector(".appeal-form-checkout__submit").innerHTML=adblock.strings["appeal-form-checkout__submit"],A(this,k,i(this,h).querySelector(".appeal-form__error")),A(this,T,i(this,h).querySelector(".appeal-form-checkout__submit")),A(this,C,i(this,h).querySelector(".appeal-form-header__select"));for(const o in r.products){const s=document.createElement("option");s.textContent=o.toUpperCase(),s.value=o.toUpperCase(),i(this,C).appendChild(s)}i(this,C).value=n.currency,A(this,S,i(this,h).querySelector(".appeal-form-frequencies"));for(const o in r.products[n.currency]){let s=1;const a=i(this,S).querySelector(`.appeal-form-frequency--${o}`);a.querySelector(".appeal-form-frequency__heading").innerHTML=adblock.strings[`appeal-form-frequency__heading--${o}`];const l=a.querySelector(".appeal-form-amounts");for(const u in r.products[n.currency][o]){let p,c,y;u=="custom"?(p=Re.content.cloneNode(!0).firstElementChild,y=p.querySelector(".appeal-form-amount__input"),y.dataset.testid=`appeal-form-amount__input--${o}`,y.dataset.frequency=o):p=Ie.content.cloneNode(!0).firstElementChild,c=p.querySelector(".appeal-form-amount__radio"),c.dataset.testid=`appeal-form-amount__radio--${o}-${s++}`,c.dataset.frequency=o,i(this,U).push(p),l.appendChild(p)}}f(this,I,oe).call(this,n.currency),i(this,S).querySelectorAll(".appeal-form-amount__radio")[n.selected].checked=!0,i(this,C).addEventListener("change",o=>f(this,I,oe).call(this,o.currentTarget.value)),i(this,S).addEventListener("focusin",o=>f(this,z,he).call(this,o)),i(this,S).addEventListener("input",o=>f(this,K,ye).call(this,o)),i(this,h).addEventListener("submit",o=>f(this,J,ge).call(this,o)),t.replaceWith(i(this,h)),i(this,h).dataset.testid="appeal-form-constructed"}state(){const t=i(this,S).querySelector(".appeal-form-amount__radio:checked"),r=i(this,C).value,n=t.dataset.frequency,o=t.dataset.product;let s=t.value;if(s=="custom"){const a=f(this,M,H).call(this,t);s=Oe(r,parseFloat(a.value===""?a.placeholder:a.value))}else s=parseFloat(s);return{currency:r,frequency:n,product:o,amount:s}}disable(){i(this,h).classList.add("appeal-form--disabled"),i(this,h).querySelectorAll("input, button").forEach(t=>{t.disabled=!0})}enable(){i(this,h).classList.remove("appeal-form--disabled"),i(this,h).querySelectorAll("input, button").forEach(t=>{t.disabled=!1})}},w=new WeakMap,h=new WeakMap,C=new WeakMap,S=new WeakMap,U=new WeakMap,k=new WeakMap,T=new WeakMap,I=new WeakSet,oe=function(t){let r=0;for(const n in i(this,w).products[t])for(const o in i(this,w).products[t][n]){const s=i(this,U)[r++],a=s.querySelector(".appeal-form-amount__radio");if(o=="custom"){const l=s.querySelector(".appeal-form-amount__input");l.placeholder=String(j(t,Object.keys(i(this,w).products[t][n])[3])),l.dataset.minimum=j(t,i(this,w).products[t][n][o]),a.dataset.product="custom"}else s.querySelector(".appeal-form-amount__text").textContent=Me(t,o),a.value=o,a.dataset.product=i(this,w).products[t][n][o]}this.events.fire(E.EVENTS.CURRENCY_CHANGE)},R=new WeakSet,ne=function(t){i(this,k).innerHTML=adblock.strings[`appeal-form__error--${t.dataset.frequency}`],i(this,k).hidden=!1,i(this,T).disabled=!0,this.events.fire(E.EVENTS.MINIMUM_AMOUNT_ERROR_SHOW)},P=new WeakSet,se=function(){i(this,k).hidden=!0,i(this,T).disabled=!1,this.events.fire(E.EVENTS.MINIMUM_AMOUNT_ERROR_HIDE)},F=new WeakSet,ae=function(t){return t.value&&parseFloat(t.value)<parseFloat(t.dataset.minimum)},O=new WeakSet,B=function(t){f(this,F,ae).call(this,t)?f(this,R,ne).call(this,t):f(this,P,se).call(this)},M=new WeakSet,H=function(t){return t.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__input")},V=new WeakSet,de=function(t){return t.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__radio")},z=new WeakSet,he=function(t){t.target.type=="number"&&(f(this,V,de).call(this,t.target).checked=!0,f(this,O,B).call(this,t.target))},K=new WeakSet,ye=function(t){t.target.type=="number"?f(this,O,B).call(this,t.target):t.target.type=="radio"&&(t.target.value=="custom"?f(this,O,B).call(this,f(this,M,H).call(this,t.target)):f(this,P,se).call(this)),this.events.fire(E.EVENTS.AMOUNT_CHANGE)},J=new WeakSet,ge=function(t){t.preventDefault();const r=i(this,S).querySelector(".appeal-form-amount__radio:checked");if(r.value=="custom"){const n=f(this,M,H).call(this,r);if(f(this,F,ae).call(this,n))return f(this,R,ne).call(this,n)}this.events.fire(E.EVENTS.SUBMIT,this.state())},Q(E,"EVENTS",{CURRENCY_CHANGE:"CURRENCY_CHANGE",MINIMUM_AMOUNT_ERROR_SHOW:"SHOW_MINIMUM_AMOUNT_ERROR",MINIMUM_AMOUNT_ERROR_HIDE:"HIDE_MINIMUM_AMOUNT_ERROR",AMOUNT_CHANGE:"AMOUNT_CHANGE",SUBMIT:"SUBMIT"}),E);adblock.lib.AppealForm=re;function Pe(){let t=[/^localhost$/,/^[\w\-]+.staging-new-adblockplus-org-1.uplink.eyeo.it$/,/^dev--adblockplus-org--[\w\-]+.web.app$/].some(a=>a.test(location.hostname))?v.Paddle.sandbox:v.Paddle.live;adblock.searchParameters.has("testmode")||adblock.searchParameters.get("mode")=="test"?t=v.Paddle.sandbox:adblock.searchParameters.get("mode")=="live"&&(t=v.Paddle.live),adblock.config.paddle=t;const r=t==v.Paddle.sandbox;r&&Paddle.Environment.set("sandbox"),Paddle.Setup({vendor:t.vendor});const n=document.querySelector(".appeal-form"),o=v.AppealForm,s=adblock.runtime.appealForm=new re({paddleConfig:t,formConfig:o,placeholder:n});eyeo=eyeo||{},eyeo.payment=eyeo.payment||{},s.events.on(re.EVENTS.SUBMIT,a=>{s.disable();const l=JSON.stringify({amount:a.amount,frequency:a.frequency,processor:"paddle",currency:a.currency,lang:document.documentElement.lang,source:eyeo.payment.sourceId||"U",clickTs:Date.now()}),u=new URLSearchParams;eyeo.payment.productId=="ME"&&(u.append("thankyou",1),u.append("var",1),u.append("u",forceGetUserId()),u.append("from",eyeo.payment.variantName||"null"),u.append("from__currency",a.currency),u.append("from__amount",j(a.currency,a.amount)),u.append("from__frequency",a.frequency)),eyeo.payment.shouldStoreContributionInfo&&localStorage.setItem("contributionInfo",l),eyeo.payment.shouldStoreContributionInfo&&eyeo.payment.productId=="ME"&&u.append("from__contributionInfo",l);const p={testmode:r,userid:eyeo.payment.productId=="ME"?forceGetUserId():"",tracking:recordTracking(),locale:"",country:"unknown",ga_id:"",premium:eyeo.payment.productId=="ME"?"true":"false",premium_cid:"0",premium_sid:"0",currency:a.currency,recurring:a.frequency!="once",subType:a.frequency!="once"?a.frequency:"",experiment:"",experiment_id:"",variant:"",variant_index:-1,amount_cents:parseInt(a.amount,10),success_url:`${eyeo.payment.paymentCompleteUrl||"/payment-complete"}?${u.toString()}`,cancel_url:location.href},c=a.product,y={locale:adblock.settings.language,title:adblock.strings["appeal-form-checkout__title"],success:p.success_url,closeCallback:()=>{s.enable()}};c=="custom"?fetch("https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)}).then(b=>b.json()).then(b=>{if(b.hasOwnProperty("success")&&b.success==!1)throw new Error;Paddle.Checkout.open(Object.assign(y,{override:b.url}))}).catch(b=>{adblock.error(adblock.strings["error--unexpected"]),s.enable()}):Paddle.Checkout.open(Object.assign(y,{allowQuantity:!1,passthrough:p,product:c}))})}const Fe=(e,t)=>e===t,pe={equals:Fe};let $e=Ee;const N=1,D=2,_e={owned:null,cleanups:null,context:null,owner:null};var _=null;let ee=null,m=null,g=null,x=null,Y=0;function Be(e,t){const r=m,n=_,o=e.length===0,s=t===void 0?n:t,a=o?_e:{owned:null,cleanups:null,context:s?s.context:null,owner:s},l=o?e:()=>e(()=>W(()=>Z(a)));_=a,m=null;try{return $(l,!0)}finally{m=r,_=n}}function He(e,t){t=t?Object.assign({},pe,t):pe;const r={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},n=o=>(typeof o=="function"&&(o=o(r.value)),be(r,o));return[je.bind(r),n]}function le(e,t,r){const n=Le(e,t,!1,N);ue(n)}function W(e){if(m===null)return e();const t=m;m=null;try{return e()}finally{m=t}}function je(){if(this.sources&&this.state)if(this.state===N)ue(this);else{const e=g;g=null,$(()=>L(this),!1),g=e}if(m){const e=this.observers?this.observers.length:0;m.sources?(m.sources.push(this),m.sourceSlots.push(e)):(m.sources=[this],m.sourceSlots=[e]),this.observers?(this.observers.push(m),this.observerSlots.push(m.sources.length-1)):(this.observers=[m],this.observerSlots=[m.sources.length-1])}return this.value}function be(e,t,r){let n=e.value;return(!e.comparator||!e.comparator(n,t))&&(e.value=t,e.observers&&e.observers.length&&$(()=>{for(let o=0;o<e.observers.length;o+=1){const s=e.observers[o],a=ee&&ee.running;a&&ee.disposed.has(s),(a?!s.tState:!s.state)&&(s.pure?g.push(s):x.push(s),s.observers&&we(s)),a||(s.state=N)}if(g.length>1e6)throw g=[],new Error},!1)),t}function ue(e){if(!e.fn)return;Z(e);const t=_,r=m,n=Y;m=_=e,De(e,e.value,n),m=r,_=t}function De(e,t,r){let n;try{n=e.fn(t)}catch(o){return e.pure&&(e.state=N,e.owned&&e.owned.forEach(Z),e.owned=null),e.updatedAt=r+1,Ce(o)}(!e.updatedAt||e.updatedAt<=r)&&(e.updatedAt!=null&&"observers"in e?be(e,n):e.value=n,e.updatedAt=r)}function Le(e,t,r,n=N,o){const s={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:_,context:_?_.context:null,pure:r};return _===null||_!==_e&&(_.owned?_.owned.push(s):_.owned=[s]),s}function Se(e){if(e.state===0)return;if(e.state===D)return L(e);if(e.suspense&&W(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Y);)e.state&&t.push(e);for(let r=t.length-1;r>=0;r--)if(e=t[r],e.state===N)ue(e);else if(e.state===D){const n=g;g=null,$(()=>L(e,t[0]),!1),g=n}}function $(e,t){if(g)return e();let r=!1;t||(g=[]),x?r=!0:x=[],Y++;try{const n=e();return Ge(r),n}catch(n){r||(x=null),g=null,Ce(n)}}function Ge(e){if(g&&(Ee(g),g=null),e)return;const t=x;x=null,t.length&&$(()=>$e(t),!1)}function Ee(e){for(let t=0;t<e.length;t++)Se(e[t])}function L(e,t){e.state=0;for(let r=0;r<e.sources.length;r+=1){const n=e.sources[r];if(n.sources){const o=n.state;o===N?n!==t&&(!n.updatedAt||n.updatedAt<Y)&&Se(n):o===D&&L(n,t)}}}function we(e){for(let t=0;t<e.observers.length;t+=1){const r=e.observers[t];r.state||(r.state=D,r.pure?g.push(r):x.push(r),r.observers&&we(r))}}function Z(e){let t;if(e.sources)for(;e.sources.length;){const r=e.sources.pop(),n=e.sourceSlots.pop(),o=r.observers;if(o&&o.length){const s=o.pop(),a=r.observerSlots.pop();n<o.length&&(s.sourceSlots[a]=n,o[n]=s,r.observerSlots[n]=a)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)Z(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Ve(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function Ce(e,t=_){throw Ve(e)}function ze(e,t){return W(()=>e(t||{}))}function Ke(e,t,r){let n=r.length,o=t.length,s=n,a=0,l=0,u=t[o-1].nextSibling,p=null;for(;a<o||l<s;){if(t[a]===r[l]){a++,l++;continue}for(;t[o-1]===r[s-1];)o--,s--;if(o===a){const c=s<n?l?r[l-1].nextSibling:r[s-l]:u;for(;l<s;)e.insertBefore(r[l++],c)}else if(s===l)for(;a<o;)(!p||!p.has(t[a]))&&t[a].remove(),a++;else if(t[a]===r[s-1]&&r[l]===t[o-1]){const c=t[--o].nextSibling;e.insertBefore(r[l++],t[a++].nextSibling),e.insertBefore(r[--s],c),t[o]=r[s]}else{if(!p){p=new Map;let y=l;for(;y<s;)p.set(r[y],y++)}const c=p.get(t[a]);if(c!=null)if(l<c&&c<s){let y=a,b=1,ce;for(;++y<o&&y<s&&!((ce=p.get(t[y]))==null||ce!==c+b);)b++;if(b>c-l){const xe=t[a];for(;l<c;)e.insertBefore(r[l++],xe)}else e.replaceChild(r[l++],t[a++])}else a++;else t[a++].remove()}}}function Je(e,t,r){let n;const o=()=>{const a=document.createElement("template");return a.innerHTML=e,r?a.content.firstChild.firstChild:a.content.firstChild},s=t?()=>W(()=>document.importNode(n||(n=o()),!0)):()=>(n||(n=o())).cloneNode(!0);return s.cloneNode=s,s}function Ae(e,t,r,n){if(r!==void 0&&!n&&(n=[]),typeof t!="function")return G(e,t,n,r);le(o=>G(e,t(),o,r),n)}function G(e,t,r,n,o){for(;typeof r=="function";)r=r();if(t===r)return r;const s=typeof t,a=n!==void 0;if(e=a&&r[0]&&r[0].parentNode||e,s==="string"||s==="number")if(s==="number"&&(t=t.toString()),a){let l=r[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),r=q(e,r,n,l)}else r!==""&&typeof r=="string"?r=e.firstChild.data=t:r=e.textContent=t;else if(t==null||s==="boolean")r=q(e,r,n);else{if(s==="function")return le(()=>{let l=t();for(;typeof l=="function";)l=l();r=G(e,l,r,n)}),()=>r;if(Array.isArray(t)){const l=[],u=r&&Array.isArray(r);if(ie(l,t,r,o))return le(()=>r=G(e,l,r,n,!0)),()=>r;if(l.length===0){if(r=q(e,r,n),a)return r}else u?r.length===0?me(e,l,n):Ke(e,r,l):(r&&q(e),me(e,l));r=l}else if(t.nodeType){if(Array.isArray(r)){if(a)return r=q(e,r,n,t);q(e,r,null,t)}else r==null||r===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);r=t}else console.warn("Unrecognized value. Skipped inserting",t)}return r}function ie(e,t,r,n){let o=!1;for(let s=0,a=t.length;s<a;s++){let l=t[s],u=r&&r[s],p;if(!(l==null||l===!0||l===!1))if((p=typeof l)=="object"&&l.nodeType)e.push(l);else if(Array.isArray(l))o=ie(e,l,u)||o;else if(p==="function")if(n){for(;typeof l=="function";)l=l();o=ie(e,Array.isArray(l)?l:[l],Array.isArray(u)?u:[u])||o}else e.push(l),o=!0;else{const c=String(l);u&&u.nodeType===3&&u.data===c?e.push(u):e.push(document.createTextNode(c))}}return o}function me(e,t,r=null){for(let n=0,o=t.length;n<o;n++)e.insertBefore(t[n],r)}function q(e,t,r,n){if(r===void 0)return e.textContent="";const o=n||document.createTextNode("");if(t.length){let s=!1;for(let a=t.length-1;a>=0;a--){const l=t[a];if(o!==l){const u=l.parentNode===e;!s&&!a?u?e.replaceChild(o,l):e.insertBefore(o,r):u&&l.remove()}else s=!0}}else e.insertBefore(o,r);return[o]}function Ye(e){return Object.keys(e).reduce((r,n)=>{const o=e[n];return r[n]=Object.assign({},o),ke(o.value)&&!et(o.value)&&!Array.isArray(o.value)&&(r[n].value=Object.assign({},o.value)),Array.isArray(o.value)&&(r[n].value=o.value.slice(0)),r},{})}function We(e){return e?Object.keys(e).reduce((r,n)=>{const o=e[n];return r[n]=ke(o)&&"value"in o?o:{value:o},r[n].attribute||(r[n].attribute=Xe(n)),r[n].parse="parse"in r[n]?r[n].parse:typeof r[n].value!="string",r},{}):{}}function Ze(e){return Object.keys(e).reduce((r,n)=>(r[n]=e[n].value,r),{})}function Qe(e,t){const r=Ye(t);return Object.keys(t).forEach(o=>{const s=r[o],a=e.getAttribute(s.attribute),l=e[o];a&&(s.value=s.parse?ve(a):a),l!=null&&(s.value=Array.isArray(l)?l.slice(0):l),s.reflect&&fe(e,s.attribute,s.value),Object.defineProperty(e,o,{get(){return s.value},set(u){const p=s.value;s.value=u,s.reflect&&fe(this,s.attribute,s.value);for(let c=0,y=this.__propertyChangedCallbacks.length;c<y;c++)this.__propertyChangedCallbacks[c](o,u,p)},enumerable:!0,configurable:!0})}),r}function ve(e){if(e)try{return JSON.parse(e)}catch{return e}}function fe(e,t,r){if(r==null||r===!1)return e.removeAttribute(t);let n=JSON.stringify(r);e.__updating[t]=!0,n==="true"&&(n=""),e.setAttribute(t,n),Promise.resolve().then(()=>delete e.__updating[t])}function Xe(e){return e.replace(/\.?([A-Z]+)/g,(t,r)=>"-"+r.toLowerCase()).replace("_","-").replace(/^-/,"")}function ke(e){return e!=null&&(typeof e=="object"||typeof e=="function")}function et(e){return Object.prototype.toString.call(e)==="[object Function]"}function tt(e){return typeof e=="function"&&e.toString().indexOf("class")===0}let te;function rt(e,t){const r=Object.keys(t);return class extends e{static get observedAttributes(){return r.map(o=>t[o].attribute)}constructor(){super(),this.__initialized=!1,this.__released=!1,this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props={}}connectedCallback(){if(this.__initialized)return;this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props=Qe(this,t);const o=Ze(this.props),s=this.Component,a=te;try{te=this,this.__initialized=!0,tt(s)?new s(o,{element:this}):s(o,{element:this})}finally{te=a}}async disconnectedCallback(){if(await Promise.resolve(),this.isConnected)return;this.__propertyChangedCallbacks.length=0;let o=null;for(;o=this.__releaseCallbacks.pop();)o(this);delete this.__initialized,this.__released=!0}attributeChangedCallback(o,s,a){if(this.__initialized&&!this.__updating[o]&&(o=this.lookupProp(o),o in t)){if(a==null&&!this[o])return;this[o]=t[o].parse?ve(a):a}}lookupProp(o){if(t)return r.find(s=>o===s||o===t[s].attribute)}get renderRoot(){return this.shadowRoot||this.attachShadow({mode:"open"})}addReleaseCallback(o){this.__releaseCallbacks.push(o)}addPropertyChangedCallback(o){this.__propertyChangedCallbacks.push(o)}}}function ot(e,t={},r={}){const{BaseElement:n=HTMLElement,extension:o}=r;return s=>{if(!e)throw new Error("tag is required to register a Component");let a=customElements.get(e);return a?(a.prototype.Component=s,a):(a=rt(n,We(t)),a.prototype.Component=s,a.prototype.registeredTag=e,customElements.define(e,a,o),a)}}function nt(e){const t=Object.keys(e),r={};for(let n=0;n<t.length;n++){const[o,s]=He(e[t[n]]);Object.defineProperty(r,t[n],{get:o,set(a){s(()=>a)}})}return r}function st(e){if(e.assignedSlot&&e.assignedSlot._$owner)return e.assignedSlot._$owner;let t=e.parentNode;for(;t&&!t._$owner&&!(t.assignedSlot&&t.assignedSlot._$owner);)t=t.parentNode;return t&&t.assignedSlot?t.assignedSlot._$owner:e._$owner}function at(e){return(t,r)=>{const{element:n}=r;return Be(o=>{const s=nt(t);n.addPropertyChangedCallback((l,u)=>s[l]=u),n.addReleaseCallback(()=>{n.renderRoot.textContent="",o()});const a=e(s,r);return Ae(n.renderRoot,a)},st(n))}}function lt(e,t,r){return arguments.length===2&&(r=t,t={}),ot(e,t)(at(r))}const it=`.appeal-form{margin-top:1rem;margin-bottom:1rem}.appeal-form .appeal-form__placeholder{position:relative;display:inline-block;overflow:hidden;height:1em;border-radius:3px;background-color:#e6e6e6}.appeal-form .appeal-form__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;content:"";transform:translate(-100%);animation:shimmer 3s infinite;background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0))}@-webkit-keyframes shimmer{to{transform:translate(100%)}}@keyframes shimmer{to{transform:translate(100%)}}.appeal-form .appeal-form-header{margin-bottom:.5rem}.appeal-form .appeal-form-header__heading{font-size:1.125rem;display:inline-block;margin:0}.appeal-form .appeal-form-header__select{font-size:.875rem}.appeal-form .appeal-form-frequencies{display:flex;flex-wrap:wrap;max-width:53.125rem;margin-top:.5rem;margin-bottom:.5rem}:not([dir=rtl]) .appeal-form .appeal-form-frequencies{margin-left:-1rem}[dir=rtl] .appeal-form .appeal-form-frequencies{margin-right:-1rem}.appeal-form .appeal-form-frequency{flex:0 0 100%;padding-top:.5rem;padding-bottom:.5rem}:not([dir=rtl]) .appeal-form .appeal-form-frequency{padding-left:1rem}[dir=rtl] .appeal-form .appeal-form-frequency{padding-right:1rem}@media (min-width: 55.125rem){.appeal-form .appeal-form-frequency{flex:1;padding-top:0}}.appeal-form .appeal-form-frequency__heading{font-size:1rem;font-weight:400;margin-top:0;margin-bottom:.375rem}.appeal-form .appeal-form-amounts{display:flex;flex-wrap:wrap;max-width:16.70875rem;align-items:center}:not([dir=rtl]) .appeal-form .appeal-form-amounts{padding-right:1rem}[dir=rtl] .appeal-form .appeal-form-amounts{padding-left:1rem}@media (min-width: 55.125rem){:not([dir=rtl]) .appeal-form .appeal-form-amounts{border-right:1px solid gray}[dir=rtl] .appeal-form .appeal-form-amounts{border-left:1px solid gray}.appeal-form .appeal-form-frequency:last-of-type .appeal-form-amounts{border:0}}.appeal-form .appeal-form-amount{line-height:1.7;display:flex;width:33.33333333%}:not([dir=rtl]) .appeal-form .appeal-form-amount__radio{margin-left:0}[dir=rtl] .appeal-form .appeal-form-amount__radio{margin-right:0}.appeal-form .appeal-form-amount__text{padding-top:1.5px}.appeal-form .appeal-form-amount__input{font-size:.875rem;width:100%;height:1.4rem;margin-top:.1875rem;padding:.125rem .25rem;border:1px solid gray}:not([dir=rtl]) .appeal-form .appeal-form-amount__input{margin-right:.1875rem}[dir=rtl] .appeal-form .appeal-form-amount__input{margin-left:.1875rem}@media (min-width: 55.125rem){.appeal-form .appeal-form-checkout{display:flex}}.appeal-form .appeal-form-checkout__submit{font-size:.9375rem;font-weight:700;display:flex;align-items:center;justify-content:center;width:100%;height:2rem;margin-bottom:1rem;text-align:center;color:#fff;border:0;border-radius:3.5px;background-color:#0047ff;box-shadow:0 0 1px #0003}.appeal-form .appeal-form-checkout__submit:disabled{filter:grayscale(100)}@media (min-width: 23.75rem){.appeal-form .appeal-form-checkout__submit{max-width:14rem}:not([dir=rtl]) .appeal-form .appeal-form-checkout__submit{margin-right:1rem}[dir=rtl] .appeal-form .appeal-form-checkout__submit{margin-left:1rem}}@media (min-width: 55.125rem){.appeal-form .appeal-form-checkout__submit{margin-bottom:0}}.appeal-form .appeal-form-checkout__icon{height:1rem}:not([dir=rtl]) .appeal-form .appeal-form-checkout__icon{margin-right:.25rem}[dir=rtl] .appeal-form .appeal-form-checkout__icon{margin-left:.25rem}.appeal-form .appeal-form-checkout__image{width:100%;max-width:340px;max-height:32px}
`,ut=Je('<form class="appeal-form"><div class="appeal-form-frequencies"></div><input type="submit" value="Submit"><style>');function ct(e){const t=e.currency;return v.Paddle[e.environment!=="production"?"sandbox":"live"].products[t],(()=>{const r=ut(),n=r.firstChild,o=n.nextSibling,s=o.nextSibling;return Ae(s,it),r})()}lt("appeal-form",{currency:"USD",environment:"development"},e=>ze(ct,{get currency(){return e.currency},get environment(){return e.environment}}));Pe();
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
