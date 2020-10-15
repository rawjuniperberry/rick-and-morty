import {ReactComponent as ArrowLeft} from 'icons/arrowLeft.svg'
import {ReactComponent as ArrowRight} from 'icons/arrowRight.svg'
import React from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import styles from './Pagination.module.scss'

type TProps = {info: TInfo}

export function Pagination({info: {pages}}: TProps) {
    const history = useHistory()
    const {search} = useLocation()

    const url = new URLSearchParams(search)
    const currentPage = url.get('page') ? Number(url.get('page')) : 1

    const changePage = (page: number) => {
        url.set('page', String(page))

        history.push('?' + url.toString())
        window.scroll(0, 0)
    }

    return (
        <section className={styles.pagination}>
            <div className={styles.sites}>
                <button className='btn'
                        disabled={currentPage <= 1}
                        onClick={() => changePage(1)}>
                    1
                </button>

                <div className={styles.navigation}>
                    <button className='btn'
                            disabled={currentPage <= 1}
                            onClick={() => changePage(currentPage - 1)}>
                        <ArrowLeft/>
                    </button>

                    <div className={styles.currentPage}>{currentPage}</div>

                    <button className='btn'
                            disabled={currentPage >= pages}
                            onClick={() => changePage(currentPage + 1)}>
                        <ArrowRight/>
                    </button>
                </div>

                <button className='btn'
                        disabled={currentPage >= pages}
                        onClick={() => changePage(pages)}>
                    {pages}
                </button>
            </div>
        </section>
    )
}
