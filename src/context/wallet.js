import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { Status } from 'helpers/misc'
const WalletContext = createContext()

export const WalletContextProvider = ({ children }) => {
  const totalAmount = (activity = {}, tasks = [], scheduledTasks = []) => {
    let totalAmount = 0
    let activity_tasks = tasks?.filter(task => task.activity === activity._id)
    if (activity_tasks) {
      activity_tasks.forEach(task => {
        totalAmount = totalAmount + task?.budget
      })
    }
    if (scheduledTasks) {
      let currentExpense = 0
      let completed_scheduled_tasks = scheduledTasks.filter(
        scheduled_task =>
          activity._id === scheduled_task?.task?.activity &&
          scheduled_task.status === Status.COMPLETED
      )

      if (completed_scheduled_tasks) {
        completed_scheduled_tasks.forEach(completed_task => {
          currentExpense = currentExpense + completed_task?.task?.budget
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
