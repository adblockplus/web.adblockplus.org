/* Polyfill service v3.111.0
 * Disable minification (remove `.min` from URL path) for more info */

(function(self, undefined) {!function(){function n(n,a,t){if(void 0===t&&(t=Error),!n)throw new t(a)}function a(n){if("symbol"==typeof n)throw TypeError("Cannot convert a Symbol value to a string");return String(n)}function t(n){if(null==n)throw new TypeError("undefined/null cannot be converted to object");return Object(n)}function r(n,a){return Object.is?Object.is(n,a):n===a?0!==n||1/n==1/a:n!==n&&a!==a}function e(n){return void 0===n?Object.create(null):t(n)}function u(n,t,r,e,u){if("object"!=typeof n)throw new TypeError("Options must be an object");var i=n[t];if(void 0!==i){if("boolean"!==r&&"string"!==r)throw new TypeError("invalid type");if("boolean"===r&&(i=Boolean(i)),"string"===r&&(i=a(i)),void 0!==e&&!e.filter(function(n){return n==i}).length)throw new RangeError(i+" is not within "+e.join(", "));return i}return u}function i(n){return n.slice(n.indexOf("-")+1)}function o(n){var a=P.get(n);return a||(a=Object.create(null),P.set(n,a)),a}function L(a,t){n("string"==typeof a,"language tag must be a string"),n((0,G.isStructurallyValidLanguageTag)(a),"malformed language tag",RangeError);var r=u(t,"language","string",void 0,void 0);void 0!==r&&n((0,G.isUnicodeLanguageSubtag)(r),"Malformed unicode_language_subtag",RangeError);var e=u(t,"script","string",void 0,void 0);void 0!==e&&n((0,G.isUnicodeScriptSubtag)(e),"Malformed unicode_script_subtag",RangeError);var i=u(t,"region","string",void 0,void 0);void 0!==i&&n((0,G.isUnicodeRegionSubtag)(i),"Malformed unicode_region_subtag",RangeError);var o=(0,G.parseUnicodeLanguageId)(a);return void 0!==r&&(o.lang=r),void 0!==e&&(o.script=e),void 0!==i&&(o.region=i),Intl.getCanonicalLocales((0,G.emitUnicodeLocaleId)((0,R.__assign)((0,R.__assign)({},(0,G.parseUnicodeLocaleId)(a)),{lang:o})))[0]}function s(a,t,r){for(var e,u=[],i=(0,G.parseUnicodeLocaleId)(a),o=0,L=i.extensions;o<L.length;o++){var s=L[o];"u"===s.type&&(e=s,Array.isArray(s.keywords)&&(u=s.keywords))}for(var d=Object.create(null),Z=0,l=r;Z<l.length;Z++){for(var c=l[Z],g=void 0,b=void 0,m=0,h=u;m<h.length;m++){var f=h[m];f[0]===c&&(b=f,g=b[1])}n(c in t,c+" must be in options");var k=t[c];void 0!==k&&(n("string"==typeof k,"Value for "+c+" must be a string"),g=k,b?b[1]=g:u.push([c,g])),d[c]=g}return e?e.keywords=u:u.length&&i.extensions.push({type:"u",keywords:u,attributes:[]}),d.locale=Intl.getCanonicalLocales((0,G.emitUnicodeLocaleId)(i))[0],d}function d(n,a,t,r,e){return void 0===r&&(r=[]),e?{lang:n&&"und"!==n?n:e.lang,script:a||e.script,region:t||e.region,variants:(0,R.__spreadArray)((0,R.__spreadArray)([],r),e.variants)}:{lang:n||"und",script:a,region:t,variants:r}}function Z(n){var a=(0,G.parseUnicodeLocaleId)(n),t=a.lang,r=t.lang,e=t.script,u=t.region,i=t.variants;if(e&&u){var o=B[(0,G.emitUnicodeLanguageId)({lang:r,script:e,region:u,variants:[]})];if(o){var L=(0,G.parseUnicodeLanguageId)(o);return a.lang=d(void 0,void 0,void 0,i,L),(0,G.emitUnicodeLocaleId)(a)}}if(e){var s=B[(0,G.emitUnicodeLanguageId)({lang:r,script:e,variants:[]})];if(s){var Z=(0,G.parseUnicodeLanguageId)(s);return a.lang=d(void 0,void 0,u,i,Z),(0,G.emitUnicodeLocaleId)(a)}}if(u){var l=B[(0,G.emitUnicodeLanguageId)({lang:r,region:u,variants:[]})];if(l){var c=(0,G.parseUnicodeLanguageId)(l);return a.lang=d(void 0,e,void 0,i,c),(0,G.emitUnicodeLocaleId)(a)}}var g=B[r]||B[(0,G.emitUnicodeLanguageId)({lang:"und",script:e,variants:[]})];if(!g)throw new Error("No match for addLikelySubtags");var b=(0,G.parseUnicodeLanguageId)(g);return a.lang=d(void 0,e,u,i,b),(0,G.emitUnicodeLocaleId)(a)}function l(n){var a=Z(n);if(!a)return n;a=(0,G.emitUnicodeLanguageId)((0,R.__assign)((0,R.__assign)({},(0,G.parseUnicodeLanguageId)(a)),{variants:[]}));var t=(0,G.parseUnicodeLocaleId)(n),r=t.lang,e=r.lang,u=r.script,i=r.region,o=r.variants;if(Z((0,G.emitUnicodeLanguageId)({lang:e,variants:[]}))===a)return(0,G.emitUnicodeLocaleId)((0,R.__assign)((0,R.__assign)({},t),{lang:d(e,void 0,void 0,o)}));if(i){if(Z((0,G.emitUnicodeLanguageId)({lang:e,region:i,variants:[]}))===a)return(0,G.emitUnicodeLocaleId)((0,R.__assign)((0,R.__assign)({},t),{lang:d(e,void 0,i,o)}))}if(u){if(Z((0,G.emitUnicodeLanguageId)({lang:e,script:u,variants:[]}))===a)return(0,G.emitUnicodeLocaleId)((0,R.__assign)((0,R.__assign)({},t),{lang:d(e,u,void 0,o)}))}return n}function c(){try{return"x-private"===new Intl.Locale("und-x-private").toString()}catch(n){return!0}}var g,b=Object.create,m=Object.defineProperty,h=Object.getOwnPropertyDescriptor,f=Object.getOwnPropertyNames,k=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty,y=function(n){return m(n,"__esModule",{value:!0})},A=function(n,a){return function t(){return a||(0,n[Object.keys(n)[0]])((a={exports:{}}).exports,a),a.exports}},v=function(n,a,t){if(a&&"object"==typeof a||"function"==typeof a)for(var r,e=f(a),u=0,i=e.length;u<i;u++)r=e[u],p.call(n,r)||"default"===r||m(n,r,{get:function(n){return a[n]}.bind(null,r),enumerable:!(t=h(a,r))||t.enumerable});return n},C=function(n){return v(y(m(null!=n?b(k(n)):{},"default",n&&n.__esModule&&"default"in n?{get:function(){return n["default"]},enumerable:!0}:{value:n,enumerable:!0})),n)},D=A({"node_modules/tslib/tslib.js":function(n,a){var t,r,e,u,i,o,L,s,d,Z,l,c,g,b,m,h,f,k,p,y,A,v,C,D;!function(n){function t(n,a){return n!==r&&("function"==typeof Object.create?Object.defineProperty(n,"__esModule",{value:!0}):n.__esModule=!0),function(t,r){return n[t]=a?a(t,r):r}}var r="object"==typeof global?global:"object"==typeof self?self:"object"==typeof this?this:{};"function"==typeof define&&define.amd?define("tslib",["exports"],function(a){n(t(r,t(a)))}):n("object"==typeof a&&"object"==typeof a.exports?t(r,t(a.exports)):t(r))}(function(n){var a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,a){n.__proto__=a}||function(n,a){for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(n[t]=a[t])};t=function(n,t){function r(){this.constructor=n}if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");a(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},r=Object.assign||function(n){for(var a,t=1,r=arguments.length;t<r;t++){a=arguments[t];for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&(n[e]=a[e])}return n},e=function(n,a){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&a.indexOf(r)<0&&(t[r]=n[r]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols)for(var e=0,r=Object.getOwnPropertySymbols(n);e<r.length;e++)a.indexOf(r[e])<0&&Object.prototype.propertyIsEnumerable.call(n,r[e])&&(t[r[e]]=n[r[e]]);return t},u=function(n,a,t,r){var e,u=arguments.length,i=u<3?a:null===r?r=Object.getOwnPropertyDescriptor(a,t):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,a,t,r);else for(var o=n.length-1;o>=0;o--)(e=n[o])&&(i=(u<3?e(i):u>3?e(a,t,i):e(a,t))||i);return u>3&&i&&Object.defineProperty(a,t,i),i},i=function(n,a){return function(t,r){a(t,r,n)}},o=function(n,a){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,a)},L=function(n,a,t,r){function e(n){return n instanceof t?n:new t(function(a){a(n)})}return new(t||(t=Promise))(function(t,u){function i(n){try{L(r.next(n))}catch(a){u(a)}}function o(n){try{L(r["throw"](n))}catch(a){u(a)}}function L(n){n.done?t(n.value):e(n.value).then(i,o)}L((r=r.apply(n,a||[])).next())})},s=function(n,a){function t(n){return function(a){return r([n,a])}}function r(t){if(e)throw new TypeError("Generator is already executing.");for(;L;)try{if(e=1,u&&(i=2&t[0]?u["return"]:t[0]?u["throw"]||((i=u["return"])&&i.call(u),0):u.next)&&!(i=i.call(u,t[1])).done)return i;switch(u=0,i&&(t=[2&t[0],i.value]),t[0]){case 0:case 1:i=t;break;case 4:return L.label++,{value:t[1],done:!1};case 5:L.label++,u=t[1],t=[0];continue;case 7:t=L.ops.pop(),L.trys.pop();continue;default:if(i=L.trys,!(i=i.length>0&&i[i.length-1])&&(6===t[0]||2===t[0])){L=0;continue}if(3===t[0]&&(!i||t[1]>i[0]&&t[1]<i[3])){L.label=t[1];break}if(6===t[0]&&L.label<i[1]){L.label=i[1],i=t;break}if(i&&L.label<i[2]){L.label=i[2],L.ops.push(t);break}i[2]&&L.ops.pop(),L.trys.pop();continue}t=a.call(n,L)}catch(r){t=[6,r],u=0}finally{e=i=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}var e,u,i,o,L={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:t(0),"throw":t(1),"return":t(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o},d=function(n,a){for(var t in n)"default"===t||Object.prototype.hasOwnProperty.call(a,t)||D(a,n,t)},D=Object.create?function(n,a,t,r){void 0===r&&(r=t),Object.defineProperty(n,r,{enumerable:!0,get:function(){return a[t]}})}:function(n,a,t,r){void 0===r&&(r=t),n[r]=a[t]},Z=function(n){var a="function"==typeof Symbol&&Symbol.iterator,t=a&&n[a],r=0;if(t)return t.call(n);if(n&&"number"==typeof n.length)return{next:function(){return n&&r>=n.length&&(n=void 0),{value:n&&n[r++],done:!n}}};throw new TypeError(a?"Object is not iterable.":"Symbol.iterator is not defined.")},l=function(n,a){var t="function"==typeof Symbol&&n[Symbol.iterator];if(!t)return n;var r,e,u=t.call(n),i=[];try{for(;(void 0===a||a-- >0)&&!(r=u.next()).done;)i.push(r.value)}catch(o){e={error:o}}finally{try{r&&!r.done&&(t=u["return"])&&t.call(u)}finally{if(e)throw e.error}}return i},c=function(){for(var n=[],a=0;a<arguments.length;a++)n=n.concat(l(arguments[a]));return n},g=function(){for(var n=0,a=0,t=arguments.length;a<t;a++)n+=arguments[a].length;for(var r=Array(n),e=0,a=0;a<t;a++)for(var u=arguments[a],i=0,o=u.length;i<o;i++,e++)r[e]=u[i];return r},b=function(n,a){for(var t=0,r=a.length,e=n.length;t<r;t++,e++)n[e]=a[t];return n},m=function(n){return this instanceof m?(this.v=n,this):new m(n)},h=function(n,a,t){function r(n){d[n]&&(s[n]=function(a){return new Promise(function(t,r){Z.push([n,a,t,r])>1||e(n,a)})})}function e(n,a){try{u(d[n](a))}catch(t){L(Z[0][3],t)}}function u(n){n.value instanceof m?Promise.resolve(n.value.v).then(i,o):L(Z[0][2],n)}function i(n){e("next",n)}function o(n){e("throw",n)}function L(n,a){n(a),Z.shift(),Z.length&&e(Z[0][0],Z[0][1])}if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s,d=t.apply(n,a||[]),Z=[];return s={},r("next"),r("throw"),r("return"),s[Symbol.asyncIterator]=function(){return this},s},f=function(n){function a(a,e){t[a]=n[a]?function(t){return(r=!r)?{value:m(n[a](t)),done:"return"===a}:e?e(t):t}:e}var t,r;return t={},a("next"),a("throw",function(n){throw n}),a("return"),t[Symbol.iterator]=function(){return this},t},k=function(n){function a(a){r[a]=n[a]&&function(r){return new Promise(function(e,u){r=n[a](r),t(e,u,r.done,r.value)})}}function t(n,a,t,r){Promise.resolve(r).then(function(a){n({value:a,done:t})},a)}if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,e=n[Symbol.asyncIterator];return e?e.call(n):(n="function"==typeof Z?Z(n):n[Symbol.iterator](),r={},a("next"),a("throw"),a("return"),r[Symbol.asyncIterator]=function(){return this},r)},p=function(n,a){return Object.defineProperty?Object.defineProperty(n,"raw",{value:a}):n.raw=a,n};var M=Object.create?function(n,a){Object.defineProperty(n,"default",{enumerable:!0,value:a})}:function(n,a){n["default"]=a};y=function(n){if(n&&n.__esModule)return n;var a={};if(null!=n)for(var t in n)"default"!==t&&Object.prototype.hasOwnProperty.call(n,t)&&D(a,n,t);return M(a,n),a},A=function(n){return n&&n.__esModule?n:{"default":n}},v=function(n,a,t,r){if("a"===t&&!r)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof a?n!==a||!r:!a.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===t?r:"a"===t?r.call(n):r?r.value:a.get(n)},C=function(n,a,t,r,e){if("m"===r)throw new TypeError("Private method is not writable");if("a"===r&&!e)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof a?n!==a||!e:!a.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===r?e.call(n,t):e?e.value=t:a.set(n,t),t},n("__extends",t),n("__assign",r),n("__rest",e),n("__decorate",u),n("__param",i),n("__metadata",o),n("__awaiter",L),n("__generator",s),n("__exportStar",d),n("__createBinding",D),n("__values",Z),n("__read",l),n("__spread",c),n("__spreadArrays",g),n("__spreadArray",b),n("__await",m),n("__asyncGenerator",h),n("__asyncDelegator",f),n("__asyncValues",k),n("__makeTemplateObject",p),n("__importStar",y),n("__importDefault",A),n("__classPrivateFieldGet",v),n("__classPrivateFieldSet",C)})}}),M=A({"bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/parser.js":function(n){"use strict";function a(n){return C.test(n)}function t(a){try{i(a.split(n.SEPARATOR))}catch(t){return!1}return!0}function r(n){return A.test(n)}function e(n){return p.test(n)}function u(n){return v.test(n)}function i(t){"string"==typeof t&&(t=t.split(n.SEPARATOR));var i=t.shift();if(!i)throw new RangeError("Missing unicode_language_subtag");if("root"===i)return{lang:"root",variants:[]};if(!a(i))throw new RangeError("Malformed unicode_language_subtag");var o;t.length&&e(t[0])&&(o=t.shift());var L;t.length&&r(t[0])&&(L=t.shift());for(var s={};t.length&&u(t[0]);){var d=t.shift();if(d in s)throw new RangeError('Duplicate variant "'+d+'"');s[d]=1}return{lang:i,script:o,region:L,variants:Object.keys(s)}}function o(n){for(var a,t=[];n.length&&(a=L(n));)t.push(a);if(t.length)return{type:"u",keywords:t,attributes:[]};for(var r=[];n.length&&h.test(n[0]);)r.push(n.shift());for(;n.length&&(a=L(n));)t.push(a);if(t.length||r.length)return{type:"u",attributes:r,keywords:t};throw new RangeError("Malformed unicode_extension")}function L(a){var t;if(f.test(a[0])){t=a.shift();for(var r=[];a.length&&k.test(a[0]);)r.push(a.shift());var e="";return r.length&&(e=r.join(n.SEPARATOR)),[t,e]}}function s(a){var t;try{t=i(a)}catch(o){}for(var r=[];a.length&&M.test(a[0]);){for(var e=a.shift(),u=[];a.length&&h.test(a[0]);)u.push(a.shift());if(!u.length)throw new RangeError('Missing tvalue for tkey "'+e+'"');r.push([e,u.join(n.SEPARATOR)])}if(r.length)return{type:"t",fields:r,lang:t};throw new RangeError("Malformed transformed_extension")}function d(a){for(var t=[];a.length&&b.test(a[0]);)t.push(a.shift());if(t.length)return{type:"x",value:t.join(n.SEPARATOR)};throw new RangeError("Malformed private_use_extension")}function Z(a){for(var t=[];a.length&&m.test(a[0]);)t.push(a.shift());return t.length?t.join(n.SEPARATOR):""}function l(n){if(!n.length)return{extensions:[]};var a,t,r,e=[],u={};do{var i=n.shift();switch(i){case"u":case"U":if(a)throw new RangeError("There can only be 1 -u- extension");a=o(n),e.push(a);break;case"t":case"T":if(t)throw new RangeError("There can only be 1 -t- extension");t=s(n),e.push(t);break;case"x":case"X":if(r)throw new RangeError("There can only be 1 -x- extension");r=d(n),e.push(r);break;default:if(!y.test(i))throw new RangeError("Malformed extension type");if(i in u)throw new RangeError("There can only be 1 -"+i+"- extension");var L={type:i,value:Z(n)};u[L.type]=L,e.push(L)}}while(n.length);return{extensions:e}}function c(a){var t=a.split(n.SEPARATOR),r=i(t);return g.__assign({lang:r},l(t))}Object.defineProperty(n,"__esModule",{value:!0}),n.parseUnicodeLocaleId=n.parseUnicodeLanguageId=n.isUnicodeVariantSubtag=n.isUnicodeScriptSubtag=n.isUnicodeRegionSubtag=n.isStructurallyValidLanguageTag=n.isUnicodeLanguageSubtag=n.SEPARATOR=void 0;var g=D(),b=/^[a-z0-9]{1,8}$/i,m=/^[a-z0-9]{2,8}$/i,h=/^[a-z0-9]{3,8}$/i,f=/^[a-z0-9][a-z]$/i,k=/^[a-z0-9]{3,8}$/i,p=/^[a-z]{4}$/i,y=/^[0-9a-svwyz]$/i,A=/^([a-z]{2}|[0-9]{3})$/i,v=/^([a-z0-9]{5,8}|[0-9][a-z0-9]{3})$/i,C=/^([a-z]{2,3}|[a-z]{5,8})$/i,M=/^[a-z][0-9]$/i;n.SEPARATOR="-",n.isUnicodeLanguageSubtag=a,n.isStructurallyValidLanguageTag=t,n.isUnicodeRegionSubtag=r,n.isUnicodeScriptSubtag=e,n.isUnicodeVariantSubtag=u,n.parseUnicodeLanguageId=i,n.parseUnicodeLocaleId=c}}),E=A({"bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/emitter.js":function(n){"use strict";function a(n){return n?r.__spreadArray([n.lang,n.script,n.region],n.variants||[]).filter(Boolean).join("-"):""}function t(n){for(var t=n.lang,e=n.extensions,u=[a(t)],i=0,o=e;i<o.length;i++){var L=o[i];switch(u.push(L.type),L.type){case"u":u.push.apply(u,r.__spreadArray(r.__spreadArray([],L.attributes),L.keywords.reduce(function(n,a){return n.concat(a)},[])));break;case"t":u.push.apply(u,r.__spreadArray([a(L.lang)],L.fields.reduce(function(n,a){return n.concat(a)},[])));break;default:u.push(L.value)}}return u.filter(Boolean).join("-")}Object.defineProperty(n,"__esModule",{value:!0}),n.emitUnicodeLocaleId=n.emitUnicodeLanguageId=void 0;var r=D();n.emitUnicodeLanguageId=a,n.emitUnicodeLocaleId=t}}),N=A({"bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/data/aliases.js":function(n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.variantAlias=n.scriptAlias=n.territoryAlias=n.languageAlias=void 0,n.languageAlias={"aa-saaho":"ssy",aam:"aas",aar:"aa",abk:"ab",adp:"dz",afr:"af",agp:"apf",ais:"ami",aju:"jrb",aka:"ak",alb:"sq",als:"sq",amh:"am",ara:"ar",arb:"ar",arg:"an",arm:"hy","art-lojban":"jbo",asd:"snz",asm:"as",aue:"ktz",ava:"av",ave:"ae",aym:"ay",ayr:"ay",ayx:"nun",aze:"az",azj:"az",bak:"ba",bam:"bm",baq:"eu",baz:"nvo",bcc:"bal",bcl:"bik",bel:"be",ben:"bn",bgm:"bcg",bh:"bho",bhk:"fbl",bih:"bho",bis:"bi",bjd:"drl",bjq:"bzc",bkb:"ebk",bod:"bo",bos:"bs",bre:"br",btb:"beb",bul:"bg",bur:"my",bxk:"luy",bxr:"bua",cat:"ca",ccq:"rki","cel-gaulish":"xtg",ces:"cs",cha:"ch",che:"ce",chi:"zh",chu:"cu",chv:"cv",cjr:"mom",cka:"cmr",cld:"syr",cmk:"xch",cmn:"zh",cnr:"sr-ME",cor:"kw",cos:"co",coy:"pij",cqu:"quh",cre:"cr",cwd:"cr",cym:"cy",cze:"cs",daf:"dnj",dan:"da",dap:"njz",deu:"de",dgo:"doi",dhd:"mwr",dik:"din",diq:"zza",dit:"dif",div:"dv",djl:"dze",dkl:"aqd",drh:"mn",drr:"kzk",drw:"fa-AF",dud:"uth",duj:"dwu",dut:"nl",dwl:"dbt",dzo:"dz",ekk:"et",ell:"el",elp:"amq",emk:"man","en-GB-oed":"en-GB-oxendict",eng:"en",epo:"eo",esk:"ik",est:"et",eus:"eu",ewe:"ee",fao:"fo",fas:"fa",fat:"ak",fij:"fj",fin:"fi",fra:"fr",fre:"fr",fry:"fy",fuc:"ff",ful:"ff",gav:"dev",gaz:"om",gbc:"wny",gbo:"grb",geo:"ka",ger:"de",gfx:"vaj",ggn:"gvr",ggo:"esg",ggr:"gtu",gio:"aou",gla:"gd",gle:"ga",glg:"gl",gli:"kzk",glv:"gv",gno:"gon",gre:"el",grn:"gn",gti:"nyc",gug:"gn",guj:"gu",guv:"duz",gya:"gba",hat:"ht",hau:"ha",hbs:"sr-Latn",hdn:"hai",hea:"hmn",heb:"he",her:"hz",him:"srx",hin:"hi",hmo:"ho",hrr:"jal",hrv:"hr",hun:"hu","hy-arevmda":"hyw",hye:"hy","i-ami":"ami","i-bnn":"bnn","i-default":"en-x-i-default","i-enochian":"und-x-i-enochian","i-hak":"hak","i-klingon":"tlh","i-lux":"lb","i-mingo":"see-x-i-mingo","i-navajo":"nv","i-pwn":"pwn","i-tao":"tao","i-tay":"tay","i-tsu":"tsu",ibi:"opa",ibo:"ig",ice:"is",ido:"io",iii:"ii",ike:"iu",iku:"iu",ile:"ie",ill:"ilm",ilw:"gal","in":"id",ina:"ia",ind:"id",ipk:"ik",isl:"is",ita:"it",iw:"he",izi:"eza",jar:"jgk",jav:"jv",jeg:"oyb",ji:"yi",jpn:"ja",jw:"jv",kal:"kl",kan:"kn",kas:"ks",kat:"ka",kau:"kr",kaz:"kk",kdv:"zkd",kgc:"tdf",kgd:"ncq",kgh:"kml",khk:"mn",khm:"km",kik:"ki",kin:"rw",kir:"ky",kmr:"ku",knc:"kr",kng:"kg",knn:"kok",koj:"kwv",kom:"kv",kon:"kg",kor:"ko",kpp:"jkm",kpv:"kv",krm:"bmf",ktr:"dtp",kua:"kj",kur:"ku",kvs:"gdj",kwq:"yam",kxe:"tvd",kxl:"kru",kzh:"dgl",kzj:"dtp",kzt:"dtp",lao:"lo",lat:"la",lav:"lv",lbk:"bnc",leg:"enl",lii:"raq",lim:"li",lin:"ln",lit:"lt",llo:"ngt",lmm:"rmx",ltz:"lb",lub:"lu",lug:"lg",lvs:"lv",mac:"mk",mah:"mh",mal:"ml",mao:"mi",mar:"mr",may:"ms",meg:"cir",mgx:"jbk",mhr:"chm",mkd:"mk",mlg:"mg",mlt:"mt",mnk:"man",mnt:"wnn",mo:"ro",mof:"xnt",mol:"ro",mon:"mn",mri:"mi",msa:"ms",mst:"mry",mup:"raj",mwd:"dmw",mwj:"vaj",mya:"my",myd:"aog",myt:"mry",nad:"xny",nau:"na",nav:"nv",nbf:"nru",nbl:"nr",nbx:"ekc",ncp:"kdz",nde:"nd",ndo:"ng",nep:"ne",nld:"nl",nln:"azd",nlr:"nrk",nno:"nn",nns:"nbr",nnx:"ngv","no-bok":"nb","no-bokmal":"nb","no-nyn":"nn","no-nynorsk":"nn",nob:"nb",noo:"dtd",nor:"no",npi:"ne",nts:"pij",nxu:"bpp",nya:"ny",oci:"oc",ojg:"oj",oji:"oj",ori:"or",orm:"om",ory:"or",oss:"os",oun:"vaj",pan:"pa",pbu:"ps",pcr:"adx",per:"fa",pes:"fa",pli:"pi",plt:"mg",pmc:"huw",pmu:"phr",pnb:"lah",pol:"pl",por:"pt",ppa:"bfy",ppr:"lcq",prs:"fa-AF",pry:"prt",pus:"ps",puz:"pub",que:"qu",quz:"qu",rmr:"emx",rmy:"rom",roh:"rm",ron:"ro",rum:"ro",run:"rn",rus:"ru",sag:"sg",san:"sa",sap:"aqt",sca:"hle",scc:"sr",scr:"hr",sgl:"isk","sgn-BE-FR":"sfb","sgn-BE-NL":"vgt","sgn-BR":"bzs","sgn-CH-DE":"sgg","sgn-CO":"csn","sgn-DE":"gsg","sgn-DK":"dsl","sgn-ES":"ssp","sgn-FR":"fsl","sgn-GB":"bfi","sgn-GR":"gss","sgn-IE":"isg","sgn-IT":"ise","sgn-JP":"jsl","sgn-MX":"mfs","sgn-NI":"ncs","sgn-NL":"dse","sgn-NO":"nsi","sgn-PT":"psr","sgn-SE":"swl","sgn-US":"ase","sgn-ZA":"sfs",sh:"sr-Latn",sin:"si",skk:"oyb",slk:"sk",slo:"sk",slv:"sl",sme:"se",smo:"sm",sna:"sn",snd:"sd",som:"so",sot:"st",spa:"es",spy:"kln",sqi:"sq",src:"sc",srd:"sc",srp:"sr",ssw:"ss",sul:"sgd",sum:"ulw",sun:"su",swa:"sw",swc:"sw-CD",swe:"sv",swh:"sw",tah:"ty",tam:"ta",tat:"tt",tdu:"dtp",tel:"te",tgg:"bjp",tgk:"tg",tgl:"fil",tha:"th",thc:"tpo",thw:"ola",thx:"oyb",tib:"bo",tid:"itd",tie:"ras",tir:"ti",tkk:"twm",tl:"fil",tlw:"weo",tmp:"tyj",tne:"kak",tnf:"fa-AF",ton:"to",tsf:"taj",tsn:"tn",tso:"ts",ttq:"tmh",tuk:"tk",tur:"tr",tw:"ak",twi:"ak",uig:"ug",ukr:"uk",umu:"del","und-aaland":"und-AX","und-arevela":"und","und-arevmda":"und","und-bokmal":"und","und-hakka":"und","und-hepburn-heploc":"und-alalc97","und-lojban":"und","und-nynorsk":"und","und-saaho":"und","und-xiang":"und",unp:"wro",uok:"ema",urd:"ur",uzb:"uz",uzn:"uz",ven:"ve",vie:"vi",vol:"vo",wel:"cy",wgw:"wgb",wit:"nol",wiw:"nwo",wln:"wa",wol:"wo",xba:"cax",xho:"xh",xia:"acn",xkh:"waw",xpe:"kpe",xrq:"dmw",xsj:"suj",xsl:"den",ybd:"rki",ydd:"yi",yen:"ynq",yid:"yi",yiy:"yrm",yma:"lrr",ymt:"mtm",yor:"yo",yos:"zom",yuu:"yug",zai:"zap","zh-cmn":"zh","zh-cmn-Hans":"zh-Hans","zh-cmn-Hant":"zh-Hant","zh-gan":"gan","zh-guoyu":"zh","zh-hakka":"hak","zh-min":"nan-x-zh-min","zh-min-nan":"nan","zh-wuu":"wuu","zh-xiang":"hsn","zh-yue":"yue",zha:"za",zho:"zh",zir:"scv",zsm:"ms",zul:"zu",zyb:"za"},n.territoryAlias={100:"BG",104:"MM",108:"BI",112:"BY",116:"KH",120:"CM",124:"CA",132:"CV",136:"KY",140:"CF",144:"LK",148:"TD",152:"CL",156:"CN",158:"TW",162:"CX",166:"CC",170:"CO",172:"RU AM AZ BY GE KG KZ MD TJ TM UA UZ",174:"KM",175:"YT",178:"CG",180:"CD",184:"CK",188:"CR",191:"HR",192:"CU",196:"CY",200:"CZ SK",203:"CZ",204:"BJ",208:"DK",212:"DM",214:"DO",218:"EC",222:"SV",226:"GQ",230:"ET",231:"ET",232:"ER",233:"EE",234:"FO",238:"FK",239:"GS",242:"FJ",246:"FI",248:"AX",249:"FR",250:"FR",254:"GF",258:"PF",260:"TF",262:"DJ",266:"GA",268:"GE",270:"GM",275:"PS",276:"DE",278:"DE",280:"DE",288:"GH",292:"GI",296:"KI",300:"GR",304:"GL",308:"GD",312:"GP",316:"GU",320:"GT",324:"GN",328:"GY",332:"HT",334:"HM",336:"VA",340:"HN",344:"HK",348:"HU",352:"IS",356:"IN",360:"ID",364:"IR",368:"IQ",372:"IE",376:"IL",380:"IT",384:"CI",388:"JM",392:"JP",398:"KZ",400:"JO",404:"KE",408:"KP",410:"KR",414:"KW",417:"KG",418:"LA",422:"LB",426:"LS",428:"LV",430:"LR",434:"LY",438:"LI",440:"LT",442:"LU",446:"MO",450:"MG",454:"MW",458:"MY",462:"MV",466:"ML",470:"MT",474:"MQ",478:"MR",480:"MU",484:"MX",492:"MC",496:"MN",498:"MD",499:"ME",500:"MS",504:"MA",508:"MZ",512:"OM",516:"NA",520:"NR",524:"NP",528:"NL",530:"CW SX BQ",531:"CW",532:"CW SX BQ",533:"AW",534:"SX",535:"BQ",536:"SA IQ",540:"NC",548:"VU",554:"NZ",558:"NI",562:"NE",566:"NG",570:"NU",574:"NF",578:"NO",580:"MP",581:"UM",582:"FM MH MP PW",583:"FM",584:"MH",585:"PW",586:"PK",591:"PA",598:"PG",600:"PY",604:"PE",608:"PH",612:"PN",616:"PL",620:"PT",624:"GW",626:"TL",630:"PR",634:"QA",638:"RE",642:"RO",643:"RU",646:"RW",652:"BL",654:"SH",659:"KN",660:"AI",662:"LC",663:"MF",666:"PM",670:"VC",674:"SM",678:"ST",682:"SA",686:"SN",688:"RS",690:"SC",694:"SL",702:"SG",703:"SK",704:"VN",705:"SI",706:"SO",710:"ZA",716:"ZW",720:"YE",724:"ES",728:"SS",729:"SD",732:"EH",736:"SD",740:"SR",744:"SJ",748:"SZ",752:"SE",756:"CH",760:"SY",762:"TJ",764:"TH",768:"TG",772:"TK",776:"TO",780:"TT",784:"AE",788:"TN",792:"TR",795:"TM",796:"TC",798:"TV",800:"UG",804:"UA",807:"MK",810:"RU AM AZ BY EE GE KZ KG LV LT MD TJ TM UA UZ",818:"EG",826:"GB",830:"JE GG",831:"GG",832:"JE",833:"IM",834:"TZ",840:"US",850:"VI",854:"BF",858:"UY",860:"UZ",862:"VE",876:"WF",882:"WS",886:"YE",887:"YE",890:"RS ME SI HR MK BA",891:"RS ME",894:"ZM",958:"AA",959:"QM",960:"QN",962:"QP",963:"QQ",964:"QR",965:"QS",966:"QT",967:"EU",968:"QV",969:"QW",970:"QX",971:"QY",972:"QZ",973:"XA",974:"XB",975:"XC",976:"XD",977:"XE",978:"XF",979:"XG",980:"XH",981:"XI",982:"XJ",983:"XK",984:"XL",985:"XM",986:"XN",987:"XO",988:"XP",989:"XQ",990:"XR",991:"XS",992:"XT",993:"XU",994:"XV",995:"XW",996:"XX",997:"XY",998:"XZ",999:"ZZ","004":"AF","008":"AL","010":"AQ","012":"DZ","016":"AS","020":"AD","024":"AO","028":"AG","031":"AZ","032":"AR","036":"AU","040":"AT","044":"BS","048":"BH","050":"BD","051":"AM","052":"BB","056":"BE","060":"BM","062":"034 143","064":"BT","068":"BO","070":"BA","072":"BW","074":"BV","076":"BR","084":"BZ","086":"IO","090":"SB","092":"VG","096":"BN",AAA:"AA",ABW:"AW",AFG:"AF",AGO:"AO",AIA:"AI",ALA:"AX",ALB:"AL",AN:"CW SX BQ",AND:"AD",ANT:"CW SX BQ",ARE:"AE",ARG:"AR",ARM:"AM",ASC:"AC",ASM:"AS",ATA:"AQ",ATF:"TF",ATG:"AG",AUS:"AU",AUT:"AT",AZE:"AZ",BDI:"BI",BEL:"BE",BEN:"BJ",BES:"BQ",BFA:"BF",BGD:"BD",BGR:"BG",BHR:"BH",BHS:"BS",BIH:"BA",BLM:"BL",BLR:"BY",BLZ:"BZ",BMU:"BM",BOL:"BO",BRA:"BR",BRB:"BB",BRN:"BN",BTN:"BT",BU:"MM",BUR:"MM",BVT:"BV",BWA:"BW",CAF:"CF",CAN:"CA",CCK:"CC",CHE:"CH",CHL:"CL",CHN:"CN",CIV:"CI",CMR:"CM",COD:"CD",COG:"CG",COK:"CK",COL:"CO",COM:"KM",CPT:"CP",CPV:"CV",CRI:"CR",CS:"RS ME",CT:"KI",CUB:"CU",CUW:"CW",CXR:"CX",CYM:"KY",CYP:"CY",CZE:"CZ",DD:"DE",DDR:"DE",DEU:"DE",DGA:"DG",DJI:"DJ",DMA:"DM",DNK:"DK",DOM:"DO",DY:"BJ",DZA:"DZ",ECU:"EC",EGY:"EG",ERI:"ER",ESH:"EH",ESP:"ES",EST:"EE",ETH:"ET",FIN:"FI",FJI:"FJ",FLK:"FK",FQ:"AQ TF",FRA:"FR",FRO:"FO",FSM:"FM",FX:"FR",FXX:"FR",GAB:"GA",GBR:"GB",GEO:"GE",GGY:"GG",GHA:"GH",GIB:"GI",GIN:"GN",GLP:"GP",GMB:"GM",GNB:"GW",GNQ:"GQ",GRC:"GR",GRD:"GD",GRL:"GL",GTM:"GT",GUF:"GF",GUM:"GU",GUY:"GY",HKG:"HK",HMD:"HM",HND:"HN",HRV:"HR",HTI:"HT",HUN:"HU",HV:"BF",IDN:"ID",IMN:"IM",IND:"IN",IOT:"IO",IRL:"IE",IRN:"IR",IRQ:"IQ",ISL:"IS",ISR:"IL",ITA:"IT",JAM:"JM",JEY:"JE",JOR:"JO",JPN:"JP",JT:"UM",KAZ:"KZ",KEN:"KE",KGZ:"KG",KHM:"KH",KIR:"KI",KNA:"KN",KOR:"KR",KWT:"KW",LAO:"LA",LBN:"LB",LBR:"LR",LBY:"LY",LCA:"LC",LIE:"LI",LKA:"LK",LSO:"LS",LTU:"LT",LUX:"LU",LVA:"LV",MAC:"MO",MAF:"MF",MAR:"MA",MCO:"MC",MDA:"MD",MDG:"MG",MDV:"MV",MEX:"MX",MHL:"MH",MI:"UM",MKD:"MK",MLI:"ML",MLT:"MT",MMR:"MM",MNE:"ME",MNG:"MN",MNP:"MP",MOZ:"MZ",MRT:"MR",MSR:"MS",MTQ:"MQ",MUS:"MU",MWI:"MW",MYS:"MY",MYT:"YT",NAM:"NA",NCL:"NC",NER:"NE",NFK:"NF",NGA:"NG",NH:"VU",NIC:"NI",NIU:"NU",NLD:"NL",NOR:"NO",NPL:"NP",NQ:"AQ",NRU:"NR",NT:"SA IQ",NTZ:"SA IQ",NZL:"NZ",OMN:"OM",PAK:"PK",PAN:"PA",PC:"FM MH MP PW",PCN:"PN",PER:"PE",PHL:"PH",PLW:"PW",PNG:"PG",POL:"PL",PRI:"PR",PRK:"KP",PRT:"PT",PRY:"PY",PSE:"PS",PU:"UM",PYF:"PF",PZ:"PA",QAT:"QA",QMM:"QM",QNN:"QN",QPP:"QP",QQQ:"QQ",QRR:"QR",QSS:"QS",QTT:"QT",QU:"EU",QUU:"EU",QVV:"QV",QWW:"QW",QXX:"QX",QYY:"QY",QZZ:"QZ",REU:"RE",RH:"ZW",ROU:"RO",RUS:"RU",RWA:"RW",SAU:"SA",SCG:"RS ME",SDN:"SD",SEN:"SN",SGP:"SG",SGS:"GS",SHN:"SH",SJM:"SJ",SLB:"SB",SLE:"SL",SLV:"SV",SMR:"SM",SOM:"SO",SPM:"PM",SRB:"RS",SSD:"SS",STP:"ST",SU:"RU AM AZ BY EE GE KZ KG LV LT MD TJ TM UA UZ",SUN:"RU AM AZ BY EE GE KZ KG LV LT MD TJ TM UA UZ",SUR:"SR",SVK:"SK",SVN:"SI",SWE:"SE",SWZ:"SZ",SXM:"SX",SYC:"SC",SYR:"SY",TAA:"TA",TCA:"TC",TCD:"TD",TGO:"TG",THA:"TH",TJK:"TJ",TKL:"TK",TKM:"TM",TLS:"TL",TMP:"TL",TON:"TO",TP:"TL",TTO:"TT",TUN:"TN",TUR:"TR",TUV:"TV",TWN:"TW",TZA:"TZ",UGA:"UG",UK:"GB",UKR:"UA",UMI:"UM",URY:"UY",USA:"US",UZB:"UZ",VAT:"VA",VCT:"VC",VD:"VN",VEN:"VE",VGB:"VG",VIR:"VI",VNM:"VN",VUT:"VU",WK:"UM",WLF:"WF",WSM:"WS",XAA:"XA",XBB:"XB",XCC:"XC",XDD:"XD",XEE:"XE",XFF:"XF",XGG:"XG",XHH:"XH",XII:"XI",XJJ:"XJ",XKK:"XK",XLL:"XL",XMM:"XM",XNN:"XN",XOO:"XO",XPP:"XP",XQQ:"XQ",XRR:"XR",XSS:"XS",XTT:"XT",XUU:"XU",XVV:"XV",XWW:"XW",XXX:"XX",XYY:"XY",XZZ:"XZ",YD:"YE",YEM:"YE",YMD:"YE",YU:"RS ME",YUG:"RS ME",ZAF:"ZA",ZAR:"CD",ZMB:"ZM",ZR:"CD",ZWE:"ZW",ZZZ:"ZZ"},n.scriptAlias={Qaai:"Zinh"},n.variantAlias={heploc:"alalc97",polytoni:"polyton"}}}),w=A({"node_modules/cldr-core/supplemental/likelySubtags.json":function(n,a){a.exports={supplemental:{version:{_unicodeVersion:"13.0.0",_cldrVersion:"39"},likelySubtags:{aa:"aa-Latn-ET",aai:"aai-Latn-ZZ",aak:"aak-Latn-ZZ",aau:"aau-Latn-ZZ",ab:"ab-Cyrl-GE",abi:"abi-Latn-ZZ",abq:"abq-Cyrl-ZZ",abr:"abr-Latn-GH",abt:"abt-Latn-ZZ",aby:"aby-Latn-ZZ",acd:"acd-Latn-ZZ",ace:"ace-Latn-ID",ach:"ach-Latn-UG",ada:"ada-Latn-GH",ade:"ade-Latn-ZZ",adj:"adj-Latn-ZZ",adp:"adp-Tibt-BT",ady:"ady-Cyrl-RU",adz:"adz-Latn-ZZ",ae:"ae-Avst-IR",aeb:"aeb-Arab-TN",aey:"aey-Latn-ZZ",af:"af-Latn-ZA",agc:"agc-Latn-ZZ",agd:"agd-Latn-ZZ",agg:"agg-Latn-ZZ",agm:"agm-Latn-ZZ",ago:"ago-Latn-ZZ",agq:"agq-Latn-CM",aha:"aha-Latn-ZZ",ahl:"ahl-Latn-ZZ",aho:"aho-Ahom-IN",ajg:"ajg-Latn-ZZ",ak:"ak-Latn-GH",akk:"akk-Xsux-IQ",ala:"ala-Latn-ZZ",ali:"ali-Latn-ZZ",aln:"aln-Latn-XK",alt:"alt-Cyrl-RU",am:"am-Ethi-ET",amm:"amm-Latn-ZZ",amn:"amn-Latn-ZZ",amo:"amo-Latn-NG",amp:"amp-Latn-ZZ",an:"an-Latn-ES",anc:"anc-Latn-ZZ",ank:"ank-Latn-ZZ",ann:"ann-Latn-ZZ",any:"any-Latn-ZZ",aoj:"aoj-Latn-ZZ",aom:"aom-Latn-ZZ",aoz:"aoz-Latn-ID",apc:"apc-Arab-ZZ",apd:"apd-Arab-TG",ape:"ape-Latn-ZZ",apr:"apr-Latn-ZZ",aps:"aps-Latn-ZZ",apz:"apz-Latn-ZZ",ar:"ar-Arab-EG",arc:"arc-Armi-IR","arc-Nbat":"arc-Nbat-JO","arc-Palm":"arc-Palm-SY",arh:"arh-Latn-ZZ",arn:"arn-Latn-CL",aro:"aro-Latn-BO",arq:"arq-Arab-DZ",ars:"ars-Arab-SA",ary:"ary-Arab-MA",arz:"arz-Arab-EG",as:"as-Beng-IN",asa:"asa-Latn-TZ",ase:"ase-Sgnw-US",asg:"asg-Latn-ZZ",aso:"aso-Latn-ZZ",ast:"ast-Latn-ES",ata:"ata-Latn-ZZ",atg:"atg-Latn-ZZ",atj:"atj-Latn-CA",auy:"auy-Latn-ZZ",av:"av-Cyrl-RU",avl:"avl-Arab-ZZ",avn:"avn-Latn-ZZ",avt:"avt-Latn-ZZ",avu:"avu-Latn-ZZ",awa:"awa-Deva-IN",awb:"awb-Latn-ZZ",awo:"awo-Latn-ZZ",awx:"awx-Latn-ZZ",ay:"ay-Latn-BO",ayb:"ayb-Latn-ZZ",az:"az-Latn-AZ","az-Arab":"az-Arab-IR","az-IQ":"az-Arab-IQ","az-IR":"az-Arab-IR","az-RU":"az-Cyrl-RU",ba:"ba-Cyrl-RU",bal:"bal-Arab-PK",ban:"ban-Latn-ID",bap:"bap-Deva-NP",bar:"bar-Latn-AT",bas:"bas-Latn-CM",bav:"bav-Latn-ZZ",bax:"bax-Bamu-CM",bba:"bba-Latn-ZZ",bbb:"bbb-Latn-ZZ",bbc:"bbc-Latn-ID",bbd:"bbd-Latn-ZZ",bbj:"bbj-Latn-CM",bbp:"bbp-Latn-ZZ",bbr:"bbr-Latn-ZZ",bcf:"bcf-Latn-ZZ",bch:"bch-Latn-ZZ",bci:"bci-Latn-CI",bcm:"bcm-Latn-ZZ",bcn:"bcn-Latn-ZZ",bco:"bco-Latn-ZZ",bcq:"bcq-Ethi-ZZ",bcu:"bcu-Latn-ZZ",bdd:"bdd-Latn-ZZ",be:"be-Cyrl-BY",bef:"bef-Latn-ZZ",beh:"beh-Latn-ZZ",bej:"bej-Arab-SD",bem:"bem-Latn-ZM",bet:"bet-Latn-ZZ",bew:"bew-Latn-ID",bex:"bex-Latn-ZZ",bez:"bez-Latn-TZ",bfd:"bfd-Latn-CM",bfq:"bfq-Taml-IN",bft:"bft-Arab-PK",bfy:"bfy-Deva-IN",bg:"bg-Cyrl-BG",bgc:"bgc-Deva-IN",bgn:"bgn-Arab-PK",bgx:"bgx-Grek-TR",bhb:"bhb-Deva-IN",bhg:"bhg-Latn-ZZ",bhi:"bhi-Deva-IN",bhl:"bhl-Latn-ZZ",bho:"bho-Deva-IN",bhy:"bhy-Latn-ZZ",bi:"bi-Latn-VU",bib:"bib-Latn-ZZ",big:"big-Latn-ZZ",bik:"bik-Latn-PH",bim:"bim-Latn-ZZ",bin:"bin-Latn-NG",bio:"bio-Latn-ZZ",biq:"biq-Latn-ZZ",bjh:"bjh-Latn-ZZ",bji:"bji-Ethi-ZZ",bjj:"bjj-Deva-IN",bjn:"bjn-Latn-ID",bjo:"bjo-Latn-ZZ",bjr:"bjr-Latn-ZZ",bjt:"bjt-Latn-SN",bjz:"bjz-Latn-ZZ",bkc:"bkc-Latn-ZZ",bkm:"bkm-Latn-CM",bkq:"bkq-Latn-ZZ",bku:"bku-Latn-PH",bkv:"bkv-Latn-ZZ",blt:"blt-Tavt-VN",bm:"bm-Latn-ML",bmh:"bmh-Latn-ZZ",bmk:"bmk-Latn-ZZ",bmq:"bmq-Latn-ML",bmu:"bmu-Latn-ZZ",bn:"bn-Beng-BD",bng:"bng-Latn-ZZ",bnm:"bnm-Latn-ZZ",bnp:"bnp-Latn-ZZ",bo:"bo-Tibt-CN",boj:"boj-Latn-ZZ",bom:"bom-Latn-ZZ",bon:"bon-Latn-ZZ",bpy:"bpy-Beng-IN",bqc:"bqc-Latn-ZZ",bqi:"bqi-Arab-IR",bqp:"bqp-Latn-ZZ",bqv:"bqv-Latn-CI",br:"br-Latn-FR",bra:"bra-Deva-IN",brh:"brh-Arab-PK",brx:"brx-Deva-IN",brz:"brz-Latn-ZZ",bs:"bs-Latn-BA",bsj:"bsj-Latn-ZZ",bsq:"bsq-Bass-LR",bss:"bss-Latn-CM",bst:"bst-Ethi-ZZ",bto:"bto-Latn-PH",btt:"btt-Latn-ZZ",btv:"btv-Deva-PK",bua:"bua-Cyrl-RU",buc:"buc-Latn-YT",bud:"bud-Latn-ZZ",bug:"bug-Latn-ID",buk:"buk-Latn-ZZ",bum:"bum-Latn-CM",
buo:"buo-Latn-ZZ",bus:"bus-Latn-ZZ",buu:"buu-Latn-ZZ",bvb:"bvb-Latn-GQ",bwd:"bwd-Latn-ZZ",bwr:"bwr-Latn-ZZ",bxh:"bxh-Latn-ZZ",bye:"bye-Latn-ZZ",byn:"byn-Ethi-ER",byr:"byr-Latn-ZZ",bys:"bys-Latn-ZZ",byv:"byv-Latn-CM",byx:"byx-Latn-ZZ",bza:"bza-Latn-ZZ",bze:"bze-Latn-ML",bzf:"bzf-Latn-ZZ",bzh:"bzh-Latn-ZZ",bzw:"bzw-Latn-ZZ",ca:"ca-Latn-ES",cad:"cad-Latn-US",can:"can-Latn-ZZ",cbj:"cbj-Latn-ZZ",cch:"cch-Latn-NG",ccp:"ccp-Cakm-BD",ce:"ce-Cyrl-RU",ceb:"ceb-Latn-PH",cfa:"cfa-Latn-ZZ",cgg:"cgg-Latn-UG",ch:"ch-Latn-GU",chk:"chk-Latn-FM",chm:"chm-Cyrl-RU",cho:"cho-Latn-US",chp:"chp-Latn-CA",chr:"chr-Cher-US",cic:"cic-Latn-US",cja:"cja-Arab-KH",cjm:"cjm-Cham-VN",cjv:"cjv-Latn-ZZ",ckb:"ckb-Arab-IQ",ckl:"ckl-Latn-ZZ",cko:"cko-Latn-ZZ",cky:"cky-Latn-ZZ",cla:"cla-Latn-ZZ",cme:"cme-Latn-ZZ",cmg:"cmg-Soyo-MN",co:"co-Latn-FR",cop:"cop-Copt-EG",cps:"cps-Latn-PH",cr:"cr-Cans-CA",crh:"crh-Cyrl-UA",crj:"crj-Cans-CA",crk:"crk-Cans-CA",crl:"crl-Cans-CA",crm:"crm-Cans-CA",crs:"crs-Latn-SC",cs:"cs-Latn-CZ",csb:"csb-Latn-PL",csw:"csw-Cans-CA",ctd:"ctd-Pauc-MM",cu:"cu-Cyrl-RU","cu-Glag":"cu-Glag-BG",cv:"cv-Cyrl-RU",cy:"cy-Latn-GB",da:"da-Latn-DK",dad:"dad-Latn-ZZ",daf:"daf-Latn-CI",dag:"dag-Latn-ZZ",dah:"dah-Latn-ZZ",dak:"dak-Latn-US",dar:"dar-Cyrl-RU",dav:"dav-Latn-KE",dbd:"dbd-Latn-ZZ",dbq:"dbq-Latn-ZZ",dcc:"dcc-Arab-IN",ddn:"ddn-Latn-ZZ",de:"de-Latn-DE",ded:"ded-Latn-ZZ",den:"den-Latn-CA",dga:"dga-Latn-ZZ",dgh:"dgh-Latn-ZZ",dgi:"dgi-Latn-ZZ",dgl:"dgl-Arab-ZZ",dgr:"dgr-Latn-CA",dgz:"dgz-Latn-ZZ",dia:"dia-Latn-ZZ",dje:"dje-Latn-NE",dmf:"dmf-Medf-NG",dnj:"dnj-Latn-CI",dob:"dob-Latn-ZZ",doi:"doi-Deva-IN",dop:"dop-Latn-ZZ",dow:"dow-Latn-ZZ",drh:"drh-Mong-CN",dri:"dri-Latn-ZZ",drs:"drs-Ethi-ZZ",dsb:"dsb-Latn-DE",dtm:"dtm-Latn-ML",dtp:"dtp-Latn-MY",dts:"dts-Latn-ZZ",dty:"dty-Deva-NP",dua:"dua-Latn-CM",duc:"duc-Latn-ZZ",dud:"dud-Latn-ZZ",dug:"dug-Latn-ZZ",dv:"dv-Thaa-MV",dva:"dva-Latn-ZZ",dww:"dww-Latn-ZZ",dyo:"dyo-Latn-SN",dyu:"dyu-Latn-BF",dz:"dz-Tibt-BT",dzg:"dzg-Latn-ZZ",ebu:"ebu-Latn-KE",ee:"ee-Latn-GH",efi:"efi-Latn-NG",egl:"egl-Latn-IT",egy:"egy-Egyp-EG",eka:"eka-Latn-ZZ",eky:"eky-Kali-MM",el:"el-Grek-GR",ema:"ema-Latn-ZZ",emi:"emi-Latn-ZZ",en:"en-Latn-US","en-Shaw":"en-Shaw-GB",enn:"enn-Latn-ZZ",enq:"enq-Latn-ZZ",eo:"eo-Latn-001",eri:"eri-Latn-ZZ",es:"es-Latn-ES",esg:"esg-Gonm-IN",esu:"esu-Latn-US",et:"et-Latn-EE",etr:"etr-Latn-ZZ",ett:"ett-Ital-IT",etu:"etu-Latn-ZZ",etx:"etx-Latn-ZZ",eu:"eu-Latn-ES",ewo:"ewo-Latn-CM",ext:"ext-Latn-ES",eza:"eza-Latn-ZZ",fa:"fa-Arab-IR",faa:"faa-Latn-ZZ",fab:"fab-Latn-ZZ",fag:"fag-Latn-ZZ",fai:"fai-Latn-ZZ",fan:"fan-Latn-GQ",ff:"ff-Latn-SN","ff-Adlm":"ff-Adlm-GN",ffi:"ffi-Latn-ZZ",ffm:"ffm-Latn-ML",fi:"fi-Latn-FI",fia:"fia-Arab-SD",fil:"fil-Latn-PH",fit:"fit-Latn-SE",fj:"fj-Latn-FJ",flr:"flr-Latn-ZZ",fmp:"fmp-Latn-ZZ",fo:"fo-Latn-FO",fod:"fod-Latn-ZZ",fon:"fon-Latn-BJ","for":"for-Latn-ZZ",fpe:"fpe-Latn-ZZ",fqs:"fqs-Latn-ZZ",fr:"fr-Latn-FR",frc:"frc-Latn-US",frp:"frp-Latn-FR",frr:"frr-Latn-DE",frs:"frs-Latn-DE",fub:"fub-Arab-CM",fud:"fud-Latn-WF",fue:"fue-Latn-ZZ",fuf:"fuf-Latn-GN",fuh:"fuh-Latn-ZZ",fuq:"fuq-Latn-NE",fur:"fur-Latn-IT",fuv:"fuv-Latn-NG",fuy:"fuy-Latn-ZZ",fvr:"fvr-Latn-SD",fy:"fy-Latn-NL",ga:"ga-Latn-IE",gaa:"gaa-Latn-GH",gaf:"gaf-Latn-ZZ",gag:"gag-Latn-MD",gah:"gah-Latn-ZZ",gaj:"gaj-Latn-ZZ",gam:"gam-Latn-ZZ",gan:"gan-Hans-CN",gaw:"gaw-Latn-ZZ",gay:"gay-Latn-ID",gba:"gba-Latn-ZZ",gbf:"gbf-Latn-ZZ",gbm:"gbm-Deva-IN",gby:"gby-Latn-ZZ",gbz:"gbz-Arab-IR",gcr:"gcr-Latn-GF",gd:"gd-Latn-GB",gde:"gde-Latn-ZZ",gdn:"gdn-Latn-ZZ",gdr:"gdr-Latn-ZZ",geb:"geb-Latn-ZZ",gej:"gej-Latn-ZZ",gel:"gel-Latn-ZZ",gez:"gez-Ethi-ET",gfk:"gfk-Latn-ZZ",ggn:"ggn-Deva-NP",ghs:"ghs-Latn-ZZ",gil:"gil-Latn-KI",gim:"gim-Latn-ZZ",gjk:"gjk-Arab-PK",gjn:"gjn-Latn-ZZ",gju:"gju-Arab-PK",gkn:"gkn-Latn-ZZ",gkp:"gkp-Latn-ZZ",gl:"gl-Latn-ES",glk:"glk-Arab-IR",gmm:"gmm-Latn-ZZ",gmv:"gmv-Ethi-ZZ",gn:"gn-Latn-PY",gnd:"gnd-Latn-ZZ",gng:"gng-Latn-ZZ",god:"god-Latn-ZZ",gof:"gof-Ethi-ZZ",goi:"goi-Latn-ZZ",gom:"gom-Deva-IN",gon:"gon-Telu-IN",gor:"gor-Latn-ID",gos:"gos-Latn-NL",got:"got-Goth-UA",grb:"grb-Latn-ZZ",grc:"grc-Cprt-CY","grc-Linb":"grc-Linb-GR",grt:"grt-Beng-IN",grw:"grw-Latn-ZZ",gsw:"gsw-Latn-CH",gu:"gu-Gujr-IN",gub:"gub-Latn-BR",guc:"guc-Latn-CO",gud:"gud-Latn-ZZ",gur:"gur-Latn-GH",guw:"guw-Latn-ZZ",gux:"gux-Latn-ZZ",guz:"guz-Latn-KE",gv:"gv-Latn-IM",gvf:"gvf-Latn-ZZ",gvr:"gvr-Deva-NP",gvs:"gvs-Latn-ZZ",gwc:"gwc-Arab-ZZ",gwi:"gwi-Latn-CA",gwt:"gwt-Arab-ZZ",gyi:"gyi-Latn-ZZ",ha:"ha-Latn-NG","ha-CM":"ha-Arab-CM","ha-SD":"ha-Arab-SD",hag:"hag-Latn-ZZ",hak:"hak-Hans-CN",ham:"ham-Latn-ZZ",haw:"haw-Latn-US",haz:"haz-Arab-AF",hbb:"hbb-Latn-ZZ",hdy:"hdy-Ethi-ZZ",he:"he-Hebr-IL",hhy:"hhy-Latn-ZZ",hi:"hi-Deva-IN",hia:"hia-Latn-ZZ",hif:"hif-Latn-FJ",hig:"hig-Latn-ZZ",hih:"hih-Latn-ZZ",hil:"hil-Latn-PH",hla:"hla-Latn-ZZ",hlu:"hlu-Hluw-TR",hmd:"hmd-Plrd-CN",hmt:"hmt-Latn-ZZ",hnd:"hnd-Arab-PK",hne:"hne-Deva-IN",hnj:"hnj-Hmng-LA",hnn:"hnn-Latn-PH",hno:"hno-Arab-PK",ho:"ho-Latn-PG",hoc:"hoc-Deva-IN",hoj:"hoj-Deva-IN",hot:"hot-Latn-ZZ",hr:"hr-Latn-HR",hsb:"hsb-Latn-DE",hsn:"hsn-Hans-CN",ht:"ht-Latn-HT",hu:"hu-Latn-HU",hui:"hui-Latn-ZZ",hy:"hy-Armn-AM",hz:"hz-Latn-NA",ia:"ia-Latn-001",ian:"ian-Latn-ZZ",iar:"iar-Latn-ZZ",iba:"iba-Latn-MY",ibb:"ibb-Latn-NG",iby:"iby-Latn-ZZ",ica:"ica-Latn-ZZ",ich:"ich-Latn-ZZ",id:"id-Latn-ID",idd:"idd-Latn-ZZ",idi:"idi-Latn-ZZ",idu:"idu-Latn-ZZ",ife:"ife-Latn-TG",ig:"ig-Latn-NG",igb:"igb-Latn-ZZ",ige:"ige-Latn-ZZ",ii:"ii-Yiii-CN",ijj:"ijj-Latn-ZZ",ik:"ik-Latn-US",ikk:"ikk-Latn-ZZ",ikt:"ikt-Latn-CA",ikw:"ikw-Latn-ZZ",ikx:"ikx-Latn-ZZ",ilo:"ilo-Latn-PH",imo:"imo-Latn-ZZ","in":"in-Latn-ID",inh:"inh-Cyrl-RU",io:"io-Latn-001",iou:"iou-Latn-ZZ",iri:"iri-Latn-ZZ",is:"is-Latn-IS",it:"it-Latn-IT",iu:"iu-Cans-CA",iw:"iw-Hebr-IL",iwm:"iwm-Latn-ZZ",iws:"iws-Latn-ZZ",izh:"izh-Latn-RU",izi:"izi-Latn-ZZ",ja:"ja-Jpan-JP",jab:"jab-Latn-ZZ",jam:"jam-Latn-JM",jar:"jar-Latn-ZZ",jbo:"jbo-Latn-001",jbu:"jbu-Latn-ZZ",jen:"jen-Latn-ZZ",jgk:"jgk-Latn-ZZ",jgo:"jgo-Latn-CM",ji:"ji-Hebr-UA",jib:"jib-Latn-ZZ",jmc:"jmc-Latn-TZ",jml:"jml-Deva-NP",jra:"jra-Latn-ZZ",jut:"jut-Latn-DK",jv:"jv-Latn-ID",jw:"jw-Latn-ID",ka:"ka-Geor-GE",kaa:"kaa-Cyrl-UZ",kab:"kab-Latn-DZ",kac:"kac-Latn-MM",kad:"kad-Latn-ZZ",kai:"kai-Latn-ZZ",kaj:"kaj-Latn-NG",kam:"kam-Latn-KE",kao:"kao-Latn-ML",kbd:"kbd-Cyrl-RU",kbm:"kbm-Latn-ZZ",kbp:"kbp-Latn-ZZ",kbq:"kbq-Latn-ZZ",kbx:"kbx-Latn-ZZ",kby:"kby-Arab-NE",kcg:"kcg-Latn-NG",kck:"kck-Latn-ZW",kcl:"kcl-Latn-ZZ",kct:"kct-Latn-ZZ",kde:"kde-Latn-TZ",kdh:"kdh-Arab-TG",kdl:"kdl-Latn-ZZ",kdt:"kdt-Thai-TH",kea:"kea-Latn-CV",ken:"ken-Latn-CM",kez:"kez-Latn-ZZ",kfo:"kfo-Latn-CI",kfr:"kfr-Deva-IN",kfy:"kfy-Deva-IN",kg:"kg-Latn-CD",kge:"kge-Latn-ID",kgf:"kgf-Latn-ZZ",kgp:"kgp-Latn-BR",kha:"kha-Latn-IN",khb:"khb-Talu-CN",khn:"khn-Deva-IN",khq:"khq-Latn-ML",khs:"khs-Latn-ZZ",kht:"kht-Mymr-IN",khw:"khw-Arab-PK",khz:"khz-Latn-ZZ",ki:"ki-Latn-KE",kij:"kij-Latn-ZZ",kiu:"kiu-Latn-TR",kiw:"kiw-Latn-ZZ",kj:"kj-Latn-NA",kjd:"kjd-Latn-ZZ",kjg:"kjg-Laoo-LA",kjs:"kjs-Latn-ZZ",kjy:"kjy-Latn-ZZ",kk:"kk-Cyrl-KZ","kk-AF":"kk-Arab-AF","kk-Arab":"kk-Arab-CN","kk-CN":"kk-Arab-CN","kk-IR":"kk-Arab-IR","kk-MN":"kk-Arab-MN",kkc:"kkc-Latn-ZZ",kkj:"kkj-Latn-CM",kl:"kl-Latn-GL",kln:"kln-Latn-KE",klq:"klq-Latn-ZZ",klt:"klt-Latn-ZZ",klx:"klx-Latn-ZZ",km:"km-Khmr-KH",kmb:"kmb-Latn-AO",kmh:"kmh-Latn-ZZ",kmo:"kmo-Latn-ZZ",kms:"kms-Latn-ZZ",kmu:"kmu-Latn-ZZ",kmw:"kmw-Latn-ZZ",kn:"kn-Knda-IN",knf:"knf-Latn-GW",knp:"knp-Latn-ZZ",ko:"ko-Kore-KR",koi:"koi-Cyrl-RU",kok:"kok-Deva-IN",kol:"kol-Latn-ZZ",kos:"kos-Latn-FM",koz:"koz-Latn-ZZ",kpe:"kpe-Latn-LR",kpf:"kpf-Latn-ZZ",kpo:"kpo-Latn-ZZ",kpr:"kpr-Latn-ZZ",kpx:"kpx-Latn-ZZ",kqb:"kqb-Latn-ZZ",kqf:"kqf-Latn-ZZ",kqs:"kqs-Latn-ZZ",kqy:"kqy-Ethi-ZZ",kr:"kr-Latn-ZZ",krc:"krc-Cyrl-RU",kri:"kri-Latn-SL",krj:"krj-Latn-PH",krl:"krl-Latn-RU",krs:"krs-Latn-ZZ",kru:"kru-Deva-IN",ks:"ks-Arab-IN",ksb:"ksb-Latn-TZ",ksd:"ksd-Latn-ZZ",ksf:"ksf-Latn-CM",ksh:"ksh-Latn-DE",ksj:"ksj-Latn-ZZ",ksr:"ksr-Latn-ZZ",ktb:"ktb-Ethi-ZZ",ktm:"ktm-Latn-ZZ",kto:"kto-Latn-ZZ",ktr:"ktr-Latn-MY",ku:"ku-Latn-TR","ku-Arab":"ku-Arab-IQ","ku-LB":"ku-Arab-LB","ku-Yezi":"ku-Yezi-GE",kub:"kub-Latn-ZZ",kud:"kud-Latn-ZZ",kue:"kue-Latn-ZZ",kuj:"kuj-Latn-ZZ",kum:"kum-Cyrl-RU",kun:"kun-Latn-ZZ",kup:"kup-Latn-ZZ",kus:"kus-Latn-ZZ",kv:"kv-Cyrl-RU",kvg:"kvg-Latn-ZZ",kvr:"kvr-Latn-ID",kvx:"kvx-Arab-PK",kw:"kw-Latn-GB",kwj:"kwj-Latn-ZZ",kwo:"kwo-Latn-ZZ",kwq:"kwq-Latn-ZZ",kxa:"kxa-Latn-ZZ",kxc:"kxc-Ethi-ZZ",kxe:"kxe-Latn-ZZ",kxl:"kxl-Deva-IN",kxm:"kxm-Thai-TH",kxp:"kxp-Arab-PK",kxw:"kxw-Latn-ZZ",kxz:"kxz-Latn-ZZ",ky:"ky-Cyrl-KG","ky-Arab":"ky-Arab-CN","ky-CN":"ky-Arab-CN","ky-Latn":"ky-Latn-TR","ky-TR":"ky-Latn-TR",kye:"kye-Latn-ZZ",kyx:"kyx-Latn-ZZ",kzh:"kzh-Arab-ZZ",kzj:"kzj-Latn-MY",kzr:"kzr-Latn-ZZ",kzt:"kzt-Latn-MY",la:"la-Latn-VA",lab:"lab-Lina-GR",lad:"lad-Hebr-IL",lag:"lag-Latn-TZ",lah:"lah-Arab-PK",laj:"laj-Latn-UG",las:"las-Latn-ZZ",lb:"lb-Latn-LU",lbe:"lbe-Cyrl-RU",lbu:"lbu-Latn-ZZ",lbw:"lbw-Latn-ID",lcm:"lcm-Latn-ZZ",lcp:"lcp-Thai-CN",ldb:"ldb-Latn-ZZ",led:"led-Latn-ZZ",lee:"lee-Latn-ZZ",lem:"lem-Latn-ZZ",lep:"lep-Lepc-IN",leq:"leq-Latn-ZZ",leu:"leu-Latn-ZZ",lez:"lez-Cyrl-RU",lg:"lg-Latn-UG",lgg:"lgg-Latn-ZZ",li:"li-Latn-NL",lia:"lia-Latn-ZZ",lid:"lid-Latn-ZZ",lif:"lif-Deva-NP","lif-Limb":"lif-Limb-IN",lig:"lig-Latn-ZZ",lih:"lih-Latn-ZZ",lij:"lij-Latn-IT",lis:"lis-Lisu-CN",ljp:"ljp-Latn-ID",lki:"lki-Arab-IR",lkt:"lkt-Latn-US",lle:"lle-Latn-ZZ",lln:"lln-Latn-ZZ",lmn:"lmn-Telu-IN",lmo:"lmo-Latn-IT",lmp:"lmp-Latn-ZZ",ln:"ln-Latn-CD",lns:"lns-Latn-ZZ",lnu:"lnu-Latn-ZZ",lo:"lo-Laoo-LA",loj:"loj-Latn-ZZ",lok:"lok-Latn-ZZ",lol:"lol-Latn-CD",lor:"lor-Latn-ZZ",los:"los-Latn-ZZ",loz:"loz-Latn-ZM",lrc:"lrc-Arab-IR",lt:"lt-Latn-LT",ltg:"ltg-Latn-LV",lu:"lu-Latn-CD",lua:"lua-Latn-CD",luo:"luo-Latn-KE",luy:"luy-Latn-KE",luz:"luz-Arab-IR",lv:"lv-Latn-LV",lwl:"lwl-Thai-TH",lzh:"lzh-Hans-CN",lzz:"lzz-Latn-TR",mad:"mad-Latn-ID",maf:"maf-Latn-CM",mag:"mag-Deva-IN",mai:"mai-Deva-IN",mak:"mak-Latn-ID",man:"man-Latn-GM","man-GN":"man-Nkoo-GN","man-Nkoo":"man-Nkoo-GN",mas:"mas-Latn-KE",maw:"maw-Latn-ZZ",maz:"maz-Latn-MX",mbh:"mbh-Latn-ZZ",mbo:"mbo-Latn-ZZ",mbq:"mbq-Latn-ZZ",mbu:"mbu-Latn-ZZ",mbw:"mbw-Latn-ZZ",mci:"mci-Latn-ZZ",mcp:"mcp-Latn-ZZ",mcq:"mcq-Latn-ZZ",mcr:"mcr-Latn-ZZ",mcu:"mcu-Latn-ZZ",mda:"mda-Latn-ZZ",mde:"mde-Arab-ZZ",mdf:"mdf-Cyrl-RU",mdh:"mdh-Latn-PH",mdj:"mdj-Latn-ZZ",mdr:"mdr-Latn-ID",mdx:"mdx-Ethi-ZZ",med:"med-Latn-ZZ",mee:"mee-Latn-ZZ",mek:"mek-Latn-ZZ",men:"men-Latn-SL",mer:"mer-Latn-KE",met:"met-Latn-ZZ",meu:"meu-Latn-ZZ",mfa:"mfa-Arab-TH",mfe:"mfe-Latn-MU",mfn:"mfn-Latn-ZZ",mfo:"mfo-Latn-ZZ",mfq:"mfq-Latn-ZZ",mg:"mg-Latn-MG",mgh:"mgh-Latn-MZ",mgl:"mgl-Latn-ZZ",mgo:"mgo-Latn-CM",mgp:"mgp-Deva-NP",mgy:"mgy-Latn-TZ",mh:"mh-Latn-MH",mhi:"mhi-Latn-ZZ",mhl:"mhl-Latn-ZZ",mi:"mi-Latn-NZ",mif:"mif-Latn-ZZ",min:"min-Latn-ID",miw:"miw-Latn-ZZ",mk:"mk-Cyrl-MK",mki:"mki-Arab-ZZ",mkl:"mkl-Latn-ZZ",mkp:"mkp-Latn-ZZ",mkw:"mkw-Latn-ZZ",ml:"ml-Mlym-IN",mle:"mle-Latn-ZZ",mlp:"mlp-Latn-ZZ",mls:"mls-Latn-SD",mmo:"mmo-Latn-ZZ",mmu:"mmu-Latn-ZZ",mmx:"mmx-Latn-ZZ",mn:"mn-Cyrl-MN","mn-CN":"mn-Mong-CN","mn-Mong":"mn-Mong-CN",mna:"mna-Latn-ZZ",mnf:"mnf-Latn-ZZ",mni:"mni-Beng-IN",mnw:"mnw-Mymr-MM",mo:"mo-Latn-RO",moa:"moa-Latn-ZZ",moe:"moe-Latn-CA",moh:"moh-Latn-CA",mos:"mos-Latn-BF",mox:"mox-Latn-ZZ",mpp:"mpp-Latn-ZZ",mps:"mps-Latn-ZZ",mpt:"mpt-Latn-ZZ",mpx:"mpx-Latn-ZZ",mql:"mql-Latn-ZZ",mr:"mr-Deva-IN",mrd:"mrd-Deva-NP",mrj:"mrj-Cyrl-RU",mro:"mro-Mroo-BD",ms:"ms-Latn-MY","ms-CC":"ms-Arab-CC",mt:"mt-Latn-MT",mtc:"mtc-Latn-ZZ",mtf:"mtf-Latn-ZZ",mti:"mti-Latn-ZZ",mtr:"mtr-Deva-IN",mua:"mua-Latn-CM",mur:"mur-Latn-ZZ",mus:"mus-Latn-US",mva:"mva-Latn-ZZ",mvn:"mvn-Latn-ZZ",mvy:"mvy-Arab-PK",mwk:"mwk-Latn-ML",mwr:"mwr-Deva-IN",mwv:"mwv-Latn-ID",mww:"mww-Hmnp-US",mxc:"mxc-Latn-ZW",mxm:"mxm-Latn-ZZ",my:"my-Mymr-MM",myk:"myk-Latn-ZZ",mym:"mym-Ethi-ZZ",myv:"myv-Cyrl-RU",myw:"myw-Latn-ZZ",myx:"myx-Latn-UG",myz:"myz-Mand-IR",mzk:"mzk-Latn-ZZ",mzm:"mzm-Latn-ZZ",mzn:"mzn-Arab-IR",mzp:"mzp-Latn-ZZ",mzw:"mzw-Latn-ZZ",mzz:"mzz-Latn-ZZ",na:"na-Latn-NR",nac:"nac-Latn-ZZ",naf:"naf-Latn-ZZ",nak:"nak-Latn-ZZ",nan:"nan-Hans-CN",nap:"nap-Latn-IT",naq:"naq-Latn-NA",nas:"nas-Latn-ZZ",nb:"nb-Latn-NO",nca:"nca-Latn-ZZ",nce:"nce-Latn-ZZ",ncf:"ncf-Latn-ZZ",nch:"nch-Latn-MX",nco:"nco-Latn-ZZ",ncu:"ncu-Latn-ZZ",nd:"nd-Latn-ZW",ndc:"ndc-Latn-MZ",nds:"nds-Latn-DE",ne:"ne-Deva-NP",neb:"neb-Latn-ZZ","new":"new-Deva-NP",nex:"nex-Latn-ZZ",nfr:"nfr-Latn-ZZ",ng:"ng-Latn-NA",nga:"nga-Latn-ZZ",ngb:"ngb-Latn-ZZ",ngl:"ngl-Latn-MZ",nhb:"nhb-Latn-ZZ",nhe:"nhe-Latn-MX",nhw:"nhw-Latn-MX",nif:"nif-Latn-ZZ",nii:"nii-Latn-ZZ",nij:"nij-Latn-ID",nin:"nin-Latn-ZZ",niu:"niu-Latn-NU",niy:"niy-Latn-ZZ",niz:"niz-Latn-ZZ",njo:"njo-Latn-IN",nkg:"nkg-Latn-ZZ",nko:"nko-Latn-ZZ",nl:"nl-Latn-NL",nmg:"nmg-Latn-CM",nmz:"nmz-Latn-ZZ",nn:"nn-Latn-NO",nnf:"nnf-Latn-ZZ",nnh:"nnh-Latn-CM",nnk:"nnk-Latn-ZZ",nnm:"nnm-Latn-ZZ",nnp:"nnp-Wcho-IN",no:"no-Latn-NO",nod:"nod-Lana-TH",noe:"noe-Deva-IN",non:"non-Runr-SE",nop:"nop-Latn-ZZ",nou:"nou-Latn-ZZ",nqo:"nqo-Nkoo-GN",nr:"nr-Latn-ZA",nrb:"nrb-Latn-ZZ",nsk:"nsk-Cans-CA",nsn:"nsn-Latn-ZZ",nso:"nso-Latn-ZA",nss:"nss-Latn-ZZ",ntm:"ntm-Latn-ZZ",ntr:"ntr-Latn-ZZ",nui:"nui-Latn-ZZ",nup:"nup-Latn-ZZ",nus:"nus-Latn-SS",nuv:"nuv-Latn-ZZ",nux:"nux-Latn-ZZ",nv:"nv-Latn-US",nwb:"nwb-Latn-ZZ",nxq:"nxq-Latn-CN",nxr:"nxr-Latn-ZZ",ny:"ny-Latn-MW",nym:"nym-Latn-TZ",nyn:"nyn-Latn-UG",nzi:"nzi-Latn-GH",oc:"oc-Latn-FR",ogc:"ogc-Latn-ZZ",okr:"okr-Latn-ZZ",okv:"okv-Latn-ZZ",om:"om-Latn-ET",ong:"ong-Latn-ZZ",onn:"onn-Latn-ZZ",ons:"ons-Latn-ZZ",opm:"opm-Latn-ZZ",or:"or-Orya-IN",oro:"oro-Latn-ZZ",oru:"oru-Arab-ZZ",os:"os-Cyrl-GE",osa:"osa-Osge-US",ota:"ota-Arab-ZZ",otk:"otk-Orkh-MN",ozm:"ozm-Latn-ZZ",pa:"pa-Guru-IN","pa-Arab":"pa-Arab-PK","pa-PK":"pa-Arab-PK",pag:"pag-Latn-PH",pal:"pal-Phli-IR","pal-Phlp":"pal-Phlp-CN",pam:"pam-Latn-PH",pap:"pap-Latn-AW",pau:"pau-Latn-PW",pbi:"pbi-Latn-ZZ",pcd:"pcd-Latn-FR",pcm:"pcm-Latn-NG",pdc:"pdc-Latn-US",pdt:"pdt-Latn-CA",ped:"ped-Latn-ZZ",peo:"peo-Xpeo-IR",pex:"pex-Latn-ZZ",pfl:"pfl-Latn-DE",phl:"phl-Arab-ZZ",phn:"phn-Phnx-LB",pil:"pil-Latn-ZZ",pip:"pip-Latn-ZZ",pka:"pka-Brah-IN",pko:"pko-Latn-KE",pl:"pl-Latn-PL",pla:"pla-Latn-ZZ",pms:"pms-Latn-IT",png:"png-Latn-ZZ",pnn:"pnn-Latn-ZZ",pnt:"pnt-Grek-GR",pon:"pon-Latn-FM",ppa:"ppa-Deva-IN",ppo:"ppo-Latn-ZZ",pra:"pra-Khar-PK",prd:"prd-Arab-IR",prg:"prg-Latn-001",ps:"ps-Arab-AF",pss:"pss-Latn-ZZ",pt:"pt-Latn-BR",ptp:"ptp-Latn-ZZ",puu:"puu-Latn-GA",pwa:"pwa-Latn-ZZ",qu:"qu-Latn-PE",quc:"quc-Latn-GT",qug:"qug-Latn-EC",rai:"rai-Latn-ZZ",raj:"raj-Deva-IN",rao:"rao-Latn-ZZ",rcf:"rcf-Latn-RE",rej:"rej-Latn-ID",rel:"rel-Latn-ZZ",res:"res-Latn-ZZ",rgn:"rgn-Latn-IT",rhg:"rhg-Arab-MM",ria:"ria-Latn-IN",rif:"rif-Tfng-MA","rif-NL":"rif-Latn-NL",rjs:"rjs-Deva-NP",rkt:"rkt-Beng-BD",rm:"rm-Latn-CH",rmf:"rmf-Latn-FI",rmo:"rmo-Latn-CH",rmt:"rmt-Arab-IR",rmu:"rmu-Latn-SE",rn:"rn-Latn-BI",rna:"rna-Latn-ZZ",rng:"rng-Latn-MZ",ro:"ro-Latn-RO",rob:"rob-Latn-ID",rof:"rof-Latn-TZ",roo:"roo-Latn-ZZ",rro:"rro-Latn-ZZ",rtm:"rtm-Latn-FJ",ru:"ru-Cyrl-RU",rue:"rue-Cyrl-UA",rug:"rug-Latn-SB",rw:"rw-Latn-RW",rwk:"rwk-Latn-TZ",rwo:"rwo-Latn-ZZ",ryu:"ryu-Kana-JP",sa:"sa-Deva-IN",saf:"saf-Latn-GH",sah:"sah-Cyrl-RU",saq:"saq-Latn-KE",sas:"sas-Latn-ID",sat:"sat-Olck-IN",sav:"sav-Latn-SN",saz:"saz-Saur-IN",sba:"sba-Latn-ZZ",sbe:"sbe-Latn-ZZ",sbp:"sbp-Latn-TZ",sc:"sc-Latn-IT",sck:"sck-Deva-IN",scl:"scl-Arab-ZZ",scn:"scn-Latn-IT",sco:"sco-Latn-GB",scs:"scs-Latn-CA",sd:"sd-Arab-PK","sd-Deva":"sd-Deva-IN","sd-Khoj":"sd-Khoj-IN","sd-Sind":"sd-Sind-IN",sdc:"sdc-Latn-IT",sdh:"sdh-Arab-IR",se:"se-Latn-NO",sef:"sef-Latn-CI",seh:"seh-Latn-MZ",sei:"sei-Latn-MX",ses:"ses-Latn-ML",sg:"sg-Latn-CF",sga:"sga-Ogam-IE",sgs:"sgs-Latn-LT",sgw:"sgw-Ethi-ZZ",sgz:"sgz-Latn-ZZ",shi:"shi-Tfng-MA",shk:"shk-Latn-ZZ",shn:"shn-Mymr-MM",shu:"shu-Arab-ZZ",si:"si-Sinh-LK",sid:"sid-Latn-ET",sig:"sig-Latn-ZZ",sil:"sil-Latn-ZZ",sim:"sim-Latn-ZZ",sjr:"sjr-Latn-ZZ",sk:"sk-Latn-SK",skc:"skc-Latn-ZZ",skr:"skr-Arab-PK",sks:"sks-Latn-ZZ",sl:"sl-Latn-SI",sld:"sld-Latn-ZZ",sli:"sli-Latn-PL",sll:"sll-Latn-ZZ",sly:"sly-Latn-ID",sm:"sm-Latn-WS",sma:"sma-Latn-SE",smj:"smj-Latn-SE",smn:"smn-Latn-FI",smp:"smp-Samr-IL",smq:"smq-Latn-ZZ",sms:"sms-Latn-FI",sn:"sn-Latn-ZW",snc:"snc-Latn-ZZ",snk:"snk-Latn-ML",snp:"snp-Latn-ZZ",snx:"snx-Latn-ZZ",sny:"sny-Latn-ZZ",so:"so-Latn-SO",sog:"sog-Sogd-UZ",sok:"sok-Latn-ZZ",soq:"soq-Latn-ZZ",sou:"sou-Thai-TH",soy:"soy-Latn-ZZ",spd:"spd-Latn-ZZ",spl:"spl-Latn-ZZ",sps:"sps-Latn-ZZ",sq:"sq-Latn-AL",sr:"sr-Cyrl-RS","sr-ME":"sr-Latn-ME","sr-RO":"sr-Latn-RO","sr-RU":"sr-Latn-RU","sr-TR":"sr-Latn-TR",srb:"srb-Sora-IN",srn:"srn-Latn-SR",srr:"srr-Latn-SN",srx:"srx-Deva-IN",ss:"ss-Latn-ZA",ssd:"ssd-Latn-ZZ",ssg:"ssg-Latn-ZZ",ssy:"ssy-Latn-ER",st:"st-Latn-ZA",stk:"stk-Latn-ZZ",stq:"stq-Latn-DE",su:"su-Latn-ID",sua:"sua-Latn-ZZ",sue:"sue-Latn-ZZ",suk:"suk-Latn-TZ",sur:"sur-Latn-ZZ",sus:"sus-Latn-GN",sv:"sv-Latn-SE",sw:"sw-Latn-TZ",swb:"swb-Arab-YT",swc:"swc-Latn-CD",swg:"swg-Latn-DE",swp:"swp-Latn-ZZ",swv:"swv-Deva-IN",sxn:"sxn-Latn-ID",sxw:"sxw-Latn-ZZ",syl:"syl-Beng-BD",syr:"syr-Syrc-IQ",szl:"szl-Latn-PL",ta:"ta-Taml-IN",taj:"taj-Deva-NP",tal:"tal-Latn-ZZ",tan:"tan-Latn-ZZ",taq:"taq-Latn-ZZ",tbc:"tbc-Latn-ZZ",tbd:"tbd-Latn-ZZ",tbf:"tbf-Latn-ZZ",tbg:"tbg-Latn-ZZ",tbo:"tbo-Latn-ZZ",tbw:"tbw-Latn-PH",tbz:"tbz-Latn-ZZ",tci:"tci-Latn-ZZ",tcy:"tcy-Knda-IN",tdd:"tdd-Tale-CN",tdg:"tdg-Deva-NP",tdh:"tdh-Deva-NP",tdu:"tdu-Latn-MY",te:"te-Telu-IN",ted:"ted-Latn-ZZ",tem:"tem-Latn-SL",teo:"teo-Latn-UG",tet:"tet-Latn-TL",tfi:"tfi-Latn-ZZ",tg:"tg-Cyrl-TJ","tg-Arab":"tg-Arab-PK","tg-PK":"tg-Arab-PK",tgc:"tgc-Latn-ZZ",tgo:"tgo-Latn-ZZ",tgu:"tgu-Latn-ZZ",th:"th-Thai-TH",thl:"thl-Deva-NP",thq:"thq-Deva-NP",thr:"thr-Deva-NP",ti:"ti-Ethi-ET",tif:"tif-Latn-ZZ",tig:"tig-Ethi-ER",tik:"tik-Latn-ZZ",tim:"tim-Latn-ZZ",tio:"tio-Latn-ZZ",tiv:"tiv-Latn-NG",tk:"tk-Latn-TM",tkl:"tkl-Latn-TK",tkr:"tkr-Latn-AZ",tkt:"tkt-Deva-NP",tl:"tl-Latn-PH",tlf:"tlf-Latn-ZZ",tlx:"tlx-Latn-ZZ",tly:"tly-Latn-AZ",tmh:"tmh-Latn-NE",tmy:"tmy-Latn-ZZ",tn:"tn-Latn-ZA",tnh:"tnh-Latn-ZZ",to:"to-Latn-TO",tof:"tof-Latn-ZZ",tog:"tog-Latn-MW",toq:"toq-Latn-ZZ",tpi:"tpi-Latn-PG",tpm:"tpm-Latn-ZZ",tpz:"tpz-Latn-ZZ",tqo:"tqo-Latn-ZZ",tr:"tr-Latn-TR",tru:"tru-Latn-TR",trv:"trv-Latn-TW",trw:"trw-Arab-PK",ts:"ts-Latn-ZA",tsd:"tsd-Grek-GR",tsf:"tsf-Deva-NP",tsg:"tsg-Latn-PH",tsj:"tsj-Tibt-BT",tsw:"tsw-Latn-ZZ",tt:"tt-Cyrl-RU",ttd:"ttd-Latn-ZZ",tte:"tte-Latn-ZZ",ttj:"ttj-Latn-UG",ttr:"ttr-Latn-ZZ",tts:"tts-Thai-TH",ttt:"ttt-Latn-AZ",tuh:"tuh-Latn-ZZ",tul:"tul-Latn-ZZ",tum:"tum-Latn-MW",tuq:"tuq-Latn-ZZ",tvd:"tvd-Latn-ZZ",tvl:"tvl-Latn-TV",tvu:"tvu-Latn-ZZ",twh:"twh-Latn-ZZ",twq:"twq-Latn-NE",txg:"txg-Tang-CN",ty:"ty-Latn-PF",tya:"tya-Latn-ZZ",tyv:"tyv-Cyrl-RU",tzm:"tzm-Latn-MA",ubu:"ubu-Latn-ZZ",udi:"udi-Aghb-RU",udm:"udm-Cyrl-RU",ug:"ug-Arab-CN","ug-Cyrl":"ug-Cyrl-KZ","ug-KZ":"ug-Cyrl-KZ","ug-MN":"ug-Cyrl-MN",uga:"uga-Ugar-SY",uk:"uk-Cyrl-UA",uli:"uli-Latn-FM",umb:"umb-Latn-AO",und:"en-Latn-US","und-002":"en-Latn-NG","und-003":"en-Latn-US","und-005":"pt-Latn-BR","und-009":"en-Latn-AU","und-011":"en-Latn-NG","und-013":"es-Latn-MX","und-014":"sw-Latn-TZ","und-015":"ar-Arab-EG","und-017":"sw-Latn-CD","und-018":"en-Latn-ZA","und-019":"en-Latn-US","und-021":"en-Latn-US","und-029":"es-Latn-CU","und-030":"zh-Hans-CN","und-034":"hi-Deva-IN","und-035":"id-Latn-ID","und-039":"it-Latn-IT","und-053":"en-Latn-AU","und-054":"en-Latn-PG","und-057":"en-Latn-GU","und-061":"sm-Latn-WS","und-142":"zh-Hans-CN","und-143":"uz-Latn-UZ","und-145":"ar-Arab-SA","und-150":"ru-Cyrl-RU","und-151":"ru-Cyrl-RU","und-154":"en-Latn-GB","und-155":"de-Latn-DE","und-202":"en-Latn-NG","und-419":"es-Latn-419","und-AD":"ca-Latn-AD","und-Adlm":"ff-Adlm-GN","und-AE":"ar-Arab-AE","und-AF":"fa-Arab-AF","und-Aghb":"udi-Aghb-RU","und-Ahom":"aho-Ahom-IN","und-AL":"sq-Latn-AL","und-AM":"hy-Armn-AM","und-AO":"pt-Latn-AO","und-AQ":"und-Latn-AQ","und-AR":"es-Latn-AR","und-Arab":"ar-Arab-EG","und-Arab-CC":"ms-Arab-CC","und-Arab-CN":"ug-Arab-CN","und-Arab-GB":"ks-Arab-GB","und-Arab-ID":"ms-Arab-ID","und-Arab-IN":"ur-Arab-IN","und-Arab-KH":"cja-Arab-KH","und-Arab-MM":"rhg-Arab-MM","und-Arab-MN":"kk-Arab-MN","und-Arab-MU":"ur-Arab-MU","und-Arab-NG":"ha-Arab-NG","und-Arab-PK":"ur-Arab-PK","und-Arab-TG":"apd-Arab-TG","und-Arab-TH":"mfa-Arab-TH","und-Arab-TJ":"fa-Arab-TJ","und-Arab-TR":"az-Arab-TR","und-Arab-YT":"swb-Arab-YT","und-Armi":"arc-Armi-IR","und-Armn":"hy-Armn-AM","und-AS":"sm-Latn-AS","und-AT":"de-Latn-AT","und-Avst":"ae-Avst-IR","und-AW":"nl-Latn-AW","und-AX":"sv-Latn-AX","und-AZ":"az-Latn-AZ","und-BA":"bs-Latn-BA","und-Bali":"ban-Bali-ID","und-Bamu":"bax-Bamu-CM","und-Bass":"bsq-Bass-LR","und-Batk":"bbc-Batk-ID","und-BD":"bn-Beng-BD","und-BE":"nl-Latn-BE","und-Beng":"bn-Beng-BD","und-BF":"fr-Latn-BF","und-BG":"bg-Cyrl-BG","und-BH":"ar-Arab-BH","und-Bhks":"sa-Bhks-IN","und-BI":"rn-Latn-BI","und-BJ":"fr-Latn-BJ","und-BL":"fr-Latn-BL","und-BN":"ms-Latn-BN","und-BO":"es-Latn-BO","und-Bopo":"zh-Bopo-TW","und-BQ":"pap-Latn-BQ","und-BR":"pt-Latn-BR","und-Brah":"pka-Brah-IN","und-Brai":"fr-Brai-FR","und-BT":"dz-Tibt-BT","und-Bugi":"bug-Bugi-ID","und-Buhd":"bku-Buhd-PH","und-BV":"und-Latn-BV","und-BY":"be-Cyrl-BY","und-Cakm":"ccp-Cakm-BD","und-Cans":"cr-Cans-CA","und-Cari":"xcr-Cari-TR","und-CD":"sw-Latn-CD","und-CF":"fr-Latn-CF","und-CG":"fr-Latn-CG","und-CH":"de-Latn-CH","und-Cham":"cjm-Cham-VN","und-Cher":"chr-Cher-US","und-Chrs":"xco-Chrs-UZ","und-CI":"fr-Latn-CI","und-CL":"es-Latn-CL","und-CM":"fr-Latn-CM","und-CN":"zh-Hans-CN","und-CO":"es-Latn-CO","und-Copt":"cop-Copt-EG","und-CP":"und-Latn-CP","und-Cprt":"grc-Cprt-CY","und-CR":"es-Latn-CR","und-CU":"es-Latn-CU","und-CV":"pt-Latn-CV","und-CW":"pap-Latn-CW","und-CY":"el-Grek-CY","und-Cyrl":"ru-Cyrl-RU","und-Cyrl-AL":"mk-Cyrl-AL","und-Cyrl-BA":"sr-Cyrl-BA","und-Cyrl-GE":"os-Cyrl-GE","und-Cyrl-GR":"mk-Cyrl-GR","und-Cyrl-MD":"uk-Cyrl-MD","und-Cyrl-RO":"bg-Cyrl-RO","und-Cyrl-SK":"uk-Cyrl-SK","und-Cyrl-TR":"kbd-Cyrl-TR","und-Cyrl-XK":"sr-Cyrl-XK","und-CZ":"cs-Latn-CZ","und-DE":"de-Latn-DE","und-Deva":"hi-Deva-IN","und-Deva-BT":"ne-Deva-BT","und-Deva-FJ":"hif-Deva-FJ","und-Deva-MU":"bho-Deva-MU","und-Deva-PK":"btv-Deva-PK","und-Diak":"dv-Diak-MV","und-DJ":"aa-Latn-DJ","und-DK":"da-Latn-DK","und-DO":"es-Latn-DO","und-Dogr":"doi-Dogr-IN","und-Dupl":"fr-Dupl-FR","und-DZ":"ar-Arab-DZ","und-EA":"es-Latn-EA","und-EC":"es-Latn-EC","und-EE":"et-Latn-EE","und-EG":"ar-Arab-EG","und-Egyp":"egy-Egyp-EG","und-EH":"ar-Arab-EH","und-Elba":"sq-Elba-AL","und-Elym":"arc-Elym-IR","und-ER":"ti-Ethi-ER","und-ES":"es-Latn-ES","und-ET":"am-Ethi-ET","und-Ethi":"am-Ethi-ET","und-EU":"en-Latn-IE","und-EZ":"de-Latn-EZ","und-FI":"fi-Latn-FI","und-FO":"fo-Latn-FO","und-FR":"fr-Latn-FR","und-GA":"fr-Latn-GA","und-GE":"ka-Geor-GE","und-Geor":"ka-Geor-GE","und-GF":"fr-Latn-GF","und-GH":"ak-Latn-GH","und-GL":"kl-Latn-GL","und-Glag":"cu-Glag-BG","und-GN":"fr-Latn-GN","und-Gong":"wsg-Gong-IN","und-Gonm":"esg-Gonm-IN","und-Goth":"got-Goth-UA","und-GP":"fr-Latn-GP","und-GQ":"es-Latn-GQ","und-GR":"el-Grek-GR","und-Gran":"sa-Gran-IN","und-Grek":"el-Grek-GR","und-Grek-TR":"bgx-Grek-TR","und-GS":"und-Latn-GS","und-GT":"es-Latn-GT","und-Gujr":"gu-Gujr-IN","und-Guru":"pa-Guru-IN","und-GW":"pt-Latn-GW","und-Hanb":"zh-Hanb-TW","und-Hang":"ko-Hang-KR","und-Hani":"zh-Hani-CN","und-Hano":"hnn-Hano-PH","und-Hans":"zh-Hans-CN","und-Hant":"zh-Hant-TW","und-Hebr":"he-Hebr-IL","und-Hebr-CA":"yi-Hebr-CA","und-Hebr-GB":"yi-Hebr-GB","und-Hebr-SE":"yi-Hebr-SE","und-Hebr-UA":"yi-Hebr-UA","und-Hebr-US":"yi-Hebr-US","und-Hira":"ja-Hira-JP","und-HK":"zh-Hant-HK","und-Hluw":"hlu-Hluw-TR","und-HM":"und-Latn-HM","und-Hmng":"hnj-Hmng-LA","und-Hmnp":"mww-Hmnp-US","und-HN":"es-Latn-HN","und-HR":"hr-Latn-HR","und-HT":"ht-Latn-HT","und-HU":"hu-Latn-HU","und-Hung":"hu-Hung-HU","und-IC":"es-Latn-IC","und-ID":"id-Latn-ID","und-IL":"he-Hebr-IL","und-IN":"hi-Deva-IN","und-IQ":"ar-Arab-IQ","und-IR":"fa-Arab-IR","und-IS":"is-Latn-IS","und-IT":"it-Latn-IT","und-Ital":"ett-Ital-IT","und-Jamo":"ko-Jamo-KR","und-Java":"jv-Java-ID","und-JO":"ar-Arab-JO","und-JP":"ja-Jpan-JP","und-Jpan":"ja-Jpan-JP","und-Kali":"eky-Kali-MM","und-Kana":"ja-Kana-JP","und-KE":"sw-Latn-KE","und-KG":"ky-Cyrl-KG","und-KH":"km-Khmr-KH","und-Khar":"pra-Khar-PK","und-Khmr":"km-Khmr-KH","und-Khoj":"sd-Khoj-IN","und-Kits":"zkt-Kits-CN","und-KM":"ar-Arab-KM","und-Knda":"kn-Knda-IN","und-Kore":"ko-Kore-KR","und-KP":"ko-Kore-KP","und-KR":"ko-Kore-KR","und-Kthi":"bho-Kthi-IN","und-KW":"ar-Arab-KW","und-KZ":"ru-Cyrl-KZ","und-LA":"lo-Laoo-LA","und-Lana":"nod-Lana-TH","und-Laoo":"lo-Laoo-LA","und-Latn-AF":"tk-Latn-AF","und-Latn-AM":"ku-Latn-AM","und-Latn-CN":"za-Latn-CN","und-Latn-CY":"tr-Latn-CY","und-Latn-DZ":"fr-Latn-DZ","und-Latn-ET":"en-Latn-ET","und-Latn-GE":"ku-Latn-GE","und-Latn-IR":"tk-Latn-IR","und-Latn-KM":"fr-Latn-KM","und-Latn-MA":"fr-Latn-MA","und-Latn-MK":"sq-Latn-MK","und-Latn-MM":"kac-Latn-MM","und-Latn-MO":"pt-Latn-MO","und-Latn-MR":"fr-Latn-MR","und-Latn-RU":"krl-Latn-RU","und-Latn-SY":"fr-Latn-SY","und-Latn-TN":"fr-Latn-TN","und-Latn-TW":"trv-Latn-TW","und-Latn-UA":"pl-Latn-UA","und-LB":"ar-Arab-LB","und-Lepc":"lep-Lepc-IN","und-LI":"de-Latn-LI","und-Limb":"lif-Limb-IN","und-Lina":"lab-Lina-GR","und-Linb":"grc-Linb-GR","und-Lisu":"lis-Lisu-CN","und-LK":"si-Sinh-LK","und-LS":"st-Latn-LS","und-LT":"lt-Latn-LT","und-LU":"fr-Latn-LU","und-LV":"lv-Latn-LV","und-LY":"ar-Arab-LY","und-Lyci":"xlc-Lyci-TR","und-Lydi":"xld-Lydi-TR","und-MA":"ar-Arab-MA","und-Mahj":"hi-Mahj-IN","und-Maka":"mak-Maka-ID","und-Mand":"myz-Mand-IR","und-Mani":"xmn-Mani-CN","und-Marc":"bo-Marc-CN","und-MC":"fr-Latn-MC","und-MD":"ro-Latn-MD","und-ME":"sr-Latn-ME","und-Medf":"dmf-Medf-NG","und-Mend":"men-Mend-SL","und-Merc":"xmr-Merc-SD","und-Mero":"xmr-Mero-SD","und-MF":"fr-Latn-MF","und-MG":"mg-Latn-MG","und-MK":"mk-Cyrl-MK","und-ML":"bm-Latn-ML","und-Mlym":"ml-Mlym-IN","und-MM":"my-Mymr-MM","und-MN":"mn-Cyrl-MN","und-MO":"zh-Hant-MO","und-Modi":"mr-Modi-IN","und-Mong":"mn-Mong-CN","und-MQ":"fr-Latn-MQ","und-MR":"ar-Arab-MR","und-Mroo":"mro-Mroo-BD","und-MT":"mt-Latn-MT","und-Mtei":"mni-Mtei-IN","und-MU":"mfe-Latn-MU","und-Mult":"skr-Mult-PK","und-MV":"dv-Thaa-MV","und-MX":"es-Latn-MX","und-MY":"ms-Latn-MY","und-Mymr":"my-Mymr-MM","und-Mymr-IN":"kht-Mymr-IN","und-Mymr-TH":"mnw-Mymr-TH","und-MZ":"pt-Latn-MZ","und-NA":"af-Latn-NA","und-Nand":"sa-Nand-IN","und-Narb":"xna-Narb-SA","und-Nbat":"arc-Nbat-JO","und-NC":"fr-Latn-NC","und-NE":"ha-Latn-NE","und-Newa":"new-Newa-NP","und-NI":"es-Latn-NI","und-Nkoo":"man-Nkoo-GN","und-NL":"nl-Latn-NL","und-NO":"nb-Latn-NO","und-NP":"ne-Deva-NP","und-Nshu":"zhx-Nshu-CN","und-Ogam":"sga-Ogam-IE","und-Olck":"sat-Olck-IN","und-OM":"ar-Arab-OM","und-Orkh":"otk-Orkh-MN","und-Orya":"or-Orya-IN","und-Osge":"osa-Osge-US","und-Osma":"so-Osma-SO","und-PA":"es-Latn-PA","und-Palm":"arc-Palm-SY","und-Pauc":"ctd-Pauc-MM","und-PE":"es-Latn-PE","und-Perm":"kv-Perm-RU","und-PF":"fr-Latn-PF","und-PG":"tpi-Latn-PG","und-PH":"fil-Latn-PH","und-Phag":"lzh-Phag-CN","und-Phli":"pal-Phli-IR","und-Phlp":"pal-Phlp-CN","und-Phnx":"phn-Phnx-LB","und-PK":"ur-Arab-PK","und-PL":"pl-Latn-PL","und-Plrd":"hmd-Plrd-CN","und-PM":"fr-Latn-PM","und-PR":"es-Latn-PR","und-Prti":"xpr-Prti-IR","und-PS":"ar-Arab-PS","und-PT":"pt-Latn-PT","und-PW":"pau-Latn-PW","und-PY":"gn-Latn-PY","und-QA":"ar-Arab-QA","und-QO":"en-Latn-DG","und-RE":"fr-Latn-RE","und-Rjng":"rej-Rjng-ID","und-RO":"ro-Latn-RO","und-Rohg":"rhg-Rohg-MM","und-RS":"sr-Cyrl-RS","und-RU":"ru-Cyrl-RU","und-Runr":"non-Runr-SE","und-RW":"rw-Latn-RW","und-SA":"ar-Arab-SA","und-Samr":"smp-Samr-IL","und-Sarb":"xsa-Sarb-YE","und-Saur":"saz-Saur-IN","und-SC":"fr-Latn-SC","und-SD":"ar-Arab-SD","und-SE":"sv-Latn-SE","und-Sgnw":"ase-Sgnw-US","und-Shaw":"en-Shaw-GB","und-Shrd":"sa-Shrd-IN","und-SI":"sl-Latn-SI","und-Sidd":"sa-Sidd-IN","und-Sind":"sd-Sind-IN","und-Sinh":"si-Sinh-LK","und-SJ":"nb-Latn-SJ","und-SK":"sk-Latn-SK","und-SM":"it-Latn-SM","und-SN":"fr-Latn-SN","und-SO":"so-Latn-SO","und-Sogd":"sog-Sogd-UZ","und-Sogo":"sog-Sogo-UZ","und-Sora":"srb-Sora-IN","und-Soyo":"cmg-Soyo-MN","und-SR":"nl-Latn-SR","und-ST":"pt-Latn-ST","und-Sund":"su-Sund-ID","und-SV":"es-Latn-SV","und-SY":"ar-Arab-SY","und-Sylo":"syl-Sylo-BD","und-Syrc":"syr-Syrc-IQ","und-Tagb":"tbw-Tagb-PH","und-Takr":"doi-Takr-IN","und-Tale":"tdd-Tale-CN","und-Talu":"khb-Talu-CN","und-Taml":"ta-Taml-IN","und-Tang":"txg-Tang-CN","und-Tavt":"blt-Tavt-VN","und-TD":"fr-Latn-TD","und-Telu":"te-Telu-IN","und-TF":"fr-Latn-TF","und-Tfng":"zgh-Tfng-MA","und-TG":"fr-Latn-TG","und-Tglg":"fil-Tglg-PH","und-TH":"th-Thai-TH","und-Thaa":"dv-Thaa-MV","und-Thai":"th-Thai-TH","und-Thai-CN":"lcp-Thai-CN","und-Thai-KH":"kdt-Thai-KH","und-Thai-LA":"kdt-Thai-LA","und-Tibt":"bo-Tibt-CN","und-Tirh":"mai-Tirh-IN","und-TJ":"tg-Cyrl-TJ","und-TK":"tkl-Latn-TK","und-TL":"pt-Latn-TL","und-TM":"tk-Latn-TM","und-TN":"ar-Arab-TN","und-TO":"to-Latn-TO","und-TR":"tr-Latn-TR","und-TV":"tvl-Latn-TV","und-TW":"zh-Hant-TW","und-TZ":"sw-Latn-TZ","und-UA":"uk-Cyrl-UA","und-UG":"sw-Latn-UG","und-Ugar":"uga-Ugar-SY","und-UY":"es-Latn-UY","und-UZ":"uz-Latn-UZ","und-VA":"it-Latn-VA","und-Vaii":"vai-Vaii-LR","und-VE":"es-Latn-VE","und-VN":"vi-Latn-VN","und-VU":"bi-Latn-VU","und-Wara":"hoc-Wara-IN","und-Wcho":"nnp-Wcho-IN","und-WF":"fr-Latn-WF","und-WS":"sm-Latn-WS","und-XK":"sq-Latn-XK","und-Xpeo":"peo-Xpeo-IR","und-Xsux":"akk-Xsux-IQ","und-YE":"ar-Arab-YE","und-Yezi":"ku-Yezi-GE","und-Yiii":"ii-Yiii-CN","und-YT":"fr-Latn-YT","und-Zanb":"cmg-Zanb-MN","und-ZW":"sn-Latn-ZW",unr:"unr-Beng-IN","unr-Deva":"unr-Deva-NP","unr-NP":"unr-Deva-NP",unx:"unx-Beng-IN",uok:"uok-Latn-ZZ",ur:"ur-Arab-PK",uri:"uri-Latn-ZZ",urt:"urt-Latn-ZZ",urw:"urw-Latn-ZZ",usa:"usa-Latn-ZZ",uth:"uth-Latn-ZZ",utr:"utr-Latn-ZZ",uvh:"uvh-Latn-ZZ",uvl:"uvl-Latn-ZZ",uz:"uz-Latn-UZ","uz-AF":"uz-Arab-AF","uz-Arab":"uz-Arab-AF","uz-CN":"uz-Cyrl-CN",vag:"vag-Latn-ZZ",vai:"vai-Vaii-LR",van:"van-Latn-ZZ",ve:"ve-Latn-ZA",vec:"vec-Latn-IT",vep:"vep-Latn-RU",vi:"vi-Latn-VN",vic:"vic-Latn-SX",viv:"viv-Latn-ZZ",vls:"vls-Latn-BE",vmf:"vmf-Latn-DE",vmw:"vmw-Latn-MZ",vo:"vo-Latn-001",vot:"vot-Latn-RU",vro:"vro-Latn-EE",vun:"vun-Latn-TZ",vut:"vut-Latn-ZZ",wa:"wa-Latn-BE",wae:"wae-Latn-CH",waj:"waj-Latn-ZZ",wal:"wal-Ethi-ET",wan:"wan-Latn-ZZ",war:"war-Latn-PH",wbp:"wbp-Latn-AU",wbq:"wbq-Telu-IN",wbr:"wbr-Deva-IN",wci:"wci-Latn-ZZ",wer:"wer-Latn-ZZ",wgi:"wgi-Latn-ZZ",whg:"whg-Latn-ZZ",wib:"wib-Latn-ZZ",wiu:"wiu-Latn-ZZ",wiv:"wiv-Latn-ZZ",wja:"wja-Latn-ZZ",wji:"wji-Latn-ZZ",wls:"wls-Latn-WF",wmo:"wmo-Latn-ZZ",wnc:"wnc-Latn-ZZ",wni:"wni-Arab-KM",wnu:"wnu-Latn-ZZ",wo:"wo-Latn-SN",wob:"wob-Latn-ZZ",wos:"wos-Latn-ZZ",wrs:"wrs-Latn-ZZ",wsg:"wsg-Gong-IN",wsk:"wsk-Latn-ZZ",wtm:"wtm-Deva-IN",wuu:"wuu-Hans-CN",wuv:"wuv-Latn-ZZ",wwa:"wwa-Latn-ZZ",xav:"xav-Latn-BR",xbi:"xbi-Latn-ZZ",xco:"xco-Chrs-UZ",xcr:"xcr-Cari-TR",xes:"xes-Latn-ZZ",xh:"xh-Latn-ZA",xla:"xla-Latn-ZZ",xlc:"xlc-Lyci-TR",xld:"xld-Lydi-TR",xmf:"xmf-Geor-GE",xmn:"xmn-Mani-CN",xmr:"xmr-Merc-SD",xna:"xna-Narb-SA",xnr:"xnr-Deva-IN",xog:"xog-Latn-UG",xon:"xon-Latn-ZZ",xpr:"xpr-Prti-IR",xrb:"xrb-Latn-ZZ",xsa:"xsa-Sarb-YE",xsi:"xsi-Latn-ZZ",xsm:"xsm-Latn-ZZ",xsr:"xsr-Deva-NP",xwe:"xwe-Latn-ZZ",yam:"yam-Latn-ZZ",yao:"yao-Latn-MZ",yap:"yap-Latn-FM",yas:"yas-Latn-ZZ",yat:"yat-Latn-ZZ",yav:"yav-Latn-CM",yay:"yay-Latn-ZZ",yaz:"yaz-Latn-ZZ",yba:"yba-Latn-ZZ",ybb:"ybb-Latn-CM",yby:"yby-Latn-ZZ",yer:"yer-Latn-ZZ",ygr:"ygr-Latn-ZZ",ygw:"ygw-Latn-ZZ",yi:"yi-Hebr-001",yko:"yko-Latn-ZZ",yle:"yle-Latn-ZZ",ylg:"ylg-Latn-ZZ",yll:"yll-Latn-ZZ",yml:"yml-Latn-ZZ",yo:"yo-Latn-NG",yon:"yon-Latn-ZZ",yrb:"yrb-Latn-ZZ",yre:"yre-Latn-ZZ",yrl:"yrl-Latn-BR",yss:"yss-Latn-ZZ",yua:"yua-Latn-MX",yue:"yue-Hant-HK","yue-CN":"yue-Hans-CN","yue-Hans":"yue-Hans-CN",yuj:"yuj-Latn-ZZ",yut:"yut-Latn-ZZ",yuw:"yuw-Latn-ZZ",za:"za-Latn-CN",zag:"zag-Latn-SD",zdj:"zdj-Arab-KM",zea:"zea-Latn-NL",zgh:"zgh-Tfng-MA",zh:"zh-Hans-CN","zh-AU":"zh-Hant-AU","zh-BN":"zh-Hant-BN","zh-Bopo":"zh-Bopo-TW","zh-GB":"zh-Hant-GB","zh-GF":"zh-Hant-GF","zh-Hanb":"zh-Hanb-TW","zh-Hant":"zh-Hant-TW","zh-HK":"zh-Hant-HK","zh-ID":"zh-Hant-ID","zh-MO":"zh-Hant-MO","zh-PA":"zh-Hant-PA",
"zh-PF":"zh-Hant-PF","zh-PH":"zh-Hant-PH","zh-SR":"zh-Hant-SR","zh-TH":"zh-Hant-TH","zh-TW":"zh-Hant-TW","zh-US":"zh-Hant-US","zh-VN":"zh-Hant-VN",zhx:"zhx-Nshu-CN",zia:"zia-Latn-ZZ",zkt:"zkt-Kits-CN",zlm:"zlm-Latn-TG",zmi:"zmi-Latn-MY",zne:"zne-Latn-ZZ",zu:"zu-Latn-ZA",zza:"zza-Latn-TR"}}}}}),I=A({"bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/canonicalizer.js":function(n){"use strict";function a(n){return Object.keys(n.reduce(function(n,a){return n[a.toLowerCase()]=1,n},{})).sort()}function t(n){for(var a={},t=[],e=0,u=n;e<u.length;e++){var i=u[e];i[0]in a||(a[i[0]]=1,i[1]&&"true"!==i[1]?t.push([i[0].toLowerCase(),i[1].toLowerCase()]):t.push([i[0].toLowerCase()]))}return t.sort(r)}function r(n,a){return n[0]<a[0]?-1:n[0]>a[0]?1:0}function e(n,a){return n.type<a.type?-1:n.type>a.type?1:0}function u(n,a){for(var t=L.__spreadArray([],n),r=0,e=a;r<e.length;r++){var u=e[r];n.indexOf(u)<0&&t.push(u)}return t}function i(n){var a=n;if(n.variants.length)for(var t="",r=0,e=n.variants;r<e.length;r++){var i=e[r];if(t=s.languageAlias[l.emitUnicodeLanguageId({lang:n.lang,variants:[i]})]){var o=d.parseUnicodeLanguageId(t.split(d.SEPARATOR));a={lang:o.lang,script:a.script||o.script,region:a.region||o.region,variants:u(a.variants,o.variants)};break}}if(a.script&&a.region){var L=s.languageAlias[l.emitUnicodeLanguageId({lang:a.lang,script:a.script,region:a.region,variants:[]})];if(L){var o=d.parseUnicodeLanguageId(L.split(d.SEPARATOR));a={lang:o.lang,script:o.script,region:o.region,variants:a.variants}}}if(a.region){var c=s.languageAlias[l.emitUnicodeLanguageId({lang:a.lang,region:a.region,variants:[]})];if(c){var o=d.parseUnicodeLanguageId(c.split(d.SEPARATOR));a={lang:o.lang,script:a.script||o.script,region:o.region,variants:a.variants}}}var g=s.languageAlias[l.emitUnicodeLanguageId({lang:a.lang,variants:[]})];if(g){var o=d.parseUnicodeLanguageId(g.split(d.SEPARATOR));a={lang:o.lang,script:a.script||o.script,region:a.region||o.region,variants:a.variants}}if(a.region){var b=a.region.toUpperCase(),m=s.territoryAlias[b],h=void 0;if(m){var f=m.split(" ");h=f[0];var k=Z.supplemental.likelySubtags[l.emitUnicodeLanguageId({lang:a.lang,script:a.script,variants:[]})];if(k){var p=d.parseUnicodeLanguageId(k.split(d.SEPARATOR)).region;p&&f.indexOf(p)>-1&&(h=p)}}h&&(a.region=h),a.region=a.region.toUpperCase()}if(a.script&&(a.script=a.script[0].toUpperCase()+a.script.slice(1).toLowerCase(),s.scriptAlias[a.script]&&(a.script=s.scriptAlias[a.script])),a.variants.length){for(var y=0;y<a.variants.length;y++){var i=a.variants[y].toLowerCase();if(s.variantAlias[i]){var A=s.variantAlias[i];d.isUnicodeVariantSubtag(A)?a.variants[y]=A:d.isUnicodeLanguageSubtag(A)&&(a.lang=A)}}a.variants.sort()}return a}function o(n){if(n.lang=i(n.lang),n.extensions){for(var r=0,u=n.extensions;r<u.length;r++){var o=u[r];switch(o.type){case"u":o.keywords=t(o.keywords),o.attributes&&(o.attributes=a(o.attributes));break;case"t":o.lang&&(o.lang=i(o.lang)),o.fields=t(o.fields);break;default:o.value=o.value.toLowerCase()}}n.extensions.sort(e)}return n}Object.defineProperty(n,"__esModule",{value:!0}),n.canonicalizeUnicodeLocaleId=n.canonicalizeUnicodeLanguageId=void 0;var L=D(),s=N(),d=M(),Z=L.__importStar(w()),l=E();n.canonicalizeUnicodeLanguageId=i,n.canonicalizeUnicodeLocaleId=o}}),S=A({"bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/src/types.js":function(n){"use strict";Object.defineProperty(n,"__esModule",{value:!0})}}),T=A({"bazel-out/darwin-fastbuild/bin/packages/intl-getcanonicallocales/index.js":function(n){"use strict";function a(n){if(void 0===n)return[];var a=[];"string"==typeof n&&(n=[n]);for(var t=0,r=n;t<r.length;t++){var o=r[t],L=u.emitUnicodeLocaleId(i.canonicalizeUnicodeLocaleId(e.parseUnicodeLocaleId(o)));a.indexOf(L)<0&&a.push(L)}return a}function t(n){return a(n)}Object.defineProperty(n,"__esModule",{value:!0}),n.isUnicodeLanguageSubtag=n.isUnicodeScriptSubtag=n.isUnicodeRegionSubtag=n.isStructurallyValidLanguageTag=n.parseUnicodeLanguageId=n.parseUnicodeLocaleId=n.getCanonicalLocales=void 0;var r=D(),e=M(),u=E(),i=I();n.getCanonicalLocales=t;var o=M();Object.defineProperty(n,"parseUnicodeLocaleId",{enumerable:!0,get:function(){return o.parseUnicodeLocaleId}}),Object.defineProperty(n,"parseUnicodeLanguageId",{enumerable:!0,get:function(){return o.parseUnicodeLanguageId}}),Object.defineProperty(n,"isStructurallyValidLanguageTag",{enumerable:!0,get:function(){return o.isStructurallyValidLanguageTag}}),Object.defineProperty(n,"isUnicodeRegionSubtag",{enumerable:!0,get:function(){return o.isUnicodeRegionSubtag}}),Object.defineProperty(n,"isUnicodeScriptSubtag",{enumerable:!0,get:function(){return o.isUnicodeScriptSubtag}}),Object.defineProperty(n,"isUnicodeLanguageSubtag",{enumerable:!0,get:function(){return o.isUnicodeLanguageSubtag}}),r.__exportStar(S(),n),r.__exportStar(E(),n)}}),R=C(D());C(D()),C(D());!function(n){n.startRange="startRange",n.shared="shared",n.endRange="endRange"}(g||(g={}));var j=(C(D()),["angle-degree","area-acre","area-hectare","concentr-percent","digital-bit","digital-byte","digital-gigabit","digital-gigabyte","digital-kilobit","digital-kilobyte","digital-megabit","digital-megabyte","digital-petabyte","digital-terabit","digital-terabyte","duration-day","duration-hour","duration-millisecond","duration-minute","duration-month","duration-second","duration-week","duration-year","length-centimeter","length-foot","length-inch","length-kilometer","length-meter","length-mile-scandinavian","length-mile","length-millimeter","length-yard","mass-gram","mass-kilogram","mass-ounce","mass-pound","mass-stone","temperature-celsius","temperature-fahrenheit","volume-fluid-ounce","volume-gallon","volume-liter","volume-milliliter"]),z=(j.map(i),/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEE0-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDD78\uDD7A-\uDDCB\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6\uDF00-\uDF92\uDF94-\uDFCA]/),U=(new RegExp("^"+z.source),new RegExp(z.source+"$"),C(D())),G=(function(n){function a(){var a=null!==n&&n.apply(this,arguments)||this;return a.type="MISSING_LOCALE_DATA",a}(0,U.__extends)(a,n)}(Error),C(T())),F=C(w()),P=new WeakMap,B=F.supplemental.likelySubtags,x=["ca","co","hc","kf","kn","nu"],H=/^[a-z0-9]{3,8}(-[a-z0-9]{3,8})*$/i,K=function(){function n(a,t){if(!(this&&this instanceof n?this.constructor:void 0))throw new TypeError("Intl.Locale must be called with 'new'");var i=n.relevantExtensionKeys,d=["initializedLocale","locale","calendar","collation","hourCycle","numberingSystem"];if(i.indexOf("kf")>-1&&d.push("caseFirst"),i.indexOf("kn")>-1&&d.push("numeric"),void 0===a)throw new TypeError("First argument to Intl.Locale constructor can't be empty or missing");if("string"!=typeof a&&"object"!=typeof a)throw new TypeError("tag must be a string or object");var Z;a="object"==typeof a&&(Z=o(a))&&Z.initializedLocale?Z.locale:a.toString(),Z=o(this);var l=e(t);a=L(a,l);var c=Object.create(null),g=u(l,"calendar","string",void 0,void 0);if(void 0!==g&&!H.test(g))throw new RangeError("invalid calendar");c.ca=g;var b=u(l,"collation","string",void 0,void 0);if(void 0!==b&&!H.test(b))throw new RangeError("invalid collation");c.co=b;var m=u(l,"hourCycle","string",["h11","h12","h23","h24"],void 0);c.hc=m;var h=u(l,"caseFirst","string",["upper","lower","false"],void 0);c.kf=h;var f,k=u(l,"numeric","boolean",void 0,void 0);void 0!==k&&(f=String(k)),c.kn=f;var p=u(l,"numberingSystem","string",void 0,void 0);if(void 0!==p&&!H.test(p))throw new RangeError("Invalid numberingSystem");c.nu=p;var y=s(a,c,i);Z.locale=y.locale,Z.calendar=y.ca,Z.collation=y.co,Z.hourCycle=y.hc,i.indexOf("kf")>-1&&(Z.caseFirst=y.kf),i.indexOf("kn")>-1&&(Z.numeric=r(y.kn,"true")),Z.numberingSystem=y.nu}return n.prototype.maximize=function(){var a=o(this).locale;try{return new n(Z(a))}catch(t){return new n(a)}},n.prototype.minimize=function(){var a=o(this).locale;try{return new n(l(a))}catch(t){return new n(a)}},n.prototype.toString=function(){return o(this).locale},Object.defineProperty(n.prototype,"baseName",{get:function(){var n=o(this).locale;return(0,G.emitUnicodeLanguageId)((0,G.parseUnicodeLanguageId)(n))},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"calendar",{get:function(){return o(this).calendar},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"collation",{get:function(){return o(this).collation},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"hourCycle",{get:function(){return o(this).hourCycle},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"caseFirst",{get:function(){return o(this).caseFirst},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"numeric",{get:function(){return o(this).numeric},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"numberingSystem",{get:function(){return o(this).numberingSystem},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"language",{get:function(){var n=o(this).locale;return(0,G.parseUnicodeLanguageId)(n).lang},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"script",{get:function(){var n=o(this).locale;return(0,G.parseUnicodeLanguageId)(n).script},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"region",{get:function(){var n=o(this).locale;return(0,G.parseUnicodeLanguageId)(n).region},enumerable:!1,configurable:!0}),n.relevantExtensionKeys=x,n}();try{"undefined"!=typeof Symbol&&Object.defineProperty(K.prototype,Symbol.toStringTag,{value:"Intl.Locale",writable:!1,enumerable:!1,configurable:!0}),Object.defineProperty(K.prototype.constructor,"length",{value:1,writable:!1,enumerable:!1,configurable:!0})}catch(_){}(function O(){return"undefined"==typeof Intl||!("Locale"in Intl)||c()})()&&Object.defineProperty(Intl,"Locale",{value:K,writable:!0,enumerable:!1,configurable:!0})}();!function(){function n(n,e){function t(){this.constructor=n}if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");tn(n,e),n.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}function e(n){return Math.floor(Math.log(n)*Math.LOG10E)}function t(n,e){if("function"==typeof n.repeat)return n.repeat(e);for(var t=new Array(e),r=0;r<t.length;r++)t[r]=n;return t.join("")}function r(n,e,t){var r=t.value;Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:!0,value:r})}function u(n,e,t){if(void 0===t&&(t=Error),!n)throw new t(e)}function i(n){return Intl.getCanonicalLocales(n)}function a(n){if("symbol"==typeof n)throw TypeError("Cannot convert a Symbol value to a string");return String(n)}function o(n){if(void 0===n)return NaN;if(null===n)return 0;if("boolean"==typeof n)return n?1:0;if("number"==typeof n)return n;if("symbol"==typeof n||"bigint"==typeof n)throw new TypeError("Cannot convert symbol/bigint to number");return Number(n)}function c(n){if(null==n)throw new TypeError("undefined/null cannot be converted to object");return Object(n)}function l(n,e){return Object.is?Object.is(n,e):n===e?0!==n||1/n==1/e:n!==n&&e!==e}function s(n){return new Array(n)}function f(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function m(n){return"function"==typeof n}function D(n,e,t){if(!m(n))return!1;if(null===t||void 0===t?void 0:t.boundTargetFunction){return e instanceof(null===t||void 0===t?void 0:t.boundTargetFunction)}if("object"!=typeof e)return!1;var r=n.prototype;if("object"!=typeof r)throw new TypeError("OrdinaryHasInstance called on an object with an invalid prototype property.");return Object.prototype.isPrototypeOf.call(r,e)}function g(n){return void 0===n?Object.create(null):c(n)}function p(n,e,t,r,u){if("object"!=typeof n)throw new TypeError("Options must be an object");var i=n[e];if(void 0!==i){if("boolean"!==t&&"string"!==t)throw new TypeError("invalid type");if("boolean"===t&&(i=Boolean(i)),"string"===t&&(i=a(i)),void 0!==r&&!r.filter(function(n){return n==i}).length)throw new RangeError(i+" is not within "+r.join(", "));return i}return u}function d(n,e){for(var t=e;;){if(n.has(t))return t;var r=t.lastIndexOf("-");if(!~r)return;r>=2&&"-"===t[r-2]&&(r-=2),t=t.slice(0,r)}}function h(n,e,t){for(var r={locale:""},u=0,i=e;u<i.length;u++){var a=i[u],o=a.replace(rn,""),c=d(n,o);if(c)return r.locale=c,a!==o&&(r.extension=a.slice(o.length+1,a.length)),r}return r.locale=t(),r}function y(n,e,t){var r={},u=new Set;n.forEach(function(n){var e=new Intl.Locale(n).minimize().toString();r[e]=n,u.add(e)});for(var i,a=0,o=e;a<o.length;a++){var c=o[a];if(i)break;var l=c.replace(rn,"");if(n.has(l)){i=l;break}if(u.has(l)){i=r[l];break}var s=new Intl.Locale(l),f=s.maximize().toString(),m=s.minimize().toString();if(u.has(m)){i=r[m];break}i=d(u,f)}return{locale:i||t()}}function v(n,e){u(2===e.length,"key must have 2 elements");var t=n.length,r="-"+e+"-",i=n.indexOf(r);if(-1!==i){for(var a=i+4,o=a,c=a,l=!1;!l;){var s=n.indexOf("-",c),f=void 0;f=-1===s?t-c:s-c,2===f?l=!0:-1===s?(o=t,l=!0):(o=s,c=s+1)}return n.slice(a,o)}if(r="-"+e,-1!==(i=n.indexOf(r))&&i+3===t)return""}function F(n,e,t,r,i,a){var o,c=t.localeMatcher;o="lookup"===c?h(n,e,a):y(n,e,a);for(var l=o.locale,s={locale:"",dataLocale:l},f="-u",m=0,D=r;m<D.length;m++){var g=D[m];u(l in i,"Missing locale data for "+l);var p=i[l];u("object"==typeof p&&null!==p,"locale data "+g+" must be an object");var d=p[g];u(Array.isArray(d),"keyLocaleData for "+g+" must be an array");var F=d[0];u("string"==typeof F||null===F,"value must be string or null but got "+typeof F+" in key "+g);var b="";if(o.extension){var E=v(o.extension,g);void 0!==E&&(""!==E?~d.indexOf(E)&&(F=E,b="-"+g+"-"+F):~E.indexOf("true")&&(F="true",b="-"+g))}if(g in t){var C=t[g];u("string"==typeof C||void 0===C||null===C,"optionsValue must be String, Undefined or Null"),~d.indexOf(C)&&C!==F&&(F=C,b="")}s[g]=F,f+=b}if(f.length>2){var w=l.indexOf("-x-");if(-1===w)l+=f;else{l=l.slice(0,w)+f+l.slice(w,l.length)}l=Intl.getCanonicalLocales(l)[0]}return s.locale=l,s}function b(n,e,t,r){if(void 0!==n){if(n=Number(n),isNaN(n)||n<e||n>t)throw new RangeError(n+" is outside of range ["+e+", "+t+"]");return Math.floor(n)}return r}function E(n,e,t,r,u){return b(n[e],t,r,u)}function C(n){return n.replace(/([a-z])/g,function(n,e){return e.toUpperCase()})}function w(n){return n=C(n),3===n.length&&!un.test(n)}function S(n){return n.slice(n.indexOf("-")+1)}function A(n){return on.indexOf(n)>-1}function B(n){return n.replace(/([A-Z])/g,function(n,e){return e.toLowerCase()})}function L(n){if(n=B(n),A(n))return!0;var e=n.split("-per-");if(2!==e.length)return!1;var t=e[0],r=e[1];return!(!A(t)||!A(r))}function O(n,e,t){var r=t.getInternalSlots,u=r(n),i=u.notation,a=u.dataLocaleData,o=u.numberingSystem;switch(i){case"standard":return 0;case"scientific":return e;case"engineering":return 3*Math.floor(e/3);default:var c=u.compactDisplay,l=u.style,s=u.currencyDisplay,f=void 0;if("currency"===l&&"name"!==s){f=(a.numbers.currency[o]||a.numbers.currency[a.numbers.nu[0]])["short"]}else{var m=a.numbers.decimal[o]||a.numbers.decimal[a.numbers.nu[0]];f="long"===c?m["long"]:m["short"]}if(!f)return 0;var D=String(Math.pow(10,e)),g=Object.keys(f);if(D<g[0])return 0;if(D>g[g.length-1])return g[g.length-1].length-1;var p=g.indexOf(D);if(-1===p)return 0;var d=g[p];return"0"===f[d].other?0:d.length-f[d].other.match(/0+/)[0].length}}function x(n,r,u){function i(n,e){return e<0?n*Math.pow(10,-e):n/Math.pow(10,e)}var a,o,c,l=u;if(0===n)a=t("0",l),o=0,c=0;else{var s=n.toString(),f=s.indexOf("e"),m=s.split("e"),D=m[0],g=m[1],p=D.replace(".","");if(f>=0&&p.length<=l)o=+g,a=p+t("0",l-p.length),c=n;else{o=e(n);var d=o-l+1,h=Math.round(i(n,d));i(h,l-1)>=10&&(o+=1,h=Math.floor(h/10)),a=h.toString(),c=i(h,l-1-o)}}var y;if(o>=l-1?(a+=t("0",o-l+1),y=o+1):o>=0?(a=a.slice(0,o+1)+"."+a.slice(o+1),y=o+1):(a="0."+t("0",-o-1)+a,y=1),a.indexOf(".")>=0&&u>r){for(var v=u-r;v>0&&"0"===a[a.length-1];)a=a.slice(0,-1),v--;"."===a[a.length-1]&&(a=a.slice(0,-1))}return{formattedString:a,roundedNumber:c,integerDigitsCount:y}}function k(n,e,r){var u,i=r,a=Math.round(n*Math.pow(10,i)),o=a/Math.pow(10,i);if(a<1e21)u=a.toString();else{u=a.toString();var c=u.split("e"),l=c[0],s=c[1];u=l.replace(".",""),u+=t("0",Math.max(+s-u.length+1,0))}var f;if(0!==i){var m=u.length;if(m<=i){u=t("0",i+1-m)+u,m=i+1}var D=u.slice(0,m-i);u=D+"."+u.slice(m-i),f=D.length}else f=u.length;for(var g=r-e;g>0&&"0"===u[u.length-1];)u=u.slice(0,-1),g--;return"."===u[u.length-1]&&(u=u.slice(0,-1)),{formattedString:u,roundedNumber:o,integerDigitsCount:f}}function M(n,e){var r=e<0||l(e,-0);r&&(e=-e);var u;switch(n.roundingType){case"significantDigits":u=x(e,n.minimumSignificantDigits,n.maximumSignificantDigits);break;case"fractionDigits":u=k(e,n.minimumFractionDigits,n.maximumFractionDigits);break;default:u=x(e,1,2),u.integerDigitsCount>1&&(u=k(e,0,0))}e=u.roundedNumber;var i=u.formattedString,a=u.integerDigitsCount,o=n.minimumIntegerDigits;if(a<o){i=t("0",o-a)+i}return r&&(e=-e),{roundedNumber:e,formattedString:i}}function N(n,t,r){var u=r.getInternalSlots;if(0===t)return[0,0];t<0&&(t=-t);var i=e(t),a=O(n,i,{getInternalSlots:u});t=a<0?t*Math.pow(10,-a):t/Math.pow(10,a);var o=M(u(n),t);return 0===o.roundedNumber?[a,i]:e(o.roundedNumber)===i-a?[a,i]:[O(n,i+1,{getInternalSlots:u}),i+1]}function I(n,e){var t=e.currencyDigitsData;return f(t,n)?t[n]:2}function j(n,e,t,r){var u=n.sign,i=n.exponent,a=n.magnitude,o=r.notation,c=r.style,l=r.numberingSystem,s=e.numbers.nu[0],f=null;"compact"===o&&a&&(f=T(n,t,e,c,r.compactDisplay,r.currencyDisplay,l));var m;if("currency"===c&&"name"!==r.currencyDisplay){var D=e.currencies[r.currency];if(D)switch(r.currencyDisplay){case"code":m=r.currency;break;case"symbol":m=D.symbol;break;default:m=D.narrow}else m=r.currency}var g;if(f)g=f;else if("decimal"===c||"unit"===c||"currency"===c&&"name"===r.currencyDisplay){var p=e.numbers.decimal[l]||e.numbers.decimal[s];g=R(p.standard,u)}else if("currency"===c){var d=e.numbers.currency[l]||e.numbers.currency[s];g=R(d[r.currencySign],u)}else{var h=e.numbers.percent[l]||e.numbers.percent[s];g=R(h,u)}var y=we.exec(g)[0];if(g=g.replace(we,"{0}").replace(/'(.)'/g,"$1"),"currency"===c&&"name"!==r.currencyDisplay){var d=e.numbers.currency[l]||e.numbers.currency[s],v=d.currencySpacing.afterInsertBetween;v&&!Ce.test(m)&&(g=g.replace("¤{0}","¤"+v+"{0}"));var F=d.currencySpacing.beforeInsertBetween;F&&!Ee.test(m)&&(g=g.replace("{0}¤","{0}"+F+"¤"))}for(var b=g.split(/({c:[^}]+}|\{0\}|[¤%\-\+])/g),E=[],C=e.numbers.symbols[l]||e.numbers.symbols[s],w=0,S=b;w<S.length;w++){var A=S[w];if(A)switch(A){case"{0}":E.push.apply(E,P(C,n,o,i,l,!f&&r.useGrouping,y));break;case"-":E.push({type:"minusSign",value:C.minusSign});break;case"+":E.push({type:"plusSign",value:C.plusSign});break;case"%":E.push({type:"percentSign",value:C.percentSign});break;case"¤":E.push({type:"currency",value:m});break;default:/^\{c:/.test(A)?E.push({type:"compact",value:A.substring(3,A.length-1)}):E.push({type:"literal",value:A})}}switch(c){case"currency":if("name"===r.currencyDisplay){var B=(e.numbers.currency[l]||e.numbers.currency[s]).unitPattern,L=void 0,O=e.currencies[r.currency];L=O?K(t,n.roundedNumber*Math.pow(10,i),O.displayName):r.currency;for(var x=B.split(/(\{[01]\})/g),k=[],M=0,N=x;M<N.length;M++){var A=N[M];switch(A){case"{0}":k.push.apply(k,E);break;case"{1}":k.push({type:"currency",value:L});break;default:A&&k.push({type:"literal",value:A})}}return k}return E;case"unit":var I=r.unit,j=r.unitDisplay,_=e.units.simple[I],B=void 0;if(_)B=K(t,n.roundedNumber*Math.pow(10,i),e.units.simple[I][j]);else{var U=I.split("-per-"),Y=U[0],G=U[1];_=e.units.simple[Y];var W=K(t,n.roundedNumber*Math.pow(10,i),e.units.simple[Y][j]),Z=e.units.simple[G].perUnit[j];if(Z)B=Z.replace("{0}",W);else{var V=e.units.compound.per[j],X=K(t,1,e.units.simple[G][j]);B=B=V.replace("{0}",W).replace("{1}",X.replace("{0}",""))}}for(var k=[],H=0,z=B.split(/(\s*\{0\}\s*)/);H<z.length;H++){var A=z[H],J=/^(\s*)\{0\}(\s*)$/.exec(A);J?(J[1]&&k.push({type:"literal",value:J[1]}),k.push.apply(k,E),J[2]&&k.push({type:"literal",value:J[2]})):A&&k.push({type:"unit",value:A})}return k;default:return E}}function P(n,e,t,r,u,i,a){var o=[],c=e.formattedString,l=e.roundedNumber;if(isNaN(l))return[{type:"nan",value:c}];if(!isFinite(l))return[{type:"infinity",value:c}];var s=cn[u];s&&(c=c.replace(/\d/g,function(n){return s[+n]||n}));var f,m,D=c.indexOf(".");if(D>0?(f=c.slice(0,D),m=c.slice(D+1)):f=c,i&&("compact"!==t||l>=1e4)){var g=n.group,p=[],d=a.split(".")[0],h=d.split(","),y=3,v=3;h.length>1&&(y=h[h.length-1].length),h.length>2&&(v=h[h.length-2].length);var F=f.length-y;if(F>0){for(p.push(f.slice(F,F+y)),F-=v;F>0;F-=v)p.push(f.slice(F,F+v));p.push(f.slice(0,F+v))}else p.push(f);for(;p.length>0;){var b=p.pop();o.push({type:"integer",value:b}),p.length>0&&o.push({type:"group",value:g})}}else o.push({type:"integer",value:f});if(void 0!==m&&o.push({type:"decimal",value:n.decimal},{type:"fraction",value:m}),("scientific"===t||"engineering"===t)&&isFinite(l)){o.push({type:"exponentSeparator",value:n.exponential}),r<0&&(o.push({type:"exponentMinusSign",value:n.minusSign}),r=-r);var E=k(r,0,0);o.push({type:"exponentInteger",value:E.formattedString})}return o}function R(n,e){n.indexOf(";")<0&&(n=n+";-"+n);var t=n.split(";"),r=t[0],u=t[1];switch(e){case 0:return r;case-1:return u;default:return u.indexOf("-")>=0?u.replace(/-/g,"+"):"+"+r}}function T(n,e,t,r,u,i,a){var o,c,l=n.roundedNumber,s=n.sign,f=n.magnitude,m=String(Math.pow(10,f)),D=t.numbers.nu[0];if("currency"===r&&"name"!==i){var g=t.numbers.currency,p=g[a]||g[D],d=null===(o=p["short"])||void 0===o?void 0:o[m];if(!d)return null;c=K(e,l,d)}else{var g=t.numbers.decimal,h=g[a]||g[D],y=h[u][m];if(!y)return null;c=K(e,l,y)}return"0"===c?null:c=R(c,s).replace(/([^\s;\-\+\d¤]+)/g,"{c:$1}").replace(/0+/,"0")}function K(n,e,t){return t[n.select(e)]||t.other}function _(n,e,t){var r,u,i=t.getInternalSlots,a=i(n),o=a.pl,c=a.dataLocaleData,s=a.numberingSystem,f=c.numbers.symbols[s]||c.numbers.symbols[c.numbers.nu[0]],m=0,D=0;if(isNaN(e))u=f.nan;else if(isFinite(e)){"percent"===a.style&&(e*=100),r=N(n,e,{getInternalSlots:i}),D=r[0],m=r[1],e=D<0?e*Math.pow(10,-D):e/Math.pow(10,D);var g=M(a,e);u=g.formattedString,e=g.roundedNumber}else u=f.infinity;var p;switch(a.signDisplay){case"never":p=0;break;case"auto":p=l(e,0)||e>0||isNaN(e)?0:-1;break;case"always":p=l(e,0)||e>0||isNaN(e)?1:-1;break;default:p=0===e||isNaN(e)?0:e>0?1:-1}return j({roundedNumber:e,formattedString:u,exponent:D,magnitude:m,sign:p},a.dataLocaleData,o,a)}function U(n,e,t){for(var r=_(n,e,t),u=s(0),i=0,a=r;i<a.length;i++){var o=a[i];u.push({type:o.type,value:o.value})}return u}function Y(n,e,t){void 0===e&&(e=Object.create(null));var r=t.getInternalSlots,u=r(n),i=p(e,"style","string",["decimal","percent","currency","unit"],"decimal");u.style=i;var a=p(e,"currency","string",void 0,void 0);if(void 0!==a&&!w(a))throw RangeError("Malformed currency code");if("currency"===i&&void 0===a)throw TypeError("currency cannot be undefined");var o=p(e,"currencyDisplay","string",["code","symbol","narrowSymbol","name"],"symbol"),c=p(e,"currencySign","string",["standard","accounting"],"standard"),l=p(e,"unit","string",void 0,void 0);if(void 0!==l&&!L(l))throw RangeError("Invalid unit argument for Intl.NumberFormat()");if("unit"===i&&void 0===l)throw TypeError("unit cannot be undefined");var s=p(e,"unitDisplay","string",["short","narrow","long"],"short");"currency"===i&&(u.currency=a.toUpperCase(),u.currencyDisplay=o,u.currencySign=c),"unit"===i&&(u.unit=l,u.unitDisplay=s)}function G(n,e,t,r,u){var i=E(e,"minimumIntegerDigits",1,21,1),a=e.minimumFractionDigits,o=e.maximumFractionDigits,c=e.minimumSignificantDigits,l=e.maximumSignificantDigits;if(n.minimumIntegerDigits=i,void 0!==c||void 0!==l)n.roundingType="significantDigits",c=b(c,1,21,1),l=b(l,c,21,21),n.minimumSignificantDigits=c,n.maximumSignificantDigits=l;else if(void 0!==a||void 0!==o){n.roundingType="fractionDigits",a=b(a,0,20,t);var s=Math.max(a,r);o=b(o,a,20,s),n.minimumFractionDigits=a,n.maximumFractionDigits=o}else"compact"===u?n.roundingType="compactRounding":(n.roundingType="fractionDigits",n.minimumFractionDigits=t,n.maximumFractionDigits=r)}function W(n,e,t,r){var a=r.getInternalSlots,o=r.localeData,c=r.availableLocales,l=r.numberingSystemNames,s=r.getDefaultLocale,f=r.currencyDigitsData,m=i(e),D=g(t),d=Object.create(null),h=p(D,"localeMatcher","string",["lookup","best fit"],"best fit");d.localeMatcher=h;var y=p(D,"numberingSystem","string",void 0,void 0);if(void 0!==y&&l.indexOf(y)<0)throw RangeError("Invalid numberingSystems: "+y);d.nu=y;var v=F(c,m,d,["nu"],o,s),b=o[v.dataLocale];u(!!b,"Missing locale data for "+v.dataLocale);var E=a(n);E.locale=v.locale,E.dataLocale=v.dataLocale,E.numberingSystem=v.nu,E.dataLocaleData=b,Y(n,D,{getInternalSlots:a});var C,w,S=E.style;if("currency"===S){var A=E.currency,B=I(A,{currencyDigitsData:f});C=B,w=B}else C=0,w="percent"===S?0:3;var L=p(D,"notation","string",["standard","scientific","engineering","compact"],"standard");E.notation=L,G(E,D,C,w,L);var O=p(D,"compactDisplay","string",["short","long"],"short");"compact"===L&&(E.compactDisplay=O);var x=p(D,"useGrouping","boolean",void 0,!0);E.useGrouping=x;var k=p(D,"signDisplay","string",["auto","never","always","exceptZero"],"auto");return E.signDisplay=k,n}function Z(n,e){for(var t=[],r=0,u=e;r<u.length;r++){var i=u[r],a=i.replace(rn,""),o=d(n,a);o&&t.push(o)}return t}function V(n,e,t){return void 0!==t&&(t=c(t),p(t,"localeMatcher","string",["lookup","best fit"],"best fit")),Z(n,e)}function X(n){var e=Vt.get(n);return e||(e=Object.create(null),Vt.set(n,e)),e}function H(n){return U(this,z(n),{getInternalSlots:X})}function z(n){return"bigint"==typeof n?n:o(n)}function J(n,e,t){return new zt(e,t).format(n)}function $(){return!Intl.NumberFormat.polyfilled&&!Intl.NumberFormat.supportedLocalesOf(["es"]).length}function Q(){try{if("1E4 bits"!==new Intl.NumberFormat("en",{style:"unit",unit:"bit",unitDisplay:"long",notation:"scientific"}).format(1e4))return!1}catch(n){return!1}return!0}var q,nn=Object.defineProperty,en=function(n,e){for(var t in e)nn(n,t,{get:e[t],enumerable:!0})},tn=function(n,e){return(tn=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])})(n,e)},rn=/-u(?:-[0-9a-z]{2,8})+/gi;!function(n){n.startRange="startRange",n.shared="shared",n.endRange="endRange"}(q||(q={}));var un=/[^A-Z]/,an=["angle-degree","area-acre","area-hectare","concentr-percent","digital-bit","digital-byte","digital-gigabit","digital-gigabyte","digital-kilobit","digital-kilobyte","digital-megabit","digital-megabyte","digital-petabyte","digital-terabit","digital-terabyte","duration-day","duration-hour","duration-millisecond","duration-minute","duration-month","duration-second","duration-week","duration-year","length-centimeter","length-foot","length-inch","length-kilometer","length-meter","length-mile-scandinavian","length-mile","length-millimeter","length-yard","mass-gram","mass-kilogram","mass-ounce","mass-pound","mass-stone","temperature-celsius","temperature-fahrenheit","volume-fluid-ounce","volume-gallon","volume-liter","volume-milliliter"],on=an.map(S),cn={};en(cn,{adlm:function(){return ln},ahom:function(){return sn},arab:function(){return fn},arabext:function(){return mn},bali:function(){return Dn},beng:function(){return gn},bhks:function(){return pn},brah:function(){return dn},cakm:function(){return hn},cham:function(){return yn},"default":function(){return Fe},deva:function(){return vn},diak:function(){return Fn},fullwide:function(){return bn},gong:function(){return En},gonm:function(){return Cn},gujr:function(){return wn},guru:function(){return Sn},hanidec:function(){return An},hmng:function(){return Bn},hmnp:function(){return Ln},java:function(){return On},kali:function(){return xn},khmr:function(){return kn},knda:function(){return Mn},lana:function(){return Nn},lanatham:function(){return In},laoo:function(){return jn},lepc:function(){return Pn},limb:function(){return Rn},mathbold:function(){return Tn},mathdbl:function(){return Kn},mathmono:function(){return _n},mathsanb:function(){return Un},mathsans:function(){return Yn},mlym:function(){return Gn},modi:function(){return Wn},mong:function(){return Zn},mroo:function(){return Vn},mtei:function(){return Xn},mymr:function(){return Hn},mymrshan:function(){return zn},mymrtlng:function(){return Jn},newa:function(){return $n},nkoo:function(){return Qn},olck:function(){return qn},orya:function(){return ne},osma:function(){return ee},rohg:function(){return te},saur:function(){return re},segment:function(){return ue},shrd:function(){return ie},sind:function(){return ae},sinh:function(){return oe},sora:function(){return ce},sund:function(){return le},takr:function(){return se},talu:function(){return fe},tamldec:function(){return me},telu:function(){return De},thai:function(){return ge},tibt:function(){return pe},tirh:function(){return de},vaii:function(){return he},wara:function(){return ye},wcho:function(){return ve}});var ln=["𞥐","𞥑","𞥒","𞥓","𞥔","𞥕","𞥖","𞥗","𞥘","𞥙"],sn=["𑜰","𑜱","𑜲","𑜳","𑜴","𑜵","𑜶","𑜷","𑜸","𑜹"],fn=["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"],mn=["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"],Dn=["᭐","᭑","᭒","᭓","᭔","᭕","᭖","᭗","᭘","᭙"],gn=["০","১","২","৩","৪","৫","৬","৭","৮","৯"],pn=["𑱐","𑱑","𑱒","𑱓","𑱔","𑱕","𑱖","𑱗","𑱘","𑱙"],dn=["𑁦","𑁧","𑁨","𑁩","𑁪","𑁫","𑁬","𑁭","𑁮","𑁯"],hn=["𑄶","𑄷","𑄸","𑄹","𑄺","𑄻","𑄼","𑄽","𑄾","𑄿"],yn=["꩐","꩑","꩒","꩓","꩔","꩕","꩖","꩗","꩘","꩙"],vn=["०","१","२","३","४","५","६","७","८","९"],Fn=["𑥐","𑥑","𑥒","𑥓","𑥔","𑥕","𑥖","𑥗","𑥘","𑥙"],bn=["０","１","２","３","４","５","６","７","８","９"],En=["𑶠","𑶡","𑶢","𑶣","𑶤","𑶥","𑶦","𑶧","𑶨","𑶩"],Cn=["𑵐","𑵑","𑵒","𑵓","𑵔","𑵕","𑵖","𑵗","𑵘","𑵙"],wn=["૦","૧","૨","૩","૪","૫","૬","૭","૮","૯"],Sn=["੦","੧","੨","੩","੪","੫","੬","੭","੮","੯"],An=["〇","一","二","三","四","五","六","七","八","九"],Bn=["𖭐","𖭑","𖭒","𖭓","𖭔","𖭕","𖭖","𖭗","𖭘","𖭙"],Ln=["𞅀","𞅁","𞅂","𞅃","𞅄","𞅅","𞅆","𞅇","𞅈","𞅉"],On=["꧐","꧑","꧒","꧓","꧔","꧕","꧖","꧗","꧘","꧙"],xn=["꤀","꤁","꤂","꤃","꤄","꤅","꤆","꤇","꤈","꤉"],kn=["០","១","២","៣","៤","៥","៦","៧","៨","៩"],Mn=["೦","೧","೨","೩","೪","೫","೬","೭","೮","೯"],Nn=["᪀","᪁","᪂","᪃","᪄","᪅","᪆","᪇","᪈","᪉"],In=["᪐","᪑","᪒","᪓","᪔","᪕","᪖","᪗","᪘","᪙"],jn=["໐","໑","໒","໓","໔","໕","໖","໗","໘","໙"],Pn=["᪐","᪑","᪒","᪓","᪔","᪕","᪖","᪗","᪘","᪙"],Rn=["᥆","᥇","᥈","᥉","᥊","᥋","᥌","᥍","᥎","᥏"],Tn=["𝟎","𝟏","𝟐","𝟑","𝟒","𝟓","𝟔","𝟕","𝟖","𝟗"],Kn=["𝟘","𝟙","𝟚","𝟛","𝟜","𝟝","𝟞","𝟟","𝟠","𝟡"],_n=["𝟶","𝟷","𝟸","𝟹","𝟺","𝟻","𝟼","𝟽","𝟾","𝟿"],Un=["𝟬","𝟭","𝟮","𝟯","𝟰","𝟱","𝟲","𝟳","𝟴","𝟵"],Yn=["𝟢","𝟣","𝟤","𝟥","𝟦","𝟧","𝟨","𝟩","𝟪","𝟫"],Gn=["൦","൧","൨","൩","൪","൫","൬","൭","൮","൯"],Wn=["𑙐","𑙑","𑙒","𑙓","𑙔","𑙕","𑙖","𑙗","𑙘","𑙙"],Zn=["᠐","᠑","᠒","᠓","᠔","᠕","᠖","᠗","᠘","᠙"],Vn=["𖩠","𖩡","𖩢","𖩣","𖩤","𖩥","𖩦","𖩧","𖩨","𖩩"],Xn=["꯰","꯱","꯲","꯳","꯴","꯵","꯶","꯷","꯸","꯹"],Hn=["၀","၁","၂","၃","၄","၅","၆","၇","၈","၉"],zn=["႐","႑","႒","႓","႔","႕","႖","႗","႘","႙"],Jn=["꧰","꧱","꧲","꧳","꧴","꧵","꧶","꧷","꧸","꧹"],$n=["𑑐","𑑑","𑑒","𑑓","𑑔","𑑕","𑑖","𑑗","𑑘","𑑙"],Qn=["߀","߁","߂","߃","߄","߅","߆","߇","߈","߉"],qn=["᱐","᱑","᱒","᱓","᱔","᱕","᱖","᱗","᱘","᱙"],ne=["୦","୧","୨","୩","୪","୫","୬","୭","୮","୯"],ee=["𐒠","𐒡","𐒢","𐒣","𐒤","𐒥","𐒦","𐒧","𐒨","𐒩"],te=["𐴰","𐴱","𐴲","𐴳","𐴴","𐴵","𐴶","𐴷","𐴸","𐴹"],re=["꣐","꣑","꣒","꣓","꣔","꣕","꣖","꣗","꣘","꣙"],ue=["🯰","🯱","🯲","🯳","🯴","🯵","🯶","🯷","🯸","🯹"],ie=["𑇐","𑇑","𑇒","𑇓","𑇔","𑇕","𑇖","𑇗","𑇘","𑇙"],ae=["𑋰","𑋱","𑋲","𑋳","𑋴","𑋵","𑋶","𑋷","𑋸","𑋹"],oe=["෦","෧","෨","෩","෪","෫","෬","෭","෮","෯"],ce=["𑃰","𑃱","𑃲","𑃳","𑃴","𑃵","𑃶","𑃷","𑃸","𑃹"],le=["᮰","᮱","᮲","᮳","᮴","᮵","᮶","᮷","᮸","᮹"],se=["𑛀","𑛁","𑛂","𑛃","𑛄","𑛅","𑛆","𑛇","𑛈","𑛉"],fe=["᧐","᧑","᧒","᧓","᧔","᧕","᧖","᧗","᧘","᧙"],me=["௦","௧","௨","௩","௪","௫","௬","௭","௮","௯"],De=["౦","౧","౨","౩","౪","౫","౬","౭","౮","౯"],ge=["๐","๑","๒","๓","๔","๕","๖","๗","๘","๙"],pe=["༠","༡","༢","༣","༤","༥","༦","༧","༨","༩"],de=["𑓐","𑓑","𑓒","𑓓","𑓔","𑓕","𑓖","𑓗","𑓘","𑓙"],he=["ᘠ","ᘡ","ᘢ","ᘣ","ᘤ","ᘥ","ᘦ","ᘧ","ᘨ","ᘩ"],ye=["𑣠","𑣡","𑣢","𑣣","𑣤","𑣥","𑣦","𑣧","𑣨","𑣩"],ve=["𞋰","𞋱","𞋲","𞋳","𞋴","𞋵","𞋶","𞋷","𞋸","𞋹"],Fe={adlm:ln,ahom:sn,arab:fn,arabext:mn,bali:Dn,beng:gn,bhks:pn,brah:dn,cakm:hn,cham:yn,deva:vn,diak:Fn,fullwide:bn,gong:En,gonm:Cn,gujr:wn,guru:Sn,hanidec:An,hmng:Bn,hmnp:Ln,java:On,kali:xn,khmr:kn,knda:Mn,lana:Nn,lanatham:In,laoo:jn,lepc:Pn,limb:Rn,mathbold:Tn,mathdbl:Kn,mathmono:_n,mathsanb:Un,mathsans:Yn,mlym:Gn,modi:Wn,mong:Zn,mroo:Vn,mtei:Xn,mymr:Hn,mymrshan:zn,mymrtlng:Jn,newa:$n,nkoo:Qn,olck:qn,orya:ne,osma:ee,rohg:te,saur:re,segment:ue,shrd:ie,sind:ae,sinh:oe,sora:ce,sund:le,takr:se,talu:fe,tamldec:me,telu:De,thai:ge,tibt:pe,tirh:de,vaii:he,wara:ye,wcho:ve},be=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEE0-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDD78\uDD7A-\uDDCB\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6\uDF00-\uDF92\uDF94-\uDFCA]/,Ee=new RegExp("^"+be.source),Ce=new RegExp(be.source+"$"),we=/[#0](?:[\.,][#0]+)*/g,Se=(function(e){function t(){var n=null!==e&&e.apply(this,arguments)||this;return n.type="MISSING_LOCALE_DATA",n}n(t,e)}(Error),{});en(Se,{ADP:function(){return Ae},AFN:function(){return Be},ALL:function(){return Le},AMD:function(){return Oe},BHD:function(){return xe},BIF:function(){return ke},BYN:function(){return Me},BYR:function(){return Ne},CAD:function(){return Ie},CHF:function(){return je},CLF:function(){return Pe},CLP:function(){return Re},COP:function(){return Te},CRC:function(){return Ke},CZK:function(){return _e},DEFAULT:function(){return Ue},DJF:function(){return Ye},DKK:function(){return Ge},ESP:function(){return We},GNF:function(){return Ze},GYD:function(){return Ve},HUF:function(){return Xe},IDR:function(){return He},IQD:function(){return ze},IRR:function(){return Je},ISK:function(){return $e},ITL:function(){return Qe},JOD:function(){return qe},JPY:function(){return nt},KMF:function(){return et},KPW:function(){return tt},KRW:function(){return rt},KWD:function(){return ut},LAK:function(){return it},LBP:function(){return at},LUF:function(){return ot},LYD:function(){return ct},MGA:function(){return lt},MGF:function(){return st},MMK:function(){return ft},MNT:function(){return mt},MRO:function(){return Dt},MUR:function(){return gt},NOK:function(){return pt},OMR:function(){return dt},PKR:function(){return ht},PYG:function(){return yt},RSD:function(){return vt},RWF:function(){return Ft},SEK:function(){return bt},SLL:function(){return Et},SOS:function(){return Ct},STD:function(){return wt},SYP:function(){return St},TMM:function(){return At},TND:function(){return Bt},TRL:function(){return Lt},TWD:function(){return Ot},TZS:function(){return xt},UGX:function(){return kt},UYI:function(){return Mt},UYW:function(){return Nt},UZS:function(){return It},VEF:function(){return jt},VND:function(){return Pt},VUV:function(){return Rt},XAF:function(){return Tt},XOF:function(){return Kt},XPF:function(){return _t},YER:function(){return Ut},ZMK:function(){return Yt},ZWD:function(){return Gt},"default":function(){return Wt}});var Ae=0,Be=0,Le=0,Oe=2,xe=3,ke=0,Me=2,Ne=0,Ie=2,je=2,Pe=4,Re=0,Te=2,Ke=2,_e=2,Ue=2,Ye=0,Ge=2,We=0,Ze=0,Ve=2,Xe=2,He=2,ze=0,Je=0,$e=0,Qe=0,qe=3,nt=0,et=0,tt=0,rt=0,ut=3,it=0,at=0,ot=0,ct=3,lt=0,st=0,ft=0,mt=2,Dt=0,gt=2,pt=2,dt=3,ht=2,yt=0,vt=0,Ft=0,bt=2,Et=0,Ct=0,wt=0,St=0,At=0,Bt=3,Lt=0,Ot=2,xt=2,kt=0,Mt=0,Nt=4,It=2,jt=2,Pt=0,Rt=0,Tt=0,Kt=0,_t=0,Ut=0,Yt=0,Gt=0,Wt={ADP:Ae,AFN:Be,ALL:Le,AMD:Oe,BHD:xe,BIF:ke,BYN:Me,BYR:Ne,CAD:Ie,CHF:je,CLF:Pe,CLP:Re,COP:Te,CRC:Ke,CZK:_e,DEFAULT:Ue,DJF:Ye,DKK:Ge,ESP:We,GNF:Ze,GYD:Ve,HUF:Xe,IDR:He,IQD:ze,IRR:Je,ISK:$e,ITL:Qe,JOD:qe,JPY:nt,KMF:et,KPW:tt,KRW:rt,KWD:ut,LAK:it,LBP:at,LUF:ot,LYD:ct,MGA:lt,MGF:st,MMK:ft,MNT:mt,MRO:Dt,MUR:gt,NOK:pt,OMR:dt,PKR:ht,PYG:yt,RSD:vt,RWF:Ft,SEK:bt,SLL:Et,SOS:Ct,STD:wt,SYP:St,TMM:At,TND:Bt,TRL:Lt,TWD:Ot,TZS:xt,UGX:kt,UYI:Mt,UYW:Nt,UZS:It,VEF:jt,VND:Pt,VUV:Rt,XAF:Tt,XOF:Kt,XPF:_t,YER:Ut,ZMK:Yt,ZWD:Gt},Zt=["adlm","ahom","arab","arabext","armn","armnlow","bali","beng","bhks","brah","cakm","cham","cyrl","deva","diak","ethi","fullwide","geor","gong","gonm","grek","greklow","gujr","guru","hanidays","hanidec","hans","hansfin","hant","hantfin","hebr","hmng","hmnp","java","jpan","jpanfin","jpanyear","kali","khmr","knda","lana","lanatham","laoo","latn","lepc","limb","mathbold","mathdbl","mathmono","mathsanb","mathsans","mlym","modi","mong","mroo","mtei","mymr","mymrshan","mymrtlng","newa","nkoo","olck","orya","osma","rohg","roman","romanlow","saur","segment","shrd","sind","sinh","sora","sund","takr","talu","taml","tamldec","telu","thai","tibt","tirh","vaii","wara","wcho"],Vt=new WeakMap,Xt=Zt,Ht=["locale","numberingSystem","style","currency","currencyDisplay","currencySign","unit","unitDisplay","minimumIntegerDigits","minimumFractionDigits","maximumFractionDigits","minimumSignificantDigits","maximumSignificantDigits","useGrouping","notation","compactDisplay","signDisplay"],zt=function(n,e){if(!this||!D(zt,this))return new zt(n,e);W(this,n,e,{getInternalSlots:X,localeData:zt.localeData,availableLocales:zt.availableLocales,getDefaultLocale:zt.getDefaultLocale,currencyDigitsData:Se,numberingSystemNames:Xt});var t=X(this),r=t.dataLocale;return u(void 0!==zt.localeData[r],"Cannot load locale-dependent data for "+r+"."),t.pl=new Intl.PluralRules(r,{minimumFractionDigits:t.minimumFractionDigits,maximumFractionDigits:t.maximumFractionDigits,minimumIntegerDigits:t.minimumIntegerDigits,minimumSignificantDigits:t.minimumSignificantDigits,maximumSignificantDigits:t.maximumSignificantDigits}),this};try{Object.defineProperty(H,"name",{value:"formatToParts",enumerable:!1,writable:!1,configurable:!0})}catch(Qt){}r(zt.prototype,"formatToParts",{value:H}),r(zt.prototype,"resolvedOptions",{value:function qt(){if("object"!=typeof this||!D(zt,this))throw TypeError("Method Intl.NumberFormat.prototype.resolvedOptions called on incompatible receiver");for(var n=X(this),e={},t=0,r=Ht;t<r.length;t++){var u=r[t],i=n[u];void 0!==i&&(e[u]=i)}return e}});var Jt={enumerable:!1,configurable:!0,get:function(){if("object"!=typeof this||!D(zt,this))throw TypeError("Intl.NumberFormat format property accessor called on incompatible receiver");var n=X(this),e=this,t=n.boundFormat;if(void 0===t){t=function(n){var t=z(n);return e.formatToParts(t).map(function(n){return n.value}).join("")};try{Object.defineProperty(t,"name",{configurable:!0,enumerable:!1,writable:!1,value:""})}catch(Qt){}n.boundFormat=t}return t}};try{Object.defineProperty(Jt.get,"name",{configurable:!0,enumerable:!1,writable:!1,value:"get format"})}catch(Qt){}Object.defineProperty(zt.prototype,"format",Jt),r(zt,"supportedLocalesOf",{value:function nr(n,e){return V(zt.availableLocales,i(n),e)}}),zt.__addLocaleData=function er(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];for(var t=0,r=n;t<r.length;t++){var u=r[t],i=u.data,a=u.locale,o=new Intl.Locale(a).minimize().toString();zt.localeData[a]=zt.localeData[o]=i,zt.availableLocales.add(o),zt.availableLocales.add(a),zt.__defaultLocale||(zt.__defaultLocale=o)}},zt.__addUnitData=function tr(n,e){var t=zt.localeData,r=n,u=t[r];if(!u)throw new Error('Locale data for "'+n+'" has not been loaded in NumberFormat. \nPlease __addLocaleData before adding additional unit data');for(var i in e.simple)u.units.simple[i]=e.simple[i];for(var i in e.compound)u.units.compound[i]=e.compound[i]},zt.__defaultLocale="",zt.localeData={},
zt.availableLocales=new Set,zt.getDefaultLocale=function(){return zt.__defaultLocale},zt.polyfilled=!0;try{"undefined"!=typeof Symbol&&Object.defineProperty(zt.prototype,Symbol.toStringTag,{configurable:!0,enumerable:!1,writable:!1,value:"Intl.NumberFormat"}),Object.defineProperty(zt.prototype.constructor,"length",{configurable:!0,enumerable:!1,writable:!1,value:0}),Object.defineProperty(zt.supportedLocalesOf,"length",{configurable:!0,enumerable:!1,writable:!1,value:1}),Object.defineProperty(zt,"prototype",{configurable:!1,enumerable:!1,writable:!1,value:zt.prototype})}catch(Qt){}(function $t(){return"undefined"==typeof Intl||!("NumberFormat"in Intl)||!Q()||$()})()&&(r(Intl,"NumberFormat",{value:zt}),r(Number.prototype,"toLocaleString",{value:function rr(n,e){return J(this,n,e)}}))}();Intl.NumberFormat&&"function"==typeof Intl.NumberFormat.__addLocaleData&&Intl.NumberFormat.__addLocaleData({data:{units:{simple:{degree:{"long":{other:"{0} degrees",one:"{0} degree"},"short":{other:"{0} deg"},narrow:{other:"{0}°"},perUnit:{}},hectare:{"long":{other:"{0} hectares",one:"{0} hectare"},"short":{other:"{0} ha"},narrow:{other:"{0}ha"},perUnit:{}},acre:{"long":{other:"{0} acres",one:"{0} acre"},"short":{other:"{0} ac"},narrow:{other:"{0}ac"},perUnit:{}},percent:{"long":{other:"{0} percent"},"short":{other:"{0}%"},narrow:{other:"{0}%"},perUnit:{}},"liter-per-kilometer":{"long":{other:"{0} liters per kilometer",one:"{0} liter per kilometer"},"short":{other:"{0} L/km"},narrow:{other:"{0}L/km"},perUnit:{}},"mile-per-gallon":{"long":{other:"{0} miles per gallon",one:"{0} mile per gallon"},"short":{other:"{0} mpg"},narrow:{other:"{0}mpg"},perUnit:{}},petabyte:{"long":{other:"{0} petabytes",one:"{0} petabyte"},"short":{other:"{0} PB"},narrow:{other:"{0}PB"},perUnit:{}},terabyte:{"long":{other:"{0} terabytes",one:"{0} terabyte"},"short":{other:"{0} TB"},narrow:{other:"{0}TB"},perUnit:{}},terabit:{"long":{other:"{0} terabits",one:"{0} terabit"},"short":{other:"{0} Tb"},narrow:{other:"{0}Tb"},perUnit:{}},gigabyte:{"long":{other:"{0} gigabytes",one:"{0} gigabyte"},"short":{other:"{0} GB"},narrow:{other:"{0}GB"},perUnit:{}},gigabit:{"long":{other:"{0} gigabits",one:"{0} gigabit"},"short":{other:"{0} Gb"},narrow:{other:"{0}Gb"},perUnit:{}},megabyte:{"long":{other:"{0} megabytes",one:"{0} megabyte"},"short":{other:"{0} MB"},narrow:{other:"{0}MB"},perUnit:{}},megabit:{"long":{other:"{0} megabits",one:"{0} megabit"},"short":{other:"{0} Mb"},narrow:{other:"{0}Mb"},perUnit:{}},kilobyte:{"long":{other:"{0} kilobytes",one:"{0} kilobyte"},"short":{other:"{0} kB"},narrow:{other:"{0}kB"},perUnit:{}},kilobit:{"long":{other:"{0} kilobits",one:"{0} kilobit"},"short":{other:"{0} kb"},narrow:{other:"{0}kb"},perUnit:{}},"byte":{"long":{other:"{0} bytes",one:"{0} byte"},"short":{other:"{0} byte"},narrow:{other:"{0}B"},perUnit:{}},bit:{"long":{other:"{0} bits",one:"{0} bit"},"short":{other:"{0} bit"},narrow:{other:"{0}bit"},perUnit:{}},year:{"long":{other:"{0} years",one:"{0} year"},"short":{other:"{0} yrs",one:"{0} yr"},narrow:{other:"{0}y"},perUnit:{"long":"{0} per year","short":"{0}/y",narrow:"{0}/y"}},month:{"long":{other:"{0} months",one:"{0} month"},"short":{other:"{0} mths",one:"{0} mth"},narrow:{other:"{0}m"},perUnit:{"long":"{0} per month","short":"{0}/m",narrow:"{0}/m"}},week:{"long":{other:"{0} weeks",one:"{0} week"},"short":{other:"{0} wks",one:"{0} wk"},narrow:{other:"{0}w"},perUnit:{"long":"{0} per week","short":"{0}/w",narrow:"{0}/w"}},day:{"long":{other:"{0} days",one:"{0} day"},"short":{other:"{0} days",one:"{0} day"},narrow:{other:"{0}d"},perUnit:{"long":"{0} per day","short":"{0}/d",narrow:"{0}/d"}},hour:{"long":{other:"{0} hours",one:"{0} hour"},"short":{other:"{0} hr"},narrow:{other:"{0}h"},perUnit:{"long":"{0} per hour","short":"{0}/h",narrow:"{0}/h"}},minute:{"long":{other:"{0} minutes",one:"{0} minute"},"short":{other:"{0} min"},narrow:{other:"{0}m"},perUnit:{"long":"{0} per minute","short":"{0}/min",narrow:"{0}/min"}},second:{"long":{other:"{0} seconds",one:"{0} second"},"short":{other:"{0} sec"},narrow:{other:"{0}s"},perUnit:{"long":"{0} per second","short":"{0}/s",narrow:"{0}/s"}},millisecond:{"long":{other:"{0} milliseconds",one:"{0} millisecond"},"short":{other:"{0} ms"},narrow:{other:"{0}ms"},perUnit:{}},kilometer:{"long":{other:"{0} kilometers",one:"{0} kilometer"},"short":{other:"{0} km"},narrow:{other:"{0}km"},perUnit:{"long":"{0} per kilometer","short":"{0}/km",narrow:"{0}/km"}},meter:{"long":{other:"{0} meters",one:"{0} meter"},"short":{other:"{0} m"},narrow:{other:"{0}m"},perUnit:{"long":"{0} per meter","short":"{0}/m",narrow:"{0}/m"}},centimeter:{"long":{other:"{0} centimeters",one:"{0} centimeter"},"short":{other:"{0} cm"},narrow:{other:"{0}cm"},perUnit:{"long":"{0} per centimeter","short":"{0}/cm",narrow:"{0}/cm"}},millimeter:{"long":{other:"{0} millimeters",one:"{0} millimeter"},"short":{other:"{0} mm"},narrow:{other:"{0}mm"},perUnit:{}},mile:{"long":{other:"{0} miles",one:"{0} mile"},"short":{other:"{0} mi"},narrow:{other:"{0}mi"},perUnit:{}},yard:{"long":{other:"{0} yards",one:"{0} yard"},"short":{other:"{0} yd"},narrow:{other:"{0}yd"},perUnit:{}},foot:{"long":{other:"{0} feet",one:"{0} foot"},"short":{other:"{0} ft"},narrow:{other:"{0}′"},perUnit:{"long":"{0} per foot","short":"{0}/ft",narrow:"{0}/ft"}},inch:{"long":{other:"{0} inches",one:"{0} inch"},"short":{other:"{0} in"},narrow:{other:"{0}″"},perUnit:{"long":"{0} per inch","short":"{0}/in",narrow:"{0}/in"}},"mile-scandinavian":{"long":{other:"{0} miles-scandinavian",one:"{0} mile-scandinavian"},"short":{other:"{0} smi"},narrow:{other:"{0}smi"},perUnit:{}},kilogram:{"long":{other:"{0} kilograms",one:"{0} kilogram"},"short":{other:"{0} kg"},narrow:{other:"{0}kg"},perUnit:{"long":"{0} per kilogram","short":"{0}/kg",narrow:"{0}/kg"}},gram:{"long":{other:"{0} grams",one:"{0} gram"},"short":{other:"{0} g"},narrow:{other:"{0}g"},perUnit:{"long":"{0} per gram","short":"{0}/g",narrow:"{0}/g"}},stone:{"long":{other:"{0} stones",one:"{0} stone"},"short":{other:"{0} st"},narrow:{other:"{0}st"},perUnit:{}},pound:{"long":{other:"{0} pounds",one:"{0} pound"},"short":{other:"{0} lb"},narrow:{other:"{0}#"},perUnit:{"long":"{0} per pound","short":"{0}/lb",narrow:"{0}/lb"}},ounce:{"long":{other:"{0} ounces",one:"{0} ounce"},"short":{other:"{0} oz"},narrow:{other:"{0}oz"},perUnit:{"long":"{0} per ounce","short":"{0}/oz",narrow:"{0}/oz"}},"kilometer-per-hour":{"long":{other:"{0} kilometers per hour",one:"{0} kilometer per hour"},"short":{other:"{0} km/h"},narrow:{other:"{0}km/h"},perUnit:{}},"meter-per-second":{"long":{other:"{0} meters per second",one:"{0} meter per second"},"short":{other:"{0} m/s"},narrow:{other:"{0}m/s"},perUnit:{}},"mile-per-hour":{"long":{other:"{0} miles per hour",one:"{0} mile per hour"},"short":{other:"{0} mph"},narrow:{other:"{0}mph"},perUnit:{}},celsius:{"long":{other:"{0} degrees Celsius",one:"{0} degree Celsius"},"short":{other:"{0}°C"},narrow:{other:"{0}°C"},perUnit:{}},fahrenheit:{"long":{other:"{0} degrees Fahrenheit",one:"{0} degree Fahrenheit"},"short":{other:"{0}°F"},narrow:{other:"{0}°"},perUnit:{}},liter:{"long":{other:"{0} liters",one:"{0} liter"},"short":{other:"{0} L"},narrow:{other:"{0}L"},perUnit:{"long":"{0} per liter","short":"{0}/L",narrow:"{0}/L"}},milliliter:{"long":{other:"{0} milliliters",one:"{0} milliliter"},"short":{other:"{0} mL"},narrow:{other:"{0}mL"},perUnit:{}},gallon:{"long":{other:"{0} gallons",one:"{0} gallon"},"short":{other:"{0} gal"},narrow:{other:"{0}gal"},perUnit:{"long":"{0} per gallon","short":"{0}/gal US",narrow:"{0}/gal"}},"fluid-ounce":{"long":{other:"{0} fluid ounces",one:"{0} fluid ounce"},"short":{other:"{0} fl oz"},narrow:{other:"{0}fl oz"},perUnit:{}}},compound:{per:{"long":"{0} per {1}","short":"{0}/{1}",narrow:"{0}/{1}"}}},currencies:{ADP:{displayName:{other:"Andorran pesetas",one:"Andorran peseta"},symbol:"ADP",narrow:"ADP"},AED:{displayName:{other:"UAE dirhams",one:"UAE dirham"},symbol:"AED",narrow:"AED"},AFA:{displayName:{other:"Afghan afghanis (1927–2002)",one:"Afghan afghani (1927–2002)"},symbol:"AFA",narrow:"AFA"},AFN:{displayName:{other:"Afghan Afghanis",one:"Afghan Afghani"},symbol:"AFN",narrow:"؋"},ALK:{displayName:{other:"Albanian lekë (1946–1965)",one:"Albanian lek (1946–1965)"},symbol:"ALK",narrow:"ALK"},ALL:{displayName:{other:"Albanian lekë",one:"Albanian lek"},symbol:"ALL",narrow:"ALL"},AMD:{displayName:{other:"Armenian drams",one:"Armenian dram"},symbol:"AMD",narrow:"֏"},ANG:{displayName:{other:"Netherlands Antillean guilders",one:"Netherlands Antillean guilder"},symbol:"ANG",narrow:"ANG"},AOA:{displayName:{other:"Angolan kwanzas",one:"Angolan kwanza"},symbol:"AOA",narrow:"Kz"},AOK:{displayName:{other:"Angolan kwanzas (1977–1991)",one:"Angolan kwanza (1977–1991)"},symbol:"AOK",narrow:"AOK"},AON:{displayName:{other:"Angolan new kwanzas (1990–2000)",one:"Angolan new kwanza (1990–2000)"},symbol:"AON",narrow:"AON"},AOR:{displayName:{other:"Angolan readjusted kwanzas (1995–1999)",one:"Angolan readjusted kwanza (1995–1999)"},symbol:"AOR",narrow:"AOR"},ARA:{displayName:{other:"Argentine australs",one:"Argentine austral"},symbol:"ARA",narrow:"ARA"},ARL:{displayName:{other:"Argentine pesos ley (1970–1983)",one:"Argentine peso ley (1970–1983)"},symbol:"ARL",narrow:"ARL"},ARM:{displayName:{other:"Argentine pesos (1881–1970)",one:"Argentine peso (1881–1970)"},symbol:"ARM",narrow:"ARM"},ARP:{displayName:{other:"Argentine pesos (1983–1985)",one:"Argentine peso (1983–1985)"},symbol:"ARP",narrow:"ARP"},ARS:{displayName:{other:"Argentine pesos",one:"Argentine peso"},symbol:"ARS",narrow:"$"},ATS:{displayName:{other:"Austrian schillings",one:"Austrian schilling"},symbol:"ATS",narrow:"ATS"},AUD:{displayName:{other:"Australian dollars",one:"Australian dollar"},symbol:"A$",narrow:"$"},AWG:{displayName:{other:"Aruban florin"},symbol:"AWG",narrow:"AWG"},AZM:{displayName:{other:"Azerbaijani manats (1993–2006)",one:"Azerbaijani manat (1993–2006)"},symbol:"AZM",narrow:"AZM"},AZN:{displayName:{other:"Azerbaijani manats",one:"Azerbaijani manat"},symbol:"AZN",narrow:"₼"},BAD:{displayName:{other:"Bosnia-Herzegovina dinars (1992–1994)",one:"Bosnia-Herzegovina dinar (1992–1994)"},symbol:"BAD",narrow:"BAD"},BAM:{displayName:{other:"Bosnia-Herzegovina convertible marks",one:"Bosnia-Herzegovina convertible mark"},symbol:"BAM",narrow:"KM"},BAN:{displayName:{other:"Bosnia-Herzegovina new dinars (1994–1997)",one:"Bosnia-Herzegovina new dinar (1994–1997)"},symbol:"BAN",narrow:"BAN"},BBD:{displayName:{other:"Barbadian dollars",one:"Barbadian dollar"},symbol:"BBD",narrow:"$"},BDT:{displayName:{other:"Bangladeshi takas",one:"Bangladeshi taka"},symbol:"BDT",narrow:"৳"},BEC:{displayName:{other:"Belgian francs (convertible)",one:"Belgian franc (convertible)"},symbol:"BEC",narrow:"BEC"},BEF:{displayName:{other:"Belgian francs",one:"Belgian franc"},symbol:"BEF",narrow:"BEF"},BEL:{displayName:{other:"Belgian francs (financial)",one:"Belgian franc (financial)"},symbol:"BEL",narrow:"BEL"},BGL:{displayName:{other:"Bulgarian hard leva",one:"Bulgarian hard lev"},symbol:"BGL",narrow:"BGL"},BGM:{displayName:{other:"Bulgarian socialist leva",one:"Bulgarian socialist lev"},symbol:"BGM",narrow:"BGM"},BGN:{displayName:{other:"Bulgarian leva",one:"Bulgarian lev"},symbol:"BGN",narrow:"BGN"},BGO:{displayName:{other:"Bulgarian leva (1879–1952)",one:"Bulgarian lev (1879–1952)"},symbol:"BGO",narrow:"BGO"},BHD:{displayName:{other:"Bahraini dinars",one:"Bahraini dinar"},symbol:"BHD",narrow:"BHD"},BIF:{displayName:{other:"Burundian francs",one:"Burundian franc"},symbol:"BIF",narrow:"BIF"},BMD:{displayName:{other:"Bermudan dollars",one:"Bermudan dollar"},symbol:"BMD",narrow:"$"},BND:{displayName:{other:"Brunei dollars",one:"Brunei dollar"},symbol:"BND",narrow:"$"},BOB:{displayName:{other:"Bolivian bolivianos",one:"Bolivian boliviano"},symbol:"BOB",narrow:"Bs"},BOL:{displayName:{other:"Bolivian bolivianos (1863–1963)",one:"Bolivian boliviano (1863–1963)"},symbol:"BOL",narrow:"BOL"},BOP:{displayName:{other:"Bolivian pesos",one:"Bolivian peso"},symbol:"BOP",narrow:"BOP"},BOV:{displayName:{other:"Bolivian mvdols",one:"Bolivian mvdol"},symbol:"BOV",narrow:"BOV"},BRB:{displayName:{other:"Brazilian new cruzeiros (1967–1986)",one:"Brazilian new cruzeiro (1967–1986)"},symbol:"BRB",narrow:"BRB"},BRC:{displayName:{other:"Brazilian cruzados (1986–1989)",one:"Brazilian cruzado (1986–1989)"},symbol:"BRC",narrow:"BRC"},BRE:{displayName:{other:"Brazilian cruzeiros (1990–1993)",one:"Brazilian cruzeiro (1990–1993)"},symbol:"BRE",narrow:"BRE"},BRL:{displayName:{other:"Brazilian reals",one:"Brazilian real"},symbol:"R$",narrow:"R$"},BRN:{displayName:{other:"Brazilian new cruzados (1989–1990)",one:"Brazilian new cruzado (1989–1990)"},symbol:"BRN",narrow:"BRN"},BRR:{displayName:{other:"Brazilian cruzeiros (1993–1994)",one:"Brazilian cruzeiro (1993–1994)"},symbol:"BRR",narrow:"BRR"},BRZ:{displayName:{other:"Brazilian cruzeiros (1942–1967)",one:"Brazilian cruzeiro (1942–1967)"},symbol:"BRZ",narrow:"BRZ"},BSD:{displayName:{other:"Bahamian dollars",one:"Bahamian dollar"},symbol:"BSD",narrow:"$"},BTN:{displayName:{other:"Bhutanese ngultrums",one:"Bhutanese ngultrum"},symbol:"BTN",narrow:"BTN"},BUK:{displayName:{other:"Burmese kyats",one:"Burmese kyat"},symbol:"BUK",narrow:"BUK"},BWP:{displayName:{other:"Botswanan pulas",one:"Botswanan pula"},symbol:"BWP",narrow:"P"},BYB:{displayName:{other:"Belarusian rubles (1994–1999)",one:"Belarusian ruble (1994–1999)"},symbol:"BYB",narrow:"BYB"},BYN:{displayName:{other:"Belarusian rubles",one:"Belarusian ruble"},symbol:"BYN",narrow:"р."},BYR:{displayName:{other:"Belarusian rubles (2000–2016)",one:"Belarusian ruble (2000–2016)"},symbol:"BYR",narrow:"BYR"},BZD:{displayName:{other:"Belize dollars",one:"Belize dollar"},symbol:"BZD",narrow:"$"},CAD:{displayName:{other:"Canadian dollars",one:"Canadian dollar"},symbol:"CA$",narrow:"$"},CDF:{displayName:{other:"Congolese francs",one:"Congolese franc"},symbol:"CDF",narrow:"CDF"},CHE:{displayName:{other:"WIR euros",one:"WIR euro"},symbol:"CHE",narrow:"CHE"},CHF:{displayName:{other:"Swiss francs",one:"Swiss franc"},symbol:"CHF",narrow:"CHF"},CHW:{displayName:{other:"WIR francs",one:"WIR franc"},symbol:"CHW",narrow:"CHW"},CLE:{displayName:{other:"Chilean escudos",one:"Chilean escudo"},symbol:"CLE",narrow:"CLE"},CLF:{displayName:{other:"Chilean units of account (UF)",one:"Chilean unit of account (UF)"},symbol:"CLF",narrow:"CLF"},CLP:{displayName:{other:"Chilean pesos",one:"Chilean peso"},symbol:"CLP",narrow:"$"},CNH:{displayName:{other:"Chinese yuan (offshore)"},symbol:"CNH",narrow:"CNH"},CNX:{displayName:{other:"Chinese People’s Bank dollars",one:"Chinese People’s Bank dollar"},symbol:"CNX",narrow:"CNX"},CNY:{displayName:{other:"Chinese yuan"},symbol:"CN¥",narrow:"¥"},COP:{displayName:{other:"Colombian pesos",one:"Colombian peso"},symbol:"COP",narrow:"$"},COU:{displayName:{other:"Colombian real value units",one:"Colombian real value unit"},symbol:"COU",narrow:"COU"},CRC:{displayName:{other:"Costa Rican colóns",one:"Costa Rican colón"},symbol:"CRC",narrow:"₡"},CSD:{displayName:{other:"Serbian dinars (2002–2006)",one:"Serbian dinar (2002–2006)"},symbol:"CSD",narrow:"CSD"},CSK:{displayName:{other:"Czechoslovak hard korunas",one:"Czechoslovak hard koruna"},symbol:"CSK",narrow:"CSK"},CUC:{displayName:{other:"Cuban convertible pesos",one:"Cuban convertible peso"},symbol:"CUC",narrow:"$"},CUP:{displayName:{other:"Cuban pesos",one:"Cuban peso"},symbol:"CUP",narrow:"$"},CVE:{displayName:{other:"Cape Verdean escudos",one:"Cape Verdean escudo"},symbol:"CVE",narrow:"CVE"},CYP:{displayName:{other:"Cypriot pounds",one:"Cypriot pound"},symbol:"CYP",narrow:"CYP"},CZK:{displayName:{other:"Czech korunas",one:"Czech koruna"},symbol:"CZK",narrow:"Kč"},DDM:{displayName:{other:"East German marks",one:"East German mark"},symbol:"DDM",narrow:"DDM"},DEM:{displayName:{other:"German marks",one:"German mark"},symbol:"DEM",narrow:"DEM"},DJF:{displayName:{other:"Djiboutian francs",one:"Djiboutian franc"},symbol:"DJF",narrow:"DJF"},DKK:{displayName:{other:"Danish kroner",one:"Danish krone"},symbol:"DKK",narrow:"kr"},DOP:{displayName:{other:"Dominican pesos",one:"Dominican peso"},symbol:"DOP",narrow:"$"},DZD:{displayName:{other:"Algerian dinars",one:"Algerian dinar"},symbol:"DZD",narrow:"DZD"},ECS:{displayName:{other:"Ecuadorian sucres",one:"Ecuadorian sucre"},symbol:"ECS",narrow:"ECS"},ECV:{displayName:{other:"Ecuadorian units of constant value",one:"Ecuadorian unit of constant value"},symbol:"ECV",narrow:"ECV"},EEK:{displayName:{other:"Estonian kroons",one:"Estonian kroon"},symbol:"EEK",narrow:"EEK"},EGP:{displayName:{other:"Egyptian pounds",one:"Egyptian pound"},symbol:"EGP",narrow:"E£"},ERN:{displayName:{other:"Eritrean nakfas",one:"Eritrean nakfa"},symbol:"ERN",narrow:"ERN"},ESA:{displayName:{other:"Spanish pesetas (A account)",one:"Spanish peseta (A account)"},symbol:"ESA",narrow:"ESA"},ESB:{displayName:{other:"Spanish pesetas (convertible account)",one:"Spanish peseta (convertible account)"},symbol:"ESB",narrow:"ESB"},ESP:{displayName:{other:"Spanish pesetas",one:"Spanish peseta"},symbol:"ESP",narrow:"₧"},ETB:{displayName:{other:"Ethiopian birrs",one:"Ethiopian birr"},symbol:"ETB",narrow:"ETB"},EUR:{displayName:{other:"euros",one:"euro"},symbol:"€",narrow:"€"},FIM:{displayName:{other:"Finnish markkas",one:"Finnish markka"},symbol:"FIM",narrow:"FIM"},FJD:{displayName:{other:"Fijian dollars",one:"Fijian dollar"},symbol:"FJD",narrow:"$"},FKP:{displayName:{other:"Falkland Islands pounds",one:"Falkland Islands pound"},symbol:"FKP",narrow:"£"},FRF:{displayName:{other:"French francs",one:"French franc"},symbol:"FRF",narrow:"FRF"},GBP:{displayName:{other:"British pounds",one:"British pound"},symbol:"£",narrow:"£"},GEK:{displayName:{other:"Georgian kupon larits",one:"Georgian kupon larit"},symbol:"GEK",narrow:"GEK"},GEL:{displayName:{other:"Georgian laris",one:"Georgian lari"},symbol:"GEL",narrow:"₾"},GHC:{displayName:{other:"Ghanaian cedis (1979–2007)",one:"Ghanaian cedi (1979–2007)"},symbol:"GHC",narrow:"GHC"},GHS:{displayName:{other:"Ghanaian cedis",one:"Ghanaian cedi"},symbol:"GHS",narrow:"GH₵"},GIP:{displayName:{other:"Gibraltar pounds",one:"Gibraltar pound"},symbol:"GIP",narrow:"£"},GMD:{displayName:{other:"Gambian dalasis",one:"Gambian dalasi"},symbol:"GMD",narrow:"GMD"},GNF:{displayName:{other:"Guinean francs",one:"Guinean franc"},symbol:"GNF",narrow:"FG"},GNS:{displayName:{other:"Guinean sylis",one:"Guinean syli"},symbol:"GNS",narrow:"GNS"},GQE:{displayName:{other:"Equatorial Guinean ekwele"},symbol:"GQE",narrow:"GQE"},GRD:{displayName:{other:"Greek drachmas",one:"Greek drachma"},symbol:"GRD",narrow:"GRD"},GTQ:{displayName:{other:"Guatemalan quetzals",one:"Guatemalan quetzal"},symbol:"GTQ",narrow:"Q"},GWE:{displayName:{other:"Portuguese Guinea escudos",one:"Portuguese Guinea escudo"},symbol:"GWE",narrow:"GWE"},GWP:{displayName:{other:"Guinea-Bissau pesos",one:"Guinea-Bissau peso"},symbol:"GWP",narrow:"GWP"},GYD:{displayName:{other:"Guyanaese dollars",one:"Guyanaese dollar"},symbol:"GYD",narrow:"$"},HKD:{displayName:{other:"Hong Kong dollars",one:"Hong Kong dollar"},symbol:"HK$",narrow:"$"},HNL:{displayName:{other:"Honduran lempiras",one:"Honduran lempira"},symbol:"HNL",narrow:"L"},HRD:{displayName:{other:"Croatian dinars",one:"Croatian dinar"},symbol:"HRD",narrow:"HRD"},HRK:{displayName:{other:"Croatian kunas",one:"Croatian kuna"},symbol:"HRK",narrow:"kn"},HTG:{displayName:{other:"Haitian gourdes",one:"Haitian gourde"},symbol:"HTG",narrow:"HTG"},HUF:{displayName:{other:"Hungarian forints",one:"Hungarian forint"},symbol:"HUF",narrow:"Ft"},IDR:{displayName:{other:"Indonesian rupiahs",one:"Indonesian rupiah"},symbol:"IDR",narrow:"Rp"},IEP:{displayName:{other:"Irish pounds",one:"Irish pound"},symbol:"IEP",narrow:"IEP"},ILP:{displayName:{other:"Israeli pounds",one:"Israeli pound"},symbol:"ILP",narrow:"ILP"},ILR:{displayName:{other:"Israeli shekels (1980–1985)",one:"Israeli shekel (1980–1985)"},symbol:"ILR",narrow:"ILR"},ILS:{displayName:{other:"Israeli new shekels",one:"Israeli new shekel"},symbol:"₪",narrow:"₪"},INR:{displayName:{other:"Indian rupees",one:"Indian rupee"},symbol:"₹",narrow:"₹"},IQD:{displayName:{other:"Iraqi dinars",one:"Iraqi dinar"},symbol:"IQD",narrow:"IQD"},IRR:{displayName:{other:"Iranian rials",one:"Iranian rial"},symbol:"IRR",narrow:"IRR"},ISJ:{displayName:{other:"Icelandic krónur (1918–1981)",one:"Icelandic króna (1918–1981)"},symbol:"ISJ",narrow:"ISJ"},ISK:{displayName:{other:"Icelandic krónur",one:"Icelandic króna"},symbol:"ISK",narrow:"kr"},ITL:{displayName:{other:"Italian liras",one:"Italian lira"},symbol:"ITL",narrow:"ITL"},JMD:{displayName:{other:"Jamaican dollars",one:"Jamaican dollar"},symbol:"JMD",narrow:"$"},JOD:{displayName:{other:"Jordanian dinars",one:"Jordanian dinar"},symbol:"JOD",narrow:"JOD"},JPY:{displayName:{other:"Japanese yen"},symbol:"¥",narrow:"¥"},KES:{displayName:{other:"Kenyan shillings",one:"Kenyan shilling"},symbol:"KES",narrow:"KES"},KGS:{displayName:{other:"Kyrgystani soms",one:"Kyrgystani som"},symbol:"KGS",narrow:"KGS"},KHR:{displayName:{other:"Cambodian riels",one:"Cambodian riel"},symbol:"KHR",narrow:"៛"},KMF:{displayName:{other:"Comorian francs",one:"Comorian franc"},symbol:"KMF",narrow:"CF"},KPW:{displayName:{other:"North Korean won"},symbol:"KPW",narrow:"₩"},KRH:{displayName:{other:"South Korean hwan (1953–1962)"},symbol:"KRH",narrow:"KRH"},KRO:{displayName:{other:"South Korean won (1945–1953)"},symbol:"KRO",narrow:"KRO"},KRW:{displayName:{other:"South Korean won"},symbol:"₩",narrow:"₩"},KWD:{displayName:{other:"Kuwaiti dinars",one:"Kuwaiti dinar"},symbol:"KWD",narrow:"KWD"},KYD:{displayName:{other:"Cayman Islands dollars",one:"Cayman Islands dollar"},symbol:"KYD",narrow:"$"},KZT:{displayName:{other:"Kazakhstani tenges",one:"Kazakhstani tenge"},symbol:"KZT",narrow:"₸"},LAK:{displayName:{other:"Laotian kips",one:"Laotian kip"},symbol:"LAK",narrow:"₭"},LBP:{displayName:{other:"Lebanese pounds",one:"Lebanese pound"},symbol:"LBP",narrow:"L£"},LKR:{displayName:{other:"Sri Lankan rupees",one:"Sri Lankan rupee"},symbol:"LKR",narrow:"Rs"},LRD:{displayName:{other:"Liberian dollars",one:"Liberian dollar"},symbol:"LRD",narrow:"$"},LSL:{displayName:{other:"Lesotho lotis",one:"Lesotho loti"},symbol:"LSL",narrow:"LSL"},LTL:{displayName:{other:"Lithuanian litai",one:"Lithuanian litas"},symbol:"LTL",narrow:"Lt"},LTT:{displayName:{other:"Lithuanian talonases",one:"Lithuanian talonas"},symbol:"LTT",narrow:"LTT"},LUC:{displayName:{other:"Luxembourgian convertible francs",one:"Luxembourgian convertible franc"},symbol:"LUC",narrow:"LUC"},LUF:{displayName:{other:"Luxembourgian francs",one:"Luxembourgian franc"},symbol:"LUF",narrow:"LUF"},LUL:{displayName:{other:"Luxembourg financial francs",one:"Luxembourg financial franc"},symbol:"LUL",narrow:"LUL"},LVL:{displayName:{other:"Latvian lati",one:"Latvian lats"},symbol:"LVL",narrow:"Ls"},LVR:{displayName:{other:"Latvian rubles",one:"Latvian ruble"},symbol:"LVR",narrow:"LVR"},LYD:{displayName:{other:"Libyan dinars",one:"Libyan dinar"},symbol:"LYD",narrow:"LYD"},MAD:{displayName:{other:"Moroccan dirhams",one:"Moroccan dirham"},symbol:"MAD",narrow:"MAD"},MAF:{displayName:{other:"Moroccan francs",one:"Moroccan franc"},symbol:"MAF",narrow:"MAF"},MCF:{displayName:{other:"Monegasque francs",one:"Monegasque franc"},symbol:"MCF",narrow:"MCF"},MDC:{displayName:{other:"Moldovan cupon"},symbol:"MDC",narrow:"MDC"},MDL:{displayName:{other:"Moldovan lei",one:"Moldovan leu"},symbol:"MDL",narrow:"MDL"},MGA:{displayName:{other:"Malagasy ariaries",one:"Malagasy ariary"},symbol:"MGA",narrow:"Ar"},MGF:{displayName:{other:"Malagasy francs",one:"Malagasy franc"},symbol:"MGF",narrow:"MGF"},MKD:{displayName:{other:"Macedonian denari",one:"Macedonian denar"},symbol:"MKD",narrow:"MKD"},MKN:{displayName:{other:"Macedonian denari (1992–1993)",one:"Macedonian denar (1992–1993)"},symbol:"MKN",narrow:"MKN"},MLF:{displayName:{other:"Malian francs",one:"Malian franc"},symbol:"MLF",narrow:"MLF"},MMK:{displayName:{other:"Myanmar kyats",one:"Myanmar kyat"},symbol:"MMK",narrow:"K"},MNT:{displayName:{other:"Mongolian tugriks",one:"Mongolian tugrik"},symbol:"MNT",narrow:"₮"},MOP:{displayName:{other:"Macanese patacas",one:"Macanese pataca"},symbol:"MOP",narrow:"MOP"},MRO:{displayName:{other:"Mauritanian ouguiyas (1973–2017)",one:"Mauritanian ouguiya (1973–2017)"},symbol:"MRO",narrow:"MRO"},MRU:{displayName:{other:"Mauritanian ouguiyas",one:"Mauritanian ouguiya"},symbol:"MRU",narrow:"MRU"},MTL:{displayName:{other:"Maltese lira"},symbol:"MTL",narrow:"MTL"},MTP:{displayName:{other:"Maltese pounds",one:"Maltese pound"},symbol:"MTP",narrow:"MTP"},MUR:{displayName:{other:"Mauritian rupees",one:"Mauritian rupee"},symbol:"MUR",narrow:"Rs"},MVP:{displayName:{other:"Maldivian rupees (1947–1981)",one:"Maldivian rupee (1947–1981)"},symbol:"MVP",narrow:"MVP"},MVR:{displayName:{other:"Maldivian rufiyaas",one:"Maldivian rufiyaa"},symbol:"MVR",narrow:"MVR"},MWK:{displayName:{other:"Malawian kwachas",one:"Malawian kwacha"},symbol:"MWK",narrow:"MWK"},MXN:{displayName:{other:"Mexican pesos",one:"Mexican peso"},symbol:"MX$",narrow:"$"},MXP:{displayName:{other:"Mexican silver pesos (1861–1992)",one:"Mexican silver peso (1861–1992)"},symbol:"MXP",narrow:"MXP"},MXV:{displayName:{other:"Mexican investment units",one:"Mexican investment unit"},symbol:"MXV",narrow:"MXV"},MYR:{displayName:{other:"Malaysian ringgits",one:"Malaysian ringgit"},symbol:"MYR",narrow:"RM"},MZE:{displayName:{other:"Mozambican escudos",one:"Mozambican escudo"},symbol:"MZE",narrow:"MZE"},MZM:{displayName:{other:"Mozambican meticals (1980–2006)",one:"Mozambican metical (1980–2006)"},symbol:"MZM",narrow:"MZM"},MZN:{displayName:{other:"Mozambican meticals",one:"Mozambican metical"},symbol:"MZN",narrow:"MZN"},NAD:{displayName:{other:"Namibian dollars",one:"Namibian dollar"},symbol:"NAD",narrow:"$"},NGN:{displayName:{other:"Nigerian nairas",one:"Nigerian naira"},symbol:"NGN",narrow:"₦"},NIC:{displayName:{other:"Nicaraguan córdobas (1988–1991)",one:"Nicaraguan córdoba (1988–1991)"},symbol:"NIC",narrow:"NIC"},NIO:{displayName:{other:"Nicaraguan córdobas",one:"Nicaraguan córdoba"},symbol:"NIO",narrow:"C$"},NLG:{displayName:{other:"Dutch guilders",one:"Dutch guilder"},symbol:"NLG",narrow:"NLG"},NOK:{displayName:{other:"Norwegian kroner",one:"Norwegian krone"},symbol:"NOK",narrow:"kr"},NPR:{displayName:{other:"Nepalese rupees",one:"Nepalese rupee"},symbol:"NPR",narrow:"Rs"},NZD:{displayName:{other:"New Zealand dollars",one:"New Zealand dollar"},symbol:"NZ$",narrow:"$"},OMR:{displayName:{other:"Omani rials",one:"Omani rial"},symbol:"OMR",narrow:"OMR"},PAB:{displayName:{other:"Panamanian balboas",one:"Panamanian balboa"},symbol:"PAB",narrow:"PAB"},PEI:{displayName:{other:"Peruvian intis",one:"Peruvian inti"},symbol:"PEI",narrow:"PEI"},PEN:{displayName:{other:"Peruvian soles",one:"Peruvian sol"},symbol:"PEN",narrow:"PEN"},PES:{displayName:{other:"Peruvian soles (1863–1965)",one:"Peruvian sol (1863–1965)"},symbol:"PES",narrow:"PES"},PGK:{displayName:{other:"Papua New Guinean kina"},symbol:"PGK",narrow:"PGK"},PHP:{displayName:{other:"Philippine pisos",one:"Philippine piso"},symbol:"₱",narrow:"₱"},PKR:{displayName:{other:"Pakistani rupees",one:"Pakistani rupee"},symbol:"PKR",narrow:"Rs"},PLN:{displayName:{other:"Polish zlotys",one:"Polish zloty"},symbol:"PLN",narrow:"zł"},PLZ:{displayName:{other:"Polish zlotys (PLZ)",one:"Polish zloty (PLZ)"},symbol:"PLZ",narrow:"PLZ"},PTE:{displayName:{other:"Portuguese escudos",one:"Portuguese escudo"},symbol:"PTE",narrow:"PTE"},PYG:{displayName:{other:"Paraguayan guaranis",one:"Paraguayan guarani"},symbol:"PYG",narrow:"₲"},QAR:{displayName:{other:"Qatari rials",one:"Qatari rial"},symbol:"QAR",narrow:"QAR"},RHD:{displayName:{other:"Rhodesian dollars",one:"Rhodesian dollar"},symbol:"RHD",narrow:"RHD"},ROL:{displayName:{other:"Romanian Lei (1952–2006)",one:"Romanian leu (1952–2006)"},symbol:"ROL",narrow:"ROL"},RON:{displayName:{other:"Romanian lei",one:"Romanian leu"},symbol:"RON",narrow:"lei"},RSD:{displayName:{other:"Serbian dinars",one:"Serbian dinar"},symbol:"RSD",narrow:"RSD"},RUB:{displayName:{other:"Russian rubles",one:"Russian ruble"},symbol:"RUB",narrow:"₽"},RUR:{displayName:{other:"Russian rubles (1991–1998)",one:"Russian ruble (1991–1998)"},symbol:"RUR",narrow:"р."},RWF:{displayName:{other:"Rwandan francs",one:"Rwandan franc"},symbol:"RWF",narrow:"RF"},SAR:{displayName:{other:"Saudi riyals",one:"Saudi riyal"},symbol:"SAR",narrow:"SAR"},SBD:{displayName:{other:"Solomon Islands dollars",one:"Solomon Islands dollar"},symbol:"SBD",narrow:"$"},SCR:{displayName:{other:"Seychellois rupees",one:"Seychellois rupee"},symbol:"SCR",narrow:"SCR"},SDD:{displayName:{other:"Sudanese dinars (1992–2007)",one:"Sudanese dinar (1992–2007)"},symbol:"SDD",narrow:"SDD"},SDG:{displayName:{other:"Sudanese pounds",one:"Sudanese pound"},symbol:"SDG",narrow:"SDG"},SDP:{displayName:{other:"Sudanese pounds (1957–1998)",one:"Sudanese pound (1957–1998)"},symbol:"SDP",narrow:"SDP"},SEK:{displayName:{other:"Swedish kronor",one:"Swedish krona"},symbol:"SEK",narrow:"kr"},SGD:{displayName:{other:"Singapore dollars",one:"Singapore dollar"},symbol:"SGD",narrow:"$"},SHP:{displayName:{other:"St. Helena pounds",one:"St. Helena pound"},symbol:"SHP",narrow:"£"},SIT:{displayName:{other:"Slovenian tolars",one:"Slovenian tolar"},symbol:"SIT",narrow:"SIT"},SKK:{displayName:{other:"Slovak korunas",one:"Slovak koruna"},symbol:"SKK",narrow:"SKK"},SLL:{displayName:{other:"Sierra Leonean leones",one:"Sierra Leonean leone"},symbol:"SLL",narrow:"SLL"},SOS:{displayName:{other:"Somali shillings",one:"Somali shilling"},symbol:"SOS",narrow:"SOS"},SRD:{displayName:{other:"Surinamese dollars",one:"Surinamese dollar"},symbol:"SRD",narrow:"$"},SRG:{displayName:{other:"Surinamese guilders",one:"Surinamese guilder"},symbol:"SRG",narrow:"SRG"},SSP:{displayName:{other:"South Sudanese pounds",one:"South Sudanese pound"},symbol:"SSP",narrow:"£"},STD:{displayName:{other:"São Tomé & Príncipe dobras (1977–2017)",one:"São Tomé & Príncipe dobra (1977–2017)"},symbol:"STD",narrow:"STD"},STN:{displayName:{other:"São Tomé & Príncipe dobras",one:"São Tomé & Príncipe dobra"},symbol:"STN",narrow:"Db"},SUR:{displayName:{other:"Soviet roubles",one:"Soviet rouble"},symbol:"SUR",narrow:"SUR"},SVC:{displayName:{other:"Salvadoran colones",one:"Salvadoran colón"},symbol:"SVC",narrow:"SVC"},SYP:{displayName:{other:"Syrian pounds",one:"Syrian pound"},symbol:"SYP",narrow:"£"},SZL:{displayName:{other:"Swazi emalangeni",one:"Swazi lilangeni"},symbol:"SZL",narrow:"SZL"},THB:{displayName:{other:"Thai baht"},symbol:"THB",narrow:"฿"},TJR:{displayName:{other:"Tajikistani rubles",one:"Tajikistani ruble"},symbol:"TJR",narrow:"TJR"},TJS:{displayName:{other:"Tajikistani somonis",one:"Tajikistani somoni"},symbol:"TJS",narrow:"TJS"},TMM:{displayName:{other:"Turkmenistani manat (1993–2009)"},symbol:"TMM",narrow:"TMM"},TMT:{displayName:{other:"Turkmenistani manat"},symbol:"TMT",narrow:"TMT"},TND:{displayName:{other:"Tunisian dinars",one:"Tunisian dinar"},symbol:"TND",narrow:"TND"},TOP:{displayName:{other:"Tongan paʻanga"},symbol:"TOP",narrow:"T$"},TPE:{displayName:{other:"Timorese escudos",one:"Timorese escudo"},symbol:"TPE",narrow:"TPE"},TRL:{displayName:{other:"Turkish Lira (1922–2005)",one:"Turkish lira (1922–2005)"},symbol:"TRL",narrow:"TRL"},TRY:{displayName:{other:"Turkish Lira",one:"Turkish lira"},symbol:"TRY",narrow:"₺"},TTD:{displayName:{other:"Trinidad & Tobago dollars",one:"Trinidad & Tobago dollar"},symbol:"TTD",narrow:"$"},TWD:{displayName:{other:"New Taiwan dollars",one:"New Taiwan dollar"},symbol:"NT$",narrow:"$"},TZS:{displayName:{other:"Tanzanian shillings",one:"Tanzanian shilling"},symbol:"TZS",narrow:"TZS"},UAH:{displayName:{other:"Ukrainian hryvnias",one:"Ukrainian hryvnia"},symbol:"UAH",narrow:"₴"},UAK:{displayName:{other:"Ukrainian karbovantsiv",one:"Ukrainian karbovanets"},symbol:"UAK",narrow:"UAK"},UGS:{displayName:{other:"Ugandan shillings (1966–1987)",one:"Ugandan shilling (1966–1987)"},symbol:"UGS",narrow:"UGS"},UGX:{displayName:{other:"Ugandan shillings",one:"Ugandan shilling"},symbol:"UGX",narrow:"UGX"},USD:{displayName:{other:"US dollars",one:"US dollar"},symbol:"$",narrow:"$"},USN:{displayName:{other:"US dollars (next day)",one:"US dollar (next day)"},symbol:"USN",narrow:"USN"},USS:{displayName:{other:"US dollars (same day)",one:"US dollar (same day)"},symbol:"USS",narrow:"USS"},UYI:{displayName:{other:"Uruguayan pesos (indexed units)",one:"Uruguayan peso (indexed units)"},symbol:"UYI",narrow:"UYI"},UYP:{displayName:{other:"Uruguayan pesos (1975–1993)",one:"Uruguayan peso (1975–1993)"},symbol:"UYP",narrow:"UYP"},UYU:{displayName:{other:"Uruguayan pesos",one:"Uruguayan peso"},symbol:"UYU",narrow:"$"},UYW:{displayName:{
other:"Uruguayan nominal wage index units",one:"Uruguayan nominal wage index unit"},symbol:"UYW",narrow:"UYW"},UZS:{displayName:{other:"Uzbekistani som"},symbol:"UZS",narrow:"UZS"},VEB:{displayName:{other:"Venezuelan bolívars (1871–2008)",one:"Venezuelan bolívar (1871–2008)"},symbol:"VEB",narrow:"VEB"},VEF:{displayName:{other:"Venezuelan bolívars (2008–2018)",one:"Venezuelan bolívar (2008–2018)"},symbol:"VEF",narrow:"Bs"},VES:{displayName:{other:"Venezuelan bolívars",one:"Venezuelan bolívar"},symbol:"VES",narrow:"VES"},VND:{displayName:{other:"Vietnamese dong"},symbol:"₫",narrow:"₫"},VNN:{displayName:{other:"Vietnamese dong (1978–1985)"},symbol:"VNN",narrow:"VNN"},VUV:{displayName:{other:"Vanuatu vatus",one:"Vanuatu vatu"},symbol:"VUV",narrow:"VUV"},WST:{displayName:{other:"Samoan tala"},symbol:"WST",narrow:"WST"},XAF:{displayName:{other:"Central African CFA francs",one:"Central African CFA franc"},symbol:"FCFA",narrow:"FCFA"},XAG:{displayName:{other:"troy ounces of silver",one:"troy ounce of silver"},symbol:"XAG",narrow:"XAG"},XAU:{displayName:{other:"troy ounces of gold",one:"troy ounce of gold"},symbol:"XAU",narrow:"XAU"},XBA:{displayName:{other:"European composite units",one:"European composite unit"},symbol:"XBA",narrow:"XBA"},XBB:{displayName:{other:"European monetary units",one:"European monetary unit"},symbol:"XBB",narrow:"XBB"},XBC:{displayName:{other:"European units of account (XBC)",one:"European unit of account (XBC)"},symbol:"XBC",narrow:"XBC"},XBD:{displayName:{other:"European units of account (XBD)",one:"European unit of account (XBD)"},symbol:"XBD",narrow:"XBD"},XCD:{displayName:{other:"East Caribbean dollars",one:"East Caribbean dollar"},symbol:"EC$",narrow:"$"},XDR:{displayName:{other:"special drawing rights"},symbol:"XDR",narrow:"XDR"},XEU:{displayName:{other:"European currency units",one:"European currency unit"},symbol:"XEU",narrow:"XEU"},XFO:{displayName:{other:"French gold francs",one:"French gold franc"},symbol:"XFO",narrow:"XFO"},XFU:{displayName:{other:"French UIC-francs",one:"French UIC-franc"},symbol:"XFU",narrow:"XFU"},XOF:{displayName:{other:"West African CFA francs",one:"West African CFA franc"},symbol:"F CFA",narrow:"F CFA"},XPD:{displayName:{other:"troy ounces of palladium",one:"troy ounce of palladium"},symbol:"XPD",narrow:"XPD"},XPF:{displayName:{other:"CFP francs",one:"CFP franc"},symbol:"CFPF",narrow:"CFPF"},XPT:{displayName:{other:"troy ounces of platinum",one:"troy ounce of platinum"},symbol:"XPT",narrow:"XPT"},XRE:{displayName:{other:"RINET Funds units",one:"RINET Funds unit"},symbol:"XRE",narrow:"XRE"},XSU:{displayName:{other:"Sucres",one:"Sucre"},symbol:"XSU",narrow:"XSU"},XTS:{displayName:{other:"Testing Currency units",one:"Testing Currency unit"},symbol:"XTS",narrow:"XTS"},XUA:{displayName:{other:"ADB units of account",one:"ADB unit of account"},symbol:"XUA",narrow:"XUA"},XXX:{displayName:{other:"(unknown currency)",one:"(unknown unit of currency)"},symbol:"¤",narrow:"¤"},YDD:{displayName:{other:"Yemeni dinars",one:"Yemeni dinar"},symbol:"YDD",narrow:"YDD"},YER:{displayName:{other:"Yemeni rials",one:"Yemeni rial"},symbol:"YER",narrow:"YER"},YUD:{displayName:{other:"Yugoslavian hard dinars (1966–1990)",one:"Yugoslavian hard dinar (1966–1990)"},symbol:"YUD",narrow:"YUD"},YUM:{displayName:{other:"Yugoslavian new dinars (1994–2002)",one:"Yugoslavian new dinar (1994–2002)"},symbol:"YUM",narrow:"YUM"},YUN:{displayName:{other:"Yugoslavian convertible dinars (1990–1992)",one:"Yugoslavian convertible dinar (1990–1992)"},symbol:"YUN",narrow:"YUN"},YUR:{displayName:{other:"Yugoslavian reformed dinars (1992–1993)",one:"Yugoslavian reformed dinar (1992–1993)"},symbol:"YUR",narrow:"YUR"},ZAL:{displayName:{other:"South African rands (financial)",one:"South African rand (financial)"},symbol:"ZAL",narrow:"ZAL"},ZAR:{displayName:{other:"South African rand"},symbol:"ZAR",narrow:"R"},ZMK:{displayName:{other:"Zambian kwachas (1968–2012)",one:"Zambian kwacha (1968–2012)"},symbol:"ZMK",narrow:"ZMK"},ZMW:{displayName:{other:"Zambian kwachas",one:"Zambian kwacha"},symbol:"ZMW",narrow:"ZK"},ZRN:{displayName:{other:"Zairean new zaires (1993–1998)",one:"Zairean new zaire (1993–1998)"},symbol:"ZRN",narrow:"ZRN"},ZRZ:{displayName:{other:"Zairean zaires (1971–1993)",one:"Zairean zaire (1971–1993)"},symbol:"ZRZ",narrow:"ZRZ"},ZWD:{displayName:{other:"Zimbabwean dollars (1980–2008)",one:"Zimbabwean dollar (1980–2008)"},symbol:"ZWD",narrow:"ZWD"},ZWL:{displayName:{other:"Zimbabwean dollars (2009)",one:"Zimbabwean dollar (2009)"},symbol:"ZWL",narrow:"ZWL"},ZWR:{displayName:{other:"Zimbabwean dollars (2008)",one:"Zimbabwean dollar (2008)"},symbol:"ZWR",narrow:"ZWR"}},numbers:{nu:["latn"],symbols:{latn:{decimal:".",group:",",list:";",percentSign:"%",plusSign:"+",minusSign:"-",approximatelySign:"~",exponential:"E",superscriptingExponent:"×",perMille:"‰",infinity:"∞",nan:"NaN",timeSeparator:":"}},percent:{latn:"#,##0%"},decimal:{latn:{standard:"#,##0.###","long":{1000:{other:"0 thousand"},10000:{other:"00 thousand"},100000:{other:"000 thousand"},1000000:{other:"0 million"},10000000:{other:"00 million"},100000000:{other:"000 million"},1000000000:{other:"0 billion"},10000000000:{other:"00 billion"},100000000000:{other:"000 billion"},1000000000000:{other:"0 trillion"},10000000000000:{other:"00 trillion"},100000000000000:{other:"000 trillion"}},"short":{1000:{other:"0K"},10000:{other:"00K"},100000:{other:"000K"},1000000:{other:"0M"},10000000:{other:"00M"},100000000:{other:"000M"},1000000000:{other:"0B"},10000000000:{other:"00B"},100000000000:{other:"000B"},1000000000000:{other:"0T"},10000000000000:{other:"00T"},100000000000000:{other:"000T"}}}},currency:{latn:{currencySpacing:{beforeInsertBetween:" ",afterInsertBetween:" "},standard:"¤#,##0.00",accounting:"¤#,##0.00;(¤#,##0.00)",unitPattern:"{0} {1}","short":{1000:{other:"¤0K"},10000:{other:"¤00K"},100000:{other:"¤000K"},1000000:{other:"¤0M"},10000000:{other:"¤00M"},100000000:{other:"¤000M"},1000000000:{other:"¤0B"},10000000000:{other:"¤00B"},100000000000:{other:"¤000B"},1000000000000:{other:"¤0T"},10000000000000:{other:"¤00T"},100000000000000:{other:"¤000T"}}}}},nu:["latn"]},locale:"en"});})('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
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

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./static/components/AppealForm/AppealForm.js":
/*!****************************************************!*\
  !*** ./static/components/AppealForm/AppealForm.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppealForm": () => (/* binding */ AppealForm)
/* harmony export */ });
/* harmony import */ var _Events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Events.js */ "./static/components/Events.js");
/* harmony import */ var _currency_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../currency.js */ "./static/components/currency.js");
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
/* global adblock */


const formTemplate = document.getElementById("appeal-form");
const fixedAmountTemplate = document.getElementById("appeal-form-amount--fixed");
const customAmountTemplate = document.getElementById("appeal-form-amount--custom");
var _paddleConfig = /*#__PURE__*/new WeakMap();
var _parentElement = /*#__PURE__*/new WeakMap();
var _currencySelect = /*#__PURE__*/new WeakMap();
var _frequenciesParentElement = /*#__PURE__*/new WeakMap();
var _amountsControlElements = /*#__PURE__*/new WeakMap();
var _errorMessageElement = /*#__PURE__*/new WeakMap();
var _submitButton = /*#__PURE__*/new WeakMap();
var _updateAmounts = /*#__PURE__*/new WeakSet();
var _showMinimumAmountError = /*#__PURE__*/new WeakSet();
var _hideMinimumAmountError = /*#__PURE__*/new WeakSet();
var _hasMinimumAmountError = /*#__PURE__*/new WeakSet();
var _handleMinimumAmountError = /*#__PURE__*/new WeakSet();
var _getCustomRadioInput = /*#__PURE__*/new WeakSet();
var _getCustomInputRadio = /*#__PURE__*/new WeakSet();
var _onAmountFocusin = /*#__PURE__*/new WeakSet();
var _onAmountInput = /*#__PURE__*/new WeakSet();
var _onSubmit = /*#__PURE__*/new WeakSet();
class AppealForm {
  constructor(_ref) {
    let {
      placeholder,
      paddleConfig,
      formConfig
    } = _ref;
    _classPrivateMethodInitSpec(this, _onSubmit);
    /** Handle when an amount radio is selected or a custom amount input is filled */
    _classPrivateMethodInitSpec(this, _onAmountInput);
    /** Handle when a custom amount input is selected / focused for input */
    _classPrivateMethodInitSpec(this, _onAmountFocusin);
    /** Get custom amount radio from reference to custom amount input */
    _classPrivateMethodInitSpec(this, _getCustomInputRadio);
    /** Get custom amount input from reference to custom amount radio */
    _classPrivateMethodInitSpec(this, _getCustomRadioInput);
    _classPrivateMethodInitSpec(this, _handleMinimumAmountError);
    _classPrivateMethodInitSpec(this, _hasMinimumAmountError);
    _classPrivateMethodInitSpec(this, _hideMinimumAmountError);
    _classPrivateMethodInitSpec(this, _showMinimumAmountError);
    _classPrivateMethodInitSpec(this, _updateAmounts);
    /** @member {Events} events interface */
    _defineProperty(this, "events", void 0);
    /** @member {Object} paddle config @see ./configuration.js */
    _classPrivateFieldInitSpec(this, _paddleConfig, {
      writable: true,
      value: void 0
    });
    /** @member {Element} form parent element */
    _classPrivateFieldInitSpec(this, _parentElement, {
      writable: true,
      value: void 0
    });
    /** @member {Element} form currency select element */
    _classPrivateFieldInitSpec(this, _currencySelect, {
      writable: true,
      value: void 0
    });
    /** @member {Element} form frequencies (once, monthly, yearly) parent element */
    _classPrivateFieldInitSpec(this, _frequenciesParentElement, {
      writable: true,
      value: void 0
    });
    /** @member {Element[]} form amount control elements (parent, label, and inputs) */
    _classPrivateFieldInitSpec(this, _amountsControlElements, {
      writable: true,
      value: []
    });
    /** @member {Element} form error message (above checkout button) */
    _classPrivateFieldInitSpec(this, _errorMessageElement, {
      writable: true,
      value: void 0
    });
    /** @member {Element} form submit button */
    _classPrivateFieldInitSpec(this, _submitButton, {
      writable: true,
      value: void 0
    });
    this.events = new _Events_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    _classPrivateFieldSet(this, _paddleConfig, paddleConfig);
    _classPrivateFieldSet(this, _parentElement, formTemplate.content.cloneNode(true).firstElementChild);
    _classPrivateFieldGet(this, _parentElement).querySelector(".appeal-form-header__heading").innerHTML = adblock.strings["appeal-form-header__heading"];
    _classPrivateFieldGet(this, _parentElement).querySelector(".appeal-form-checkout__submit").innerHTML = adblock.strings["appeal-form-checkout__submit"];
    _classPrivateFieldSet(this, _errorMessageElement, _classPrivateFieldGet(this, _parentElement).querySelector(".appeal-form__error"));
    _classPrivateFieldSet(this, _submitButton, _classPrivateFieldGet(this, _parentElement).querySelector(".appeal-form-checkout__submit"));
    // construct and reference form currency select
    _classPrivateFieldSet(this, _currencySelect, _classPrivateFieldGet(this, _parentElement).querySelector(".appeal-form-header__select"));
    for (const currency in paddleConfig.products) {
      const option = document.createElement("option");
      option.textContent = currency.toUpperCase();
      option.value = currency.toUpperCase();
      _classPrivateFieldGet(this, _currencySelect).appendChild(option);
    }
    _classPrivateFieldGet(this, _currencySelect).value = formConfig.currency;
    // construct and reference form amounts
    _classPrivateFieldSet(this, _frequenciesParentElement, _classPrivateFieldGet(this, _parentElement).querySelector(".appeal-form-frequencies"));
    for (const frequency in paddleConfig.products[formConfig.currency]) {
      let radioNumber = 1;
      const frequencyParent = _classPrivateFieldGet(this, _frequenciesParentElement).querySelector(`.appeal-form-frequency--${frequency}`);
      frequencyParent.querySelector(".appeal-form-frequency__heading").innerHTML = adblock.strings[`appeal-form-frequency__heading--${frequency}`];
      const amountsParent = frequencyParent.querySelector(".appeal-form-amounts");
      for (const amount in paddleConfig.products[formConfig.currency][frequency]) {
        let amountControl, amountRadio, amountInput;
        if (amount == "custom") {
          amountControl = customAmountTemplate.content.cloneNode(true).firstElementChild;
          amountInput = amountControl.querySelector(".appeal-form-amount__input");
          amountInput.dataset.testid = `appeal-form-amount__input--${frequency}`;
          amountInput.dataset.frequency = frequency;
        } else {
          amountControl = fixedAmountTemplate.content.cloneNode(true).firstElementChild;
        }
        amountRadio = amountControl.querySelector(".appeal-form-amount__radio");
        amountRadio.dataset.testid = `appeal-form-amount__radio--${frequency}-${radioNumber++}`;
        amountRadio.dataset.frequency = frequency;
        _classPrivateFieldGet(this, _amountsControlElements).push(amountControl);
        amountsParent.appendChild(amountControl);
      }
    }
    _classPrivateMethodGet(this, _updateAmounts, _updateAmounts2).call(this, formConfig.currency);
    _classPrivateFieldGet(this, _frequenciesParentElement).querySelectorAll(".appeal-form-amount__radio")[formConfig.selected].checked = true;
    // add form interaction listeners
    _classPrivateFieldGet(this, _currencySelect).addEventListener("change", event => _classPrivateMethodGet(this, _updateAmounts, _updateAmounts2).call(this, event.currentTarget.value));
    _classPrivateFieldGet(this, _frequenciesParentElement).addEventListener("focusin", event => _classPrivateMethodGet(this, _onAmountFocusin, _onAmountFocusin2).call(this, event));
    _classPrivateFieldGet(this, _frequenciesParentElement).addEventListener("input", event => _classPrivateMethodGet(this, _onAmountInput, _onAmountInput2).call(this, event));
    _classPrivateFieldGet(this, _parentElement).addEventListener("submit", event => _classPrivateMethodGet(this, _onSubmit, _onSubmit2).call(this, event));
    // replace placeholder with constructed form
    placeholder.replaceWith(_classPrivateFieldGet(this, _parentElement));
    // set testid on parent to signal to playwright tests that construction is completed
    _classPrivateFieldGet(this, _parentElement).dataset.testid = "appeal-form-constructed";
  }
  /**
   * @returns { currency, ferquency, product, amount }
   */
  state() {
    const radio = _classPrivateFieldGet(this, _frequenciesParentElement).querySelector(".appeal-form-amount__radio:checked");
    const currency = _classPrivateFieldGet(this, _currencySelect).value;
    const frequency = radio.dataset.frequency;
    const product = radio.dataset.product;
    let amount = radio.value;
    if (amount == "custom") {
      const input = _classPrivateMethodGet(this, _getCustomRadioInput, _getCustomRadioInput2).call(this, radio);
      amount = (0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.toCentNumber)(currency, parseFloat(input.value === "" ? input.placeholder : input.value));
    } else {
      amount = parseFloat(amount);
    }
    return {
      currency,
      frequency,
      product,
      amount
    };
  }
  disable() {
    _classPrivateFieldGet(this, _parentElement).classList.add("appeal-form--disabled");
    _classPrivateFieldGet(this, _parentElement).querySelectorAll("input, button").forEach(field => {
      field.disabled = true;
    });
  }
  enable() {
    _classPrivateFieldGet(this, _parentElement).classList.remove("appeal-form--disabled");
    _classPrivateFieldGet(this, _parentElement).querySelectorAll("input, button").forEach(field => {
      field.disabled = false;
    });
  }
}
function _updateAmounts2(currency) {
  let i = 0;
  for (const frequency in _classPrivateFieldGet(this, _paddleConfig).products[currency]) {
    for (const amount in _classPrivateFieldGet(this, _paddleConfig).products[currency][frequency]) {
      const control = _classPrivateFieldGet(this, _amountsControlElements)[i++];
      const radio = control.querySelector(".appeal-form-amount__radio");
      if (amount == "custom") {
        const input = control.querySelector(".appeal-form-amount__input");
        input.placeholder = String((0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.toDollarNumber)(currency, Object.keys(_classPrivateFieldGet(this, _paddleConfig).products[currency][frequency])[3]));
        input.dataset.minimum = (0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.toDollarNumber)(currency, _classPrivateFieldGet(this, _paddleConfig).products[currency][frequency][amount]);
        radio.dataset.product = "custom";
      } else {
        control.querySelector(".appeal-form-amount__text").textContent = (0,_currency_js__WEBPACK_IMPORTED_MODULE_1__.toDollarString)(currency, amount);
        radio.value = amount;
        radio.dataset.product = _classPrivateFieldGet(this, _paddleConfig).products[currency][frequency][amount];
      }
    }
  }
  this.events.fire(AppealForm.EVENTS.CURRENCY_CHANGE);
}
function _showMinimumAmountError2(input) {
  _classPrivateFieldGet(this, _errorMessageElement).innerHTML = adblock.strings[`appeal-form__error--${input.dataset.frequency}`];
  _classPrivateFieldGet(this, _errorMessageElement).hidden = false;
  _classPrivateFieldGet(this, _submitButton).disabled = true;
  this.events.fire(AppealForm.EVENTS.MINIMUM_AMOUNT_ERROR_SHOW);
}
function _hideMinimumAmountError2() {
  _classPrivateFieldGet(this, _errorMessageElement).hidden = true;
  _classPrivateFieldGet(this, _submitButton).disabled = false;
  this.events.fire(AppealForm.EVENTS.MINIMUM_AMOUNT_ERROR_HIDE);
}
function _hasMinimumAmountError2(input) {
  return input.value && parseFloat(input.value) < parseFloat(input.dataset.minimum);
}
function _handleMinimumAmountError2(input) {
  if (_classPrivateMethodGet(this, _hasMinimumAmountError, _hasMinimumAmountError2).call(this, input)) {
    _classPrivateMethodGet(this, _showMinimumAmountError, _showMinimumAmountError2).call(this, input);
  } else {
    _classPrivateMethodGet(this, _hideMinimumAmountError, _hideMinimumAmountError2).call(this);
  }
}
function _getCustomRadioInput2(radio) {
  return radio.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__input");
}
function _getCustomInputRadio2(input) {
  return input.closest(".appeal-form-amount--custom").querySelector(".appeal-form-amount__radio");
}
function _onAmountFocusin2(event) {
  if (event.target.type == "number") {
    // Check checkbox beside custom amount input when custom amount input is selected for entry
    _classPrivateMethodGet(this, _getCustomInputRadio, _getCustomInputRadio2).call(this, event.target).checked = true;
    // Handle possible minimum amount error when custom amount input re-selected already has a value below the minimum
    _classPrivateMethodGet(this, _handleMinimumAmountError, _handleMinimumAmountError2).call(this, event.target);
  }
}
function _onAmountInput2(event) {
  if (event.target.type == "number") {
    // Handle possible minimum amount error when custom amount input is filled
    _classPrivateMethodGet(this, _handleMinimumAmountError, _handleMinimumAmountError2).call(this, event.target);
  } else if (event.target.type == "radio") {
    // Handle possible minimum amount error when custom amount is re-selected via radio
    if (event.target.value == "custom") {
      _classPrivateMethodGet(this, _handleMinimumAmountError, _handleMinimumAmountError2).call(this, _classPrivateMethodGet(this, _getCustomRadioInput, _getCustomRadioInput2).call(this, event.target));
    } else {
      // Hide minimum amount error when fixed amount (a non custom amount) is selected
      _classPrivateMethodGet(this, _hideMinimumAmountError, _hideMinimumAmountError2).call(this);
    }
  }
  this.events.fire(AppealForm.EVENTS.AMOUNT_CHANGE);
}
function _onSubmit2(event) {
  event.preventDefault();
  const radio = _classPrivateFieldGet(this, _frequenciesParentElement).querySelector(".appeal-form-amount__radio:checked");
  if (radio.value == "custom") {
    const input = _classPrivateMethodGet(this, _getCustomRadioInput, _getCustomRadioInput2).call(this, radio);
    if (_classPrivateMethodGet(this, _hasMinimumAmountError, _hasMinimumAmountError2).call(this, input)) {
      return _classPrivateMethodGet(this, _showMinimumAmountError, _showMinimumAmountError2).call(this, input);
    }
  }
  this.events.fire(AppealForm.EVENTS.SUBMIT, this.state());
}
/** @static {Object} EVENTS names constants */
_defineProperty(AppealForm, "EVENTS", {
  CURRENCY_CHANGE: "CURRENCY_CHANGE",
  MINIMUM_AMOUNT_ERROR_SHOW: "SHOW_MINIMUM_AMOUNT_ERROR",
  MINIMUM_AMOUNT_ERROR_HIDE: "HIDE_MINIMUM_AMOUNT_ERROR",
  AMOUNT_CHANGE: "AMOUNT_CHANGE",
  SUBMIT: "SUBMIT"
});
adblock.lib.AppealForm = AppealForm;

/***/ }),

/***/ "./static/components/AppealForm/configuration.js":
/*!*******************************************************!*\
  !*** ./static/components/AppealForm/configuration.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONFIGURATION": () => (/* binding */ CONFIGURATION)
/* harmony export */ });
const CONFIGURATION = {
  AppealForm: {
    currency: typeof adblock == "object" ? adblock.settings.currency || "USD" : "USD",
    selected: 3
  },
  Paddle: {
    sandbox: {
      vendor: 11004,
      products: {
        "USD": {
          "once": {
            "1000": 46028,
            "1500": 46029,
            "2000": 46030,
            "3500": 46031,
            "5000": 46032,
            "custom": 500
          },
          "monthly": {
            "199": 46074,
            "299": 46075,
            "399": 46076,
            "499": 46077,
            "999": 46078,
            "custom": 199
          },
          "yearly": {
            "1000": 46079,
            "1500": 46080,
            "2000": 46081,
            "3500": 46082,
            "5000": 46083,
            "custom": 500
          }
        },
        "AUD": {
          "once": {
            "1000": 46033,
            "1500": 46034,
            "2000": 46035,
            "3500": 46036,
            "5000": 46037,
            "custom": 500
          },
          "monthly": {
            "199": 46084,
            "299": 46085,
            "399": 46086,
            "499": 46087,
            "999": 46088,
            "custom": 199
          },
          "yearly": {
            "1000": 46089,
            "1500": 46090,
            "2000": 46091,
            "3500": 46092,
            "5000": 46093,
            "custom": 500
          }
        },
        "CAD": {
          "once": {
            "1000": 46038,
            "1500": 46039,
            "2000": 46040,
            "3500": 46041,
            "5000": 46042,
            "custom": 500
          },
          "monthly": {
            "199": 46094,
            "299": 46095,
            "399": 46096,
            "499": 46097,
            "999": 46098,
            "custom": 199
          },
          "yearly": {
            "1000": 46099,
            "1500": 46181,
            "2000": 46182,
            "3500": 46183,
            "5000": 46184,
            "custom": 500
          }
        },
        "EUR": {
          "once": {
            "1000": 46048,
            "1500": 46049,
            "2000": 46050,
            "3500": 46051,
            "5000": 46052,
            "custom": 500
          },
          "monthly": {
            "199": 46195,
            "299": 46196,
            "399": 46197,
            "499": 46198,
            "999": 46199,
            "custom": 199
          },
          "yearly": {
            "1000": 46200,
            "1500": 46201,
            "2000": 46202,
            "3500": 46203,
            "5000": 46204,
            "custom": 500
          }
        },
        "GBP": {
          "once": {
            "1000": 46053,
            "1500": 46054,
            "2000": 46055,
            "3500": 46056,
            "5000": 46057,
            "custom": 500
          },
          "monthly": {
            "199": 46205,
            "299": 46206,
            "399": 46207,
            "499": 46208,
            "999": 46209,
            "custom": 199
          },
          "yearly": {
            "1000": 46210,
            "1500": 46211,
            "2000": 46212,
            "3500": 46213,
            "5000": 46214,
            "custom": 500
          }
        },
        "JPY": {
          "once": {
            "1500": 46064,
            "2000": 46065,
            "2500": 46066,
            "3500": 46067,
            "5000": 46068,
            "custom": 500
          },
          "monthly": {
            "200": 46225,
            "300": 46226,
            "500": 46227,
            "1000": 46228,
            "1500": 46229,
            "custom": 200
          },
          "yearly": {
            "1500": 46230,
            "2000": 46231,
            "2500": 46232,
            "3500": 46233,
            "5000": 46234,
            "custom": 500
          }
        },
        "NZD": {
          "once": {
            "1000": 46058,
            "1500": 46059,
            "2000": 46060,
            "3500": 46062,
            "5000": 46063,
            "custom": 500
          },
          "monthly": {
            "199": 46215,
            "299": 46216,
            "399": 46217,
            "499": 46218,
            "999": 46219,
            "custom": 199
          },
          "yearly": {
            "1000": 46220,
            "1500": 46221,
            "2000": 46222,
            "3500": 46223,
            "5000": 46224,
            "custom": 500
          }
        },
        "CHF": {
          "once": {
            "1000": 46043,
            "1500": 46044,
            "2000": 46045,
            "3500": 46046,
            "5000": 46047,
            "custom": 500
          },
          "monthly": {
            "199": 46185,
            "299": 46186,
            "399": 46187,
            "499": 46188,
            "999": 46189,
            "custom": 199
          },
          "yearly": {
            "1000": 46190,
            "1500": 46191,
            "2000": 46192,
            "3500": 46193,
            "5000": 46194,
            "custom": 500
          }
        },
        "RUB": {
          "once": {
            "25000": 46069,
            "50000": 46070,
            "100000": 46071,
            "250000": 46072,
            "500000": 46073,
            "custom": 25000
          },
          "monthly": {
            "15000": 46235,
            "25000": 46236,
            "40000": 46237,
            "50000": 46238,
            "100000": 46239,
            "custom": 15000
          },
          "yearly": {
            "25000": 46240,
            "50000": 46241,
            "100000": 46242,
            "250000": 46243,
            "500000": 46244,
            "custom": 25000
          }
        }
      }
    },
    live: {
      vendor: 164164,
      products: {
        "USD": {
          "once": {
            "1000": 816549,
            "1500": 816550,
            "2000": 816551,
            "3500": 816552,
            "5000": 816553,
            "custom": 500
          },
          "monthly": {
            "199": 816774,
            "299": 816775,
            "399": 816776,
            "499": 816777,
            "999": 816778,
            "custom": 199
          },
          "yearly": {
            "1000": 816779,
            "1500": 816780,
            "2000": 816781,
            "3500": 816782,
            "5000": 816783,
            "custom": 500
          }
        },
        "AUD": {
          "once": {
            "1000": 816522,
            "1500": 816523,
            "2000": 816524,
            "3500": 816525,
            "5000": 816526,
            "custom": 500
          },
          "monthly": {
            "199": 816692,
            "299": 816693,
            "399": 816694,
            "499": 816696,
            "999": 816697,
            "custom": 199
          },
          "yearly": {
            "1000": 816699,
            "1500": 816700,
            "2000": 816702,
            "3500": 816703,
            "5000": 816705,
            "custom": 500
          }
        },
        "CAD": {
          "once": {
            "1000": 816528,
            "1500": 816529,
            "2000": 816530,
            "3500": 816531,
            "5000": 816532,
            "custom": 500
          },
          "monthly": {
            "199": 816706,
            "299": 816708,
            "399": 816710,
            "499": 816711,
            "999": 816712,
            "custom": 199
          },
          "yearly": {
            "1000": 816714,
            "1500": 816715,
            "2000": 816716,
            "3500": 816717,
            "5000": 816718,
            "custom": 500
          }
        },
        "EUR": {
          "once": {
            "1000": 816517,
            "1500": 816518,
            "2000": 816519,
            "3500": 816520,
            "5000": 816521,
            "custom": 500
          },
          "monthly": {
            "199": 816681,
            "299": 816682,
            "399": 816683,
            "499": 816684,
            "999": 816686,
            "custom": 199
          },
          "yearly": {
            "1000": 816687,
            "1500": 816688,
            "2000": 816689,
            "3500": 816690,
            "5000": 816691,
            "custom": 500
          }
        },
        "GBP": {
          "once": {
            "1000": 816538,
            "1500": 816539,
            "2000": 816540,
            "3500": 816541,
            "5000": 816542,
            "custom": 500
          },
          "monthly": {
            "199": 816734,
            "299": 816735,
            "399": 816736,
            "499": 816737,
            "999": 816738,
            "custom": 199
          },
          "yearly": {
            "1000": 816739,
            "1500": 816740,
            "2000": 816741,
            "3500": 816743,
            "5000": 816744,
            "custom": 500
          }
        },
        "JPY": {
          "once": {
            "1500": 816554,
            "2000": 816555,
            "2500": 816556,
            "3500": 816557,
            "5000": 816558,
            "custom": 500
          },
          "monthly": {
            "200": 816784,
            "300": 816785,
            "500": 816786,
            "1000": 816787,
            "1500": 816788,
            "custom": 200
          },
          "yearly": {
            "1500": 816789,
            "2000": 816791,
            "2500": 816792,
            "3500": 816794,
            "5000": 816795,
            "custom": 500
          }
        },
        "NZD": {
          "once": {
            "1000": 816543,
            "1500": 816544,
            "2000": 816545,
            "3500": 816547,
            "5000": 816548,
            "custom": 500
          },
          "monthly": {
            "199": 816760,
            "299": 816762,
            "399": 816764,
            "499": 816766,
            "999": 816768,
            "custom": 199
          },
          "yearly": {
            "1000": 816769,
            "1500": 816770,
            "2000": 816771,
            "3500": 816772,
            "5000": 816773,
            "custom": 500
          }
        },
        "CHF": {
          "once": {
            "1000": 816533,
            "1500": 816535,
            "2000": 816534,
            "3500": 816536,
            "5000": 816537,
            "custom": 500
          },
          "monthly": {
            "199": 816720,
            "299": 816722,
            "399": 816723,
            "499": 816725,
            "999": 816726,
            "custom": 199
          },
          "yearly": {
            "1000": 816727,
            "1500": 816728,
            "2000": 816730,
            "3500": 816731,
            "5000": 816733,
            "custom": 500
          }
        },
        "RUB": {
          "once": {
            "25000": 816559,
            "50000": 816560,
            "100000": 816561,
            "250000": 816562,
            "500000": 816563,
            "custom": 25000
          },
          "monthly": {
            "15000": 816796,
            "25000": 816797,
            "40000": 816799,
            "50000": 816800,
            "100000": 816801,
            "custom": 15000
          },
          "yearly": {
            "25000": 816802,
            "50000": 816803,
            "100000": 816804,
            "250000": 816805,
            "500000": 816806,
            "custom": 25000
          }
        }
      }
    }
  }
};

