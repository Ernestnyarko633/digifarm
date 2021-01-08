import LearnMoreModal from 'components/Modals/LearnMoreModal'
import React from 'react'
import PropTypes from 'prop-types'
import useComponents from './ComponentContext'
import FarmReceiptModal from 'components/Modals/FarmReceiptModal'
import FarmContractModal from 'components/Modals/FarmContractModal'

const ModalsContext = React.createContext({})

export const ModalsProvider = ({ children }) => {
  const { modal } = useComponents()

  function getModals(value) {
    switch (value) {
      case 'learnmore':
        return <LearnMoreModal />
      case 'receipt':
        return <FarmReceiptModal />
      case 'contract':
        return <FarmContractModal />
      default:
        return null
    }
  }
  return (
    <ModalsContext.Provider>
      {getModals(modal)}
      {children}
    </ModalsContext.Provider>
  )
}

ModalsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
