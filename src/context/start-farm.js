import React from 'react'
import PropTypes from 'prop-types'

const StartFarmContext = React.createContext({})

export const StartFarmProvider = ({ children }) => {
  const [selectedFarm, setSelectedFarm] = React.useState(null)

  return (
    <StartFarmContext.Provider value={{ selectedFarm, setSelectedFarm }}>
      {children}
    </StartFarmContext.Provider>
  )
}

StartFarmProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useStartFarm = () => React.useContext(StartFarmContext)

export default useStartFarm
