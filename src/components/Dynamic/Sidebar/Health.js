import React from 'react'
import PropTypes from 'prop-types'
import CropHealthCard from '../Cards/CropHealthCard'

export default function Health({ farm }) {
  return (
    <div>
      <CropHealthCard />
    </div>
  )
}

Health.propTypes = {
  farm: PropTypes.any
}
