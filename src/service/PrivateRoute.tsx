import React, {ComponentType} from 'react'
import {useSelector} from 'react-redux'
import {Redirect, Route} from 'react-router-dom'
import {selectAuth} from 'sites/login/auth/authSlice'

type TProps = {component: ComponentType<any>, path: string, exact?: boolean}

export const PrivateRoute = ({component: Component, ...routeProps}: TProps) => {
    const auth = useSelector(selectAuth)

    return auth.JWT ?
        <Route {...routeProps} render={props => <Component {...props}/>}/>
        :
        <Redirect to='/login'/>
}
