import React from 'react'
import {Link} from 'react-router-dom'
import styles from 'components/tiles/characterTile/CharacterTile.module.scss'

type TProps = {character: TCharacter}

export function CharacterTile({character}: TProps) {
    const {id, gender, name, image, status} = character

    return (
        <Link to={'/show/character/' + id} className={styles.characterTile}>
            <img src={image} alt={'image of ' + name}/>

            <div className={styles.content}>
                <h3>{name}</h3>
                <div>{gender}</div>
                <div>{status}</div>
            </div>
        </Link>
    )
}
