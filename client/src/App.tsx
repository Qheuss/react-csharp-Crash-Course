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
} from '@chakra-ui/react';
import './App.css';
import { AddIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { BASE_URL } from './constant';
import { Product } from './types/product';

function App() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(BASE_URL + 'product');
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

    fetchData();
  }, []);

  return (
   
  );
}

export default App;
