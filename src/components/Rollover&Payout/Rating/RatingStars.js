import React from 'react'
import { Box, Icon, Flex, Text } from '@chakra-ui/react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import useRollover from 'context/rollover'

const RatingStars = () => {
  const { ratings, setRatings } = useRollover()

  const mapKey = i => i

  const getRatingText = value => {
    switch (value) {
      case 1:
        return 'Poor'
      case 2:
        return 'Alright'
      case 3:
        return 'Good'
      case 4:
        return 'Very good'
      case 5:
        return 'Excellent'
      default:
        return ''
    }
  }
  return (
    <Flex dir='row' align='center' justify='flex-start' w='100%' h='100%'>
      {[...Array(5)].map((m, i) => {
        return (
          <Box px={{ md: 2 }} key={mapKey(i)}>
            <Icon
              cursor='pointer'
              onClick={() => setRatings(i + 1)}
              color={ratings >= i + 1 ? 'cf.400' : 'gray.200'}
              boxSize={12}
              as={ratings >= i + 1 ? AiFillStar : AiOutlineStar}
            />
          </Box>
        )
      })}

      {
        <Text px={{ md: 5 }} fontWeight={700} fontSize={{ md: 'lg' }}>
          {getRatingText(ratings)}
        </Text>
      }
    </Flex>
  )
}

RatingStars.propTypes = {
  // count: PropTypes.number,
  // onChange: PropTypes.func,
  // size: PropTypes.any,
  // activeColor: PropTypes.any
}

export default RatingStars
