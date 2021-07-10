import React, {useState} from "react"
import {Link, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

import serverURL from '../../../../serverURL'

export default function RegisterPage()
{
    let [isEmailUsed, setEmailUsed] = useState(false)
    let [success, setSuccess] = useState(false)

    let postRegister = async () => 
    {
        let formData = new FormData(document.getElementById('register-form') as HTMLFormElement)
        fetch(`${serverURL.url}/${serverURL.accounts.registerPath}`, {
            headers:{          
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
            if(res.status === 401)
            {
                setEmailUsed(true)
                setSuccess(false)
            }
            
            if(res.status === 200)
            {
                setEmailUsed(false)
                setSuccess(true)
            }
            return;
        })
        .catch(exc =>
        {
            console.error(exc)
        })
    }

    return(
        <div className='register-page-div'>
            {
                success &&
                <Redirect to="/" />
            }
            {
                isEmailUsed &&
                <span className='error-span'>Email is already in use</span>
            }
            <form className='register-form' id='register-form' method='post'>
                <input type='email' name='email' className='email-input' placeholder='Email'></input>
                <input type='password' name='password' className='password-input' placeholder='Password'></input>
            </form>
            <div className='btn-div'>
                <button className='submit-btn' onClick={() => postRegister()}>Submit</button>
            </div>
        </div>
    )
}