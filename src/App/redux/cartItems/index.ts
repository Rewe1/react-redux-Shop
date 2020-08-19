import reducer from './cartItems'

import addItems from './actions/addItems'
import removeItems from './actions/removeItems'

export default
{
    reducer,
    actions:
    {
        addItems,
        removeItems
    }
}