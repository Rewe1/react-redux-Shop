import React from "react"
import {Link} from 'react-router-dom'
import backendURL from "../../../backend/serverURL"
import {useSelector} from 'react-redux'

import {useEffect} from 'react'

import ListShopItem from './ListShopItem'

const itemSchema = 
{
    title: String,
    category: String,
    description: String,
    price: Number
}

async function getData()
{
    let data: iShopItem[] = [];

    await fetch(`http://${backendURL.host}:${backendURL.port}/fetch`)
    .then((res) =>
    {
        if(res.ok)
        {
            return res.json()
        }
        else
            console.log('Response was not ok')
    })
    .then((json) =>
    {
        data = json;
        return json;
    })
    return data;
}

export default function Shop()
{
    const state: any = useSelector((state: tRootState) => state);
    const items: iShopItem[] = state.shopItems.items;

    if(items)
        return (
            <div className='appShop'>
                <h1>Shop</h1>
                <Link to='/postItem'><span id='postItem'>Post an item</span></Link>
                <div className='items'>
                    {
                        items.map((item, i) =>
                            <ListShopItem item={item} key={i} />
                        )
                    }
                </div>
            </div>
        )
    else
        return (
            <div className='appShop'>Loading...</div>
        )
}