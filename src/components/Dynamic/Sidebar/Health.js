import React from 'react'
import PropTypes from 'prop-types'
import CropHealthCard from '../Cards/CropHealthCard'

export default function Health({ farm, eosStats }) {
  return (
    <div>
      <CropHealthCard eosStats={eosStats} />
    </div>
  )
}

Health.propTypes = {
  farm: PropTypes.any,
  eosStats: PropTypes.any
}
