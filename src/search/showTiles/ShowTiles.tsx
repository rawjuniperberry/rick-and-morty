import React from 'react'
import {ContentType} from 'search/Search'
import {CharacterTile} from 'search/showTiles/characterTile/CharacterTile'
import {EpisodeTile} from 'search/showTiles/episodeTile/EpisodeTile'
import {LocationTile} from 'search/showTiles/locationTile/LocationTile'
import styles from './ShowTiles.module.scss'

type TProps = {contentType: ContentType, results?: TResults, err: TErr}

export function ShowTiles({contentType, results, err}: TProps) {

    if (err) return <div>{err}</div>
    if (!results) return <div>No results</div>

    return (
        <section className={styles.showTiles}>
            {contentType === ContentType.characters &&
            (results as TCharacter[]).map(el => <CharacterTile key={el.id} character={el}/>)}

            {contentType === ContentType.locations &&
            (results as TLocation[]).map(el => <LocationTile key={el.id} location={el}/>)}

            {contentType === ContentType.episodes &&
            (results as TEpisode[]).map(el => <EpisodeTile key={el.id} episode={el}/>)}
        </section>
    )
}
