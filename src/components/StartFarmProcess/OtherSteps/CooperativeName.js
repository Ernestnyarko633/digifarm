/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import {
  FormControl,
  Text,
  Heading,
  FormLabel,
  Icon,
  Input
} from '@chakra-ui/react'
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
      {false && handleChange}
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
          <Text fontSiz='xs' color='gray.300'>
            (Min: 10 character, Max: 15 character)
          </Text>
        </Flex>

        <FormControl mt={4}>
          <Input
            min={10}
            max={15}
            rounded={0}
            value={cooperativeName}
            placeholder='Eg. CompleteNation'
            _focus={{ borderColor: 'cf.800' }}
            onChange={handleChange}
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
