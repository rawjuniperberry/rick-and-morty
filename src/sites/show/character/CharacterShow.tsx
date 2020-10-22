import {Loader} from 'components/loader/Loader'
import {ShowError} from 'components/showError/ShowError'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import styles from 'sites/show/character/CharacterShow.module.scss'
import {fetchCharacter, selectCharacter} from 'sites/show/character/characterSlice'
import {EpisodeListShow} from 'sites/show/itemList/EpisodeListShow'
import stylesShow from 'sites/show/Show.module.scss'

export function CharacterShow() {
    const {id} = useParams()
    const {character, episodeList, errorList, errorCharacter} = useSelector(selectCharacter)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!id) return

        dispatch(fetchCharacter({id}))
    }, [id, dispatch])

    if (errorCharacter) return <ShowError text={errorCharacter}/>
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
                <EpisodeListShow list={episodeList} error={errorList}/>
            </section>

        </article>
    )
}
