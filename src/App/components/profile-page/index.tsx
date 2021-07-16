import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

import stateRoot from '../../redux'

export default function ProfilePage(props: any)
{
    const state: any = useSelector((state: tRootState) => state);
    const account: iAccount = state.account

    let dispatch = useDispatch()

    let logout = () =>
    {
        props.setToken(false)
        dispatch(stateRoot.actions.account.logout())
    }

    return (
        <div className='profile-div'>
            {
                account._id.length === 0 &&
                <div className='login-div'>
                    <span>You are not logged in</span>
                    <ul>
                        <li>
                            <Link to='/register-account'>Register</Link>
                        </li>
                        <li>
                            <button onClick={() => props.setLogin(true)}>Login</button>
                        </li>
                    </ul>
                </div>
            }
            {
                account._id.length != 0 &&
                <div className='profile-info'>
                    <div className='email-div'>
                        <span className='email-span'>Email:</span>
                        <span className='email-span'>{account.email}</span>
                    </div>
                    <button className='logout-btn' onClick={() => logout()}>Logout</button>
                </div>
            }
        </div>
    )
}