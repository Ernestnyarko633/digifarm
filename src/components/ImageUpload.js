import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Icon, Image, Input, Text } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'

import { BsX } from 'react-icons/bs'
import { VscAdd } from 'react-icons/vsc'

const ImageUpload = ({
  files,
  setFiles,
  setFieldValue,
  upload,
  instruct,
  values
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*, application/pdf',
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(async file => {
        setFieldValue('file', acceptedFiles)
      })
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )
    }
  })

  const removeImage = id => {
    const newImages = files?.filter(item => item.name !== id)
    setFiles(newImages)
  }

  const thumbs = files?.map(file => (
    <Box
      d='inline-block'
      mr={4}
      w='100%'
      textAlign='center'
      boxSizing='border-box'
      key={file.name}
      pos='relative'
    >
      <Text fontSize='16px'>{file.name}</Text>
      <Flex
        align='center'
        justify='center'
        as='button'
        role='button'
        aria-label='close button'
        w={6}
        h={6}
        rounded='100%'
        bg='white'
        color='gray.700'
        pos='absolute'
        top={2}
        right={2}
        onClick={() => removeImage(file.name)}
        _focus={{ textDecoration: 'none' }}
        cursor='pointer'
      >
        <Icon as={BsX} />
      </Flex>
      <Flex minW={0} overflow='hidden' justify='center'>
        <Image d='block' w='25%' src={file.preview} />
      </Flex>
    </Box>
  ))

  useEffect(
    () => () => {
      if (files) {
        files.forEach(file => {
          URL.revokeObjectURL(file.preview)
        })
      }
    },
    [files]
  )

  return (
    <Box>
      {files?.length === 1 ? null : (
        <Flex
          direction='column'
          justify='center'
          align='center'
          h={48}
          border='2px dashed rgba(0, 0, 0, 0.4)'
          cursor='pointer'
          _focus={{ outline: 'none' }}
          px={{ base: 4, md: 6 }}
          {...getRootProps({ className: 'dropzone' })}
        >
          <Input {...getInputProps()} />
          {files?.length === 0 && (
            <>
              <Flex
                align='center'
                justify='center'
                w={8}
                h={8}
                rounded='100%'
                bg='cf.400'
                color='white'
                mb={2}
              >
                <Icon as={VscAdd} />
              </Flex>
              <Text
                fontWeight={700}
                mt={1}
                fontSize={{ base: 'sm', md: 'lg' }}
                textAlign='center'
              >
                {upload}
              </Text>
              <Text color='gray.400' mt={1} fontSize='xs' textAlign='center'>
                {instruct}
              </Text>
            </>
          )}
        </Flex>
      )}
      <Box wrap='wrap' mt={10} as='aside'>
        {thumbs}
      </Box>
    </Box>
  )
}

ImageUpload.propTypes = {
  files: PropTypes.any,
  setFiles: PropTypes.any,
  setFieldValue: PropTypes.any,
  values: PropTypes.any,
  upload: PropTypes.any,
  instruct: PropTypes.any
}

export default ImageUpload
