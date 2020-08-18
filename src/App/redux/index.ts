import counter from './counter';
import shopItems from './shopItems'
import {combineReducers} from 'redux';

declare global
{
    type tRootState =
    {
        counter: number
        shopItems: iShopItemsState
    }
}

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