import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import auth from './store/reducers/auth';
import cart from './store/reducers/cart';

const rootReducer = combineReducers({
  auth,
  cart
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store= {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

