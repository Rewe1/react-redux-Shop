import React from "react"
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import serverURL from '../../../../serverURL'

export default function loginPage()
{
    return(
        <div className='login-page-div'>
            <form className='login-form' id='login-account' action={`${serverURL.url}/${serverURL.accounts.loginPath}`} method='post'>
                <label>Email:
                    <input name='email' className='email-input'></input>
                </label>
                <label>Password:
                    <input name='password' className='password-input'></input>
                </label>
            </form>
            <button type='submit' form='login-account'>Submit</button>
        </div>
    )
}