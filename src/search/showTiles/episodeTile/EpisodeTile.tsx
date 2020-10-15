import React from 'react'
import styles from 'search/showTiles/episodeTile/EpisodeTile.module.scss'

type TProps = {episode: TEpisode}

export function EpisodeTile({episode}: TProps) {
    const {name} = episode

    return (
        <section className={styles.locationTile}>
            <div className={styles.content}>
                <h3>{name}</h3>
            </div>
        </section>
    )
}
