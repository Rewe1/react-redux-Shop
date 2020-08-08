import * as React from "react";
import {Link} from 'react-router-dom';

export default function Shop()
{
    return (
        <div className='appShop'>
            <h1>Shop</h1>
            <Link to='/postItem'><span>Post an item</span></Link>
        </div>
    )
}