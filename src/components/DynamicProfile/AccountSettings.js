import React from 'react'
import { Box, Heading, Text, Container, Divider, Grid } from '@chakra-ui/react'
import { Formik } from 'formik'
import Headings from './Headings'
import ActionCard from 'components/Cards/ActionCard'

const AccountSettings = () => {
  return (
    <Container maxW='4xl'>
      <Formik enableReinitialize>
        {({ values, handleChange, handleBlur, isSubmitting, errors }) => (
          <form>
            <Headings title='Account settings' />
            <Divider orientation='horizontal' my={12} />
            <Box>
              <Box>
                <Box>
                  <Heading
                    as='h5'
                    fontFamily='display'
                    fontSize={{ base: 'xl', md: '2xl' }}
                    mb={2}
                  >
                    Language
                  </Heading>
                  <Text>English (US)</Text>
                </Box>
                <Box my={8}>
                  <Heading
                    as='h5'
                    fontFamily='display'
                    fontSize={{ base: 'xl', md: '2xl' }}
                    mb={2}
                  >
                    Time zone
                  </Heading>
                  <Text fontSize={{ base: 'sm', md: 'md' }}>GMT</Text>
                </Box>
              </Box>

              <Divider
                orientation='vertical'
                borderBottomWidth={1}
                borderBottomColor='gray.200'
                my={12}
              />

              <Grid gap={10} mt={10}>
                <ActionCard
                  title='Deactivate account'
                  text='Set your login preferences, help us personalize your
                      <br />
                      experience and make big account changes here'
                  btnText='Deactivate account'
                />
              </Grid>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  )
}

export default AccountSettings
