import counter from './counter';
import shopItems from './shopItems'
import {combineReducers} from 'redux';

let root = combineReducers(
    {
        counter: counter.reducer,
        shopItems: shopItems.reducer
    }
);

export default
{
    reducers: root,
    actions:
    {
        counter: counter.actions,
        shopItems: shopItems.actions
    }
};