/* eslint-disable no-console */
import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useImmer } from 'use-immer'
const RolloverContext = createContext()

export const RolloverContextProvider = ({ children }) => {
  const [step, setStep] = useImmer(0)
  const [bigStepper, setBigStepper] = useImmer(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedWallets, setSelectedWallets] = useState([])
  const handleNext = () => setStep(draft => draft + 1)

  useEffect(() => {
    let _total = 0
    let mounted = true
    if (selectedWallets && mounted) {
      const uniqueAddition = wallet => {
        const temp = selectedWallets.find(_wallet => wallet.id === _wallet.id)

        if (temp) return false

        return true
      }
      const calcTotal = () =>
        selectedWallets.forEach(wallet =>
          uniqueAddition(wallet)
            ? (_total = _total + 0)
            : (_total = _total + wallet.amount)
        )
      calcTotal()
      setTotal(_total)
    }
  }, [selectedWallets, total])

  return (
    <RolloverContext.Provider
      value={{
        step,
        error,
        setError,
        setStep,
        loading,
        setLoading,
        bigStepper,
        setBigStepper,
        total,
        handleNext,
        selectedWallets,
        setSelectedWallets
      }}
    >
      {children}
    </RolloverContext.Provider>
  )
}

RolloverContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useRollover = () => useContext(RolloverContext)

export default useRollover
