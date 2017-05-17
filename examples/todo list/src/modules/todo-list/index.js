import React from 'react';
import './style.scss';
import {
  addNewTodoClick$,
  newTodoDescription$,
} from '../../services/todo-list';
import List from './list';

const TodoList = ({ }) => (
  <div>
    <div>
      <input onChange={newTodoDescription$.next.bind(newTodoDescription$)} />
      <button onClick={addNewTodoClick$.next.bind(addNewTodoClick$)}>Add todo</button>
    </div>

    <List />
  </div>
);

export default TodoList;
