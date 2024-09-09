// polyfil for an array.map function

var obj = {
    a: 1,
    divideByThree: function(item) {
        return ((item*3) + this.a);
    }
}

Array.prototype.myMap = function(callback, thisArgs) {
    if (typeof callback !== 'function') {
        throw new Error('Callback as function required');
    }
    try {
        var contextArray = this;
        var result = [];
        var bindWithThis = callback.bind(thisArgs);
        for (var i = 0; i < contextArray.length; i++) {
            var element = contextArray[i];
            result.push(bindWithThis(element, i, contextArray));
        }
        return result;
    } catch(e) {
        return "Error"
    }
};



var a = [1, 2, 3, 4, 5, 6];
var b = a.myMap(obj.divideByThree, obj);
console.log(b); // [ 4, 7, 10, 13, 16, 19 ]
