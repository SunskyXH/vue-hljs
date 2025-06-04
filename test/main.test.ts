import { describe, it, expect } from 'vitest'
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
    expect(app.directive('highlight')).toBeTruthy()
  })
})
