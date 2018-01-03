"use strict";
/**
 *  Volume 1:
 *     section 4, video 4:
 *         Using JSX and Virtual DOM
 */
// import html from './1.4.3.code';
import { lensProp, view, set, sum, is } from 'ramda';
import { setTimeout } from 'timers';

//Component
// import { JumboTron } from './JumboTron';
export const JumboTron = ({state}) => {
  const {greeting, whom} = state;

  return (
    <div className="jumbotron">
      <h1>
        {`${greeting} ${whom}`}
      </h1>
      <p>This is rendered using JSX without Virtual DOM</p>
    </div>
  );
}

import makeElem from 'virtual-dom/h';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import buildHTML from 'virtual-dom/create-element';

const counterL = lensProp('counter');

export function renderDOM(stateToUI, root, defState = {}) {
  let currentUI = stateToUI(defState);
  const rootNode = buildHTML(currentUI);

  //When app loads... we load our UI into page
  root.appendChild(rootNode);

  function diffAndPatch(nextUI) {
    const updatedDOM = diff(currentUI, nextUI);
    patch(rootNode, updatedDOM);
    currentUI = nextUI;
  }

  return (nextState) => diffAndPatch(stateToUI(nextState));
}

export default function html(elementType, props, ...children) {
  if (is(Function, elementType)) {
    return elementType(props, children);
  }
  // Create an element for ui
  return makeElem(elementType, props, children);
};

const ui = (state) => {

  const {counter = 0} = state;

  return (
    <section className="container">

      <JumboTron state={state}/>

      <div className="row">
        <div className="col-sm-10">
          <div className="form">

            <legend>Click the buttons to move the counter up and down!</legend>

            <div classname="input-group">
              <div className="input-group-btn btn-lg">

                <button
                  className="btn btn-lg"
                  onclick={() => updateTimer(state, 1)}>
                  <icon className="glyphicon glyphicon-arrow-up"></icon>
                  Up
                </button>

                <button
                  className="btn btn-lg"
                  onclick={() => updateTimer(state, -1)}>
                  <icon className="glyphicon glyphicon-arrow-down"></icon>
                  Down
                </button>

                <div className="form-control">
                  <div className="lead">
                    <strong>
                      {counter}
                    </strong>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );

};


const defaultState = { counter: 0, greeting: 'Hello', whom: 'World' };

const update = renderDOM(
  ui,
  document.getElementById('packtPubApp'),
  defaultState
);

function updateTimer(state, modifier = 0) {
  const updatedState = set(
    counterL, sum(
      [parseInt(view(counterL, state))
        , modifier]
    )
    , state
  );

  console.log(state, updatedState);

  return update(updatedState);
}

setTimeout(update, 15000, { greeting: 'HEY HEY', whom: 'HI HI' });