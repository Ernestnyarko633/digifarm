import React from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { RiShareForwardLine } from 'react-icons/ri'
import useComponent from 'context/component'
import { BsHeart } from 'react-icons/bs'

const FarmBoardCardWrapper = ({ children, status }) => {
  const { handleModalClick } = useComponent()
  return (
    <Box
      rounded='xl'
      w={{ base: 82, md: '80%' }}
      mx='auto'
      bg='white'
      mb={10}
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
    >
      {children}
      <Flex
        align='center'
        py={{
          base: 4,
          md: status !== 'news' && status !== 'weekly_videos' && 6
        }}
        pb={{
          base: 4,
          md: status === 'news' || status === 'action' ? 6 : 8
        }}
        px={{ base: 4, md: 16 }}
      >
        {status !== 'news' && status !== 'weekly_videos' && (
          <Flex>
            <Box>
              <Icon as={BsHeart} mr={2} boxSize={5} />
            </Box>
            <Text>123</Text>
          </Flex>
        )}

        <Box textAlign='right' w='100%' ml={{ md: 6 }}>
          <Icon
            boxSize={6}
            as={RiShareForwardLine}
            onClick={
              () => handleModalClick('share', {})
              // eslint-disable-next-line react/jsx-curly-newline
            }
          />
        </Box>
      </Flex>
    </Box>
  )
}

FarmBoardCardWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  status: PropTypes.any
}

export default FarmBoardCardWrapper
