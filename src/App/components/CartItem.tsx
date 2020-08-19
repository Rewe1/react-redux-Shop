import React from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'


// Stores
import shopItemsStore from '../redux/shopItems'
import cartItemsStore from '../redux/cartItems'

export default (props: {item: iCartItem}) =>
{
    const dispatch = useDispatch()

    console.log('cartItem item', props.item)
    let cartItem = shopItemsStore.methods.getItemById(props.item._id)

    if(cartItem._id === '-1')
        return (
            <div className='appListItem'>
                Item not found :c
            </div>
        )
    else
        return (
            <div className='appCartItem'>
                <img/>
                <div>
                    <Link to={`/shop/item/${cartItem._id}`}>
                        <h2>{`${cartItem.title ? cartItem.title : "The title wasn't specified :c"}`}</h2>
                    </Link>
                    <span>{`$${cartItem.price ? cartItem.price.toFixed(2) : "The price wasn't specified :c"}`}</span>
                    <span>{props.item.amount}</span>
                    <button onClick={() =>
                    {
                        dispatch(cartItemsStore.actions.addItems([{...props.item, amount: -1}]))
                    }}>-</button>
                    <button onClick={() =>
                    {
                        dispatch(cartItemsStore.actions.addItems([{...props.item, amount: 1}]))
                    }}>+</button>
                    <button onClick={() =>
                    {
                        dispatch(cartItemsStore.actions.removeItems([{...props.item}]))
                    }}>X</button>
                </div>
            </div>
        )
}