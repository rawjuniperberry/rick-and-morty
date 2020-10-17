import axios from 'axios'
import {Loader} from 'components/loader/Loader'
import {ShowError} from 'components/showError/ShowError'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import styles from 'sites/show/character/CharacterShow.module.scss'
import {EpisodeList} from 'sites/show/itemList/EpisodeList'
import stylesShow from 'sites/show/Show.module.scss'

export function CharacterShow() {
    const {id} = useParams()
    const [character, setCharacter] = useState<TCharacter>()
    const [err, setErr] = useState<TErr>(null)
    const [arrayOfId, setArrayOfId] = useState<string[]>()

    useEffect(() => {
        if (!id) return

        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(({data}: {data: TCharacter}) => setCharacter(data))
            .catch(({response}) => setErr(response.data.error))
    }, [id])

    useEffect(() => {
        if (!character) return

        setArrayOfId(character.episode.map(el => el.slice(40)))
    }, [character])

    if (err) return <ShowError text={err}/>
    if (!character) return <Loader/>

    const {gender, name, image, status, species, location, origin} = character

    return (
        <article className={styles.character}>
            <h1>{name}</h1>

            <div className={styles.content}>
                <img src={image} alt={'image of ' + name} className={styles.image}/>
                <div className={styles.data}>
                    <div className={stylesShow.property}>
                        <div>Status</div>
                        <div>{status}</div>
                    </div>
                    <div className={stylesShow.property}>
                        <div>Species:</div>
                        <div>{species}</div>
                    </div>
                    <div className={stylesShow.property}>
                        <div>Gender:</div>
                        <div>{gender}</div>
                    </div>
                    <div className={stylesShow.property}>
                        <div>Last known location:</div>
                        <div>{location.name}</div>
                    </div>
                    <div className={stylesShow.property}>
                        <div>First seen in:</div>
                        <div>{origin.name}</div>
                    </div>
                </div>
            </div>

            <section>
                <h2>Seen in the episodes:</h2>
                {arrayOfId && <EpisodeList arrayOfId={arrayOfId}/>}
            </section>

        </article>
    )
}
