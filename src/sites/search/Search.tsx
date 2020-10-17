import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {NavLink, useLocation, useParams} from 'react-router-dom'
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
                <NavLink to='/search/character' activeClassName={styles.active}>Characters</NavLink>
                <NavLink to='/search/location' activeClassName={styles.active}>Locations</NavLink>
                <NavLink to='/search/episode' activeClassName={styles.active}>Episodes</NavLink>
            </div>

            <Filters contentType={contentType}/>

            <ShowTiles contentType={contentType} results={dataServer?.results} err={err}/>

            {!err && dataServer && <Pagination pages={dataServer.info.pages}/>}
        </article>
    )
}
