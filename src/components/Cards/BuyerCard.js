/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Divider,
  Progress,
  Heading,
  Flex,
  Avatar,
  Text,
  Spacer,
  Grid,
  GridItem,
  Center,
  Tag,
  TagLabel,
  useDisclosure,
  Button
} from '@chakra-ui/react'
// import AboutBuyer from 'components/Modals/AboutBuyer'
import ConfirmSale from 'components/Modals/ConfirmSale'
import { useHistory } from 'react-router-dom'

const BuyerCard = ({ buyers, myFarm, _id }) => {
  const history = useHistory()
  const { onClose } = useDisclosure()

  const [isOpened, setOpened] = React.useState(false)

  const onOpenx = () => {
    setOpened(true)
  }
  const onClosex = () => {
    setOpened(false)
  }

  React.useEffect(() => {
    let mounted = true
    if (mounted && !myFarm) {
      history.push('/warehouses')
    }
    return (mounted = false)
  }, [history, myFarm])
  const quantity =
    myFarm?.order?.acreage * myFarm?.order?.product?.storagePerAcre
  return (
    <Box
      rounded='lg'
      bg='white'
      p={10}
      pb={1}
      my={6}
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      w='100%'
      borderRadius='20px'
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'auto' }}
        justify={{ base: 'center', md: 'space-between' }}
        pt={2}
      >
        <Flex
          w={{ base: '100%', md: 'auto' }}
          align={{ base: 'center', md: 'auto' }}
          justify={{ base: 'center', md: 'auto' }}
          mb={4}
        >
          <Avatar
            bg='cf.400'
            name={`${buyers?.user?.firstName} ${buyers?.user?.lastName}`}
            src={buyers?.user?.avatar}
          />
          <Box ml={2}>
            <Heading as='h6' mb={{ md: 2 }} fontSize={{ md: 'lg' }}>
              {buyers?.user?.firstName} {buyers?.user?.lastName}
            </Heading>
            <Text mt={{ md: -2 }} fontSize='sm' color='gray.500'>
              {buyers?.onboarding?.info?.address?.state} |{' '}
              {buyers?.onboarding?.info?.name}
            </Text>
          </Box>
        </Flex>
        <Spacer />
        <Flex>
          {/* <AboutBuyer buyers={buyers} /> */}
          <ConfirmSale
            onClick={onOpenx}
            onClose={onClose}
            isOpenx={isOpened}
            onClosex={onClosex}
            buyers={buyers}
            myFarm={myFarm}
          />
          <Button
            isDisabled={quantity > buyers.demand}
            colorScheme='linear'
            rounded='30px'
            ml={2}
            mt={1}
            mb={{ base: 3, md: 'auto' }}
            borderWidth={1}
            color='white'
            borderColor='cf.green'
            px={10}
            onClick={onOpenx}
          >
            Sell to buyer
          </Button>
        </Flex>
      </Flex>
      <Divider borderColor='gray.300' />
      <Box p={4}>
        <Flex w='100%'>
          <Tag mt={1} size='lg' colorScheme='green' borderRadius='full'>
            <TagLabel>Offer</TagLabel>
          </Tag>
          <Text mt={1} fontWeight='bold' fontSize='20px' ml={4}>
            $ {buyers?.pricePerUnit} per tonne
          </Text>
        </Flex>
        <Progress
          value={(buyers?.supply / buyers?.demand) * 100}
          rounded='lg'
          colorScheme='cfButton'
          size='lg'
          mt={4}
        />
        <Grid templateColumns='repeat(4, 1fr)' w='100%' pt={4}>
          <GridItem>
            <Flex
              pr={{ base: 1, md: 'auto' }}
              w='80%'
              direction='row'
              align='center'
              justify={{ base: 'center', md: 'space-between' }}
            >
              <Box pt={2} mr={{ base: 2, md: 'auto' }} py={4}>
                <Text fontWeight='bold' fontSize={{ base: 'md', md: '28px' }}>
                  {buyers?.demand}
                </Text>
                <Text
                  fontWeight='light'
                  color='gray.500'
                  fontSize={{ base: 'sm', md: '16px' }}
                  pl={1}
                >
                  Tonnes needed
                </Text>
              </Box>
              <Divider orientation='vertical' borderColor='gray.300' h='80px' />
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              pr={{ base: 1, md: 'auto' }}
              justify={{ base: 'center', md: 'space-between' }}
              direction='row'
              w='80%'
              align='center'
            >
              <Box pt={2} py={4} mr={{ base: 2, md: 'auto' }}>
                <Text fontWeight='bold' fontSize={{ base: 'md', md: '28px' }}>
                  {buyers?.supply}
                </Text>
                <Text
                  fontWeight='light'
                  color='gray.500'
                  fontSize={{ base: 'sm', md: '16px' }}
                  pl={1}
                >
                  Tonnes bought
                </Text>
              </Box>
              <Divider orientation='vertical' borderColor='gray.300' h='80px' />
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              pl={{ base: 1, md: 'auto' }}
              w='80%'
              direction='row'
              align='center'
              justify={{ base: 'center', md: 'space-between' }}
            >
              <Box pt={2} py={4} mr={{ base: 2, md: 'auto' }}>
                <Text fontWeight='bold' fontSize={{ base: 'md', md: '28px' }}>
                  {buyers?.demand - buyers?.supply}
                </Text>
                <Text
                  fontWeight='light'
                  color='gray.500'
                  fontSize={{ base: 'sm', md: '16px' }}
                >
                  Tonnes remaining
                </Text>
              </Box>
              <Divider orientation='vertical' borderColor='gray.300' h='80px' />
            </Flex>
          </GridItem>
          <GridItem>
            <Box pt={2} py={4} ml={{ base: 2, md: 'auto' }}>
              <Text fontWeight='bold' fontSize={{ base: 'md', md: '28px' }}>
                {buyers?.deliveryMethod?.rule}
              </Text>
              <Text
                fontWeight='light'
                color='gray.500'
                fontSize={{ base: 'sm', md: '16px' }}
              >
                Delivery option
              </Text>
            </Box>
          </GridItem>
        </Grid>
        <Center>
          <Button
            pt={4}
            color='cf.green'
            size='16px'
            pb={-8}
            isDisabled='true'
            variant='link'
          >
            View auditor report
          </Button>
        </Center>
      </Box>
    </Box>
  )
}
BuyerCard.propTypes = {
  _id: PropTypes.any,
  buyers: PropTypes.shape({
    deliveryMethod: PropTypes.shape({
      rule: PropTypes.any
    }),
    demand: PropTypes.any,
    onboarding: PropTypes.shape({
      info: PropTypes.shape({
        address: PropTypes.shape({
          state: PropTypes.any
        }),
        name: PropTypes.any
      })
    }),
    pricePerUnit: PropTypes.any,
    supply: PropTypes.any,
    user: PropTypes.shape({
      avatar: PropTypes.any,
      firstName: PropTypes.any,
      lastName: PropTypes.any
    })
  }).isRequired,
  myFarm: PropTypes.any.isRequired
}
export default BuyerCard
