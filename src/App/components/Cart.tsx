import * as React from "react";
import {useSelector, useDispatch} from 'react-redux';
import cartItems from '../redux/cartItems'
import {Link} from 'react-router-dom'

// Components
import ListShopItem from './ListShopItem'

// Stores
import shopItemsStore from '../redux/shopItems'

export default function Cart()
{
    const dispatch = useDispatch();
    let state = useSelector((state: tRootState) => state)
    let cartItemsState = state.cartItems

    if(cartItemsState.items.length)
        return (
            <div className='appCart'>
                {
                    cartItemsState.items.map((cartItem) =>
                    {
                        //console.log('Cart cartItem', shopItemsStore.methods.getItemById(cartItem.itemID))
                        if(shopItemsStore.methods.getItemById(cartItem.itemID)._id === '-1')
                            return 'Item not found :c'
                        else
                            return <ListShopItem item={shopItemsStore.methods.getItemById(cartItem.itemID)}/>
                    })
                }
            </div>
        )
    else
        return(
            <div className='appCart'>
                You have no items in your cart :c
                <Link to='/shop'><h1>Buy something NOW</h1></Link>
            </div>
        )
}