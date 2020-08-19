import {useSelector} from 'react-redux'

export default (id: string): iShopItem =>
{
    const state: tRootState = useSelector((state: tRootState) => state)
    const items: iShopItem[] = state.shopItems.items

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