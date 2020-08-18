import actions from '.'

declare global
{
    interface iShopItemsAction
    {
        type: string,
        payload: 
        { 
            items: iItem[]
        }
    }

    interface iShopItemsState
    {
        items: iItem[]
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
            console.log('setItems', {
                ...state,
                items: action.payload.items
            })
            return {
                ...state,
                items: action.payload.items
            }
        default:
            return state
    }
}