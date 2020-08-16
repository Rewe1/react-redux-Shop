import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import backendURL from "../../backend/serverURL";

import ListShopItem from './ListShopItem'

const itemSchema = 
{
    title: String,
    category: String,
    price: Number
}

async function getData()
{
    let data:
    [
        {
            title: String,
            category: String,
            price: Number
        }
    ]
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
    useEffect(() =>
    {
        fetchItems()
    }, [])

    const fetchItems = async () =>
    {
        let data = await fetch(`http://${backendURL.host}:${backendURL.port}/fetch`);
        let items: [typeof itemSchema] = await data.json();
        setItems(items);
    }

    const [items, setItems] = useState([]);
    console.log('Items', items);
    return (
        <div className='appShop'>
            <h1>Shop</h1>
            <Link to='/postItem'><span id='postItem'>Post an item</span></Link>
            <div className='items'>
                {
                    items.map(item =>
                        <ListShopItem item={item}/>
                    )
                }
            </div>
        </div>
    )
}