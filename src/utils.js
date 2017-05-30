export const replicateFunction = (subject, fn) =>
  (...args) => subject.next(fn(...args));

export const replicateEvent = subject =>
  (event) => subject.next(event);
