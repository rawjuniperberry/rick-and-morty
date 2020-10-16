import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {CharacterShow} from 'sites/show/character/CharacterShow'
import {EpisodeShow} from 'sites/show/episode/EpisodeShow'
import {LocationShow} from 'sites/show/location/LocationShow'
import styles from './Show.module.scss'

export function Show() {
    return (
        <div className={styles.show}>
            <Switch>
                <Route path='/show/character/:id' component={CharacterShow}/>
                <Route path='/show/location/:id' component={LocationShow}/>
                <Route path='/show/episode/:id' component={EpisodeShow}/>
            </Switch>
        </div>
    )
}
