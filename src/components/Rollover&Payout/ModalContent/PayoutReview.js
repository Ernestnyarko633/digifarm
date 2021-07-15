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
import Time from 'assets/images/time.png'
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
        w={{ base: '100%', md: '50%' }}
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
          <Box bg='white' w={{ base: '12.5rem' }} h={{ base: '12.5rem' }}>
            <Image w='100%' h='100%' objectFit='cover' src={Time} />
          </Box>
        </Flex>
      </GridItem>
      <GridItem
        mt={{ md: 20 }}
        w={{ base: '100%', xl: '70%', '2xl': '100%' }}
        overflowY='hidden'
        px={{ base: 1, lg: 'auto' }}
        h={{ base: '100%', lg: '50vh', xl: '100%' }}
      >
        <Grid
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
          <Heading
            w={{ md: '100%', '3xl': '70%' }}
            mt={{ '2xl': 5 }}
            as='h3'
            textAlign={{ base: 'center', md: 'left' }}
            fontSize='xl'
            mb={{ base: 0, '2xl': 10 }}
          >
            Our team will be processing your request and this process takes
            about 7 business days so relax and when the time is up we’ll notify
            you on what to do. Thank you.
          </Heading>

          <Box
            display={{ base: 'flex', md: 'block' }}
            flexDirection='column'
            justifyContent='center'
            alignContent='center'
            p={{ base: 4, md: 2, '3xl': 12 }}
            px={{ '2xl': 12 }}
            py={{ md: 12, '2xl': 'auto' }}
            rounded={15}
            borderWidth={{ base: 1, md: 0, lg: 1 }}
            borderColor='gray.200'
            pb={{ base: 0, md: 2, '2xl': 10 }}
            h={{ md: '80%', xl: '60%', '2xl': '90%', '3xl': '100%' }}
            w={{ base: '100%', xl: '80%', '3xl': '70%' }}
          >
            <Heading
              w='100%'
              textAlign={{ base: 'center', md: 'left' }}
              as='h4'
              fontSize={{ '2xl': 'sm', '3xl': 'lg' }}
            >
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

            <Box textAlign='left' w='100%' mt={{ md: 3 }}>
              <Text textAlign={{ base: 'center', md: 'left' }}>
                Any comment (Optional)
              </Text>
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
        <Flex
          w={{ base: '100%', md: '90%' }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Button
            mr={{ md: 3 }}
            bg='white'
            display={{ base: 'block', lg: 'flex' }}
            mt={{ base: 10, md: 0, '2xl': 5, '3xl': 12 }}
            textAlign='center'
            borderWidth={1}
            btntitle='Skip'
            borderColor='gray.400'
            color='cf.400'
            fontWeight={900}
            rounded={30}
            onClick={async () => await handlePayout()}
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            w={{ base: '100%', md: '45%', '3xl': '30%' }}
            h={{ base: 50, '2xl': 55 }}
            fontSize={{ base: 'sm', xl: 'md' }}
          />
          <Button
            display={{ base: 'block', lg: 'flex' }}
            mt={{ base: 10, md: 0, '2xl': 5, '3xl': 12 }}
            textAlign='center'
            btntitle='Submit'
            borderColor='cf.green'
            color='white'
            fontWeight={900}
            rounded={30}
            onClick={async () => await handlePayout()}
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            w={{ base: '100%', md: '45%', '3xl': '30%' }}
            h={{ base: 50, '2xl': 55 }}
            fontSize={{ base: 'sm', xl: 'md' }}
          />
        </Flex>
      </GridItem>
    </MotionGrid>
  )
}

export default PayoutReview
