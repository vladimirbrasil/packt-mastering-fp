"use strict";
/**
 *  Volume 1:
 *     section 2, video 2:
 *         Replacing Loops with Higher-Order Functions
 */

const list = [12, 6, 4, 66, 4, 5];

// function every(predicate, list, i = 0) {
//   let allPassing = true;
//   for (i = 0; i < list.length; i++) {
//     const item = list[i];
//     if (!predicate(item)) {
//       allPassing = false;
//       break;
//     }
//   }
//   return allPassing;
// }
function every(predicate, [item, ...list]) {
  if (list.length) {
    return predicate(item) ? every(predicate, list) : false;
  }
  return true;
}

// function some(predicate, list) {
//   let somePassing = false;
//   let i = list.length;
//   while (i--) {
//     const item = list[i];
//     if (predicate(item)) {
//       somePassing = true;
//       break;
//     }
//   }
//   return somePassing;
// }
function some(predicate, [item, ...list]) {
  if (list.length) {
    return predicate(item) ? true : some(predicate, list);
  }
  return false;
}

const gt3 = n => n > 3;
const lt5 = n => n < 5;

console.log(`${some(lt5, list) ? 'Some' : 'None'} in list are less than 5`);
console.log(`${every(gt3, list) ? 'Every' : 'Not every'} in list are greater than 3`);

// every(gt3, list);
// some(lt5, [1,2,3,4,5]);

debugger;
