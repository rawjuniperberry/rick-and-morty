import {Loader} from 'components/loader/Loader'
import {ShowError} from 'components/showError/ShowError'
import {EpisodeTile} from 'components/tiles/episodeTile/EpisodeTile'
import React from 'react'

type TProps = {list: TEpisode[] | null, error: string | undefined}

export function EpisodeListShow({list, error}: TProps) {

    if (error) return <ShowError text={error}/>
    if (!list) return <Loader/>

    return (
        <section className='itemList'>
            {list.map(el => <EpisodeTile key={el.id} episode={el}/>)}
        </section>
    )
}
