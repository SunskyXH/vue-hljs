import test from "ava";
import vueHljs from "../dist/vue-hljs";
import Vue from "vue";

test("vueHljs is Object", t => {
  t.is("object", typeof vueHljs);
});

test("vueHljs.install is function", t => {
  t.true(vueHljs.install instanceof Function);
});

test("Vue.use(vueHljs) excute successfully", t => {
  Vue.use(vueHljs);
  const _ = Vue.directive("highlight");
  t.true(_.bind instanceof Function && _.update instanceof Function);
});
