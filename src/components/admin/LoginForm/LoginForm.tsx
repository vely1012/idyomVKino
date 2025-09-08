import { type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { type Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { LogIn, type AdminAction } from "../../../ts/stateManagement/actions"

import './LoginForm.css'

export default function LoginForm () {
    const navigate = useNavigate()

    const dispatch = useDispatch<Dispatch<AdminAction>>()

    const tryLogin = async (e: FormEvent) => {
        e.preventDefault()

        const { email, password } = e.target as HTMLFormElement

        dispatch(LogIn(email.value, password.value))

        navigate('/admin')
    }
    
    return (
        <form className="login-form" onSubmit={tryLogin}>
            <h1 className="login-form__heading">авторизация</h1>
            <label htmlFor="email_input" className="login-form__label">E-mail</label>
            <input className="login-form__input" type="email" name="email" id="email_input" placeholder="example@domain.xyz" />
            <label htmlFor="password_input" className="login-form__label">Пароль</label>
            <input className="login-form__input" type="password" name="password" id="password_input" />
            <button className="shadow login-form__submit-btn" type="submit">авторизоваться</button>
        </form>
    )
}