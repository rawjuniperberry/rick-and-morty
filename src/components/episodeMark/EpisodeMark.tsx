import styles from 'components/episodeMark/EpisodeMark.module.scss'
import React from 'react'

type TProps = {mark: string}

export function EpisodeMark({mark}: TProps) {
    return (
        <div className={styles.mark}>{mark}</div>
    )
}
