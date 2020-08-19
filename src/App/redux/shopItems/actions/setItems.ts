export default (items: iShopItem[]): iShopItemsAction =>
{
    return (
        {
            type: 'SET_ITEMS',
            payload: 
            {
                items
            }
        }
    )
}