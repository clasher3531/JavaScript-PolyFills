var arr = [1, 2, 3, [4, 5], [6, [7, [8, 9]]]];

Array.prototype.myFlat = function(depth) {
    if (typeof depth !== 'undefined' && typeof depth !== 'number') {
        throw new Error('depth of type number required but found of type ' + typeof depth);
    }
    if (depth === 0) {
        return this;
    }
    var result = [];
    function flatterned(arr, depth) {
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i]) && depth > 0) {
                flatterned(arr[i], depth - 1);
            } else {
                result.push(arr[i]);
            }
        }
    }
    flatterned(this, depth ? depth : 1);
    return result;
}

var newArray = arr.myFlat(1);

console.log(newArray);