import * as React from "react";
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'

export default function Nav()
{
    const state: tRootState = useSelector((state: tRootState) => state)

    return (
        <nav className='appNav'>
            <img></img>
            <Link to='/'>
                Shop
            </Link>
            <Link id='cart' to='/cart'>
                <span>{state.cartItems.items.length}</span>
            </Link>
        </nav>
    )
}