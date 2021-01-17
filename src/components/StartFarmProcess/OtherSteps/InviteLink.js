import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Input,
  Text,
  useClipboard
} from '@chakra-ui/react'
import Button from 'components/Button'
import { FormInput } from 'components/Form'
import ImageUpload from 'components/Form/ImageUpload'
import { motion } from 'framer-motion'
import React from 'react'
import { Schedule, Support, Update } from 'theme/Icons'

const MotionGrid = motion.custom(Grid)

const InviteLink = () => {
  const [files, setFiles] = React.useState([])
  const [value] = React.useState('http://completefarmer.com//djjgo49950-2')
  const { hasCopied, onCopy } = useClipboard(value)

  return (
    <MotionGrid layout templateColumns={{ md: 'repeat(2, 1fr)' }}>
      <GridItem>
        <Flex align='center' justify='center' mt={16}>
          <Image
            w={108}
            src={require('../../../assets/images/invite.png').default}
          />
        </Flex>

        <Flex
          align='center'
          justify='space-between'
          mt={{ md: 20 }}
          px={{ md: 10 }}
        >
          <Box textAlign='center' w={{ md: '100%' }} px={8}>
            <Heading as='h6' fontSize='md' mb={3}>
              What is included in this farm
            </Heading>
            <Flex justify='space-between' align='center' fontSize='sm'>
              <Flex align='center'>
                <Icon as={Update} color='cf.400' boxSize={5} />
                <Text ml={1}>Farm Updates</Text>
              </Flex>
              <Flex align='center' px={4}>
                <Icon as={Support} color='cf.400' boxSize={5} />
                <Text ml={1}>Support</Text>
              </Flex>
              <Flex align='center'>
                <Icon as={Schedule} color='cf.400' boxSize={5} />
                <Text ml={1}>Scheduled Farm Visits</Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </GridItem>
      <GridItem
        borderLeftWidth={1}
        borderLeftColor='gray.300'
        overflowY='scroll'
        css={{
          direction: 'rtl',
          scrollbarColor: 'rebeccapurple',
          scrollBehavior: 'smooth'
        }}
        mb={10}
      >
        <Box css={{ direction: 'ltr' }} py={{ md: 10 }} px={{ md: 16 }}>
          <Box py={4}>
            <Heading as='h5' size='sm'>
              What would you like to call this farm?
            </Heading>

            <Box mt={6}>
              <FormInput
                bg='white'
                label='Farm name'
                placeholder='For eg: Ashesi2020'
              />
            </Box>

            <Box mt={16}>
              <Heading as='h5' size='sm'>
                Upload your profile image
              </Heading>
              <Box mt={6}>
                <ImageUpload files={files} setFiles={setFiles} />
              </Box>
            </Box>

            <Box mt={16}>
              <Heading as='h5' size='sm'>
                Invite your cooperative members
              </Heading>

              <Box mt={6}>
                <FormInput
                  bg='white'
                  placeholder='Add people (Max of 5 and min of 2)'
                />
              </Box>

              <Flex align='center' mt={6}>
                <Avatar
                  pos='relative'
                  src={require('../../../assets/images/Oval.png').default}
                >
                  <AvatarBadge
                    pos='absolute'
                    top={-2}
                    boxSize='1em'
                    bg='cf.600'
                  />
                </Avatar>

                <Box ml={4}>
                  <Text>Joe Biney Stews</Text>
                  <Text fontSize='sm' color='cf.400' mt={-2}>
                    Admin
                  </Text>
                </Box>
              </Flex>
            </Box>

            <Divider orientation='horizontal' borderColor='gray.300' my={12} />

            <Box>
              <Heading as='h5' size='sm'>
                Get link
              </Heading>

              <Flex align='center' mt={6}>
                <Box>
                  <Input
                    rounded='30px'
                    h={12}
                    bg='gray.100'
                    borderWidth='0px'
                    value={value}
                    color='gray.400'
                    w={80}
                    isReadOnly
                  />
                </Box>
                <Button
                  btntitle={hasCopied ? 'Link copied' : 'Share link'}
                  rounded='30px'
                  borderWidth={1}
                  borderColor='gray.800'
                  bg='white'
                  color='gray.800'
                  _hover={{ bg: 'white' }}
                  h={12}
                  w={40}
                  ml={3}
                  onClick={onCopy}
                  shadow='none'
                />
              </Flex>
            </Box>
          </Box>
        </Box>
      </GridItem>
    </MotionGrid>
  )
}

export default InviteLink
