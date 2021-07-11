import React, {useState} from "react"
import {Link, Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import stateRoot from '../../redux'

import serverURL from '../../../../serverURL'

export default function RegisterPage()
{
    let [isVendor, setVendor] = useState(false)

    let [isEmailUsed, setEmailUsed] = useState(false)
    let [success, setSuccess] = useState(false)

    let dispatch = useDispatch()

    let postRegister = async () => 
    {
        let formData = new FormData(document.getElementById('register-form') as HTMLFormElement)
        let res = await fetch(`${serverURL.url}/${serverURL.accounts.registerPath}`, {
            headers:{          
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'POST',
            body: JSON.stringify(
                {
                    CNPJ: formData.get('CNPJ') ? formData.get('CNPJ') : '',
                    email: formData.get('email'),
                    password: formData.get('password'),
                    phone: formData.get('phone'),
                    whatsapp: formData.get('whatsapp'),
                    CEP: formData.get('CEP'),
                    state: formData.get('state'),
                    city: formData.get('city'),
                    district: formData.get('district'),
                    street: formData.get('street'),
                    number: formData.get('number'),
                    optional: formData.get('optional'),
                }
            )
        })
        if(res.status === 401)
        {
            setEmailUsed(true)
            setSuccess(false)
        }
        
        if(res.status === 200)
        {
            setEmailUsed(false)
            dispatch(stateRoot.actions.account.login(await res.json()))
            setSuccess(true)
        }
    }

    return(
        <div className='register-page-div'>
            <div className='form-div'>

                {
                    success &&
                    <Redirect to="/" />
                }
                {
                    isEmailUsed &&
                    <span className='error-span'>Email is already in use</span>
                }
                <div className='account-type-div'>
                    <span>Você é</span>
                    <label>
                        Consumidor
                        <input type='radio' name='account-type' onClick={() => setVendor(false)} value='false' defaultChecked></input>
                    </label>
                    <label>
                        Vendedor
                        <input type='radio' name='account-type' onClick={() => setVendor(true)} value='true'></input>
                    </label>
                </div>
                <form className='register-form' id='register-form' method='post'>
                    {
                        isVendor &&
                        <input type='text' name='CNPJ' className='cnpj-input' placeholder='CNPJ'></input>
                    }
                    <input type='email' name='email' className='email-input' placeholder='Email'></input>
                    <input type='password' name='password' className='password-input' placeholder='Password'></input>
                    <input type='password' className='password-input' placeholder='Confirm password'></input>

                    <input type='text' name='phone' className='phone-input' placeholder='Telefone'></input>
                    <input type='text' name='whatsapp' className='whatsapp-input' placeholder='Whatsapp'></input>

                    <input type='text' name='CEP' className='cep-input' placeholder='CEP'></input>
                    <input type='text' name='state' className='state-input' placeholder='Estado'></input>
                    <input type='text' name='city' className='city-input' placeholder='Cidade'></input>
                    <input type='text' name='district' className='district-input' placeholder='Bairro'></input>
                    <input type='text' name='street' className='street-input' placeholder='Rua'></input>
                    <input type='text' name='number' className='number-input' placeholder='Número'></input>
                    <input type='text' name='optional' className='optional-input' placeholder='Andar/Apartamento'></input>
                </form>
                <div className='btn-div'>
                    <button className='submit-btn' onClick={() => postRegister()}>Submit</button>
                </div>
            </div>
        </div>
    )
}