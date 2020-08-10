import * as React from "react";
import backendURL from "../../backend/serverURL";

export default function PostItem()
{
    console.log(backendURL.host);
    return (
        <div className='appPostItem'>
            <h1>Post item</h1>
            <form id='itemForm' action={`http://${backendURL.host}:${backendURL.port}/postItem`} method='post'>
                <input name='title' type='text' placeholder="Type the post's title..."/>
                <input name='category' type='text' placeholder="Type the item's category..."/>
                <input name='price' type='number' placeholder="Type the item's price..."/>
            </form>
                <button form='itemForm' type='submit'>Submit</button>
        </div>
    )
}