import {fireEvent, render} from '@testing-library/react'
import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {ContentType} from 'service/contentParam'
import {Filters} from './Filters'

describe('Filters component', () => {

    it('can filter location', () => {
        const {getByTestId} = render(
            <BrowserRouter>
                <Filters contentType={ContentType.locations}/>
            </BrowserRouter>,
        )

        expect(getByTestId('selectValue')).toHaveTextContent('Name')

        const input = getByTestId('inputFilterPhrase') as HTMLInputElement
        expect(input.value).toBe('')

        fireEvent.change(input, {target: {value: 'Pluto'}})
        expect(input.value).toBe('Pluto')

        fireEvent.click(getByTestId('buttonSetFilter'))

        expect(getByTestId('filterParam')).toHaveTextContent('name: Pluto')
        expect(getByTestId('showResults')).toHaveAttribute('href', '/search/location?name=Pluto')

        fireEvent.click(getByTestId('removeFilterParam'))
        expect(getByTestId('showResults')).toHaveAttribute('href', '/search/location')
    })
})
