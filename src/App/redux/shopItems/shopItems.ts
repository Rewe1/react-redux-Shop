import actions from '.'

declare global
{
    interface iShopItem
    {
        _id: string,
        title: string,
        category: string,
        description: string,
        price: number
    }

    interface iShopItemsAction
    {
        type: string,
        payload: 
        { 
            items: iShopItem[]
        }
    }

    interface iShopItemsState
    {
        items: iShopItem[]
    }
}

let defaultState: iShopItemsState =
{
    items: []
}

export default (state: iShopItemsState = defaultState, action: iShopItemsAction) =>
{
    switch(action.type)
    {
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.payload.items
            }
        default:
            return state
    }
}