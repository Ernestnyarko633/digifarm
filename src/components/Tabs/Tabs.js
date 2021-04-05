import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import Tab from './Tab'

const MotionFlex = motion.custom(Flex)

const Tabs = ({
  children,
  width,
  px,
  pt,
  display = 'block',
  boxWidth,
  mt,
  mx,
  py = 10,
  direction = 'column'
}) => {
  const [activeTab, setActiveTab] = useState(children[0]?.props?.label)

  const handleClickTabItem = useCallback(tab => setActiveTab(tab), [])

  return (
    <Flex direction={direction} mt={mt}>
      <Flex
        display={display}
        as='ol'
        listStyleType='none'
        w={width}
        overflowX={{ base: 'scroll', md: 'visible' }}
      >
        {children?.map(child => {
          const { label } = child.props

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={handleClickTabItem}
            />
          )
        })}
      </Flex>

      <MotionFlex
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        w={boxWidth}
        mx={mx || 'auto'}
        px={px || 4}
        py={py}
        pt={pt}
        bg='white'
        pos='relative'
      >
        {children.map(child => {
          if (child.props.label !== activeTab) return undefined
          return child.props.children
        })}
      </MotionFlex>
    </Flex>
  )
}

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
  px: PropTypes.any,
  pt: PropTypes.any,
  mt: PropTypes.any,
  mx: PropTypes.any,
  py: PropTypes.any,
  width: PropTypes.any,
  display: PropTypes.any,
  boxWidth: PropTypes.any,
  direction: PropTypes.any
}

export default Tabs
