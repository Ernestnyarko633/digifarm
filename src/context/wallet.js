import React, { createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import { Status } from 'helpers/misc'
const WalletContext = createContext()
export const WalletContextProvider = ({ children }) => {
  const totalAmount = (activity = {}, tasks = [], scheduledTasks = []) => {
    let totalAmount = 0
    let activity_tasks = tasks?.filter(task => task.activity === activity?._id)
    if (activity_tasks.length) {
      const { budget } = activity_tasks.reduce((a, b) => ({
        budget: a.budget + b.budget
      }))
      totalAmount = budget
    }
    if (scheduledTasks?.length) {
      let currentExpense = 0
      let completed_tasks = scheduledTasks.filter(
        completedTask =>
          activity?._id === completedTask?.task?.activity &&
          completedTask.status === Status.COMPLETED
      )
      if (completed_tasks?.length) {
        const { total } = completed_tasks.reduce((a, b) => ({
          total: a?.task?.budget + b?.task?.budget
        }))
        currentExpense = total
      }
      return {
        total: currentExpense ? currentExpense : totalAmount,
        state: currentExpense ? true : false
      }
    }
    return {
      total: totalAmount,
      state: false
    }
  }
  const farmExpense = (activities = [], tasks = [], scheduledTasks = []) => {
    let totalExpense = 0
    const process = array_of_activities =>
      array_of_activities?.forEach(activity => {
        const { state, total } = totalAmount(activity, tasks, scheduledTasks)
        if (state) {
          totalExpense = totalExpense + total
        }
      })
    if (activities?.length) {
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
