import axios from 'axios'
import {EpisodeMark} from 'components/episodeMark/EpisodeMark'
import {Loader} from 'components/loader/Loader'
import {ShowError} from 'components/showError/ShowError'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import styles from 'sites/show/episode/EpisodeShow.module.scss'
import stylesShow from 'sites/show/Show.module.scss'
import {CharacterList} from 'sites/show/itemList/CharacterList'

export function EpisodeShow() {
    const {id} = useParams()
    const [episode, setEpisode] = useState<TEpisode>()
    const [err, setErr] = useState<TErr>(null)
    const [arrayOfId, setArrayOfId] = useState<string[]>()

    useEffect(() => {
        if (!id) return

        axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
            .then(({data}: {data: TEpisode}) => setEpisode(data))
            .catch(({response}) => setErr(response.data.error))
    }, [id])

    useEffect(() => {
        if (!episode) return

        setArrayOfId(episode.characters.map(el => el.slice(42)))
    }, [episode])

    if (err) return <ShowError text={err}/>
    if (!episode) return <Loader/>

    const {name, air_date} = episode

    return (
        <article className={styles.episode}>
            <h1>{name}</h1>

            <section className={styles.content}>
                <EpisodeMark mark={episode.episode}/>
                <div className={stylesShow.property}>
                    <div>Air date:</div>
                    <div>{air_date}</div>
                </div>
            </section>

            <section>
                <h2>Characters from the episode:</h2>
                {arrayOfId && <CharacterList arrayOfId={arrayOfId}/>}
            </section>
        </article>
    )
}
