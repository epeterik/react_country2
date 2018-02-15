import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//package imports
import { Provider } from 'react-redux';

//app imports
import store from './store/store'; //import the store from our store directory

//wrap our app in the Provider that is tied to our store
ReactDOM.render(
    <Provider store={ store }> 
        <div>
            <App />
        </div>
    </Provider>, document.getElementById('root'));

registerServiceWorker();