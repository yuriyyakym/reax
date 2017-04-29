import React, { PureComponent } from 'react';
import * as Rx from 'rxjs';

export const connect = (streamMap) => (Component) => {
  const streamNames = Object.keys(streamMap);
  const streams = Object.values(streamMap);

  const props$ = Rx.combineLatest([
    ...streams,
    (...values) => streamNames.reduce(
      (result, streamName, index) => {
        result[streamName] = values[index];
        return result;
      },
      {}
    )
  ]);

  class ReaxComponent extends PureComponent {
    constructor(props) {
      super(props);
      props$.subscribe(this.setState);
    }

    render() {
      <Component {...this.state} {...this.props} />
    }
  }
}