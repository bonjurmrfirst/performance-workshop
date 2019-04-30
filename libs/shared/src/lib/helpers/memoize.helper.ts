export const memoize = (fn) => {
  let cache = new Map();

  return (...args) => {
    const argsToString = JSON.stringify(args);

    if (cache.has(argsToString)) {
      // console.log(`cache: ${argsToString} => ${cache.get(argsToString)}`);

      return cache.get(argsToString);
    }
    else {
      let result = fn(...args);

      // console.log(`calc: ${argsToString} => ${result}`);

      cache.set(argsToString, result);

      return result;
    }
  }
};

export const memoizeRecursive = fn => memoize(fn);
