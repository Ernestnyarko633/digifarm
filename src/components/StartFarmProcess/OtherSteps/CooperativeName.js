/* eslint-disable no-console */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import {
  Icon,
  Input,
  Heading,
  FormLabel,
  FormControl,
  useToast
} from '@chakra-ui/react'
import { HiPencil } from 'react-icons/all'
import useStartFarm from 'context/start-farm'

const CooperativeName = () => {
  const { setCooperativeName, cooperativeName, coopImg, setCoopImg } =
    useStartFarm()
  const [isLarge, setIsLarge] = React.useState(false)
  const handleChange = e => {
    setCooperativeName(e.target.value)
  }
  const toast = useToast()
  React.useEffect(() => {
    let mounted = true

    if (mounted && isLarge) {
      toast({
        title: 'File is too large',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
    }

    return () => (mounted = false)
  }, [isLarge, toast])

  return (
    <Flex align='center' justify='center' direction='column'>
      <Box pos='relative'>
        <Avatar
          src={
            coopImg
              ? URL.createObjectURL(coopImg)
              : require('../../../assets/images/user-avatar.png').default
          }
          size='xl'
        />
        <FormControl>
          <FormLabel>
            <Flex
              align='center'
              justify='center'
              color='white'
              h={8}
              w={8}
              rounded='100%'
              bg='cf.800'
              pos='absolute'
              right={0}
              bottom={0}
              cursor='pointer'
            >
              <Icon as={HiPencil} />
            </Flex>
            <Input
              type='file'
              h='100%'
              w='100%'
              opacity={0}
              pos='absolute'
              onChange={async e => {
                setIsLarge(false)
                let file_size = e.currentTarget.files[0].size
                if (file_size < 1e6) {
                  return setCoopImg(e.currentTarget.files[0])
                } else {
                  setIsLarge(true)
                  return e.preventDefault()
                }
              }}
            />
          </FormLabel>
        </FormControl>
        <Text fontSize='sm' color='gray.500'>
          file limit: 1mb
        </Text>
      </Box>
      <Box mt={6}>
        <Flex>
          <Heading
            as='h4'
            ml={1}
            fontWeight={700}
            fontSize={{ base: 'lg', md: 'xl' }}
          >
            Give your cooperative a cool name
          </Heading>
        </Flex>

        <FormControl mt={4}>
          <Input
            min={9}
            max={15}
            rounded={0}
            value={cooperativeName}
            placeholder='Min: 3 characters, Max: 15 characters'
            _focus={{ borderColor: 'cf.800' }}
            onChange={e => {
              if (e?.target?.value?.length > 15) return e?.preventDefault()
              return handleChange(e)
            }}
          />
        </FormControl>
      </Box>
    </Flex>
  )
}

CooperativeName.propTypes = {
  farm: PropTypes.object
}

export default CooperativeName
