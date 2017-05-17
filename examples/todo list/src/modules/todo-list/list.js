import React from 'react';
import { reax } from 'reax';
import Item from './item';
import { todos$ } from '../../services/todo-list';

const List = ({ todos = [] }) => {
  const components = todos.map((todo, index) =>
    <Item
      key={index}
      index={index}
      description={todo.description} />
  );

  return React.createElement('div', { className: 'list' }, components);
};

const prepareProps = { todos: todos$ };
export default reax(prepareProps)(List);
