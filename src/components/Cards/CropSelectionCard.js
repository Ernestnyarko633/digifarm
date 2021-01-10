import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Text } from '@chakra-ui/react'

const CropSelectionCard = ({ acres, title, onClick }) => (
  <Flex
    align='center'
    direction='column'
    justify='center'
    w='100%'
    h={48}
    borderTopWidth={1}
    borderTopColor='gray.300'
    as='button'
    role='button'
    onClick={onClick}
    aria-label='crop card button'
  >
    {acres && (
      <Text color='red.600' fontSize='xs'>
        {acres} acres left
      </Text>
    )}
    <Text>{title}</Text>
  </Flex>
)

CropSelectionCard.propTypes = {
  title: PropTypes.string,
  acres: PropTypes.string,
  onClick: PropTypes.func
}

export default CropSelectionCard
