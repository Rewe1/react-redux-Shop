declare global
{
    
    interface iCartItem
    {
        itemID: string,
        amount: number
    }

    interface iCartItemsAction
    {
        type: string,
        payload:
        {
            items: iCartItem[]
        }
    }

    interface iCartItemsState
    {
        items: iCartItem[]
    }
}

let defaultState =
{
    items: <iCartItem[]>[]
}

export default (state: iCartItemsState = defaultState, action: iCartItemsAction) =>
{
    switch(action.type)
    {
        case 'ADD_CART_ITEMS':
            action.payload.items.map((item) =>
            {
                state.items.push(item);
            })
        default:
            return state
    }
}