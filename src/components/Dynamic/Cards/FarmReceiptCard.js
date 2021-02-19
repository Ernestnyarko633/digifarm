import React from 'react'
import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Button from 'components/Button'
import useAuth from 'context/auth'
import useApi from 'context/api'

export default function FarmReceiptCard({ farm }) {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { downloadOrder } = useApi()
  const [loading, setLoading] = React.useState(null)
  const [error, setError] = React.useState(null)

  const _downloadOrder = async query => {
    try {
      setLoading(true)
      setError(null)
      await downloadOrder(query)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }
  return (
    <Box
      bg='white'
      rounded='lg'
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      p={6}
    >
      <Flex align='center' justify='space-between'>
        <Flex align='center'>
          <Avatar src={farm?.order?.product?.cropVariety?.imageUrl} />
          <Box ml={2}>
            <Text fontSize='lg' fontWeight={700}>
              {`${user?.firstName}'s Farm Contract`}
            </Text>
            <Text fontSize='xs' color='gray.500' mt={-2}>
              {`${farm?.order?.product?.location?.state} ${farm?.order?.product?.location?.country}`}
            </Text>
          </Box>
        </Flex>

        <Box>
          <Button
            btntitle='View contract'
            onClick={() => {
              return _downloadOrder({
                reference: farm?.order?.reference,
                type: 'agreement'
              })
            }}
            bg='white'
            borderWidth={1}
            borderColor='cf.400'
            color='cf.400'
            rounded='30px'
            h={10}
            width={32}
            _hover={{ bg: 'white' }}
            shadow='none'
            isDisabled={loading ? true : false}
            isLoading={loading ? true : false}
          />
          {error && !loading && alert('Opps, Something went wrong')}
        </Box>
      </Flex>

      <Box mt={8}>
        <Image src={require('../../../assets/images/document.png').default} />
        <Text w={64} fontSize='sm' color='gray.600' mt={4}>
          Protect your farm from natural perils like flood, fire, pests, strong
          winds with insurance for your farm
        </Text>
      </Box>
    </Box>
  )
}

FarmReceiptCard.propTypes = {
  farm: PropTypes.object.isRequired
}
