"use strict";
/**
 *  Volume 1:
 *     section 2, video 5:
 *        Map, Reduce, Higher-Order DOM
 */
// import {reduce, map, getBestStats, studentStats} from './1.2.4.code';
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




const {isArray}   = Array;

const students = [
  {name: 'Alice',      grades: [89, 93, null, 100, 66] },
  {name: 'Bob',        grades: [70, 71, 100, 82, 90]   },
  {name: 'Martin',     grades: [89, 93, 45, 62, null]  },
  {name: 'Storm',      grades: [80, 70, 100, 82, 94]   },
  {name: 'Corrina',    grades: [86, null, 100, 34, 79] },
  {name: 'Alexa',      grades: [95, 85, 100, null, 64] },
  {name: 'Susan',      grades: [82, 91, 84, 94, 90]    },
  {name: 'Jake',       grades: [92, null, 84, null, 90]}
];


const appRoot     = document.querySelector('#packtPubApp');

appRoot.appendChild(
  /** HTMLElement **/
  treeBuilder(
    'div', [
      'p', [
        'em', 'Hello',
        'strong', '!'
      ]
    ]
  )
);


function higherOrderSorter(sortFn, component) {
  return data => {
    const sorted = data.sort(sortFn);
    return component(data);
  };
}

function sortBy(key) {
  return ({[key]: a, [key]: b}) => {
    return a > b ? 1 : -1;
  };
}

const StudentComponent = higherOrderSorter(sortBy('name'), studentElem);

/**
 * Create an HTMLElement with attributes
 * @param tag
 * @param props
 */
function elm(tag = 'div', props = {}) {
  const elem = document.createElement(tag);

  for (const attr in props) {
    if (attr in elem)
      elem[attr] = props[attr];
    else
      elem.setAttribute(attr, props[attr]);
  }

  return elem;
}



/**
 * Build a nested DOM Structure in a document fragment.
 * Supports Siblings.
 *
 * @param elemName
 * @param children
 * @param siblings
 */
function treeBuilder(elemName, children, ...siblings) {
  const createElem     = document.createElement.bind(document);
  const createText     = document.createTextNode.bind(document);

  // First arg is null when a text node is sibling to a regular elem
  if (!elemName) {
    elemName = document.createDocumentFragment();
  }

  // Create a document fragment to attach
  const frag = document.createDocumentFragment();

  // If "sting" then make into an element, else it's already an element
  const elem = typeof elemName === "string" ? createElem(elemName) : elemName;

  // Put children into element
  elem.appendChild(isArray(children) ? treeBuilder(...children) : createText(children));

  // Put element into fragment "parent"
  frag.appendChild(elem);

  // If element has siblings they will be appended to fragment
  if (siblings.length) {
    frag.appendChild(treeBuilder(...siblings));
  }

  // Return fragment
  return frag;
}
