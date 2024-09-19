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

const throttle = function(callback, delay) {
    let timeoutId = null;
    let lastArguments = null;
    let lastThis = null;

     return (...args) => {
       if (timeoutId) {
         lastArguments = args;
         lastThis = this;
       } else {
         func.apply(this, args);
    
         timeoutId = setTimeout(() => {
           if (lastArguments) {
             func.apply(lastThis, lastArguments);
    
             timeoutId = null;
             lastArguments = null;
             lastThis = null;
           }
         }, wait);
       }
     };
}

throttle_button.addEventListener('click', throttle(getData, 2000, 'arg1', 'arg2'));
