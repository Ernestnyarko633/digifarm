import React from 'react'
import { Box, Container, Flex, Heading, Text, Avatar } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import useSlider from 'hooks/useSlider'
import { shuffle } from 'helpers/misc'

const CustomerStories = ({ stories, color = 'cf.400' }) => {
  const randomArray = shuffle(stories, 3, 'uid')

  const { offset, setOffset } = useSlider({
    total: randomArray.length,
    enabled: true,
    useLoaded: false,
    speed: 15000
  })

  return (
    <Box
      bg='gray.50'
      u
      py={20}
      pos='relative'
      overflow='hidden'
      h={{ base: 127, md: 122 }}
    >
      <Container maxW='4xl' textAlign='center'>
        <Box mb={{ base: 6, md: 10 }}>
          <Heading as='h3' fontSize={{ base: '2xl', md: '4xl' }}>
            Together, we are digitizing the{' '}
            <Box as='br' d={{ base: 'none', md: 'block' }} />
            agriculture value chain
          </Heading>
        </Box>

        <Flex
          pos='absolute'
          top={{ base: 48, md: 56 }}
          left={0}
          h='100%'
          className='scroller'
          w={`${stories?.slice(0, 4).length * 100}vw`}
          mx='auto'
          transform={` translate3d(-${offset * 100}vw, 0, 0)`}
        >
          {stories?.slice(0, 4).map((item, idx) => (
            <Container maxW='4xl' mx='auto' key={item?._id}>
              <Text
                key={item?._id}
                fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
              >
                "{item.data.testimonials[0].text}"
              </Text>
            </Container>
          ))}
        </Flex>

        <Flex align='center' justify='center' mt={20}>
          {stories?.slice(0, 4).map((item, idx) => (
            <Box
              mt={{ base: 56, md: 24 }}
              pos='relative'
              mr={{ base: 4, md: 16 }}
              onClick={() => setOffset(idx)}
              key={item.id}
            >
              <Box mt={32} cursor='pointer'>
                <Avatar
                  src={item.data.image.url}
                  filter={idx === offset ? '' : 'grayscale(100%)'}
                />
                <Text
                  fontWeight='bold'
                  mt={4}
                  color={idx === offset ? color : ''}
                >
                  {item.data.name[0].text}
                </Text>
              </Box>
              <Box
                pos='absolute'
                left='50%'
                bottom={-20}
                borderLeftWidth={2}
                borderColor={idx === offset ? color : 'gray.200'}
                h={10}
                mb={10}
              />
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  )
}

CustomerStories.propTypes = {
  stories: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired
}

export default CustomerStories
