import shopItems from './shopItems'
import cartItems from './cartItems'
import account from './account'
import {combineReducers} from 'redux';

declare global
{
    type tRootState =
    {
        shopItems: iShopItemsState
        cartItems: iCartItemsState
        account: iAccount
    }
}

let root = combineReducers(
    {
        shopItems: shopItems.reducer,
        cartItems: cartItems.reducer,
        account: account.reducer,
    }
);

export default
{
    reducers: root,
    actions:
    {
        cartItems: cartItems.actions,
        shopItems: shopItems.actions,
        account: account.actions,
    },
    methods:
    {
        shopItems: shopItems.methods
    }
};