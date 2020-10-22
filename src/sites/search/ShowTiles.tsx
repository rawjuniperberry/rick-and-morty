import {CharacterTile} from 'components/tiles/characterTile/CharacterTile'
import {EpisodeTile} from 'components/tiles/episodeTile/EpisodeTile'
import {LocationTile} from 'components/tiles/locationTile/LocationTile'
import React from 'react'
import {ContentType} from 'service/contentParam'

type TProps = {contentType: ContentType, results: TResults}

export function ShowTiles({contentType, results}: TProps) {
    return (
        <section className='itemList'>
            {contentType === ContentType.characters &&
            (results as TCharacter[]).map(el => <CharacterTile key={el.id} character={el}/>)}

            {contentType === ContentType.locations &&
            (results as TLocation[]).map(el => <LocationTile key={el.id} location={el}/>)}

            {contentType === ContentType.episodes &&
            (results as TEpisode[]).map(el => <EpisodeTile key={el.id} episode={el}/>)}
        </section>
    )
}
