import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Icon, Input, Text, Heading } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import { UilPaperclip, UilTimes } from '@iconscout/react-unicons'
import { FaRegFilePdf, FaRegFileImage } from 'react-icons/fa'

const FileUpload = ({
  files,
  setFiles,
  setFieldValue,
  instruct,
  previewTitle,
  accepts
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: accepts || 'image/*, application/pdf',
    onDrop: acceptedFiles => {
      acceptedFiles.forEach(async file => {
        setFieldValue('file', file)
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
  const baseStyle = React.useMemo(
    () => ({
      borderWidth: 1,
      borderRadius: '50px',
      borderColor: '#fff',
      borderStyle: 'solid',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      margin: '0 auto',
      width: '100%'
    }),
    []
  )
  const activeStyle = React.useMemo(
    () => ({
      borderColor: '#2196f3',
      opacity: 0.6
    }),
    []
  )

  const acceptStyle = React.useMemo(
    () => ({
      borderColor: '#31BC2E',
      opacity: 0.6
    }),
    []
  )

  const rejectStyle = React.useMemo(
    () => ({
      borderColor: '#ff1744',
      backgroundColor: '#ff1744',
      opacity: 0.6
    }),
    []
  )
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [
      baseStyle,
      isDragActive,
      activeStyle,
      isDragAccept,
      acceptStyle,
      isDragReject,
      rejectStyle
    ]
  )
  const thumbs = files?.map(file => {
    return (
      <Flex
        p={4}
        w='100%'
        textAlign='center'
        boxSizing='border-box'
        key={file.name}
        justifyContent='space-between'
        bg='blackAlpha.100'
        mb={2}
        rounded='md'
      >
        <Flex w='70%' alignItems='center'>
          {file.type === 'image/jpeg' ||
          file.type === 'image/jpg' ||
          file.type === 'image/png' ? (
            <Icon as={FaRegFileImage} boxSize={8} color='blackAlpha.600' />
          ) : file.type === 'application/pdf' ? (
            <Icon as={FaRegFilePdf} boxSize={8} color='blackAlpha.600' />
          ) : null}
          <Text ml={4} fontWeight='normal' color='blackAlpha.600'>
            {file.name}
          </Text>
        </Flex>
        <Flex
          rounded='md'
          bg='rgba(255, 0, 0, 0.1)'
          w={8}
          h={8}
          alignItems='center'
          justifyContent='center'
          onClick={() => removeImage(file.name)}
          cursor='pointer'
        >
          <Icon as={UilTimes} boxSize={6} color='rgba(0, 0, 0, 0.4)' />
        </Flex>
      </Flex>
    )
  })
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
    <Box w='100%'>
      {files?.length === 1 ? null : (
        <div>
          <div {...getRootProps({ style })}>
            <Input {...getInputProps()} />
            <Flex
              direction='column'
              justify='center'
              align='center'
              h={32}
              rounded={{ base: 16, md: 20 }}
              bg='white'
              border='1px dashed #A0AEC0'
              cursor='pointer'
            >
              <Flex
                direction='column'
                alignItems='center'
                justifyContent='center'
              >
                <Icon as={UilPaperclip} boxSize={6} color='cf.green' />
                <Text textAlign='center' fontSize={16}>
                  {instruct}
                </Text>
              </Flex>
            </Flex>
          </div>
        </div>
      )}
      {files.length > 0 ? (
        <Box
          borderColor='cf.400'
          px={8}
          py={12}
          pt={8}
          rounded='xl'
          alignItems='center'
          color='cf.400'
          fontWeight='bold'
          w='full'
        >
          <Heading textAlign='center' fontSize={20} mb={4}>
            {previewTitle}
          </Heading>

          <Box m='0 auto'>{thumbs}</Box>
        </Box>
      ) : null}
    </Box>
  )
}
FileUpload.propTypes = {
  files: PropTypes.any,
  setFiles: PropTypes.any,
  setFieldValue: PropTypes.any,
  upload: PropTypes.any,
  instruct: PropTypes.string,
  previewTitle: PropTypes.string,
  accepts: PropTypes.string
}
export default FileUpload
