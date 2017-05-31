import React, { PureComponent } from 'react';
import * as Rx from 'rxjs';
import { combineObjectObservables, groupParams } from './utils';
import createLifecycle from './lifecycle-proxy';
import { LIFECYCLE_METHOD, LIFECYCLE_METHODS } from './constants.js';

// arg: dictionary or callback that returns dictionary of streams and another properties
export const reax = (arg) => (Component) => {
  const lifecycle$ = new Rx.Subject();
  const props$ = new Rx.Subject();
  const params = getParams(arg, lifecycle$, props$);
  const { observables, properties } = groupParams(params);
  const combinedStreamsValues$ = combineObjectObservables(observables);

  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
      combinedStreamsValues$.subscribe(values => this.setState(values));
    }

    componentWillReceiveProps(props) {
      props$.next(props);
      lifecycle$.next({
        event: 'componentWillReceiveProps',
        value: props
      });
    }

    componentDidMount() {
      lifecycle$.next({ event: 'componentDidMount' });
    }

    render() {
      return <Component {...properties} {...this.state} {...this.props} />
    }
  };
}

const getParams = (arg, lifecycle$, props$) => !(arg instanceof Function)
  ? arg
  : arg({
    lifecycle: createLifecycle(lifecycle$),
    lifecycle$,
    props$
  })
