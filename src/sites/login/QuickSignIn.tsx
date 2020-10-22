import {ClickOutside} from 'components/ClickOutside'
import {ReactComponent as Close} from 'icons/close.svg'
import {ReactComponent as Person} from 'icons/person.svg'
import React from 'react'
import {useDispatch} from 'react-redux'
import {signIn, TAuthSignInPayload} from 'sites/login/authSlice'
import {Morty, Rick} from 'sites/login/credentials'
import styled from 'styled-components'

type TProps = {closeFn: () => void}

const Overlay = styled.section`
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 100;
    background-color: hsla(0, 0%, 0%, 0.5);
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.section`
  background-color: var(--background);
  box-sizing: border-box;
  padding: 0 20px 20px 20px;
  overflow-y: auto;
  border-radius: 10px;
  width: 100%;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-left: 10px;

    svg {
      width: 30px;
      height: 30px;
    }
  }
`

const Users = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: khaki;
    margin: 5px 0;
    width: 150px;
    border-radius: 10px;
    
    svg {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
`

export function QuickSignIn({closeFn}: TProps) {
    const dispatch = useDispatch()

    const handleSignIn = (payload: TAuthSignInPayload) => {
        dispatch(signIn(payload))
        closeFn()
    }

    return (
        <Overlay>
            <ClickOutside func={closeFn}>
                <Wrapper>
                    <Header>
                        <h2>Select account</h2>
                        <button className='btnClear' onClick={closeFn}>
                            <Close/>
                        </button>
                    </Header>

                    <Users>
                        <button className='btnClear' onClick={() => handleSignIn(Rick.payload)}>
                            <Person/>
                            <div>Rick</div>
                        </button>
                        <button className='btnClear' onClick={() => handleSignIn(Morty.payload)}>
                            <Person/>
                            <div>Morty</div>
                        </button>
                    </Users>
                </Wrapper>
            </ClickOutside>
        </Overlay>
    )
}
