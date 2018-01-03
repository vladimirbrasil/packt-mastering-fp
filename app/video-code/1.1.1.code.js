"use strict";
/**
 *  Volume 1:
 *     section 1, video 1:
 *         Refactoring Impure Functions
 */

const people = ['Robert', 'Arya', ['Catelyn' ], 'Tyrion'];
const lives = 3;

function playerLostImpure(lives) {
  return lives - 1;
}


function addPersonImpure(list, ...name) {
  return [...list, ...name];
}


// let playerLives = playerLostImpure(lives);
const peopleCopy = addPersonImpure(people, 'hey', 'hi');

debugger;
