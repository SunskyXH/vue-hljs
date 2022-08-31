const i = {
  install: (l, o) => {
    const { hljs: c } = o;
    l.directive("highlight", (t) => {
      t.querySelectorAll("pre code").forEach(c.highlightBlock);
    });
  }
};
export {
  i as default
};