/***/ }),

/***/ "./static/components/Events.js":
/*!*************************************!*\
  !*** ./static/components/Events.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Events)
/* harmony export */ });
class Events {
  constructor() {
    this.callbacks = {};
  }
  on(event, callback) {
    if (!this.callbacks[event]) this.callbacks[event] = [];
    this.callbacks[event].push(callback);
  }
  fire(event, data) {
    if (this.callbacks[event]) {
      for (const callback of this.callbacks[event]) {
        try {
          callback(data);
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
}

/***/ }),

/***/ "./static/components/currency.js":
/*!***************************************!*\
  !*** ./static/components/currency.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toCentNumber": () => (/* binding */ toCentNumber),
/* harmony export */   "toDollarNumber": () => (/* binding */ toDollarNumber),
/* harmony export */   "toDollarString": () => (/* binding */ toDollarString)
/* harmony export */ });
/** 
 * Cent amount (int) to dollar amount (float) (for applicable currencies) 
 * 
 * @param {string} currency - 3 letter currency code
 * @param {number} cents - amount in cents (for applicable currencies)
 */
function toDollarNumber(currency, cents) {
  return currency == "JPY" ? cents : cents / 100;
}

/** 
 * Dollar amount (float) to cent amount (int) (for applicable currencies) 
 * 
 * @param {string} currency - 3 letter currency code
 * @param {number} dollar - amount in dollars (for applicable currencies)
 */
