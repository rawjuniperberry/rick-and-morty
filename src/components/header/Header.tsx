import {ReactComponent as Home} from 'icons/home.svg'
import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Header.module.scss'

export function Header() {
    return (
        <header className={styles.header}>
            <Link to='/search'>
                <Home/>
            </Link>
        </header>
    )
}
