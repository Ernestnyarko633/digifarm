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
import AboutBuyer from 'components/Modals/AboutBuyer'
import ConfirmSale from 'components/Modals/ConfirmSale'

const BuyerCard = ({ buyers }) => {
  const { onClose } = useDisclosure()

  const [isOpened, setOpened] = React.useState(false)

  const onOpenx = () => {
    setOpened(true)
  }
  const onClosex = () => {
    setOpened(false)
  }

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
      <Flex justify='space-between' pt={2}>
        <Flex mb={4}>
          <Avatar bg='gray.100' src={buyers?.user?.avatar} />
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
          <AboutBuyer buyers={buyers} />
          <ConfirmSale
            onClick={onOpenx}
            onClose={onClose}
            isOpenx={isOpened}
            onClosex={onClosex}
          />
          <Button
            colorScheme='linear'
            rounded='30px'
            ml={2}
            mt={1}
            borderWidth={1}
            color='white'
            borderColor='cf.400'
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
            $ {buyers?.cost} per tonne
          </Text>
        </Flex>
        <Progress
          value={((buyers?.demand - buyers?.supply) / buyers?.demand) * 100}
          rounded='lg'
          colorScheme='cfButton'
          size='lg'
          mt={4}
        />
        <Grid templateColumns='repeat(4, 1fr)' w='100%' pt={4}>
          <GridItem>
            <Flex
              w='80%'
              direction='row'
              align='center'
              justify='space-between'
            >
              <Box pt={2} py={4}>
                <Text fontWeight='bold' fontSize='28px'>
                  {buyers?.demand}
                </Text>
                <Text
                  fontWeight='light'
                  color='gray.500'
                  fontSize='16px'
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
              w='80%'
              direction='row'
              align='center'
              justify='space-between'
            >
              <Box pt={2} py={4}>
                <Text fontWeight='bold' fontSize='28px'>
                  {buyers?.supply}
                </Text>
                <Text
                  fontWeight='light'
                  color='gray.500'
                  fontSize='16px'
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
              w='80%'
              direction='row'
              align='center'
              justify='space-between'
            >
              <Box pt={2} py={4}>
                <Text fontWeight='bold' fontSize='28px'>
                  {buyers?.demand - buyers?.supply}
                </Text>
                <Text fontWeight='light' color='gray.500' fontSize='16px'>
                  Tonnes remaining
                </Text>
              </Box>
              <Divider orientation='vertical' borderColor='gray.300' h='80px' />
            </Flex>
          </GridItem>
          <GridItem>
            <Box pt={2} py={4}>
              <Text fontWeight='bold' fontSize='28px'>
                {buyers?.deliveryMethod?.rule}
              </Text>
              <Text fontWeight='light' color='gray.500' fontSize='16px'>
                Delivery option
              </Text>
            </Box>
          </GridItem>
        </Grid>
        <Center>
          <Button
            pt={4}
            color='cf.400'
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
  buyers: PropTypes.any.isRequired
}
export default BuyerCard
