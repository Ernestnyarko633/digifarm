import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Heading } from '@chakra-ui/react'

import SignatureDisplay from './SignatureDisplay'
import SignatureSetup from './SignatureSetup'

const Signature = ({ data }) => {
  const [isEditing, setIsEditing] = React.useState(false)

  return (
    <Box mt={10}>
      <Box mb={2}>
        <Heading as='h4' fontSize='2xl'>
          Signature
        </Heading>
        <Text fontSize='sm'>
          This signature will be used in all legal documents, between you and
          complete farmer limited. You can change/update it, at any time.
        </Text>
      </Box>
      {data?.string && !isEditing ? (
        <SignatureDisplay
          data={data}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <SignatureSetup isEditing={isEditing} setIsEditing={setIsEditing} />
      )}
    </Box>
  )
}

Signature.propTypes = {
  data: PropTypes.object.isRequired
}

export default Signature
