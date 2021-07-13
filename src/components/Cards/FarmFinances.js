/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { Box, Grid, Flex, Image, Heading, Text, Icon } from '@chakra-ui/react'
import Stack from '../../assets/images/finance.svg'
import Money from '../../assets/images/money.svg'
import Button from 'components/Button'
import PropTypes from 'prop-types'
import Graph from 'components/Utils/Graph'
import { FaCircle } from 'react-icons/fa'
import useComponent from 'context/component'
import useWallet from 'context/wallet'
import useRollover from 'context/rollover'

const FarmFinances = ({
  activities,
  tasks,
  scheduledTasks,
  wallet_id,
  farm
}) => {
  const { handleModalClick } = useComponent()
  const { totalAmount } = useWallet()
  const { step, setStep, setType } = useRollover()

  useEffect(() => {
    let mounted = true

    if (mounted) {
      setStep(p => p * 0)
    }
    return () => (mounted = false)
  }, [setStep])

  return (
    <Box
      rounded='lg'
      bg='white'
      p={5}
      pb={1}
      my={6}
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      w='100%'
      borderRadius='20px'
    >
      <Grid
        templateColumns={{
          md: '50% 50%',
          xl: '60% 40%'
        }}
        width='100%'
      >
        <Flex direction='column' w='100%' h='100%'>
          <Flex w='100%' direction='column'>
            <Flex align='center' pl={{ base: 2, md: 5 }}>
              <Box>
                <Image src={Stack} />
              </Box>
              <Flex ml={{ base: 2, md: 4 }} justify='center' align='center'>
                <Heading
                  mt={{ base: 1 }}
                  as='h6'
                  fontSize={{ base: 'md', xl: 'xl' }}
                >
                  FARM FINANCES
                </Heading>
              </Flex>
            </Flex>

            <Box py={{ md: 35 }} pl={{ md: 5 }}>
              <Text
                color='gray.200'
                fontSize={{ base: 'md', xl: '2xl' }}
                lineHeight={{ base: '21.09px' }}
              >
                Growing conditions are currently perfect
              </Text>
            </Box>
            <Box w={{ base: '240px', md: '100%' }} overflowX='scroll'>
              <Box
                w={{ base: '100%', xl: '200%' }}
                as={Graph}
                activities={activities}
                tasks={tasks}
                scheduledTasks={scheduledTasks}
                totalAmount={totalAmount}
              />
            </Box>
            <Box>
              <Flex direction='row' p={{ md: 5 }}>
                <Flex justify='space-between' align='center'>
                  <Icon as={FaCircle} boxSize={3} color='gray.400' />
                  <Text ml={{ md: 2 }} fontSize={{ md: 'md' }}>
                    Expenses
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Flex w='100%' direction='column' pr={{ md: 5 }}>
          <Flex
            align='center'
            borderBottomWidth={1}
            borderBottomColor='gray.200'
            px={{ md: 8 }}
            py={4}
          >
            <Flex
              justify='center'
              align='center'
              borderRadius='30px'
              w='30px'
              h='30px'
              bg='gray.200'
              mr={2}
            >
              <Image src={Money} />
            </Flex>
            <Heading
              as='h5'
              fontSize={{ base: 'md', xl: 'lg' }}
              fontWeight={800}
            >
              Farm expenses
            </Heading>
          </Flex>
          <Flex
            direction='column'
            w='100%'
            px={{ base: 4, xl: 8 }}
            justify='space-between'
            h='100%'
          >
            <Flex direction='column'>
              {activities.map((_activity, index) => {
                return (
                  <Flex
                    key={_activity?._id}
                    direction='row'
                    justify='space-between'
                    align='center'
                    borderBottomWidth={1}
                    borderBottomColor='gray.200'
                    py={3}
                  >
                    <Text
                      color={{
                        md: totalAmount(_activity, tasks, scheduledTasks)?.state
                          ? 'gray.500'
                          : 'gray.200'
                      }}
                      fontSize='sm'
                    >
                      {_activity?.title}
                    </Text>
                    <Heading
                      fontSize='lg'
                      color={{
                        md: totalAmount(_activity, tasks, scheduledTasks)?.state
                          ? null
                          : 'gray.200'
                      }}
                    >
                      {totalAmount(_activity, tasks, scheduledTasks)?.total}
                    </Heading>
                  </Flex>
                )
              })}
            </Flex>

            <Flex justify='flex-end'>
              <Button
                btntitle='Rollover'
                bg='white'
                isDisabled={
                  farm?.order?.product?.payoutStatus !== 'PAID' &&
                  farm?.wallet <= 0
                }
                borderWidth={1}
                borderColor='cf.green'
                color='cf.green'
                rounded={30}
                mx={{ base: 3, md: 0 }}
                my={5}
                colorScheme='none'
                w='50%'
                h={50}
                _hover={{ bg: 'white' }}
                shadow='none'
                fontSize={{ base: 'sm', xl: 'md' }}
                mr={{ md: 5 }}
                onClick={() => {
                  setType('asRollover')

                  handleModalClick('rollover', { step, setStep, wallet_id })
                }}
              />
              <Button
                btntitle='Payout'
                borderColor='cf.green'
                color='white'
                rounded={30}
                isDisabled={
                  farm.order.product.payoutStatus !== 'PAID' && farm.wallet <= 0
                }
                mx={{ base: 3, md: 0 }}
                my={5}
                w='50%'
                h={50}
                fontSize={{ base: 'sm', xl: 'md' }}
                onClick={() => {
                  setType('asPayout')
                  handleModalClick('payout', { wallet_id })
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  )
}

FarmFinances.propTypes = {
  activities: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  scheduledTasks: PropTypes.array.isRequired,
  wallet_id: PropTypes.string,
  farm: PropTypes.object
}
export default FarmFinances
