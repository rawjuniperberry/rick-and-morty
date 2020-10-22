import React from 'react'
import {useSelector} from 'react-redux'
import styles from 'sites/dashboard/Dashboard.module.scss'
import {selectAuth} from 'sites/login/auth/authSlice'

export function Dashboard() {
    const auth = useSelector(selectAuth)

    return (
        <article className={styles.dashboard}>
            <h1>Dashboard</h1>

            <h2>You are logged in as {auth.name}</h2>
        </article>
    )
}
