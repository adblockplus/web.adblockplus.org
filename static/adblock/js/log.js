var _ADBLOCK_PROPER = "A";
var _ADBLOCK_PREMIUM = "P";
var abLogV2Url = "https://log.getadblock.com/v2/record_log.php";
if (document.location.hostname !== undefined) {
    if (document.location.hostname === "localhost" ||
        (/^dev/).test(document.location.hostname) === true) {
        abLogV2Url = "http://dev.log.getadblock.com/v2/record_log.php";
    }
}

_logV2Message = function(event, params, callback) {
    // Add basic params: userid, flavor, and os
    params['u'] = getUserIdOrUnknown();
    params['f'] = getBrowser();
    params['o'] = getOSSingleChar();
    params['l'] = getLanguage();
    params['p'] = false;
    params['psess'] = "";
    params['wsrc'] = "core";
    if (typeof isPremium === "function" && isPremium() === true) {
        params['p'] = isPremium();
        // get premium userid instead of regular
        params['u'] = getPremiumUserIdOrUnknown();
        if (typeof getPremiumSession === "function") {
            params['psess'] = getPremiumSession();
        }
    }
    
    var payload = {'event':  event, 'payload': params};

    var xhr = new XMLHttpRequest();
    xhr.open("post", abLogV2Url, true);

    if (typeof callback === "function") {
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (typeof callback === "function") {
                    callback(xhr);
                }
            }
        }
    }
    xhr.send(JSON.stringify(payload));
}

_logV2DownloadButtonClick = function(extension, loc) {
    if (extension !== _ADBLOCK_PROPER && extension !== _ADBLOCK_PREMIUM) {
        return;
    }
    if (typeof loc !== 'string') {
        loc = "";
    }
    var payload = { 
        "s": getPlainSource(), 
        "exp": 0,
        "var": 0,
        "ext": extension,
        "cid": "0",
        "sid": "0",
        "loc": loc
    };

    if (typeof _experiment !== 'undefined' && _experiment.isExperimentRunning("*")) {
        payload['exp'] = _experiment.xNumber("*");
        payload['var'] = _experiment.variantIndex("*") + 1;
    }

    if (typeof isPremium === 'function' && isPremium()) {
        if (typeof getPremiumCid === 'function' && typeof getPremiumSid === 'function') {
            payload['sid'] = getPremiumSid();
            payload['cid'] = getPremiumCid();
        }
    }
    _logV2Message("download_button_clicked", payload);
}

_logV2PaymentButtonClick = function(processor, cents, buttonType, isSubscription, subType) {
    var isSub = isSubscription === true ? isSubscription : false;
    var sType = typeof subType === "string" && isSub === true ? subType : "";
    var payload = { 
        "s": getPlainSource(), 
        "processor": processor,
        "buttonType": buttonType,
        "cents": cents,
        "exp": 0,
        "var": 0,
        "isSub": isSub,
        "subType": sType,
    };
    if (typeof _experiment !== 'undefined' && _experiment.isExperimentRunning("*")) {
        payload['exp'] = _experiment.xNumber("*");
        payload['var'] = _experiment.variantIndex("*") + 1;
    }
    if (typeof isPremium === 'function' && isPremium()) {
        _logV2PremiumPaymentButtonClick(payload);
    } else {
        _logV2Message("payment_button_clicked", payload);
    }
}

_logV2PremiumPaymentButtonClick = function(payload) {
    payload['sid'] = "0";
    payload['cid'] = "0";
    if (typeof getPremiumCid === 'function' && typeof getPremiumSid === 'function') {
        payload['sid'] = getPremiumSid();
        payload['cid'] = getPremiumCid();
    }
    _logV2Message("premium_payment_button_clicked", payload);
}

_logV2PageView = function(page, additionalParams) {
    var payload = {
        "s": getPlainSource(),
        "exp": 0,
        "var": 0,
    };
    if (typeof additionalParams === "object") {
        for (var prop in additionalParams) {
            payload[prop] = additionalParams[prop];
        }
    }
    if (typeof _experiment !== 'undefined' && _experiment.isExperimentRunning("*")) {
        payload['exp'] = _experiment.xNumber("*");
        payload['var'] = _experiment.variantIndex("*") + 1;
    }

    _logV2Message(page + "_page_view", payload);
}

