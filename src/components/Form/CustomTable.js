import React from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Box
} from '@chakra-ui/react'
import { useTable } from 'react-table'
import { AiOutlineFileSearch } from 'react-icons/ai'

const CustomTable = ({ _columns = [], _data = [], variant = '' }) => {
  // eslint-disable-next-line no-console
  console.log('data', _data)
  const data = React.useMemo(() => _data, [_data])
  const columns = React.useMemo(() => _columns, [_columns])
  const tableInstance = useTable({ columns, data })
  const { rows, prepareRow, headerGroups, getTableProps, getTableBodyProps } =
    tableInstance
  const getkey = i => i + 1
  return (
    <Box
      overflow='hidden'
      overflowY='scroll'
      // overflowY={_data?.length > 5 && 'scroll'}
      // h={{ md: '30rem', xl: '28rem', '3xl': '28rem', '5xl': '40rem' }}
      h={_data?.length > 5 && '30rem'}
    >
      <Table variant={variant} {...getTableProps()}>
        <Thead top={0} zIndex={2} pos='sticky' bg='white' w='full'>
          {headerGroups.map((headerGroup, index) => (
            <Tr key={getkey(index)} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index_) => (
                <Th
                  py={5}
                  fontSize={{ base: '12px', lg: '16px' }}
                  fontFamily='body'
                  fontWeight={200}
                  key={getkey(index_)}
                  textTransform='capitalize'
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()} mt='16px'>
          {!_data?.length ? (
            <Tr>
              <Td py={10} color='gray.400' colSpan={7} textAlign='center'>
                <Icon as={AiOutlineFileSearch} boxSize={10} />
                <Text>No record found</Text>
              </Td>
            </Tr>
          ) : (
            rows.map((row, index__) => {
              prepareRow(row)
              return (
                <Tr key={getkey(index__)} {...row.getRowProps()} h='80%'>
                  {row.cells.map((cell, i) => {
                    return (
                      <Td
                        fontSize='sm'
                        key={getkey(i)}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })
          )}
        </Tbody>
      </Table>
    </Box>
  )
}
CustomTable.propTypes = {
  _data: PropTypes.array,
  _columns: PropTypes.array,
  variant: PropTypes.string
}
export default CustomTable
