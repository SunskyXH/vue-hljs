import test from 'ava'
import vueHljs from '../dist/vue-hljs'
import Vue from 'vue'

// setup
Vue.use(vueHljs)
const testComponent = Vue.component('test-component', {
  template: `<div v-highlight>
  <pre>
    <code class="javascript">console.log('Hello World!')</code>
  </pre>
</div>
  `
})
const a = new Vue(testComponent)

// test case
test('vueHljs.install is function', t => {
  t.true(vueHljs.install instanceof Function)
})

test('component has highlight directive', t => {
  t.true('highlight' in a.$options.directives )
}) 
