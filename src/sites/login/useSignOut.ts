import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {selectAuth, signOut} from 'sites/login/authSlice'

export function useSignOut() {
    const auth = useSelector(selectAuth)
    const dispatch = useDispatch()

    return useCallback(() => {
        if (auth.JWT)
            dispatch(signOut())
    }, [dispatch, auth])
}
