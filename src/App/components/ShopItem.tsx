import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {RouteComponentProps} from 'react-router-dom'

import shopItemsStore from '../redux/shopItems'
import cartItemsStore from '../redux/cartItems'

export interface Props extends RouteComponentProps<MatchParams> {}

interface MatchParams {
    id: string;
}

export default (props: Props) =>
{
    const dispatch = useDispatch()
    let item: iShopItem = shopItemsStore.methods.getItemById(props.match.params.id);

    let thisCartItem: iCartItem =
    {
        itemID: `${item._id}`,
        amount: 1
    }

    if(item)
        return (
            <div className='appItem'>
            {
                item._id === '-1' ?
                    'Item not found :c'
                :
                    <div>
                        <img/>
                        <h2>{`${item.title ? item.title : "The title wasn't specified :c"}`}</h2>
                        <span id='category'>{item.category}</span><br/>
                        <span id='price'>{`$${item.price ? item.price.toFixed(2) : "The price wasn't specified :c"}`}</span>
                        <p>{item.description ? item.description : "The description wasn't specified :c"}</p>

                        <button onClick={() =>
                        {
                            dispatch(cartItemsStore.actions.addItems([thisCartItem]))
                        }}>
                            Add to Cart
                        </button>
                    </div>
            }
            </div>
        )
    else
        return (
            <div className='appItem'>
                Loading item...
            </div>
        )
}