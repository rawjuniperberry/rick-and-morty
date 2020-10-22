import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {getFetchCharacterListThunk} from 'sites/show/itemList/CharacterListShow'
import {TStoreState} from 'store/store'

export type TLocationState = {
    value: TLocation | null,
    characterList: TCharacter[] | null,
    errorValue: string | undefined,
    errorList: string | undefined,
}

const initialState: TLocationState = {
    value: null,
    characterList: null,
    errorValue: undefined,
    errorList: undefined,
}

export const fetchLocation = createAsyncThunk<TLocation, {id: string}, {state: TStoreState, rejectValue: string}>(
    'location/fetchLocation',
    async ({id}, {dispatch, rejectWithValue}) =>
        await axios.get(`https://rickandmortyapi.com/api/location/${id}`)
            .then(({data}: {data: TLocation}) => {
                const arrayOfId = data.residents.map(el => el.slice(42))
                dispatch(fetchCharacterList({arrayOfId: Array.isArray(arrayOfId) ? arrayOfId : [arrayOfId]}))

                return data
            })
            .catch(({response}) => rejectWithValue(response.data.error)),
)

const fetchCharacterList = getFetchCharacterListThunk('location/fetchCharacterList')

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchLocation.fulfilled, (state, action) => {
            state.value = action.payload
            state.errorValue = undefined
        })
        builder.addCase(fetchLocation.rejected, (state, action) => {
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

export const selectLocation = (state: TStoreState) => state.location

export default locationSlice.reducer
