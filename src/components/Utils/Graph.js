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
  totalAmount,
  farm
}) {
  const [data, setData] = React.useState([])
  const [animation, setAnimation] = React.useState(true)
  React.useEffect(() => {
    let array = []
    if (activities && tasks) {
      activities.forEach(activity => {
        const { state, total } = totalAmount(activity, tasks, scheduledTasks)
        array.push({
          name: activity?.title,
          amount: state ? farm?.order?.acreage * total : 0
        })
      })
    }
    setData(array)
  }, [activities, tasks, scheduledTasks, totalAmount, farm?.order?.acreage])

  const mapKey = i => i

  // const Tick = ({
  //   payload: { value },
  //   verticalAnchor,
  //   visibleTicksCount,
  //   ...rest
  // }) => (
  //   <text {...rest} className='bar-chart-tick' dy={12}>
  //     {value}
  //   </text>
  // )

  // Tick.propTypes = {
  //   payload: PropTypes.any,
  //   verticalAnchor: PropTypes.any,
  //   visibleTicksCount: PropTypes.any
  // }
  return (
    <ResponsiveContainer width='100%' height={300}>
      <ComposedChart
        style={{ backgroundColor: 'white' }}
        margin={{ right: 60 }}
        data={data}
      >
        <XAxis
          dataKey='name'
          isAnimationActive={animation}
          onAnimationEnd={() => setAnimation(false)}
          scale='auto'
          fontSize={8}
        />
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
  farm: PropTypes.any,
  scheduledTasks: PropTypes.array,
  tasks: PropTypes.array,
  totalAmount: PropTypes.func.isRequired
}
