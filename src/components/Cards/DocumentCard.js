import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Flex, Icon, Image, IconButton } from '@chakra-ui/react'
import Receipt from 'assets/images/Receipt.svg'
import Contract from 'assets/images/Contract.svg'
import { arrowDown } from 'theme/Icons'

const DocumentCard = ({ title, description, link, mt }) => {
  const [shown, setShown] = useState(false)

  const images = image => {
    switch (image) {
      case 'Receipt':
        return Receipt
      case 'Contract':
        return Contract
      case 'Invoice':
        return Contract
      default:
        return null
    }
  }

  const previewModal = () => (
    <Box
      bg='white'
      position='fixed'
      top='50%'
      left='50%'
      transform='translate(-50%,-50%)'
      m='auto'
      height='500px'
      width={{ md: '80%' }}
      zIndex='9999px'
      overflow='auto'
    >
      <Box pos='relative'>
        <Box pos='absolute' right={0} pr={{ md: 6 }}>
          <IconButton
            variantColor='#3c9130'
            aria-label='Close Preview'
            size='lg'
            icon='close'
            onClick={() => {
              setShown(false)
            }}
          />
        </Box>

        <iframe title='nothing' src={link + '#toolbar=0'} w='100%' h='500px' />
      </Box>
    </Box>
  )

  return (
    <Box>
      <a href={link}>
        <Box w={60} mt={mt} as='button' onClick={() => setShown(true)} borderWidth={1} rounded='md'>
          <Box>
            <Text
              textAlign='center'
              w={60}
              py={1}
              fontWeight={900}
              fontFamily='heading'
              fontSize='lg'
            >
              {title}
            </Text>
          </Box>
          <Flex
            align='center'
            justify='center'
            direction='column'
            bg='cf.400'
            w={60}
            h={60}
            p={1}
            shadow='sm'
            pos='relative'
          >
            <a href={link} download>
              <Flex
                as='button'
                align='center'
                justify='center'
                pos='absolute'
                right={4}
                top={4}
                w={5}
                h={5}
                rounded='100%'
                bg='cf.400'
                color='white'
                boxShadow='lg'
                aria-labelledby='download button'
                onClick={e => e.preventDefault()}
              >
                <Icon as={arrowDown} bg='white' rounded='lg' color='cf.400' pl='1' />
              </Flex>
            </a>

            <Image src={images(title)} />
            <Text fontSize='sm' mt={2} color='white' textAlign='center'>
              {description}
            </Text>
            {shown && previewModal()}
          </Flex>
        </Box>
      </a>
    </Box>
  )
}

DocumentCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  mt: PropTypes.string
}

export default DocumentCard
