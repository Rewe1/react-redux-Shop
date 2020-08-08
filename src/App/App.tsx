import * as React from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from './actions'
import './sass/App.scss';

import Nav from './Nav';
import Counter from './Counter';

export default function App()
{
    const dispatch = useDispatch();
    return (
        <Router>
            <div>
                <Nav/>
                <Switch>
                    <Route path='/counter' component={Counter}/>
                </Switch>
            </div>
        </Router>
    )
}