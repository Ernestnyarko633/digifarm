import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { Status } from 'helpers/misc'
const WalletContext = createContext()

export const WalletContextProvider = ({ children }) => {
  const totalAmount = (__activity = {}, tasks = [], scheduledTasks = []) => {
    let totalAmount = 0
    let tempTasks = tasks?.filter(_task => _task.activity === __activity._id)
    if (tempTasks) {
      tempTasks.forEach(_task => {
        totalAmount = totalAmount + _task?.budget
      })
    }
    if (scheduledTasks) {
      let currentExpense = 0
      let _tasks = scheduledTasks.filter(
        completedTask =>
          __activity._id === completedTask?.task?.activity &&
          completedTask.status === Status.COMPLETED
      )

      if (_tasks) {
        _tasks.forEach(_task => {
          currentExpense = currentExpense + _task?.task?.budget
        })
      }

      return {
        total: currentExpense ? currentExpense : totalAmount,
        state: currentExpense ? true : false
      }
    }
  }

  const farmExpense = (activities, tasks, scheduledTasks) => {
    let totalExpense = 0
    const process = value =>
      value?.forEach(val => {
        const bool = totalAmount(val, tasks, scheduledTasks)?.state

        if (bool) {
          totalExpense =
            totalExpense + totalAmount(val, tasks, scheduledTasks)?.total
        }
      })
    if (activities) {
      process(activities)
    }

    return totalExpense
  }

  return (
    <WalletContext.Provider
      value={{
        totalAmount,
        farmExpense
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

WalletContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useWallet = () => useContext(WalletContext)

export default useWallet
