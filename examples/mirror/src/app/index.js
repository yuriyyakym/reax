import React from 'react';
import { replicateEvent } from 'reax';
import { mouseMoveEvent$ } from '../services/app';
import Rect from './rect.js';

const App = ({ }) => (
  <div
    className="app"
    onMouseMove={replicateEvent(mouseMoveEvent$)}>
    <Rect />
  </div>
);

export default App;
