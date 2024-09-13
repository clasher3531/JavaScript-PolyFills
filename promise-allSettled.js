// Polyfill Promise.allSettled

const promise1 = new Promise((resolve, reject) => {
    setTimeout(resolve('foo1'), 5000);
  });
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(reject('foo3'), 100);
});

Promise.myAllSettled = function(promises) {
    var promiseArray = Array.isArray(promises) ? promises : Array.from(promises);
    var result = new Array(promiseArray.length);
    var promiseSettled = 0;
    return new Promise(function(resolve, reject) {
        promiseArray.forEach(function(promise, index) {
            if (promise['then']) {
                promise.then(function(value) {
                    result[index] = {status: 'fulfilled', value: value};
                    promiseSettled++;
                    if (promiseSettled === promiseArray.length) {
                        resolve(result);
                    }
                }).catch(function(e) {
                    result[index] = {status: 'rejected', reason: e};
                    promiseSettled++;
                    if (promiseSettled === promiseArray.length) {
                        resolve(result);
                    }
                })
            } else {
                result[index] = {status: 'fulfilled', value: promise};
                promiseSettled++
                if (promiseSettled === promiseArray.length) {
                    resolve(result);
                }
            }
        })
    })
}

var iterableArray = new Array(promise1, promise2, promise3);
var iterableSet = new Set([promise1, promise2, promise3]);
var iterableMap = new Map();
iterableMap.set('promise1', promise1);
iterableMap.set('promise2', promise2);
iterableMap.set('promise3', promise3);

var resultArray = Promise.myAllSettled(iterableArray);
var resultSet = Promise.myAllSettled(iterableSet);
var resultMap = Promise.myAllSettled(iterableMap.values());

resultArray.then(function(values) {
    console.log(values);
})

resultSet.then(function(values) {
    console.log(values);
})

resultMap.then(function(values) {
    console.log(values);
})