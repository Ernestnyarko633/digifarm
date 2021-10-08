import React from 'react'
import PropTypes from 'prop-types'
import Confetti from 'react-confetti'
import { Box } from '@chakra-ui/react'
import useWindowSize from 'react-use/lib/useWindowSize'

import Header from 'container/Header'

import useStartFarm from 'context/start-farm'

import CropSelection from 'components/StartFarmProcess/CropSelection'
import OtherSteps from 'components/StartFarmProcess/OtherSteps'
import ReloadPage from 'components/Reload'

const Individual = ({ location: { state }, history }) => {
  document.title = 'Individual | Start Farm'
  const [showConfetti, setShowConfetti] = React.useState(true)

  const { step, setStep, setOtherStep } = useStartFarm()
  const { otherStep } = useStartFarm()

  const { width, height } = useWindowSize()

  React.useEffect(() => {
    let mounted = true
    if (mounted && state?.step) {
      setStep(x => x + 1)
      setOtherStep(x => x + 4)
    }

    return () => (mounted = false)
  }, [state, setStep, setOtherStep])

  React.useEffect(() => {
    return () => {
      // clear cache data in session storage
      setStep(x => x * 0)
      setOtherStep(x => x * 0)
    }
  }, [setStep, setOtherStep])

  const getFlow = key => {
    switch (key) {
      case 0:
        return <CropSelection />
      case 1:
        return <OtherSteps data={state?.data} history={history} />
      default:
        return <ReloadPage />
    }
  }

  React.useEffect(() => {
    let mounted = true
    let idx = null
    if (mounted && otherStep === 4) {
      idx = setTimeout(() => {
        setShowConfetti(false)
      }, 6000)
    }
    return () => {
      mounted = false
      clearTimeout(idx)
    }
  }, [otherStep])

  return (
    <Box w='100%' h='100vh' bgColor='white'>
      <Header />
      {otherStep === 4 && showConfetti && (
        <Confetti width={width} height={height} />
      )}
      <Box
        as='main'
        w='100%'
        mt={{ base: 12, md: 12, xl: 12 }}
        pb={{ base: 12 }}
      >
        {getFlow(step)}
      </Box>
    </Box>
  )
}

Individual.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}

export default Individual
