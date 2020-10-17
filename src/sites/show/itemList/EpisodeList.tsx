import axios from 'axios'
import {Loader} from 'components/loader/Loader'
import {ShowError} from 'components/showError/ShowError'
import {EpisodeTile} from 'components/tiles/episodeTile/EpisodeTile'
import React, {useEffect, useState} from 'react'

type TProps = {arrayOfId: string[]}

export function EpisodeList({arrayOfId}: TProps) {
    const [episodes, setEpisodes] = useState<TEpisode[]>()
    const [err, setErr] = useState<TErr>(null)

    useEffect(() => {
        if (!arrayOfId) return

        if (!arrayOfId.length) return setEpisodes([])

        axios.get(`https://rickandmortyapi.com/api/episode/${arrayOfId.toString()}`)
            .then(({data}: {data: TEpisode[]}) => setEpisodes(Array.isArray(data) ? data : [data]))
            .catch(({response}) => setErr(response.data.error))
    }, [arrayOfId])

    if (err) return <ShowError text={err}/>
    if (!episodes) return <Loader/>

    return (
        <section className='itemList'>
            {episodes.map(el => <EpisodeTile key={el.id} episode={el}/>)}
        </section>
    )
}
