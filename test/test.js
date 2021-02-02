import test from 'ava'
import hljs from 'highlight.js'
import vueHljs from '../dist/vue-hljs.umd'
import Vue from 'vue'

// setup
Vue.use(vueHljs, { hljs })
const testComponent = Vue.component('test-component', {
  template: `<div v-highlight>
  <pre>
    <code class="javascript">console.log('Hello World!')</code>
  </pre>
</div>
  `,
})
const a = new Vue(testComponent)

// test case
test('vueHljs.install is function', (t) => {
  t.true(vueHljs.install instanceof Function)
})

test('component has highlight directive', (t) => {
  t.true('highlight' in a.$options.directives)
})
