import React from 'react'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  // Stack,
  // Checkbox,
  Grid
} from '@chakra-ui/react'
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
                    fontSize={{ md: '2xl' }}
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
                    fontSize={{ md: '2xl' }}
                    mb={2}
                  >
                    Time zone
                  </Heading>
                  <Text>GMT</Text>
                </Box>

                {/* <Box>
                  <Heading
                    as='h5'
                    fontFamily='display'
                    fontSize={{ md: '2xl' }}
                    mb={2}
                  >
                    Gender
                  </Heading>
                  <RadioGroup>
                    <Stack direction='row'>
                      <Radio value='male' colorScheme='cfButton'>
                        Male
                      </Radio>
                      <Radio value='female' colorScheme='cfButton'>
                        Female
                      </Radio>
                      <Radio value='non-binary' colorScheme='cfButton'>
                        Non-binary
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Box> */}
              </Box>

              <Divider
                orientation='vertical'
                borderBottomWidth={1}
                borderBottomColor='gray.200'
                my={12}
              />

              {/* <Box> */}
              {/* <Box>
                  <Heading
                    as='h5'
                    fontSize={{ md: '2xl' }}
                    fontFamily='display'
                    mb={2}
                  >
                    Log in options
                  </Heading>
                  <Text>
                    Use your Google account, LinkedIn or Twitter <br />
                    account to log into Complete Farmer.
                  </Text>
                </Box> */}

              {/* <Stack mt={6}>
                  <Checkbox
                    size='lg'
                    colorScheme='cfButton'
                    borderColor='black'
                  >
                    Use your Google account to log in
                  </Checkbox>
                  <Checkbox
                    size='lg'
                    colorScheme='cfButton'
                    borderColor='black'
                  >
                    Use your Twitter account to log in
                  </Checkbox>
                  <Checkbox
                    size='lg'
                    colorScheme='cfButton'
                    borderColor='black'
                  >
                    Use your Facebook account to log in
                  </Checkbox>
                  <Checkbox
                    size='lg'
                    colorScheme='cfButton'
                    borderColor='black'
                  >
                    Use your LinkedIn account to log in
                  </Checkbox>
                </Stack> */}
              {/* </Box> */}

              {/* <Divider
                orientation='vertical'
                borderBottomWidth={1}
                borderBottomColor='gray.200'
                my={12}
              /> */}

              <Grid gap={10} mt={10}>
                <ActionCard
                  title='Deactivate account'
                  text='Set your login preferences, help us personalize your
                      <br />
                      experience and make big account changes here'
                  btnText='Deactivate account'
                />

                {/* <ActionCard
                  title='Close your account and account data'
                  text='Set your login preferences, help us personalize your
                      <br />
                      experience and make big account changes here'
                  btnText='Close account'
                /> */}
              </Grid>
            </Box>
          </form>
        )}
      </Formik>
    </Container>
  )
}

export default AccountSettings
