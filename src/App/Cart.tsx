import * as React from "react";
import {useSelector, useDispatch} from 'react-redux';
import counter from './redux/counter'

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
            <button onClick={() => dispatch(counter.actions.decrement())}>Decrement</button>
            <button onClick={() => dispatch(counter.actions.increment())}>Increment</button>
        </div>
    )
}