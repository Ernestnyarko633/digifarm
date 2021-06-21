/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Grid, GridItem } from '@chakra-ui/react'
import { FormInput } from '../Form'
import Icon from '@chakra-ui/icon'
import { MdClose } from 'react-icons/all'
import PropTypes from 'prop-types'
import useStartFarm from 'context/start-farm'
import { getFormattedMoney } from 'helpers/misc'

const CooperativeMemberCard = ({
  values,
  farm,
  value,
  name,
  onChange,
  onBlur,
  remove,
  member,
  errors,
  touched,
  isDisabled,
  setInvites
}) => {
  // eslint-disable-next-line no-console
  console.log('error', errors)
  const { setAcres } = useStartFarm()
  useEffect(() => {
    let mounted = true
    if (mounted && values) {
      setInvites(values)
    }

    let total = 0
    if (mounted && value?.acreage) {
      const process = () =>
        values?.map(member => {
          const { acreage } = member
          if (acreage) return (total = total + acreage)
          return null
        })

      process()

      setAcres(total)
    }
    return () => (mounted = false)
  }, [values, setInvites, value?.acreage, setAcres])

  return (
    <Box bg='gray.50' rounded='md' p={4} my={5} pos='relative'>
      <Flex align='center' fontSize='sm'>
        <Text color='black' fontWeight={700}>
          {member === 1 ? 'You (Member)' : 'Member'} {member}
        </Text>
        {value?.acreage && (
          <Box
            bg='gray.100'
            py={1}
            px={5}
            ml={3}
            fontSize='xs'
            rounded='sm'
            color='gray.500'
          >
            $ {getFormattedMoney(value?.acreage * farm?.pricePerAcre)}
          </Box>
        )}
      </Flex>

      {values?.length > 2 && (
        <Box
          pos='absolute'
          right={3}
          top={3}
          as='button'
          role='button'
          aria-label='close button'
          onClick={e => {
            if (member - 1 <= 1) return e.preventDefault()
            return remove(values?.length - 1)
          }}
        >
          {member - 1 > 1 && <Icon as={MdClose} />}
        </Box>
      )}

      <Grid templateColumns={{ md: 'repeat(5, 1fr)' }} gap={4} mt={4}>
        <GridItem colSpan={3}>
          <FormInput
            disabled={isDisabled}
            type='email'
            placeholder='email@example.com'
            bg='gray.100'
            borderBottomColor='none'
            value={value.email}
            // error={errors.email}
            // touched={touched.email}
            name={`${name}email`}
            onChange={onChange}
            onBlur={onBlur}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <FormInput
            type='number'
            placeholder='eg. 10'
            bg='gray.100'
            borderBottomColor='none'
            value={value.acreage}
            name={`${name}acreage`}
            onChange={e => {
              return onChange(e)
            }}
            onBlur={onBlur}
          />
        </GridItem>
      </Grid>
    </Box>
  )
}

CooperativeMemberCard.propTypes = {
  values: PropTypes.array,
  value: PropTypes.object,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  remove: PropTypes.func,
  member: PropTypes.number,
  isDisabled: PropTypes.bool,
  touched: PropTypes.any,
  errors: PropTypes.any,
  setInvites: PropTypes.func,
  farm: PropTypes.object
}
export default CooperativeMemberCard
