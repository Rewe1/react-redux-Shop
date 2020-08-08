import * as React from "react";
import { Router, Switch, Route} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from './actions'

export default function Nav()
{
    const dispatch = useDispatch();
    return (
            <h1>Nav</h1>
    )
}