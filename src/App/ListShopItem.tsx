import React from 'react'

declare global
{
    interface iItem
    {
        title: string,
        category: string,
        price: number
    }
}

export default (props: {item: iItem}) =>
{
    return (
        <div className='appItem'>
            <img style={{width: 128, height: 128, backgroundColor: '#333'}}/>
            <div>
                <div className='head'>
                    <h2>{`${props.item.title}`}</h2>
                    <span>{`$${props.item.price.toFixed(2)}`}</span>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
    )
}