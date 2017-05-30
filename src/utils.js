export const replicateFunction = (subject, fn) =>
  (...args) => subject.next(fn(...args));

export const replicateEvent = (subject, fn) =>
  (event) => subject.next(fn ? fn(event) : event);
