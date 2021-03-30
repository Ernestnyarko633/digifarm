import React from 'react'
import ModalWrapper from './ModalWrapper'
import { Box, Heading, Flex, Grid, Image, Text, Button } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import Doc from 'assets/images/doc.png'
const TasksDocuments = ({ open, onClose, data }) => {
  return (
    <ModalWrapper isCentered isOpen={open} onClose={onClose} size='3xl'>
      {data?.length > 0 && (
        <Box w='100%'>
          <Flex
            align='center'
            justify='center'
            borderBottomWidth={1}
            borderBottomColor='gray.200'
            px={{ md: 8 }}
            w='100%'
          >
            <Heading as='h3' fontSize='4xl' fontWeight={800}>
              Documents
            </Heading>
          </Flex>
          <Grid w='100%' templateColumns={{ md: 'repeat(3, 1fr)' }}>
            {data?.map((pdf, index) => {
              return (
                <Button
                  as={Flex}
                  key={pdf.url}
                  w='100%'
                  h='auto'
                  rounded='xl'
                  shadow='md'
                  p={10}
                  bg='white'
                  justify={{ md: 'center' }}
                  align={{ md: 'center' }}
                  direction={{ md: 'column' }}
                  m={{ md: 5 }}
                >
                  <Image src={Doc} w='900px' h='100%' />
                  <Text fontSize={{ md: '4xl' }}>{index + 1}</Text>
                </Button>
              )
            })}
          </Grid>
        </Box>
      )}
      {data.length === 0 && (
        <Flex
          w='100%'
          h='390px'
          bg='white'
          rounded='lg'
          filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
          align='center'
          justify='center'
        >
          <Text fontSize='xl' color='cf.400'>
            NO DOCUMENT CURRENTLY AVAILABLE FOR THIS TASK
          </Text>
        </Flex>
      )}
    </ModalWrapper>
  )
}

TasksDocuments.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.object
}
export default TasksDocuments
