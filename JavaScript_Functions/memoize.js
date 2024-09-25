/**
 * @param {Function} func
 * @param {(args:[]) => string }  [resolver] - cache key generator
 */
function memo(func, resolver) {
    // your code here
    let cache = new Map();
    return function memoizedFunction(...args) {
      let cacheKey = args.join('_');
      if (resolver) {
        cacheKey = resolver(...args);
        if (cache.get(cacheKey)) {
          return cache.get(cacheKey)
        } else {
          let funResult = func.apply(this, args);
          cache.set(cacheKey, funResult);
          return funResult;
        }
      } else {
        if (cache.get(cacheKey)) {
          return cache.get(cacheKey)
        } else {
          let funResult = func.apply(this, args);
          cache.set(cacheKey, funResult);
          return funResult;
        }
      }
    }
  }