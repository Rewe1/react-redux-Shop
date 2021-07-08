import * as React from "react";
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import cartImg from './res/cart.png'

export default function Nav()
{
    const state: tRootState = useSelector((state: tRootState) => state)

    return (
        <nav className='app-nav'>
            <img className='app-logo' src='https://via.placeholder.com/48'/>
            <Link className='home-page-a' to='/'>
                Shop
            </Link>
            <Link className='cart-page-a' to='/cart'>
                <img className='cart-a-img' src={cartImg}/>
                <span className='cart-items-number'>{state.cartItems.items.length}</span>
            </Link>
        </nav>
    )
}