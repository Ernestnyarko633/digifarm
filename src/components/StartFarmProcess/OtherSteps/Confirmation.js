/* eslint-disable no-console */
import React from 'react'
import { Box, Flex, Image, Text, useToast } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { saveAs } from 'file-saver'

import { Button } from 'components'
import FarmInfo from 'components/Cards/FarmInfo'
import useApi from 'context/api'
import useStartFarm from 'context/start-farm'

const MotionFlex = motion(Flex)

const ButtonDownload = ({ type, order, ...rest }) => {
  const [loading, setLoading] = React.useState(false)

  const { downloadFile } = useApi()

  const toast = useToast()

  const _downloadFile = async (resource, query) => {
    try {
      setLoading(true)
      const res = await downloadFile(resource, query)
      let blob = new Blob([res.data], {
        type: 'application/pdf;charset=utf-8'
      })
      toast({
        title: 'Download starting',
        status: 'success',
        duration: 5000,
        position: 'top-right'
      })
      saveAs(blob, `farm-${query.type}-for-${query.reference}.pdf`)
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
    <Button
      {...rest}
      w={64}
      h={12}
      fontSize='sm'
      rounded='30px'
      isDisabled={loading}
      isLoading={loading}
      onClick={() => {
        if (order[type]) {
          return (window.location = order[type])
        }
        return _downloadFile('orders', { reference: order?.reference, type })
      }}
    />
  )
}

ButtonDownload.propTypes = {
  type: PropTypes.string,
  order: PropTypes.any
}

const Confirmation = ({ farm, order }) => {
  const { setOrder } = useStartFarm()
  React.useEffect(() => {
    let mounted = true

    if (mounted && order) {
      setOrder(order)
    }

    return () => (mounted = false)
  }, [order, setOrder])

  return (
    <MotionFlex w='100%'>
      <Box w={{ md: '50%' }}>
        <Flex align='center' justify='center' h='100%'>
          <Image
            w={80}
            h={80}
            src={require('../../../assets/images/congratulatioins.svg').default}
          />
        </Flex>
      </Box>
      <Box
        w={{ md: '50%' }}
        p={{ base: 2, md: 8 }}
        px={{ base: 2, md: 14 }}
        mx={3}
        pos='relative'
      >
        <Flex direction='column' align='center' justify='center'>
          <Box textAlign='center' m='auto' mt={6}>
            <Text mb={1} fontSize={{ base: 18, md: 22 }} fontWeight='bold'>
              {order?.status !== 'PAID'
                ? 'Order Confirmed'
                : 'Payment Comfirmed'}
            </Text>
            <Text
              color='gray.400'
              mb={8}
              fontSize={{ base: 12, md: 16 }}
              dangerouslySetInnerHTML={{
                __html:
                  order?.status !== 'PAID'
                    ? 'Welldone! your order is pending, <br /> awaiting payment approval, download invoice for payment details.'
                    : 'Congratulations! You’ve completed the payment for your farm.'
              }}
            />
          </Box>
          <FarmInfo farm={farm} order={order} />
        </Flex>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align='center'
          pos={{ md: 'absolute' }}
          bottom={1}
          left={0}
          right={0}
          m={3}
        >
          <ButtonDownload
            mx={6}
            color='cf.900'
            variant='outline'
            borderColor='cf.900'
            btntitle='Download farm invoice'
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            type='invoice'
            order={order}
          />
          <ButtonDownload
            mt={{ base: 4, md: 0 }}
            btntitle='Download farm agreement'
            type='agreement'
            order={order}
          />
        </Flex>
      </Box>
    </MotionFlex>
  )
}

Confirmation.propTypes = {
  order: PropTypes.any,
  farm: PropTypes.any
}

export default Confirmation
