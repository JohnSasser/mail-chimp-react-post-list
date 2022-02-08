import React from 'react';
import App from './App';
import { render } from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import $ from 'jquery';
import 'bootstrap';
window.jQuery = $;

const rootElement = document.getElementById('root');
render(
  <App />,

  rootElement
);

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
