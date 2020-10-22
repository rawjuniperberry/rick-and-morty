import {configureStore} from '@reduxjs/toolkit'
import authReducer, {TAuthState} from 'sites/login/authSlice'
import searchReducer, {TSearchState} from 'sites/search/searchSlice'
import characterReducer, {TCharacterState} from 'sites/show/character/characterSlice'
import episodeReducer, {TEpisodeState} from 'sites/show/episode/episodeSlice'
import locationReducer, {TLocationState} from 'sites/show/location/locationSlice'

export type TStoreState = {
    auth: TAuthState,
    search: TSearchState
    character: TCharacterState,
    episode: TEpisodeState
    location: TLocationState
}

export default configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        character: characterReducer,
        episode: episodeReducer,
        location: locationReducer,
    },
})
