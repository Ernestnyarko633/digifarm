import { Box, Divider, Image, List, ListItem, Text } from '@chakra-ui/react'
import useComponents from 'context/component'
import React from 'react'
import ModalWrapper from './ModalWrapper'

const LearnMoreModal = () => {
  const { isOpen, onClose } = useComponents()
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title='Discover agriculture as a Digital farmer'
      isCentered
    >
      <Box>
        <Image src={require('../../assets/images/video-img.png').default} />
      </Box>

      <Box my={10}>
        <Box>
          <Text>Farm as an Individual</Text>
          <Divider orientation='horizontal' borderColor='gray.200' my={3} />
          <Text fontSize='xs' color='gray.500'>
            Farm as an Individual
          </Text>
          <Divider orientation='horizontal' borderColor='gray.200' my={3} />
        </Box>

        <Box>
          <Text fontWeight='bold' fontSize='lg'>
            Benefits to you
          </Text>
          <List listStyleType='none' fontSize='sm'>
            <ListItem>Manage farm</ListItem>
            <ListItem>Earn rewards</ListItem>
            <ListItem>Schedule farm visits</ListItem>
            <ListItem>Receive continuous farm updates</ListItem>
          </List>
        </Box>
      </Box>
    </ModalWrapper>
  )
}

export default LearnMoreModal
