import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import useComponent from './component'

import LearnMoreModal from 'components/Modals/LearnMoreModal'
import FarmReceiptModal from 'components/Modals/FarmReceiptModal'
import FarmContractModal from 'components/Modals/FarmContractModal'
import DocumentsReceipts from 'components/Modals/DocumentReceipts'
import RolloverModal from 'components/Modals/RolloverModal'
import PayoutModal from 'components/Modals/PayoutModal'
import SuccessModal from 'components/Modals/SuccessModal'
import ReceiptModal from 'components/Modals/ReceiptModal'

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
      case 'activity-receipts':
        return <DocumentsReceipts />
      case 'rollover':
        return <RolloverModal />
      case 'payout':
        return <PayoutModal />
      case 'successmodal':
        return <SuccessModal />
      case 'viewreceipt':
        return <ReceiptModal />
      case 'viewdocuments':
        return null
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
