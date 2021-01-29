import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Heading, Text } from '@chakra-ui/react'

const CropSelectionCard = ({
  varietyName,
  cropName,
  selected,
  farmName,
  onClick,
  acres
}) => (
  <Flex
    h={48}
    w='100%'
    as='button'
    role='button'
    align='center'
    direction='column'
    justify='center'
    onClick={onClick}
    borderTopWidth={1}
    borderTopColor='gray.300'
    borderWidth={selected && 2}
    borderColor={selected && 'cf.400'}
    aria-label='crop card button'
  >
    <Text color='red.600' fontSize='xs'>
      {acres} acres left
    </Text>
    <Flex direction='column'>
      <Heading as='h5' size='md' textTransform='uppercase'>
        {cropName}
      </Heading>
      <Text ml={2} as='span' fontSize='xs' textColor='gray.500'>
        ({varietyName}) #{farmName}
      </Text>
    </Flex>
  </Flex>
)

CropSelectionCard.propTypes = {
  cropName: PropTypes.string.isRequired,
  varietyName: PropTypes.string.isRequired,
  farmName: PropTypes.string.isRequired,
  acres: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default CropSelectionCard
