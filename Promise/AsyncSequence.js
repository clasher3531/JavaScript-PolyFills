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
function sequence(funcs){
    // your code here
    return function(callback, num) {
      let initialFn = Promise.resolve(num);
      for (let fn of funcs) {
        initialFn = initialFn.then((data) => {
          return promisify(fn)(data);
        })
      }
      initialFn.then((data) => {
        callback(undefined, data);
      }).catch(callback)
    }
  }
  
  function promisify(fn) {
    return function(...args){
      let context = this;
      return new Promise((resolve, reject) => {
        fn.call(context, (error, data) => {
          if (error) {
            reject(error);
            return
          }
          resolve(data);
        }, ...args)
      })
    }
  }