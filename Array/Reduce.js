// polyfill for reduce method

Array.prototype.myReduce = function(callback, initialVal) {
    if (typeof callback !== 'function') {
        throw new Error('Type of callback must be a function');
    }

    if (!initialVal && this.length === 0) {
        throw new Error('Initial Value must be there for an empty array');
    }
    var result = initialVal;
    for (var i = 0; i < this.length; i++) {
        result = result ? callback(result, this[i]) : this[0];
    }
    return result;
}

var a = [1, 2, 3, 4];
var b = a.myReduce(function(sum, item) {
    return sum + item;
}, 2);
console.log(b);
