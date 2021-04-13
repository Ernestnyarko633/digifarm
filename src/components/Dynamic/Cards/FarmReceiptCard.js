import React from 'react'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import { saveAs } from 'file-saver'
import { Avatar, Box, Flex, Image, Text, useToast } from '@chakra-ui/react'

import Button from 'components/Button'
import useAuth from 'context/auth'
import useApi from 'context/api'
export default function FarmReceiptCard({ farm, title, type }) {
  const [loading, setLoading] = React.useState(false)

  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { downloadFile } = useApi()

  const toast = useToast()

  const _downloadOrder = async query => {
    try {
      setLoading(true)
      const res = await downloadFile('orders', query)
      let blob = new Blob([res.data], { type: 'application/pdf;charset=utf-8' })
      toast({
        title: 'Download starting',
        status: 'success',
        duration: 5000,
        position: 'top-right'
      })
      saveAs(blob, `${query.reference}-agreement.pdf`)
    } catch (error) {
      toast({
        title: 'Download failed',
        description:
          error?.message || error?.data?.message || 'Unexpected error.',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fade bottom>
      <Box
        bg='white'
        rounded='lg'
        filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
        p={4}
      >
        <Flex align='center' justify='space-between'>
          <Flex align='center'>
            <Avatar src={farm?.order?.product?.cropVariety?.imageUrl} />
            <Box ml={2}>
              <Text fontSize='lg' fontWeight={700}>
                {`${user?.firstName}'s Farm ${title}`}
              </Text>
              <Text fontSize='xs' color='gray.500' mt={-2}>
                {`${farm?.order?.product?.location?.state} ${farm?.order?.product?.location?.country}`}
              </Text>
            </Box>
          </Flex>

          <Box>
            <Button
              btntitle={`View ${title.toLowerCase()}`}
              onClick={() => {
                if (farm?.order?.agreement) {
                  return (window.location = farm?.order?.agreement)
                }
                return _downloadOrder({
                  reference: farm?.order?.reference,
                  type: type
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
              isDisabled={loading}
              isLoading={loading}
            />
          </Box>
        </Flex>

        <Box mt={8}>
          <Image src={require('../../../assets/images/document.png').default} />
          <Text w={64} fontSize='sm' color='gray.600' mt={4}>
            Protect your farm from natural perils like flood, fire, pests,
            strong winds with insurance for your farm
          </Text>
        </Box>
      </Box>
    </Fade>
  )
}

FarmReceiptCard.propTypes = {
  farm: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
