import React from 'react'
import {
  Grid,
  Box,
  GridItem,
  Flex,
  Image,
  Heading,
  Text
} from '@chakra-ui/react'
import Button from 'components/Button'
import { motion } from 'framer-motion'
import { FormTextArea } from 'components/Form'
import RatingStars from 'components/Rollover&Payout/Rating/RatingStars'
import useRollover from 'context/rollover'
const MotionGrid = motion(Grid)

const PayoutReview = () => {
  const { comment, setComment, isSubmitting, handlePayout } = useRollover()

  const handleChange = e => {
    return setComment(e.target.value)
  }

  return (
    <MotionGrid
      display={{ base: 'flex' }}
      flexDir={{ base: 'column-reverse', md: 'row' }}
      w={{ base: '100%', xl: '75%' }}
      pt={{ md: 'auto' }}
      h={{ base: '90vh', md: '75vh', lg: 'auto' }}
      borderWidth={1}
      borderRadius={10}
      borderColor={{ base: 'transparent', md: 'gray.200' }}
      templateColumns={{ xl: '50% 50%', '2xl': 'repeat(2, 1fr)' }}
    >
      <GridItem
        display={{ base: 'none', md: 'flex' }}
        borderRightColor={{ base: 'transparent' }}
        borderRightWidth={{ md: 1 }}
        px={{ base: 2, md: 3, lg: 14 }}
        borderBottomWidth={{ base: 1, md: 0 }}
        py={{ base: 5, lg: 20 }}
        pt={{ md: 16 }}
        w={{ base: '100%', md: '30%' }}
        h={{ base: '75%', md: 'auto', lg: '80vh', xl: '90vh' }}
      >
        <Flex
          mt={{ md: 5 }}
          w='100%'
          dir='column'
          align='flex-start'
          justify='center'
          h='100%'
        >
          <Box bg='gray.500' w={{ base: '12.5rem' }} h={{ base: '12.5rem' }}>
            <Image w='100%' h='100%' objectFit='cover' src={null} />
          </Box>
        </Flex>
      </GridItem>
      <GridItem
        w={{ base: '100%', xl: '70%', '2xl': '100%' }}
        overflowY='hidden'
        pr={{ xl: 60 }}
        px={{ base: 1, lg: 'auto' }}
        py={{ base: 5, lg: 20 }}
        h={{ base: '100%', md: 'auto' }}
      >
        <Grid
          mt={{ md: 3 }}
          overflowY='scroll'
          css={{
            '&::-webkit-scrollbar': {
              width: '4px'
            },
            '&::-webkit-scrollbar-track': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray.200',
              borderRadius: '24px'
            }
          }}
          w='100%'
          h={{ base: '78%', lg: '85%', '2xl': '70%', '3xl': '80%' }}
          textAlign={{ base: 'center', md: 'auto' }}
        >
          <Heading as='h3' textAlign='left' fontSize='xl'>
            Our team will be processing your request and this process takes
            about 7 business days so relax and when the time is up we’ll notify
            you on what to do. Thank you.
          </Heading>

          <Box
            p={{ base: 4, md: 6, lg: 10 }}
            rounded={15}
            borderWidth={{ base: 1, md: 0, lg: 1 }}
            borderColor='gray.200'
            h={{ md: '80%' }}
            w='100%'
          >
            <Heading textAlign='left' as='h4' fontSize='lg'>
              How would you like rate your experience with this app?
            </Heading>
            <Flex
              direction='row'
              justify='center'
              w='100%'
              textAlign={{ base: 'center', md: 'auto' }}
              mt={{ md: 5 }}
            >
              <RatingStars />
            </Flex>

            <Box textAlign='left' mt={{ md: 10 }} mb={{ md: 5 }}>
              <Text>Any comment (Optional)</Text>
              <FormTextArea
                onChange={handleChange}
                value={comment}
                backgroundColor='#F4F4F6'
                placeholder='Type message'
                borderBottomColor={{ md: 'gray.100' }}
              />
            </Box>
          </Box>
        </Grid>
        <Button
          mt={{ md: 20 }}
          display={{ base: 'block', lg: 'flex' }}
          textAlign='center'
          btntitle='Submit'
          borderColor='cf.green'
          color='white'
          fontWeight={900}
          rounded={30}
          onClick={async () => await handlePayout()}
          isDisabled={isSubmitting}
          isLoading={isSubmitting}
          w={{ base: '100%', md: '45%' }}
          h={55}
          fontSize={{ base: 'sm', xl: 'md' }}
        />
      </GridItem>
    </MotionGrid>
  )
}

export default PayoutReview
