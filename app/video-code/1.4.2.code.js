"use strict";"use strict";
/**
 *  Volume 1:
 *     section 4, video 2:
 *         Lenses with Ramda
 */
import {lens, set, view, map, when, is, curry, assoc, prop, lensProp, lensPath} from 'ramda';

const {assert, log} = console;

// The same object from last example.
// const state = freezer(pokerTable());
const state = pokerTable();

// A function to log out table details.
logOut(state, 'initial object');

// const getter = curry((propName, obj) => {
//   return is(Object, obj) ? obj[propName] : undefined;
// });
const getter = prop;

// const setter = curry((key, val, obj) => {
//   const rv = mapObjIndexed(identity, obj); //copy
//   rv[key] = val;
//   return rv;
// });
const setter = assoc;

// const anteL = lens(getter('ante'), setter('ante'));
const anteL = lensProp('ante');
const chipValuesL = lensProp('chipValues');
const greenL = lensProp('green');
// const chipValsGreenL = obj => chipValuesL(greenL(obj));
const chipValsGreenL = lensPath(['chipValues', 'green']);
const player0chipsL = lensPath(['players', '0', 'chips']);

// To view: view(lens, state);
// To set:  newObj = set(lens, value, {});

const state2 = set(anteL, 100, state);

logOut(state2, 'state2');

const state3 = set(chipValsGreenL, 400, state2);

logOut(state3, 'state3');

const state4 = set(player0chipsL, 999, state3);

logOut(state4, 'state4');

debugger;

/**
 * Deep freeze an object
 *
 * @param obj
 * @returns {Object}
 */
function freezer(obj) {
  map(
    when(is(Object), freezer)
  )(obj);
  return Object.freeze(obj);
}


/**
 * The initial pokerTable object
 *
 * @returns {{}}
 */
function pokerTable() {
  return {
    players: [
      {folded: false, chips: 205, name: 'Thomas', cards: []},
      {folded: false, chips: 110, name: 'Graham', cards: []},
      {folded: false, chips: 450, name: 'Wendy', cards: []}
    ],

    phase: 0,  // 'pre-flop'

    ante: 10,

    community: [
      [10, '♠'], [5, '♥'], [12, '♥']
    ],

    chipValues: {
      white: 1, blue: 5, green: 10, yellow: 25, red: 50, black: 100
    }
  };
}


/**
 * Log a poker table
 * @param state   poker table object to display info of
 * @param [label] optional label for console log
 */
function logOut(state, label='') {
  console.log(`\n\n${label}\n
  Ante: ${state.ante}
  Phase: ${state.phase}
  Community:
    ${state.community.join('\n    ')}
  Green: ${state.chipValues.green}`
  );
}

