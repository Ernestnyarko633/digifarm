import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import useComponent from './component'

import LearnMoreModal from 'components/Modals/LearnMoreModal'
import FarmReceiptModal from 'components/Modals/FarmReceiptModal'
import FarmContractModal from 'components/Modals/FarmContract'

const ModalContext = React.createContext({})

export const ModalContextProvider = ({ children }) => {
  const { modal } = useComponent()

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
    <ModalContext.Provider value={{}}>
      {getModals(modal)}
      {children}
    </ModalContext.Provider>
  )
}

ModalContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useModal = () => useContext(ModalContext)

export default useModal
