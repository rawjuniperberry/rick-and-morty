import {render} from '@testing-library/react'
import React from 'react'
import {ContentType} from 'service/contentParam'
import {ShowTiles} from './ShowTiles'
import {BrowserRouter} from 'react-router-dom'

const results: TCharacter[] = [
    {
        created: '2017-11-04T18:48:46.250Z',
        episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
        gender: 'Male',
        id: 1,
        image: '',
        location: {name: 'Earth (Replacement Dimension)', url: ''},
        name: 'Rick Sanchez',
        origin: {name: 'Earth (C-137)', url: ''},
        species: 'Human',
        status: 'Alive',
        type: '',
        url: '',
    },
    {
        created: '2017-11-04T18:50:21.651Z',
        episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
        gender: 'Male',
        id: 2,
        image: '',
        location: {name: 'Earth (Replacement Dimension)', url: ''},
        name: 'Morty Smith',
        origin: {name: 'Earth (C-137)', url: ''},
        species: 'Human',
        status: 'Alive',
        type: '',
        url: '',
    },
]

describe('ShowTiles component', () => {

    it('shows all CharacterTiles', () => {
        const {getAllByTestId} = render(
            <BrowserRouter>
                <ShowTiles contentType={ContentType.characters} results={results} err={null}/>
            </BrowserRouter>,
        )

        const tiles = getAllByTestId('characterTile')

        expect(tiles.length).toBe(2)

        expect(tiles[0]).toHaveTextContent('Rick Sanchez')
        expect(tiles[1]).toHaveTextContent('Morty Smith')
    })
})
