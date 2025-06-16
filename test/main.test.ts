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

  describe('edge cases and robustness', () => {
    beforeEach(() => {
      app.use(plugin, { hljs })
    })

    it('should handle empty code blocks', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const container = document.createElement('div')
      const pre = document.createElement('pre')
      const code = document.createElement('code')
      code.textContent = ''
      pre.appendChild(code)
      container.appendChild(pre)

      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation(() => {})

      directive(container, {} as any, {} as any, {} as any)

      expect(spy).toHaveBeenCalled()
    })

    it('should handle code blocks with special characters', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const container = document.createElement('div')
      const pre = document.createElement('pre')
      const code = document.createElement('code')
      code.innerHTML = '&lt;script&gt;alert("XSS")&lt;/script&gt;'
      pre.appendChild(code)
      container.appendChild(pre)

      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation(() => {})

      directive(container, {} as any, {} as any, {} as any)

      expect(spy).toHaveBeenCalled()
    })

    it('should handle deeply nested structures', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const container = document.createElement('div')
      const wrapper = document.createElement('div')
      const section = document.createElement('section')
      const pre = document.createElement('pre')
      const code = document.createElement('code')
      code.textContent = 'const x = 1'

      pre.appendChild(code)
      section.appendChild(pre)
      wrapper.appendChild(section)
      container.appendChild(wrapper)

      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation(() => {})

      directive(container, {} as any, {} as any, {} as any)

      expect(spy).toHaveBeenCalled()
    })

    it('should handle elements without pre code blocks', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const container = document.createElement('div')
      container.innerHTML = '<p>Just text</p><span>More text</span>'

      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation(() => {})

      directive(container, {} as any, {} as any, {} as any)

      expect(spy).not.toHaveBeenCalled()
    })

    it('should handle mixed content with some pre code blocks', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const container = document.createElement('div')
      container.innerHTML = `
        <p>Some text</p>
        <pre><code class="js">console.log('test')</code></pre>
        <div>More content</div>
        <pre><code class="python">print('hello')</code></pre>
      `

      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation(() => {})

      directive(container, {} as any, {} as any, {} as any)

      expect(spy).toHaveBeenCalledTimes(2)
    })
  })

  describe('highlight.js API integration', () => {
    it('should work with different hljs configurations', () => {
      const customHljs = {
        highlightBlock: vi.fn(),
      }

      const customApp = createApp({})
      customApp.use(plugin, { hljs: customHljs as any })

      const directive = customApp.directive('highlight') as FunctionDirective<HTMLDivElement>
      const container = document.createElement('div')
      const pre = document.createElement('pre')
      const code = document.createElement('code')
      code.textContent = 'test code'
      pre.appendChild(code)
      container.appendChild(pre)

      directive(container, {} as any, {} as any, {} as any)

      expect(customHljs.highlightBlock).toHaveBeenCalled()
    })

    it('should handle hljs.highlightBlock with return value', () => {
      app.use(plugin, { hljs })
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>

      const container = document.createElement('div')
      const pre = document.createElement('pre')
      const code = document.createElement('code')
      code.textContent = 'const x = 1'
      pre.appendChild(code)
      container.appendChild(pre)

      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation((element) => {
        element.classList.add('hljs')
        return element
      })

      directive(container, {} as any, {} as any, {} as any)

      expect(spy).toHaveBeenCalled()
      expect(code.classList.contains('hljs')).toBe(true)
    })
  })

  describe('performance and scale', () => {
    beforeEach(() => {
      app.use(plugin, { hljs })
    })

    it('should handle large number of code blocks efficiently', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const container = document.createElement('div')

      const blockCount = 100
      for (let i = 0; i < blockCount; i++) {
        const pre = document.createElement('pre')
        const code = document.createElement('code')
        code.textContent = `console.log(${i})`
        pre.appendChild(code)
        container.appendChild(pre)
      }

      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation(() => {})
      const startTime = performance.now()

      directive(container, {} as any, {} as any, {} as any)

      const endTime = performance.now()
      const duration = endTime - startTime

      expect(spy).toHaveBeenCalledTimes(blockCount)
      expect(duration).toBeLessThan(1000) // Should complete within 1 second
    })

    it('should handle very long code content', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const container = document.createElement('div')
      const pre = document.createElement('pre')
      const code = document.createElement('code')

      // Create a very long code string
      const longCode = 'const x = 1;\n'.repeat(1000)
      code.textContent = longCode
      pre.appendChild(code)
      container.appendChild(pre)

      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation(() => {})

      expect(() => {
        directive(container, {} as any, {} as any, {} as any)
      }).not.toThrow()

      expect(spy).toHaveBeenCalled()
    })
  })

  describe('CSS class preservation', () => {
    beforeEach(() => {
      app.use(plugin, { hljs })
    })

    it('should preserve existing CSS classes on code elements', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const container = document.createElement('div')
      const pre = document.createElement('pre')
      const code = document.createElement('code')
      code.className = 'javascript custom-class'
      code.textContent = 'const x = 1'
      pre.appendChild(code)
      container.appendChild(pre)

      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation((element) => {
        element.classList.add('hljs')
      })

      directive(container, {} as any, {} as any, {} as any)

      expect(code.className).toContain('javascript')
      expect(code.className).toContain('custom-class')
      expect(code.className).toContain('hljs')
    })

    it('should handle code elements without any CSS classes', () => {
      const directive = app.directive('highlight') as FunctionDirective<HTMLDivElement>
      const container = document.createElement('div')
      const pre = document.createElement('pre')
      const code = document.createElement('code')
      code.textContent = 'const x = 1'
      pre.appendChild(code)
      container.appendChild(pre)

      const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation(() => {})

      expect(() => {
        directive(container, {} as any, {} as any, {} as any)
      }).not.toThrow()

      expect(spy).toHaveBeenCalled()
    })
  })
})
