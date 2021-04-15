import React from 'react'
import PropTypes from 'prop-types'
import AccountSettings from './AccountSettings'
import Profile from './Profile'
import Security from './Security'

const components = {
  compA: Profile,
  compB: AccountSettings,
  compD: Security
}

const DynamicProfile = ({ page }) => {
  const SelectedPage = components[page]

  return <SelectedPage />
}

DynamicProfile.propTypes = {
  page: PropTypes.any
}

export default DynamicProfile
