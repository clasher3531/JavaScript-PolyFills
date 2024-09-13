// Polyfill Promise.any

const promise1 = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve('foo1')
    }, 1000);
});
const promise2 = new Promise((resolve, reject) => {
    setTimeout(function() {
      reject('foo2')
    }, 500);
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(function() {
    reject('foo3')
  }, 1000);
});

Promise.myAny = function(promises) {
    var promiseArray = Array.isArray(promises) ? promises : Array.from(promises);
    var rejectedPromise = 0;
    var rejectedArray = new Array(promiseArray.length);
    return new Promise(function(resolve, reject) {
        promiseArray.forEach(function(promise, index) {
            if (promise['then']) {
                promise.then(function(value) {
                    resolve(value);
                }).catch(function(e) {
                    rejectedPromise++;
                    rejectedArray[index] = e;
                    if (rejectedPromise === promiseArray.length) {
                        reject(new AggregateError(rejectedArray, 'All Promises were rejected'));
                    }
                })
            } else {
                resolve(promise);
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

var resultArray = Promise.myAny(iterableArray);
var resultSet = Promise.myAny(iterableSet);
var resultMap = Promise.myAny(iterableMap.values());

resultArray.then(function(values) {
    console.log(values);
}).catch(function(e) {
    console.log(e);
})

resultSet.then(function(values) {
    console.log(values);
}).catch(function(e) {
    console.log(e);
})

resultMap.then(function(values) {
    console.log(values);
}).catch(function(e) {
    console.log(e);
})