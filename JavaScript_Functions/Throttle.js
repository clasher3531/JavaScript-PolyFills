var throttle_button = document.getElementById('throttle_button');
var counter = 0;
const getData = function(arg1, arg2) {
    var request = {
        counter: ++counter,
        arg1: arg1,
        arg2: arg2
    }
    console.log('Fetching data .......... ');
    console.log('request', request);
}

const throttle = function(callback, delay, ...args) {
    let timeoutId;
    return function() {
        if (timeoutId === null || typeof timeoutId === 'undefined') {
            if (typeof timeoutId === 'undefined') {
                callback.apply(this, args);
            }
            timeoutId = setTimeout(function() {
                timeoutId = null;
                callback.apply(this, args);
            }, delay)
        }
    }
}

throttle_button.addEventListener('click', throttle(getData, 2000, 'arg1', 'arg2'));