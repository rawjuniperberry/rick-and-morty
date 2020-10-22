import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {getFetchCharacterListThunk} from 'sites/show/itemList/CharacterListShow'
import {TStoreState} from 'store/store'

export type TEpisodeState = {
    value: TEpisode | null,
    characterList: TCharacter[] | null,
    errorValue: string | undefined,
    errorList: string | undefined,
}

const initialState: TEpisodeState = {
    value: null,
    characterList: null,
    errorValue: undefined,
    errorList: undefined,
}

export const fetchEpisode = createAsyncThunk<TEpisode, {id: string}, {state: TStoreState, rejectValue: string}>(
    'episode/fetchEpisode',
    async ({id}, {dispatch, rejectWithValue}) =>
        await axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
            .then(({data}: {data: TEpisode}) => {
                const arrayOfId = data.characters.map(el => el.slice(42))
                dispatch(fetchCharacterList({arrayOfId: Array.isArray(arrayOfId) ? arrayOfId : [arrayOfId]}))

                return data
            })
            .catch(({response}) => rejectWithValue(response.data.error)),
)

const fetchCharacterList = getFetchCharacterListThunk('episode/fetchCharacterList')

const episodeSlice = createSlice({
    name: 'episode',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchEpisode.fulfilled, (state, action) => {
            state.value = action.payload
            state.errorValue = undefined
        })
        builder.addCase(fetchEpisode.rejected, (state, action) => {
            state.errorValue = action.payload
        })
        builder.addCase(fetchCharacterList.fulfilled, (state, action) => {
            state.characterList = action.payload
            state.errorList = undefined
        })
        builder.addCase(fetchCharacterList.rejected, (state, action) => {
            state.errorList = action.payload
        })
    },
})

export const selectEpisode = (state: TStoreState) => state.episode

export default episodeSlice.reducer
