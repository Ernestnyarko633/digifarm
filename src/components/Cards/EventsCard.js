import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Avatar, Image, Heading, Text } from '@chakra-ui/react'
import Button from 'components/Button'

const EventsCard = ({
  bg,
  rounded,
  boxShadow,
  w,
  h,
  mr,
  ml,
  p,
  image,
  avatarSize,
  avatarBgSize,
  boxSize = 100,
  ...rest
}) => {
  return (
    <Box>
      <Flex justify='center'>
        <Box
          {...rest}
          boxShadow={boxShadow || '0px 0px 15px 5px #ccc'}
          rounded={rounded || 15}
          bg={
            bg ||
            'linear-gradient(to right, rgba(147, 207, 136, 1) 0%, rgba(120, 186, 109, 1) 100%, rgba(190, 162, 80, 1) 100%)'
          }
          colorScheme='linear'
          w={w || '100%'}
          h={h || '100%'}
          mr={mr}
          ml={ml}
          p={8}
        >
          <Box>
            <Flex mb={4} direction='row' align='center'>
              <Box>
                <Box
                  as={Avatar}
                  boxSize={boxSize}
                  mr={3}
                  bgSize={avatarBgSize}
                  size={avatarSize}
                  bg='gray.100'
                >
                  <Image src={image} />
                </Box>
              </Box>
              <Box pb={4}>
                <Heading as='h6' fontSize='md' color='white'>
                  Soya Bean Farm
                </Heading>
                <Text mb={1} pb={4} fontSize='xs' color='#fff' mt={{ md: -2 }}>
                  Agyata, Eastern Region
                </Text>

                <Button borderColor='#fff' borderWidth={3} btntitle='Check it out' />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

EventsCard.propTypes = {
  bg: PropTypes.any,
  rounded: PropTypes.any,
  boxShadow: PropTypes.any,
  w: PropTypes.any,
  h: PropTypes.any,
  mr: PropTypes.any,
  ml: PropTypes.any,
  p: PropTypes.any,
  image: PropTypes.any,
  avatarSize: PropTypes.any,
  avatarBgSize: PropTypes.any,
  boxSize: PropTypes.any
}

export default EventsCard
