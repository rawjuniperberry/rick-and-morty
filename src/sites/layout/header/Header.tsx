import {ReactComponent as Home} from 'icons/home.svg'
import {ReactComponent as Person} from 'icons/person.svg'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Auth} from 'sites/layout/auth/Auth'
import {selectAuth, signOut} from 'sites/layout/auth/authSlice'
import styles from 'sites/layout/header/Header.module.scss'

export function Header() {
    const [openAuth, setOpenAuth] = useState(false)
    const auth = useSelector(selectAuth)
    const dispatch = useDispatch()

    return (
        <header className={styles.header}>
            <Link to='/search' aria-label='home page'>
                <Home/>
            </Link>

            <div className={styles.auth}>
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
                    <button className='btnClear' onClick={() => setOpenAuth(true)}>
                        <div>Sign in</div>
                        <Person/>
                    </button>
                }
            </div>

            {openAuth && <Auth closeFn={() => setOpenAuth(false)}/>}
        </header>
    )
}
