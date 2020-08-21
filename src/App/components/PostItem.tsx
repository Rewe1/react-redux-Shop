import * as React from "react";
import backendURL from "../../../backend/serverURL";

export default function PostItem()
{
    return (
        <div className='appPostItem'>
            <h1>Post item</h1>
            <form id='itemForm' action={backendURL.postURL} method='post'>
                <input name='title' maxLength={32} type='text' placeholder="Type the post's title..." required/>
                <select name='category' required>
                    <option value='Clothes'>Clothes</option>
                    <option value='Tools'>Tools</option>
                    <option value='Hobby'>Hobby</option>
                    <option value='Decoration'>Decoration</option>
                    <option value='Vehicles'>Vehicles</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Other'>Other</option>
                </select>
                <textarea form='itemForm' name='description' maxLength={128} placeholder="Type the item's description..." required/>
                <input name='price' maxLength={8} type='text' pattern="[.0-9]{1,8}" placeholder="Type the item's price..." required />
            </form>
                <button form='itemForm' type='submit'>Post item</button>
        </div>
    )
}