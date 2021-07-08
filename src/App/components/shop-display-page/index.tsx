import React from "react"
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import ListShopItem from '../shop-display-page/shop-item/index'

export default function Shop()
{
    const state: any = useSelector((state: tRootState) => state);
    const items: iShopItem[] = state.shopItems.items;

    if(items)
        return (
            <div className='items-display-div'>
                <h1>Shop</h1>
                <Link className='post-item-a' to='/postItem'><span id='postItem'>Post an item</span></Link>
                <div className='items-list'>
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