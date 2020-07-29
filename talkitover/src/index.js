//entry point file
import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import  {Provider}  from 'react-redux';
import store from './store/index';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';

//import BrowserRouter and wrap the whole app with it (instead of React.StrictMode) -> set up the app in a way that we have the ability to do routing
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();