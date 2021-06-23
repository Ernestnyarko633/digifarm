import React from 'react'
import { Flex, Heading, Icon } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/avatar'
import { Text } from '@chakra-ui/layout'
import { MdLocationOn } from 'react-icons/md'
import PropTypes from 'prop-types'

const CropItemInfo = ({ farm, order }) => {
  return (
    <Flex align='center' justify='space-between'>
      <Flex align='center'>
        <Avatar size='lg' src={farm.cropVariety.imageUrl} />
        <Flex direction='column' ml={2}>
          <Heading as='h3' fontSize='xl' textTransform='uppercase'>
            {order?.product?.cropVariety?.crop?.name ||
              farm?.cropVariety?.crop?.name}
          </Heading>
          <Text as='span' fontSize='xs' textColor='gray.500'>
            ({order?.product?.cropVariety?.name || farm?.cropVariety?.name}) #
            {order?.product?.name || farm?.name}
          </Text>
        </Flex>
      </Flex>

      <Flex align='center' fontSize='xs' color='gray.500' direction='column'>
        <Flex align='center'>
          <Icon as={MdLocationOn} />
          <Text>{farm.location.name},</Text>
        </Flex>
        <Text>{farm.location.state}</Text>
      </Flex>
    </Flex>
  )
}

CropItemInfo.propTypes = {
  order: PropTypes.object.isRequired,
  farm: PropTypes.object
}

export default CropItemInfo
