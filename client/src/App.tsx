import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react';
import './App.css';
import { AddIcon } from '@chakra-ui/icons';

function App() {
  const fetchData = async () => {};
  return (
    <Box shadow={'md'} rounded={'md'} m={32}>
      <Flex
        px={5}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={10}
      >
        <Heading>Product List</Heading>
        <Button colorScheme='blue' leftIcon={<AddIcon />}>
          Add Product
        </Button>
      </Flex>
      <TableContainer>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Product Name</Th>
              <Th>Desciption</Th>
              <Th>Is in store?</Th>
              <Th isNumeric>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>inches</Td>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
              <Td>25.4</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default App;
