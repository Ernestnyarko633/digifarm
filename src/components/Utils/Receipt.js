import React from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react'

import Button from 'components/Button'
import useApi from 'context/api'
import FarmInfo from 'components/Cards/FarmInfo'
import { saveAs } from 'file-saver'

const Receipt = ({
  title,
  description,
  buttonTitle,
  label,
  text,
  data,
  type
}) => {
  const { downloadFile } = useApi()

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const _downloadOrder = async query => {
    try {
      setLoading(true)
      setError(null)
      const res = await downloadFile('orders', query)
      let blob = new Blob([res.data], {
        type: 'application/pdf;charset=utf-8'
      })
      setLoading(false)
      saveAs(blob, `${query.reference}-agreement.pdf`)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }
  return (
    <Box>
      <Divider orientation='horizontal' my={3} />
      <Heading as='h3' fontSize={{ md: '3xl' }}>
        {title}
      </Heading>
      <Box mb={8}>
        <Text fontWeight='bold'>{description}</Text>
        <Divider orientation='horizontal' my={3} />
        <Text fontSize='xs'>{label}</Text>
      </Box>
      <FarmInfo
        rate={data?.exchangeRate}
        farm={data?.farm}
        order={data?.order}
        currency={data?.currency}
        width='100%'
        margin={0}
      />

      <Flex align='center' justify='space-between' my={8}>
        <Text fontSize='xs'>{text}</Text>
        <Button
          btntitle='Contact support'
          fontSize='xs'
          borderWidth={1}
          borderColor='cf.green'
          color='cf.green'
          rounded='30px'
          bg='white'
          h={6}
          w={32}
          _hover={{ bg: 'white' }}
          _active={{ bg: 'white' }}
          shadow='none'
        />
      </Flex>
      {error && !loading && alert('Opps, Something went wrong')}
      <Box w={56} mx='auto' my={6}>
        <Button
          btntitle={buttonTitle}
          width='100%'
          h={12}
          mx='auto'
          fontSize='md'
          rounded='30px'
          isLoading={loading}
          isDisabled={loading}
          onClick={() =>
            _downloadOrder({
              reference: data?.farm?.order?.reference,
              type: type
              // eslint-disable-next-line prettier/prettier
            })}
        />
      </Box>
    </Box>
  )
}
Receipt.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string,
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired
}

export default Receipt
