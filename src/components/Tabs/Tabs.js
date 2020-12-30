import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import Tab from './Tab'

const MotionFlex = motion.custom(Flex)

const Tabs = ({
  children,
  width,
  borderWidth,
  px,
  pt,
  display = 'block',
  boxWidth,
  mt,
  mx,
  py = 10,
  direction = 'column',
}) => {
  const [ activeTab, setActiveTab ] = React.useState(children[0].props.label)

  const handleClickTabItem = React.useCallback((tab) => setActiveTab(tab), [])

  return (
    <Flex direction={direction} mt={mt}>
      <Box display={display} as='ol' listStyleType='none' w={width} mx='auto'>
        {children.map((child) => {
          const { label } = child.props

          return (
            <Tab activeTab={activeTab}
              key={label}
              label={label}
              onClick={handleClickTabItem} />
          )
        })}
      </Box>

      <MotionFlex initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        w={boxWidth}
        mx={mx || 'auto'}
        px={px || 4}
        py={py}
        pt={pt}
        bg='white'
        pos='relative'
        borderWidth={borderWidth || 1}
        borderColor='gray.300'>
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined
          return child.props.children
        })}
      </MotionFlex>
    </Flex>
  )
}

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
  width   : PropTypes.any,
}

export default Tabs
