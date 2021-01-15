import React from 'react'
import {
  Box,
  Divider,
  Progress,
  Heading,
  Button,
  Flex,
  Avatar,
  Text,
  Image
} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import ConfirmSale from 'components/Modals/ConfirmSale'

const BuyerCard = ({ image, name, address, amtLeft, amtBought, amtNeeded, price }) => (
  <Flex py={6} my={6} w={{ md: '730px' }} bg='white' ml={14} px={6}>
    <Box>
      <Flex>
        <Box my={1}>
          <Flex>
            <Avatar>
              <Image src={image} />
            </Avatar>
            <Box ml={4}>
              <Heading as='h6' mt={1} fontSize={{ md: 'md' }}>
                {name}
              </Heading>
              <Text fontSize='xs' mt={-1}>
                {address}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Box mt={4}>
        <Flex>
          <Box rounded='20px' bg='cf.200' pt={1} px={2}>
            <Text color='cf.400' fontSize='10px' textAlign='center'>
              Offer
            </Text>
          </Box>
          <Text as='h6' fontSize='xs' mt={1} ml={3}>
            {price} per tonne
          </Text>
        </Flex>
      </Box>
      <Progress value={60} rounded='lg' colorScheme='cfButton' size='sm' mt={4} />
      <Box mt={3}>
        <Flex>
          <Text as='h6' fontWeight='bold' fontSize='sm'>
            Need {amtNeeded} tonnes
          </Text>
          <Divider orientation='vertical' h={5} borderColor='gray.600' mx={4} />
          <Text as='h6' fontWeight='bold' fontSize='sm'>
            {amtBought} tonnes bought
          </Text>
          <Divider orientation='vertical' h={5} borderColor='gray.600' mx={4} />
          <Text as='h6' fontWeight='bold' fontSize='sm'>
            {amtLeft} tonnes left
          </Text>
        </Flex>
      </Box>
    </Box>
    <Flex>
      <Button
        mr={5}
        mt={4}
        rounded='30px'
        fontWeight='thin'
        fontSize='xs'
        variant='outline'
        borderColor='cf.400'
        w={{ md: '120px' }}
      >
        About buyer
      </Button>
      <ConfirmSale amtLeft={amtLeft} name={name} amtBought={amtBought} price={price} />
    </Flex>
  </Flex>
)

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
