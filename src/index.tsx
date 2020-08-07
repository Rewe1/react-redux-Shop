import React from "react";
import ReactDOM from "react-dom";
import App from './App/App';
import {createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import root from './App/reducers';

declare global
{
    interface Window
    {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    root, 
    composeEnhancers());

ReactDOM.render
(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);