"use strict";
/**
 *  Volume 1:
 *     section 4, video 4:
 *         Using JSX and Virtual DOM
 */
import html, {renderDOM} from './1.4.3.code';
import {lensProp, view, set, sum} from 'ramda';
import { setTimeout } from 'timers';

const counterL = lensProp('counter');

const ui = (state) => {

  const {counter = 0, greeting = '', whom = ''} = state;

  return (
    <section className="container">
      <div className="jumbotron">
        <h1>
          {`${greeting} ${whom}`}
        </h1>
        <p>This is rendered using JSX without Virtual DOM</p>
      </div>

      <div className="row">
        <div className="col-sm-10">
          <div className="form">

            <legend>Click the buttons to move the counter up and down!</legend>

            <div classname="input-group">
              <div className="input-group-btn btn-lg">

                <button 
                  className="btn btn-lg"
                  on-click="{() => updateTimer(state, 1)}">
                  <icon className="glyphicon glyphicon-arrow-up"></icon>
                  Up
                </button>

                <button 
                  className="btn btn-lg"
                  on-click="{() => updateTimer(state, -1)}">
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

  return (
    html('div', {className: 'container'},
      html('p', null,
        html('strong', {className: 'lead'},
          // Children text nodes
          `${greeting} ${whom}`,
          (greeting && whom ? '!' : '')
        ),
        html('br'),
        html('hr'),
        html('p', {className: 'test'}, 'olá')
      )
    )
  );
};
 

const defaultState = {counter: 0, greeting: 'Hello', whom: 'World'};

const update = renderDOM(
  ui,
  document.getElementById('packtPubApp'),
  defaultState
);

function updateTimer(state, modifier=0) {
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

setTimeout(update, 5000, {greeting: 'HEY HEY', whom: 'HI HI'});