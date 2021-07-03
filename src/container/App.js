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
import Router from 'routes/register'

// const tagManagerArgs = {
//   gtmId: process.env.REACT_APP_GTM
// }

const App = () => {
  // React.useEffect(() => {
  //   TagManager.initialize(tagManagerArgs)
  // }, [])

  return (
    <BrowserRouter>
      <ComponentContextProvider>
        <RolloverContextProvider>
          <ApiContextProvider>
            <ExternalContextProvider>
              <AuthContextProvider>
                <StartFarmContextProvider>
                  <ModalContextProvider>
                    <WalletContextProvider>
                      <Router />
                    </WalletContextProvider>
                  </ModalContextProvider>
                </StartFarmContextProvider>
              </AuthContextProvider>
            </ExternalContextProvider>
          </ApiContextProvider>
        </RolloverContextProvider>
      </ComponentContextProvider>
    </BrowserRouter>
  )
}

export default App
