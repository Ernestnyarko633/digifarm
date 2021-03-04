import React from 'react'
import PropTypes from 'prop-types'
import CropHealthCard from '../Cards/CropHealthCard'

export default function Health({ farm, eosStats, _error }) {
  return (
    <div>
      {!_error && <CropHealthCard eosStats={eosStats} _error={_error} />}
    </div>
  )
}

Health.propTypes = {
  farm: PropTypes.any,
  eosStats: PropTypes.any,
  _error: PropTypes.any
}
