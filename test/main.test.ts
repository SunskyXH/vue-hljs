import { describe, it, expect, vi } from 'vitest'
import hljs from 'highlight.js'
import plugin from '../dist/vue-hljs.umd'
import { createApp } from 'vue'

// setup
const app = createApp({
  template: `<div v-highlight>
  <pre>
    <code class="javascript">console.log('Hello World!')</code>
  </pre>
</div>
  `,
})

app.use(plugin, { hljs })

// test case
describe.concurrent('setup', () => {
  it('vueHljs.install is function', (t) => {
    expect(plugin.install).toBeInstanceOf(Function)
  })

  it('app instance has highlight directive', (t) => {
    expect(app.directive('highlight')).toBeDefined()
  })

  it('highlight directive calls highlight.js on code blocks', () => {
    const directive = app.directive('highlight')!
    const code1 = {}
    const code2 = {}
    const el = {
      querySelectorAll: vi.fn(() => [code1, code2]),
    } as any

    const spy = vi.spyOn(hljs, 'highlightBlock').mockImplementation(() => {})
    directive(el)

    expect(el.querySelectorAll).toHaveBeenCalledWith('pre code')
    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy.mock.calls[0][0]).toBe(code1)
    expect(spy.mock.calls[1][0]).toBe(code2)

    spy.mockRestore()
  })
})
