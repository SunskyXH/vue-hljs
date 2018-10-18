import Hljs from 'highlight.js'
import './gruvbox-dark.min.css'

const vueHljs = {}

vueHljs.install = Vue => {
  Vue.directive('highlight', el => {
    const blocks = el.querySelectorAll('pre code')
    Array.prototype.forEach.call(blocks, Hljs.highlightBlock)
  })
}

export default vueHljs
