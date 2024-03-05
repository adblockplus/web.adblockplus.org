var _experiment = (function() {
    const EN_LOCALE_ONLY = 1;
    const ALL_LOCALES = 2;
    const NOT_EN_LOCALE = 3;
    const FR_LOCALE_ONLY = 4;
    const ALL_BROWSERS = "All";
    const CHROME = "E";
    const SAFARI = "S";
    const FIREFOX = "F";
    var SERVER_EXPERIMENT_RUNNING = false;
    var SERVER_VARIANT_INDEX = -1;
    // Can be called with two forms:
    //   experiment("")
    //     - represents the default experiment
    //   experiment(experimentId, name, xNumber, variants, locales, browsers)
    //     - all inputs are required.
    //       - experimentId: the GCE experiment ID.
    //       - name: the GCE experiment name.
    //       - xNumber: if 40, "X40" will be in payment tracking strings
    //       - variants: list of variant names
    //       - locales: either EN_LOCALE_ONLY or ALL_LOCALES or NOT_EN_LOCALE
    //       - browsers: An array containing ALL_BROWSERS, CHROME, SAFARI, and/or FIREFOX
    //   experiment.setDistribution([0, 0, 1, 1, 2, 2])
    //       - Sets the distribution for the experiment.  During enrollment the
    //       - experiment engine will random for a value in the distribution array.
    //       - The value will be in the variantIndex.
    //       -
    //       - Default distributions are created on experiment creation with 
    //       - equal percentages for all variants
    var experiment = function(experimentId, name, xNumber, variants, locales, browsers) {
        var experimentName = "";
        var variant = "";
        var variantIndex = -1;
        var distribution = [];

        // Set variant and variantIndex to the variant with correct index.
        // Return true unless the index is out of bounds or invalid.
        function setVariant(index) {
            if (index < 0 || index >= variants.length) {
                return false;
            }
        
            variant = variants[index];
            variantIndex = index;
            return true;
        }

        // Returns true if the user is not to be experimented upon.
        function excludedFromExperiment() {
            var exclude = false;
            var lan = window.navigator.userLanguage || window.navigator.language;
            var forcedLanguage = (document.location.search.match(/(?:[?&])lang=([a-zA-Z-]+)/) || {})[1];
            // Change language if it's forced through URL.
            if (typeof forcedLanguage !== "undefined") {
                console.log("Forcing language to " + forcedLanguage);
                lan = forcedLanguage;
            }
            if (locales === EN_LOCALE_ONLY) {
                var nonEnglish = (lan.slice(0, 2) !== "en");
                if (nonEnglish) {
                    exclude = true;
                }
            } else if (locales === FR_LOCALE_ONLY) {
                var nonFrench = (lan.slice(0, 2) !== "fr");
                if (nonFrench) {
                    exclude = true;
                }
            } else if (locales === NOT_EN_LOCALE) {
                var isEnglish = (lan.slice(0, 2) === "en");
                if (isEnglish) {
                    exclude = true;
                }
            }
            
            if (exclude == false && $.inArray(ALL_BROWSERS, browsers) == -1) {
                // External dependency on getBrowser() from js/user.js
                // TODO: Make this less sketchy and less prone to breakage
                //       without knowing why it broke.
                exclude = $.inArray(getBrowser(), browsers) == -1;
            }
            
            return exclude;
        }
        
        function setup_once() {
            if (setup_once._hasRun) {
              return;
            }
            setup_once._hasRun = true;

            // if experimentId is the blank string then it's the default experiment
            if (experimentId === "") {
                return;
            }
            
            if (excludedFromExperiment()) {
              return;
            }

            // Create default distribution if a distrubtion array doesn't exist.
            // Use equal weighting for all variants
            if (distribution == []) {
                for (var i = 0; i < variants.length; i++) {
                    distribution.push(i);
                }
            }

            var setupSuccess = false;
            // TODO(stephen): Handle variant key being anywhere in the values list.
            var forcedVariant = (document.location.search.match(/(?:[?&])var=([0-9]+)/) || {})[1];
            // Change variant if it's forced through URL.
            if (typeof forcedVariant !== 'undefined') {
                console.log("Forcing variant to " + forcedVariant);
            }
            // We also use this code to set the variant index for server-side experiments that are passed into experiments.js
            if (SERVER_VARIANT_INDEX !== -1) {
                forcedVariant = SERVER_VARIANT_INDEX;
            }
            if (typeof forcedVariant !== 'undefined' && forcedVariant !== -1) {
                var forcedInt = parseInt(forcedVariant);
                if (!isNaN(forcedInt)) {
                    setupSuccess = setVariant(forcedInt);
                }
                if (!setupSuccess) {
                    console.log("Failed to set variant to " + forcedVariant);
                }
            } else if (variants.length === 1) {
                variantIndex = 0;
                variant = variants[variantIndex];
                setupSuccess = true;
                if (typeof _logV2MiscEvent !== "undefined") {
                    _logV2MiscEvent("single variant view");
                }
            } else if (distribution.length === 1) {
                variantIndex = distribution[0];
                variant = variants[variantIndex];
                setupSuccess = true;
            } else {
                if (variantIndex == -1) {
                    variantIndex = distribution[Math.floor(Math.random() * distribution.length)];
                }
                variant = variants[variantIndex];

                setupSuccess = true;
            }
            
            // Only set experiment name if the test actually sets up correctly
            if (setupSuccess) {
                experimentName = name;
            }
        }

        return {
            isExperimentRunning: function() {
                setup_once();
                return experimentName != '' && variant != '';
            },
            name: function() {
                setup_once();
                return experimentName;
            },
            experimentId: function() {
                setup_once();
                return experimentId;
            },
            variant: function() {
                setup_once();
                return variant;
            },
            variantIndex: function() {
                setup_once();
                return variantIndex;
            },
            xNumber: function() {
                setup_once();
                return xNumber;
            },
            setDistribution: function(distributionArray) {
                // Make sure no entries are >= the length of the variants array 
                var tooBig = variants.length;
                for (var i = 0; i < distributionArray.length; i++) {
                    if (distributionArray[i] >= tooBig) {
                        return false;
                    }
                }
                distribution = distributionArray;
            }
        }
    };
    
    function setExperiment(expMap, experiment) {
        expMap['Paddle'] = experiment;
        expMap['*'] = experiment;
    }
    var experiments = {};
    var defaultExperiment = experiment("");
    setExperiment(experiments, defaultExperiment);
    
    function addExperiment(gceId, name, expNum, variants, locale, browsers) {
        if (SERVER_EXPERIMENT_RUNNING === true) {
            console.warn('There is a server-side experiment running. Cannot run client-side experiment simultaneously.');
            return false;
        }
        if (locale != EN_LOCALE_ONLY && locale != ALL_LOCALES && locale != NOT_EN_LOCALE) {
            locale = ALL_LOCALES;
        }
        if (browsers === undefined) {
            browsers = [ALL_BROWSERS];
        }
        var exp = experiment(gceId, name, expNum, variants, locale, browsers);
        setExperiment(experiments, exp);
    }

    function addServerExperiment(gceId, name, expNum, variants) {
        // Wraps addExperiment. We don't care about the locales or browser. We calculated eligibility server-side.
        var exp = experiment(gceId, name, expNum, variants, ALL_LOCALES, [ALL_BROWSERS]);
        setExperiment(experiments, exp);
    }

    if (typeof _SERVER_EXPERIMENT !== "undefined") {
        // This flag prevents addExperiment from being executed.
        SERVER_EXPERIMENT_RUNNING = _SERVER_EXPERIMENT.isRunning;
        if (SERVER_EXPERIMENT_RUNNING === true) {
            const name = _SERVER_EXPERIMENT["name"];
            const expNum = _SERVER_EXPERIMENT["expNum"];
            const variants = _SERVER_EXPERIMENT["variants"];
            addServerExperiment("ll", name, expNum, variants);
            SERVER_VARIANT_INDEX = _SERVER_EXPERIMENT.variantIndex;
        }
    }
    
    return {
        isExperimentRunning: function(processor) {
            return experiments[processor].isExperimentRunning();
        },
        name: function(processor) {
            return experiments[processor].name();
        },
        experimentId: function(processor) {
            return experiments[processor].experimentId();
        },
        variant: function(processor) {
            return experiments[processor].variant();
        },
        variantIndex: function(processor) {
            return experiments[processor].variantIndex();
        },
        xNumber: function(processor) {
            return experiments[processor].xNumber();
        },
        runningAndNotVariant: function(processor, name, variant) {
            return experiments[processor].isExperimentRunning() && 
                   experiments[processor].name() === name &&
                   experiments[processor].variant() !== variant;
        },
        setDistribution: function(processor, distributionArray) {
            return experiments[processor].setDistribution(distributionArray);
        },
        addExperiment: addExperiment,
        EN_LOCALE_ONLY: EN_LOCALE_ONLY,
        NOT_EN_LOCALE: NOT_EN_LOCALE,
        ALL_LOCALES: ALL_LOCALES,
        ALL_BROWSERS: ALL_BROWSERS,
        CHROME: CHROME,
        SAFARI: SAFARI,
        FIREFOX: FIREFOX,
    }
})();
