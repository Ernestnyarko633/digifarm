import React from 'react'
import {
  Box,
  Flex,
  Text,
  Icon,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Divider,
  Image
} from '@chakra-ui/react'

import { FirstLettersToUpperCase, getFormattedDate } from 'helpers/misc'
import PropTypes from 'prop-types'
import Details from './Details'
import { HiPencil } from 'react-icons/all'
import useStartFarm from 'context/start-farm'
import useAuth from 'context/auth'
import useApi from 'context/api'
import Button from 'components/Button'
import cooperative_avatar from 'assets/images/cooperative_avatar.png'

const SideMenu = ({ data, border, bg, ml, click, loading }) => {
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
      w='290px'
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
            {getFormattedDate(data?.product?.startDate)}
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
            <Image
              src={
                coopImg
                  ? URL.createObjectURL(coopImg)
                  : data?.imageUrl
                  ? data?.imageUrl
                  : cooperative_avatar
              }
              w='8rem'
              h='8rem'
              rounded='100%'
            />

            {user?.email === data?.users[0].email && (
              <FormControl>
                <FormLabel>
                  <Flex
                    align='center'
                    justify='center'
                    color='white'
                    h={9}
                    w={9}
                    rounded='100%'
                    bg='cf.green'
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
          subtitle={FirstLettersToUpperCase(data?.product?.location?.name)}
        />
        <Details
          title='Cooperative type'
          subtitle={FirstLettersToUpperCase(data?.type?.name)}
        />
        <Details title='Members' subtitle={data?.users?.length} />
        <Details
          title='Total acreage'
          subtitle={`${total?.toFixed(1)} acres`}
        />
        <Details
          title='Farm manager'
          subtitle={
            data?.product?.managers[0]?.firstName +
            ' ' +
            data?.product?.managers[0]?.lastName
          }
        />
        <Divider borderColor='gray.300' />
        <Box my={3} w='90%' mx='auto'>
          <Button
            btntitle='Download agreement'
            variant='outline'
            color='cf.green'
            width='100%'
            isLoading={loading}
            isDisabled={loading}
            py='10px'
            fontSize={{ md: 'md' }}
            onClick={click}
          />
        </Box>
      </Box>
    </Box>
  )
}

SideMenu.propTypes = {
  data: PropTypes.any,
  border: PropTypes.any,
  bg: PropTypes.any,
  ml: PropTypes.any,
  click: PropTypes.any,
  loading: PropTypes.any
}

export default SideMenu
