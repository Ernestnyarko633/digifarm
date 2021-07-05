/* eslint-disable no-console */
import React from 'react'
import {
  Grid,
  Box,
  GridItem,
  Flex,
  Image,
  Heading,
  Text,
  useToast
} from '@chakra-ui/react'
import Button from 'components/Button'
import { motion } from 'framer-motion'
import { FormTextArea } from 'components/Form'
import RatingStars from 'components/Rollover&Payout/Rating/RatingStars'
import useRollover from 'context/rollover'
import { useFormik } from 'formik'
import useApi from 'context/api'
const MotionGrid = motion(Grid)

const PayoutReview = () => {
  const { ratings, setBigStepper } = useRollover()
  const { submitReview } = useApi()

  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      comment: ''
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true)
        setBigStepper(p => p + 1)
        const res = await submitReview({
          ratings: ratings,
          comment: values.comment
        })
        toast({
          title: 'Review Submitted successfully',
          description: res.message,
          status: 'success',
          duration: 5000,
          position: 'top-right'
        })
      } catch (error) {
        toast({
          status: 'error',
          duration: 5000,
          position: 'top-right',
          title: 'Error occured',
          description: error.message
        })
      } finally {
        setSubmitting(false)
      }
    }
  })

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting
  } = formik

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
        w={{ base: '100%', xl: '50%' }}
        overflowY='hidden'
        px={{ base: 1, lg: 14 }}
        py={{ base: 5, lg: 20 }}
        h={{ base: '100%', md: 'auto' }}
      >
        <form style={{ width: '100%', height: '100%' }} onSubmit={handleSubmit}>
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
              about 7 business days so relax and when the time is up we’ll
              notify you on what to do. Thank you.
            </Heading>

            <Box
              p={{ base: 4, md: 6, lg: 10 }}
              rounded={15}
              borderWidth={{ base: 1, md: 0, lg: 1 }}
              borderColor='gray.200'
              h={{ md: '80%' }}
              w='100%'
            >
              <Heading as='h4' fontSize='lg'>
                How would you like rate your experience with this app?
              </Heading>
              <Flex
                direction='row'
                justify='center'
                w='100%'
                textAlign={{ base: 'center', md: 'auto' }}
                mt={{ md: 10 }}
              >
                <RatingStars />
              </Flex>

              <Box mt={{ md: 10 }} mb={{ md: 5 }}>
                <Text>Any comment (Optional)</Text>
                <FormTextArea
                  onChange={handleChange}
                  error={errors.comment}
                  onBlur={handleBlur}
                  value={values.comment}
                  touched={touched.comment}
                  backgroundColor='#F4F4F6'
                  placeholder='Type message'
                  borderBottomColor={{ md: 'gray.100' }}
                />
              </Box>
            </Box>
          </Grid>
          <Button
            display={{ base: 'block', lg: 'flex' }}
            textAlign='center'
            btntitle='Submit'
            type='Submit'
            borderColor='cf.green'
            color='white'
            fontWeight={900}
            rounded={30}
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            w={{ base: '100%', md: '45%' }}
            h={55}
            fontSize={{ base: 'sm', xl: 'md' }}
          />
        </form>
      </GridItem>
    </MotionGrid>
  )
}

export default PayoutReview
