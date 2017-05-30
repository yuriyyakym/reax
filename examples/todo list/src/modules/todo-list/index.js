import React from 'react';
import './style.scss';
import { replicateEvent } from 'reax';
import {
  addNewTodoClick$,
  newTodoDescription$,
} from '../../services/todo-list';
import List from './list';

const TodoList = ({ }) => (
  <div>
    <div>
      <input onChange={replicateEvent(newTodoDescription$)} />
      <button onClick={replicateEvent(addNewTodoClick$)}>Add todo</button>
    </div>

    <List />
  </div>
);

export default TodoList;
