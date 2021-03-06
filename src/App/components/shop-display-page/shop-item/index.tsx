import React from 'react'
import {Link} from 'react-router-dom';

export default (props: {item: iShopItem}) =>
{
    return (
        <div className='item-div'>
            <img className='item-img' src='https://via.placeholder.com/128'/>
            <div>
                <Link to={`/shop/item/${props.item._id}`}>
                    <h2 className='item-title'>{`${props.item.title ? props.item.title : "The title wasn't specified :c"}`}</h2>
                </Link>
                <span className='item-price'>{`$${props.item.price ? props.item.price.toFixed(2) : "The price wasn't specified :c"}`}</span>
                <p className='item-description'>{props.item.description ? props.item.description : "The description wasn't specified :c"}</p>
            </div>
        </div>
    )
}