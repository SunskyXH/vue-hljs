"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var Hljs=_interopDefault(require("highlight.js")),vueHljs={};vueHljs.install=function(e){e.directive("highlight",function(e,t){var l=e.querySelectorAll("pre code");Array.prototype.forEach.call(l,Hljs.highlightBlock)})},"object"==typeof exports?module.exports=vueHljs:window.Vue&&(window.VueHljs=vueHljs,Vue.use(vueHljs));
