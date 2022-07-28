const h = (tag, props, children) => {
  // vnode就是一个js对象
  return {
    tag,
    props,
    children,
  };
};

const mount = (vnode, container) => {
  // v-node -> element
  // 1. 创建出真实的元素,并且在vnode上保留el
  const el = (vnode.el = document.createElement(vnode.tag));

  // 2. 处理props
  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];

      if (key.startsWith("on")) {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        el.setAttribute(key, value);
      }
    }
  }

  // 3. 处理children
  if (vnode.children) {
    if (typeof vnode.children === "string") {
      el.textContent = vnode.children;
    } else {
      vnode.children.forEach((item) => {
        mount(item, el);
      });
    }
  }

  // 4. 将el挂在到container上
  container.appendChild(el);
};
