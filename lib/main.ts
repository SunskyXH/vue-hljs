import type { App, Plugin, FunctionDirective } from 'vue'
import type { HLJSApi } from 'highlight.js'

type Options = {
  hljs: HLJSApi
}

const plugin: Plugin<Options> = {
  install: (app, options) => {
    if (!('hljs' in options)) {
      throw Error('Please pass highlight.js instance.')
    }
    const { hljs } = options
    
    const highlightDirective: FunctionDirective = (el) => {
      if (!el) {
        throw new Error('Element is required')
      }
      const blocks = el.querySelectorAll('pre code')
      blocks.forEach(hljs.highlightBlock)
    }
    
    app.directive('highlight', highlightDirective)
  },
}

export default plugin
