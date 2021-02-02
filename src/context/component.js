import React, { useState, createContext, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDisclosure } from '@chakra-ui/react'

const ComponentContext = createContext({})

export const ComponentContextProvider = ({ children }) => {
  const [id, setId] = useState('')
  const [data, setData] = useState([])
  const [mode, setMode] = useState('')
  const [modal, setModal] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleModalClick = useCallback(
    (_modal, _data, _id, _mode) => {
      setModal(_modal)
      setData(_data)
      setId(_id)
      setMode(_mode)
      onOpen()
    },
    [onOpen]
  )

  return (
    <ComponentContext.Provider
      value={{
        id,
        mode,
        data,
        modal,
        isOpen,
        onClose,
        handleModalClick
      }}
    >
      {children}
    </ComponentContext.Provider>
  )
}

ComponentContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useComponent = () => useContext(ComponentContext)

export default useComponent
