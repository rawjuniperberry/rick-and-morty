import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Dashboard} from 'sites/dashboard/Dashboard'
import {AuthSync} from 'sites/login/AuthSync'
import {Header} from 'sites/layout/Header'
import {Login} from 'sites/login/Login'
import {Search} from 'sites/search/Search'
import {Show} from 'sites/show/Show'
import store from 'store/store'
import { PrivateRoute } from 'service/PrivateRoute'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header/>
                <main className='container'>
                    <Switch>
                        <Route exact path={['/', '/search']}>
                            <Redirect to="/search/character"/>
                        </Route>

                        <Route path='/login' component={Login}/>

                        <PrivateRoute path='/dashboard' component={Dashboard}/>

                        <Route path='/search/:contentParam' component={Search}/>
                        <Route path='/show' component={Show}/>
                    </Switch>
                </main>
                <AuthSync/>
            </BrowserRouter>
        </Provider>
    )
}

export default App
