'use strict';
/**
 *  Volume 1:
 *     section 2, video 4:
 *         Reasoning With Reduce
 */
import {sum, divide} from './1.1.2.code';
import {map, filter} from './1.2.3.code';

const students = [
  { name: 'Alice', grades: [89, 93, null, 100, 66] },
  { name: 'Bob', grades: [70, 71, 100, 82, 90] },
  { name: 'Martin', grades: [89, 93, 45, 62, null] },
  { name: 'Storm', grades: [80, 70, 100, 82, 94] },
  { name: 'Corrina', grades: [86, null, 100, 34, 79] },
  { name: 'Alexa', grades: [95, 85, 100, null, 64] },
  { name: 'Susan', grades: [82, 91, 84, 94, 90] },
  { name: 'Jake', grades: [92, null, 84, null, 90] },
];

const subtract = (a, b) => a - b;
const ten = () => sum(5, 5);

const sortAsc = (list) => list.sort(subtract);
const getTotal = reduce((acc, n) => acc + n);
const clean = n => !n ? 0 : n;
const dropLowest = list => sortAsc(map(clean, list)).slice(1);
const getAvg = xs => divide(getTotal(xs), xs.length);

const data = map(studentStats)(students);
// console.log(`data`, data);

const getBest = reduce(getBestStats, {topScore: [0, ''], topAvg: [0, '']});
const best = getBest(data);

function getBestStats(accum, student) {
  const {top, avg, name} = student;
  const {topScore, topAvg} = accum;

  const stats = {topAvg, topScore};
  stats.topScore = top > topScore[0] ? [top, name] : topScore;
  stats.topAvg = avg > topAvg[0] ? [avg, name] : topAvg;
  return stats;
}

function studentStats(student) {
  const {name} = student;
  const grades = dropLowest(student.grades);

  const avg = getAvg(grades);
  const top = Math.max(...grades);

  return {name, grades, avg, top};
}

// const total = [1, 2, 3, 4, 5].reduce((acc, n) => {
//   return acc + n;
// });

// const total = reduce((acc, n) => {
//   return acc + n;
// }, 0, [1, 2, 3, 4, 5]);
// const getTotal = reduce((acc, n) => {
//   return acc + n;
// });
// const total = getTotal([1, 2, 3, 4, 5]);

// const getMap = map((el) => 2 * el);
// const twice = getMap([1, 2, 3, 4, 5]);
// const filtered = filter(x => x > 2, [1, 2, 3, 4, 5]);

//debugger;

// After finishing, export these for use in next lesson
export {reduce, map, filter, getBestStats, studentStats};

// function reduce(reducer, initial = 0, list) {
//   let accum = initial;
//   list.forEach(item => {
//     accum = reducer(accum, item);
//   });
//   return accum;
// }
function reduce(reducer, initial = 0, list) {
  if (arguments.length < 3) {
    return array => reduce(reducer, initial, array);
  }
  let accum = initial;
  list.forEach(item => {
    accum = reducer(accum, item);
  });
  return accum;
}


// function map(fn, arr) {
//   if (arguments.length < 2) {
//     return array => map(fn, array)
//   }
//   reduce((acc, item) => {
//     return acc.concat(fn(acc, item));
//   }, [], arr);
// }
// function map2(predicate, [item, ...list]) {
//   let arr = [];
//   if (arguments.length < 2) {
//     return array => map2(predicate, array)
//   }
//   arr.push(item);
//   return list.length ? map2(predicate, list)
// }
