
/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function parallel(funcs){
    // your code here
    return function(callback, data) {
        let promiseArray = [];
        for(let fun of funcs) {
            promiseArray.push(promisify(fun)(data));
        }
        promiseAll(promiseArray).then((data) => {
            callback(undefined, data);
        }).catch((e) => {
            callback(e, undefined);
        })
    }
}
  
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let promiseArray = Array.isArray(promises) ? promises : Array.from(promises);
        if (promiseArray.length === 0) {
            return resolve(promiseArray);
        }
        var promiseResolved = 0;
        var promiseResult = new Array(promiseArray.length);
        promiseArray.forEach((promise, index) => {
            if ('then' in promise) {
                promise.then((data) => {
                    promiseResult[index] = data
                    promiseResolved++;
                    if (promiseResolved === promiseArray.length) {
                        resolve(promiseResult);
                    }
                }).catch((e) => {
                    reject(e);
                })
            } else {
                promiseResult[index] = promise;
                promiseResolved++;
                if (promiseResolved === promiseArray.length) {
                    resolve(promiseResult);
                }
            }
        })
    })
}
  
function promisify(func) {
    return function(...args) {
        let context = this;
        return new Promise((resolve, reject) => {
            func.call(context, (error, data) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(data)
            })
        }, ...args);
    }
}