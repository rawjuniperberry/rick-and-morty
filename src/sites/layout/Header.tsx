import {ReactComponent as Home} from 'icons/home.svg'
import {ReactComponent as Person} from 'icons/person.svg'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {selectAuth, signOut} from 'sites/login/auth/authSlice'
import styles from 'sites/layout/Header.module.scss'

export function Header() {
    const auth = useSelector(selectAuth)
    const dispatch = useDispatch()

    return (
        <header className={styles.header}>
            <Link to='/search' aria-label='home page' className={styles.home}>
                <Home/>
            </Link>

            <Link to='/dashboard'>Dashboard</Link>

            {auth.name ?
                <div className={styles.account}>
                    <div className={styles.userName}>
                        <div>{auth.name}</div>
                        <Person/>
                    </div>

                    <button className='btnClear' onClick={() => dispatch(signOut())}>
                        <div>Sign out</div>
                    </button>
                </div>
                :
                <Link to='/login' className='btnClear'>
                    <div>Sign in</div>
                    <Person/>
                </Link>
            }
        </header>
    )
}
