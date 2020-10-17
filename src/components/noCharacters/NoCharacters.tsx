import styles from 'components/showError/ShowError.module.scss'
import {ReactComponent as PersonX} from 'icons/personX.svg'
import React from 'react'

export function NoCharacters() {
    return (
        <div className={styles.showError}>
            <PersonX/>
            <div>No characters</div>
        </div>
    )
}
