import * as React from "react";
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import cartImg from './res/cart.png'

export default function Nav()
{
    const state: tRootState = useSelector((state: tRootState) => state)

    return (
        <nav className='appNav'>
            <img className='app-logo' src='https://via.placeholder.com/48'/>
            <Link to='/'>
                Shop
            </Link>
            <Link id='cart' to='/cart'>
                <img className='cart-img' src={cartImg}/>
                <span className='items-number'>{state.cartItems.items.length}</span>
            </Link>
        </nav>
    )
}