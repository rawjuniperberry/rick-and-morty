import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import {ContentType, getContentTypeFromStr} from 'service/contentParam'
import {Filters} from 'sites/search/filters/Filters'
import {Pagination} from 'sites/search/pagination/Pagination'
import styles from 'sites/search/Search.module.scss'
import {ShowTiles} from 'sites/search/ShowTiles'

export function Search() {
    const [contentType, setContentType] = useState<ContentType>(ContentType.characters)
    const [dataServer, setDataServer] = useState<TServer>()
    const [err, setErr] = useState<TErr>(null)
    const {search} = useLocation()
    const {contentParam} = useParams<{contentParam: string}>()
    const history = useHistory()

    useEffect(() => setContentType(getContentTypeFromStr(contentParam)), [contentParam])

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
