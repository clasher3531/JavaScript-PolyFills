/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 */
function promisify(func) {
    return function(...args) {
      let context = this;
      return new Promise((resolve, reject) => {
      func.call(context, ...args, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      })
    })}
  }