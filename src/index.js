import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

import { Provider } from 'react-redux';
import store from './app/store'

import {BrowserRouter as Router} from 'react-router-dom'
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
         <App />
      </Provider> 
    </Router>
 
  </React.StrictMode>,
  document.getElementById('root')
);


