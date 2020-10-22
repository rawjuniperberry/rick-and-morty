import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {TStoreState} from 'store/store'

export type TCharacterState = {
    value: TCharacter | null,
    episodeList: TEpisode[] | null,
    errorValue: string | undefined,
    errorList: string | undefined,
}

const initialState: TCharacterState = {
    value: null,
    episodeList: null,
    errorValue: undefined,
    errorList: undefined,
}

export const fetchCharacter = createAsyncThunk<TCharacter, {id: string}, {state: TStoreState, rejectValue: string}>(
    'character/fetchCharacter',
    async ({id}, {dispatch, rejectWithValue}) =>
        await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(({data}: {data: TCharacter}) => {
                const arrayOfId = data.episode.map(el => el.slice(40))
                dispatch(fetchEpisodeList({arrayOfId: Array.isArray(arrayOfId) ? arrayOfId : [arrayOfId]}))

                return data
            })
            .catch(({response}) => rejectWithValue(response.data.error)),
)

const fetchEpisodeList = createAsyncThunk<TEpisode[], {arrayOfId: string[]}, {state: TStoreState, rejectValue: string}>(
    'character/fetchEpisodeList',
    async ({arrayOfId}, {rejectWithValue}) => {
        if (!arrayOfId.length) return []

        return await axios.get(`https://rickandmortyapi.com/api/episode/${arrayOfId.toString()}`)
            .then(({data}: {data: TEpisode[]}) => data)
            .catch(({response}) => rejectWithValue(response.data.error))
    },
)

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCharacter.fulfilled, (state, action) => {
            state.value = action.payload
            state.errorValue = undefined
        })
        builder.addCase(fetchCharacter.rejected, (state, action) => {
            state.errorValue = action.payload
        })
        builder.addCase(fetchEpisodeList.fulfilled, (state, action) => {
            state.episodeList = action.payload
            state.errorList = undefined
        })
        builder.addCase(fetchEpisodeList.rejected, (state, action) => {
            state.errorList = action.payload
        })
    },
})

export const selectCharacter = (state: TStoreState) => state.character

export default characterSlice.reducer
