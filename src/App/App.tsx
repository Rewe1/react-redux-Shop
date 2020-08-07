import * as React from "react";
import {useSelector, useDispatch} from 'react-redux';
import * as actions from './actions'

class OtherApp extends React.Component
{
    count : Number;
    constructor(props: any)
    {
        super(props)
        {
        }
    }

    getCounter()
    {
        return useSelector(state => state);
    }

    render()
    {
        return (
            <h1>{this.getCounter()}</h1>
        )
    }
}

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
            <button onClick={() => dispatch(actions.increment())}>Increment</button>
            <button onClick={() => dispatch(actions.decrement())}>Decrement</button>
        </div>
    )
}

export default App;