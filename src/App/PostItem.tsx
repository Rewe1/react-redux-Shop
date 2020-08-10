import * as React from "react";
import backendURL from "../../backend/serverURL";

export default function PostItem()
{
    console.log(backendURL.host);
    return (
        <div className='appPostItem'>
            <h1>Post item</h1>
            <form id='itemForm' action={`http://${backendURL.host}:${backendURL.port}/postItem`} method='post'>
                <input name='title' type='text' placeholder="Type the post's title..." required/>
                <select name='category' required>
                    <option selected={true} disabled>Select a category...</option>
                    <option value='Cups'>Cups</option>
                    <option value='Clothes'>Clothes</option>
                    <option value='Tools'>Tools</option>
                </select>
                <input name='price' type='text' pattern="[.0-9]{1,8}" placeholder="Type the item's price..." required />
            </form>
                <button form='itemForm' type='submit'>Submit</button>
        </div>
    )
}