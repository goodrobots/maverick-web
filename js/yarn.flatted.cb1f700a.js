(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["yarn.flatted"],{"5bc5":function(n,t,r){"use strict";r.r(t),r.d(t,"parse",(function(){return i})),r.d(t,"stringify",(function(){return u}));var e=function(n,t){
/*!
   * ISC License
   *
   * Copyright (c) 2018, Andrea Giammarchi, @WebReflection
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
   * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
   * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
   * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
   * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
   * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
   * PERFORMANCE OF THIS SOFTWARE.
   */
var r={parse:function(n,t){var r=JSON.parse(n,f).map(c),u=r[0],a=t||e,o="object"===typeof u&&u?i(r,new Set,u,a):u;return a.call({"":o},"",o)},stringify:function(n,r,i){for(var c,f=new Map,a=[],o=[],s=r&&typeof r===typeof a?function(n,t){if(""===n||-1<r.indexOf(n))return t}:r||e,l=+u(f,a,s.call({"":n},"",n)),p=function(n,r){if(c)return c=!c,r;var e=s.call(this,n,r);switch(typeof e){case"object":if(null===e)return e;case t:return f.get(e)||u(f,a,e)}return e};l<a.length;l++)c=!0,o[l]=JSON.stringify(a[l],p,i);return"["+o.join(",")+"]"}};return r;function e(n,t){return t}function i(t,r,e,u){return Object.keys(e).reduce((function(e,c){var f=e[c];if(f instanceof n){var a=t[f];"object"!==typeof a||r.has(a)?e[c]=u.call(e,c,a):(r.add(a),e[c]=u.call(e,c,i(t,r,a,u)))}else e[c]=u.call(e,c,f);return e}),e)}function u(t,r,e){var i=n(r.push(e)-1);return t.set(e,i),i}function c(t){return t instanceof n?n(t):t}function f(r,e){return typeof e===t?new n(e):e}}(String,"string");t["default"]=e;var i=e.parse,u=e.stringify}}]);
//# sourceMappingURL=yarn.flatted.cb1f700a.js.map