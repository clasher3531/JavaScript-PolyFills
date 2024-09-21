// polyfill for reduce method

Array.prototype.myReduce = function () {
  var args = arguments;
  if (typeof args[0] !== "function") {
    throw new Error("Type of callback must be a function");
  }

  if (!args[1] && this.length === 0) {
    throw new Error("Initial Value must be there for an empty array");
  }
  var result = args.length === 1 ? "" : args[1];
  for (var i = 0; i < this.length; i++) {
    result = result !== "" ? args[0](result, this[i], i, this) : this[0];
  }
  return result;
};

const arr = [1, 2, 3, 4, 5, 6].reverse();
const reducer = (a, b, c, d) => {
  if (Array.isArray(a)) {
    a.push([b, c, d]);
    return a;
  } else {
    return [b, c, d];
  }
};

console.log(arr.myReduce(reducer, []));
console.log(arr.reduce(reducer, []));
console.log(arr.myReduce(reducer));
