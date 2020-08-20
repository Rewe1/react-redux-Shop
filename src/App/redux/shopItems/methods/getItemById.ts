export default (items: iShopItem[], id: string): iShopItem =>
{
    for(let i = 0; i < items.length; i++)
        if(items[i]._id === id)
            return items[i];

    return {
        _id: '-1',
        title: '',
        category: '',
        description: '',
        price: -1
    }
}