import React, {useState} from "react"
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

import serverURL from '../../../../serverURL'

export default function loginPage()
{
    let [login400, set400] = useState(false)
    let [login401, set401] = useState(false)
    let [success, setSuccess] = useState(false)

    let postLogin = async () => 
    {
        let formData = new FormData(document.getElementById('login-form') as HTMLFormElement)

        fetch(`${serverURL.url}/${serverURL.accounts.loginPath}`, {
            headers:
            {          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(
                {
                    email: formData.get('email'),
                    password: formData.get('password')
                }
            )
        })
        .then(res =>
        {
            if(res.status === 400)
            {
                set400(true)
            }

            if(res.status === 401)
            {
                set401(true)
            }
            
            if(res.status === 200)
            {
                set400(false)
                set401(false)
                setSuccess(true)
            }
        })
        .catch(exc =>
        {
            console.error(exc)
        })
    }

    return(
        <div className='login-page-div'>
            {
                login400 && 
                <span className='error-span'>The was an error while trying to login.</span>
            }
            {
                login401 && 
                <span className='error-span'>The information provided does not match</span>
            }
            {
                success &&
                <Redirect to='/'></Redirect>
            }
            <form className='login-form' id='login-form'>
                <input name='email' className='email-input' placeholder='Email'></input>
                <input name='password' className='password-input' placeholder='Password'></input>
            </form>
            <div className='btn-div'>
                <button className='submit-btn' onClick={() => postLogin()}>Submit</button>
            </div>
        </div>
    )
}