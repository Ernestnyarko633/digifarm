import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import useComponent from './component'

import LearnMoreModal from 'components/Modals/LearnMoreModal'
import DocumentsReceipts from 'components/Modals/DocumentReceipts'
import RolloverModal from 'components/Modals/RolloverModal'
import PayoutModal from 'components/Modals/PayoutModal'
import SuccessModal from 'components/Modals/SuccessModal'
import ReceiptModal from 'components/Modals/ReceiptModal'
import ShareModal from 'components/Modals/ShareModal'

const ModalContext = React.createContext({})

export const ModalContextProvider = ({ children }) => {
  const { modal } = useComponent()

  function getModals(value) {
    switch (value) {
      case 'learnmore':
        return <LearnMoreModal />
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
      case 'share':
        return <ShareModal />
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
