export default (items: iItem[]): iShopItemsAction =>
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