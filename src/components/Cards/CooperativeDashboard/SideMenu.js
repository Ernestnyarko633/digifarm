import React from 'react'
import {
  Box,
  Flex,
  Text,
  Avatar,
  Icon,
  Input,
  FormControl,
  FormLabel,
  useToast
} from '@chakra-ui/react'

import { getformattedDate } from 'helpers/misc'
import PropTypes from 'prop-types'
import Details from './Details'
import { HiPencil } from 'react-icons/all'
import useStartFarm from 'context/start-farm'
import useAuth from 'context/auth'
import useApi from 'context/api'

const SideMenu = ({ data, border, bg, ml }) => {
  const { isAuthenticated } = useAuth()
  const { user } = isAuthenticated()
  const { updateCooperative } = useApi()
  const { coopImg, setCoopImg } = useStartFarm()
  const [total, setTotal] = React.useState(0)

  const toast = useToast()

  const cooperativeUpdate = async value => {
    try {
      let formData = new FormData()
      formData.append('cooperativeImg', value)
      const res = await updateCooperative(data?._id, formData)
      toast({
        title: 'Cooperative Image Updated',
        description: res.message,
        status: 'success',
        duration: 5000,
        position: 'top-right'
      })
    } catch (error) {
      toast({
        title: 'Error occured',
        description:
          error?.message || error?.data?.message || 'Unexpected error.',
        status: 'error',
        duration: 5000,
        position: 'top-right'
      })
    }
  }

  React.useEffect(() => {
    let mounted = true
    let t = 0
    if (mounted && data) {
      const { users } = data
      const process = () => users.map(item => (t = t + item?.acreage))
      process()
      setTotal(t)
    }
    return () => (mounted = false)
  }, [data])

  return (
    <Box
      w='292px'
      ml={ml}
      mr='25px'
      borderWidth={border}
      borderColor='gray.300'
      rounded='4px'
    >
      <Box bg={bg} p='5px'>
        <Text color='red.300' textAlign='center'>
          Farm starts:
          <Text as='span' color='#D0021B' fontWeight='bold' ml={2}>
            {getformattedDate(data?.product?.startDate)}
          </Text>
        </Text>
      </Box>
      <Box
        p={6}
        justifyContent='center'
        borderBottomWidth={1}
        borderColor='gray.300'
      >
        <Flex justify='center'>
          <Box pos='relative'>
            <Avatar
              name={data?.name}
              src={coopImg ? URL.createObjectURL(coopImg) : data?.imageUrl}
              size='xl'
            />
            {user.email === data.users[0].email && (
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
                      await cooperativeUpdate(e.currentTarget.files[0])
                    }}
                  />
                </FormLabel>
              </FormControl>
            )}
          </Box>
        </Flex>
        <Text fontWeight='bold' fontSize='20px' textAlign='center'>
          {data?.name}
        </Text>
      </Box>
      <Box>
        <Details
          image={data?.product?.cropVariety?.crop?.imageUrl}
          name={data?.product?.cropVariety?.crop?.name}
          variety={data?.product?.cropVariety?.crop?.sciName}
          cropCode={data?.product?.name}
        />
        <Details
          title='Location'
          subtitle={
            data?.product?.location?.name +
            ' , ' +
            data?.product?.location?.state
          }
        />
        <Details
          title='Cooperative type'
          subtitle={data?.type?.name?.toUpperCase()}
        />
        <Details title='Members' subtitle={data?.users?.length} />
        <Details title='Acreage' subtitle={total} />
        <Details
          title='Farm Manager'
          subtitle={
            data?.product?.managers[0]?.firstName +
            ' ' +
            data?.product?.managers[0]?.lastName
          }
        />
        <Details
          title='Farm Agreement'
          color='cf.400'
          subtitle={<a href='#hh'>View Agreement</a>}
        />
      </Box>
    </Box>
  )
}

SideMenu.propTypes = {
  data: PropTypes.any,
  border: PropTypes.any,
  bg: PropTypes.any,
  ml: PropTypes.any
}

export default SideMenu
