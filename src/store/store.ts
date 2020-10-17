import {configureStore} from '@reduxjs/toolkit'
import authReducer, {TAuthState} from 'sites/layout/auth/authSlice'

export type TStoreState = {
    auth: TAuthState
}

export default configureStore({
    reducer: {
        auth: authReducer,
    },
})
