import React, {useEffect} from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './sass/index.scss';
import backendURL from "./../../backend/serverURL"
import {useDispatch} from 'react-redux'
import shopItems from './redux/shopItems'

import Home from './components/Home';
import Nav from './components/Nav';
import Shop from './components/Shop';
    import ShopItem from './components/ShopItem'
import PostItem from './components/PostItem';
import Cart from './components/Cart';

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
        let data = await fetch(`http://${backendURL.host}:${backendURL.port}/fetch`);
        let items: iItem[] = await data.json();
        dispatch(shopItemsStore.actions.setItems(items));
    }

    return (
        <Router>
            <div className='App'>
                <Nav/>
                <Switch>
                    <div className='appBody'>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/shop' component={Shop}/>
                            <Route path='/shop/item/:id' component={ShopItem}/>
                        <Route path='/cart' component={Cart}/>
                        <Route path='/postItem' component={PostItem}/>
                    </div>
                </Switch>
            </div>
        </Router>
    )
}