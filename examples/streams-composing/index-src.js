require("babel-polyfill");
import React from 'react';
import ReactDOM from 'react-dom';
import { reax } from '../../src/index.js';
import * as Rx from 'rxjs';

const namesGenerator = function*() {
  while (true) {
    yield * [ 'Yuriy', 'George', 'Andrew', 'Emily', 'John' ];
  }
}

const name$ = Rx.Observable.zip(
  Rx.Observable.from(namesGenerator()).take(1000),
  Rx.Observable.interval(500),
  name => name
);

const Component = ({ name, ms }) => (
  <div>
    <h1>Hello {name}</h1>
    <h1>{ms} milliseconds</h1>
  </div>
);

const props = ({ lifecycle: { componentWillReceiveProps, componentDidMount } }) => {
  componentWillReceiveProps.subscribe(console.log);
  componentDidMount.subscribe(console.log.bind(console, 'Mounted!'));
  return {
    name: name$,
    ms: Rx.Observable.interval(100)
  };
};

const ConnectedComponent = reax(props)(Component);

ReactDOM.render(
  <ConnectedComponent />,
  document.getElementById('root')
);
