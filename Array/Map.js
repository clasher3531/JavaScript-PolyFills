// polyfil for an array.map function

var obj = {
  a: 1,
  divideByThree: function (item) {
    return item * 3 + this.a;
  },
};

Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new Error("Callback as function required");
  }
  try {
    var contextArray = this;
    var arrayLength = this.length;
    var result = new Array(arrayLength);
    var bindWithThis = callback.bind(thisArg);
    for (var i = 0; i < arrayLength; i++) {
      var element = contextArray[i];
      if (i in this) {
        result[i] = bindWithThis(element, i, contextArray);
      }
    }
    return result;
  } catch (e) {
    return "Error";
  }
};

var a = [1, 2, 3, 4, 5, 6];
var b = a.myMap(obj.divideByThree, obj);
console.log(b); // [ 4, 7, 10, 13, 16, 19 ]
