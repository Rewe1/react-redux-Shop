declare global
{
    
    interface iCartItem
    {
        _id: string,
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
    let nState: iCartItemsState = 
    {
        items: [...state.items]
    };
    let isNewItem: boolean = true

    switch(action.type)
    {
        case 'ADD_CART_ITEMS':
            action.payload.items.map((nCartItem) =>
            {
                nState.items.map((cartItem, i) =>
                {
                    if(cartItem._id === nCartItem._id)
                    {
                        cartItem.amount += nCartItem.amount
                        isNewItem = false
                    }
                })
                if(isNewItem)
                    nState.items.push(nCartItem)
            })
            nState.items.map((cartItem, i) =>
            {
                if(cartItem.amount < 1)
                    nState.items.splice(i, 1)
            })
            return nState
        case 'REMOVE_CART_ITEMS':
            console.log('removing items')
            action.payload.items.map((rCartItem) =>
            {
                nState.items.map((cartItem, i) =>
                {
                    if(rCartItem._id === cartItem._id)
                        nState.items.splice(i, 1)
                })
            })
            return nState
        default:
            return state
    }
}