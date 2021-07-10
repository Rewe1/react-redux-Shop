import * as React from "react";
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import cartImg from './res/cart.png'

export default function Nav()
{
    const state: tRootState = useSelector((state: tRootState) => state)

    return (
        <header className='app-header'>
            <img className='app-logo' src='https://via.placeholder.com/48'/>
            <nav className='app-nav'>
                <Link className='home-page-a' to='/'>
                    Shop
                </Link>
                {
                    !state.account._id.length &&
                    <Link className='home-page-a' to='/register-account'>
                        Register
                    </Link>
                }
                {
                    !state.account._id.length &&
                    <Link className='home-page-a' to='/login'>
                        Login
                    </Link>
                }
            </nav>
            <Link className='cart-page-a' to='/cart'>
                <img className='cart-a-img' src={cartImg}/>
                <span className='cart-items-number'>{state.cartItems.items.length}</span>
            </Link>
        </header>
    )
}