import {ClickOutside} from 'components/ClickOutside'
import {ReactComponent as Close} from 'icons/close.svg'
import {ReactComponent as Person} from 'icons/person.svg'
import React from 'react'
import {useDispatch} from 'react-redux'
import styles from 'sites/layout/auth/Auth.module.scss'
import {signIn, TAuthSignInPayload} from './authSlice'

type TProps = {closeFn: () => void}

const rick: TAuthSignInPayload = {
    name: 'Rick',
    uuid: '6a550eac-c30c-4a40-a3c5-e04b3d0c903f',
    JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTU1MGVhYy1jMzBjLTRhNDAtYTNjNS1lMDRiM2QwYzkwM2YiLCJuYW1lIjoiUmljayIsImlhdCI6MTUxNjIzOTAyMn0.-KjWA-9roMTMzUi_UKyHuyjJEW9v1Du7TJHH7VPyh6Y',
}
const morty: TAuthSignInPayload = {
    name: 'Morty',
    uuid: '80d78516-80cb-4b9a-8045-c9a9b37c0b8f',
    JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MGQ3ODUxNi04MGNiLTRiOWEtODA0NS1jOWE5YjM3YzBiOGYiLCJuYW1lIjoiTW9ydHkiLCJpYXQiOjE1MTYyMzkwMjJ9.FWYg10lE6vpOCA97eDrGo1-h_gtgtDkl6zUTisRgfwU',
}

export function Auth({closeFn}: TProps) {
    const dispatch = useDispatch()

    const handleSignIn = (payload: TAuthSignInPayload) => {
        dispatch(signIn(payload))
        closeFn()
    }

    return (
        <section className={styles.overlay}>
            <ClickOutside func={closeFn}>
                <section className={styles.wrapper}>
                    <div className={styles.header}>
                        <h2>Select account</h2>
                        <button className='btnClear' onClick={closeFn}>
                            <Close/>
                        </button>
                    </div>

                    <div className={styles.users}>
                        <button className='btnClear' onClick={() => handleSignIn(rick)}>
                            <Person/>
                            <div>Rick</div>
                        </button>
                        <button className='btnClear' onClick={() => handleSignIn(morty)}>
                            <Person/>
                            <div>Morty</div>
                        </button>
                    </div>
                </section>
            </ClickOutside>
        </section>
    )
}
