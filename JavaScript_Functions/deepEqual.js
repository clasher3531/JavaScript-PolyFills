const cache = new Map();

/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function isEqual(a, b) {
  if (typeof a !== typeof b) {
    return false;
  }


  // resolving circular array and object problems
  if (cache.get(a) === b || cache.get(b) === a) {
    return true
  }

  cache.set(a, b);

  if (Array.isArray(a)) {
    if (Array.isArray(b)) {
      // checking two arrays
      if (a.length === b.length) {
        // both having the same length
        for(let i = 0; i < a.length; i++) {
          if (!isEqual(a[i], b[i])) {
            cache.delete(a);
            return false;
          }
        }
        cache.delete(a);
        return true;
      } else {
        cache.delete(a);
        return false;
      }
    } else {
      cache.delete(a);
      return false;
    }
  } else if (typeof a === 'object') {
    if (typeof b === 'object') {
      // checking two objects
      if (Object.keys(a).length === Object.keys(b).length) {
        // both having same number of keys
        let aKeys = Object.keys(a);
        for (let j = 0; j < aKeys.length; j++) {
          let akey = aKeys[j];
          if (b[akey]) {
            if (!isEqual(a[akey], b[akey])) {
              cache.delete(a);
              return false;
            }
          } else {
            cache.delete(a);
            return false;
          }
        }
        cache.delete(a);
        return true;
      } else {
        cache.delete(a);
        return false;
      }
    } else {
      cache.delete(a);
      return false;
    }
  } else {
    cache.delete(a);
    return a === b;
  }
}