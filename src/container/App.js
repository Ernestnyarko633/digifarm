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
import { SocketContextProvider } from 'context/socket'
import useInterval from 'hooks/useInterval'
import Router from 'routes/Router'
import FacebookPixel from 'hooks/FacebookPixel'

const App = () => {
  //remove "feeds" cache
  useInterval(() => sessionStorage.removeItem('feeds'), 300000)

  return (
    <BrowserRouter>
      <ComponentContextProvider>
        <AuthContextProvider>
          <ApiContextProvider>
            <SocketContextProvider>
              <ExternalContextProvider>
                <StartFarmContextProvider>
                  <ModalContextProvider>
                    <WalletContextProvider>
                      <FacebookPixel />
                      <Router />
                    </WalletContextProvider>
                  </ModalContextProvider>
                </StartFarmContextProvider>
              </ExternalContextProvider>
            </SocketContextProvider>
          </ApiContextProvider>
        </AuthContextProvider>
      </ComponentContextProvider>
    </BrowserRouter>
  )
}

export default App
