import React, {Fragment, useCallback, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {signIn, signOut} from 'sites/login/auth/authSlice'

export function AuthSync() {
    const dispatch = useDispatch()

    const handleAccountState = useCallback((account: string | null) => {
        if (!account) return dispatch(signOut())

        const [name, uuid, JWT] = account.split('|')

        dispatch(signIn({name, uuid, JWT}))
    }, [dispatch])

    useEffect(() => {
        const account = localStorage.getItem('account')

        handleAccountState(account)
    }, [handleAccountState])

    useEffect(() => {
        const onStorageChange = ({key, newValue}: StorageEvent) => {
            if (key !== 'account') return

            handleAccountState(newValue)
        }

        window.addEventListener('storage', onStorageChange)
        return () => window.removeEventListener('storage', onStorageChange)
    }, [handleAccountState])

    return <Fragment/>
}
