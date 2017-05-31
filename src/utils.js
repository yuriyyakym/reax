import * as Rx from 'rxjs';

export const replicateFunction = (subject, fn) =>
  (...args) => subject.next(fn(...args));

export const replicateEvent = (subject, fn) =>
  (event) => subject.next(fn ? fn(event) : event);

export const groupParams = (obj) => Object.keys(obj).reduce(
  (result, key) => {
    const group = obj[key] instanceof Rx.Observable
      ? 'observables'
      : 'properties';
    result[group][key] = obj[key];
    return result;
  },
  { observables: {}, properties: {} }
);

export const combineObjectObservables = (obj) => {
  const observablesNames = Object.keys(obj);
  const observables$ = Object.values(obj);
  return Rx.Observable.combineLatest(
    ...observables$,
    (...values) => observablesNames.reduce(
      (result, streamName, index) => {
        result[streamName] = values[index];
        return result;
      },
      {}
    )
  );
};
