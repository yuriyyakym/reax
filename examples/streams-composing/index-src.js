require("babel-polyfill");
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from '../../src/index.js';
import * as Rx from 'rxjs';

const namesGenerator = function*() {
  while (true) {
    yield * [ 'Yuriy', 'George', 'Andrew', 'Emily', 'John' ];
  }
}

const name$ = Rx.Observable.zip(
  Rx.Observable.from(namesGenerator()).take(10),
  Rx.Observable.interval(500)
).do(([ name ]) => name);


// const name$ = Rx.Observable.interval(500);

const Component = ({ name }) => (
  <div>
    <h1>{name}</h1>
    <h1>Hello</h1>
  </div>
);

const observablesMap = {
  name: name$
};

const ConnectedComponent = connect(observablesMap)(Component);

ReactDOM.render(
  <ConnectedComponent />,
  document.getElementById('root')
);
