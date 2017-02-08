(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('highlight.js'), require('highlight.js/styles/gruvbox-dark.css')) :
  typeof define === 'function' && define.amd ? define(['highlight.js', 'highlight.js/styles/gruvbox-dark.css'], factory) :
  (factory(global.Hljs,global.highlight_js_styles_gruvboxDark_css));
}(this, (function (Hljs,highlight_js_styles_gruvboxDark_css) { 'use strict';

Hljs = 'default' in Hljs ? Hljs['default'] : Hljs;

var vueHljs = {};

vueHljs.install = function (Vue) {
  Vue.directive('highlight', {
    deep: true,
    bind: function (el) {
      var blocks = el.querySelectorAll('pre code');
      Array.prototype.forEach.call(blocks, Hljs.highlightBlock);
    }
  });
};

//CommonJS
if (typeof exports == 'object') {
  module.exports = vueHljs;
}
//AMD
else if (typeof define == 'function' && define.amd) {
    define([], function () {
      return vueHljs;
    });
  }
  //using Vue.use()
  else if (window.Vue) {
      window.VueHljs = vueHljs;
      Vue.use(vueHljs);
    }

})));
