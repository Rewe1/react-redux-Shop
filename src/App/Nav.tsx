import * as React from "react";
import {Link} from 'react-router-dom';

export default function Nav()
{
    return (
        <nav className='appNav'>
            <ul>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/shop'>
                    <li>Shop</li>
                </Link>
                <Link to='/cart'>
                    <li>Cart</li>
                </Link>
            </ul>
        </nav>
    )
}