_logV2PremiumPageView = function(page, additionalParams) {
    var payload = {
        "exp": 0,
        "var": 0,
        "cid": "0",
        "sid": "0",
    };
    if (typeof additionalParams === "object") {
        for (var prop in additionalParams) {
            payload[prop] = additionalParams[prop];
        }
    }
    if (typeof _experiment !== 'undefined' && _experiment.isExperimentRunning("*")) {
        payload['exp'] = _experiment.xNumber("*");
        payload['var'] = _experiment.variantIndex("*") + 1;
    }
    if (typeof getPremiumCid === 'function' && typeof getPremiumSid === 'function') {
        payload['sid'] = getPremiumSid();
        payload['cid'] = getPremiumCid();
    }
    // Landing page needs special params
    if (page === "landing_page") {
        payload["abId"] = getUserIdOrUnknown();
        payload["abprId"] = getPremiumUserIdOrUnknown();
    }

    _logV2Message("premium_" + page + "_page_view", payload);
}

_logV2UninstallReason = function(reason, miscText, t, bc, abclt, callback) {
    var payload = {
        "s": getPlainSource(),
        "cid": "0",
        "sid": "0",
        "reason": reason,
        "misc_text": miscText,
        "t": t,
        "bc": bc,
        "abclt": abclt
    }
    
    if (typeof isPremium === 'function' && isPremium()) {
        if (typeof getPremiumCid === 'function' && typeof getPremiumSid === 'function') {
            payload['sid'] = getPremiumSid();
            payload['cid'] = getPremiumCid();
        }
    }

    _logV2Message("uninstall_reason", payload, callback);
}

_logV2MiscButtonClick = function(buttonName, additionalParams, callback) {
    var payload = {
        "s": getPlainSource(),
        "name": buttonName,
        "exp": 0,
        "var": 0,
        "sid": "0",
        "cid": "0",
    }

    if (typeof additionalParams === "object") {
        for (var prop in additionalParams) {
            payload[prop] = additionalParams[prop];
        }
    }
    
    if (typeof isPremium === 'function' && isPremium()) {
        if (typeof getPremiumCid === 'function' && typeof getPremiumSid === 'function') {
            payload['sid'] = getPremiumSid();
            payload['cid'] = getPremiumCid();
        }
    }

    if (typeof _experiment !== 'undefined' && _experiment.isExperimentRunning("*")) {
        payload['exp'] = _experiment.xNumber("*");
        payload['var'] = _experiment.variantIndex("*") + 1;
    }

    _logV2Message("misc_button_click", payload, callback);
}

_logV2MiscEvent = function(event_name, additionalParams, callback) {
    var payload = {
        "s": getPlainSource(),
        "event_name": event_name,
        "exp": 0,
        "var": 0,
    }

    if (typeof additionalParams === "object") {
        for (var prop in additionalParams) {
            payload[prop] = additionalParams[prop];
        }
    }
    
    if (typeof _experiment !== 'undefined' && _experiment.isExperimentRunning("*")) {
        payload['exp'] = _experiment.xNumber("*");
        payload['var'] = _experiment.variantIndex("*") + 1;
    }

    _logV2Message("misc_event", payload, callback);
}

_logV2Error = function(errorMessage, sourceFile, lineNum, colNum, additionalParams) {
    if (errorMessage === null || typeof errorMessage !== "string") { return false; }
    sourceFile = sourceFile !== null && typeof sourceFile === "string" ? sourceFile : "";
    lineNum = (lineNum !== null && !isNaN(lineNum)) ? Number(lineNum) : -1;
    colNum = (colNum !== null && !isNaN(colNum)) ? Number(colNum) : -1;
    
    var payload = {
        "s": getPlainSource(),
        "exp": 0,
        "var": 0,
        "error_msg": errorMessage,
        "source_file": sourceFile,
        "line_num": lineNum,
        "col_num": colNum,
    };
    if (typeof additionalParams === "object") {
        for (var prop in additionalParams) {
            payload[prop] = additionalParams[prop];
        }
    }
    if (typeof _experiment !== 'undefined' && _experiment.isExperimentRunning("*")) {
        payload['exp'] = _experiment.xNumber("*");
        payload['var'] = _experiment.variantIndex("*") + 1;
    }

    _logV2Message("website_error", payload);
};
