import React from 'react';
import { reax } from 'reax';

const Item = ({ description }) => (
  <div className="item">{description}</div>
);

const prepareProps = ({ index }) => {
  console.log(index);
  return {};
};

export default reax(prepareProps)(Item);
