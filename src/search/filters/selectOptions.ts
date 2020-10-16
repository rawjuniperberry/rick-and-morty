import {TOptions} from 'components/select/Select'

export const optionsCharacter: TOptions[] = [
    {value: 'name', label: 'Name'},
    {value: 'species', label: 'Species'},
    {value: 'status', label: 'Status'},
    {value: 'type', label: 'Type'},
    {value: 'gender', label: 'Gender'},
]

export const optionsCharacterStatus: TOptions[] = [
    {value: 'alive', label: 'Alive'},
    {value: 'dead', label: 'Dead'},
    {value: 'unknown', label: 'Unknown'},
]

export const optionsCharacterGender: TOptions[] = [
    {value: 'female', label: 'Female'},
    {value: 'male', label: 'Male'},
    {value: 'genderless', label: 'Genderless'},
    {value: 'unknown', label: 'Unknown'},
]

export const optionsLocation: TOptions[] = [
    {value: 'name', label: 'Name'},
    {value: 'type', label: 'Type'},
    {value: 'dimension', label: 'Dimension'},
]

export const optionsEpisode: TOptions[] = [
    {value: 'name', label: 'Name'},
    {value: 'episode', label: 'Episode'},
]
