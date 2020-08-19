import shopItems from './shopItems'
import cartItems from './cartItems'
import {combineReducers} from 'redux';

declare global
{
    type tRootState =
    {
        shopItems: iShopItemsState
        cartItems: iCartItemsState
    }
}

let root = combineReducers(
    {
        shopItems: shopItems.reducer,
        cartItems: cartItems.reducer
    }
);

export default
{
    reducers: root,
    actions:
    {
        cartItems: cartItems.actions,
        shopItems: shopItems.actions
    },
    methods:
    {
        shopItems: shopItems.methods
    }
};