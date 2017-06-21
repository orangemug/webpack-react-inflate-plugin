// Note: This contains a sync function, but it only gets used in the initial
// event loop.
function resolveTree(obj) {
  var createElement = require('react').createElement;

  if(typeof(obj) === "string") {
    return obj;
  }
  else if(Array.isArray(obj)) {
    return obj.map(resolveTree);
  }
  else if(obj) {
    var children = obj.props ? obj.props.children : null;
    return createElement(
      obj.type,
      obj.props,
      resolveTree(children)
    )
  }
}


module.exports = function(obj) {
  this.cacheable();

  return `export default (${resolveTree.toString()})(${obj})`;
}
