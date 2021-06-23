import React from 'react'
import ModalWrapper from './ModalWrapper'
import {
  Box,
  Heading,
  Flex,
  Grid,
  Image,
  Text,
  Button,
  Icon
} from '@chakra-ui/react'
import { closeIcon } from 'theme/Icons'
import PropTypes from 'prop-types'
import Doc from 'assets/images/doc.png'

const previewModal = ({ data, setShown }) => (
  <Box
    bg='#fff'
    position='fixed'
    top='50%'
    left='50%'
    transform='translate(-50%, -50%)'
    m='auto'
    height='800px'
    width={{ md: '80%' }}
    zIndex='9999px'
    overflow='auto'
  >
    <Box pos='relative'>
      <Box position='absolute' right={0} top={4} pr={{ md: 6 }}>
        <Icon
          as={closeIcon}
          color='cf.green'
          boxSize={8}
          onClick={() => {
            setShown(false)
          }}
        />
      </Box>
      <iframe
        src={data?.url + '#toolbar=0'}
        title={data?.url}
        width='100%'
        height='800px'
      />
    </Box>
  </Box>
)
const TasksDocuments = ({ open, onClose, data }) => {
  const [shown, setShown] = React.useState(false)
  const [pdfs, setPdfs] = React.useState([])

  React.useEffect(() => {
    let array = []
    const res = () =>
      data?.forEach(feed => {
        let media = feed?.media?.filter(media => media.type === 'pdf')
        array.push(...media)
      })

    res()
    if (array.length > 0) {
      setPdfs(array)
    }
  }, [data])

  return (
    <ModalWrapper isCentered isOpen={open} onClose={onClose} size='3xl'>
      {pdfs?.length > 0 && (
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
            {pdfs?.map((pdf, index) => {
              return (
                <React.Fragment key={pdf.url}>
                  <Button
                    as={Flex}
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
                    onClick={() => setShown(true)}
                  >
                    <Image src={Doc} w='900px' h='100%' />
                    <Text fontSize={{ md: '4xl' }}>{index + 1}</Text>
                  </Button>
                  {shown && <previewModal data={pdf} setShown={setShown} />}
                </React.Fragment>
              )
            })}
          </Grid>
        </Box>
      )}
      {pdfs.length === 0 && (
        <Flex
          w='100%'
          h='390px'
          bg='white'
          rounded='lg'
          filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
          align='center'
          justify='center'
        >
          <Text fontSize='xl' color='cf.green'>
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
