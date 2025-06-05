import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createApp, FunctionDirective } from 'vue'
import hljs from 'highlight.js'
import plugin from '../lib/main'

describe('vue-hljs plugin', () => {
  let app: ReturnType<typeof createApp>

  beforeEach(() => {
    app = createApp({
      template: `<div v-highlight>
        <pre>
          <code class="javascript">console.log('Hello World!')</code>
        </pre>
      </div>`,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('plugin installation', () => {
    it('should have install method', () => {
      expect(plugin.install).toBeInstanceOf(Function)
    })

    it('should install successfully with hljs option', () => {
      expect(() => {
        app.use(plugin, { hljs })
      }).not.toThrow()
    })

    it('should throw error when hljs option is missing', () => {
      expect(() => {
        app.use(plugin, {} as any)
      }).toThrow()
    })

    it('should register highlight directive after installation', () => {
      app.use(plugin, { hljs })
      expect(app.directive('highlight')).toBeDefined()
    })
  })

  describe('highlight directive functionality', () => {
    beforeEach(() => {
      app.use(plugin, { hljs })
    })

    it('should call querySelectorAll with correct selector', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const el = {
        querySelectorAll: vi.fn(() => []),
      } as any

      directive(el, {} as any, {} as any, {} as any)

      expect(el.querySelectorAll).toHaveBeenCalledWith('pre code')
    })

    it('should handle null/undefined element gracefully', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation(() => {})

      expect(() => {
        directive(null as any, {} as any, {} as any, {} as any)
      }).toThrow()
    })
  })

  describe('real DOM integration', () => {
    beforeEach(() => {
      app.use(plugin, { hljs })
    })

    it('should handle multiple pre code blocks', () => {
      const container = document.createElement('div')
      
      // Create multiple code blocks
      for (let i = 0; i < 3; i++) {
        const pre = document.createElement('pre')
        const code = document.createElement('code')
        code.className = 'javascript'
        code.textContent = `console.log("Block ${i}")`
        pre.appendChild(code)
        container.appendChild(pre)
      }

      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation(() => {})

      directive(container, {} as any, {} as any, {} as any)

      expect(spy).toHaveBeenCalledTimes(3)
    })

  })

  describe('error handling', () => {
    beforeEach(() => {
      app.use(plugin, { hljs })
    })

    it('should handle hljs.highlightBlock throwing an error', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const code = document.createElement('code')
      const el = {
        querySelectorAll: vi.fn(() => [code]),
      } as any

      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation(() => {
        throw new Error('Highlight error')
      })

      expect(() => {
        directive(el, {} as any, {} as any, {} as any)
      }).toThrow('Highlight error')
    })

    it('should handle malformed DOM structure', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const el = {
        querySelectorAll: vi.fn(() => {
          throw new Error('DOM error')
        }),
      } as any

      expect(() => {
        directive(el, {} as any, {} as any, {} as any)
      }).toThrow('DOM error')
    })
  })

})
