import React from 'react'
import { Box, Flex, Image, useToast } from '@chakra-ui/react'
import CropSelection from 'components/StartFarmProcess/CropSelection'

import OtherSteps from 'components/StartFarmProcess/OtherSteps'

import useApi from 'context/api'
import useAuth from 'context/auth'
import useStartFarm from 'context/start-farm'

const Individual = props => {
  document.title = 'Complete Farmer | Individual'

  const { addToast } = useToast()
  const { setSession } = useAuth()
  const { createOrder } = useApi()
  const { step, setOrder, setSubmitting } = useStartFarm()

  React.useEffect(() => {
    return () => {
      // clear cache data in session storage
      sessionStorage.removeItem('categories')
      sessionStorage.removeItem('farms')
    }
  }, [])

  const getContent = key => {
    switch (key) {
      case 0:
        return <CropSelection />
      case 1:
        return <OtherSteps {...props} />
      default:
        return null
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleFormSubmit = async () => {
    try {
      setSubmitting(true)
      const res = await createOrder({})
      setSubmitting(false)
      setOrder(res.data)
      addToast(res.message, { appearance: 'success', autoDismiss: true })
    } catch (error) {
      if (error) {
        if ([401, 403].includes(error.status)) {
          setSession(false)
        } else {
          addToast(error?.data?.message || error.message, {
            appearance: 'error',
            autoDismiss: true
          })
        }
      } else {
        addToast('Unexpected network error', {
          appearance: 'error',
          autoDismiss: true
        })
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box>
      <Flex
        align='center'
        w='100vw'
        h={{ md: 20 }}
        pos='fixed'
        top={0}
        bg='white'
        shadow='md'
        px={{ md: 20 }}
      >
        <Box h={{ md: 12 }}>
          <Image
            h='100%'
            src={require('../../assets/images/logo.png').default}
          />
        </Box>
      </Flex>

      {getContent(step)}
    </Box>
  )
}

export default Individual
