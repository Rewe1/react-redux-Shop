export default (items: iCartItem[]) =>
{
    return {
        type: 'REMOVE_CART_ITEMS',
        payload:
        {
            items
        }
    }
}