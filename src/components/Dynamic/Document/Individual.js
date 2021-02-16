import { Box, Flex, Grid } from '@chakra-ui/react'
import Button from 'components/Button'
import React from 'react'
import PropTypes from 'prop-types'
import { BsArrowRight } from 'react-icons/bs'
import FarmDocumentCard from '../Cards/FarmDocumentCard'

export default function Individual({ digitalFarmerFarms }) {
  return (
    <Box>
      <Grid gap={10}>
        <FarmDocumentCard
          title='Land preparation'
          subtitle='During the 7 days period, land preparation...'
          receipt='CF294001'
          date='10/01/2021'
          amount='2,800'
        />
        <FarmDocumentCard
          title='Transplanting'
          subtitle='During the 7 days period, land preparation...'
          receipt='CF294001'
          date='10/01/2021'
          amount='2,800'
        />
        <FarmDocumentCard
          title='Harvesting'
          subtitle='During the 7 days period, land preparation...'
          receipt='CF294001'
          date='10/01/2021'
          amount='2,800'
        />
      </Grid>

      <Flex align='center' justify='center' mt={{ md: 16 }}>
        <Button
          btntitle='Show me more'
          icon={BsArrowRight}
          bg='white'
          borderWidth={1}
          borderColor='cf.400'
          color='cf.400'
          rounded='30px'
          h={14}
          width={56}
          _hover={{ bg: 'white' }}
          shadow='none'
          fontSize='md'
        />
      </Flex>
    </Box>
  )
}

Individual.propTypes = {
  digitalFarmerFarms: PropTypes.any
}
