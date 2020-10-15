import React from 'react'
import styles from 'search/showTiles/locationTile/LocationTile.module.scss'

type TProps = {location: TLocation}

export function LocationTile({location}: TProps) {
    const {name} = location

    return (
        <section className={styles.locationTile}>
            <div className={styles.content}>
                <h3>{name}</h3>
            </div>
        </section>
    )
}
