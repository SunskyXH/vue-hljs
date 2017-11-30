import test from "ava";
import vueHljs from "../dist/vue-hljs";
import Vue from 'vue';

test("vueHljs is Object", t => {
    t.is("object", typeof vueHljs);
});

test("vueHljs.install is function", t => {
    t.is(true, vueHljs.install instanceof Function);
});

test("Vue.use(vueHljs) success", t=> {
    Vue.use(vueHljs);
    t.is("object", typeof Vue._installedPlugins);
})
