import styles from 'components/tiles/characterTile/CharacterTile.module.scss'
import React from 'react'
import {Link} from 'react-router-dom'

type TProps = {character: TCharacter}

export function CharacterTile({character}: TProps) {
    const {id, gender, name, image, status} = character

    return (
        <Link to={'/show/character/' + id} className={styles.characterTile} data-testid='characterTile'>
            <img src={image} alt={'image of ' + name}/>

            <div className={styles.content}>
                <h3>{name}</h3>
                <div className={styles.property}>
                    <div>Status:</div>
                    <div>{status}</div>
                </div>
                <div className={styles.property}>
                    <div>Gender:</div>
                    <div>{gender}</div>
                </div>
            </div>
        </Link>
    )
}
