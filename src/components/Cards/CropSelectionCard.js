import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Heading, Text } from '@chakra-ui/react'

const CropSelectionCard = ({
  varietyName,
  cropName,
  selected,
  farmName,
  acres,
  ...rest
}) => (
  <Flex
    {...rest}
    h={48}
    w='100%'
    as='button'
    role='button'
    align='center'
    direction='column'
    justify='center'
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
      <Heading as='h5' fontSize='md' textTransform='uppercase'>
        {cropName}
      </Heading>
      <Text ml={2} as='span' fontSize='xs' textColor='gray.500'>
        ({varietyName}) #{farmName}
      </Text>
    </Flex>
  </Flex>
)

CropSelectionCard.propTypes = {
  varietyName: PropTypes.string.isRequired,
  cropName: PropTypes.string.isRequired,
  farmName: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  acres: PropTypes.number.isRequired
}

export default CropSelectionCard
