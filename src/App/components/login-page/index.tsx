import React, {useState} from "react"
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import serverURL from '../../../../serverURL'

export default function loginPage()
{
    let [loginFailed, setLogin] = useState(false)

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
                console.log('Invalid request')
                setLogin(true)
            }

            if(res.status === 401)
            {
                console.log('Unauthorized')
                setLogin(true)
            }
            
            if(res.status === 200)
            {
                console.log('Successful login')
                setLogin(false)
            }

            console.log(res)
        })
        .catch(exc =>
        {
            console.error(exc)
        })
    }

    return(
        <div className='login-page-div'>
            {
                loginFailed && 
                <span>Login failed!</span>
            }
            <form className='login-form' id='login-form' action={`${serverURL.url}/${serverURL.accounts.loginPath}`} method='post'>
                <label>Email:
                    <input name='email' className='email-input'></input>
                </label>
                <label>Password:
                    <input name='password' className='password-input'></input>
                </label>
            </form>
            <button onClick={() => postLogin()}>Submit</button>
        </div>
    )
}