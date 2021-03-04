import React from 'react'
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
import PropTypes from 'prop-types'
import AboutBuyer from 'components/Modals/AboutBuyer'
import ConfirmSale from 'components/Modals/ConfirmSale'

const BuyerCard = () => {
  const { onClose } = useDisclosure()

  const [isOpened, setOpened] = React.useState(false)

  const onOpenx = () => {
    setOpened(true)
  }
  const onClosex = () => {
    setOpened(false)
  }

  return (
    <Flex w='100%'>
      <Box
        rounded='lg'
        bg='white'
        p={10}
        my={6}
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        w='62%'
      >
        <Flex justify='space-between'>
          <Flex mb={4}>
            <Avatar bg='gray.100' />
            <Box ml={2}>
              <Heading as='h6' mb={{ md: 2 }} fontSize={{ md: 'lg' }}>
                John Clinton
              </Heading>
              <Text mt={{ md: -2 }} fontSize='sm' color='gray.500'>
                Accra | John Clinton Company Limited
              </Text>
            </Box>
          </Flex>
          <Spacer />
          <Flex>
            <AboutBuyer />
            <ConfirmSale
              onClick={onOpenx}
              onClose={onClose}
              isOpenx={isOpened}
              onClosex={onClosex}
            />
            <Button
              mt={4}
              colorScheme='linear'
              rounded='30px'
              fontSize='xs'
              width={{ md: '120px' }}
              h={{ md: '40px' }}
              onClick={onOpenx}
            >
              Sell to buyer
            </Button>
          </Flex>
        </Flex>
        <Divider borderColor='gray.300' />
        <Box p={4}>
          <Flex w='20.5%' justify='space-between' align='center'>
            <Tag mt={2} size='lg' colorScheme='green' borderRadius='full'>
              <TagLabel>Offer</TagLabel>
            </Tag>
            <Text mt={1} fontWeight='bold' fontSize='1xl'>
              $ 30.00 per tonne
            </Text>
          </Flex>
          <Progress
            value={100}
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
                  {' '}
                  <Text fontWeight='bold' fontSize={{ md: '4xl' }}>
                    {' '}
                    3,000
                  </Text>
                  <Text fontWeight='light' color='gray.500'>
                    Tonnes needed
                  </Text>
                </Box>
                <Divider
                  orientation='vertical'
                  borderColor='gray.300'
                  h='80px'
                />
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
                  {' '}
                  <Text fontWeight='bold' fontSize={{ md: '4xl' }}>
                    {' '}
                    200
                  </Text>
                  <Text fontWeight='light' color='gray.500'>
                    Tonnes bought
                  </Text>
                </Box>
                <Divider
                  orientation='vertical'
                  borderColor='gray.300'
                  h='80px'
                />
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
                  {' '}
                  <Text fontWeight='bold' fontSize={{ md: '4xl' }}>
                    {' '}
                    2,800
                  </Text>
                  <Text fontWeight='light' color='gray.500'>
                    Tonnes remaining
                  </Text>
                </Box>
                <Divider
                  orientation='vertical'
                  borderColor='gray.300'
                  h='80px'
                />
              </Flex>
            </GridItem>
            <GridItem>
              <Box pt={2} py={4}>
                {' '}
                <Text fontWeight='bold' fontSize={{ md: '4xl' }}>
                  {' '}
                  FOB
                </Text>
                <Text fontWeight='light' color='gray.500'>
                  Delivery option
                </Text>
              </Box>
            </GridItem>
          </Grid>
          <Center>
            <Text pt={8} color='cf.400' size='16px'>
              View auditor report
            </Text>
          </Center>
          {/* {quantity && <Flex align='center' justify='space-between' mt={6} />}
          {!quantity && (
            <Flex align='center' justify='center' mt={6}>
              <Button
                btntitle='sold'
                bg='gray.400'
                color='gray.100'
                cursor='not-allowed'
                _hover={{ bg: 'gray.400' }}
                _action={{ bg: 'gray.400' }}
                rounded='30px'
                shadow='none'
                h={12}
                w={56}
              />
            </Flex>
          )} */}
        </Box>
      </Box>
    </Flex>
  )
}
BuyerCard.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  btntitle: PropTypes.string.isRequired,
  amtNeeded: PropTypes.string.isRequired,
  amtBought: PropTypes.string.isRequired,
  amtLeft: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
}
export default BuyerCard
