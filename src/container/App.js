import React from 'react'
import { BrowserRouter } from 'react-router-dom'
// import TagManager from 'react-gtm-module'
import { StartFarmContextProvider } from 'context/start-farm'
import { ComponentContextProvider } from 'context/component'
import { ExternalContextProvider } from 'context/external'
import { ModalContextProvider } from 'context/modal'
import { AuthContextProvider } from 'context/auth'
import { ApiContextProvider } from 'context/api'
import { WalletContextProvider } from 'context/wallet'
import { RolloverContextProvider } from 'context/rollover'
import { SocketContextProvider } from 'context/socket'
import Router from 'routes/register'

const App = () => {
  function FacebookPixel() {
    React.useEffect(() => {
      import('react-facebook-pixel')
        .then(x => x.default)
        .then(ReactPixel => {
          ReactPixel.init('2143795925947401')
          ReactPixel.pageView()
        })
    })
    return null
  }

  return (
    <BrowserRouter>
      <ComponentContextProvider>
        <AuthContextProvider>
          <ApiContextProvider>
            <SocketContextProvider>
              <ExternalContextProvider>
                <RolloverContextProvider>
                  <StartFarmContextProvider>
                    <ModalContextProvider>
                      <WalletContextProvider>
                        <FacebookPixel />
                        <Router />
                      </WalletContextProvider>
                    </ModalContextProvider>
                  </StartFarmContextProvider>
                </RolloverContextProvider>
              </ExternalContextProvider>
            </SocketContextProvider>
          </ApiContextProvider>
        </AuthContextProvider>
      </ComponentContextProvider>
    </BrowserRouter>
  )
}

export default App
