import PropTypes from 'prop-types'
import React from 'react'

const StartFarmContext = React.createContext({})

export const StartFarmProvider = ({ children }) => {
  return <StartFarmContext.Provider value={{}}>{children}</StartFarmContext.Provider>
}

StartFarmProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default function useStartFarm() {
  const context = React.useContext(StartFarmContext)
  return context
}
