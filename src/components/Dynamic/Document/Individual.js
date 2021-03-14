import { Box, Flex, Grid } from '@chakra-ui/react'
import Button from 'components/Button'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BsArrowRight } from 'react-icons/bs'
import FarmDocumentCard from '../Cards/FarmDocumentCard'

export default function Individual({
  digitalFarmerFarm,
  activities,
  tasks,
  ScheduledTasks
}) {
  const [tempActs, setTempActs] = useState([])
  const [moreButton, setShowMoreButton] = useState(false)
  const [toggleText, setToggleText] = useState(false)
  const [reload, setReload] = useState(0)

  const triggerReload = () => {
    setReload(prevState => prevState + 1)
  }
  useEffect(() => {
    const _less = () => {
      let array = []
      if (activities?.length > 4) {
        setShowMoreButton(true)
        activities?.forEach((_activity, index) => {
          if (index < 4) {
            array.push(_activity)
          }
        })
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
                key={_activity?._id}
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
      </Grid>

      {moreButton && (
        <Flex align='center' justify='center' mt={{ md: 16 }}>
          <Button
            btntitle={!toggleText ? 'Show me more' : 'Show me less'}
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
  ScheduledTasks: PropTypes.any
}
