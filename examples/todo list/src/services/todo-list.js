import * as Rx from 'rxjs';

const initialValue = [];

const createTodo = (description) => ({
  description
});

const newTodoDescription$ = new Rx.Subject();
const addNewTodoClick$ = new Rx.Subject();
const deleteTodoClick$ = new Rx.Subject();

const addNewTodo$ = addNewTodoClick$.withLatestFrom(
  newTodoDescription$,
  (_, description) => (todos) => [ ...todos, createTodo(description) ]
);

const deleteTodo$ = deleteTodoClick$.map(index => todos => [
  ...todos.slice(0, index),
  ...todos.slice(index + 1)
]);

const todos$ = new Rx.Observable.merge(
  addNewTodo$,
  deleteTodo$
).scan((todos, modifyingFn) => modifyingFn(todos), initialValue)

export {
  addNewTodoClick$,
  deleteTodoClick$,
  newTodoDescription$,
  todos$
};
