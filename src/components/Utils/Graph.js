import React from 'react'

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip
} from 'recharts'

import PropTypes from 'prop-types'

// const data = [
//   {
//     name: 'Page A',
//     uv: 590
//   },
//   {
//     name: 'Page B',
//     uv: 868
//   },
//   {
//     name: 'Page C',
//     uv: 1397
//   },
//   {
//     name: 'Page D',
//     uv: 1480
//   },
//   {
//     name: 'Page E',
//     uv: 1520
//   },
//   {
//     name: 'Page F',
//     uv: 1400
//   }
// ]

export default function Graph({ activities, tasks, scheduledTasks, farm }) {
  const [data, setData] = React.useState([])

  const totalAmount = React.useCallback(
    __activity => {
      let totalAmount = 0
      let tempTasks = tasks?.filter(
        _task => _task.activity._id === __activity._id
      )
      if (tempTasks) {
        tempTasks.forEach(_task => {
          totalAmount = totalAmount + _task?.budget
        })
      }
      if (scheduledTasks) {
        let currentExpense = 0
        let _tasks = scheduledTasks.filter(
          completedTask =>
            __activity._id === completedTask?.taskId?.activity?._id &&
            completedTask.status === 'COMPLETED'
        )

        if (_tasks) {
          _tasks.forEach(_task => {
            currentExpense = currentExpense + _task?.taskId?.budget
          })
        }

        return {
          total: currentExpense ? currentExpense : totalAmount,
          state: currentExpense ? true : false
        }
      }
    },
    [tasks, scheduledTasks]
  )
  React.useEffect(() => {
    let array = []
    if (activities && tasks) {
      activities.forEach(activity => {
        array.push({
          name: activity?.name,
          amount: totalAmount(activity).state ? totalAmount(activity).total : 0
        })
      })
    }
    setData(array)
  }, [activities, tasks, scheduledTasks, totalAmount])

  const mapKey = index => {
    const _index = index
    return _index
  }

  return (
    <ResponsiveContainer width='100%' height={300}>
      <ComposedChart
        style={{ backgroundColor: 'white' }}
        margin={{ right: 60 }}
        data={data}
      >
        <XAxis dataKey='name' scale='auto' fontSize={7} />
        <YAxis dataKey='amount' fontSize={7} />
        <Tooltip />
        <Bar
          dataKey='amount'
          barSize={6}
          maxBarSize={10}
          fill='#9b9b9b'
          radius={[20, 20, 20, 20]}
        >
          {data.map((entry, index) => (
            <Cell
              key={mapKey(index)}
              cursor='pointer'
              //   fill={entry.name === 'Land Preparation' ? '#ff0000' : '#00ff00'}
            />
          ))}
        </Bar>
      </ComposedChart>
    </ResponsiveContainer>
  )
}

Graph.propTypes = {
  activities: PropTypes.array,
  tasks: PropTypes.array,
  scheduledTasks: PropTypes.array,
  farm: PropTypes.object.isRequired
}
