import React from 'react';
import ReactDOM from 'react-dom';
import G from './G';

describe('G Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(< G />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
