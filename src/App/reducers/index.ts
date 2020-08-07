import counter from './counter';
import {combineReducers} from 'redux';

let root = combineReducers(
    {
        counter
    }
);

export default root;