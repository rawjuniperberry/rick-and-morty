import axios from 'axios'
import {Pagination} from 'components/pagination/Pagination'
import React, {useEffect, useState} from 'react'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import {Filters} from 'search/filters/Filters'
import styles from 'search/Search.module.scss'
import {ShowTiles} from './showTiles/ShowTiles'

export enum ContentType {characters = 'character', locations = 'location', episodes = 'episode'}

export function Search() {
    const [contentType, setContentType] = useState<ContentType>(ContentType.characters)
    const [dataServer, setDataServer] = useState<TServer>()
    const [err, setErr] = useState<TErr>(null)
    const {search} = useLocation()
    const {contentParam} = useParams()
    const history = useHistory()

    useEffect(() => {
        switch (contentParam) {
            case ContentType.characters:
                return setContentType(ContentType.characters)

            case ContentType.locations:
                return setContentType(ContentType.locations)

            case ContentType.episodes:
                return setContentType(ContentType.episodes)

            default:
                return setContentType(ContentType.characters)
        }
    }, [contentParam])

    useEffect(() => {
        if (!contentType) return

        axios.get(`https://rickandmortyapi.com/api/${contentType}${search}`)
            .then(({data}: {data: TServer}) => {
                setDataServer(data)
                setErr(null)
            })
            .catch(({response}) => setErr(response.data.error))
    }, [search, contentType])

    return (
        <article className={styles.search}>
            <h1>
                Rick and Morty
                <br/>
                knowledge base
            </h1>

            <div className={styles.select}>
                <button className='btn' onClick={() => history.push('/search/character')}>Characters</button>
                <button className='btn' onClick={() => history.push('/search/location')}>Locations</button>
                <button className='btn' onClick={() => history.push('/search/episode')}>Episodes</button>
            </div>

            <Filters contentType={contentType}/>

            <ShowTiles contentType={contentType} results={dataServer?.results} err={err}/>

            {!err && dataServer && <Pagination pages={dataServer.info.pages}/>}
        </article>
    )
}
