// Implementation of debounce

let counter = 0;
let inputElement = document.getElementById("debounce_input");
function getData(arg1, arg2) {
  var request = {
    counter: ++counter,
    data: this.value,
    arg1: arg1,
    arg2: arg2,
  };
  console.log("Fetching data .......... ");
  console.log("request", request);
}
const debounce = function (callback, delay, ...args) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    let bindCallBackWithThis = callback.bind(this, ...args);
    timeoutId = setTimeout(bindCallBackWithThis, delay);
  };
};

inputElement.addEventListener("input", debounce(getData, 300, "arg1", "arg2"));
