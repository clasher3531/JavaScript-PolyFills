
Array.prototype.myForEach = function(callback, thisArgs) {
    if (typeof callback !== 'function') {
        throw new Error('Callback must be of type function');
    }

    var bindWithThis = callback.bind(thisArgs);

    for (var i = 0; i < this.length; i++) {
        bindWithThis(this[i], i, this);
    }
}

var a = [1, 2, 4,3 ,5, 7];
var result = 0;

a.myForEach(function(item) {
    result = result + item;
})

console.log(result);