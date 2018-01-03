"use strict";
/**
 *  Volume 1:
 *     section 3, video 3:
 *        Write a Utility to Curry Functions
 */
import {map, filter} from './1.2.3.code';

// const __          = Symbol('some empty thing here...');
// const isPlaceholder      = a => a === __;
// const notPlaceholder     = a => !(isPlaceholder(a));
// const removePlaceholders = a => filter(notPlaceholder, a);

const {log} = console;

function example(a, b, c) {
  log(this, {a, b, c});
  return a + b + c;
}

const __ = Symbol('some empty thing here...');
const isPlaceholder = a => a === __;
const notPlaceholder = a => !(isPlaceholder(a));
const removePlaceholders = a => filter(notPlaceholder, a);

/**
 * Custom Utility to curry
 * @param func
 * @param args
 */
 function curry(func, ...args) {
  const numReqArgs = func.length;

  return function _curry(...args2) {
    const current = [...args, ...args2];

    if (current.length >= numReqArgs) {
      return func(...current);
    }
    //Still need more arguments
    return curry(func, ...current);
  }
}

/**
 * Custom Utility to partially apply arguments to functions
 * @param func
 * @param args
 */
 function partial(func, ...args) {
  const numReqArgs = func.length;

  return function _partial(...args2) {
    const filledIn = map(x => isPlaceholder(x) && args2.length ? args2.shift() : x, args);

    const current = [...filledIn, ...args2];
    const validArgs = removePlaceholders(current);

    if (validArgs.length >= numReqArgs) {
      return func(...validArgs);
    }
    //Still need more arguments
    return partial(func, ...current);
  }
}

// const curried = partial(example, 1, __, 3);
// curried(2);

// const pa1 = curry(example, 1);
// const pa2 = pa1(100);
// pa2(1000);


// example(1, 2, 3);
// example.call(null, 1, 2, 3);
// example.apply(null, [1, 2, 3]);
// const pa = example.bind(null, 1, 2);
// pa(100);


 

// debugger;
export {partial};
