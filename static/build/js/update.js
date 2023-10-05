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

var bt=Object.defineProperty;var vt=(e,t,r)=>t in e?bt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Ie=(e,t,r)=>(vt(e,typeof t!="symbol"?t+"":t,r),r),Ue=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)};var _=(e,t,r)=>(Ue(e,t,"read from private field"),r?r.call(e):t.get(e)),x=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},Y=(e,t,r,n)=>(Ue(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r);var A=(e,t,r)=>(Ue(e,t,"access private method"),r);const W={AppealForm:{currency:typeof adblock=="object"&&adblock.settings.currency||"USD",selected:3},Paddle:{sandbox:{vendor:11004,products:{USD:{once:{1e3:46028,1500:46029,2e3:46030,3500:46031,5e3:46032,custom:500},monthly:{199:46074,299:46075,399:46076,499:46077,999:46078,custom:199},yearly:{1e3:46079,1500:46080,2e3:46081,3500:46082,5e3:46083,custom:500}},AUD:{once:{1e3:46033,1500:46034,2e3:46035,3500:46036,5e3:46037,custom:500},monthly:{199:46084,299:46085,399:46086,499:46087,999:46088,custom:199},yearly:{1e3:46089,1500:46090,2e3:46091,3500:46092,5e3:46093,custom:500}},CAD:{once:{1e3:46038,1500:46039,2e3:46040,3500:46041,5e3:46042,custom:500},monthly:{199:46094,299:46095,399:46096,499:46097,999:46098,custom:199},yearly:{1e3:46099,1500:46181,2e3:46182,3500:46183,5e3:46184,custom:500}},EUR:{once:{1e3:46048,1500:46049,2e3:46050,3500:46051,5e3:46052,custom:500},monthly:{199:46195,299:46196,399:46197,499:46198,999:46199,custom:199},yearly:{1e3:46200,1500:46201,2e3:46202,3500:46203,5e3:46204,custom:500}},GBP:{once:{1e3:46053,1500:46054,2e3:46055,3500:46056,5e3:46057,custom:500},monthly:{199:46205,299:46206,399:46207,499:46208,999:46209,custom:199},yearly:{1e3:46210,1500:46211,2e3:46212,3500:46213,5e3:46214,custom:500}},JPY:{once:{1500:46064,2e3:46065,2500:46066,3500:46067,5e3:46068,custom:500},monthly:{200:46225,300:46226,500:46227,1e3:46228,1500:46229,custom:200},yearly:{1500:46230,2e3:46231,2500:46232,3500:46233,5e3:46234,custom:500}},NZD:{once:{1e3:46058,1500:46059,2e3:46060,3500:46062,5e3:46063,custom:500},monthly:{199:46215,299:46216,399:46217,499:46218,999:46219,custom:199},yearly:{1e3:46220,1500:46221,2e3:46222,3500:46223,5e3:46224,custom:500}},CHF:{once:{1e3:46043,1500:46044,2e3:46045,3500:46046,5e3:46047,custom:500},monthly:{199:46185,299:46186,399:46187,499:46188,999:46189,custom:199},yearly:{1e3:46190,1500:46191,2e3:46192,3500:46193,5e3:46194,custom:500}},RUB:{once:{25e3:46069,5e4:46070,1e5:46071,25e4:46072,5e5:46073,custom:25e3},monthly:{15e3:46235,25e3:46236,4e4:46237,5e4:46238,1e5:46239,custom:15e3},yearly:{25e3:46240,5e4:46241,1e5:46242,25e4:46243,5e5:46244,custom:25e3}}}},live:{vendor:164164,products:{USD:{once:{1e3:816549,1500:816550,2e3:816551,3500:816552,5e3:816553,custom:500},monthly:{199:816774,299:816775,399:816776,499:816777,999:816778,custom:199},yearly:{1e3:816779,1500:816780,2e3:816781,3500:816782,5e3:816783,custom:500}},AUD:{once:{1e3:816522,1500:816523,2e3:816524,3500:816525,5e3:816526,custom:500},monthly:{199:816692,299:816693,399:816694,499:816696,999:816697,custom:199},yearly:{1e3:816699,1500:816700,2e3:816702,3500:816703,5e3:816705,custom:500}},CAD:{once:{1e3:816528,1500:816529,2e3:816530,3500:816531,5e3:816532,custom:500},monthly:{199:816706,299:816708,399:816710,499:816711,999:816712,custom:199},yearly:{1e3:816714,1500:816715,2e3:816716,3500:816717,5e3:816718,custom:500}},EUR:{once:{1e3:816517,1500:816518,2e3:816519,3500:816520,5e3:816521,custom:500},monthly:{199:816681,299:816682,399:816683,499:816684,999:816686,custom:199},yearly:{1e3:816687,1500:816688,2e3:816689,3500:816690,5e3:816691,custom:500}},GBP:{once:{1e3:816538,1500:816539,2e3:816540,3500:816541,5e3:816542,custom:500},monthly:{199:816734,299:816735,399:816736,499:816737,999:816738,custom:199},yearly:{1e3:816739,1500:816740,2e3:816741,3500:816743,5e3:816744,custom:500}},JPY:{once:{1500:816554,2e3:816555,2500:816556,3500:816557,5e3:816558,custom:500},monthly:{200:816784,300:816785,500:816786,1e3:816787,1500:816788,custom:200},yearly:{1500:816789,2e3:816791,2500:816792,3500:816794,5e3:816795,custom:500}},NZD:{once:{1e3:816543,1500:816544,2e3:816545,3500:816547,5e3:816548,custom:500},monthly:{199:816760,299:816762,399:816764,499:816766,999:816768,custom:199},yearly:{1e3:816769,1500:816770,2e3:816771,3500:816772,5e3:816773,custom:500}},CHF:{once:{1e3:816533,1500:816535,2e3:816534,3500:816536,5e3:816537,custom:500},monthly:{199:816720,299:816722,399:816723,499:816725,999:816726,custom:199},yearly:{1e3:816727,1500:816728,2e3:816730,3500:816731,5e3:816733,custom:500}},RUB:{once:{25e3:816559,5e4:816560,1e5:816561,25e4:816562,5e5:816563,custom:25e3},monthly:{15e3:816796,25e3:816797,4e4:816799,5e4:816800,1e5:816801,custom:15e3},yearly:{25e3:816802,5e4:816803,1e5:816804,25e4:816805,5e5:816806,custom:25e3}}}}}};class wt{constructor(){this.callbacks={}}on(t,r){this.callbacks[t]||(this.callbacks[t]=[]),this.callbacks[t].push(r)}fire(t,r){if(this.callbacks[t])for(const n of this.callbacks[t])try{n(r)}catch(o){console.error(o)}}}function be(e,t){return e=="JPY"?t:t/100}function St(e,t){return e=="JPY"?t:t*100}function Et(e,t){return new Intl.NumberFormat(navigator.language,{style:"currency",currency:e,minimumFractionDigits:0}).format(be(e,t))}const kt=document.getElementById("appeal-form"),Ct=document.getElementById("appeal-form-amount--fixed"),At=document.getElementById("appeal-form-amount--custom");var j,R,O,H,M,ie,V,te,se,Re,le,De,ue,Fe,ce,Ge,re,ye,ne,ge,Ce,tt,Ae,rt,Pe,nt,xe,ot;let je=(j=class{constructor({placeholder:t,paddleConfig:r,formConfig:n}){x(this,se);x(this,le);x(this,ue);x(this,ce);x(this,re);x(this,ne);x(this,Ce);x(this,Ae);x(this,Pe);x(this,xe);Ie(this,"events");x(this,R,void 0);x(this,O,void 0);x(this,H,void 0);x(this,M,void 0);x(this,ie,[]);x(this,V,void 0);x(this,te,void 0);this.events=new wt,Y(this,R,r),Y(this,O,kt.content.cloneNode(!0).firstElementChild),_(this,O).querySelector(".appeal-form-header__heading").innerHTML=adblock.strings["appeal-form-header__heading"],_(this,O).querySelector(".appeal-form-checkout__submit").innerHTML=adblock.strings["appeal-form-checkout__submit"],Y(this,V,_(this,O).querySelector(".appeal-form__error")),Y(this,te,_(this,O).querySelector(".appeal-form-checkout__submit")),Y(this,H,_(this,O).querySelector(".appeal-form-header__select"));for(const o in r.products){const a=document.createElement("option");a.textContent=o.toUpperCase(),a.value=o.toUpperCase(),_(this,H).appendChild(a)}_(this,H).value=n.currency,Y(this,M,_(this,O).querySelector(".appeal-form-frequencies"));for(const o in r.products[n.currency]){let a=1;const i=_(this,M).querySelector(`.appeal-form-frequency--${o}`);i.querySelector(".appeal-form-frequency__heading").innerHTML=adblock.strings[`appeal-form-frequency__heading--${o}`];const s=i.querySelector(".appeal-form-amounts");for(const c in r.products[n.currency][o]){let d,p,g;c=="custom"?(d=At.content.cloneNode(!0).firstElementChild,g=d.querySelector(".appeal-form-amount__input"),g.dataset.testid=`appeal-form-amount__input--${o}`,g.dataset.frequency=o):d=Ct.content.cloneNode(!0).firstElementChild,p=d.querySelector(".appeal-form-amount__radio"),p.dataset.testid=`appeal-form-amount__radio--${o}-${a++}`,p.dataset.frequency=o,_(this,ie).push(d),s.appendChild(d)}}A(this,se,Re).call(this,n.currency),_(this,M).querySelectorAll(".appeal-form-amount__radio")[n.selected].checked=!0,_(this,H).addEventListener("change",o=>A(this,se,Re).call(this,o.currentTarget.value)),_(this,M).addEventListener("focusin",o=>A(this,Ae,rt).call(this,o)),_(this,M).addEventListener("input",o=>A(this,Pe,nt).call(this,o)),_(this,O).addEventListener("submit",o=>A(this,xe,ot).call(this,o)),t.replaceWith(_(this,O)),_(this,O).dataset.testid="appeal-form-constructed"}state(){const t=_(this,M).querySelector(".appeal-form-amount__radio:checked"),r=_(this,H).value,n=t.dataset.frequency,o=t.dataset.product;let a=t.value;if(a=="custom"){const i=A(this,ne,ge).call(this,t);a=St(r,parseFloat(i.value===""?i.placeholder:i.value))}else a=parseFloat(a);return{currency:r,frequency:n,product:o,amount:a}}disable(){_(this,O).classList.add("appeal-form--disabled"),_(this,O).querySelectorAll("input, button").forEach(t=>{t.disabled=!0})}enable(){_(this,O).classList.remove("appeal-form--disabled"),_(this,O).querySelectorAll("input, button").forEach(t=>{t.disabled=!1})}},R=new WeakMap,O=new WeakMap,H=new WeakMap,M=new WeakMap,ie=new WeakMap,V=new WeakMap,te=new WeakMap,se=new WeakSet,Re=function(t){let r=0;for(const n in _(this,R).products[t])for(const o in _(this,R).products[t][n]){const a=_(this,ie)[r++],i=a.querySelector(".appeal-form-amount__radio");if(o=="custom"){const s=a.querySelector(".appeal-form-amount__input");s.placeholder=String(be(t,Object.keys(_(this,R).products[t][n])[3])),s.dataset.minimum=be(t,_(this,R).products[t][n][o]),i.dataset.product="custom"}else a.querySelector(".appeal-form-amount__text").textContent=Et(t,o),i.value=o,i.dataset.product=_(this,R).products[t][n][o]}this.events.fire(j.EVENTS.CURRENCY_CHANGE)},le=new WeakSet,De=function(t){_(this,V).innerHTML=adblock.strings[`appeal-form__error--${t.dataset.frequency}`],_(this,V).hidden=!1,_(this,te).disabled=!0,this.events.fire(j.EVENTS.MINIMUM_AMOUNT_ERROR_SHOW)},ue=new WeakSet,Fe=function(){_(this,V).hidden=!0,_(this,te).disabled=!1,this.events.fire(j.EVENTS.MINIMUM_AMOUNT_ERROR_HIDE)},ce=new WeakSet,Ge=function(t){return t.value&&parseFloat(t.value)<parseFloat(t.dataset.minimum)},re=new WeakSet,ye=function(t){A(this,ce,Ge).call(this,t)?A(this,le,De).call(this,t):A(this,ue,Fe).call(this)},ne=new WeakSet,ge=function(t){return t.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__input")},Ce=new WeakSet,tt=function(t){return t.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__radio")},Ae=new WeakSet,rt=function(t){t.target.type=="number"&&(A(this,Ce,tt).call(this,t.target).checked=!0,A(this,re,ye).call(this,t.target))},Pe=new WeakSet,nt=function(t){t.target.type=="number"?A(this,re,ye).call(this,t.target):t.target.type=="radio"&&(t.target.value=="custom"?A(this,re,ye).call(this,A(this,ne,ge).call(this,t.target)):A(this,ue,Fe).call(this)),this.events.fire(j.EVENTS.AMOUNT_CHANGE)},xe=new WeakSet,ot=function(t){t.preventDefault();const r=_(this,M).querySelector(".appeal-form-amount__radio:checked");if(r.value=="custom"){const n=A(this,ne,ge).call(this,r);if(A(this,ce,Ge).call(this,n))return A(this,le,De).call(this,n)}this.events.fire(j.EVENTS.SUBMIT,this.state())},Ie(j,"EVENTS",{CURRENCY_CHANGE:"CURRENCY_CHANGE",MINIMUM_AMOUNT_ERROR_SHOW:"SHOW_MINIMUM_AMOUNT_ERROR",MINIMUM_AMOUNT_ERROR_HIDE:"HIDE_MINIMUM_AMOUNT_ERROR",AMOUNT_CHANGE:"AMOUNT_CHANGE",SUBMIT:"SUBMIT"}),j);adblock.lib.AppealForm=je;function Pt(){let t=[/^localhost$/,/^[\w\-]+.staging-new-adblockplus-org-1.uplink.eyeo.it$/,/^dev--adblockplus-org--[\w\-]+.web.app$/].some(i=>i.test(location.hostname))?W.Paddle.sandbox:W.Paddle.live;adblock.searchParameters.has("testmode")||adblock.searchParameters.get("mode")=="test"?t=W.Paddle.sandbox:adblock.searchParameters.get("mode")=="live"&&(t=W.Paddle.live),adblock.config.paddle=t;const r=t==W.Paddle.sandbox;r&&Paddle.Environment.set("sandbox"),Paddle.Setup({vendor:t.vendor});const n=document.querySelector(".appeal-form"),o=W.AppealForm,a=adblock.runtime.appealForm=new je({paddleConfig:t,formConfig:o,placeholder:n});eyeo=eyeo||{},eyeo.payment=eyeo.payment||{},a.events.on(je.EVENTS.SUBMIT,i=>{a.disable();const s=JSON.stringify({amount:i.amount,frequency:i.frequency,processor:"paddle",currency:i.currency,lang:document.documentElement.lang,source:eyeo.payment.sourceId||"U",clickTs:Date.now()}),c=new URLSearchParams;eyeo.payment.productId=="ME"&&(c.append("thankyou",1),c.append("var",1),c.append("u",forceGetUserId()),c.append("from",eyeo.payment.variantName||"null"),c.append("from__currency",i.currency),c.append("from__amount",be(i.currency,i.amount)),c.append("from__frequency",i.frequency)),eyeo.payment.shouldStoreContributionInfo&&localStorage.setItem("contributionInfo",s),eyeo.payment.shouldStoreContributionInfo&&eyeo.payment.productId=="ME"&&c.append("from__contributionInfo",s);const d={testmode:r,userid:eyeo.payment.productId=="ME"?forceGetUserId():"",tracking:recordTracking(),locale:"",country:"unknown",ga_id:"",premium:eyeo.payment.productId=="ME"?"true":"false",premium_cid:"0",premium_sid:"0",currency:i.currency,recurring:i.frequency!="once",subType:i.frequency!="once"?i.frequency:"",experiment:"",experiment_id:"",variant:"",variant_index:-1,amount_cents:parseInt(i.amount,10),success_url:`${eyeo.payment.paymentCompleteUrl||"/payment-complete"}?${c.toString()}`,cancel_url:location.href},p=i.product,g={locale:adblock.settings.language,title:adblock.strings["appeal-form-checkout__title"],success:d.success_url,closeCallback:()=>{a.enable()}};p=="custom"?fetch("https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)}).then(h=>h.json()).then(h=>{if(h.hasOwnProperty("success")&&h.success==!1)throw new Error;Paddle.Checkout.open(Object.assign(g,{override:h.url}))}).catch(h=>{adblock.error(adblock.strings["error--unexpected"]),a.enable()}):Paddle.Checkout.open(Object.assign(g,{allowQuantity:!1,passthrough:d,product:p}))})}const xt=(e,t)=>e===t,Ot=Symbol("solid-track"),ve={equals:xt};let at=ut;const z=1,we=2,it={owned:null,cleanups:null,context:null,owner:null};var P=null;let Le=null,k=null,$=null,F=null,Oe=0;function _e(e,t){const r=k,n=P,o=e.length===0,a=t===void 0?n:t,i=o?it:{owned:null,cleanups:null,context:a?a.context:null,owner:a},s=o?e:()=>e(()=>pe(()=>$e(i)));P=i,k=null;try{return me(s,!0)}finally{k=r,P=n}}function Z(e,t){t=t?Object.assign({},ve,t):ve;const r={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},n=o=>(typeof o=="function"&&(o=o(r.value)),lt(r,o));return[st.bind(r),n]}function ee(e,t,r){const n=Ke(e,t,!1,z);fe(n)}function $t(e,t,r){at=Ut;const n=Ke(e,t,!1,z);(!r||!r.render)&&(n.user=!0),F?F.push(n):fe(n)}function Nt(e,t,r){r=r?Object.assign({},ve,r):ve;const n=Ke(e,t,!0,0);return n.observers=null,n.observerSlots=null,n.comparator=r.equals||void 0,fe(n),st.bind(n)}function pe(e){if(k===null)return e();const t=k;k=null;try{return e()}finally{k=t}}function Tt(e){return P===null||(P.cleanups===null?P.cleanups=[e]:P.cleanups.push(e)),e}function st(){if(this.sources&&this.state)if(this.state===z)fe(this);else{const e=$;$=null,me(()=>Ee(this),!1),$=e}if(k){const e=this.observers?this.observers.length:0;k.sources?(k.sources.push(this),k.sourceSlots.push(e)):(k.sources=[this],k.sourceSlots=[e]),this.observers?(this.observers.push(k),this.observerSlots.push(k.sources.length-1)):(this.observers=[k],this.observerSlots=[k.sources.length-1])}return this.value}function lt(e,t,r){let n=e.value;return(!e.comparator||!e.comparator(n,t))&&(e.value=t,e.observers&&e.observers.length&&me(()=>{for(let o=0;o<e.observers.length;o+=1){const a=e.observers[o],i=Le&&Le.running;i&&Le.disposed.has(a),(i?!a.tState:!a.state)&&(a.pure?$.push(a):F.push(a),a.observers&&ct(a)),i||(a.state=z)}if($.length>1e6)throw $=[],new Error},!1)),t}function fe(e){if(!e.fn)return;$e(e);const t=P,r=k,n=Oe;k=P=e,qt(e,e.value,n),k=r,P=t}function qt(e,t,r){let n;try{n=e.fn(t)}catch(o){return e.pure&&(e.state=z,e.owned&&e.owned.forEach($e),e.owned=null),e.updatedAt=r+1,pt(o)}(!e.updatedAt||e.updatedAt<=r)&&(e.updatedAt!=null&&"observers"in e?lt(e,n):e.value=n,e.updatedAt=r)}function Ke(e,t,r,n=z,o){const a={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:P,context:P?P.context:null,pure:r};return P===null||P!==it&&(P.owned?P.owned.push(a):P.owned=[a]),a}function Se(e){if(e.state===0)return;if(e.state===we)return Ee(e);if(e.suspense&&pe(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Oe);)e.state&&t.push(e);for(let r=t.length-1;r>=0;r--)if(e=t[r],e.state===z)fe(e);else if(e.state===we){const n=$;$=null,me(()=>Ee(e,t[0]),!1),$=n}}function me(e,t){if($)return e();let r=!1;t||($=[]),F?r=!0:F=[],Oe++;try{const n=e();return It(r),n}catch(n){r||(F=null),$=null,pt(n)}}function It(e){if($&&(ut($),$=null),e)return;const t=F;F=null,t.length&&me(()=>at(t),!1)}function ut(e){for(let t=0;t<e.length;t++)Se(e[t])}function Ut(e){let t,r=0;for(t=0;t<e.length;t++){const n=e[t];n.user?e[r++]=n:Se(n)}for(t=0;t<r;t++)Se(e[t])}function Ee(e,t){e.state=0;for(let r=0;r<e.sources.length;r+=1){const n=e.sources[r];if(n.sources){const o=n.state;o===z?n!==t&&(!n.updatedAt||n.updatedAt<Oe)&&Se(n):o===we&&Ee(n,t)}}}function ct(e){for(let t=0;t<e.observers.length;t+=1){const r=e.observers[t];r.state||(r.state=we,r.pure?$.push(r):F.push(r),r.observers&&ct(r))}}function $e(e){let t;if(e.sources)for(;e.sources.length;){const r=e.sources.pop(),n=e.sourceSlots.pop(),o=r.observers;if(o&&o.length){const a=o.pop(),i=r.observerSlots.pop();n<o.length&&(a.sourceSlots[i]=n,o[n]=a,r.observerSlots[n]=i)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)$e(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function Lt(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function pt(e,t=P){throw Lt(e)}const Mt=Symbol("fallback");function Ye(e){for(let t=0;t<e.length;t++)e[t]()}function jt(e,t,r={}){let n=[],o=[],a=[],i=0,s=t.length>1?[]:null;return Tt(()=>Ye(a)),()=>{let c=e()||[],d,p;return c[Ot],pe(()=>{let h=c.length,w,S,b,q,N,E,I,T,G;if(h===0)i!==0&&(Ye(a),a=[],n=[],o=[],i=0,s&&(s=[])),r.fallback&&(n=[Mt],o[0]=_e(de=>(a[0]=de,r.fallback())),i=1);else if(i===0){for(o=new Array(h),p=0;p<h;p++)n[p]=c[p],o[p]=_e(g);i=h}else{for(b=new Array(h),q=new Array(h),s&&(N=new Array(h)),E=0,I=Math.min(i,h);E<I&&n[E]===c[E];E++);for(I=i-1,T=h-1;I>=E&&T>=E&&n[I]===c[T];I--,T--)b[T]=o[I],q[T]=a[I],s&&(N[T]=s[I]);for(w=new Map,S=new Array(T+1),p=T;p>=E;p--)G=c[p],d=w.get(G),S[p]=d===void 0?-1:d,w.set(G,p);for(d=E;d<=I;d++)G=n[d],p=w.get(G),p!==void 0&&p!==-1?(b[p]=o[d],q[p]=a[d],s&&(N[p]=s[d]),p=S[p],w.set(G,p)):a[d]();for(p=E;p<h;p++)p in b?(o[p]=b[p],a[p]=q[p],s&&(s[p]=N[p],s[p](p))):o[p]=_e(g);o=o.slice(0,i=h),n=c.slice(0)}return o});function g(h){if(a[p]=h,s){const[w,S]=Z(p);return s[p]=S,t(c[p],w)}return t(c[p])}}}function Q(e,t){return pe(()=>e(t||{}))}function Rt(e){const t="fallback"in e&&{fallback:()=>e.fallback};return Nt(jt(()=>e.each,e.children,t||void 0))}function Dt(e,t,r){let n=r.length,o=t.length,a=n,i=0,s=0,c=t[o-1].nextSibling,d=null;for(;i<o||s<a;){if(t[i]===r[s]){i++,s++;continue}for(;t[o-1]===r[a-1];)o--,a--;if(o===i){const p=a<n?s?r[s-1].nextSibling:r[a-s]:c;for(;s<a;)e.insertBefore(r[s++],p)}else if(a===s)for(;i<o;)(!d||!d.has(t[i]))&&t[i].remove(),i++;else if(t[i]===r[a-1]&&r[s]===t[o-1]){const p=t[--o].nextSibling;e.insertBefore(r[s++],t[i++].nextSibling),e.insertBefore(r[--a],p),t[o]=r[a]}else{if(!d){d=new Map;let g=s;for(;g<a;)d.set(r[g],g++)}const p=d.get(t[i]);if(p!=null)if(s<p&&p<a){let g=i,h=1,w;for(;++g<o&&g<a&&!((w=d.get(t[g]))==null||w!==p+h);)h++;if(h>p-s){const S=t[i];for(;s<p;)e.insertBefore(r[s++],S)}else e.replaceChild(r[s++],t[i++])}else i++;else t[i++].remove()}}}const Ve="_$DX_DELEGATE";function oe(e,t,r){let n;const o=()=>{const i=document.createElement("template");return i.innerHTML=e,r?i.content.firstChild.firstChild:i.content.firstChild},a=t?()=>pe(()=>document.importNode(n||(n=o()),!0)):()=>(n||(n=o())).cloneNode(!0);return a.cloneNode=a,a}function ft(e,t=window.document){const r=t[Ve]||(t[Ve]=new Set);for(let n=0,o=e.length;n<o;n++){const a=e[n];r.has(a)||(r.add(a),t.addEventListener(a,Gt))}}function B(e,t,r){r==null?e.removeAttribute(t):e.setAttribute(t,r)}function mt(e,t,r,n){if(n)Array.isArray(r)?(e[`$$${t}`]=r[0],e[`$$${t}Data`]=r[1]):e[`$$${t}`]=r;else if(Array.isArray(r)){const o=r[0];e.addEventListener(t,r[0]=a=>o.call(e,r[1],a))}else e.addEventListener(t,r)}function Ft(e,t,r){if(!t)return r?B(e,"style"):t;const n=e.style;if(typeof t=="string")return n.cssText=t;typeof r=="string"&&(n.cssText=r=void 0),r||(r={}),t||(t={});let o,a;for(a in r)t[a]==null&&n.removeProperty(a),delete r[a];for(a in t)o=t[a],o!==r[a]&&(n.setProperty(a,o),r[a]=o);return r}function D(e,t,r,n){if(r!==void 0&&!n&&(n=[]),typeof t!="function")return ke(e,t,n,r);ee(o=>ke(e,t(),o,r),n)}function Gt(e){const t=`$$${e.type}`;let r=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==r&&Object.defineProperty(e,"target",{configurable:!0,value:r}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return r||document}});r;){const n=r[t];if(n&&!r.disabled){const o=r[`${t}Data`];if(o!==void 0?n.call(r,o,e):n.call(r,e),e.cancelBubble)return}r=r._$host||r.parentNode||r.host}}function ke(e,t,r,n,o){for(;typeof r=="function";)r=r();if(t===r)return r;const a=typeof t,i=n!==void 0;if(e=i&&r[0]&&r[0].parentNode||e,a==="string"||a==="number")if(a==="number"&&(t=t.toString()),i){let s=r[0];s&&s.nodeType===3?s.data=t:s=document.createTextNode(t),r=X(e,r,n,s)}else r!==""&&typeof r=="string"?r=e.firstChild.data=t:r=e.textContent=t;else if(t==null||a==="boolean")r=X(e,r,n);else{if(a==="function")return ee(()=>{let s=t();for(;typeof s=="function";)s=s();r=ke(e,s,r,n)}),()=>r;if(Array.isArray(t)){const s=[],c=r&&Array.isArray(r);if(Be(s,t,r,o))return ee(()=>r=ke(e,s,r,n,!0)),()=>r;if(s.length===0){if(r=X(e,r,n),i)return r}else c?r.length===0?Je(e,s,n):Dt(e,r,s):(r&&X(e),Je(e,s));r=s}else if(t.nodeType){if(Array.isArray(r)){if(i)return r=X(e,r,n,t);X(e,r,null,t)}else r==null||r===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);r=t}else console.warn("Unrecognized value. Skipped inserting",t)}return r}function Be(e,t,r,n){let o=!1;for(let a=0,i=t.length;a<i;a++){let s=t[a],c=r&&r[a],d;if(!(s==null||s===!0||s===!1))if((d=typeof s)=="object"&&s.nodeType)e.push(s);else if(Array.isArray(s))o=Be(e,s,c)||o;else if(d==="function")if(n){for(;typeof s=="function";)s=s();o=Be(e,Array.isArray(s)?s:[s],Array.isArray(c)?c:[c])||o}else e.push(s),o=!0;else{const p=String(s);c&&c.nodeType===3&&c.data===p?e.push(c):e.push(document.createTextNode(p))}}return o}function Je(e,t,r=null){for(let n=0,o=t.length;n<o;n++)e.insertBefore(t[n],r)}function X(e,t,r,n){if(r===void 0)return e.textContent="";const o=n||document.createTextNode("");if(t.length){let a=!1;for(let i=t.length-1;i>=0;i--){const s=t[i];if(o!==s){const c=s.parentNode===e;!a&&!i?c?e.replaceChild(o,s):e.insertBefore(o,r):c&&s.remove()}else a=!0}}else e.insertBefore(o,r);return[o]}function Bt(e){return Object.keys(e).reduce((r,n)=>{const o=e[n];return r[n]=Object.assign({},o),ht(o.value)&&!Vt(o.value)&&!Array.isArray(o.value)&&(r[n].value=Object.assign({},o.value)),Array.isArray(o.value)&&(r[n].value=o.value.slice(0)),r},{})}function Ht(e){return e?Object.keys(e).reduce((r,n)=>{const o=e[n];return r[n]=ht(o)&&"value"in o?o:{value:o},r[n].attribute||(r[n].attribute=Yt(n)),r[n].parse="parse"in r[n]?r[n].parse:typeof r[n].value!="string",r},{}):{}}function zt(e){return Object.keys(e).reduce((r,n)=>(r[n]=e[n].value,r),{})}function Kt(e,t){const r=Bt(t);return Object.keys(t).forEach(o=>{const a=r[o],i=e.getAttribute(a.attribute),s=e[o];i&&(a.value=a.parse?dt(i):i),s!=null&&(a.value=Array.isArray(s)?s.slice(0):s),a.reflect&&We(e,a.attribute,a.value),Object.defineProperty(e,o,{get(){return a.value},set(c){const d=a.value;a.value=c,a.reflect&&We(this,a.attribute,a.value);for(let p=0,g=this.__propertyChangedCallbacks.length;p<g;p++)this.__propertyChangedCallbacks[p](o,c,d)},enumerable:!0,configurable:!0})}),r}function dt(e){if(e)try{return JSON.parse(e)}catch{return e}}function We(e,t,r){if(r==null||r===!1)return e.removeAttribute(t);let n=JSON.stringify(r);e.__updating[t]=!0,n==="true"&&(n=""),e.setAttribute(t,n),Promise.resolve().then(()=>delete e.__updating[t])}function Yt(e){return e.replace(/\.?([A-Z]+)/g,(t,r)=>"-"+r.toLowerCase()).replace("_","-").replace(/^-/,"")}function ht(e){return e!=null&&(typeof e=="object"||typeof e=="function")}function Vt(e){return Object.prototype.toString.call(e)==="[object Function]"}function Jt(e){return typeof e=="function"&&e.toString().indexOf("class")===0}let Me;function Wt(e,t){const r=Object.keys(t);return class extends e{static get observedAttributes(){return r.map(o=>t[o].attribute)}constructor(){super(),this.__initialized=!1,this.__released=!1,this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props={}}connectedCallback(){if(this.__initialized)return;this.__releaseCallbacks=[],this.__propertyChangedCallbacks=[],this.__updating={},this.props=Kt(this,t);const o=zt(this.props),a=this.Component,i=Me;try{Me=this,this.__initialized=!0,Jt(a)?new a(o,{element:this}):a(o,{element:this})}finally{Me=i}}async disconnectedCallback(){if(await Promise.resolve(),this.isConnected)return;this.__propertyChangedCallbacks.length=0;let o=null;for(;o=this.__releaseCallbacks.pop();)o(this);delete this.__initialized,this.__released=!0}attributeChangedCallback(o,a,i){if(this.__initialized&&!this.__updating[o]&&(o=this.lookupProp(o),o in t)){if(i==null&&!this[o])return;this[o]=t[o].parse?dt(i):i}}lookupProp(o){if(t)return r.find(a=>o===a||o===t[a].attribute)}get renderRoot(){return this.shadowRoot||this.attachShadow({mode:"open"})}addReleaseCallback(o){this.__releaseCallbacks.push(o)}addPropertyChangedCallback(o){this.__propertyChangedCallbacks.push(o)}}}function Xt(e,t={},r={}){const{BaseElement:n=HTMLElement,extension:o}=r;return a=>{if(!e)throw new Error("tag is required to register a Component");let i=customElements.get(e);return i?(i.prototype.Component=a,i):(i=Wt(n,Ht(t)),i.prototype.Component=a,i.prototype.registeredTag=e,customElements.define(e,i,o),i)}}function Zt(e){const t=Object.keys(e),r={};for(let n=0;n<t.length;n++){const[o,a]=Z(e[t[n]]);Object.defineProperty(r,t[n],{get:o,set(i){a(()=>i)}})}return r}function Qt(e){if(e.assignedSlot&&e.assignedSlot._$owner)return e.assignedSlot._$owner;let t=e.parentNode;for(;t&&!t._$owner&&!(t.assignedSlot&&t.assignedSlot._$owner);)t=t.parentNode;return t&&t.assignedSlot?t.assignedSlot._$owner:e._$owner}function er(e){return(t,r)=>{const{element:n}=r;return _e(o=>{const a=Zt(t);n.addPropertyChangedCallback((s,c)=>a[s]=c),n.addReleaseCallback(()=>{n.renderRoot.textContent="",o()});const i=e(a,r);return D(n.renderRoot,i)},Qt(n))}}function tr(e,t,r){return arguments.length===2&&(r=t,t={}),Xt(e,t)(er(r))}function Xe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),r.push.apply(r,n)}return r}function rr(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?Xe(Object(r),!0).forEach(function(n){or(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Xe(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function He(){He=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n=Object.defineProperty||function(u,l,f){u[l]=f.value},o=typeof Symbol=="function"?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(u,l,f){return Object.defineProperty(u,l,{value:f,enumerable:!0,configurable:!0,writable:!0}),u[l]}try{c({},"")}catch{c=function(l,f,y){return l[f]=y}}function d(u,l,f,y){var m=l&&l.prototype instanceof h?l:h,v=Object.create(m.prototype),C=new Te(y||[]);return n(v,"_invoke",{value:G(u,f,C)}),v}function p(u,l,f){try{return{type:"normal",arg:u.call(l,f)}}catch(y){return{type:"throw",arg:y}}}e.wrap=d;var g={};function h(){}function w(){}function S(){}var b={};c(b,a,function(){return this});var q=Object.getPrototypeOf,N=q&&q(q(qe([])));N&&N!==t&&r.call(N,a)&&(b=N);var E=S.prototype=h.prototype=Object.create(b);function I(u){["next","throw","return"].forEach(function(l){c(u,l,function(f){return this._invoke(l,f)})})}function T(u,l){function f(m,v,C,U){var L=p(u[m],u,v);if(L.type!=="throw"){var J=L.arg,ae=J.value;return ae&&typeof ae=="object"&&r.call(ae,"__await")?l.resolve(ae.__await).then(function(K){f("next",K,C,U)},function(K){f("throw",K,C,U)}):l.resolve(ae).then(function(K){J.value=K,C(J)},function(K){return f("throw",K,C,U)})}U(L.arg)}var y;n(this,"_invoke",{value:function(m,v){function C(){return new l(function(U,L){f(m,v,U,L)})}return y=y?y.then(C,C):C()}})}function G(u,l,f){var y="suspendedStart";return function(m,v){if(y==="executing")throw new Error("Generator is already running");if(y==="completed"){if(m==="throw")throw v;return{value:void 0,done:!0}}for(f.method=m,f.arg=v;;){var C=f.delegate;if(C){var U=de(C,f);if(U){if(U===g)continue;return U}}if(f.method==="next")f.sent=f._sent=f.arg;else if(f.method==="throw"){if(y==="suspendedStart")throw y="completed",f.arg;f.dispatchException(f.arg)}else f.method==="return"&&f.abrupt("return",f.arg);y="executing";var L=p(u,l,f);if(L.type==="normal"){if(y=f.done?"completed":"suspendedYield",L.arg===g)continue;return{value:L.arg,done:f.done}}L.type==="throw"&&(y="completed",f.method="throw",f.arg=L.arg)}}}function de(u,l){var f=l.method,y=u.iterator[f];if(y===void 0)return l.delegate=null,f==="throw"&&u.iterator.return&&(l.method="return",l.arg=void 0,de(u,l),l.method==="throw")||f!=="return"&&(l.method="throw",l.arg=new TypeError("The iterator does not provide a '"+f+"' method")),g;var m=p(y,u.iterator,l.arg);if(m.type==="throw")return l.method="throw",l.arg=m.arg,l.delegate=null,g;var v=m.arg;return v?v.done?(l[u.resultName]=v.value,l.next=u.nextLoc,l.method!=="return"&&(l.method="next",l.arg=void 0),l.delegate=null,g):v:(l.method="throw",l.arg=new TypeError("iterator result is not an object"),l.delegate=null,g)}function _t(u){var l={tryLoc:u[0]};1 in u&&(l.catchLoc=u[1]),2 in u&&(l.finallyLoc=u[2],l.afterLoc=u[3]),this.tryEntries.push(l)}function Ne(u){var l=u.completion||{};l.type="normal",delete l.arg,u.completion=l}function Te(u){this.tryEntries=[{tryLoc:"root"}],u.forEach(_t,this),this.reset(!0)}function qe(u){if(u||u===""){var l=u[a];if(l)return l.call(u);if(typeof u.next=="function")return u;if(!isNaN(u.length)){var f=-1,y=function m(){for(;++f<u.length;)if(r.call(u,f))return m.value=u[f],m.done=!1,m;return m.value=void 0,m.done=!0,m};return y.next=y}}throw new TypeError(typeof u+" is not iterable")}return w.prototype=S,n(E,"constructor",{value:S,configurable:!0}),n(S,"constructor",{value:w,configurable:!0}),w.displayName=c(S,s,"GeneratorFunction"),e.isGeneratorFunction=function(u){var l=typeof u=="function"&&u.constructor;return!!l&&(l===w||(l.displayName||l.name)==="GeneratorFunction")},e.mark=function(u){return Object.setPrototypeOf?Object.setPrototypeOf(u,S):(u.__proto__=S,c(u,s,"GeneratorFunction")),u.prototype=Object.create(E),u},e.awrap=function(u){return{__await:u}},I(T.prototype),c(T.prototype,i,function(){return this}),e.AsyncIterator=T,e.async=function(u,l,f,y,m){m===void 0&&(m=Promise);var v=new T(d(u,l,f,y),m);return e.isGeneratorFunction(l)?v:v.next().then(function(C){return C.done?C.value:v.next()})},I(E),c(E,s,"Generator"),c(E,a,function(){return this}),c(E,"toString",function(){return"[object Generator]"}),e.keys=function(u){var l=Object(u),f=[];for(var y in l)f.push(y);return f.reverse(),function m(){for(;f.length;){var v=f.pop();if(v in l)return m.value=v,m.done=!1,m}return m.done=!0,m}},e.values=qe,Te.prototype={constructor:Te,reset:function(u){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(Ne),!u)for(var l in this)l.charAt(0)==="t"&&r.call(this,l)&&!isNaN(+l.slice(1))&&(this[l]=void 0)},stop:function(){this.done=!0;var u=this.tryEntries[0].completion;if(u.type==="throw")throw u.arg;return this.rval},dispatchException:function(u){if(this.done)throw u;var l=this;function f(L,J){return v.type="throw",v.arg=u,l.next=L,J&&(l.method="next",l.arg=void 0),!!J}for(var y=this.tryEntries.length-1;y>=0;--y){var m=this.tryEntries[y],v=m.completion;if(m.tryLoc==="root")return f("end");if(m.tryLoc<=this.prev){var C=r.call(m,"catchLoc"),U=r.call(m,"finallyLoc");if(C&&U){if(this.prev<m.catchLoc)return f(m.catchLoc,!0);if(this.prev<m.finallyLoc)return f(m.finallyLoc)}else if(C){if(this.prev<m.catchLoc)return f(m.catchLoc,!0)}else{if(!U)throw new Error("try statement without catch or finally");if(this.prev<m.finallyLoc)return f(m.finallyLoc)}}}},abrupt:function(u,l){for(var f=this.tryEntries.length-1;f>=0;--f){var y=this.tryEntries[f];if(y.tryLoc<=this.prev&&r.call(y,"finallyLoc")&&this.prev<y.finallyLoc){var m=y;break}}m&&(u==="break"||u==="continue")&&m.tryLoc<=l&&l<=m.finallyLoc&&(m=null);var v=m?m.completion:{};return v.type=u,v.arg=l,m?(this.method="next",this.next=m.finallyLoc,g):this.complete(v)},complete:function(u,l){if(u.type==="throw")throw u.arg;return u.type==="break"||u.type==="continue"?this.next=u.arg:u.type==="return"?(this.rval=this.arg=u.arg,this.method="return",this.next="end"):u.type==="normal"&&l&&(this.next=l),g},finish:function(u){for(var l=this.tryEntries.length-1;l>=0;--l){var f=this.tryEntries[l];if(f.finallyLoc===u)return this.complete(f.completion,f.afterLoc),Ne(f),g}},catch:function(u){for(var l=this.tryEntries.length-1;l>=0;--l){var f=this.tryEntries[l];if(f.tryLoc===u){var y=f.completion;if(y.type==="throw"){var m=y.arg;Ne(f)}return m}}throw new Error("illegal catch attempt")},delegateYield:function(u,l,f){return this.delegate={iterator:qe(u),resultName:l,nextLoc:f},this.method==="next"&&(this.arg=void 0),g}},e}function Ze(e,t,r,n,o,a,i){try{var s=e[a](i),c=s.value}catch(d){r(d);return}s.done?t(c):Promise.resolve(c).then(n,o)}function nr(e){return function(){var t=this,r=arguments;return new Promise(function(n,o){var a=e.apply(t,r);function i(c){Ze(a,n,o,i,s,"next",c)}function s(c){Ze(a,n,o,i,s,"throw",c)}i(void 0)})}}function or(e,t,r){return t=lr(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ar(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}function ir(e,t){if(e==null)return{};var r=ar(e,t),n,o;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function sr(e,t){if(typeof e!="object"||e===null)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function lr(e){var t=sr(e,"string");return typeof t=="symbol"?t:String(t)}var yt="https://cdn.paddle.com/paddle/v2/paddle.js";function ur(){return document.querySelector('script[src="'.concat(yt,'"]'))||void 0}function cr(e){var t=document.createElement("script");t.src=e,t.crossOrigin="anonymous";var r=document.head||document.body;if(!r)throw new Error("Cannot inject Paddle.js. It needs a <head> or <body> element.");return r.appendChild(t),t}var he;function pr(){return he!==void 0||(he=new Promise(function(e,t){if(typeof window>"u"){e(void 0);return}if(window.Paddle){e(window.Paddle);return}try{var r=ur();r||(r=cr(yt)),r.addEventListener("load",function(){window.Paddle?e(window.Paddle):t(new Error("Paddle.js not available"))}),r.addEventListener("error",function(){t(new Error("Failed to load Paddle.js"))})}catch(n){t(n);return}})),he}var fr=["environment"];function mr(e){return ze.apply(this,arguments)}function ze(){return ze=nr(He().mark(function e(t){var r,n,o;return He().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,pr();case 2:if(r=i.sent,!r){i.next=8;break}if(t){n=t.environment,o=ir(t,fr);try{n&&r.Environment.set(n),r.Setup(rr({},o))}catch(s){console.warn("Paddle Initialization failed. Please check the inputs",s)}}return i.abrupt("return",r);case 8:return console.warn("Error Loading Paddle"),i.abrupt("return");case 10:case"end":return i.stop()}},e)})),ze.apply(this,arguments)}const Qe={AppealForm:{currency:typeof adblock=="object"&&adblock.settings.currency||"USD",selected:3},Paddle:{sandbox:{vendor:11004,products:{USD:{once:{1e3:46028,1500:46029,2e3:46030,3500:46031,5e3:46032,custom:500},monthly:{199:46074,299:46075,399:46076,499:46077,999:46078,custom:199},yearly:{1e3:46079,1500:46080,2e3:46081,3500:46082,5e3:46083,custom:500}},AUD:{once:{1e3:46033,1500:46034,2e3:46035,3500:46036,5e3:46037,custom:500},monthly:{199:46084,299:46085,399:46086,499:46087,999:46088,custom:199},yearly:{1e3:46089,1500:46090,2e3:46091,3500:46092,5e3:46093,custom:500}},CAD:{once:{1e3:46038,1500:46039,2e3:46040,3500:46041,5e3:46042,custom:500},monthly:{199:46094,299:46095,399:46096,499:46097,999:46098,custom:199},yearly:{1e3:46099,1500:46181,2e3:46182,3500:46183,5e3:46184,custom:500}},EUR:{once:{1e3:46048,1500:46049,2e3:46050,3500:46051,5e3:46052,custom:500},monthly:{199:46195,299:46196,399:46197,499:46198,999:46199,custom:199},yearly:{1e3:46200,1500:46201,2e3:46202,3500:46203,5e3:46204,custom:500}},GBP:{once:{1e3:46053,1500:46054,2e3:46055,3500:46056,5e3:46057,custom:500},monthly:{199:46205,299:46206,399:46207,499:46208,999:46209,custom:199},yearly:{1e3:46210,1500:46211,2e3:46212,3500:46213,5e3:46214,custom:500}},JPY:{once:{1500:46064,2e3:46065,2500:46066,3500:46067,5e3:46068,custom:500},monthly:{200:46225,300:46226,500:46227,1e3:46228,1500:46229,custom:200},yearly:{1500:46230,2e3:46231,2500:46232,3500:46233,5e3:46234,custom:500}},NZD:{once:{1e3:46058,1500:46059,2e3:46060,3500:46062,5e3:46063,custom:500},monthly:{199:46215,299:46216,399:46217,499:46218,999:46219,custom:199},yearly:{1e3:46220,1500:46221,2e3:46222,3500:46223,5e3:46224,custom:500}},CHF:{once:{1e3:46043,1500:46044,2e3:46045,3500:46046,5e3:46047,custom:500},monthly:{199:46185,299:46186,399:46187,499:46188,999:46189,custom:199},yearly:{1e3:46190,1500:46191,2e3:46192,3500:46193,5e3:46194,custom:500}},RUB:{once:{25e3:46069,5e4:46070,1e5:46071,25e4:46072,5e5:46073,custom:25e3},monthly:{15e3:46235,25e3:46236,4e4:46237,5e4:46238,1e5:46239,custom:15e3},yearly:{25e3:46240,5e4:46241,1e5:46242,25e4:46243,5e5:46244,custom:25e3}}}},live:{vendor:164164,products:{USD:{once:{1e3:816549,1500:816550,2e3:816551,3500:816552,5e3:816553,custom:500},monthly:{199:816774,299:816775,399:816776,499:816777,999:816778,custom:199},yearly:{1e3:816779,1500:816780,2e3:816781,3500:816782,5e3:816783,custom:500}},AUD:{once:{1e3:816522,1500:816523,2e3:816524,3500:816525,5e3:816526,custom:500},monthly:{199:816692,299:816693,399:816694,499:816696,999:816697,custom:199},yearly:{1e3:816699,1500:816700,2e3:816702,3500:816703,5e3:816705,custom:500}},CAD:{once:{1e3:816528,1500:816529,2e3:816530,3500:816531,5e3:816532,custom:500},monthly:{199:816706,299:816708,399:816710,499:816711,999:816712,custom:199},yearly:{1e3:816714,1500:816715,2e3:816716,3500:816717,5e3:816718,custom:500}},EUR:{once:{1e3:816517,1500:816518,2e3:816519,3500:816520,5e3:816521,custom:500},monthly:{199:816681,299:816682,399:816683,499:816684,999:816686,custom:199},yearly:{1e3:816687,1500:816688,2e3:816689,3500:816690,5e3:816691,custom:500}},GBP:{once:{1e3:816538,1500:816539,2e3:816540,3500:816541,5e3:816542,custom:500},monthly:{199:816734,299:816735,399:816736,499:816737,999:816738,custom:199},yearly:{1e3:816739,1500:816740,2e3:816741,3500:816743,5e3:816744,custom:500}},JPY:{once:{1500:816554,2e3:816555,2500:816556,3500:816557,5e3:816558,custom:500},monthly:{200:816784,300:816785,500:816786,1e3:816787,1500:816788,custom:200},yearly:{1500:816789,2e3:816791,2500:816792,3500:816794,5e3:816795,custom:500}},NZD:{once:{1e3:816543,1500:816544,2e3:816545,3500:816547,5e3:816548,custom:500},monthly:{199:816760,299:816762,399:816764,499:816766,999:816768,custom:199},yearly:{1e3:816769,1500:816770,2e3:816771,3500:816772,5e3:816773,custom:500}},CHF:{once:{1e3:816533,1500:816535,2e3:816534,3500:816536,5e3:816537,custom:500},monthly:{199:816720,299:816722,399:816723,499:816725,999:816726,custom:199},yearly:{1e3:816727,1500:816728,2e3:816730,3500:816731,5e3:816733,custom:500}},RUB:{once:{25e3:816559,5e4:816560,1e5:816561,25e4:816562,5e5:816563,custom:25e3},monthly:{15e3:816796,25e3:816797,4e4:816799,5e4:816800,1e5:816801,custom:15e3},yearly:{25e3:816802,5e4:816803,1e5:816804,25e4:816805,5e5:816806,custom:25e3}}}}}};function gt(e,t){return new Intl.NumberFormat("en-US",{style:"currency",currency:t}).format(e/100)}const dr=oe('<fieldset class="appeal-form-frequency"><legend class="appeal-form-frequency__heading"></legend><div class="appeal-form-frequency__options"><div class="appeal-form-amounts"><label class="appeal-form-amount appeal-form-amount--custom"><input type="radio" name="appeal-form-amount__radio" class="appeal-form-amount__radio" value="custom" data-product="custom"><input type="number" step=".01" class="appeal-form-amount__input" data-product="custom" placeholder="35" data-minimum="5">'),hr=oe('<label class="appeal-form-amount appeal-form-amount--fixed"><input type="radio" name="appeal-form-amount__radio" class="appeal-form-amount__radio"><span class="appeal-form-amount__text">');function et(e){return(()=>{const t=dr(),r=t.firstChild,n=r.nextSibling,o=n.firstChild,a=o.firstChild,i=a.firstChild,s=i.nextSibling;return mt(t,"click",e.onClick,!0),D(o,Q(Rt,{get each(){return Object.keys(e.products)},children:c=>{if(c!=="custom")return(()=>{const d=hr(),p=d.firstChild,g=p.nextSibling;return p.value=c,D(g,()=>gt(c,e.currency)),ee(h=>{const w=`appeal-form-amount__radio--${e.frequency}-0`,S=e.frequency,b=e.products[c];return w!==h._v$7&&B(p,"data-testid",h._v$7=w),S!==h._v$8&&B(p,"data-frequency",h._v$8=S),b!==h._v$9&&B(p,"data-product",h._v$9=b),h},{_v$7:void 0,_v$8:void 0,_v$9:void 0}),ee(()=>p.checked=c===e.defaultProduct),d})()}}),a),D(t,()=>e.children,null),ee(c=>{const d=`border-color: ${e.active?"#2196f3":"#e0e0e0"}`,p=e.legendText,g=`appeal-form-amount__radio--${e.frequency}-6`,h=e.frequency,w=`appeal-form-amount__input--${e.frequency}`,S=e.frequency;return c._v$=Ft(t,d,c._v$),p!==c._v$2&&(r.innerHTML=c._v$2=p),g!==c._v$3&&B(i,"data-testid",c._v$3=g),h!==c._v$4&&B(i,"data-frequency",c._v$4=h),w!==c._v$5&&B(s,"data-testid",c._v$5=w),S!==c._v$6&&B(s,"data-frequency",c._v$6=S),c},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0,_v$5:void 0,_v$6:void 0}),t})()}ft(["click"]);const yr=oe('<div class="toggle-wrap"><div class="toggle-main-txt">Monthly</div><label class="switch"><input class="toggle-input" type="checkbox" value="frequency"><span class="slider round"></span></label><div class="toggle-main-txt">Yearly');function gr(e){return(()=>{const t=yr(),r=t.firstChild,n=r.nextSibling,o=n.firstChild;return mt(o,"click",e.onClick,!0),t})()}ft(["click"]);const _r=oe('<div id="what-is-included" class="info premium-upsell"><span class="info-line premium-upsell__border-start"></span><p id="one-year" class="premium-upsell__year">Nice! A <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium for one year. Thanks for your support.</p><p id="x-years" class="premium-upsell__years" hidden="">Nice! A <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium for <span class="premium-upsell__duration"></span> years. Thanks for your support.</p><p id="x-months" class="premium-upsell__months" hidden="">Nice! A <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium for <span class="premium-upsell__duration"></span> months. Thanks for your support.</p><p id="monthly" class="premium-upsell__monthly" hidden="">Nice! A monthly <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium. Thanks for your support.</p><p id="yearly" class="premium-upsell__yearly" hidden="">Nice! A yearly <span class="premium-upsell__currency"></span><span class="premium-upsell__amount"></span> contribution gets Adblock Plus Premium. Thanks for your support.');function br(e){return(()=>{const t=_r(),r=t.firstChild,n=r.nextSibling,o=n.firstChild,a=o.nextSibling,i=a.nextSibling;return D(i,()=>e.amount),t})()}const vr=`.appeal-form{margin-top:1rem;margin-bottom:1rem}.appeal-form .appeal-form__placeholder{position:relative;display:inline-block;overflow:hidden;height:1em;border-radius:3px;background-color:#e6e6e6}.appeal-form .appeal-form__placeholder:after{position:absolute;top:0;right:0;bottom:0;left:0;content:"";transform:translate(-100%);animation:shimmer 3s infinite;background-image:linear-gradient(90deg,rgba(255,255,255,0) 0,rgba(255,255,255,.2) 20%,rgba(255,255,255,.5) 60%,rgba(255,255,255,0))}@-webkit-keyframes shimmer{to{transform:translate(100%)}}@keyframes shimmer{to{transform:translate(100%)}}.appeal-form .appeal-form-header{margin-bottom:.5rem}.appeal-form .appeal-form-header__heading{font-size:1.125rem;display:inline-block;margin:0}.appeal-form .appeal-form-header__select{font-size:.875rem}.appeal-form .appeal-form-frequencies{display:flex;flex-wrap:wrap;gap:1rem;max-width:53.125rem;margin-top:.5rem;margin-bottom:.5rem}:not([dir=rtl]) .appeal-form .appeal-form-frequencies{margin-left:-1rem}[dir=rtl] .appeal-form .appeal-form-frequencies{margin-right:-1rem}.appeal-form .appeal-form-frequency{position:relative;flex:0 0 90%;padding:1rem;border-radius:.25rem;border-width:1px;border-color:#e6e6e6}:not([dir=rtl]) .appeal-form .appeal-form-frequency{padding-left:1rem}[dir=rtl] .appeal-form .appeal-form-frequency{padding-right:1rem}@media (min-width: 55.125rem){.appeal-form .appeal-form-frequency{flex:1;padding-top:0}}.appeal-form .appeal-form-frequency__heading{font-size:1rem;font-weight:400;margin-top:0;margin-bottom:.375rem}.appeal-form .appeal-form-amounts{display:flex;flex-wrap:wrap;max-width:16.70875rem;align-items:center}:not([dir=rtl]) .appeal-form .appeal-form-amounts{padding-right:1rem}[dir=rtl] .appeal-form .appeal-form-amounts{padding-left:1rem}@media (min-width: 55.125rem){:not([dir=rtl]) .appeal-form .appeal-form-amounts{border-right:1px solid gray}[dir=rtl] .appeal-form .appeal-form-amounts{border-left:1px solid gray}.appeal-form .appeal-form-frequency:last-of-type .appeal-form-amounts{border:0}}.appeal-form .appeal-form-amount{line-height:1.7;display:flex;width:33.33333333%}:not([dir=rtl]) .appeal-form .appeal-form-amount__radio{margin-left:0}[dir=rtl] .appeal-form .appeal-form-amount__radio{margin-right:0}.appeal-form .appeal-form-amount__text{padding-top:1.5px}.appeal-form .appeal-form-amount__input{font-size:.875rem;width:100%;height:1.4rem;margin-top:.1875rem;padding:.125rem .25rem;border:1px solid gray}:not([dir=rtl]) .appeal-form .appeal-form-amount__input{margin-right:.1875rem}[dir=rtl] .appeal-form .appeal-form-amount__input{margin-left:.1875rem}@media (min-width: 55.125rem){.appeal-form .appeal-form-checkout{display:flex}}.appeal-form .appeal-form-checkout__submit{font-size:.9375rem;font-weight:700;display:flex;align-items:center;justify-content:center;width:100%;height:2rem;margin-bottom:1rem;margin-right:1rem;text-align:center;color:#fff;border:0;border-radius:3.5px;background-color:#0047ff;box-shadow:0 0 1px #0003;cursor:pointer}.appeal-form .appeal-form-checkout__submit:disabled{filter:grayscale(100)}@media (min-width: 23.75rem){.appeal-form .appeal-form-checkout__submit{max-width:14rem}:not([dir=rtl]) .appeal-form .appeal-form-checkout__submit{margin-right:1rem}[dir=rtl] .appeal-form .appeal-form-checkout__submit{margin-left:1rem}}@media (min-width: 55.125rem){.appeal-form .appeal-form-checkout__submit{margin-bottom:0}}.appeal-form .appeal-form-checkout__icon{height:1rem}:not([dir=rtl]) .appeal-form .appeal-form-checkout__icon{margin-right:.25rem}[dir=rtl] .appeal-form .appeal-form-checkout__icon{margin-left:.25rem}.appeal-form .appeal-form-checkout__image{width:100%;max-width:340px;max-height:32px}.toggle-wrap{position:absolute;top:-38px;right:10px;padding:0 2px;background-color:#fff;display:flex;align-items:center;font-family:Source Sans Pro;font-style:normal;font-weight:300;font-size:11px;line-height:34px;height:34px;color:#000}.switch{position:relative;display:inline-block;width:44px;height:22px;margin:0 10px}.switch input{opacity:0;width:0;height:0}.slider.round{border-radius:34px}.slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#2196f3;-webkit-transition:.4s;transition:.4s}.slider.round:before{border-radius:50%}.slider:before{position:absolute;content:"";width:18px;height:18px;left:2px;bottom:2px;background-color:#fff;-webkit-transition:.4s;transition:.4s}input:checked+.slider:before{-webkit-transform:translateX(22px);-ms-transform:translateX(22px);transform:translate(22px)}.premium-upsell{display:flex;border:1px solid #666666;border-radius:10px;margin:1rem 0;padding:.5rem}.premium-upsell__border-start{display:flex;width:.5rem;background-color:#2284f7;border-radius:4px;align-items:stretch}.premium-upsell>p{margin:.5rem 0;margin-inline-start:1rem}
`,wr=oe('<form class="appeal-form"><div class="appeal-form-frequencies"></div><div class="appeal-form-checkout"><input class="appeal-form-checkout__submit" data-testid="appeal-form-checkout__submit" type="submit" value="Checkout Now"><img alt="" src="/components/AppealForm/appeal-form-checkout__image.svg" class="appeal-form-checkout__image">'),Sr=oe("<style>");function Er(e){const t=e.currency,n=e.environment!=="production"?"sandbox":"live",o=Qe.Paddle[n].products[t],[a,i]=Z("monthly"),[s,c]=Z(3500),[d,p]=Z(),[g,h]=Z();$t(async()=>{const b=await mr({seller:Qe.Paddle[n].vendor});b?p(b):console.warn("Paddle not initialized")});const w=b=>{i(b.target.checked?"yearly":"monthly")},S=b=>{b.preventDefault();const N=[...new FormData(b.target).entries()];if(N.length===0){alert("no product selected");return}d().Checkout.open({allowQuantity:!1,product:N[0][1]})};return[(()=>{const b=wr(),q=b.firstChild,N=q.nextSibling;return b.addEventListener("change",E=>{E.preventDefault(),c(E.target.value)}),b.addEventListener("submit",S),D(q,Q(et,{frequency:"once",get products(){return o.once},legendText:"Make a <strong>one-off</strong> contribution",currency:t,defaultProduct:"3500",get active(){return g()==="once"},onClick:()=>h("once")}),null),D(q,Q(et,{get frequency(){return o[a()]},get products(){return o[a()]},legendText:"Make a <strong>Recurring</strong> contribution",currency:t,borderColor:"#2196f3",get active(){return g()==="recurring"},onClick:()=>h("recurring"),get children(){return Q(gr,{onClick:w})}}),null),D(b,Q(br,{get amount(){return gt(s(),t)}}),N),b})(),(()=>{const b=Sr();return D(b,vr),b})()]}tr("appeal-form",{currency:"USD",environment:"development"},e=>Q(Er,{get currency(){return e.currency},get environment(){return e.environment}}));Pt();
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
