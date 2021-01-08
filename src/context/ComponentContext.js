import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { useImmer } from 'use-immer'
import PropTypes from 'prop-types'

const ComponentContext = React.createContext({})

export const ComponentProvider = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ modal, setModal ] = React.useState('')
  const [ data, setData ] = React.useState([])
  const [ id, setId ] = React.useState('')
  const [ mode, setMode ] = React.useState('')
  const [ step, setStep ] = useImmer(0)
  const [ otherStep, setOtherStep ] = useImmer(0)

  function handleNext() {
    setStep((draft) => draft + 1)
  }

  function handleBack() {
    setStep((draft) => draft - 1)
  }

  function handleNextStep() {
    setOtherStep((draft) => draft + 1)
  }

  function handlePrev() {
    setOtherStep((draft) => draft - 1)
  }

  const handleModalClick = React.useCallback(
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
    <ComponentContext.Provider value={{
        isOpen,
        onClose,
        modal,
        data,
        id,
        mode,
        handleModalClick,
        step,
        handleNext,
        handleBack,
        otherStep,
        handleNextStep,
        handlePrev,
      }}>
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
