(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["yarn.vue-fullscreen"],{"03cd":function(e,t,n){!function(t,n){e.exports=n()}(0,(function(){return function(e){function t(r){if(n[r])return n[r].exports;var c=n[r]={i:r,l:!1,exports:{}};return e[r].call(c.exports,c,c.exports,t),c.l=!0,c.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";function r(){var e=document.documentElement;return"requestFullscreen"in e||"mozRequestFullScreen"in e&&document.mozFullScreenEnabled||"msRequestFullscreen"in e&&document.msFullscreenEnabled||"webkitRequestFullScreen"in e}function c(){return!!(document.fullscreen||document.mozFullScreen||document.fullscreenElement||document.msFullscreenElement||document.webkitIsFullScreen)}function l(e){e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen?e.msRequestFullscreen():console.log("Fullscreen API is not supported.")}function u(){document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen?document.msExitFullscreen():console.log("Fullscreen API is not supported.")}function o(e){document.addEventListener("fullscreenchange",e),document.addEventListener("mozfullscreenchange",e),document.addEventListener("MSFullscreenChange",e),document.addEventListener("webkitfullscreenchange",e)}function s(e){document.removeEventListener("fullscreenchange",e),document.removeEventListener("mozfullscreenchange",e),document.removeEventListener("MSFullscreenChange",e),document.removeEventListener("webkitfullscreenchange",e)}function i(){var e={},t=!1,n=0,r=arguments.length;for("[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],n++);n<r;n++){var c=arguments[n];!function(n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t&&"[object Object]"===Object.prototype.toString.call(n[r])?e[r]=i(!0,e[r],n[r]):e[r]=n[r])}(c)}return e}t.b=r,t.c=c,t.g=l,t.d=u,t.f=o,t.e=s,t.a=i},function(e,t,n){"use strict";function r(){return n.i(o.c)()}function c(e,t,n){i&&(void 0===n?r()?u():l(e,t):n?l(e,t):u())}function l(){function e(){var t=r();t||(n.i(o.e)(e),l.classList.remove(c.fullscreenClass),c.wrap&&(u.parentNode.insertBefore(l,u),u.parentNode.removeChild(u))),c.callback&&c.callback(t)}var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body,c=arguments[1];if(i&&!r()){c=n.i(o.a)(!0,{},s,c);var l=t,u=void 0;c.wrap&&(u=document.createElement("div"),u.style["overflow-y"]="auto",u.style.background=c.background,u.style.width="100%",u.style.height="100%",l.parentNode.insertBefore(u,l),u.appendChild(l),u.addEventListener("click",(function(e){e.target===this&&n.i(o.d)()}))),l.classList.add(c.fullscreenClass),n.i(o.f)(e),n.i(o.g)(c.wrap?u:l)}}function u(){i&&r()&&n.i(o.d)()}var o=n(0),s={wrap:!0,background:"#333",callback:function(){},fullscreenClass:"fullscreen"},i=n.i(o.b)();t.a={getState:r,support:i,toggle:c,enter:l,exit:u}},function(e,t,n){var r=n(5)(n(4),n(6),null,null);e.exports=r.exports},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2),c=n.n(r),l=n(1),u=n(0);t.default={install:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.name||"fullscreen";e.component(r,n.i(u.a)(c.a,{name:r})),e.prototype["$"+r]=l.a}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);t.default={props:{background:{type:String,default:"#333"},fullscreenClass:{type:String,default:"fullscreen"},fullscreen:{type:Boolean,default:!1}},data:function(){return{supportFullScreen:!1,isFullscreen:!1}},computed:{wrapperStyle:function(){return{background:this.background,"overflow-y":"auto",width:"100%",height:"100%"}}},methods:{toggle:function(e){void 0===e?n.i(r.c)()?this.exit():this.enter():e?this.enter():this.exit()},enter:function(){this.supportFullScreen&&(n.i(r.f)(this.fullScreenCallback),n.i(r.g)(this.$el))},exit:function(){this.supportFullScreen&&this.getState()&&n.i(r.d)()},getState:function(){return n.i(r.c)()},shadeClick:function(e){e.target===this.$el&&this.exit()},fullScreenCallback:function(){this.isFullscreen=n.i(r.c)(),this.isFullscreen||n.i(r.e)(this.fullScreenCallback),this.$emit("change",this.isFullscreen),this.$emit("update:fullscreen",this.isFullscreen)}},watch:{fullscreen:function(e){e!==n.i(r.c)()&&(e?this.enter():this.exit())}},created:function(){this.supportFullScreen=n.i(r.b)()}}},function(e,t){e.exports=function(e,t,n,r){var c,l=e=e||{},u=typeof e.default;"object"!==u&&"function"!==u||(c=e,l=e.default);var o="function"==typeof l?l.options:l;if(t&&(o.render=t.render,o.staticRenderFns=t.staticRenderFns),n&&(o._scopeId=n),r){var s=Object.create(o.computed||null);Object.keys(r).forEach((function(e){var t=r[e];s[e]=function(){return t}})),o.computed=s}return{esModule:c,exports:l,options:o}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{class:e.isFullscreen?[e.fullscreenClass]:[],style:e.isFullscreen?[e.wrapperStyle]:[],on:{click:function(t){return e.shadeClick(t)}}},[e._t("default")],2)},staticRenderFns:[]}}])}))}}]);
//# sourceMappingURL=yarn.vue-fullscreen.4ca88bfb.js.map