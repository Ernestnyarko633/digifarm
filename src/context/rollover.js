/* eslint-disable no-console */
import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useToast } from '@chakra-ui/react'
import useApi from 'context/api'
import useAuth from 'context/auth'
import { useImmer } from 'use-immer'
const RolloverContext = createContext()

export const RolloverContextProvider = ({ children }) => {
  const [step, setStep] = useImmer(0)
  const [bigStepper, setBigStepper] = useImmer(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedWallets, setSelectedWallets] = useState([])
  const [type, setType] = useState(null)
  const [ratings, setRatings] = useState(null)
  const [comment, setComment] = useState('')
  const [isSubmitting, setSubmit] = useState(false)
  const handleNext = () => setStep(draft => draft + 1)

  const { isAuthenticated, setSession } = useAuth()

  const { user } = isAuthenticated()

  let toast = useToast()

  const { submitPayout } = useApi()

  useEffect(() => {
    let mounted = true

    if (type === 'asRollover' && mounted) {
      setBigStepper(p => p * 0)
    } else if (type === 'asPayout' && mounted) {
      setStep(p => p * 0)
    }

    return () => (mounted = false)
  }, [setBigStepper, setStep, type])

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

  const handlePayout = async () => {
    try {
      setSubmit(true)

      const data = {
        type: 'PAYOUT',
        digitalfarmer: user?._id,
        cost: total,
        comment: comment,
        ratings: ratings
      }
      if (!data.comment) delete data.comment
      if (data.ratings === null) delete data.ratings

      await submitPayout(data)

      toast({
        duration: 9000,
        isClosable: true,
        status: 'success',
        position: 'top-right',
        title: 'Payout Submitted.',
        description: 'Payout submitted successfully'
      })
      setBigStepper(p => p + 1)
    } catch (error) {
      if (error) {
        if ([401, 403].includes(error.status)) {
          setSession(false)
        } else {
          toast({
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
            title: 'An error occurred.',
            description:
              (error?.data?.message ||
                error?.message ||
                'Unknown error occurred') + '.'
          })
        }
      } else {
        toast({
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
          title: 'An error occurred.',
          description: 'Unexpected network error.'
        })
      }
    } finally {
      setSubmit(false)
    }
  }

  return (
    <RolloverContext.Provider
      value={{
        step,
        error,
        setType,
        type,
        setError,
        setStep,
        loading,
        setLoading,
        comment,
        setComment,
        handlePayout,
        bigStepper,
        isSubmitting,
        setBigStepper,
        total,
        handleNext,
        selectedWallets,
        setSelectedWallets,
        setRatings,
        ratings
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
