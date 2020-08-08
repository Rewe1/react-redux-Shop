import * as React from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from './actions'
import './sass/index.scss';

import Home from './Home';
import Nav from './Nav';
import Shop from './Shop';
import PostItem from './PostItem';
import Cart from './Cart';

export default function App()
{
    const dispatch = useDispatch();
    return (
        <Router>
            <div className='App'>
                <Nav/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/shop' component={Shop}/>
                    <Route path='/cart' component={Cart}/>
                    <Route path='/postItem' component={PostItem}/>
                </Switch>
            </div>
        </Router>
    )
}