<p align="center">
  <a href="https://npmjs.com/package/vue-hljs"><img src="https://img.shields.io/npm/v/vue-hljs.svg" alt="npm package"></a>
  <a href="https://github.com/sunskyxh/vue-hljs/actions/workflows/ci.yml"><img src="https://github.com/sunskyxh/vue-hljs/actions/workflows/ci.yml/badge.svg?branch=main" alt="build status"></a>
</p>
<br/>

# vue-hljs

### Install

```bash
npm install vue-hljs --save
```
or
```bash
yarn add vue-hljs
```


### Usage
```javascript
import Vue from "vue";
import vueHljs from "vue-hljs";
import hljs from "highlight.js";
//if you want to use default color, import this css file
import "vue-hljs/dist/style.css";

//use
Vue.use(vueHljs, { hljs })
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
