// Polyfill Promise.all

const promise1 = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve('foo1')
    }, 1000);
});
const promise2 = new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve('foo2')
    }, 50);
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(function() {
    resolve('foo3')
  }, 100);
});

Promise.myAll = function(promises) {
    var promiseArray = Array.isArray(promises) ? promises : Array.from(promises);
    if (promiseArray.length === 0) {
        return Promise.resolve(promiseArray);
    }
    var result = new Array(promiseArray.length);
    var promiseResolved = 0;

    return new Promise(function(resolve, reject) {
        promiseArray.forEach(function(promise, index) {
            if (promise['then']) {
                promise.then(function(value) {
                    result[index] = value;
                    promiseResolved++;
                    if (promiseResolved === promiseArray.length) {
                        resolve(result);
                    }
                }).catch(function(e) {
                    reject(e);
                })
            } else {
                result[index] = promise;
                promiseResolved++;
                if (promiseResolved === promiseArray.length) {
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

var resultArray = Promise.myAll(iterableArray);
var resultSet = Promise.myAll(iterableSet);
var resultMap = Promise.myAll(iterableMap.values());

resultArray.then(function(values) {
    console.log(values);
}).catch(function(e) {
    console.log(e)
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
