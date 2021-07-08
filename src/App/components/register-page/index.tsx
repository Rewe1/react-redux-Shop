import React from "react"
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import serverURL from '../../../../serverURL'

export default function RegisterPage()
{
    return(
        <div className='register-page-div'>
            <form className='register-form' id='register-account' action={`${serverURL.url}/${serverURL.accounts.registerPath}`} method='post'>
                <label>Email:
                    <input name='email' className='email-input'></input>
                </label>
                <label>Password:
                    <input name='password' className='password-input'></input>
                </label>
            </form>
            <button type='submit' form='register-account'>Submit</button>
        </div>
    )
}