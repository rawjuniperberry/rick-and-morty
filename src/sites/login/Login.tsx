import {yupResolver} from '@hookform/resolvers/yup'
import React from 'react'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {signIn} from 'sites/login/auth/authSlice'
import {Morty, Rick} from 'sites/login/credentials'
import styles from 'sites/login/Login.module.scss'
import * as yup from 'yup'
import {useHistory} from 'react-router-dom'

const schema = yup.object({
    email: yup
        .string()
        .required('This field is required')
        .min(5, 'Enter at least 5 characters')
        .max(100, 'Enter up to 100 characters')
        .email('Email address is invalid'),
    password: yup
        .string()
        .required('This field is required')
        .min(8, 'Enter at least 8 characters')
        .max(100, 'Enter up to 100 characters'),
}).defined()

type TFormSchema = yup.InferType<typeof schema>

export function Login() {
    const {register, handleSubmit, errors} = useForm<TFormSchema>({resolver: yupResolver(schema)})
    const history = useHistory()
    const dispatch = useDispatch()

    const onSubmit = handleSubmit(({email, password}) => {
        if (email === Rick.email && password === Rick.password) {
            dispatch(signIn(Rick.payload))
            history.push('/dashboard')
        }

        if (email === Morty.email && password === Morty.password) {
            dispatch(signIn(Morty.payload))
            history.push('/dashboard')
        }
    })

    return (
        <article className={styles.login}>
            <h1>Sign in</h1>

            <form className={styles.form} onSubmit={onSubmit} noValidate>
                <label>
                    <div>Email</div>
                    <input className='input' name='email' type='email' ref={register}/>
                    <div className={styles.error}>{errors.email?.message}</div>
                </label>
                <label>
                    <div>Password</div>
                    <input className='input' name='password' type="password" ref={register}/>
                    <div className={styles.error}>{errors.password?.message}</div>
                </label>

                <button className='btn' type='submit'>Submit</button>
            </form>

            <section className={styles.credentials}>
                <div>
                    <p>Rick</p>
                    <div>Email: {Rick.email}</div>
                    <div>Password: {Rick.password}</div>
                </div>

                <div>
                    <p>Morty</p>
                    <div>Email: {Morty.email}</div>
                    <div>Password: {Morty.password}</div>
                </div>
            </section>

        </article>
    )
}
