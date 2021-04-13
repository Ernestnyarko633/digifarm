import React from 'react'
import PropTypes from 'prop-types'
import FarmBoardCardWrapper from './FarmBoardCardWrapper'
import useAuth from 'context/auth'
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Image,
  Collapse
} from '@chakra-ui/react'

const NewsCard = ({ activeFarm, timestamp, content, status }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  const NewHead = () => (
    <Flex align='center' justify='space-between'>
      <Flex align='center'>
        <Avatar
          size='md'
          src={activeFarm?.order?.product?.cropVariety?.imageUrl}
        />
        <Box ml={4}>
          <Heading as='h4' fontSize={{ md: 'xl' }} fontWeight={700}>
            {`${user?.firstName}'s farm`}
          </Heading>
          <Text color='gray.600' fontSize={{ base: 'sm', md: 'md' }}>
            {`${activeFarm?.order?.product?.location?.name}, ${activeFarm?.order?.product?.location?.state}`}
          </Text>
        </Box>
      </Flex>

      <Box>
        <Text color='gray.500'>{timestamp}</Text>
      </Box>
    </Flex>
  )

  return (
    <FarmBoardCardWrapper status={status}>
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
