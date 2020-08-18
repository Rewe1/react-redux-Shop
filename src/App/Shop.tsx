import React, {useState, useEffect} from "react"
import {Link} from 'react-router-dom'
import backendURL from "../../backend/serverURL"
import {useSelector, useDispatch} from 'react-redux'
import shopItems from './redux/shopItems'

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
    let data: iItem[] = [];

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
    const state: any = useSelector((state) => state);
    const items: iItem[] = state.shopItems.items;
    let dispatch = useDispatch();

    useEffect(() =>
    {
        fetchItems()
    }, [])

    const fetchItems = async () =>
    {
        let data = await fetch(`http://${backendURL.host}:${backendURL.port}/fetch`);
        let items: iItem[] = await data.json();
        dispatch(shopItems.actions.setItems(items));
    }
    console.log('State', state);


    return (
        <div className='appShop'>
            <h1>Shop</h1>
            <Link to='/postItem'><span id='postItem'>Post an item</span></Link>
            <div className='items'>
                {
                    items ?
                        items.map((item, i) =>
                        <ListShopItem item={item} key={i} />
                    )
                    :
                        'Loading'
                }
            </div>
        </div>
    )
}