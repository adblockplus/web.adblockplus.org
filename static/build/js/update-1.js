/*! (c) Andrea Giammarchi - ISC */
var self=this||{};try{!function(t,e){if(new t("q=%2B").get("q")!==e||new t({q:e}).get("q")!==e||new t([["q",e]]).get("q")!==e||"q=%0A"!==new t("q=\n").toString()||"q=+%26"!==new t({q:" &"}).toString()||"q=%25zx"!==new t({q:"%zx"}).toString())throw t;self.URLSearchParams=t}(URLSearchParams,"+")}catch(t){!function(t,a,o){"use strict";var u=t.create,h=t.defineProperty,e=/[!'\(\)~]|%20|%00/g,n=/%(?![0-9a-fA-F]{2})/g,r=/\+/g,i={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"},s={append:function(t,e){p(this._ungap,t,e)},delete:function(t){delete this._ungap[t]},get:function(t){return this.has(t)?this._ungap[t][0]:null},getAll:function(t){return this.has(t)?this._ungap[t].slice(0):[]},has:function(t){return t in this._ungap},set:function(t,e){this._ungap[t]=[a(e)]},forEach:function(e,n){var r=this;for(var i in r._ungap)r._ungap[i].forEach(t,i);function t(t){e.call(n,t,a(i),r)}},toJSON:function(){return{}},toString:function(){var t=[];for(var e in this._ungap)for(var n=v(e),r=0,i=this._ungap[e];r<i.length;r++)t.push(n+"="+v(i[r]));return t.join("&")}};for(var c in s)h(f.prototype,c,{configurable:!0,writable:!0,value:s[c]});function f(t){var e=u(null);switch(h(this,"_ungap",{value:e}),!0){case!t:break;case"string"==typeof t:"?"===t.charAt(0)&&(t=t.slice(1));for(var n=t.split("&"),r=0,i=n.length;r<i;r++){var a=(s=n[r]).indexOf("=");-1<a?p(e,g(s.slice(0,a)),g(s.slice(a+1))):s.length&&p(e,g(s),"")}break;case o(t):for(var s,r=0,i=t.length;r<i;r++){p(e,(s=t[r])[0],s[1])}break;case"forEach"in t:t.forEach(l,e);break;default:for(var c in t)p(e,c,t[c])}}function l(t,e){p(this,e,t)}function p(t,e,n){var r=o(n)?n.join(","):n;e in t?t[e].push(r):t[e]=[r]}function g(t){return decodeURIComponent(t.replace(n,"%25").replace(r," "))}function v(t){return encodeURIComponent(t).replace(e,d)}function d(t){return i[t]}self.URLSearchParams=f}(Object,String,Array.isArray)}!function(d){var r=!1;try{r=!!Symbol.iterator}catch(t){}function t(t,e){var n=[];return t.forEach(e,n),r?n[Symbol.iterator]():{next:function(){var t=n.shift();return{done:void 0===t,value:t}}}}"forEach"in d||(d.forEach=function(n,r){var i=this,t=Object.create(null);this.toString().replace(/=[\s\S]*?(?:&|$)/g,"=").split("=").forEach(function(e){!e.length||e in t||(t[e]=i.getAll(e)).forEach(function(t){n.call(r,t,e,i)})})}),"keys"in d||(d.keys=function(){return t(this,function(t,e){this.push(e)})}),"values"in d||(d.values=function(){return t(this,function(t,e){this.push(t)})}),"entries"in d||(d.entries=function(){return t(this,function(t,e){this.push([e,t])})}),!r||Symbol.iterator in d||(d[Symbol.iterator]=d.entries),"sort"in d||(d.sort=function(){for(var t,e,n,r=this.entries(),i=r.next(),a=i.done,s=[],c=Object.create(null);!a;)e=(n=i.value)[0],s.push(e),e in c||(c[e]=[]),c[e].push(n[1]),a=(i=r.next()).done;for(s.sort(),t=0;t<s.length;t++)this.delete(s[t]);for(t=0;t<s.length;t++)e=s[t],this.append(e,c[e].shift())}),function(f){function l(t){var e=t.append;t.append=d.append,URLSearchParams.call(t,t._usp.search.slice(1)),t.append=e}function p(t,e){if(!(t instanceof e))throw new TypeError("'searchParams' accessed on an object that does not implement interface "+e.name)}function t(e){var n,r,i,t=e.prototype,a=v(t,"searchParams"),s=v(t,"href"),c=v(t,"search");function o(t,e){d.append.call(this,t,e),t=this.toString(),i.set.call(this._usp,t?"?"+t:"")}function u(t){d.delete.call(this,t),t=this.toString(),i.set.call(this._usp,t?"?"+t:"")}function h(t,e){d.set.call(this,t,e),t=this.toString(),i.set.call(this._usp,t?"?"+t:"")}!a&&c&&c.set&&(i=c,r=function(t,e){return t.append=o,t.delete=u,t.set=h,g(t,"_usp",{configurable:!0,writable:!0,value:e})},n=function(t,e){return g(t,"_searchParams",{configurable:!0,writable:!0,value:r(e,t)}),e},f.defineProperties(t,{href:{get:function(){return s.get.call(this)},set:function(t){var e=this._searchParams;s.set.call(this,t),e&&l(e)}},search:{get:function(){return c.get.call(this)},set:function(t){var e=this._searchParams;c.set.call(this,t),e&&l(e)}},searchParams:{get:function(){return p(this,e),this._searchParams||n(this,new URLSearchParams(this.search.slice(1)))},set:function(t){p(this,e),n(this,t)}}}))}var g=f.defineProperty,v=f.getOwnPropertyDescriptor;try{t(HTMLAnchorElement),/^function|object$/.test(typeof URL)&&URL.prototype&&t(URL)}catch(t){}}(Object)}(self.URLSearchParams.prototype,Object);
/**
 * @license
 * Lodash (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash include="each,template,isNumber,isArray,toNumber,isFinite,toArray,extend" exports="global"`
 */
;(function(){function t(t,r,n){switch(n.length){case 0:return t.call(r);case 1:return t.call(r,n[0]);case 2:return t.call(r,n[0],n[1]);case 3:return t.call(r,n[0],n[1],n[2])}return t.apply(r,n)}function r(t,r){for(var n=-1,e=null==t?0:t.length;++n<e&&r(t[n],n,t)!==false;);return t}function n(t,r){for(var n=-1,e=null==t?0:t.length,u=0,o=[];++n<e;){var i=t[n];r(i,n,t)&&(o[u++]=i)}return o}function e(t,r){for(var n=-1,e=null==t?0:t.length,u=Array(e);++n<e;)u[n]=r(t[n],n,t);return u}function u(t,r){for(var n=-1,e=r.length,u=t.length;++n<e;)t[u+n]=r[n];
return t}function o(t,r){for(var n=-1,e=null==t?0:t.length;++n<e;)if(r(t[n],n,t))return true;return false}function i(t){return t.split("")}function c(t){return function(r){return null==r?Vr:r[t]}}function a(t){return function(r){return null==t?Vr:t[r]}}function f(t,r){for(var n=-1,e=Array(t);++n<t;)e[n]=r(n);return e}function s(t){return function(r){return t(r)}}function l(t,r){return e(r,function(r){return t[r]})}function p(t,r){return t.has(r)}function h(t){return"\\"+Le[t]}function _(t,r){return null==t?Vr:t[r];
}function v(t){return Ee.test(t)}function y(t){for(var r,n=[];!(r=t.next()).done;)n.push(r.value);return n}function b(t){var r=-1,n=Array(t.size);return t.forEach(function(t,e){n[++r]=[e,t]}),n}function g(t,r){return function(n){return t(r(n))}}function d(t){var r=-1,n=Array(t.size);return t.forEach(function(t){n[++r]=t}),n}function j(t){return v(t)?w(t):i(t)}function w(t){return t.match(Se)||[]}function m(){}function O(t){var r=-1,n=null==t?0:t.length;for(this.clear();++r<n;){var e=t[r];this.set(e[0],e[1]);
}}function A(){this.__data__=Au?Au(null):{},this.size=0}function x(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r}function z(t){var r=this.__data__;if(Au){var n=r[t];return n===Jr?Vr:n}return Xe.call(r,t)?r[t]:Vr}function S(t){var r=this.__data__;return Au?r[t]!==Vr:Xe.call(r,t)}function E(t,r){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=Au&&r===Vr?Jr:r,this}function $(t){var r=-1,n=null==t?0:t.length;for(this.clear();++r<n;){var e=t[r];this.set(e[0],e[1])}
}function k(){this.__data__=[],this.size=0}function I(t){var r=this.__data__,n=Y(r,t);return!(n<0)&&(n==r.length-1?r.pop():fu.call(r,n,1),--this.size,true)}function L(t){var r=this.__data__,n=Y(r,t);return n<0?Vr:r[n][1]}function F(t){return Y(this.__data__,t)>-1}function R(t,r){var n=this.__data__,e=Y(n,t);return e<0?(++this.size,n.push([t,r])):n[e][1]=r,this}function P(t){var r=-1,n=null==t?0:t.length;for(this.clear();++r<n;){var e=t[r];this.set(e[0],e[1])}}function U(){this.size=0,this.__data__={
hash:new O,map:new(ju||$),string:new O}}function M(t){var r=qt(this,t).delete(t);return this.size-=r?1:0,r}function N(t){return qt(this,t).get(t)}function T(t){return qt(this,t).has(t)}function B(t,r){var n=qt(this,t),e=n.size;return n.set(t,r),this.size+=n.size==e?0:1,this}function C(t){var r=-1,n=null==t?0:t.length;for(this.__data__=new P;++r<n;)this.add(t[r])}function D(t){return this.__data__.set(t,Jr),this}function W(t){return this.__data__.has(t)}function V(t){this.size=(this.__data__=new $(t)).size;
}function q(){this.__data__=new $,this.size=0}function G(t){var r=this.__data__,n=r.delete(t);return this.size=r.size,n}function H(t){return this.__data__.get(t)}function J(t){return this.__data__.has(t)}function K(t,r){var n=this.__data__;if(n instanceof $){var e=n.__data__;if(!ju||e.length<Gr-1)return e.push([t,r]),this.size=++n.size,this;n=this.__data__=new P(e)}return n.set(t,r),this.size=n.size,this}function Q(t,r){var n=Wu(t),e=!n&&Du(t),u=!n&&!e&&Vu(t),o=!n&&!e&&!u&&Hu(t),i=n||e||u||o,c=i?f(t.length,String):[],a=c.length;
for(var s in t)!r&&!Xe.call(t,s)||i&&("length"==s||u&&("offset"==s||"parent"==s)||o&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||Zt(s,a))||c.push(s);return c}function X(t,r,n){var e=t[r];Xe.call(t,r)&&yr(e,n)&&(n!==Vr||r in t)||rt(t,r,n)}function Y(t,r){for(var n=t.length;n--;)if(yr(t[n][0],r))return n;return-1}function Z(t,r){return t&&Lt(r,Fr(r),t)}function tt(t,r){return t&&Lt(r,Rr(r),t)}function rt(t,r,n){"__proto__"==r&&pu?pu(t,r,{configurable:true,enumerable:true,value:n,writable:true}):t[r]=n;
}function nt(t,n,e,u,o,i){var c,a=n&Qr,f=n&Xr,s=n&Yr;if(e&&(c=o?e(t,u,o,i):e(t)),c!==Vr)return c;if(!mr(t))return t;var l=Wu(t);if(l){if(c=Qt(t),!a)return It(t,c)}else{var p=Tu(t),h=p==_n||p==vn;if(Vu(t))return xt(t,a);if(p==dn||p==cn||h&&!o){if(c=f||h?{}:Xt(t),!a)return f?Rt(t,tt(c,t)):Ft(t,Z(c,t))}else{if(!ke[p])return o?t:{};c=Yt(t,p,a)}}i||(i=new V);var _=i.get(t);if(_)return _;if(i.set(t,c),Gu(t))return t.forEach(function(r){c.add(nt(r,n,e,r,t,i))}),c;if(qu(t))return t.forEach(function(r,u){
c.set(u,nt(r,n,e,u,t,i))}),c;var v=s?f?Wt:Dt:f?Rr:Fr,y=l?Vr:v(t);return r(y||t,function(r,u){y&&(u=r,r=t[u]),X(c,u,nt(r,n,e,u,t,i))}),c}function et(t,r){return t&&Pu(t,r,Fr)}function ut(t,r){r=At(r,t);for(var n=0,e=r.length;null!=t&&n<e;)t=t[pr(r[n++])];return n&&n==e?t:Vr}function ot(t,r,n){var e=r(t);return Wu(t)?e:u(e,n(t))}function it(t){return null==t?t===Vr?zn:gn:lu&&lu in Object(t)?Jt(t):fr(t)}function ct(t,r){return null!=t&&r in Object(t)}function at(t){return Or(t)&&it(t)==cn}function ft(t,r,n,e,u){
return t===r||(null==t||null==r||!Or(t)&&!Or(r)?t!==t&&r!==r:st(t,r,n,e,ft,u))}function st(t,r,n,e,u,o){var i=Wu(t),c=Wu(r),a=i?an:Tu(t),f=c?an:Tu(r);a=a==cn?dn:a,f=f==cn?dn:f;var s=a==dn,l=f==dn,p=a==f;if(p&&Vu(t)){if(!Vu(r))return false;i=true,s=false}if(p&&!s)return o||(o=new V),i||Hu(t)?Tt(t,r,n,e,u,o):Bt(t,r,a,n,e,u,o);if(!(n&Zr)){var h=s&&Xe.call(t,"__wrapped__"),_=l&&Xe.call(r,"__wrapped__");if(h||_){var v=h?t.value():t,y=_?r.value():r;return o||(o=new V),u(v,y,n,e,o)}}return!!p&&(o||(o=new V),Ct(t,r,n,e,u,o));
}function lt(t){return Or(t)&&Tu(t)==yn}function pt(t,r,n,e){var u=n.length,o=u,i=!e;if(null==t)return!o;for(t=Object(t);u--;){var c=n[u];if(i&&c[2]?c[1]!==t[c[0]]:!(c[0]in t))return false}for(;++u<o;){c=n[u];var a=c[0],f=t[a],s=c[1];if(i&&c[2]){if(f===Vr&&!(a in t))return false}else{var l=new V;if(e)var p=e(f,s,a,t,r,l);if(!(p===Vr?ft(s,f,Zr|tn,e,l):p))return false}}return true}function ht(t){return!(!mr(t)||er(t))&&(jr(t)?ru:ee).test(hr(t))}function _t(t){return Or(t)&&Tu(t)==On}function vt(t){return Or(t)&&wr(t.length)&&!!$e[it(t)];
}function yt(t){return typeof t=="function"?t:null==t?Tr:typeof t=="object"?Wu(t)?jt(t[0],t[1]):dt(t):Cr(t)}function bt(t){if(!ur(t))return yu(t);var r=[];for(var n in Object(t))Xe.call(t,n)&&"constructor"!=n&&r.push(n);return r}function gt(t){if(!mr(t))return ar(t);var r=ur(t),n=[];for(var e in t)("constructor"!=e||!r&&Xe.call(t,e))&&n.push(e);return n}function dt(t){var r=Gt(t);return 1==r.length&&r[0][2]?ir(r[0][0],r[0][1]):function(n){return n===t||pt(n,t,r)}}function jt(t,r){return rr(t)&&or(r)?ir(pr(t),r):function(n){
var e=Ir(n,t);return e===Vr&&e===r?Lr(n,t):ft(r,e,Zr|tn)}}function wt(t){return function(r){return ut(r,t)}}function mt(t,r){return Bu(sr(t,r,Tr),t+"")}function Ot(t){if(typeof t=="string")return t;if(Wu(t))return e(t,Ot)+"";if(Sr(t))return Lu?Lu.call(t):"";var r=t+"";return"0"==r&&1/t==-en?"-0":r}function At(t,r){return Wu(t)?t:rr(t,r)?[t]:Cu(kr(t))}function xt(t,r){if(r)return t.slice();var n=t.length,e=ou?ou(n):new t.constructor(n);return t.copy(e),e}function zt(t){var r=new t.constructor(t.byteLength);
return new uu(r).set(new uu(t)),r}function St(t,r){return new t.constructor(r?zt(t.buffer):t.buffer,t.byteOffset,t.byteLength)}function Et(t){var r=new t.constructor(t.source,te.exec(t));return r.lastIndex=t.lastIndex,r}function $t(t){return Iu?Object(Iu.call(t)):{}}function kt(t,r){return new t.constructor(r?zt(t.buffer):t.buffer,t.byteOffset,t.length)}function It(t,r){var n=-1,e=t.length;for(r||(r=Array(e));++n<e;)r[n]=t[n];return r}function Lt(t,r,n,e){var u=!n;n||(n={});for(var o=-1,i=r.length;++o<i;){
var c=r[o],a=e?e(n[c],t[c],c,n,t):Vr;a===Vr&&(a=t[c]),u?rt(n,c,a):X(n,c,a)}return n}function Ft(t,r){return Lt(t,Mu(t),r)}function Rt(t,r){return Lt(t,Nu(t),r)}function Pt(t){return mt(function(r,n){var e=-1,u=n.length,o=u>1?n[u-1]:Vr,i=u>2?n[2]:Vr;for(o=t.length>3&&typeof o=="function"?(u--,o):Vr,i&&tr(n[0],n[1],i)&&(o=u<3?Vr:o,u=1),r=Object(r);++e<u;){var c=n[e];c&&t(r,c,e,o)}return r})}function Ut(t,r){return function(n,e){if(null==n)return n;if(!br(n))return t(n,e);for(var u=n.length,o=r?u:-1,i=Object(n);(r?o--:++o<u)&&e(i[o],o,i)!==false;);
return n}}function Mt(t){return function(r,n,e){for(var u=-1,o=Object(r),i=e(r),c=i.length;c--;){var a=i[t?c:++u];if(n(o[a],a,o)===false)break}return r}}function Nt(t,r,n,e){return t===Vr||yr(t,Je[n])&&!Xe.call(e,n)?r:t}function Tt(t,r,n,e,u,i){var c=n&Zr,a=t.length,f=r.length;if(a!=f&&!(c&&f>a))return false;var s=i.get(t);if(s&&i.get(r))return s==r;var l=-1,h=true,_=n&tn?new C:Vr;for(i.set(t,r),i.set(r,t);++l<a;){var v=t[l],y=r[l];if(e)var b=c?e(y,v,l,r,t,i):e(v,y,l,t,r,i);if(b!==Vr){if(b)continue;h=false;break;
}if(_){if(!o(r,function(t,r){if(!p(_,r)&&(v===t||u(v,t,n,e,i)))return _.push(r)})){h=false;break}}else if(v!==y&&!u(v,y,n,e,i)){h=false;break}}return i.delete(t),i.delete(r),h}function Bt(t,r,n,e,u,o,i){switch(n){case $n:if(t.byteLength!=r.byteLength||t.byteOffset!=r.byteOffset)return false;t=t.buffer,r=r.buffer;case En:return!(t.byteLength!=r.byteLength||!o(new uu(t),new uu(r)));case sn:case ln:case bn:return yr(+t,+r);case hn:return t.name==r.name&&t.message==r.message;case mn:case An:return t==r+"";case yn:
var c=b;case On:var a=e&Zr;if(c||(c=d),t.size!=r.size&&!a)return false;var f=i.get(t);if(f)return f==r;e|=tn,i.set(t,r);var s=Tt(c(t),c(r),e,u,o,i);return i.delete(t),s;case xn:if(Iu)return Iu.call(t)==Iu.call(r)}return false}function Ct(t,r,n,e,u,o){var i=n&Zr,c=Dt(t),a=c.length;if(a!=Dt(r).length&&!i)return false;for(var f=a;f--;){var s=c[f];if(!(i?s in r:Xe.call(r,s)))return false}var l=o.get(t);if(l&&o.get(r))return l==r;var p=true;o.set(t,r),o.set(r,t);for(var h=i;++f<a;){s=c[f];var _=t[s],v=r[s];if(e)var y=i?e(v,_,s,r,t,o):e(_,v,s,t,r,o);
if(!(y===Vr?_===v||u(_,v,n,e,o):y)){p=false;break}h||(h="constructor"==s)}if(p&&!h){var b=t.constructor,g=r.constructor;b!=g&&"constructor"in t&&"constructor"in r&&!(typeof b=="function"&&b instanceof b&&typeof g=="function"&&g instanceof g)&&(p=false)}return o.delete(t),o.delete(r),p}function Dt(t){return ot(t,Fr,Mu)}function Wt(t){return ot(t,Rr,Nu)}function Vt(){var t=m.iteratee||Br;return t=t===Br?yt:t,arguments.length?t(arguments[0],arguments[1]):t}function qt(t,r){var n=t.__data__;return nr(r)?n[typeof r=="string"?"string":"hash"]:n.map;
}function Gt(t){for(var r=Fr(t),n=r.length;n--;){var e=r[n],u=t[e];r[n]=[e,u,or(u)]}return r}function Ht(t,r){var n=_(t,r);return ht(n)?n:Vr}function Jt(t){var r=Xe.call(t,lu),n=t[lu];try{t[lu]=Vr;var e=true}catch(t){}var u=Ze.call(t);return e&&(r?t[lu]=n:delete t[lu]),u}function Kt(t,r,n){r=At(r,t);for(var e=-1,u=r.length,o=false;++e<u;){var i=pr(r[e]);if(!(o=null!=t&&n(t,i)))break;t=t[i]}return o||++e!=u?o:(u=null==t?0:t.length,!!u&&wr(u)&&Zt(i,u)&&(Wu(t)||Du(t)))}function Qt(t){var r=t.length,n=new t.constructor(r);
return r&&"string"==typeof t[0]&&Xe.call(t,"index")&&(n.index=t.index,n.input=t.input),n}function Xt(t){return typeof t.constructor!="function"||ur(t)?{}:Fu(iu(t))}function Yt(t,r,n){var e=t.constructor;switch(r){case En:return zt(t);case sn:case ln:return new e(+t);case $n:return St(t,n);case kn:case In:case Ln:case Fn:case Rn:case Pn:case Un:case Mn:case Nn:return kt(t,n);case yn:return new e;case bn:case An:return new e(t);case mn:return Et(t);case On:return new e;case xn:return $t(t)}}function Zt(t,r){
var n=typeof t;return r=null==r?un:r,!!r&&("number"==n||"symbol"!=n&&oe.test(t))&&t>-1&&t%1==0&&t<r}function tr(t,r,n){if(!mr(n))return false;var e=typeof r;return!!("number"==e?br(n)&&Zt(r,n.length):"string"==e&&r in n)&&yr(n[r],t)}function rr(t,r){if(Wu(t))return false;var n=typeof t;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!Sr(t))||(Jn.test(t)||!Hn.test(t)||null!=r&&t in Object(r))}function nr(t){var r=typeof t;return"string"==r||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==t:null===t;
}function er(t){return!!Ye&&Ye in t}function ur(t){var r=t&&t.constructor;return t===(typeof r=="function"&&r.prototype||Je)}function or(t){return t===t&&!mr(t)}function ir(t,r){return function(n){return null!=n&&(n[t]===r&&(r!==Vr||t in Object(n)))}}function cr(t){var r=vr(t,function(t){return n.size===Kr&&n.clear(),t}),n=r.cache;return r}function ar(t){var r=[];if(null!=t)for(var n in Object(t))r.push(n);return r}function fr(t){return Ze.call(t)}function sr(r,n,e){return n=bu(n===Vr?r.length-1:n,0),
function(){for(var u=arguments,o=-1,i=bu(u.length-n,0),c=Array(i);++o<i;)c[o]=u[n+o];o=-1;for(var a=Array(n+1);++o<n;)a[o]=u[o];return a[n]=e(c),t(r,this,a)}}function lr(t){var r=0,n=0;return function(){var e=gu(),u=nn-(e-n);if(n=e,u>0){if(++r>=rn)return arguments[0]}else r=0;return t.apply(Vr,arguments)}}function pr(t){if(typeof t=="string"||Sr(t))return t;var r=t+"";return"0"==r&&1/t==-en?"-0":r}function hr(t){if(null!=t){try{return Qe.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function _r(t,n){
return(Wu(t)?r:Ru)(t,Vt(n,3))}function vr(t,r){if(typeof t!="function"||null!=r&&typeof r!="function")throw new TypeError(Hr);var n=function(){var e=arguments,u=r?r.apply(this,e):e[0],o=n.cache;if(o.has(u))return o.get(u);var i=t.apply(this,e);return n.cache=o.set(u,i)||o,i};return n.cache=new(vr.Cache||P),n}function yr(t,r){return t===r||t!==t&&r!==r}function br(t){return null!=t&&wr(t.length)&&!jr(t)}function gr(t){if(!Or(t))return false;var r=it(t);return r==hn||r==pn||typeof t.message=="string"&&typeof t.name=="string"&&!xr(t);
}function dr(t){return typeof t=="number"&&vu(t)}function jr(t){if(!mr(t))return false;var r=it(t);return r==_n||r==vn||r==fn||r==wn}function wr(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=un}function mr(t){var r=typeof t;return null!=t&&("object"==r||"function"==r)}function Or(t){return null!=t&&typeof t=="object"}function Ar(t){return typeof t=="number"||Or(t)&&it(t)==bn}function xr(t){if(!Or(t)||it(t)!=dn)return false;var r=iu(t);if(null===r)return true;var n=Xe.call(r,"constructor")&&r.constructor;return typeof n=="function"&&n instanceof n&&Qe.call(n)==tu;
}function zr(t){return typeof t=="string"||!Wu(t)&&Or(t)&&it(t)==An}function Sr(t){return typeof t=="symbol"||Or(t)&&it(t)==xn}function Er(t){if(!t)return[];if(br(t))return zr(t)?j(t):It(t);if(su&&t[su])return y(t[su]());var r=Tu(t);return(r==yn?b:r==On?d:Pr)(t)}function $r(t){if(typeof t=="number")return t;if(Sr(t))return on;if(mr(t)){var r=typeof t.valueOf=="function"?t.valueOf():t;t=mr(r)?r+"":r}if(typeof t!="string")return 0===t?t:+t;t=t.replace(Xn,"");var n=ne.test(t);return n||ue.test(t)?Fe(t.slice(2),n?2:8):re.test(t)?on:+t;
}function kr(t){return null==t?"":Ot(t)}function Ir(t,r,n){var e=null==t?Vr:ut(t,r);return e===Vr?n:e}function Lr(t,r){return null!=t&&Kt(t,r,ct)}function Fr(t){return br(t)?Q(t):bt(t)}function Rr(t){return br(t)?Q(t,true):gt(t)}function Pr(t){return null==t?[]:l(t,Fr(t))}function Ur(t){return t=kr(t),t&&Wn.test(t)?t.replace(Dn,qe):t}function Mr(t,r,n){var e=m.templateSettings;n&&tr(t,r,n)&&(r=Vr),t=kr(t),r=Ku({},r,e,Nt);var u,o,i=Ku({},r.imports,e.imports,Nt),c=Fr(i),a=l(i,c),f=0,s=r.interpolate||ie,p="__p+='",_="sourceURL"in r?"//# sourceURL="+r.sourceURL+"\n":"";
t.replace(RegExp((r.escape||ie).source+"|"+s.source+"|"+(s===Gn?Zn:ie).source+"|"+(r.evaluate||ie).source+"|$","g"),function(r,n,e,i,c,a){return e||(e=i),p+=t.slice(f,a).replace(ce,h),n&&(u=true,p+="'+__e("+n+")+'"),c&&(o=true,p+="';"+c+";\n__p+='"),e&&(p+="'+((__t=("+e+"))==null?'':__t)+'"),f=a+r.length,r}),p+="';";var v=r.variable;v||(p="with(obj){"+p+"}"),p=(o?p.replace(Tn,""):p).replace(Bn,"$1").replace(Cn,"$1;"),p="function("+(v||"obj")+"){"+(v?"":"obj||(obj={});")+"var __t,__p=''"+(u?",__e=_.escape":"")+(o?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+p+"return __p}";
var y=Qu(function(){return Function(c,_+"return "+p).apply(Vr,a)});if(y.source=p,gr(y))throw y;return y}function Nr(t){return function(){return t}}function Tr(t){return t}function Br(t){return yt(typeof t=="function"?t:nt(t,Qr))}function Cr(t){return rr(t)?c(pr(t)):wt(t)}function Dr(){return[]}function Wr(){return false}var Vr,qr="4.17.5",Gr=200,Hr="Expected a function",Jr="__lodash_hash_undefined__",Kr=500,Qr=1,Xr=2,Yr=4,Zr=1,tn=2,rn=800,nn=16,en=1/0,un=9007199254740991,on=NaN,cn="[object Arguments]",an="[object Array]",fn="[object AsyncFunction]",sn="[object Boolean]",ln="[object Date]",pn="[object DOMException]",hn="[object Error]",_n="[object Function]",vn="[object GeneratorFunction]",yn="[object Map]",bn="[object Number]",gn="[object Null]",dn="[object Object]",jn="[object Promise]",wn="[object Proxy]",mn="[object RegExp]",On="[object Set]",An="[object String]",xn="[object Symbol]",zn="[object Undefined]",Sn="[object WeakMap]",En="[object ArrayBuffer]",$n="[object DataView]",kn="[object Float32Array]",In="[object Float64Array]",Ln="[object Int8Array]",Fn="[object Int16Array]",Rn="[object Int32Array]",Pn="[object Uint8Array]",Un="[object Uint8ClampedArray]",Mn="[object Uint16Array]",Nn="[object Uint32Array]",Tn=/\b__p\+='';/g,Bn=/\b(__p\+=)''\+/g,Cn=/(__e\(.*?\)|\b__t\))\+'';/g,Dn=/[&<>"']/g,Wn=RegExp(Dn.source),Vn=/<%-([\s\S]+?)%>/g,qn=/<%([\s\S]+?)%>/g,Gn=/<%=([\s\S]+?)%>/g,Hn=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Jn=/^\w*$/,Kn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Qn=/[\\^$.*+?()[\]{}|]/g,Xn=/^\s+|\s+$/g,Yn=/\\(\\)?/g,Zn=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,te=/\w*$/,re=/^[-+]0x[0-9a-f]+$/i,ne=/^0b[01]+$/i,ee=/^\[object .+?Constructor\]$/,ue=/^0o[0-7]+$/i,oe=/^(?:0|[1-9]\d*)$/,ie=/($^)/,ce=/['\n\r\u2028\u2029\\]/g,ae="\\ud800-\\udfff",fe="\\u0300-\\u036f",se="\\ufe20-\\ufe2f",le="\\u20d0-\\u20ff",pe=fe+se+le,he="\\ufe0e\\ufe0f",_e="["+ae+"]",ve="["+pe+"]",ye="\\ud83c[\\udffb-\\udfff]",be="(?:"+ve+"|"+ye+")",ge="[^"+ae+"]",de="(?:\\ud83c[\\udde6-\\uddff]){2}",je="[\\ud800-\\udbff][\\udc00-\\udfff]",we="\\u200d",me=be+"?",Oe="["+he+"]?",Ae="(?:"+we+"(?:"+[ge,de,je].join("|")+")"+Oe+me+")*",xe=Oe+me+Ae,ze="(?:"+[ge+ve+"?",ve,de,je,_e].join("|")+")",Se=RegExp(ye+"(?="+ye+")|"+ze+xe,"g"),Ee=RegExp("["+we+ae+pe+he+"]"),$e={};
$e[kn]=$e[In]=$e[Ln]=$e[Fn]=$e[Rn]=$e[Pn]=$e[Un]=$e[Mn]=$e[Nn]=true,$e[cn]=$e[an]=$e[En]=$e[sn]=$e[$n]=$e[ln]=$e[hn]=$e[_n]=$e[yn]=$e[bn]=$e[dn]=$e[mn]=$e[On]=$e[An]=$e[Sn]=false;var ke={};ke[cn]=ke[an]=ke[En]=ke[$n]=ke[sn]=ke[ln]=ke[kn]=ke[In]=ke[Ln]=ke[Fn]=ke[Rn]=ke[yn]=ke[bn]=ke[dn]=ke[mn]=ke[On]=ke[An]=ke[xn]=ke[Pn]=ke[Un]=ke[Mn]=ke[Nn]=true,ke[hn]=ke[_n]=ke[Sn]=false;var Ie={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Le={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"
},Fe=parseInt,Re=typeof global=="object"&&global&&global.Object===Object&&global,Pe=typeof self=="object"&&self&&self.Object===Object&&self,Ue=Re||Pe||Function("return this")(),Me=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Ne=Me&&typeof module=="object"&&module&&!module.nodeType&&module,Te=Ne&&Ne.exports===Me,Be=Te&&Re.process,Ce=function(){try{return Be&&Be.binding&&Be.binding("util")}catch(t){}}(),De=Ce&&Ce.isMap,We=Ce&&Ce.isSet,Ve=Ce&&Ce.isTypedArray,qe=a(Ie),Ge=Array.prototype,He=Function.prototype,Je=Object.prototype,Ke=Ue["__core-js_shared__"],Qe=He.toString,Xe=Je.hasOwnProperty,Ye=function(){
var t=/[^.]+$/.exec(Ke&&Ke.keys&&Ke.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}(),Ze=Je.toString,tu=Qe.call(Object),ru=RegExp("^"+Qe.call(Xe).replace(Qn,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),nu=Te?Ue.Buffer:Vr,eu=Ue.Symbol,uu=Ue.Uint8Array,ou=nu?nu.allocUnsafe:Vr,iu=g(Object.getPrototypeOf,Object),cu=Object.create,au=Je.propertyIsEnumerable,fu=Ge.splice,su=eu?eu.iterator:Vr,lu=eu?eu.toStringTag:Vr,pu=function(){try{var t=Ht(Object,"defineProperty");
return t({},"",{}),t}catch(t){}}(),hu=Object.getOwnPropertySymbols,_u=nu?nu.isBuffer:Vr,vu=Ue.isFinite,yu=g(Object.keys,Object),bu=Math.max,gu=Date.now,du=Ht(Ue,"DataView"),ju=Ht(Ue,"Map"),wu=Ht(Ue,"Promise"),mu=Ht(Ue,"Set"),Ou=Ht(Ue,"WeakMap"),Au=Ht(Object,"create"),xu=hr(du),zu=hr(ju),Su=hr(wu),Eu=hr(mu),$u=hr(Ou),ku=eu?eu.prototype:Vr,Iu=ku?ku.valueOf:Vr,Lu=ku?ku.toString:Vr,Fu=function(){function t(){}return function(r){if(!mr(r))return{};if(cu)return cu(r);t.prototype=r;var n=new t;return t.prototype=Vr,
n}}();m.templateSettings={escape:Vn,evaluate:qn,interpolate:Gn,variable:"",imports:{_:m}},O.prototype.clear=A,O.prototype.delete=x,O.prototype.get=z,O.prototype.has=S,O.prototype.set=E,$.prototype.clear=k,$.prototype.delete=I,$.prototype.get=L,$.prototype.has=F,$.prototype.set=R,P.prototype.clear=U,P.prototype.delete=M,P.prototype.get=N,P.prototype.has=T,P.prototype.set=B,C.prototype.add=C.prototype.push=D,C.prototype.has=W,V.prototype.clear=q,V.prototype.delete=G,V.prototype.get=H,V.prototype.has=J,
V.prototype.set=K;var Ru=Ut(et),Pu=Mt(),Uu=pu?function(t,r){return pu(t,"toString",{configurable:true,enumerable:false,value:Nr(r),writable:true})}:Tr,Mu=hu?function(t){return null==t?[]:(t=Object(t),n(hu(t),function(r){return au.call(t,r)}))}:Dr,Nu=hu?function(t){for(var r=[];t;)u(r,Mu(t)),t=iu(t);return r}:Dr,Tu=it;(du&&Tu(new du(new ArrayBuffer(1)))!=$n||ju&&Tu(new ju)!=yn||wu&&Tu(wu.resolve())!=jn||mu&&Tu(new mu)!=On||Ou&&Tu(new Ou)!=Sn)&&(Tu=function(t){var r=it(t),n=r==dn?t.constructor:Vr,e=n?hr(n):"";
if(e)switch(e){case xu:return $n;case zu:return yn;case Su:return jn;case Eu:return On;case $u:return Sn}return r});var Bu=lr(Uu),Cu=cr(function(t){var r=[];return 46===t.charCodeAt(0)&&r.push(""),t.replace(Kn,function(t,n,e,u){r.push(e?u.replace(Yn,"$1"):n||t)}),r});vr.Cache=P;var Du=at(function(){return arguments}())?at:function(t){return Or(t)&&Xe.call(t,"callee")&&!au.call(t,"callee")},Wu=Array.isArray,Vu=_u||Wr,qu=De?s(De):lt,Gu=We?s(We):_t,Hu=Ve?s(Ve):vt,Ju=Pt(function(t,r){Lt(r,Rr(r),t)}),Ku=Pt(function(t,r,n,e){
Lt(r,Rr(r),t,e)}),Qu=mt(function(r,n){try{return t(r,Vr,n)}catch(t){return gr(t)?t:Error(t)}});m.assignIn=Ju,m.assignInWith=Ku,m.constant=Nr,m.iteratee=Br,m.keys=Fr,m.keysIn=Rr,m.memoize=vr,m.property=Cr,m.toArray=Er,m.values=Pr,m.extend=Ju,m.extendWith=Ku,m.attempt=Qu,m.eq=yr,m.escape=Ur,m.forEach=_r,m.get=Ir,m.hasIn=Lr,m.identity=Tr,m.isArguments=Du,m.isArray=Wu,m.isArrayLike=br,m.isBuffer=Vu,m.isError=gr,m.isFinite=dr,m.isFunction=jr,m.isLength=wr,m.isMap=qu,m.isNumber=Ar,m.isObject=mr,m.isObjectLike=Or,
m.isPlainObject=xr,m.isSet=Gu,m.isString=zr,m.isSymbol=Sr,m.isTypedArray=Hu,m.stubArray=Dr,m.stubFalse=Wr,m.template=Mr,m.toNumber=$r,m.toString=kr,m.each=_r,m.VERSION=qr,Ue._=m}).call(this);
/* global _, eyeo */
(function(doc, _, ns, i18n){

var DEFAULT_AMOUNTS = {
  once: {
    amounts: [10, 15, 20, 35, 50],
    placeholder: 35,
    minimum: 5,
  },
  monthly: {
    amounts: [1.99, 2.99, 3.99, 4.99, 9.99],
    placeholder: 4.99,
    minimum: 1
  },
  yearly: {
    amounts: [10, 15, 20, 35, 50],
    placeholder: 35,
    minimum: 5,
  }
};

var CURRENCY_CONFIG = {
  USD: { sign: "$" },
  AUD: { sign: "$" },
  CAD: { sign: "$" },
  CHF: { sign: "CHF "},
  EUR: { sign: "€" },
  GBP: { sign: "£" },
  JPY: {
    sign: "¥",
    once: {
      amounts: [1500, 2000, 2500, 3500, 5000],
      placeholder: 3500,
      minimum: 1500
    },
    monthly: {
      amounts: [200, 300, 500, 1000, 1500],
      placeholder: 650,
      minimum: 250
    }
  },
  NZD: { sign: "$" },
  RUB: {
    sign: "₽",
    once: {
      amounts: [250, 500, 1000, 2500, 5000],
      placeholder: 2500,
      minimum: 250
    },
    monthly: {
      amounts: [150, 250, 400, 500, 1000],
      placeholder: 500,
      minimum: 150
    }
  }
}

/* Set VARIANT_CONFIG[CURRENCY][(once|monthly|yearly)] from DEFAULTS.USD
 * Except copy yearly values from once values
 */
for (var currency in CURRENCY_CONFIG) 
{
  if (!CURRENCY_CONFIG[currency].once)
    CURRENCY_CONFIG[currency].once = DEFAULT_AMOUNTS.once;
  if (!CURRENCY_CONFIG[currency].monthly)
    CURRENCY_CONFIG[currency].monthly = DEFAULT_AMOUNTS.monthly;
  if (!CURRENCY_CONFIG[currency].yearly)
    CURRENCY_CONFIG[currency].yearly = CURRENCY_CONFIG[currency].once;
}

ns.setupForm = function(_config)
{
  var defaultCurrency = _config.defaultCurrency || 'USD';
  var currencies = Object.keys(CURRENCY_CONFIG);
  // Ensure the default currency from config (not VARIANT_CONFIG) is first
  if (currencies.indexOf(defaultCurrency) != -1)
    currencies.splice(currencies.indexOf(defaultCurrency), 1);
  currencies = [defaultCurrency].concat(currencies);

  // ejs templates
  var _header = _.template(doc.getElementById("payment-header-template").innerHTML)
  var _frequencies = _.template(doc.getElementById("payment-frequencies-template").innerHTML);
  var _amounts = _.template(doc.getElementById("payment-amounts-template").innerHTML);

  var $form = doc.getElementById("payment-form");
  // if config has multiple currencies then _header will create $currency
  var $header = doc.getElementById("payment-header");
  $header.innerHTML = _header({
    currencies: currencies
  });
  var $currency = doc.getElementById("payment-currency");
  var $frequencies = doc.getElementById("payment-frequencies");
  var $frequency = doc.getElementById("payment-frequency"); 
  var $buttons = doc.getElementById("payment-buttons");
  var $error = doc.getElementById("payment-error");
  var $whatIsIncluded = doc.getElementById("what-is-included");

  function error(error)
  {
    if (error)
    {
      $error.innerHTML = error;
      $form.classList.add("has-error");
      _.each($buttons.children, function($button) { $button.disabled = true; });
    }
    else
    {
      $form.classList.remove("has-error");
      _.each($buttons.children, function($button) { $button.disabled = false; });
    }
  }

  function updateFreePremium() {
    const data = api.data();
    const amount = Number(data.amount);
    const config = CURRENCY_CONFIG[data.currency];
    let planinfo = {
      durationMonths: 0,
      plan: "ME"
    }

    let i18nId, i18nDuration;
    if (data.frequency === "once") {
      if (amount < config.once.amounts[2]) {
        i18nDuration = Math.floor(amount / config.monthly.amounts[0]);
        i18nId = "x-months";
        planinfo.durationMonths = i18nDuration;
      } else {
        i18nDuration = Math.floor(amount / config.once.amounts[2]);
        i18nId = i18nDuration === 1 ? "one-year" : "x-years";
        planinfo.durationMonths = 12 * i18nDuration;
      }
    } else if (data.frequency === "monthly") {
        i18nId = "monthly";
    } else if (data.frequency === "yearly") {
        i18nId = "yearly";
    } else {
      console.error("Unhandled frequency: " + data.frequency);
    }

    if (i18nId != null) {
      $whatIsIncluded.classList.remove("hidden");
      $whatIsIncluded.querySelectorAll("p").forEach(function(p) {
        if (p.id === i18nId) {
          p.classList.remove("hidden");
          const duration = p.querySelector(".duration");
          if (duration != null && i18nDuration != null) {
            duration.innerText = i18nDuration;
          }
          p.querySelector(".currency").innerText = data.sign;
          p.querySelector(".amount").innerText = amount;
        } else {
          p.classList.add("hidden");
        }
      });
    } else {
      $whatIsIncluded.classList.add("hidden");
    }

    localStorage.setItem("planinfo", JSON.stringify(planinfo));
  }

  function updateFrequencies()
  {
    // Set form dataset for styling when currency options exist and change
    if ($currency) $form.dataset.currency = $currency.value;
    $frequencies.innerHTML = _frequencies({
      config: CURRENCY_CONFIG[$currency ? $currency.value : defaultCurrency],
      _amounts: _amounts
    });

    updateFreePremium();
  }

  // Set frequencies and amounts for the first time
  // Runs off main thread to allow for public API to be available in handlers
  setTimeout(updateFrequencies, 0);

  // Update frequencies and amounts when currency changes
  if ($currency) // $currency only exists if config has multiple currencies
    $currency.addEventListener("change", updateFrequencies);
  
  $frequencies.addEventListener("change", function(event)
  {
    // Track amount frequency in hidden input
    // Each amount radio has a data-frequency
    if ("frequency" in event.target.dataset)
      $frequency.value = event.target.dataset.frequency;

    // Focus custom amount input on custom radio check
    if ("input" in event.target.dataset)
      doc.getElementById(event.target.dataset.input).focus();

    // Clear minimum amount error when a custom amount is unselected
    if (!event.target.parentElement.classList.contains("custom-payment-amount"))
      if ($form.classList.contains("has-error"))
        error(false);

    updateFreePremium();
  });

  function validateCustomAmount(input)
  {
    if (!input.min || !("frequency" in input.dataset)) return;
    
    var value = parseFloat(input.value);
    if (isNaN(value)) value = 0;
    
    if (value < parseFloat(input.min)) {
      error(i18n["min_" + input.dataset.frequency]);
    } else {
      error(false);
      updateFreePremium();
    }
  }
  
  $frequencies.addEventListener("input", function(event)
  {
    // Show an error when a custom amount is below it's minimum
    validateCustomAmount(event.target);
  });

  $frequencies.addEventListener("focusin", function(event)
  {
    // Custom amount input data-radio points at it's sibling radio
    if ("radio" in event.target.dataset)
    {
      // Click respective radio btn to trigger update of frequencies
      doc.getElementById(event.target.dataset.radio).click();

      // Re-show min custom amount error if custom amount is below min
      validateCustomAmount(event.target);
    }      
  });

  $buttons.addEventListener("click", function(event) {
    event.preventDefault();
    var data;
    if (event.target.classList.contains('paypal-button'))
      data = api.data('paypal');
    else if (event.target.classList.contains('stripe-button'))
      data = api.data('stripe');
    _.each(submitCallbacks, function(callback)
    {
      callback(data);
    });  
  });

  // PUBLIC API ////////////////////////////////////////////////////////////////

  var api = {};

  var submitCallbacks = [];

  api.onSubmit = function(callback)
  {
    submitCallbacks.push(callback);
  }

  api.data = function(privider)
  {
    var formData = new FormData($form);

    var amount = formData.get("amount");

    if (amount.startsWith("custom"))
      amount = formData.get(formData.get("amount"));

    var currency = Object.keys(CURRENCY_CONFIG).length > 1
      ? formData.get("currency")
      : defaultCurrency;

    return {
      currency: currency,
      frequency: formData.get("frequency"),
      amount: amount,
      provider: privider,
      sign: CURRENCY_CONFIG[currency].sign
    }
  }

  return api;
}

})(document, _, path("payment"), path("i18n.payment.form"));
/* global _, eyeo */
(function(doc, ns, i18n){

var DEFAULT_LOCALE = "auto";

// Updated 21/11/19
var LOCALE_ALTERNATIVE = {
  "es_MX": "es-419",
  "pt_BR": "pt-BR",
  "zh_CN": "zh",
  "zh_TW": "zh-TW"
};

var docLang = doc.documentElement.lang;

var stripeLocale = docLang || DEFAULT_LOCALE;

if (LOCALE_ALTERNATIVE.hasOwnProperty(docLang))
  stripeLocale = LOCALE_ALTERNATIVE[docLang];

ns.setupStripeCardModal = function(config)
{
  var $modal = doc.getElementById("stripe-card-modal");
  var $form = doc.getElementById("stripe-card-form");
  var $close = doc.getElementById("stripe-card-modal-close");
  var $email = doc.getElementById("stripe-card-email");
  var $submit = doc.getElementById("stripe-card-submit");
  var $submitLabel = doc.getElementById("stripe-card-submit-label");
  var $error = doc.getElementById("stripe-card-error");

  var stripeStyles = {
    base: {
      color: '#32325d',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': { color: '#aab7c4' }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  var stripe = Stripe(config.key, {locale: stripeLocale});
  var stripeElements = stripe.elements();
  var stripeCard = stripeElements.create("card", {style: stripeStyles});

  stripeCard.mount("#stripe-card");

  $close.addEventListener("click", function(event)
  {
    event.preventDefault();

    api.hide();
  });

  $form.addEventListener("submit", function(event)
  {
    event.preventDefault();

    if (
      cardBrand != "unknown" 
      && config.supportedCardBrands.indexOf(cardBrand) == -1
    ) {
      return api.showError(i18n.error_card_brand);
    }

    var data = api.data();

    $form.classList.add("is-submitting");
    $submit.disabled = true;

    var submissionProgress = [];

    _.each(submitCallbacks, function(callback)
    {
      submissionProgress.push(Promise.resolve(callback(data)));
    });

    Promise.all(submissionProgress).finally(function()
    {
      if (hasError)
        $form.classList.remove("is-submitting");
    });
  });

  $form.addEventListener("input", function(event)
  {
    if (hasError)
      api.showError(false);
  });

  var cardBrand = "unknown";

  stripeCard.addEventListener("change", function(event)
  {
    if (typeof event.brand == "string" && event.brand != "unknown")
    {
      cardBrand = event.brand;

      if (config.supportedCardBrands.indexOf(event.brand) == -1)
        return api.showError(i18n.error_card_brand);
    }      

    if (typeof event.error != "object") 
      return api.showError(false);
    
    var message;

    if (event.error.code && i18n["error_" + event.error.code])
      message = i18n["error_" + event.error.code];
    else if (event.error.message)
      message = event.error.message;
    else
      message = i18n.error_unexpected

    api.showError(message);
  });
  
  // PUBLIC API ////////////////////////////////////////////////////////////////

  var api = {};

  var submitCallbacks = [];

  api.onSubmit = function(callback)
  {
    submitCallbacks.push(callback);
  }

  api.data = function()
  {
    return {
      email: $email.value,
      stripe: stripe,
      card: stripeCard,
      endpoint: config.endpoint
    };
  }

  api.show = function(config)
  {
    $submitLabel.textContent = i18n[config.frequency]
      .replace(
        "{amount}",  
        config.sign == "€" 
          ? config.amount + config.sign 
          : config.sign + config.amount
      );

    $modal.classList.add("is-active");

    $email.focus();
  }

  api.hide = function()
  {
    $modal.classList.remove("is-active");
  }

  var hasError = false;

  api.showError = function(error)
  {
    if (error)
    {
      hasError = true;
      $modal.classList.add("has-error");
      $error.textContent = error;
      $submit.disabled = true;
    }
    else
    {
      hasError = false;
      $modal.classList.remove("has-error");
      $submit.disabled = false;
    }
  }

  return api;
}

})(document, path("payment"), path("i18n.payment.stripe.cardModal"));


/* global eyeo, URLSearchParams */
(function(doc, _, ns){

  var lang = doc.documentElement.lang;
  
  ns.stripeCardPayment = function stripeCardPayment(data)
  {
    function requestIntent()
    {
      return new Promise(function(resolve, reject)
      {
        var request = new XMLHttpRequest();
        
        request.open("POST", data.endpoint);
  
        request.setRequestHeader(
          "Content-Type", 
          "application/x-www-form-urlencoded"
        );
  
        request.onreadystatechange = function()
        {
          if (request.readyState == XMLHttpRequest.DONE)
            if (request.status == 200)
              resolve(request.responseText);
            else
              reject(request);
        }
  
        var requestData = {
          lang: lang
        };
  
        var dataAllowlist = [
          "amount",
          "type",
          "email",
          "custom",
          "currency",
          "tracking"
        ];
  
        _.each(dataAllowlist, function (prop) { 
          if (data[prop])
            requestData[prop] = data[prop];
        });
  
        request.send(new URLSearchParams(requestData));
      });
    }
  
    function confirmIntent(intent)
    {
      return new Promise(function(resolve, reject)
      {
        data.stripe.confirmCardPayment(intent, {
          payment_method: {
            card: data.card,
            billing_details: {
              email: data.email
            }
          },
          receipt_email: data.email
        })
        .then(function(result)
        {
          if (result.hasOwnProperty("error"))
            reject(result.error);
          else
            resolve();
        })
        .catch(reject);  
      });
    }
  
    return requestIntent()
    .then(confirmIntent)
  };
  
  })(document, _, path("payment"));
/* global eyeo, URLSearchParams */
(function(doc, _, ns){

var lang = doc.documentElement.lang;

ns.stripeCardSubscription = function stripeCardSubscription(data)
{
  function confirmPayment(result)
  {
    return new Promise(function(resolve, reject)
    {
      var request = new XMLHttpRequest();

      data.method = result.paymentMethod.id;

      request.open("POST", data.endpoint);

      request.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );

      request.onreadystatechange = function()
      {
        if (request.readyState == XMLHttpRequest.DONE)
          if (request.status == 200)
            resolve();
          else
            reject(request);
      }

      var requestData = {
        lang: lang
      };

      var dataAllowlist = [
        "amount",
        "type",
        "email",
        "custom",
        "currency"
      ];

      _.each(dataAllowlist, function (prop) { 
        if (data[prop])
          requestData[prop] = data[prop];
      });

      request.send(new URLSearchParams(data));
    });
  }

  return new Promise(function(resolve, reject)
  {
    data.stripe.createPaymentMethod({
      type: "card",
      card: data.card,
      billing_details: {
        email: data.email
      }
    })
    .then(function(result)
    {
      if (result.hasOwnProperty("error"))
        reject(result.error);
      else
        confirmPayment(result)
        .then(resolve)
        .catch(reject);
    })
    .catch(reject);
  });

};

})(document, _, path("payment"));
/* global eyeo, URLSearchParams, paymentTranslations */
(function(doc, ns, i18n){

var siteURL = document.documentElement
  .getAttribute("data-siteurl") || "https://adblockplus.org";

// Locales supported by our website that have different PayPal codes
var LOCALES = {
  "en": "US",
  "zh_cn": "C2",
  "pt_br": "BR",
  "tr": "TM",
  "el_gr": "GR",
  "jp": "JP",
  "kr": "KO",
  "ar": "DZ"
};

var lang = doc.documentElement.lang;

var paypalAPIConfig = {
  live: {
    business: "till@adblockplus.org",
    url: "https://www.paypal.com/cgi-bin/webscr"
  },
  test: {
    business: "abp-sandbox@adblockplus.org",
    url: "https://www.sandbox.paypal.com/cgi-bin/webscr"
  }
};

var paypalEnv = (
  window.location.hostname == "adblockplus.org" 
  || window.location.hostname.endsWith(".adblockplus.org")
) ? "live" : "test";

var DEFAULTS = {
  charset: "utf-8",
  lc: LOCALES[lang] || lang.toUpperCase(),
  cmd: "_xclick",
  business: paypalAPIConfig[paypalEnv].business,
  item_name: i18n.item,
  image_url: siteURL + "../../img/adblock-plus-paypal.png",
  return: siteURL + "/payment-complete",
  cancel_return: location.href,
  no_note: 1
};

/**
 * Submit a PayPal button payment
 * @param {Object} data - A compatible card payment data object
 */
ns.paypalButtonPayment = function(data)
{
  var form = doc.createElement("form");
  form.target = "_blank";
  form.method = "post";
  form.action = paypalAPIConfig[paypalEnv].url;

  var inputs = Object.assign({}, DEFAULTS, {
    amount: data.amount,
    custom: data.custom,
    currency_code: data.currency,
    item_number: data.item_number, // payment-server tracking string
  });

  var input;
  for (var name in inputs)
  {
    input = doc.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = inputs[name];
    form.appendChild(input);
  }

  doc.body.appendChild(form);
  form.submit();
  doc.body.removeChild(form);  
};

})(document, path("payment"), path("i18n.payment.form"));

/* global eyeo, URLSearchParams, paymentTranslations */
(function(doc, ns, i18n){

var siteURL = document.documentElement
  .getAttribute("data-siteurl") || "https://adblockplus.org";

// Locales supported by our website that have different PayPal codes
var LOCALES = {
  "en": "US",
  "zh_cn": "C2",
  "pt_br": "BR",
  "tr": "TM",
  "el_gr": "GR",
  "jp": "JP",
  "kr": "KO",
  "ar": "DZ"
};

var SUBSCRIPTION_TYPE = {
  'monthly': 'M',
  'yearly': 'Y'
};

var lang = doc.documentElement.lang;

var paypalAPIConfig = {
  live: {
    business: "till@adblockplus.org",
    url: "https://www.paypal.com/cgi-bin/webscr"
  },
  test: {
    business: "abp-sandbox@adblockplus.org",
    url: "https://www.sandbox.paypal.com/cgi-bin/webscr"
  }
};

var paypalEnv = (
  window.location.hostname == "adblockplus.org" 
  || window.location.hostname.endsWith(".adblockplus.org")
) ? "live" : "test";

var DEFAULTS = {
  charset: "utf-8",
  lc: LOCALES[lang] || lang.toUpperCase(),
  cmd: "_xclick-subscriptions",
  business: paypalAPIConfig[paypalEnv].business,
  item_name: i18n.item,
  image_url: siteURL + "../../img/adblock-plus-paypal.png",
  return: siteURL + "/payment-complete",
  cancel_return: location.href,
  no_note: 1,
  p3: 1, // Subscription duration (N*p3)
  src: 1 // Subscription payments recur 1 or not 0
};

/**
 * Submit a PayPal button subscription
 * @param {Object} data - A compatible card payment data object
 */
ns.paypalButtonSubscription = function (data)
{
  var form = doc.createElement("form");
  form.target = "_blank";
  form.method = "post";
  form.action = paypalAPIConfig[paypalEnv].url;

  var frequency = SUBSCRIPTION_TYPE[data.frequency];

  var inputs = Object.assign({}, DEFAULTS, {
    custom: data.custom + "-" + frequency.toLowerCase(),
    currency_code: data.currency,
    a3: data.amount, // Subscription price
    t3: frequency, // Regular subscription units of duration. (D/W/M/Y)
    item_number: data.item_number, // payment-server tracking string
  });

  var input;
  for (var name in inputs)
  {
    input = doc.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = inputs[name];
    form.appendChild(input);
  }

  doc.body.appendChild(form);
  form.submit();
  doc.body.removeChild(form);  
};

})(document, path("payment"), path("i18n.payment.form"));
  
/* global eyeo */
(function(ns){

/* A payment session is a unique payment flow identifier that has user
 * testing, support troubleshooting, and application performance information
 * encoded into it for convinience. e.g. to better understand the context of a 
 * report when investigating an incident or incidents in aggregate.
 */

var CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';

function getRandomChars(length)
{
  var string = "";
  for (var i = 0; i < length; i++)
    string += CHARS.charAt(Math.floor(Math.random() * CHARS.length));  
  return string;
}

function zeroPad(input, length)
{
  var string = String(input);

  if (string.length < length)
    for (var i = string.length; i < length; i++)
      string = "0" + string;

  return string;
}

function getConfig(key, pad, test)
{
  var result = zeroPad("x", pad);

  if (typeof ns[key] != "undefined")
  {
    result = String(ns[key]);

    if (result.length < pad) result = zeroPad(result, pad);

    if (!test.test(result)) result = zeroPad("f", pad);
  }
  
  return result;
}

// Payment page ID, set manually in page, limited to 1 char
function getPageId()
{
  return getConfig("pageId", 1, /^[0-3]{1}$/)
}

// Payment campaign ID, set manually in page, limited to 3 char
function getCampaignId()
{
  return getConfig("campaignId", 3, /^[a-z0-9]{3}$/);
}

// Split test ID, set manually in page, limited to 4 chars
function getTestId()
{
  return getConfig("testId", 4, /^[a-z0-9]{4}$/);
}

// Split test variant ID, set manually in page, limited to 1 char
function getVariantId()
{
  return getConfig("variantId", 1, /^[a-z0-9]{1}$/);
}

/* Zero padded performance timestamp in milliseconds, limited to 8 chars
 * "0000000a" if performance.now is not available
 * "0000000b" if runtime has exceeded 99999999 milliseconds already
 */
function createPerformanceTimestamp()
{
  var now;

  try {
    now = String(parseInt(String(performance.now()), 10));
  } catch (err) {
    now = "a";
  }

  if (now.length > 8)
    now = "b";

  return zeroPad(now, 8);
}

// YYYYMMDDHHSS format date timestamp
function createDatetimestamp()
{
  var date = new Date();

  return String(date.getUTCFullYear()).slice(-2) 
  + zeroPad(String(date.getUTCMonth() + 1), 2) 
  + zeroPad(String(date.getUTCDate()), 2)
  + zeroPad(String(date.getUTCHours()), 2)
  + zeroPad(String(date.getUTCMinutes()), 2)
  + zeroPad(String(date.getUTCSeconds()), 2);
}

var session;

/** Get or create and get payment session */
ns.getSession = function()
{
  if (!session)
  {
    session = ""
    + getVariantId() + "-"
    + getPageId() + "-"
    + createPerformanceTimestamp() + "-"
    + getTestId() + "-"
    + "4" + getCampaignId() + "-"
    + getRandomChars(4) + "-"
    + createDatetimestamp();
  }

  return session;
};

})(path("payment"));
/* global eyeo */
(function(doc, _, ns, i18n){

var siteURL = doc.documentElement.getAttribute("data-siteurl") 
  || "https://adblockplus.org"; 

// May be overriden by setting ns.stripeAPIConfig
var stripeConfig = {
  supportedCardBrands: ["visa", "mastercard", "amex"],
  apiConfig: ns.stripeAPIConfig || {
    test: {
      key: "pk_test_qZJPIgNMdOMferLFulcfPvXO007x2ggldN",
      endpoint: "https://donation-staging.adblock-org.workers.dev"
    },
    live: {
      key: "pk_live_Nlfxy49RuJeHqF1XOAtUPUXg00fH7wpfXs",
      endpoint: "https://donation.adblock-org.workers.dev/"
    }
  }
}

var stripeAPIConfig = stripeConfig.apiConfig;

var stripeEnv = (
  window.location.hostname == "adblockplus.org" 
  || window.location.hostname.endsWith(".adblockplus.org")
) ? "live" : "test";

var session;

function onDOMReady()
{
  session = ns.getSession();

  var script = doc.createElement("script");
  script.onload = onConfigLoad;
  script.onerror = onConfigLoad;
  
  var URLParams = new URLSearchParams(location.search);
  
  var report = new URLSearchParams({
    an: URLParams.get('an'), // addon name
    av: URLParams.get('av'), // addon version
    ap: URLParams.get('ap'), // browser name
    apv: URLParams.get('apv'), // browser version
    p: URLParams.get('p'), // engine name
    pv: URLParams.get('pv'), // engine version
    bl: doc.documentElement.lang, // browser language
    cid: session.slice(2,3), // payment page id
    sid: session // payment session id
  }).toString();
  
  script.src = "/../js/payment/config/load.js?" + report;
  doc.body.appendChild(script);
}

var form;

var stripeCardModal;

function onConfigLoad()
{
  document.documentElement.classList.add("payment-form-loaded");
  
  form = ns.setupForm(ns.config);
  form.onSubmit(onFormSubmit);
  stripeCardModal = ns.setupStripeCardModal({
    key: stripeAPIConfig[stripeEnv].key,
    endpoint: stripeAPIConfig[stripeEnv].endpoint,
    supportedCardBrands: stripeConfig.supportedCardBrands
  });
  stripeCardModal.onSubmit(onStripeConfirm);
}

function onFormSubmit(data)
{
  data.custom = session;

  if (data.provider == "paypal")
    onPayPalIntent(data);
  else
    onStripeIntent(data);
}

function onPayPalIntent(data)
{
  data.item_number = recordTracking(); // payment-server tracking string

  if (data.frequency == "once")
    ns.paypalButtonPayment(data);
  else
    ns.paypalButtonSubscription(data);
}

function onStripeIntent(data)
{
  data.tracking = recordTracking();
  stripeCardModal.show(data);
}

function onStripeConfirm()
{
  var data = _.extend(
    { custom: session, tracking: recordTracking() },
    form.data(),
    stripeCardModal.data()    
  );

  switch (data.frequency) {
    case "once":
      data.type = "donation";
      break;
    case "monthly":
      data.type = "monthly-subscription";
      break;
    case "yearly":
      data.type = "yearly-subscription";
      break;
  }

  var payment;

  if (data.frequency == "once")
    payment = ns.stripeCardPayment(data);
  else
    payment = ns.stripeCardSubscription(data);
  
  return payment
  .then(onStripeComplete)
  .catch(onStripeError)
}

function onStripeComplete()
{
  var params = new URLSearchParams({
    pp: "stripe", // payment processor
    sid: session // session id
  });

  window.location.href = siteURL + "/payment-complete?" + params.toString();
}

function onStripeError(error)
{
  var message = i18n["error_unexpected"];

  if (typeof error == "object")
    if (error.code && i18n["error_" + error.code])
      message = i18n["error_" + error.code];
    else if (error.status == 402)
      message = i18n["error_declined"];
    else if (typeof error.message == "string" && error.message.length)
      message = error.message;
  
  stripeCardModal.showError(message);
}

if (
  doc.readyState === "complete" 
  || doc.readyState === "loaded" 
  || doc.readyState === "interactive"
) {
  onDOMReady();
} else {
  doc.addEventListener("DOMContentLoaded", onDOMReady);
}

})(document, _, path("payment"), path("i18n.payment.stripe.cardModal"));
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
