import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Text,
  Textarea
} from '@chakra-ui/react'
import React from 'react'
import { IoClose } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import Button from 'components/Button'

const MotionBox = motion.custom(Box)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

export default function ShareScreen({ isOpen, onClose, image }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionBox
          variants={{
            hidden: {
              opacity: 0,
              scale: 0.6
            },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.2, ...transition }
            }
          }}
          initial='hidden'
          animate='visible'
          exit='hidden'
          bg='white'
          minW='100vh'
          minH='100vh'
          pos='fixed'
          zIndex={99999999999}
          right={0}
          left={0}
          bottom={0}
          top={0}
        >
          <Box textAlign='center' my={12}>
            <Heading as='h4' fontSize={{ md: '2xl' }} fontWeight={800}>
              Share farm on Facebook
            </Heading>
          </Box>

          <Box
            as='button'
            role='button'
            aria-label='close button'
            pos='absolute'
            right={10}
            top={10}
            onClick={onClose}
          >
            <Icon as={IoClose} boxSize={6} />
          </Box>

          <Divider
            orientation='horizontal'
            w='100%'
            borderColor='gray.200'
            my={12}
          />

          <Box px={{ md: 32 }}>
            <Box borderWidth={1} borderColor='gray.200' rounded='lg' px={16}>
              <Grid templateColumns={{ md: 'repeat(6, 1fr)' }} gap={16}>
                <GridItem colSpan={4}>
                  <Box textAlign='center' py={16}>
                    <Heading as='h5' fontSize={{ md: 'xl' }} mb={6}>
                      Clinton’s farm view
                    </Heading>

                    <Box>
                      <Image w='100%' src={image} alt='screenshot' />
                    </Box>
                  </Box>
                </GridItem>

                <GridItem colSpan={2}>
                  <Box textAlign='center' py={16}>
                    <Heading as='h5' fontSize={{ md: 'xl' }} mb={6}>
                      Your message
                    </Heading>

                    <Box
                      borderWidth={1}
                      borderBottomWidth={0}
                      borderColor='gray.200'
                      mt={{ md: 48 }}
                      pt={3}
                    >
                      <Text textAlign='center' color='gray.500' px={{ md: 10 }}>
                        I am farming on Complete Farmer. Check out complete
                        Farmer now to start farming with your friends
                      </Text>

                      <Box mt={{ md: 12 }}>
                        <Textarea
                          borderWidth={0}
                          borderBottomWidth={2}
                          borderBottomColor='cf.800'
                          w='100%'
                          _focus={{ outline: 'none' }}
                          _hover={{ outline: 'none' }}
                          rounded={0}
                          resize='none'
                        />
                      </Box>
                    </Box>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </Box>

          <Flex align='center' justify='flex-end' px={{ md: 32 }} my={6}>
            <Button
              btntitle='Share on Facebook'
              rounded='30px'
              h={12}
              w={80}
              fontWeight={800}
              fontSize='md'
            />
          </Flex>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}

ShareScreen.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  image: PropTypes.string
}
