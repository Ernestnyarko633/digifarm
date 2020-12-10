import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const ComponentContext = React.createContext({})

export const ComponentProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ modal, setModal ] = React.useState('')
  const [ data, setData ] = React.useState([])
  const [ id, setId ] = React.useState('')
  const [ mode, setMode ] = React.useState('')

  const handleModalClick = React.useCallback(
    (modal, data, id, mode) => {
      setModal(modal)
      setData(data)
      setId(id)
      setMode(mode)
      onOpen()
    },
    [onOpen]
  )

  return (
    <ComponentContext.Provider value={{ isOpen, onClose, modal, data, id, mode, handleModalClick }}>
      {children}
    </ComponentContext.Provider>
  )
}

ComponentProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function useComponents() {
  const context = React.useContext(ComponentContext)
  return context
}
