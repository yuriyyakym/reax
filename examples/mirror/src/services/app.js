import * as Rx from 'rxjs';

const mouseMoveEvent$ = new Rx.Subject();
const mousePosition$ = mouseMoveEvent$.map(event => ({
  x: event.clientX,
  y: event.clientY
}));

export {
  mouseMoveEvent$,
  mousePosition$
};
