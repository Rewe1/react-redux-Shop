import React from "react"
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function RegisterPage()
{
    return(
        <div className='register-page-div'>
            <form className='register-form' id='register-account'>
                <input name='email' className='email-input'></input>
                <input name='password' className='password-input'></input>
            </form>
            <button type='submit' form='register-account'></button>
        </div>
    )
}