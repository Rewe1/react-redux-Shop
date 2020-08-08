import * as React from "react";
import {useSelector, useDispatch} from 'react-redux';
import * as actions from './actions'
import './sass/App.scss';

interface iCounter
{
    counter: number
};

function App()
{
    const dispatch = useDispatch();
    return (
        <div>
            <h1>{useSelector((state: iCounter) => state.counter)}</h1>
            <button onClick={() => dispatch(actions.decrement())}>Decrement</button>
            <button onClick={() => dispatch(actions.increment())}>Increment</button>
        </div>
    )
}

export default App;