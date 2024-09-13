// polyFills for Filter

var obj = {
    a: 2,
    checkForEven: function(item) {
        if (this.a === undefined) {
            throw new Error('a is undefined');
        }
        return item%2===0;
    }
}
var a = [1, 2, 3, 4, 5, 6];

Array.prototype.myFilter = function(callback, thisArgs) {
    if (typeof callback !== 'function') {
        throw new Error('Callback must be of type function');
    }
    var arr = [];
    var bindWithThis = callback.bind(thisArgs);
    for (var i = 0; i < this.length; i++) {
        if (bindWithThis(this[i], i, this)) {
            arr.push(this[i])
        }
    }
    return arr;
}

var b = a.myFilter(obj.checkForEven, obj)
console.log(b);