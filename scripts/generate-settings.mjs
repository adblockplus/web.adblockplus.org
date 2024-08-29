import { outputFileSync } from "fs-extra/esm";

// See https://firebase.google.com/docs/hosting/i18n-rewrites

const ALL_COUNTRIES = ["ALL", "AF","AX","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BQ","BA","BW","BV","BR","IO","BN","BG","BF","BI","CV","KH","CM","CA","KY","CF","TD","CL","CN","CX","CC","CO","KM","CG","CD","CK","CR","CI","HR","CU","CW","CY","CZ","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","SZ","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","VA","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","JM","JP","JE","JO","KZ","KE","KI","KP","KR","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI","NE","NG","NU","NF","MK","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","RE","RO","RU","RW","BL","SH","KN","LC","MF","PM","VC","WS","SM","ST","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS","SS","ES","LK","SD","SR","SJ","SE","CH","SY","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","UY","UZ","VU","VE","VN","VG","VI","WF","EH","YE","ZM","ZW"];

const PRIVACY_RESTRICTED_COUNTRIES = ["AT","BE","BG","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GR","HR","HU","IE","IS","IT","LI","LT","LU","LV","MT","NL","NO","PL","PT","RO","SE","SI","SK"];

const PREMIUM_RESTRICTED_COUNTRIES = ["FR"];

const DEFAULT_CURRENCY = "USD";

const EUR_COUNTRIES = ["AT","BE","BG","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GR","HR","HU","IE","IS","IT","LI","LT","LU","LV","ME","MT","NL","NO","PL","PT","RO","SE","SI","SK","XK"];

const UNIQUE_CURRENCIES = {"AU":"AUD","CA":"CAD","CH":"CHF","GB":"GBP","JP":"JPY","NZ":"NZD","RU":"RUB"};

const RE_LANGUAGE = /^[a-z]{2}[\-\_]{0,1}[A-Z]{0,2}$/

const DE_EXCEPTION = `// EXCEPTION: Redirect all DE country to DE language when language is not specified; overriding browser preferred language.
const pathSplit = location.pathname.split("/");
const pathLanguage = pathSplit[1].test(RE_LANGUAGE) ? pathSplit[1] : null;
const pageLanguage = document.documentElement.lang;
if (pageLanguage != "de" && pathLanguage == null) location.href = location.origin + "/de" + location.pathname + location.search + location.hash;
`;

for (const country of ALL_COUNTRIES) outputFileSync(`static/ALL_${country.toLocaleLowerCase()}/settings.js`, `
// GENERATED BY scripts/generate-settings.mjs. DO NOT MANUALLY EDIT.
adblock.settings.country = "${country == "ALL" ? "unknown" : country}";
adblock.settings.defaultCurrency = "${UNIQUE_CURRENCIES[country] || (EUR_COUNTRIES.includes(country) ? "EUR" : DEFAULT_CURRENCY)}";
adblock.settings.restrictPrivacy = ${PRIVACY_RESTRICTED_COUNTRIES[country] ? "true" : "false"};
adblock.settings.restrictPremium = ${PREMIUM_RESTRICTED_COUNTRIES[country] ? "true" : "false"};
const docList = document.documentElement.classList;
docList.add(adblock.settings.country);
if (adblock.settings.restrictPrivacy) docList.add("restrict-privacy");
if (adblock.settings.restrictPremium) docList.add("restrict-premium");
${country == "DE" ? DE_EXCEPTION : ""}
`);