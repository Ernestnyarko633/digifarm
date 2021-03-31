import { Box, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react'
import Button from 'components/Button'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BsArrowRight } from 'react-icons/bs'
import FarmDocumentCard from '../Cards/FarmDocumentCard'
import Doc from 'assets/images/doc.png'

export default function Individual({
  digitalFarmerFarm,
  activities,
  tasks,
  ScheduledTasks,
  viewDoc
}) {
  const [tempActs, setTempActs] = useState([])
  const [moreButton, setShowMoreButton] = useState(false)
  const [toggleText, setToggleText] = useState(false)
  const [reload, setReload] = useState(0)

  const triggerReload = () => {
    setReload(prevState => prevState + 1)
  }
  useEffect(() => {
    const _activities = _array =>
      activities?.forEach((_activity, index) => {
        if (index < 4) {
          _array.push(_activity)
        }
      })
    const _less = () => {
      let array = []
      if (activities?.length > 4) {
        setShowMoreButton(true)
        _activities(array)
      }
      if (array) {
        setToggleText(false)
        return setTempActs(array)
      }
      return setTempActs(activities)
    }
    _less()
  }, [activities, reload])

  const toggle = () => {
    if (tempActs?.length < activities?.length) {
      setToggleText(true)
      setTempActs(activities)
    }
    if (tempActs?.length === activities?.length) {
      triggerReload()
    }
  }

  const totalAmount = __activity => {
    let totalAmount = 0
    let tempTasks = tasks?.filter(
      _task => _task.activity._id === __activity._id
    )
    if (tempTasks) {
      tempTasks.forEach(_task => {
        totalAmount = totalAmount + _task?.budget
      })
    }
    return totalAmount
  }
  return (
    <Box>
      <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={10}>
        {activities &&
          tempActs &&
          tempActs?.map(_activity => {
            return (
              <FarmDocumentCard
                viewDoc={viewDoc}
                key={_activity?._id}
                digitalFarmerFarm={digitalFarmerFarm}
                __activityID={_activity?._id}
                title={_activity?.name}
                ScheduledTasks={ScheduledTasks.filter(
                  _completedTask =>
                    _activity._id === _completedTask?.taskId?.activity?._id &&
                    _completedTask.status === 'COMPLETED'
                )}
                tasksNumber={
                  tasks?.filter(_task => _task.activity._id === _activity._id)
                    ?.length + 1
                }
                amount={totalAmount(_activity)}
              />
            )
          })}
        {!tempActs && (
          <Flex
            w='100%'
            justify='center'
            align='center'
            direction='column'
            py={{ md: 40 }}
          >
            <Image src={Doc} py={{ md: 10 }} />
            <Heading as='h6' fontSize={18} fontWeight={800} mb={{ md: 5 }}>
              Your document is empty
            </Heading>
            <Text fontSize='xs'>
              Documents like receipts, contracts will show up here
            </Text>
          </Flex>
        )}
      </Grid>

      {moreButton && (
        <Flex align='center' justify='center' mt={{ md: 16 }}>
          <Button
            btntitle={!toggleText ? 'Show more' : 'Show less'}
            icon={BsArrowRight}
            bg='white'
            borderWidth={1}
            borderColor='cf.400'
            color='cf.400'
            rounded='30px'
            h={14}
            width={56}
            _hover={{ bg: 'white' }}
            shadow='none'
            fontSize='md'
            onClick={() => {
              toggle()
            }}
          />
        </Flex>
      )}
    </Box>
  )
}

Individual.propTypes = {
  digitalFarmerFarm: PropTypes.any,
  activities: PropTypes.any,
  tasks: PropTypes.any,
  ScheduledTasks: PropTypes.any,
  viewDoc: PropTypes.bool
}
