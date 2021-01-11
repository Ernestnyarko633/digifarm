import React from 'react'
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  ListItem,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import { Support, Schedule, Update, location } from 'theme/Icons'
import Prismic from 'prismic-javascript'
import { motion } from 'framer-motion'
// import { RichText, KeyText } from 'prismic-reactjs'

const MotionGrid = motion.custom(Grid)

const AboutFarmManager = () => {
  // In prismic-configuration.js
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN // This is where you would add your access token for a Private repository

  const Client = Prismic.client(apiEndpoint, { accessToken })

  const [doc, setDocData] = React.useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query(Prismic.Predicates.at('document.type', 'farm_managers'))
      if (response) {
        setDocData(response.results[0])
      }
    }
    fetchData()
  }, [Client])

  return (
    <MotionGrid layout templateColumns='repeat(2, 1fr)'>
      <Box px={20} pt={20} borderRightColor='gray.400' borderRightWidth={2}>
        <Box>
          <Image h='10%' src={require('../../../assets/images/ginger.png').default} />
        </Box>
        <Flex direction='column' align='center' justify='space-between' mt={{ md: 20 }}>
          <Heading as='h6' fontSize='md' mb={3}>
            What is included in this farm
          </Heading>
          <Flex justify='space-between' align='center' fontSize='sm'>
            <Flex align='center'>
              <Icon as={Update} color='cf.400' boxSize={5} />
              <Text ml={1}>Farm Updates</Text>
            </Flex>
            <Flex align='center' mx={6}>
              <Icon as={Support} color='cf.400' boxSize={5} />
              <Text ml={1}>Support</Text>
            </Flex>
            <Flex align='center'>
              <Icon as={Schedule} color='cf.400' boxSize={5} />
              <Text ml={1}>Scheduled Farm Visits</Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Box>
        <Box pt={10} px={20} bor>
          <Box py={4}>
            <Heading as='h2' size='lg'>
              Ginger
            </Heading>
            <Flex fontSize='sm'>
              <Icon as={location} color='gray.400' boxSize={4} mx={2} />
              Afram Plains, Easten Region
              <Image
                mx={2}
                src={require('../../../assets/images/ic_info.png').default}
                boxSize={4}
                alt='update icon'
              />
            </Flex>
          </Box>
          <Divider />
          <Box py={5}>
            <Heading pb={5} as='h5' size='md'>
              Here's your farm manager
            </Heading>
            <Box borderColor='gray.400' p={5} borderWidth={1} rounded='md'>
              <>
                <Grid templateColumns='repeat(2, 1fr)'>
                  <Box py={10} px={2}>
                    <Avatar src={doc?.data?.manager_image.url} size={8} justify='space-around' />
                  </Box>
                  <Box m={5}>
                    <Text fontSize='md' fontWeight='800'>
                      {doc?.data?.full_name}
                    </Text>
                    <Text fontSize='sm'>Farm Manager</Text>
                    <Divider orientation='horizontal' borderColor='gray.300' w={60} my={5} />
                    <Text>Manager Profile</Text>
                    <Box>
                      <UnorderedList>
                        {doc?.data?.manager_profile?.map(item => (
                          <ListItem key={item.text} fontSize='xs' textColor='gray.400'>
                            {item.text}
                          </ListItem>
                        ))}
                      </UnorderedList>
                    </Box>
                  </Box>
                </Grid>
              </>
            </Box>
          </Box>
        </Box>
      </Box>
    </MotionGrid>
  )
}

export default AboutFarmManager
