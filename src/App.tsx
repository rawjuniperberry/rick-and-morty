import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {AuthSync} from 'sites/layout/auth/AuthSync'
import {Header} from 'sites/layout/header/Header'
import {Search} from 'sites/search/Search'
import {Show} from 'sites/show/Show'
import store from 'store/store'

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
