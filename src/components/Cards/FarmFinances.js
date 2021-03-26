import React from 'react'
import { Box, Grid, Flex, Image, Heading, Text } from '@chakra-ui/react'
import Stack from '../../assets/images/finance.svg'
import Money from '../../assets/images/money.svg'
import Button from 'components/Button'
import PropTypes from 'prop-types'

const FarmFinances = ({ activities, tasks, scheduledTasks }) => {
  //   const keys = [
  //     { name: 'Total Tasks', data: 900 },
  //     { name: 'Total Cost', data: '$' }
  //   ]

  //   React.useEffect(() => {
  //     let mounted = true
  //     if (mounted) {
  //       if (activities && tasks) {
  //       }
  //     }

  //     return () => (mounted = false)
  //   }, [activities, scheduledTasks, tasks])

  const totalAmount = (__activity, index) => {
    let totalAmount = 0
    let tempTasks = tasks?.filter(
      _task => _task.activity._id === __activity._id
    )
    if (tempTasks) {
      tempTasks.forEach(_task => {
        totalAmount = totalAmount + _task?.budget
      })
    }
    // eslint-disable-next-line no-console
    console.log(totalAmount, 'hey')
    if (scheduledTasks) {
      let currentExpense = 0
      let _tasks = scheduledTasks.filter(
        completedTask =>
          __activity._id === completedTask?.taskId?.activity?._id &&
          completedTask.status === 'COMPLETED'
      )

      if (_tasks) {
        _tasks.forEach(_task => {
          currentExpense = currentExpense + _task?.taskId?.budget
        })
      }

      return {
        total: currentExpense ? currentExpense : totalAmount,
        state: currentExpense ? true : false
      }
    }
  }
  return (
    <Box
      rounded='lg'
      bg='white'
      p={10}
      pb={1}
      my={6}
      filter='drop-shadow(0px 2px 20px rgba(0, 0, 0, 0.1))'
      w='100%'
      borderRadius='20px'
    >
      <Grid templateColumns={{ md: '60% 40%' }} width='100%'>
        <Flex direction='column' w='100%' h='100%'>
          <Flex w='100%' direction='column'>
            <Flex align='center'>
              <Box>
                <Image src={Stack} />
              </Box>
              <Flex ml={{ md: 4 }} justify='center' align='center'>
                <Heading mt={{ md: 1 }} as='h6' fontSize={{ md: 'xl' }}>
                  FARM FINANCES
                </Heading>
              </Flex>
            </Flex>
            <Box mt={{ md: 5 }}>
              <Text color='gray.200' fontSize='2xl' lineHeight='21.09px'>
                Growing conditions are currently perfect
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Flex w='100%' direction='column'>
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
              mr={{ md: 2 }}
            >
              <Image src={Money} />
            </Flex>
            <Heading as='h5' fontSize='lg' fontWeight={800}>
              Farm expenses
            </Heading>
          </Flex>
          <Flex direction='column' w='100%' px={{ md: 8 }}>
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
                      md: totalAmount(_activity, index)?.state
                        ? 'gray.500'
                        : 'gray.200'
                    }}
                    fontSize='sm'
                  >
                    {_activity?.name}
                  </Text>
                  <Heading
                    fontSize='lg'
                    color={{
                      md: totalAmount(_activity, index)?.state
                        ? null
                        : 'gray.200'
                    }}
                  >
                    {totalAmount(_activity, index)?.total}
                  </Heading>
                </Flex>
              )
            })}
            <Button
              btntitle='Payout'
              borderColor='cf.400'
              color='white'
              rounded='30px'
              my={5}
              w='100%'
              h={50}
              fontSize='xl'
              //   onClick={() =>
              //     handleModalClick(
              //       'activity-receipts',
              //       thisData.ScheduledTasks?.length > 0 ? thisData : null
              //     )
              //   }
            />
          </Flex>
        </Flex>
      </Grid>
    </Box>
  )
}

FarmFinances.propTypes = {
  activities: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  scheduledTasks: PropTypes.array.isRequired
}
export default FarmFinances
