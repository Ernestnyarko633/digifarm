import React from 'react'
import PropTypes from 'prop-types'
import { Text, Flex, Box, Image, Spinner } from '@chakra-ui/react'
import { IoMdClose } from 'react-icons/io'

import useFileReader from 'hooks/useFileReader'

const FilePreview = ({
  src,
  alt,
  type,
  style,
  fileData,
  handleClear,
  ...rest
}) => {
  const { loading, file } = useFileReader(fileData)

  if (!fileData && !src) return null

  return loading ? (
    <Spinner size='sm' />
  ) : (
    <Box pos='relative'>
      {handleClear && (
        <Flex
          top={0}
          left={0}
          opacity={0}
          width='100%'
          height='100%'
          bgColor='cf.green'
          pos='absolute'
          alignItems='center'
          justifyContent='center'
          _hover={{
            opacity: 0.6
          }}
        >
          <Flex
            as='button'
            role='button'
            color='white'
            pos='absolute'
            flexDir='column'
            _hover={{
              color: 'red.600'
            }}
            onClick={handleClear}
          >
            <IoMdClose size={50} />
            <Text as='span' fontSize='sm' fontWeight='bold'>
              Remove
            </Text>
          </Flex>
        </Flex>
      )}
      <Flex
        {...rest}
        p={10}
        rounded='md'
        width='100%'
        height='100%'
        alignItems='center'
        justifyContent='center'
      >
        {type === 'image' ? (
          <Image
            src={file || src}
            alt={(fileData && fileData.name) || alt}
            style={style}
          />
        ) : (
          <iframe
            src={file || src}
            title={(fileData && fileData.name) || alt}
            style={style}
          />
        )}
      </Flex>
    </Box>
  )
}

FilePreview.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  fileData: PropTypes.object,
  handleClear: PropTypes.func
}

export default FilePreview
