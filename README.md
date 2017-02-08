[![GitHub issues](https://img.shields.io/github/issues/sunskyxh/vue-hljs.svg?style=flat-square)](https://github.com/sunskyxh/vue-hljs/issues)
[![GitHub forks](https://img.shields.io/github/forks/sunskyxh/vue-hljs.svg?style=flat-square)](https://github.com/sunskyxh/vue-hljs/network)
[![GitHub stars](https://img.shields.io/github/stars/sunskyxh/vue-hljs.svg?style=flat-square)](https://github.com/sunskyxh/vue-hljs/stargazers)
[![MITLicence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)


[![NPM](https://nodei.co/npm/vue-hljs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-hljs/)

#Use

### Install

```bash
npm install vue-hljs --save
```

### use
```javascript
//es6
import Vue from 'vue',
import vueHljs from 'vue-hljs'

//CommonJS
const Vue = require('vue')
const vueHljs = require('vue-hljs')

//use
Vue.use(vueHljs)
```

```html
<div v-highlight>
  <pre>
    <code class="you can specify the language here">...</code>
  </pre>
</div>
```
