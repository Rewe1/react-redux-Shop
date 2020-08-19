import reducer from './shopItems'

// Actions
import setItems from './actions/setItems'

// Methods
import getItemById from './methods/getItemById'

export default
{
    reducer,
    actions: 
    {
        setItems
    },
    methods:
    {
        getItemById
    }
}