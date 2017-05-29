import React, { PureComponent } from 'react';
import * as Rx from 'rxjs';
import createLifecycle from './lifecycle-proxy';
import { LIFECYCLE_METHOD, LIFECYCLE_METHODS } from './constants';

// arg: dictionary or callback that returns dictionary of streams and another properties
export const reax = (arg) => (Component) => {
  const lifecycle$ = new Rx.Subject();
  const props$ = new Rx.Subject();

  const streams = getParams(arg, lifecycle$, props$);

  const streamNames = Object.keys(streams);
  const streams$ = Object.values(streams);

  const combinedStreamsValues$ = Rx.Observable.combineLatest(
    ...streams$,
    (...values) => streamNames.reduce(
      (result, streamName, index) => {
        result[streamName] = values[index];
        return result;
      },
      {}
    )
  );

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
        value: nextProps
      });
    }

    componentDidMount() {
      lifecycle$.next({ event: 'componentDidMount' });
    }

    render() {
      return <Component {...this.state} {...this.props} />
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
