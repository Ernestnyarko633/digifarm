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

export default function Graph({
  activities,
  tasks,
  scheduledTasks,
  farm,
  totalAmount
}) {
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    let array = []
    if (activities && tasks) {
      activities.forEach(activity => {
        array.push({
          name: activity?.title,
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
    <ResponsiveContainer width='200%' height={300}>
      <ComposedChart
        style={{ backgroundColor: 'white' }}
        margin={{ right: 60 }}
        data={data}
      >
        <XAxis dataKey='name' scale='auto' fontSize={12} />
        <YAxis dataKey='amount' fontSize={12} />
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
  farm: PropTypes.object.isRequired,
  totalAmount: PropTypes.func.isRequired
}
