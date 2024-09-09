// polyfil for an array.map function

Array.prototype.myMap = function(callback) {
    try {
        var contextArray = this;
        var result = [];
        for (var i = 0; i < contextArray.length; i++) {
            var element = contextArray[i];
            result.push(callback(element, i, this));
        }
    return result;
    } catch(e) {
        return "Error"
    }
};

var a = [1, 2, 3, 4, 5, 6];
var b = a.myMap(function(item) {
    return item * 2;
});
console.log(b); // [2, 4, 6, 8, 10, 12]
