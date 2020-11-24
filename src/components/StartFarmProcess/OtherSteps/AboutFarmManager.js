import React from 'react'
import { Avatar, Box, Divider, Flex, Grid, Heading, Icon, Image, ListItem, Text, UnorderedList } from '@chakra-ui/core'
import { Button } from 'components'
import { locationMarker } from 'theme/Icons'
import Prismic from 'prismic-javascript'
//import { RichText, KeyText } from 'prismic-reactjs'


const AboutFarmManager = () => {
  // In prismic-configuration.js
  const apiEndpoint = 'https://completefarmer.cdn.prismic.io/api/v2'
  const accessToken = 'MC5YeEo2RXhFQUFDTUF3dTVf.77-977-9CEBM77-977-9RAQG77-9ZwwhKCvvv70wB--_vRRJAGnvv73vv70RYO-_vTHvv73vv70' // This is where you would add your access token for a Private repository

  const Client = Prismic.client(apiEndpoint, { accessToken })

  const [doc, setDocData] = React.useState(null)

React.useEffect(() => {
  const fetchData = async () => {
    const response = await Client.query(
      Prismic.Predicates.at('document.type', 'farm_managers')
    )
    if (response) {
      setDocData(response.results[0])
    }
  }
  fetchData()
}, [])

console.log('data', doc)
// // Link Resolver
// linkResolver(doc) {
//   // Define the url depending on the document type
//   if (doc.type === 'page') {
//     return '/page/' + doc.uid;
//   } else if (doc.type === 'blog_post') {
//     return '/blog/' + doc.uid;
//   }

//   // Default to homepage
//   return '/';
// }



return (
    <Grid 
      templateColumns='repeat(2, 1fr)' 
    >
    <Box px={20} pt={20} borderRightColor='gray.400' borderRightWidth={2}>
      <Box>
      <Image h='10%' src={require('../../../assets/images/ginger.png').default}/>
      </Box>
      <Box mt={10} pt={10} textAlign='center'>
        <Heading pb={5} as='h5' size='md'>What is included in this farm</Heading>
        <Flex align="center" justify='space-around' fontSize="xs" >
            <Flex mx={5}>
              <Image src={require('../../../assets/images/update.png').default} boxSize={6} alt="update icon" />
              <Text ml={1}>Farm Updates</Text>
            </Flex>
            <Flex mx={5}>
              <Image src={require('../../../assets/images/support.png').default} boxSize={6} alt="support icon" />
              <Text ml={1}>Support</Text>
            </Flex>
            <Flex mx={5}>
              <Image src={require('../../../assets/images/visit.png').default} boxSize={6} alt="visit icon" />
              <Text ml={1}>Scheduled Farm Visits</Text>
            </Flex>
          </Flex>
      </Box>
    </Box>
  <Box>
    <Box pt={10} px={20} bor>
      <Box py={4}>
      <Heading as='h2' size='lg'>Ginger</Heading>
      <Flex fontSize='sm'>
        <Icon as={locationMarker} color='gray.400' boxSize={4} mx={2}/>
        Afram Plains, Easten Region 
        <Image mx={2} src={require('../../../assets/images/ic_info.png').default} boxSize={4} alt="update icon" />
        </Flex>
      </Box>
      <Divider/>
      <Box py={5}>
      <Heading pb={5} as='h5' size='md' >Here's your farm manager</Heading>
      <Box 
        borderColor='gray.400' 
        p={5}
        borderWidth={1}
        rounded='md'
      >
      <Grid templateColumns='repeat(2, 1fr)'>
        <Box py={10} px={2}>
        <Avatar  src='https://bit.ly/code-beast' size={8} justify='space-around'/>
        </Box>
        <Box m={5}>
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
          <UnorderedList fontSize='xs' textColor='gray.400'>
            <ListItem >Expertise in ginger farming for 5 years</ListItem>
            <ListItem >Expertise in ginger farming for 5 years</ListItem>
            <ListItem >Expertise in ginger farming for 5 years</ListItem>
            <ListItem >Expertise in ginger farming for 5 years</ListItem>
            <ListItem >Expertise in ginger farming for 5 years</ListItem>
          </UnorderedList>
        </Box>
        </Box>
      </Grid>
      </Box>
      </Box>
    </Box>
    <Box mt={5} ml={80}>
      <Button 
        btntitle='Continue' 
        fontSize='md' 
        px={40}
        py={30}
      />
    </Box>
    </Box>
    </Grid>
    

)
}

export default AboutFarmManager
