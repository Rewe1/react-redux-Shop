import reducer from './counter'

import increment from './actions/increment'
import decrement from './actions/decrement'

export default
{
    reducer,
    actions:
    {
        increment,
        decrement,
    }
}