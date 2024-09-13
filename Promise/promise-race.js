// Polyfill Promise.race

const promise1 = new Promise((resolve, reject) => {
    setTimeout(function() {
        resolve('foo1')
    }, 1000);
});
const promise2 = new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve('foo2')
    }, 500);
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(function() {
    reject('foo3')
  }, 1000);
});

Promise.myRace = function(promises) {
    var promiseArray = Array.isArray(promises) ? promises : Array.from(promises);
    return new Promise(function(resolve, reject) {
        promiseArray.forEach(function(promise) {
            if (promise['then']) {
                promise.then(function(value) {
                    resolve(value);
                }).catch(function(e) {
                    reject(e);
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

var resultArray = Promise.myRace(iterableArray);
var resultSet = Promise.myRace(iterableSet);
var resultMap = Promise.myRace(iterableMap.values());

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