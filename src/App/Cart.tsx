import * as React from "react";
import {useSelector, useDispatch} from 'react-redux';
import * as actions from './actions'

interface iCounter
{
    counter: number
};

export default function Cart()
{
    const dispatch = useDispatch();
    return (
        <div className='appCart'>
            <h1>{useSelector((state: iCounter) => state.counter)}</h1>
            <button onClick={() => dispatch(actions.decrement())}>Decrement</button>
            <button onClick={() => dispatch(actions.increment())}>Increment</button>
        </div>
    )
}