function toCentNumber(currency, dollar) {
  return currency == "JPY" ? dollar : dollar * 100;
}

/** 
 * Cent amount (int) to dollar amount (float) with localised formatting (for applicable currencies) 
 * 
 * @param {string} currency - 3 letter currency code
 * @param {number} cents - amount in cents (for applicable currencies)
 */
function toDollarString(currency, cents) {
  return new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency,
    minimumFractionDigits: 0
  }).format(toDollarNumber(currency, cents));
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************************!*\
  !*** ./static/components/AppealForm/controller.js ***!
  \****************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _configuration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configuration.js */ "./static/components/AppealForm/configuration.js");
/* harmony import */ var _AppealForm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppealForm.js */ "./static/components/AppealForm/AppealForm.js");
/* harmony import */ var _currency_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../currency.js */ "./static/components/currency.js");
/* global adblock, eyeo, Paddle */




const SANDBOX_HOSTNAMES = [/^localhost$/, /^[\w\-]+.staging-new-adblockplus-org-1.uplink.eyeo.it$/, /^dev--adblockplus-org--[\w\-]+.web.app$/];
let paddleConfig = SANDBOX_HOSTNAMES.some(originPattern => {
  return originPattern.test(location.hostname);
}) ? _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.sandbox : _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.live;
if (adblock.searchParameters.has("testmode") || adblock.searchParameters.get("mode") == "test") {
  paddleConfig = _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.sandbox;
} else if (adblock.searchParameters.get("mode") == "live") {
  paddleConfig = _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.live;
}
adblock.config.paddle = paddleConfig;
const isTestmode = paddleConfig == _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.Paddle.sandbox;
if (isTestmode) Paddle.Environment.set("sandbox");
Paddle.Setup({
  vendor: paddleConfig.vendor
});
const placeholder = document.querySelector(".appeal-form");
const formConfig = _configuration_js__WEBPACK_IMPORTED_MODULE_0__.CONFIGURATION.AppealForm;
const appealForm = adblock.runtime.appealForm = new _AppealForm_js__WEBPACK_IMPORTED_MODULE_1__.AppealForm({
  paddleConfig,
  formConfig,
  placeholder
});
eyeo = eyeo || {};
eyeo.payment = eyeo.payment || {};
function getCompletedUrl() {
  if (typeof eyeo != "object" || typeof eyeo.payment != "object" || typeof eyeo.payment.paymentCompleteUrl != "string") {
    return "/payment-complete";
  } else {
    return eyeo.payment.paymentCompleteUrl;
  }
}
appealForm.events.on(_AppealForm_js__WEBPACK_IMPORTED_MODULE_1__.AppealForm.EVENTS.SUBMIT, data => {
  appealForm.disable();
  const language = document.documentElement.lang || "en";
  const clickTimestamp = Date.now();
  const contributionInfo = JSON.stringify({
    amount: data.amount,
    frequency: data.frequency,
    processor: "paddle",
    currency: data.currency,
    lang: document.documentElement.lang,
    source: document.documentElement.getAttribute("data-page"),
    clickTs: clickTimestamp
  });
  const successParameters = new URLSearchParams();
  if (eyeo.payment.productId == "ME") {
    const _userid = forceGetUserId();
    successParameters.set("premium-checkout__handoff", 1);
    successParameters.set("premium-checkout__flow", document.documentElement.getAttribute("data-page"));
    successParameters.set("premium-checkout__userid", _userid);
    successParameters.set("premium-checkout__currency", data.currency);
    successParameters.set("premium-checkout__amount", data.amount);
    successParameters.set("premium-checkout__frequency", data.frequency);
    successParameters.set("premium-checkout__language", language);
    successParameters.set("premium-checkout__timestamp", clickTimestamp);
  }

  // Storing information to be consumed by optimizely and hotjar experiments
  if (eyeo.payment.shouldStoreContributionInfo) {
    localStorage.setItem("contributionInfo", contributionInfo);
  }
  let successURL = eyeo.payment.paymentCompleteUrl || "/payment-complete";
  if (false == successURL.startsWith("https://")) successURL = `/${language}/${successURL}`;
  const passthrough = {
    testmode: isTestmode,
    userid: eyeo.payment.productId == "ME" ? forceGetUserId() : "",
    tracking: recordTracking(),
    locale: "",
    country: "unknown",
    ga_id: "",
    premium: eyeo.payment.productId == "ME" ? "true" : "false",
    premium_cid: "0",
    premium_sid: "0",
    currency: data.currency,
    recurring: data.frequency != "once",
    subType: data.frequency != "once" ? data.frequency : "",
    experiment: "",
    experiment_id: "",
    variant: "",
    variant_index: -1,
    amount_cents: parseInt(data.amount, 10),
    success_url: `${successURL}?${successParameters.toString()}`,
    cancel_url: location.href
  };
  const product = data.product;
  const checkoutOptions = {
    locale: adblock.settings.language,
    title: adblock.strings["appeal-form-checkout__title"],
    success: passthrough.success_url,
    closeCallback: () => {
      appealForm.enable();
    }
  };
  if (product == "custom") {
    fetch("https://abp-payments.ey.r.appspot.com/paddle/generate-pay-link", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(passthrough)
    }).then(response => response.json()).then(session => {
      if (session.hasOwnProperty("success") && session.success == false) {
        throw new Error();
      }
      Paddle.Checkout.open(Object.assign(checkoutOptions, {
        override: session.url
      }));
    }).catch(error => {
      adblock.error(adblock.strings["error--unexpected"]);
      appealForm.enable();
    });
  } else {
    Paddle.Checkout.open(Object.assign(checkoutOptions, {
      allowQuantity: false,
      passthrough,
      product
    }));
  }
});
})();

/******/ })()
;
'use strict';

const installedParams = new URLSearchParams(window.location.search);
const currentBrowser = installedParams.get('ap');

if (currentBrowser.toLowerCase() === "firefox") {
  const version = installedParams.get('av');

  const shouldShowDataCollectionText = (v1, v2) => {
    const thisVersion = v1.split(".").map((number) => parseInt(number));
    const lastUnsupported = v2.split(".").map((number) => parseInt(number));
    return thisVersion.some((num, i) => num > lastUnsupported[i]);
  };

  // List of release versions here: https://blog.adblockplus.org/releases
  // 3.22 introduced the content script logic to listen to the hyperlink click
  // 3.21.1 is the latest version without that support
  if (version && shouldShowDataCollectionText(version, "3.21.1")) {
    document.getElementById('fx-data-collection').style.display = 'block';
  }
}
