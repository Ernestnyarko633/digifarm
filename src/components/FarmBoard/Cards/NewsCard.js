import React from 'react'
import PropTypes from 'prop-types'
import FarmBoardCardWrapper from './FarmBoardCardWrapper'
import { Box, Heading, Text, Collapse } from '@chakra-ui/react'
import TextField from '../Prismic/RichText'
import useNews from '../News/useNews'
import NewsHead from '../News/NewsHead'
import NewsCardButtons from '../News/NewsCardButtons'

const NewsCard = ({ content, status, loading }) => {
  const { handleToggle, show } = useNews({ content })
  return (
    <FarmBoardCardWrapper status={status} content={content}>
      <Box>
        <Box pt={{ base: 4 }} pb={2} px={{ base: 4, md: 8 }}>
          <NewsHead content={content} status={status} />
        </Box>
        <NewsCardButtons content={content} loading={loading} />
        <Box py={4} px={{ base: 4, md: 10 }}>
          <Box mt={6}>
            <Heading as='h5' fontSize={{ md: 'lg' }}>
              {content?.data?.headline[0]?.text}
            </Heading>
            <Collapse startingHeight={85} in={show} cursor='pointer'>
              <TextField
                render={content?.data?.body[0]?.primary?.description}
              />
            </Collapse>
            <Box as='button' onClick={handleToggle}>
              <Text color='cf.green' py={{ base: 1 }}>
                {!show ? 'Read More' : 'Collapse'}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </FarmBoardCardWrapper>
  )
}

NewsCard.propTypes = {
  activeFarm: PropTypes.object,
  content: PropTypes.any,
  status: PropTypes.any,
  loading: PropTypes.bool
}

export default NewsCard
