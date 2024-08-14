import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Avatar,
  Badge,
  Text,
} from '@chakra-ui/react';
import { Product } from '../types/product';

const ProductSkeleton = () => {
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
            {data.map((product: Product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td>
                  <HStack>
                    <Avatar name={product.name} />
                    <Text>{product.name}</Text>
                  </HStack>
                </Td>
                <Td>{product.description}</Td>
                <Td>
                  <Badge>{product.isInStore ? 'Yes' : 'No'}</Badge>
                </Td>
                <Td isNumeric>{product.price}</Td>
                <Td>25.4</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {data.length == 0 && (
        <Heading p={5} textAlign={'center'} fontSize={14}>
          NO DATA
        </Heading>
      )}
    </Box>
  );
};

export default ProductSkeleton;
