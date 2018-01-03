/**
 *  Volume 1:
 *     section 2, video 3:
 *         A Better Way to Map and Filter
 */
import {sum} from './1.1.2.code';

const gt10   = n => n > 10;
const addTen = n => sum(10, n);
const itemsOverTen  = [1, 4, 12, 14, 6, 29].filter(gt10);
const itemsAddTen   = [1, 4, 12, 14, 6, 29].filter(addTen);
const mapThenFilter = [1, 4, 12, 14, 6, 29].filter(gt10).map(addTen);

function map(predicate, list) {
  if (arguments.length < 2) {
    return array => map(predicate, array);
  }
  let arr = [];
  list.forEach(item => {
    arr.push(predicate(item));
  });
  return arr;
}
function filter(predicate, list) {
  if (arguments.length < 2) {
    return array => map(predicate, array);
  }
  let arr = [];
  list.forEach(item => {
    if (predicate(item)) arr.push(item);
  });
  return arr;
}

// After creating map and filter, uncomment below line to use in other
// files
export {map, filter}
