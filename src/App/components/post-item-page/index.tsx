import * as React from "react";
import backendURL from "../../../../serverURL";

export default function PostItem()
{
    return (
        <div className='post-item-div'>
            <h1>Post item</h1>
            <form className='post-item-form' id='itemForm' action={`/${backendURL.shopItems.postPath}`} method='post'>
                <input className='title-input' name='title' maxLength={32} type='text' placeholder="Type the post's title..." required/>
                <select className='category-input' name='category' required>
                    <option value='Clothes'>Clothes</option>
                    <option value='Tools'>Tools</option>
                    <option value='Hobby'>Hobby</option>
                    <option value='Decoration'>Decoration</option>
                    <option value='Vehicles'>Vehicles</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Other'>Other</option>
                </select>
                <textarea className='description-textarea' form='itemForm' name='description' maxLength={128} placeholder="Type the item's description..." required/>
                <input className='price-input' name='price' maxLength={8} type='text' pattern="[.0-9]{1,8}" placeholder="Type the item's price..." required />
            </form>
                <button className='submit-button' form='itemForm' type='submit'>Post item</button>
        </div>
    )
}