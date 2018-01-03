"use strict";
/**
 *  Volume 1:
 *     section 3, video 4:
 *        Combine Map, Filter and Reduce with Curried Functions
 */
import sources from '../data/calendar-events';
import moment from 'moment';
import { map, reduce } from './1.2.4.code';
import { filter } from 'ramda';
import { partial, __ } from './1.3.3.code';

const curry = partial;

const isDefined = o => typeof o !== "undefined";
const isObj = o => o && typeof o === "object";
const prop = curry(
  (key, obj) => isObj(obj) && isDefined(obj[key]) ? obj[key] : undefined
);

// const path = (arrPath, obj) => reduce((obj, key) => prop(key, obj), obj, arrPath);
const flip = curry((fn, a, b, ...args) => fn(b, a, ...args));
const objProp = flip(prop);
const path = curry((arrPath, obj) => reduce(objProp, obj, arrPath));

const { log } = console;

// const o = {'a': {'b': {'c': 1000}}}
// log(path(['a', 'b', 'c'], o))

const mdate = (date) => moment(date, moment.ISO_8601, true);
function onWeekend(date) {
  const dayNum = mdate(date).isoWeekday();
  return (dayNum === 6 || dayNum === 7);
}
// function onWeekend(day) {
//   const dayNum = new Date(day).getDay();
//   return (dayNum === 6 || dayNum === 0);
// }

function getDate(item) {
  return prop('start', item)
}

const startDateTime = path(['start', 'dateTime'])
const getWeekendItems = filter(item => onWeekend(startDateTime(item)));

// const showDateTime = d => moment(d, moment.ISO_8601, false).format();
const showDateTime = d => new Date(d).toUTCString();
// const items = map(source => prop('items', source), sources)
// const items = map(prop('items'), sources)
const getItems = map(prop('items'));

// // log(startDateTime(getItems(sources)[0]));
// log(sources)
// log(getItems(sources))

const weEvents = map(getWeekendItems, getItems(sources));
const mapDateTimeStrings = map(event => {
  return `${prop('summary', event)} - ${showDateTime(startDateTime(event))}`;
});

// log(weEvents)
// log([].concat(...map(mapDateTimeStrings, weEvents)));

// const a = onWeekend('2017-12-29T10:00:00-04:00');
// const date = moment(a, moment.ISO_8601) //moment(day, 'YYYY-MM-DDTHH:MM:SS');
// const b = date.isoWeekday();

// debugger;
