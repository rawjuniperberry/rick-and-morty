import {Loader} from 'components/loader/Loader'
import {ShowError} from 'components/showError/ShowError'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink, useLocation, useParams} from 'react-router-dom'
import {ContentType, getContentTypeFromStr} from 'service/contentParam'
import {Filters} from 'sites/search/filters/Filters'
import {Pagination} from 'sites/search/pagination/Pagination'
import styles from 'sites/search/Search.module.scss'
import {fetchResults, selectSearch} from 'sites/search/searchSlice'
import {ShowTiles} from 'sites/search/ShowTiles'

export function Search() {
    const [contentType, setContentType] = useState<ContentType>(ContentType.characters)
    const {search} = useLocation()
    const {contentParam} = useParams<{contentParam: string}>()
    const {dataServer, loading, error} = useSelector(selectSearch)
    const dispatch = useDispatch()

    useEffect(() => setContentType(getContentTypeFromStr(contentParam)), [contentParam])

    useEffect(() => {
        if (!contentType) return

        dispatch(fetchResults({contentType, search}))
    }, [dispatch, search, contentType])

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

            {error && <ShowError text={error}/>}
            {loading === 'pending' && <Loader/>}

            {!error && loading !== 'pending' && dataServer &&
            <div>
                <ShowTiles contentType={contentType} results={dataServer.results}/>
                <Pagination pages={dataServer.info.pages}/>
            </div>}

        </article>
    )
}
