import * as React from "react";
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'

// Components
import CartItem from './CartItem'

// Stores

export default function Cart()
{
    let state = useSelector((state: tRootState) => state)
    let cartItemsState = state.cartItems

    if(cartItemsState.items.length)
        return (
            <div className='appCart'>
                <div className='items'>
                    {
                        cartItemsState.items.map((cartItem, i) =>
                        {
                            return <CartItem key={i} item={cartItem}/>
                        })
                    }
                </div>
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