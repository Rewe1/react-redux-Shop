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
    let nState: iCartItemsState
    let isNewItem: boolean = true
    switch(action.type)
    {
        case 'ADD_CART_ITEMS':
            nState = 
            {
                items: [...state.items]
            };

            action.payload.items.map((nCartItem) =>
            {
                nState.items.map((cartItem) =>
                {
                    if(cartItem.itemID === nCartItem.itemID)
                    {
                        cartItem.amount += nCartItem.amount
                        isNewItem = false
                    }
                })
                if(isNewItem)
                    nState.items.push(nCartItem)
            })

            return nState
        default:
            return state
    }
}