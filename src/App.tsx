import {Search} from 'search/Search'
import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <main className='container'>
                <Switch>
                    <Route exact path='/'>
                        <Redirect to="/search/character"/>
                    </Route>

                    <Route path={['/search/:contentParam', '/search']} component={Search}/>
                </Switch>
            </main>
        </BrowserRouter>
    )
}

export default App
