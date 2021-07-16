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
                <div className='profile-div'>
                    <div className='profile-info'>
                        <div className='info-line'>
                            <span className='info-name'>Email:</span>
                            <span className='info-span'>{account.email}</span>
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Phone:</span>
                            <span className='info-span'>{account.phone}</span>
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Whatsapp:</span>
                            <span className='info-span'>{account.whatsapp}</span>
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>CEP:</span>
                            <span className='info-span'>{account.address.CEP}</span>
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Estado:</span>
                            <span className='info-span'>{account.address.state}</span>
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Cidade:</span>
                            <span className='info-span'>{account.address.city}</span>
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Bairro:</span>
                            <span className='info-span'>{account.address.district}</span>
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Rua:</span>
                            <span className='info-span'>{account.address.street}</span>
                        </div>
                        <div className='info-line'>
                            <span className='info-name'>Número:</span>
                            <span className='info-span'>{account.address.number}</span>
                        </div>
                    </div>
                    <button className='logout-btn' onClick={() => logout()}>Logout</button>
                </div>
            }
        </div>
    )
}