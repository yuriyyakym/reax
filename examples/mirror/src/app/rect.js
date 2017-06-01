import React from 'react';
import { reax, replicateEvent } from 'reax';
import { mousePosition$ } from '../services/app';

const Rect = ({ mousePosition: { x, y } = {} }) => (
  <div
    className="rect"
    style={{ right: x, bottom: y }}/>
);

const prepareProps = {
  mousePosition: mousePosition$
};

export default reax(prepareProps)(Rect);
