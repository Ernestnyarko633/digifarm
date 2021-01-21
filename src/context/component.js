import React, { useState, createContext, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDisclosure } from '@chakra-ui/react'
import { useImmer } from 'use-immer'

const ComponentContext = createContext({})

export const ComponentContextProvider = ({ children }) => {
  const [id, setId] = useState('')
  const [step, setStep] = useImmer(0)
  const [data, setData] = useState([])
  const [mode, setMode] = useState('')
  const [modal, setModal] = useState('')
  const [otherStep, setOtherStep] = useImmer(0)
  const [isSellOn, setIsSellOn] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleNext() {
    setStep(draft => draft + 1)
  }

  function handleBack() {
    setStep(draft => draft - 1)
  }

  function handleNextStep() {
    setOtherStep(draft => draft + 1)
  }

  function handlePrev() {
    setOtherStep(draft => draft - 1)
  }

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
        step,
        mode,
        data,
        modal,
        isOpen,
        onClose,
        isSellOn,
        otherStep,
        handleNext,
        handlePrev,
        handleBack,
        setIsSellOn,
        handleNextStep,
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
