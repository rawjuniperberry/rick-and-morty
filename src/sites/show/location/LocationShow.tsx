import axios from 'axios'
import {Loader} from 'components/loader/Loader'
import {ShowError} from 'components/showError/ShowError'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {CharacterList} from 'sites/show/itemList/CharacterList'
import styles from 'sites/show/location/LocationShow.module.scss'
import stylesShow from 'sites/show/Show.module.scss'

export function LocationShow() {
    const {id} = useParams()
    const [location, setLocation] = useState<TLocation>()
    const [err, setErr] = useState<TErr>(null)
    const [arrayOfId, setArrayOfId] = useState<string[]>()

    useEffect(() => {
        if (!id) return

        axios.get(`https://rickandmortyapi.com/api/location/${id}`)
            .then(({data}: {data: TLocation}) => setLocation(data))
            .catch(({response}) => setErr(response.data.error))
    }, [id])

    useEffect(() => {
        if (!location) return

        setArrayOfId(location.residents.map(el => el.slice(42)))
    }, [location])

    if (err) return <ShowError text={err}/>
    if (!location) return <Loader/>

    const {name, dimension, type} = location

    return (
        <article className={styles.location}>
            <h1>{name}</h1>

            <section>
                <div className={stylesShow.property}>
                    <div>Dimension:</div>
                    <div>{dimension}</div>
                </div>
                <div className={stylesShow.property}>
                    <div>Type:</div>
                    <div>{type}</div>
                </div>
            </section>

            <section>
                <h2>Residents</h2>
                {arrayOfId && <CharacterList arrayOfId={arrayOfId}/>}
            </section>
        </article>
    )
}
