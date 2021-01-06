import React from 'react';
import {
  Box,
  Heading,
  Flex,
  Grid,
  Text,
  Button,
  useToast,
  Container,
  Divider,
  Avatar,
  Input,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { FormInput, FormTextArea } from 'components/Form';

const AccountSettings = () => {
  return (
    <Container maxW='4xl'>
      <Formik
        enableReinitialize
        // initialValues={initialValues}
        // onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, isSubmitting, errors }) => (
          <form>
            <Box p={10} rounded='md' bg='white'>
              <Heading as='h4' fontSize={{ md: '3xl' }} mb={4}>
                Account settings
              </Heading>
              <Flex align='center'>
                <Text fontSize='md'>
                  Set your login preferences, help us personalize your
                  experience and make big account changes here
                </Text>
                <Flex align='center' ml={10}>
                  <Button rounded='30px' w={40} h={12} shadow='sm'>
                    Cancel
                  </Button>
                  <Button
                    colorScheme='linear'
                    rounded='30px'
                    w={40}
                    h={12}
                    shadow='sm'
                    ml={4}
                    type='submit'
                    isLoading={isSubmitting}
                  >
                    Save
                  </Button>
                </Flex>
              </Flex>
            </Box>

            <Divider
              orientation='vertical'
              borderBottomWidth={1}
              borderBottomColor='gray.200'
              my={12}
            />
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default AccountSettings;
