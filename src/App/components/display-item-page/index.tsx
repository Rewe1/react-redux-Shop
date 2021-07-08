import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {RouteComponentProps} from 'react-router-dom'

import shopItemsStore from '../../redux/shopItems'
import cartItemsStore from '../../redux/cartItems'

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
    const state: tRootState = useSelector((state: tRootState) => state)
    let [compState, setCompState] = useState<iCompState>(() => { return {itemAmount: 0}})

    const dispatch = useDispatch()
    let item: iShopItem = shopItemsStore.methods.getItemById(state.shopItems.items, props.match.params.id);

    if(item && item._id !== '-1')
        return (
            <div className='display-item-div'>
                <img className='item-img' src='https://via.placeholder.com/512x288'/>
                <h2 className='item-title'>{`${item.title ? item.title : "The title wasn't specified :c"}`}</h2>
                <span className='item-category' id='category'>{item.category}</span><br/>
                <span className='item-price' id='price'>{`$${item.price ? item.price.toFixed(2) : "The price wasn't specified :c"}`}</span>
                <p className='item-description'>{item.description ? item.description : "The description wasn't specified :c"}</p>
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
        )
    else
        return (
            <div className='appItem'>
                Loading item...
            </div>
        )
}