import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'
import { useImmer } from 'use-immer'

const StartFarmContext = createContext({})

export const StartFarmProvider = ({ children }) => {
  const [selectedFarm, setSelectedFarm] = useState(null)
  const [isSubmitting, setSubmitting] = useState(null)
  const [isSellOn, setIsSellOn] = useState(true)
  const [otherStep, setOtherStep] = useImmer(0)
  const [acreage, setAcreage] = useState(0)
  const [order, setOrder] = useState(null)
  const [cycle, setCycle] = useState(0)
  const [step, setStep] = useImmer(0)

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

  return (
    <StartFarmContext.Provider
      value={{
        step,
        cycle,
        order,
        acreage,
        setOrder,
        isSellOn,
        setCycle,
        otherStep,
        setAcreage,
        handleNext,
        handlePrev,
        handleBack,
        setIsSellOn,
        selectedFarm,
        isSubmitting,
        setSubmitting,
        handleNextStep,
        setSelectedFarm
      }}
    >
      {children}
    </StartFarmContext.Provider>
  )
}

StartFarmProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useStartFarm = () => React.useContext(StartFarmContext)

export default useStartFarm
