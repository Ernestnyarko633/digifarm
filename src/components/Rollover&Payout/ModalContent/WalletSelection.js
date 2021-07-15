import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Button from 'components/Button'
import { Box, Text } from '@chakra-ui/layout'
import ModalWrapper from 'components/Modals/ModalWrapper'
import ConfirmPassword from 'components/Rollover&Payout/ModalContent/ConfirmPassword'
import { useImmer } from 'use-immer'
import {
  Grid,
  GridItem,
  Heading,
  Divider,
  Flex,
  useToast
} from '@chakra-ui/react'
import WalletCard from 'components/Rollover&Payout/Cards/WalletCard'
import { Link } from 'react-router-dom'
import { getFormattedMoney } from 'helpers/misc'
import useRollover from 'context/rollover'
import useComponent from 'context/component'
import FormInput from 'components/Form/FormInput'
import useStartFarm from 'context/start-farm'

const MotionGrid = motion(Grid)

const WalletSelection = ({ type, title }) => {
  const [miniStep, setMiniStep] = useImmer(0)
  const { acreage, selectedFarm, handleRolloverPayment, isSubmitting } =
    useStartFarm()
  let toast = useToast()
  const { data } = useComponent()
  const {
    total,
    selectedWallets,
    onCloseSecond,
    open,
    onOpen,
    type: useType,
    setPayoutAmount,
    payoutAmount
  } = useRollover()
  const { onClose } = useComponent()

  const ReviewModal = () => {
    return (
      <ModalWrapper
        showButton={false}
        isCentered
        isOpen={open}
        onClose={onCloseSecond}
        size='2xl'
      >
        {miniStep === 0 ? (
          <Flex w='100%' px={{ base: 5 }} direction='column' justify='center'>
            <Flex
              w='100%'
              direction='row'
              align='center'
              justify='space-between'
            >
              <Box>
                <Heading fontSize={{ base: 'lg', md: 'xl' }}>
                  Review transaction
                </Heading>
              </Box>
              <Box>
                <Text
                  w='100%'
                  py={{ base: 1, md: 'auto' }}
                  fontSize={{ base: 'sm' }}
                  color='gray.300'
                >
                  {new Date().toDateString()}
                </Text>
              </Box>
            </Flex>
            <Divider mb={{ base: 2, md: 3 }} />
            <Flex w='100%' direction='row' justify='space-between'>
              <Box>
                <Text color='gray.300' fontSize={{ base: 'sm' }}>
                  Number of selected wallets
                </Text>
              </Box>
              <Box>
                <Text
                  w='100%'
                  py={{ base: 1, md: 'auto' }}
                  fontSize={{ base: 'sm' }}
                  color='gray.600'
                  fontWeight={900}
                >
                  {selectedWallets.length}
                </Text>
              </Box>
            </Flex>
            <Divider mb={{ base: 2, md: 3 }} />
            <Flex w='100%' direction='row' justify='space-between'>
              <Box>
                <Text color='gray.300' fontSize={{ base: 'sm' }}>
                  Names of wallets
                </Text>
              </Box>
              <Flex maxHeight='50%' direction='row' justify='flex-end'>
                {selectedWallets.map((wallet, index) => (
                  <Text
                    key={wallet.id}
                    w='100%'
                    py={{ base: 1, md: 'auto' }}
                    fontSize={{ base: 'sm' }}
                    color='gray.600'
                    fontWeight={900}
                  >
                    {index === 0 || index + 1 === selectedWallets.length
                      ? wallet.name
                      : wallet.name + ','}
                  </Text>
                ))}
              </Flex>
            </Flex>
            <Divider mb={{ base: 2, md: 3 }} />
            <Flex w='100%' direction='row' justify='space-between'>
              <Box>
                <Text color='gray.300' fontSize={{ base: 'sm' }}>
                  Total amount to be issued
                </Text>
              </Box>
              <Box>
                <Text
                  w='100%'
                  py={{ base: 1, md: 'auto' }}
                  fontSize={{ base: 'sm' }}
                  color='gray.600'
                  fontWeight={900}
                >
                  {data?.inRollover
                    ? data?.order?.cost || acreage * selectedFarm?.pricePerAcre
                    : payoutAmount}
                </Text>
              </Box>
            </Flex>
            <Divider mb={{ base: 2, md: 3 }} />
            <Button
              textAlign='center'
              btntitle={
                data?.inRollover ? 'Purchare crop' : 'Continue to payment'
              }
              borderColor='cf.green'
              color='white'
              isLoading={isSubmitting}
              fontWeight={900}
              rounded={30}
              mx={{ base: 0 }}
              my={{ base: 2, md: 5 }}
              w='100%'
              h={65}
              fontSize={{ base: 'sm', xl: 'md' }}
              onClick={() => {
                if (data?.inRollover && data?.order) {
                  handleRolloverPayment(data?.order)
                } else if (!data?.inRollover) {
                  setMiniStep(p => p + 1)
                }
              }}
            />
          </Flex>
        ) : (
          miniStep === 1 && <ConfirmPassword setMiniStep={setMiniStep} />
        )}
      </ModalWrapper>
    )
  }

  const farms = JSON.parse(sessionStorage.getItem('my_farms')) || []

  return (
    <MotionGrid
      display={{ base: 'flex' }}
      flexDir={{ base: 'column-reverse', md: 'row' }}
      w={{ base: '100%', xl: '75%' }}
      pt={{ md: 'auto' }}
      h={{ base: '90vh', md: '75vh', lg: 'auto' }}
      borderWidth={1}
      borderRadius={10}
      borderColor={{ base: 'transparent', md: 'gray.200' }}
      templateColumns={{ xl: '50% 50%', '2xl': 'repeat(2, 1fr)' }}
    >
      {(useType === 'asPayout' || (data?.inRollover && data?.showButton)) && (
        <ReviewModal />
      )}
      <GridItem
        borderRightColor={{ base: 'transparent', md: 'gray.200' }}
        borderRightWidth={{ md: 1 }}
        px={{ base: 2, md: 3, lg: 14 }}
        borderBottomWidth={{ base: 1, md: 0 }}
        py={{ base: 1, lg: 6 }}
        w={{ base: '100%', md: '50%' }}
        h={{
          base: useType === 'asPayout' ? '60%' : '75%',
          md: 'auto',
          lg: '80vh',
          xl: '90vh'
        }}
      >
        <Box mt={{ base: 1, md: 10 }} w='100%'>
          <Heading fontSize={{ base: 'lg', md: '2xl' }}>My Wallets</Heading>
          <Text
            w='100%'
            py={{ base: 1, md: 'auto' }}
            fontSize={{ base: 'sm', md: 'lg' }}
            color='gray.600'
            mt={{ md: 5 }}
          >
            Select the wallet you want to {type} with. You may select multiple
            wallets
          </Text>
        </Box>

        <Flex
          direction='column'
          mt={{ md: 3 }}
          overflowY='scroll'
          css={{
            '&::-webkit-scrollbar': {
              width: '4px'
            },
            '&::-webkit-scrollbar-track': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray.200',
              borderRadius: '24px'
            }
          }}
          w='100%'
          h={{ base: '78%', lg: '85%', '2xl': '70%', '3xl': '80%' }}
        >
          {farms
            ?.filter(
              farm => farm.wallet > 0 && farm?.order?.product?.payoutStatus
            )
            .map(wallet => (
              <WalletCard
                rollover={data?.inRollover}
                key={wallet?._id}
                id={wallet?._id}
                clicked={
                  data?.wallet_id === wallet?._id ||
                  selectedWallets.find(item => wallet._id === item.id)
                    ? true
                    : false
                }
                name={wallet.order?.product?.cropVariety?.crop?.name}
                amount={wallet?.wallet}
                image={wallet?.order?.product?.cropVariety?.imageUrl}
              />
            ))}
        </Flex>
      </GridItem>
      <GridItem
        w={{ base: '100%', md: '50%' }}
        overflowY='hidden'
        px={{ base: 1, lg: 14 }}
        py={{ base: 5, lg: 20 }}
        h={{ base: useType === 'asRollover' ? '25%' : '40%', md: 'auto' }}
      >
        <Box
          p={{ base: 4, md: 6, lg: 10 }}
          rounded={15}
          borderWidth={{ base: 1, md: 0, lg: 1 }}
          borderColor='gray.200'
          w='100%'
        >
          <Heading
            as='h3'
            fontSize={{ base: 'lg', md: '2xl' }}
            mb={{ base: 2, md: 5 }}
          >
            {title}
          </Heading>
          <Divider mb={{ base: 2, md: 3 }} />
          <Flex my={{ base: 2 }} w='100%' justify='space-between'>
            <Flex direction='column' justify='flex-start'>
              <Text mb={{ base: 2, md: 0 }}>
                {selectedWallets.length === 1 ? 'Wallet' : 'Wallets'} selected
              </Text>
              <Heading as='h3' fontSize={{ base: 'xl', md: '3xl' }}>
                {selectedWallets.length}
              </Heading>
            </Flex>
            <Flex direction='column' justify='flex-end'>
              <Text mb={{ base: 2, md: 0 }}>Total amounts($)</Text>
              <Heading as='h3' fontSize={{ base: 'xl', md: '3xl' }}>
                {getFormattedMoney(total)}
              </Heading>
            </Flex>
          </Flex>
          <Divider mb={{ base: 2, md: 5 }} />
          {useType === 'asPayout' && (
            <Flex w='100%' direction='column'>
              <Text>How much do you want to </Text>
              <FormInput
                type='number'
                label='Amount'
                name='amount'
                value={payoutAmount}
                onChange={e => {
                  if (e.target.value > total) {
                    toast({
                      title: 'Error occured',
                      description:
                        'Cannot withdraw more than total amount of selected wallets',
                      status: 'error',
                      duration: 5000,
                      position: 'top-right'
                    })

                    e.preventDefault()
                  } else {
                    setPayoutAmount(e.target.value)
                  }
                }}
                isRequired
                borderBottomColor={{ base: 'black' }}
                placeholder='Enter amount'
                bg='gray.100'
              />
            </Flex>
          )}
          {useType === 'asRollover' ? (
            !data?.inRollover ? (
              <Button
                display={{ base: 'none', lg: 'flex' }}
                as={selectedWallets.length && Link}
                isDisabled={!selectedWallets.length}
                _disabled={!selectedWallets.length}
                textAlign='center'
                btntitle='Proceed to rollover'
                to={
                  selectedWallets.length && {
                    pathname: '/start-farm/individual',
                    state: { rollover: true }
                  }
                }
                borderColor='cf.green'
                color='white'
                fontWeight={900}
                rounded={30}
                mx={{ base: 3, md: 0 }}
                my={{ base: 2, md: 10 }}
                w='70%'
                h={65}
                fontSize={{ base: 'sm', xl: 'md' }}
                onClick={() => {
                  sessionStorage.setItem('type', 'individual')
                  onClose()
                }}
              />
            ) : (
              data?.showButton && (
                <Button
                  display={{ base: 'none', lg: 'flex' }}
                  as={selectedWallets.length && Link}
                  isDisabled={!selectedWallets.length}
                  _disabled={!selectedWallets.length}
                  textAlign='center'
                  btntitle='Proceed to purchase crop'
                  borderColor='cf.green'
                  color='white'
                  fontWeight={900}
                  rounded={30}
                  mx={{ base: 3, md: 0 }}
                  my={{ base: 2, md: 10 }}
                  w='70%'
                  h={65}
                  fontSize={{ base: 'sm', xl: 'md' }}
                  onClick={() => {
                    onOpen()
                  }}
                />
              )
            )
          ) : (
            useType === 'asPayout' && (
              <Button
                display={{ base: 'none', lg: 'flex' }}
                textAlign='center'
                btntitle='Continue to payment'
                isDisabled={!selectedWallets.length || payoutAmount <= 0}
                borderColor='cf.green'
                color='white'
                fontWeight={900}
                rounded={30}
                mx={{ base: 3, md: 0 }}
                my={{ base: 2, md: 5 }}
                w='100%'
                h={65}
                fontSize={{ base: 'sm', xl: 'md' }}
                onClick={() => {
                  onOpen()
                }}
              />
            )
          )}
        </Box>
      </GridItem>
    </MotionGrid>
  )
}

WalletSelection.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string
}

export default WalletSelection
