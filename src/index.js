// react
import React from 'react';
// modules
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Components
import Cheonglyang from './Cheonglyang';
// scss
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Cheonglyang />
  </BrowserRouter>
);
