import React from 'react'

declare global
{
    interface iItem
    {
        title: string,
        category: string,
        description: string,
        price: number
    }
}

export default (props: {item: iItem}) =>
{
    return (
        <div className='appItem'>
            <img style={{width: 128, height: 128, backgroundColor: '#333'}}/>
            <div>
                <h2>{`${props.item.title ? props.item.title : "The title wasn't specified :c"}`}</h2>
                <span>{`$${props.item.price ? props.item.price.toFixed(2) : "The price wasn't specified :c"}`}</span>
                <p>{props.item.description ? props.item.description : 'No description was specified. :c'}</p>
            </div>
        </div>
    )
}