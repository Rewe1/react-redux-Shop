import React from 'react'
import {useSelector} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom'

export interface Props extends RouteComponentProps<MatchParams> {}

interface MatchParams {
    id: string;
}

export default (props: Props) =>
{
    const getItem = (id: string, items: iItem[]) =>
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

    let state: any = useSelector<tRootState>((state: tRootState) => state)
    let items: iItem[] = state.shopItems.items
    let item: iItem = getItem(props.match.params.id, items);

    console.log('ShopItem item', item)

    if(item)
        return (
            <div className='appItem'>
            {
                item._id === '-1' ?
                    'Item not found :c'
                :
                    <div>
                        <img/>
                        <h2>{`${item.title ? item.title : "The title wasn't specified :c"}`}</h2>
                        <span id='category'>{item.category}</span><br/>
                        <span id='price'>{`$${item.price ? item.price.toFixed(2) : "The price wasn't specified :c"}`}</span>
                        <p>{item.description ? item.description : "The description wasn't specified :c"}</p>
                    </div>
            }
            </div>
        )
    else
        return (
            <div className='appItem'>
                Loading item...
            </div>
        )
}