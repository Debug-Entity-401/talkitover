import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  {Provider}  from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/index';
import * as serviceWorker from './serviceWorker';

class Main extends React.Component {
  render() {
	return(
	<Router>
	<Provider store={store}>
		<App />
	</Provider>
	</Router>
	)

  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();