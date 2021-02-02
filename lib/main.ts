import { PluginObject } from 'vue'
import './gruvbox-dark.min.css'

interface Options {
  hljs: HLJSApi
}

const vueHljs: PluginObject<Options> = {
  install: (Vue, options) => {
    const { hljs } = options
    Vue.directive('highlight', (el) => {
      const blocks = el.querySelectorAll('pre code')
      Array.prototype.forEach.call(blocks, hljs.highlightBlock)
    })
  },
}

export default vueHljs
