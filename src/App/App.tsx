import React, {useEffect} from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.scss';
import backendURL from "../../serverURL"
import {useDispatch} from 'react-redux'
import shopItems from './redux/shopItems'

import AppNav from './components/app-nav';
import Shop from './components/shop-display-page/index';
import ShopItem from './components/display-item-page/index'
import PostItem from './components/post-item-page/index';
import Cart from './components/cart-page/index';
import RegisterPage from './components/register-page/index';
import LoginPage from './components/login-page/index';
import ProfilePage from './components/profile-page/index';

import shopItemsStore from './redux/shopItems'

export default function App()
{
    
    let dispatch = useDispatch();

    useEffect(() =>
    {
        fetchItems()
    }, [])

    const fetchItems = async () =>
    {
        let data = await fetch(backendURL.shopItems.fetchURL);
        let items: iShopItem[] = await data.json();
        dispatch(shopItemsStore.actions.setItems(items));
    }

    return (
        <Router>
            <div className='App'>
                <AppNav/>
                <div className='appBody'>
                    <Switch>
                        <Route exact path='/' component={Shop}/>
                            <Route path='/shop/item/:id' component={ShopItem}/>
                        <Route path='/cart' component={Cart}/>
                        <Route path='/postItem' component={PostItem}/>
                        <Route path='/register-account' component={RegisterPage}/>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='/profile' component={ProfilePage}/>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}