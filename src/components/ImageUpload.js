import { Box, Flex, Icon, Image, Input, Text } from '@chakra-ui/react'
import React from 'react'
import { useDropzone } from 'react-dropzone'
import { BsX } from 'react-icons/bs'
import PropTypes from 'prop-types'

const ImageUpload = ({ files, setFiles, setFieldValue, values }) => {
  // const { postImageUpload } = useAPI();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(async file => {
        const formData = new FormData()
        formData.append('file', file, file?.name)
        // const res = await postImageUpload(formData);
        // console.log('result', res);
        // setFieldValue('file_ids', [...values, res?.data?.data?.id])
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
    const newImages = files.filter(item => item.name !== id)
    setFiles(newImages)
  }

  const thumbs = files.map(file => (
    <Box
      d='inline-block'
      // mb={4}
      mr={4}
      w='100%'
      // p={4}
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

  React.useEffect(
    () => () => {
      files.forEach(file => URL.revokeObjectURL(file.preview))
    },
    [files]
  )

  return (
    <Box borderWidth={1} borderColor='gray.200' p={{ md: 8 }}>
      <Box {...getRootProps({ className: 'dropzone' })}>
        <Input {...getInputProps()} />
        {files.length === 0 && (
          <Text color='gray.500' fontSize='sm'>
            Drag 'n' drop some files here, or click to select files
          </Text>
        )}
      </Box>
      <Box
        // borderRadius={2}
        // borderWidth={1}
        // borderColor='gray.600'
        // templateColumns={{ md: 'repeat(2, 1fr)' }}
        wrap='wrap'
        mt={10}
        as='aside'
      >
        {thumbs}
      </Box>
    </Box>
  )
}

ImageUpload.propTypes = {
  files: PropTypes.array,
  setFiles: PropTypes.func,
  setFieldValue: PropTypes.func,
  values: PropTypes.string
}

export default ImageUpload
