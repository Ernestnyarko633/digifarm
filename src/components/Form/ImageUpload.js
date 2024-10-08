import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Icon, Image, Input, Text } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { BsX } from 'react-icons/bs'
import { Add } from 'theme/Icons'

const ImageUpload = ({
  files,
  setFiles,
  setFieldValue,
  values,
  upload = 'Upload image here',
  acceptedFormat = 'image/*'
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedFormat,
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(async file => {
        const formData = new FormData()
        formData.append('file', file, file?.name)
        setFieldValue('name', formData)
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
      boxSizing='border-box'
      key={file.name}
      pos='relative'
    >
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
      >
        <Icon as={BsX} />
      </Flex>
      <Flex minW={0} overflow='hidden'>
        <Image d='block' w='auto' h='100%' src={file.preview} />
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
          h={32}
          borderWidth={1}
          borderBottomWidth={2}
          borderBottomColor='cf.green'
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
                bg='cf.green'
                color='white'
              >
                <Icon as={Add} />
              </Flex>
              <Text color='gray.400' mt={1} fontSize='sm'>
                {upload}
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
  upload: PropTypes.string,
  acceptedFormat: PropTypes.string,
  values: PropTypes.any
}

export default ImageUpload
