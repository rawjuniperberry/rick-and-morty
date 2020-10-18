import {ClickOutside} from 'components/ClickOutside'
import {ReactComponent as ArrowDown} from 'icons/arrowDown.svg'
import {ReactComponent as ArrowUp} from 'icons/arrowUp.svg'
import React, {useState} from 'react'
import styles from './Select.module.scss'

export type TOptions = {value: string, label: string}
type TProps = {options: TOptions[], value: TOptions, setValue: (x: TOptions) => void}

export function Select({options, value, setValue}: TProps) {
    const [open, setOpen] = useState(false)

    const handleOptionClick = (el: TOptions) => {
        setValue(el)
        setOpen(false)
    }

    return (
        <section className={styles.select}>
            <button className={'btnClear ' + styles.chosen} type='button' data-testid='selectValue'
                    style={{borderRadius: open ? '25px 25px 0 0' : '25px'}}
                    onClick={() => setOpen(true)}>
                <div>{value.label}</div>
                {open ? <ArrowUp/> : <ArrowDown/>}
            </button>

            {open &&
            <ClickOutside func={() => setOpen(false)}>
                <ul className={styles.options}>
                    {options.map((el, i) =>
                        <li key={i}>
                            <button className='btnClear' type='button' onClick={() => handleOptionClick(el)}>
                                {el.label}
                            </button>
                        </li>)}
                </ul>
            </ClickOutside>}
        </section>
    )
}
