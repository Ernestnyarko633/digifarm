/* eslint-disable */
import React from 'react';
import { Box, Grid, Flex, Image, Heading, Text, Icon } from '@chakra-ui/react';
import Stack from '../../assets/images/finance.svg';
import Money from '../../assets/images/money.svg';
import Button from 'components/Button';
import PropTypes from 'prop-types';
import Graph from 'components/Utils/Graph';
import { FaCircle } from 'react-icons/fa';
import useComponent from 'context/component';

const FarmFinances = ({
  activities,
  tasks,
  scheduledTasks,
  farm,
  setExpenses,
}) => {
  const { handleModalClick } = useComponent();

  const totalAmount = React.useCallback(
    (__activity, index) => {
      let totalAmount = 0;
      let tempTasks = tasks?.filter(
        (_task) => _task.activity === __activity._id
      );
      if (tempTasks) {
        tempTasks.forEach((_task) => {
          totalAmount = totalAmount + _task?.budget;
        });
      }
      if (scheduledTasks) {
        let currentExpense = 0;
        let _tasks = scheduledTasks.filter(
          (completedTask) =>
            __activity._id === completedTask?.task?.activity &&
            completedTask.status === 'COMPLETED'
        );

        if (_tasks) {
          _tasks.forEach((_task) => {
            currentExpense = currentExpense + _task?.task?.budget;
          });
        }

        return {
          total: currentExpense ? currentExpense : totalAmount,
          state: currentExpense ? true : false,
        };
      }
    },
    [scheduledTasks, tasks]
  );

  React.useEffect(() => {
    let totalExpense = 0;
    const process = (value) =>
      value?.forEach((val) => {
        const bool = totalAmount(val)?.state;

        if (bool) {
          totalExpense = totalExpense + totalAmount(val)?.total;
        }
      });
    if (activities) {
      process(activities);
    }

    setExpenses(totalExpense);
  }, [activities, setExpenses, totalAmount]);

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
          xl: '60% 40%',
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
                farm={farm}
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
                        md: totalAmount(_activity, index)?.state
                          ? 'gray.500'
                          : 'gray.200',
                      }}
                      fontSize='sm'
                    >
                      {_activity?.title}
                    </Text>
                    <Heading
                      fontSize='lg'
                      color={{
                        md: totalAmount(_activity, index)?.state
                          ? null
                          : 'gray.200',
                      }}
                    >
                      {totalAmount(_activity, index)?.total}
                    </Heading>
                  </Flex>
                );
              })}
            </Flex>

            <Flex justify='flex-end'>
              <Button
                btntitle='Rollover'
                bg='white'
                borderWidth={1}
                borderColor='cf.400'
                color='cf.400'
                rounded='30px'
                isDisabled={true}
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
                  handleModalClick('rollover');
                }}
              />
              <Button
                btntitle='Payout'
                borderColor='cf.400'
                color='white'
                rounded='30px'
                isDisabled={true}
                mx={{ base: 3, md: 0 }}
                my={5}
                w='50%'
                h={50}
                fontSize={{ base: 'sm', xl: 'md' }}
                onClick={() => {
                  handleModalClick('payout');
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
};

FarmFinances.propTypes = {
  activities: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  scheduledTasks: PropTypes.array.isRequired,
  farm: PropTypes.object.isRequired,
  setExpenses: PropTypes.func.isRequired,
};
export default FarmFinances;
