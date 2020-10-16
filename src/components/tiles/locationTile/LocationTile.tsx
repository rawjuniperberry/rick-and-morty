import React from 'react'
import styles from 'components/tiles/locationTile/LocationTile.module.scss'
import {Link} from 'react-router-dom'

type TProps = {location: TLocation}

export function LocationTile({location}: TProps) {
    const {id, name} = location

    return (
        <Link to={'/show/location/' + id} className={styles.locationTile}>
            <div className={styles.content}>
                <h3>{name}</h3>
            </div>
        </Link>
    )
}
