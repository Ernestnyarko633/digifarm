import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import useComponent from './component'
import LearnMoreModal from 'components/Modals/LearnMoreModal'
import DocumentsReceipts from 'components/Modals/DocumentReceipts'
import ReceiptModal from 'components/Modals/ReceiptModal'
import ShareModal from 'components/Modals/ShareModal'
import Payment from 'components/Cards/CooperativeDashboard/Payment'

const ModalContext = React.createContext({})

export const ModalContextProvider = ({ children }) => {
  const { modal } = useComponent()

  function getModals(value) {
    switch (value) {
      case 'learnmore':
        return <LearnMoreModal />
      case 'activity-receipts':
        return <DocumentsReceipts />
      case 'viewreceipt':
        return <ReceiptModal />
      case 'viewdocuments':
        return null
      case 'share':
        return <ShareModal />
      case 'payment':
        return <Payment />
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
