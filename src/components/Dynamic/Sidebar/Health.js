import React from 'react'
import PropTypes from 'prop-types'

export default function Health({ farm }) {
  return (
    <div>
      <p>Crop Health</p>
    </div>
  )
}

Health.propTypes = {
  farm: PropTypes.any
}
