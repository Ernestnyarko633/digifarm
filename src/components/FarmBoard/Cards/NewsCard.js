import React from 'react'
import PropTypes from 'prop-types'
import FarmBoardCardWrapper from './FarmBoardCardWrapper'
import { Box, Flex, Heading, Text, Image, Collapse } from '@chakra-ui/react'

const NewsCard = ({ activeFarm, timestamp, content, status }) => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  const NewHead = () => (
    <Flex align='center' justify='space-between'>
      <Flex align='center'>
        <Box ml={4}>
          <Heading as='h4' fontSize={{ md: 'xl' }} fontWeight={700}>
            Weekly News
          </Heading>
        </Box>
      </Flex>

      <Flex direction='column' justify='center' align='center'>
        <Box mx={{ base: 4 }}>
          <Text color='cf.400'>
            {status === 'news' ? status.toUpperCase() : null}
          </Text>
        </Box>
        <Text color='gray.500'>{timestamp}</Text>
      </Flex>
    </Flex>
  )

  return (
    <FarmBoardCardWrapper status={status} content={content}>
      <Box>
        <Box pt={{ base: 4 }} pb={2} px={{ base: 4, md: 8 }}>
          <NewHead />
        </Box>
        <Box>
          <Image
            w='100%'
            h={{ md: 90 }}
            objectFit='cover'
            src={content?.data?.body[0]?.primary?.image?.url}
          />
        </Box>
        <Box py={4} px={{ base: 4, md: 10 }}>
          <Box mt={6}>
            <Heading as='h5' fontSize={{ md: 'lg' }}>
              {content?.data?.headline[0]?.text}
            </Heading>
            <Collapse
              startingHeight={85}
              in={show}
              onClick={handleToggle}
              cursor='pointer'
            >
              {content?.data?.body[0]?.primary?.description?.map(item => (
                <Text
                  color='gray.500'
                  mt={3}
                  key={item.text}
                  fontSize={{ base: 'sm', md: 'md' }}
                >
                  {item.text}
                </Text>
              ))}
            </Collapse>
            <Box as='button' onClick={handleToggle}>
              <Text color='cf.400' py={{ base: 1 }}>
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
  timestamp: PropTypes.any,
  content: PropTypes.any,
  status: PropTypes.any
}

export default NewsCard
