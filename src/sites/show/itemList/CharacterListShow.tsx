import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {Loader} from 'components/loader/Loader'
import {NoCharacters} from 'components/noCharacters/NoCharacters'
import {ShowError} from 'components/showError/ShowError'
import {CharacterTile} from 'components/tiles/characterTile/CharacterTile'
import React from 'react'
import {TStoreState} from 'store/store'

type TProps = {list: TCharacter[] | null, error: string | undefined}

export function CharacterListShow({list, error}: TProps) {

    if (error) return <ShowError text={error}/>
    if (!list) return <Loader/>

    return (
        <section className='itemList'>
            {list.length ?
                list.map(el => <CharacterTile key={el.id} character={el}/>)
                :
                <NoCharacters/>}
        </section>
    )
}

export const getFetchCharacterListThunk = (name: string) =>
    createAsyncThunk<TCharacter[], {arrayOfId: string[]}, {state: TStoreState, rejectValue: string}>(
        name,
        async ({arrayOfId}, {rejectWithValue}) => {
            if (!arrayOfId.length) return []

            return await axios.get(`https://rickandmortyapi.com/api/character/${arrayOfId.toString()}`)
                .then(({data}: {data: TCharacter[]}) => data)
                .catch(({response}) => rejectWithValue(response.data.error))
        },
    )
