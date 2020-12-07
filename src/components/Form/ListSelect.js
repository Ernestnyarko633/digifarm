import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { Listbox, Transition } from '@headlessui/react';
import React from 'react';
import { SelectArrows, Check } from 'theme/Icons';

const ListSelect = ({ state, setState, options }) => {
  return (
    <Box w='100%' maxWidth='20rem'>
      <Listbox as={Box} my={1} value={state} onChange={setState}>
        {({ open }) => (
          <>
            <Box pos='relative'>
              <Box as='span' d='inline-block' w='100%' rounded='md' shadow='sm'>
                <Listbox.Button
                  as={Box}
                  cursor='pointer'
                  pos='relative'
                  w='100%'
                  rounded='md'
                  borderWidth={1}
                  borderColor='gray.300'
                  bg='white'
                  pl={3}
                  pr={10}
                  py={2}
                  textAlign='left'
                  lineHeight={{ sm: 5 }}
                  fontSize={{ sm: 'sm' }}
                  _focus={{ outline: 'none', borderColor: 'blue.300' }}
                  className='focus:shadow-outline-bluetransition ease-in-out duration-150'
                >
                  <Text as='span' d='block' isTruncated>
                    {state}
                  </Text>
                  <Flex
                    as='span'
                    align='center'
                    pos='absolute'
                    top={0}
                    bottom={0}
                    pr={2}
                    right={2}
                    pointerEvents='none'
                  >
                    <Icon as={SelectArrows} boxSize={5} />
                  </Flex>
                </Listbox.Button>
              </Box>

              <Transition
                show={open}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                as={Box}
                pos='absolute'
                mt={1}
                w='100%'
                rounded='md'
                bg='white'
                shadow='lg'
                zIndex={10}
              >
                <Listbox.Options
                  static
                  as={Box}
                  maxHeight={32}
                  rounded='md'
                  py={1}
                  fontSize={{ base: 'md', sm: 'sm' }}
                  lineHeight={{ base: 6, sm: 5 }}
                  shadow='xs'
                  overflow='auto'
                  _focus={{ outline: 'none' }}
                >
                  {options.map((item, index) => (
                    <Listbox.Option key={item ? item.id : index} value={item}>
                      {({ selected, active }) => (
                        <Box
                          color={active ? 'white' : 'gray.900'}
                          bg={active && 'blue.600'}
                          cursor='default'
                          userSelect='none'
                          pos='relative'
                          py={2}
                          pl={8}
                          pr={4}
                        >
                          <Text
                            as='span'
                            isTruncated
                            fontWeight={selected ? 'semibold' : 'normal'}
                            d='block'
                          >
                            {item ? item : item.name}
                          </Text>
                          {selected && (
                            <Flex
                              as='span'
                              color={active ? 'white' : 'blue.600'}
                              pos='absolute'
                              top={0}
                              bottom={0}
                              left={0}
                              align='center'
                              pl={1}
                            >
                              <Icon as={Check} boxSize={5} />
                            </Flex>
                          )}
                        </Box>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Box>
          </>
        )}
      </Listbox>
    </Box>
  );
};

export default ListSelect;
