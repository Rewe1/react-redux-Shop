import React from 'react'
import {Link} from 'react-router-dom';

export default (props: {item: iShopItem}) =>
{
    console.log(props.item)
    return (
        <div className='appListItem'>
            <img/>
            <div>
                <Link to={`/shop/item/${props.item._id}`}>
                    <h2>{`${props.item.title ? props.item.title : "The title wasn't specified :c"}`}</h2>
                </Link>
                <span>{`$${props.item.price ? props.item.price.toFixed(2) : "The price wasn't specified :c"}`}</span>
                <p>{props.item.description ? props.item.description : "The description wasn't specified :c"}</p>
            </div>
        </div>
    )
}