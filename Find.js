// polyfil for an array.find function

var obj = {
    a: 5,
    greaterThan: function(item) {
        return item > this.a;
    }
}

Array.prototype.myFind = function(callback, thisArgs) {
    if (typeof callback !== 'function') {
        throw new Error('Callback must be of type function');
    }
    var result;
    var bindWithThis = callback.bind(thisArgs);
    for(var i = 0; i < this.length; i++) {
        if (bindWithThis(this[i])) {
            result = this[i];
            break;
        }
    }
    return result;
}

var a = [1, 2, 5, 6, 7, 8]

var result = a.myFind(obj.greaterThan, obj);
console.log(result);