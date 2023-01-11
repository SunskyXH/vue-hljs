import type { App, Plugin } from 'vue'
import type { HLJSApi } from 'highlight.js'
import './gruvbox-dark.min.css'

interface Options {
  hljs: HLJSApi
}

const plugin: Plugin = {
  install: (app: App, options: Options) => {
    const { hljs } = options
    app.directive('highlight', (el) => {
      const blocks = el.querySelectorAll('pre code')
      blocks.forEach(hljs.highlightBlock)
    })
  },
}

export default plugin
