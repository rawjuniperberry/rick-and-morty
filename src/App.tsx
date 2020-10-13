import {Home} from 'home/Home'
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <main className='container'>
                <Switch>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </main>
        </BrowserRouter>
    )
}

export default App
