import {Loader} from 'components/loader/Loader'
import {ShowError} from 'components/showError/ShowError'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {CharacterListShow} from 'sites/show/itemList/CharacterListShow'
import styles from 'sites/show/location/LocationShow.module.scss'
import {fetchLocation, selectLocation} from 'sites/show/location/locationSlice'
import stylesShow from 'sites/show/Show.module.scss'

export function LocationShow() {
    const {id} = useParams()
    const {location, characterList, errorList, errorLocation} = useSelector(selectLocation)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!id) return

        dispatch(fetchLocation({id}))
    }, [dispatch, id])


    if (errorLocation) return <ShowError text={errorLocation}/>
    if (!location) return <Loader/>

    const {name, dimension, type} = location

    return (
        <article className={styles.location}>
            <h1>{name}</h1>

            <section className={styles.content}>
                <div className={stylesShow.property}>
                    <div>Dimension:</div>
                    <div>{dimension}</div>
                </div>
                <div className={stylesShow.property}>
                    <div>Type:</div>
                    <div>{type}</div>
                </div>
            </section>

            <section className={styles.residents}>
                <h2>Residents of the location:</h2>
                <CharacterListShow list={characterList} error={errorList}/>
            </section>
        </article>
    )
}
