import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TStoreState} from 'store/store'

export type TAuthState = {name: string, uuid: string}
export type TAuthSignInPayload = {name: string, uuid: string}

const initialState: TAuthState = {
    name: '',
    uuid: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signIn: (state, action: PayloadAction<TAuthSignInPayload>) => {
            state.name = action.payload.name
            state.uuid = action.payload.uuid
            localStorage.setItem('account', action.payload.name + '|' + action.payload.uuid)
        },
        signOut: state => {
            state.name = ''
            state.uuid = ''
            localStorage.removeItem('account')
        },
    },
})

export const {signIn, signOut} = authSlice.actions
export const selectAuth = (state: TStoreState) => state.auth

export default authSlice.reducer
