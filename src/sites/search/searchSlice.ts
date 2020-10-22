import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {ContentType} from 'service/contentParam'
import {TStoreState} from 'store/store'

export type TSearchPayload = {contentType: ContentType, search: string}

export type TSearchState = {
    dataServer: TServer,
    loading: 'idle' | 'pending',
    currentRequestId: string | null,
    error: string | undefined,
}
const initialState: TSearchState = {
    dataServer: null,
    loading: 'idle',
    currentRequestId: null,
    error: undefined,
}

export const fetchResults = createAsyncThunk<TServer, TSearchPayload, {state: TStoreState, rejectValue: string}>(
    'search/fetchResult',
    async ({contentType, search}, {getState, requestId, rejectWithValue}) => {
        const {currentRequestId, loading} = getState().search

        if (loading !== 'pending' || requestId !== currentRequestId) return getState().search.dataServer

        return await axios.get(`https://rickandmortyapi.com/api/${contentType}${search}`)
            .then(({data}: {data: TServer}) => data)
            .catch(({response}) => rejectWithValue(response.data.error))
    },
)

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchResults.pending, (state, action) => {
            if (state.loading === 'pending') return

            state.loading = 'pending'
            state.currentRequestId = action.meta.requestId
        })
        builder.addCase(fetchResults.fulfilled, (state, action) => {
            const {requestId} = action.meta

            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle'
                state.dataServer = action.payload
                state.error = undefined
                state.currentRequestId = null
            }
        })
        builder.addCase(fetchResults.rejected, (state, action) => {
            const {requestId} = action.meta

            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle'
                state.error = action.payload
                state.currentRequestId = null
            }
        })
    },
})

export const selectSearch = (state: TStoreState) => state.search

export default searchSlice.reducer
