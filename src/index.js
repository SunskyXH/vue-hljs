import Hljs from "highlight.js";
import "./gruvbox-dark.css";

var vueHljs = {};

vueHljs.install = (Vue) => {
  Vue.directive("highlight", function(el, binding) {
    let blocks = el.querySelectorAll("pre code");
    Array.prototype.forEach.call(blocks, Hljs.highlightBlock);
  });
};

//CommonJS
if (typeof exports == "object") {
  module.exports = vueHljs;
} 
//AMD
else if (typeof define == "function" && define.amd) {
  define([], function() {
    return vueHljs;
  });
}
//using Vue.use()
else if (window.Vue) {
  window.VueHljs = vueHljs;
  Vue.use(vueHljs);
}
