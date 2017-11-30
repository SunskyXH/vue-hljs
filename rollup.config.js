import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import css from "rollup-plugin-css-porter";

export default {
  input: "src/index.js",
  output: {
    file: "dist/vue-hljs.js",
    format: "cjs"
  },
  plugins: [
    css({dest: "dist/vue-hljs.css"}),
    uglify({}),
    babel({
      presets: ["es2015-loose-rollup"],
      exclude: "node_modules/**"
    }),
  ],
  external: ["highlight.js"]
};
