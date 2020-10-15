import React from 'react'
import styles from 'search/showTiles/characterTile/CharacterTile.module.scss'

type TProps = {character: TCharacter}

export function CharacterTile({character}: TProps) {
    const {gender, name, image, status} = character

    return (
        <section className={styles.characterTile}>
            <img src={image} alt={'image of ' + name}/>

            <div className={styles.content}>
                <h3>{name}</h3>
                <div>{gender}</div>
                <div>{status}</div>
            </div>

        </section>
    )
}
