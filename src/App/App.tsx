import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.scss';
import backendURL from "../../serverURL"
import {useDispatch, useSelector} from 'react-redux'
import shopItems from './redux/shopItems'

import AppNav from './components/app-nav';
import Shop from './components/shop-display-page/index';
import ShopItem from './components/display-item-page/index'
import PostItem from './components/post-item-page/index';
import Cart from './components/cart-page/index';
import RegisterPage from './components/register-page/index';
import LoginPage from './components/login-page/index';
import ProfilePage from './components/profile-page/index';

import stateRoot from './redux'
import shopItemsStore from './redux/shopItems'
import serverURL from "../../serverURL";

export default function App()
{
    const state: tRootState = useSelector((state: tRootState) => state)
    let [receivedToken, setToken] = useState(false)
    let [showLogin, setLogin] = useState(false)

    let dispatch = useDispatch();
    
    let continueSession = async () =>
    {
        // Check if there is a session token
        if(Boolean(document.cookie.match('authToken')))
        {
            let account: iAccount
            let res = await fetch(`${serverURL.accounts.fetchPath}`)
            
            if(res.status === 500)
            {
                return;
            }
            
            if(res.status === 404)
            {
                document.cookie = "authToken=undefined; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            }

            if(res.status === 200)
            {
                account = await res.json()
                dispatch(stateRoot.actions.account.login(account))
            }
        }
    }
    
    if(state.account.email === '')
        continueSession()

    useEffect(() =>
    {
        fetchItems()
    }, [])

    const fetchItems = async () =>
    {
        let data = await fetch(`/${backendURL.shopItems.fetchPath}`);
        let items: iShopItem[] = await data.json();
        dispatch(shopItemsStore.actions.setItems(items));
    }

    return (
        <Router>
            <div className='app'>
                <AppNav setLogin={setLogin} />
                <main className='app-body'>
                    {
                        showLogin &&
                        <LoginPage setToken={setToken} setLogin={setLogin}/>
                    }
                    <Switch>
                        <Route exact path='/' component={Shop}/>
                            <Route path='/shop/item/:id' component={ShopItem}/>
                        <Route path='/cart' component={Cart}/>
                        <Route path='/postItem' component={PostItem}/>
                        <Route path='/register-account' render={() => (<RegisterPage setToken={setToken} />)} />
                        <Route path='/profile' render={() => (<ProfilePage setLogin={setLogin} />)} />
                    </Switch>
                </main>
            </div>
        </Router>
    )
}