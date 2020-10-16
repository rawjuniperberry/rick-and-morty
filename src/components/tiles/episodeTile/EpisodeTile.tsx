import {EpisodeMark} from 'components/episodeMark/EpisodeMark'
import React from 'react'
import {Link} from 'react-router-dom'
import styles from 'components/tiles/episodeTile/EpisodeTile.module.scss'

type TProps = {episode: TEpisode}

export function EpisodeTile({episode}: TProps) {
    const {name, id} = episode

    return (
        <Link to={'/show/episode/' + id} className={styles.episodeTile}>
            <EpisodeMark mark={episode.episode}/>
            <div className={styles.content}>
                <h3>{name}</h3>
            </div>
        </Link>
    )
}
