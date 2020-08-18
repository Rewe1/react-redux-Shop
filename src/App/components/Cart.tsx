import * as React from "react";
import {useSelector, useDispatch} from 'react-redux';
import counter from '../redux/counter'

export default function Cart()
{
    const dispatch = useDispatch();
    let state = useSelector((state: tRootState) => state)
    let count = state.counter

    return (
        <div className='appCart'>
            <h1>{count}</h1>
            <button onClick={() => dispatch(counter.actions.decrement())}>Decrement</button>
            <button onClick={() => dispatch(counter.actions.increment())}>Increment</button>
        </div>
    )
}