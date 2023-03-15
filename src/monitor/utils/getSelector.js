function getSelectors(path) {
  return path
    .reverse()
    .filter(element => {
      return element !== document && element !== window;
    })
    .map(element => {
      let selector = '';
      if (element.id) {
        return `${element.nodeName.toLowerCase()}#${element.id}`;
      } else if (element.className && typeof element.className === 'string') {
        return `${element.nodeName.toLowerCase()}.${element.className}`;
      } else {
        selector = element.nodeName.toLowerCase();
      }
      return selector;
    })
    .join(' ');
}

function composedPath(e) {
  // 存在则直接return
  if (e.path) {
    return e.path;
  }
  if (e.composedPath && e.composedPath().length > 0) {
    return e.composedPath();
  }
  // 不存在则遍历target节点
  let target = e.target;
  e.path = [];
  while (target.parentNode !== null) {
    e.path.push(target);
    target = target.parentNode;
  }
  // 最后补上document和window
  e.path.push(document, window);
  return e.path;
}

export default function (event) {
  return getSelectors(composedPath(event));
}
