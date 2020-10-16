import {Header} from 'components/header/Header'
import React from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Search} from 'sites/search/Search'
import {Show} from 'sites/show/Show'

function App() {
    return (
        <BrowserRouter>
            <main className='container'>
                <Header/>
                <Switch>
                    <Route exact path='/'>
                        <Redirect to="/search/character"/>
                    </Route>

                    <Route path={['/search/:contentParam', '/search']} component={Search}/>
                    <Route path='/show' component={Show}/>
                </Switch>
            </main>
        </BrowserRouter>
    )
}

export default App
