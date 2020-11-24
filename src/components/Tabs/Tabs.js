import React from 'react';
import { Flex, Box } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import Tab from './Tab';
import { motion } from 'framer-motion';

const MotionBox = motion.custom(Box);

const Tabs = ({ children, width, borderWidth, px, pt }) => {
  const [activeTab, setActiveTab] = React.useState(children[0].props.label);

  const handleClickTabItem = React.useCallback((tab) => setActiveTab(tab), []);

  return (
    <Flex>
      <Box as='ol' listStyleType='none' w={width} mx='auto'>
        {children.map((child) => {
          const { label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={handleClickTabItem}
            />
          );
        })}
      </Box>

      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        w={140}
        mx='auto'
        px={px || 16}
        py={10}
        pt={pt}
        bg='white'
        pos='relative'
        borderWidth={borderWidth || 1}
        borderColor='gray.300'
        rounded='md'
      >
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </MotionBox>
    </Flex>
  );
};

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
  width: PropTypes.any,
};

export default Tabs;
