import React from 'react'
import styles from './Loader.module.scss'

export function Loader() {
    return (
        <div className={styles.loader}>
            <svg className={styles.circular}>
                <circle className={styles.path} cx="50" cy="50" r="20" fill="none" strokeWidth="2"
                        strokeMiterlimit="10"/>
            </svg>
        </div>
    )
}
