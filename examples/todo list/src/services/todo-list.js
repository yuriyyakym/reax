import * as Rx from 'rxjs';

const initialValue = [];

const createTodo = (description) => ({
  description
});

const newTodoDescription$ = new Rx.Subject();
const addNewTodoClick$ = new Rx.Subject();
const addNewTodo$ = addNewTodoClick$.withLatestFrom(
  newTodoDescription$
    .pluck('target')
    .pluck('value'),
  (_, description) => (todos) => [ ...todos, createTodo(description) ]
);

const todos$ = new Rx.Observable.merge(
  addNewTodo$
).scan((todos, modifyingFn) => modifyingFn(todos), initialValue)

export { addNewTodoClick$, newTodoDescription$, todos$ };
