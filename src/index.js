import React, { PureComponent } from 'react';
import * as Rx from 'rxjs';
import { isFunction } from './utils';
import { LIFECYCLE_METHOD, LIFECYCLE_METHODS } from './constants';

const createLifecycle = lifecycle$ => new Proxy({}, {
  get: (target, name) => {
    if(name in target) {
      return target[name];
    }

    if(!LIFECYCLE_METHODS.includes(name)) {
      throw new Error(`Component does not have "${name}" lifecycle method`);
    }

    const observable$ = lifecycle$
      .filter(({ event }) => event === name)
      .pluck('value');

    target[name] = observable$;

    return observable$;
  }
});

// arg: dictionary or callback that returns dictionary of streams and another properties
export const reax = (arg) => (Component) => {
  const lifecycle$ = new Rx.Subject();
  const lifecycle = createLifecycle(lifecycle$);
  const streams = getParams(arg, lifecycle);

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

  class InnerComponent extends PureComponent {
    componentWillReceiveProps(nextProps) {
      lifecycle$.next({
        event: 'componentWillReceiveProps',
        value: {
          props: this.props,
          nextProps
        }
      });
    }

    componentDidMount() {
      lifecycle$.next({ event: 'componentDidMount' });
    }

    render() {
      return <Component {...this.props} />
    }
  }

  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
      combinedStreamsValues$.subscribe(values => this.setState(values));
    }

    render() {
      return <InnerComponent {...this.state} {...this.props} />
    }
  };
}

const getParams = (arg, lifecycle) => isFunction(arg)
  ? arg({ lifecycle })
  : arg;
