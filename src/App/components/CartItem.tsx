import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'


// Stores
import shopItemsStore from '../redux/shopItems'
import cartItemsStore from '../redux/cartItems'

export default (props: {item: iCartItem}) =>
{
    const state: tRootState = useSelector((state: tRootState) => state)
    const dispatch = useDispatch()

    let cartItem = shopItemsStore.methods.getItemById(state.shopItems.items, props.item._id)

    if(cartItem._id === '-1')
        return (
            <div className='appListItem'>
                Item not found :c
            </div>
        )
    else
        return (
            <div className='appCartItem'>
                <img src='https://via.placeholder.com/128'/>
                <div className='itemInfo'>
                    <Link to={`/shop/item/${cartItem._id}`}>
                        <h2>{`${cartItem.title ? cartItem.title : "The title wasn't specified :c"}`}</h2>
                    </Link>
                    <span id='price'>{`${cartItem.price ? `$${cartItem.price.toFixed(2)}` : "The price wasn't specified :c"}`}</span>
                    <div id='cartItemAmount'>
                        <button id='removeItem' onClick={() =>
                        {
                            dispatch(cartItemsStore.actions.removeItems([{...props.item}]))
                        }}>X</button>
                        <div id='setCartItemAmount'>
                            <button id='decreaseAmount' onClick={() =>
                            {
                                dispatch(cartItemsStore.actions.addItems([{...props.item, amount: -1}]))
                            }}>-</button>
                            <span id='amount'>{props.item.amount}</span>
                            <button id='increaseAmount' onClick={() =>
                            {
                                dispatch(cartItemsStore.actions.addItems([{...props.item, amount: 1}]))
                            }}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        )
}