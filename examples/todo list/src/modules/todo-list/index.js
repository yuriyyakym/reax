import React from 'react';
import './style.scss';
import { replicateEvent } from 'reax';
import {
  addNewTodoClick$,
  newTodoDescription$,
} from '../../services/todo-list';
import List from './list';

const TodoList = ({ }) => (
  <div className="todo-list">
    <div>
      <input onChange={replicateEvent(newTodoDescription$, event => event.target.value)} />
      <button onClick={replicateEvent(addNewTodoClick$)}>Add todo</button>
    </div>

    <List />
  </div>
);

export default TodoList;
