import styles from 'components/showError/ShowError.module.scss'
import {ReactComponent as Bug} from 'icons/bug.svg'
import React from 'react'

type TProps = {text: string}

export function ShowError({text}: TProps) {
    return (
        <div className={styles.showError}>
            <Bug/>
            <div>{text}</div>
        </div>
    )
}
