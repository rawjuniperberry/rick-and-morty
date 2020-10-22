import {EpisodeMark} from 'components/episodeMark/EpisodeMark'
import {Loader} from 'components/loader/Loader'
import {ShowError} from 'components/showError/ShowError'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import styles from 'sites/show/episode/EpisodeShow.module.scss'
import {fetchEpisode, selectEpisode} from 'sites/show/episode/episodeSlice'
import {CharacterListShow} from 'sites/show/itemList/CharacterListShow'
import stylesShow from 'sites/show/Show.module.scss'

export function EpisodeShow() {
    const {id} = useParams()
    const {episode, characterList, errorList, errorEpisode} = useSelector(selectEpisode)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!id) return

        dispatch(fetchEpisode({id}))
    }, [dispatch, id])

    if (errorEpisode) return <ShowError text={errorEpisode}/>
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
                <CharacterListShow list={characterList} error={errorList}/>
            </section>
        </article>
    )
}
