import React, {ReactNode, useEffect, useRef} from 'react'

const useClickOutside = (ref: React.MutableRefObject<any>, func: (target: HTMLElement) => void) => {

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target))
            func(event.target as HTMLElement)
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, {passive: true})
        return () => document.removeEventListener('click', handleClickOutside)
    })
}

export function ClickOutside({children, func}: {children: ReactNode, func: (target: HTMLElement) => void}) {
    const wrapperRef = useRef(null)
    useClickOutside(wrapperRef, func)

    return <div ref={wrapperRef}>{children}</div>
}
