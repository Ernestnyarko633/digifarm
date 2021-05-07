import React from 'react'

import Header from 'components/Utils/Header'

import { Flex, Image, Box, Text, Heading, Link, Icon } from '@chakra-ui/react'
import Background from 'assets/images/bgx2.png'

import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'

const Banner = () => {
  document.title = 'Complete Farmer Digital Farmer | Coming Soon'
  return (
    <Flex w='100vw' h='100vh' bg='cf.800'>
      <Box>
        <Header />
      </Box>
      <Image w='100%' h='100%' fit='cover' src={Background} />
      <Box pos='absolute' top={100} w='100%' h='50%'>
        <Flex w='100%' justify='center' align='center'>
          <Flex
            w={{ md: 120 }}
            textAlign='center'
            direction='column'
            mt={10}
            px={{ base: 4, md: 0 }}
          >
            <Heading
              as='h3'
              color='#022D2B'
              fontSize={{ base: '3xl', md: '6xl' }}
              dangerouslySetInnerHTML={{ __html: 'Coming Soon!' }}
            />

            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              dangerouslySetInnerHTML={{
                __html:
                  'Please wait patiently as we set up our farms to enable you farm the revolutionized way and make profit from the comfort of your home.'
              }}
            />
          </Flex>
        </Flex>
      </Box>

      {/* <Box
        pos='absolute'
        w='100%'
        bottom={0}
        h={{ md: '100px', xl: '100px' }}
        justify='space-between'
        align='center'
      >
        <Flex
          w='100%'
          py={{ base: 5, md: 0 }}
          h='100%'
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          align='center'
        >
          <Flex
            w={{ base: '80%', xl: '85%' }}
            px={{ md: 20 }}
            h='100%'
            justify='flex-start'
            align='center'
            direction={{ base: 'column', xl: 'row' }}
            pt={{ md: 5, xl: 0 }}
          >
            <Box w='100%'>
              <Text fontSize={{ base: 'sm', md: 'lg' }}>
                ©2021 Completefarmer. All rights reserved
              </Text>
            </Box>
            <Flex
              w={{ base: '80%', md: '100%', xl: '100%' }}
              justify={{ base: 'center', xl: 'flex-end' }}
              align={{ md: 'center' }}
            >
              <Link
                m={{ xl: 10 }}
                mx={{ base: 2, xl: 0 }}
                href='https://www.completefarmer.com/terms-and-conditions'
              >
                <Flex>
                  <Text fontSize={{ base: 'sm', md: 'lg' }}>
                    Terms & Conditions
                  </Text>
                </Flex>
              </Link>

              <Link
                m={{ xl: 5 }}
                href='https://www.completefarmer.com/privacy-policy'
              >
                <Flex>
                  <Text fontSize={{ base: 'sm', md: 'lg' }}>
                    Privacy Policy
                  </Text>
                </Flex>
              </Link>
            </Flex>
          </Flex>
          <Flex
            w={{ base: '40%', md: '30%', xl: '10%' }}
            px={{ md: 20 }}
            pt={{ base: 5, md: 0 }}
            h='100%'
            align='center'
            justify={{ base: 'space-between', md: 'flex-end' }}
            direction='row'
          >
            <Box
              m={{ md: 5 }}
              as={Link}
              href='https://www.instagram.com/completefarmer'
              w={{ xl: '33.33%' }}
            >
              <Icon as={AiOutlineInstagram} boxSize={8} />
            </Box>
            <Box
              w={{ xl: '33.33%' }}
              m={{ md: 5 }}
              as={Link}
              href='https://web.facebook.com/CompleteFarmer/'
            >
              <Icon as={AiFillFacebook} boxSize={8} />
            </Box>
            <Box
              w={{ xl: '33.33%' }}
              m={{ md: 5 }}
              as={Link}
              href='https://www.linkedin.com/company/completefarmer/mycompany/'
            >
              <Icon as={AiFillLinkedin} boxSize={8} />
            </Box>
          </Flex>
        </Flex>
      </Box> */}
      <Box w='100%' pos='absolute' bottom={0}>
        <Flex
          align={{ lg: 'center' }}
          justify={{ base: 'center', lg: 'space-between' }}
          bg='rgba(0, 76, 70, 0.1)'
          w='100%'
          h={{ base: 20, md: 16 }}
          mt='auto'
          px={{ base: 6, md: 20 }}
          fontSize='sm'
          direction={{ base: 'column', lg: 'row' }}
          textAlign={{ base: 'center', md: 'inherit' }}
        >
          <Text fontSize='inherit'>
            &copy; 2021 Completefarmer. All rights reserved
          </Text>

          <Flex align='center' d={{ base: 'none', lg: 'flex' }}>
            <Link
              isExternal
              href='https://www.completefarmer.com/terms/'
              rel='noreferrer'
              px={{ md: 4 }}
              _focus={{ textDecor: 'none' }}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              isExternal
              href='https://www.completefarmer.com/privacy-policy'
              rel='noreferrer'
              px={{ md: 4 }}
              _focus={{ textDecor: 'none' }}
            >
              Privacy Policy
            </Link>

            <Link
              isExternal
              href='https://twitter.com/completefarmer'
              rel='noreferrer'
              px={{ md: 2 }}
              _focus={{ textDecor: 'none' }}
              color='gray.600'
            >
              <Icon as={FaInstagramSquare} boxSize={5} />
            </Link>

            <Link
              isExternal
              href='https://www.facebook.com/CompleteFarmer/'
              rel='noreferrer'
              px={{ md: 2 }}
              _focus={{ textDecor: 'none' }}
              color='gray.600'
            >
              <Icon as={FaFacebookSquare} boxSize={5} />
            </Link>

            <Link
              isExternal
              href='https://www.instagram.com/completefarmer'
              rel='noreferrer'
              px={{ md: 2 }}
              _focus={{ textDecor: 'none' }}
              color='gray.600'
            >
              <Icon as={FaLinkedin} boxSize={5} />
            </Link>
          </Flex>

          <Flex
            align='center'
            justify='space-between'
            d={{ base: 'flex', lg: 'none' }}
            direction={{ base: 'column', md: 'row' }}
          >
            <Box>
              <Link
                isExternal
                href='https://www.completefarmer.com/terms/'
                rel='noreferrer'
                pr={{ base: 2, md: 4 }}
                _focus={{ textDecor: 'none' }}
              >
                Terms &amp; Conditions
              </Link>
              <Link
                isExternal
                href='https://www.completefarmer.com/privacy-policy'
                rel='noreferrer'
                px={{ md: 4 }}
                _focus={{ textDecor: 'none' }}
              >
                Privacy Policy
              </Link>
            </Box>

            <Box>
              <Link
                isExternal
                href='https://www.instagram.com/completefarmer'
                rel='noreferrer'
                px={{ md: 2 }}
                _focus={{ textDecor: 'none' }}
                color='gray.600'
              >
                <Icon as={FaInstagramSquare} boxSize={5} />
              </Link>

              <Link
                isExternal
                href='https://www.facebook.com/CompleteFarmer/'
                rel='noreferrer'
                px={{ md: 2 }}
                _focus={{ textDecor: 'none' }}
                color='gray.600'
              >
                <Icon as={FaFacebookSquare} boxSize={5} />
              </Link>

              <Link
                isExternal
                href='https://www.linkedin.com/company/completefarmer/mycompany/'
                rel='noreferrer'
                px={{ md: 2 }}
                _focus={{ textDecor: 'none' }}
                color='gray.600'
              >
                <Icon as={FaLinkedin} boxSize={5} />
              </Link>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Banner
