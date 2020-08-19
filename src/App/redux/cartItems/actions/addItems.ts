export default (items: iCartItem[]) =>
{
    return {
        type: 'ADD_CART_ITEMS',
        payload:
        {
            items
        }
    }
}