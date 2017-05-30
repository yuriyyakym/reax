import React from 'react';
import { reax, replicateEvent } from 'reax';
import { deleteTodoClick$ } from '../../services/todo-list';

const Item = ({ description, index }) => (
  <div className="item">
    {description}

    <div
      className="delete"
      onClick={replicateEvent(deleteTodoClick$, () => index)}>
      &times;
    </div>
  </div>
);

const prepareProps = ({ }) => {
  return {};
};

export default reax(prepareProps)(Item);
