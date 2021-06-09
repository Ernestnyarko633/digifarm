import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { Icon, Input, Heading, FormLabel, FormControl } from '@chakra-ui/react'
import { HiPencil } from 'react-icons/all'
import useStartFarm from 'context/start-farm'

const CooperativeName = () => {
  const { setCooperativeName, cooperativeName, coopImg, setCoopImg } =
    useStartFarm()
  const handleChange = e => {
    setCooperativeName(e.target.value)
  }

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
                setCoopImg(e.currentTarget.files[0])
              }}
            />
          </FormLabel>
        </FormControl>
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
              if (e?.target?.value?.length > 15) e?.preventDefault()
              handleChange(e)
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
