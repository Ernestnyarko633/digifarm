import ReactGA from 'react-ga'

const UseGaEventsTracker = (category = 'Event Category') => {
  return (action = 'action', label = 'label') => {
    ReactGA.event(category, action, label)
  }
}

export default UseGaEventsTracker
