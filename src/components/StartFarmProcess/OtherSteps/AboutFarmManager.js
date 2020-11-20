import React from 'react'
import { Avatar, Box, Divider, Flex, Grid, Heading, Icon, Image, ListItem, Text, UnorderedList } from '@chakra-ui/core'


const AboutFarmManager = () => {
return (
    <Grid 
      templateColumns='repeat(2, 1fr)' 
    >
    <Box py={40} px={10}>
      <Box p={10}>
      <Image h='10%' src={require('../../../assets/images/ginger.png').default}/>
      </Box>
      <Box textAlign='center'>
        <Heading pb={5} as='h5' size='md'>What is included in this farm</Heading>
        <Flex>
        <Text px={5}><Icon mx={2}/>Farm updates</Text>
        <Text px={5}><Icon mx={2}/>Support</Text>
        <Text px={5}><Icon mx={2}/>Scheduled farm visits</Text>
        </Flex>
      </Box>
    </Box>
 {/* <Divider orientation='vertical'/> */}
    <Box py={20} px={20}>
      <Box py={4}>
      <Heading as='h2' size='lg'>Ginger</Heading>
      <Text>
        <Icon mx={2}/>
        Afram Plains, Easten Region 
        <Icon mx={2}/>
        </Text>
      </Box>
      <Divider/>
      <Box py={5}>
      <Heading pb={5} as='h5' size='md' >Here's your farm manager</Heading>
      <Box 
        borderColor='gray.400' 
        py={10}
        borderWidth={1}
        rounded='md'
      >
      <Grid templateColumns='repeat(3, 1fr)' justify='space-between' >
        <Avatar size={40} ml={10} mr={15} my={6}/>
        <Box my={10} ml={10}>
          <Text fontSize='md' fontWeight='800'> Clause Agyemang</Text>
          <Text fontSize='sm'>Farm Manager</Text>
          <Divider  
            orientation='horizontal'
            borderColor='gray.300'
            w={60}
            my={5}
          />
        <Text>Manager Profile</Text>
        <Box> 
          <UnorderedList >
            <ListItem fontSize='sm'>Expertise in ginger farming for 5 years</ListItem>
           
            </UnorderedList>
        </Box>
        </Box>
      </Grid>
      </Box>
      </Box>
    </Box>
    </Grid>


)
}

export default AboutFarmManager
