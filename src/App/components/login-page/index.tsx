import React, {useState} from "react"
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import stateRoot from '../../redux'

import serverURL from '../../../../serverURL'

export default function loginPage(props: any)
{
    let [login400, set400] = useState(false)
    let [login401, set401] = useState(false)
    let [success, setSuccess] = useState(false)

    let dispatch = useDispatch()

    let postLogin = async () => 
    {
        let formData = new FormData(document.getElementById('login-form') as HTMLFormElement)

        let res = await fetch(`/${serverURL.accounts.loginPath}`, {
            headers:
            {          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(
                {
                    rememberMe: formData.get('remember-me'),
                    email: formData.get('email'),
                    password: formData.get('password')
                }
            )
        })

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
            props.setToken(true)
            setSuccess(true)
            props.setLogin(false)
        }
    }

    return(
        <div className='login-page-div'>
            <div className='content-div'>
                {
                    login400 && 
                    <span className='error-span'>The was an error while trying to login.</span>
                }
                {
                    login401 && 
                    <span className='error-span'>The information provided does not match</span>
                }
                <button onClick={() => props.setLogin(false)}>
                    &#10006;
                </button>
                <div className='form-div'>
                    <form className='login-form' id='login-form'>
                        <Link className='register-a' to='/register-account' onClick={() => props.setLogin(false)}>Não tenho uma conta</Link>
                        <input type='email' name='email' className='email-input' placeholder='Email'></input>
                        <input type='password' name='password' className='password-input' placeholder='Password'></input>
                        <div className='remember-me-div'>
                            <label>
                                <input type='checkbox' name='remember-me' className='remember-me-input'></input>
                                Manter login
                            </label>
                            <Link to='forgot-my-password'>Esqueci minha senha</Link>
                        </div>
                    </form>
                    <div className='btn-div'>
                        <button className='submit-btn' onClick={() => {postLogin()}}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}