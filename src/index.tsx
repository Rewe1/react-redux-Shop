import React from "react";
import ReactDOM from "react-dom";
import App from './App/App';
import {createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import reduxStore from './App/redux';

declare global
{
    interface Window
    {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reduxStore.reducers, 
    composeEnhancers());

ReactDOM.render
(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);