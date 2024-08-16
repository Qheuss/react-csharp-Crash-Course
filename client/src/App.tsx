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
  HStack,
  Avatar,
  Text,
  Badge,
  useDisclosure,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  PopoverFooter,
  useToast,
} from '@chakra-ui/react';
import './App.css';
import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { BASE_URL } from './constant';
import { Product } from './types/product';
import ProductSkeleton from './components/ProductSkeleton';
import ProductForm from './components/ProductForm';
import ViewDetails from './components/ViewDetails';

function App() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isViewDialogOpen,
    onClose: onViewDialogClose,
    onOpen: onViewDialogOpen,
  } = useDisclosure();
  const [currentData, setCurrentData] = useState<Product>({} as Product);
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(BASE_URL + '/product');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProduct = (id: number) => {
    const foundProduct = data.find((product) => product.id === id);

    if (foundProduct) {
      setCurrentData(foundProduct);
      onOpen();
    } else {
      console.error(`Product with id ${id} not found`);
    }
  };

  const handleAdd = () => {
    onOpen();
    setCurrentData({} as Product);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchData();
      toast({
        title: 'Product deleted successfully',
        status: 'success',
        isClosable: true,
        duration: 3000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewDetails = (id: number) => {
    const foundProduct = data.find((product) => product.id === id);

    if (foundProduct) {
      setCurrentData(foundProduct);
      onViewDialogOpen();
    } else {
      console.error(`Product with id ${id} not found`);
    }
  };

  if (isLoading) return <ProductSkeleton />;

  return (
    <Box shadow='md' rounded='md' m={32}>
      <Flex px={5} justifyContent='space-between' alignItems='center' mb={10}>
        <Heading fontSize={20}>Product List</Heading>
        <Button
          colorScheme='blue'
          leftIcon={<AddIcon />}
          onClick={() => handleAdd()}
        >
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
              <Th>Is In Store?</Th>
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
                    <Avatar size='sm' name={product.name} />
                    <Text>{product.name}</Text>
                  </HStack>
                </Td>
                <Td>{product.description}</Td>
                <Td>
                  <Badge>{product.isInStore ? 'Yes' : 'No'}</Badge>
                </Td>
                <Td isNumeric>{product.price}</Td>
                <Td>
                  <HStack gap={3}>
                    <EditIcon
                      onClick={() => getProduct(product.id)}
                      boxSize={22}
                      color='blue'
                    />
                    <Popover>
                      <PopoverTrigger>
                        <DeleteIcon boxSize={22} color='red' />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody>
                          Are you sure you want to delete this?
                        </PopoverBody>
                        <PopoverFooter>
                          <Button
                            colorScheme='red'
                            float='right'
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                    <ViewIcon
                      onClick={() => handleViewDetails(product.id)}
                      boxSize={22}
                      color='green'
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {data.length == 0 && (
        <Heading p={5} textAlign='center' fontSize={14}>
          NO DATA
        </Heading>
      )}

      {isOpen && (
        <ProductForm
          isOpen={isOpen}
          onClose={onClose}
          fetchProducts={fetchData}
          currentData={currentData}
        />
      )}

      {isViewDialogOpen && (
        <ViewDetails
          isOpen={isViewDialogOpen}
          onClose={onViewDialogClose}
          currentData={currentData}
        />
      )}
    </Box>
  );
}

export default App;
