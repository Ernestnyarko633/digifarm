import React from 'react'
import PropTypes from 'prop-types'
import CropHealthCard from '../Cards/CropHealthCard'

export default function Health({ farm, eosStats, _error }) {
  // eslint-disable-next-line no-console
  console.log('checking', eosStats)
  return (
    <div>
      {!_error &&
        eosStats?.map(stat => (
          <CropHealthCard
            key={stat?.date}
            date={stat?.date}
            eosStat={stat}
            _error={_error}
          />
        ))}
    </div>
  )
}

Health.propTypes = {
  farm: PropTypes.any,
  eosStats: PropTypes.any,
  _error: PropTypes.any
}
