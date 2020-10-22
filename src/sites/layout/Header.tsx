import {ReactComponent as Home} from 'icons/home.svg'
import {ReactComponent as Person} from 'icons/person.svg'
import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import styles from 'sites/layout/Header.module.scss'
import {selectAuth} from 'sites/login/authSlice'
import {useSignOut} from 'sites/login/useSignOut'

export function Header() {
    const auth = useSelector(selectAuth)
    const signOut = useSignOut()

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

                    <button className='btnClear' onClick={signOut}>
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
