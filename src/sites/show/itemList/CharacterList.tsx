import axios from 'axios'
import {Loader} from 'components/loader/Loader'
import {NoCharacters} from 'components/noCharacters/NoCharacters'
import {ShowError} from 'components/showError/ShowError'
import {CharacterTile} from 'components/tiles/characterTile/CharacterTile'
import React, {useEffect, useState} from 'react'

type TProps = {arrayOfId: string[]}

export function CharacterList({arrayOfId}: TProps) {
    const [characters, setCharacters] = useState<TCharacter[]>()
    const [err, setErr] = useState<TErr>(null)

    useEffect(() => {
        if (!arrayOfId) return

        if (!arrayOfId.length) return setCharacters([])

        axios.get(`https://rickandmortyapi.com/api/character/${arrayOfId.toString()}`)
            .then(({data}: {data: TCharacter[]}) => setCharacters(Array.isArray(data) ? data : [data]))
            .catch(({response}) => setErr(response.data.error))
    }, [arrayOfId])

    if (err) return <ShowError text={err}/>
    if (!characters) return <Loader/>

    return (
        <section className='itemList'>
            {characters.length ?
                characters.map(el => <CharacterTile key={el.id} character={el}/>)
                :
                <NoCharacters/>}
        </section>
    )
}
