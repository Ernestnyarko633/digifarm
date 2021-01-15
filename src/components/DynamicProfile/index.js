import PropTypes from 'prop-types'

import AccountSettings from './AccountSettings'
import Notifications from './Notifications'
import PrivacyAndData from './PrivacyAndData'
import Profile from './Profile'
import Security from './Security'

const components = {
  compA: Profile,
  compB: AccountSettings,
  compC: Notifications,
  compD: Security,
  compE: PrivacyAndData
}

const DynamicProfile = ({ page }) => {
  const SelectedPage = components[page]
  // eslint-disable-next-line react/react-in-jsx-scope
  return <SelectedPage />
}

DynamicProfile.propTypes = {
  page: PropTypes.any
}

export default DynamicProfile
