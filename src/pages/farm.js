/* eslint-disable*/
import { Box, Flex, Text, Avatar } from '@chakra-ui/react'
import DynamicFarm from 'components/Dynamic'
import Header from 'container/Header'
import useAuth from 'context/auth'
import React from 'react'
import { useScreenshot } from 'use-react-screenshot'
import useApi from 'context/api'
import useAPICalls from 'hooks/useApiCalls'
import { useParams } from 'react-router-dom'
import Share from 'components/Share'


export default function Farm() {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
 
  const ref = React.useRef(null)
  const [state, setState] = React.useState('compA')
  const [isOpen, setIsOpen] = React.useState(false)

  const [image, takeScreenShot] = useScreenshot()


  const { id } = useParams()
  const [loading, setLoading] = React.useState('fetching')
  const [error, setError] = React.useState(null)
  const [digitalFarmerFarms, setDigitalFarmerFarms] = React.useState('')
  const {getMyFarms} = useApi()
  const {farms} = useAPICalls()

  React.useEffect(() => {
    const fetchData = async () => {
    try {
      setLoading("fetching")
      const res = await getMyFarms()
      setDigitalFarmerFarms(res.data)
      console.log("running", "oufarm", res.data, farms)
      setLoading("done")
    } catch (error) {
      setLoading("done")
      setError(error)
    }
    }
    fetchData()
      }, [])

  const onClose = () => setIsOpen(false)

  const onOpen = () => setIsOpen(true)

  const getImage = () => {
    takeScreenShot(ref.current)
    onOpen()
  }


  return (
    <Box pos='relative' ref={ref}>
      <Share isOpen={isOpen} onClose={onClose} image={image} />
      <Header />
      <Flex
        pos='fixed'
        top={20}
        w='100%'
        bg='cf-dark.600'
        align='center'
        justify='space-between'
        px={{ md: 20 }}
        h={{ md: 16 }}
        zIndex={50}
      >
        <Flex align='center'>
          <Box
            w={8}
            h={8}
            as={Avatar}
            src={user?.avatar}
            rounded='100%'
            bg='gray.400'
          />
          <Text ml={5}>{`${user?.firstName}`}'s farm</Text>
        </Flex>
        <Flex align='center'>
          <Box
            as='button'
            role='button'
            aria-label='farm button'
            px={{ md: 6 }}
            color={state === 'compA' ? 'cf.400' : ''}
            onClick={() => setState('compA')}
          >
            Farm
          </Box>
          <Box
            as='button'
            role='button'
            aria-label='document button'
            px={{ md: 6 }}
            color={state === 'compB' ? 'cf.400' : ''}
            onClick={() => setState('compB')}
          >
            Documents
          </Box>
          <Box
            as='button'
            role='button'
            aria-label='gallery button'
            px={{ md: 6 }}
            color={state === 'compC' ? 'cf.400' : ''}
            onClick={() => setState('compC')}
          >
            Gallery
          </Box>
          <Box
            as='button'
            role='button'
            aria-label='warehouse button'
            px={{ md: 6 }}
            color={state === 'compD' ? 'cf.400' : ''}
            onClick={() => setState('compD')}
          >
            Warehouse
          </Box>
        </Flex>
      </Flex>

      <Box bg='white'>
        <DynamicFarm farm={state} digitalFarmerFarms={digitalFarmerFarms} farms={farms} onOpen={getImage} />
      </Box>
    </Box>
  )
}
