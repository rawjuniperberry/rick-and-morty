import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {TStoreState} from 'store/store'

export type TAuthState = {name: string, uuid: string, JWT: string}
export type TAuthSignInPayload = {name: string, uuid: string, JWT: string}

const initialState: TAuthState = {
    name: '',
    uuid: '',
    JWT: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signIn: (state, action: PayloadAction<TAuthSignInPayload>) => {
            const {name, uuid, JWT} = action.payload
            state.name = name
            state.uuid = uuid
            state.JWT = JWT

            localStorage.setItem('account', `${name}|${uuid}|${JWT}`)
        },
        signOut: state => {
            state.name = ''
            state.uuid = ''
            state.JWT = ''

            localStorage.removeItem('account')
        },
    },
})

export const {signIn, signOut} = authSlice.actions
export const selectAuth = (state: TStoreState) => state.auth

export default authSlice.reducer
