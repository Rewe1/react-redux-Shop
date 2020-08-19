import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {RouteComponentProps} from 'react-router-dom'

import shopItemsStore from '../redux/shopItems'
import cartItemsStore from '../redux/cartItems'

export interface Props extends RouteComponentProps<MatchParams> {}

interface MatchParams {
    id: string;
}

interface iCompState
{
    itemAmount: number
}

export default (props: Props) =>
{
    let [compState, setCompState] = useState<iCompState>(() => { return {itemAmount: 0}})

    const dispatch = useDispatch()
    let item: iShopItem = shopItemsStore.methods.getItemById(props.match.params.id);

    let thisCartItem: iCartItem =
    {
        _id: `${item._id}`,
        amount: 1
    }

    if(item && item._id !== '-1')
        return (
            <div className='appItem'>
                <div>
                    <img/>
                    <h2>{`${item.title ? item.title : "The title wasn't specified :c"}`}</h2>
                    <span id='category'>{item.category}</span><br/>
                    <span id='price'>{`$${item.price ? item.price.toFixed(2) : "The price wasn't specified :c"}`}</span>
                    <p>{item.description ? item.description : "The description wasn't specified :c"}</p>
                    <div id='addItemToCart'>
                        <button id='add' onClick={() =>
                        {
                            dispatch(cartItemsStore.actions.addItems([
                                {
                                    _id: `${item._id}`,
                                    amount: compState.itemAmount
                                }
                            ]))
                            setCompState(
                                {
                                    itemAmount: 0
                                }
                                )
                            }}>
                            Add
                        </button>
                        <div id='setAmount'>
                            <button id='decreaseAmount' onClick={() => 
                            {
                                setCompState(
                                    {
                                        itemAmount: (compState.itemAmount === 0 ? 0 : compState.itemAmount -1)
                                    })
                            }}>-</button>
                            <input id='amount' value={compState.itemAmount} readOnly/>
                            <button id='increaseAmount' onClick={() => 
                            {
                                setCompState({itemAmount: compState.itemAmount +1})
                            }}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    else
        return (
            <div className='appItem'>
                Loading item...
            </div>
        )
}