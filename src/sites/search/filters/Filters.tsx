import {Select, TOptions} from 'components/select/Select'
import {ReactComponent as Close} from 'icons/close.svg'
import React, {FormEvent, useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {ContentType} from 'service/contentParam'
import styles from 'sites/search/filters/Filters.module.scss'
import {
    optionsCharacter,
    optionsCharacterGender,
    optionsCharacterStatus,
    optionsEpisode,
    optionsLocation,
} from 'sites/search/filters/selectOptions'

type TProps = {contentType: ContentType}
const initSearchText = {value: '', err: null}

export function Filters({contentType}: TProps) {
    const [selectedTypeOfSearch, setSelectedTypeOfSearch] = useState<TOptions>(optionsCharacter[0])
    const [options, setOptions] = useState<TOptions[]>(optionsCharacter)
    const [searchText, setSearchText] = useState<{value: string, err: TErr}>(initSearchText)
    const [searchSelect, setSearchSelect] = useState<(TOptions & {options: TOptions[]}) | null>(null)

    const {search} = useLocation()
    const [paramsStr, setParamsStr] = useState<string>(new URLSearchParams(search).toString())

    useEffect(() => {
        setSearchText(initSearchText)
        setParamsStr('')

        switch (contentType) {
            case ContentType.characters:
                setSelectedTypeOfSearch(optionsCharacter[0])
                setOptions(optionsCharacter)
                return

            case ContentType.locations:
                setSelectedTypeOfSearch(optionsLocation[0])
                setOptions(optionsLocation)
                return

            case ContentType.episodes:
                setSelectedTypeOfSearch(optionsEpisode[0])
                setOptions(optionsEpisode)
                return
        }
    }, [contentType])

    useEffect(() => {
        if (contentType !== ContentType.characters) return setSearchSelect(null)

        if (selectedTypeOfSearch === optionsCharacter[2])
            return setSearchSelect({...optionsCharacterStatus[0], options: optionsCharacterStatus})

        if (selectedTypeOfSearch === optionsCharacter[4])
            return setSearchSelect({...optionsCharacterGender[0], options: optionsCharacterGender})

        setSearchSelect(null)
    }, [contentType, selectedTypeOfSearch])

    const handleSetFilter = (e: FormEvent) => {
        e.preventDefault()

        if (!searchSelect && !searchText.value)
            return setSearchText({...searchText, err: 'Please enter at least 1 character'})

        const urlSearchParams = new URLSearchParams(paramsStr)
        urlSearchParams.set(selectedTypeOfSearch.value, searchSelect ? searchSelect.value : searchText.value)

        setParamsStr(urlSearchParams.toString())
    }

    const deleteParam = (s: string) => {
        const urlSearchParams = new URLSearchParams(paramsStr)
        urlSearchParams.delete(s)

        setParamsStr(urlSearchParams.toString())
    }

    return (
        <section className={styles.filters}>
            <form onSubmit={handleSetFilter}>
                <div className={styles.setFilters}>
                    <div className={styles.typeOfSearch}>
                        <Select options={options} value={selectedTypeOfSearch}
                                setValue={x => setSelectedTypeOfSearch(x)}/>
                    </div>
                    <div className={styles.search}>
                        {searchSelect ?
                            <Select options={searchSelect.options}
                                    value={searchSelect}
                                    setValue={x => setSearchSelect({...searchSelect, ...x})}/>
                            :
                            <input className='input' type="text" maxLength={100}
                                   value={searchText.value}
                                   onChange={({target}) => setSearchText({value: target.value, err: null})}/>}
                    </div>
                    <button type='submit' className='btn'>Set filter</button>
                </div>
                <div className={styles.error}>{!searchSelect && searchText.err}</div>
            </form>

            <section className={styles.showFilters}>
                {Array.from(new URLSearchParams(paramsStr)).map(([paramName, paramValue], idx) =>
                    <div key={idx}>
                        <div>{paramName}: {paramValue}</div>
                        <button className='btnClear' onClick={() => deleteParam(paramName)}><Close/></button>
                    </div>)}
            </section>

            <div className={styles.showResults}>
                <Link to={`/search/${contentType}?${paramsStr}`}>Show results</Link>
            </div>
        </section>
    )
}
