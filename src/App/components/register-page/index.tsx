import React from "react"
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

import serverURL from '../../../../serverURL'

export default function RegisterPage()
{

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
            if(res.status === 400)
            {
                console.log('Invalid request')
            }

            if(res.status === 401)
            {
                console.log('Unauthorized')
            }

            console.log(res)
        })
        .catch(exc =>
        {
            console.error(exc)
        })
    }

    return(
        <div className='register-page-div'>
            <form className='register-form' id='register-form' method='post'>
                <label>Email:
                    <input name='email' className='email-input'></input>
                </label>
                <label>Password:
                    <input name='password' className='password-input'></input>
                </label>
            </form>
            <button onClick={() => postRegister()}>Submit</button>
        </div>
    )
}