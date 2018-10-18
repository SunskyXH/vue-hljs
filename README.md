[![Build Status](https://travis-ci.org/SunskyXH/vue-hljs.svg?branch=master)](https://travis-ci.org/SunskyXH/vue-hljs)
[![Build status](https://ci.appveyor.com/api/projects/status/08mmr0d193jx30pc?svg=true)](https://ci.appveyor.com/project/SunskyXH/vue-hljs)
[![Coverage Status](https://coveralls.io/repos/github/SunskyXH/vue-hljs/badge.svg?branch=master)](https://coveralls.io/github/SunskyXH/vue-hljs?branch=master)
[![GitHub stars](https://img.shields.io/github/stars/sunskyxh/vue-hljs.svg?style=flat-square)](https://github.com/sunskyxh/vue-hljs/stargazers)
[![MITLicence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)


[![NPM](https://nodei.co/npm/vue-hljs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-hljs/)

# vue-hljs

### Install

```bash
npm install vue-hljs --save
```

### Useage
```javascript
import Vue from "vue";
import vueHljs from "vue-hljs";
//if you want to use default color, import this css file
import "vue-hljs/dist/vue-hljs.min.css";

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
### Use your own style

This plugin use gruvbox-dark as default style.

You can wirte your own style or see [highlight.js demo](https://highlightjs.org/static/demo/).
And then import your css file in Vue project entry.
