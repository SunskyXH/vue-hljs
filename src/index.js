const Hljs = require('highlight.js')

var vueHljs = {}

vueHljs.install = function (Vue) {
  Vue.directive('highlight', {
    deep: true,
    bind: function (el) {
      let blocks = el.querySelectorAll('pre code')
      Array.prototype.forEach.call(blocks, Hljs.highlightBlock)
    }
  })
}

//CommonJS
if (typeof exports == 'object') {
  module.exports = vueHljs
}
//AMD
else if (typeof define == 'function' && define.amd) {
  define([], function () { return vueHljs })
}
//using Vue.use()
else if (window.Vue) {
  window.VueHljs = vueHljs
  Vue.use(vueHljs)
}
