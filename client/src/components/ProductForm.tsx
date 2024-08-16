import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  VStack,
  Switch,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { BASE_URL } from '../constant';
import { Product } from '../types/product';

type ProductFormProps = {
  isOpen: boolean;
  onClose: () => void;
  fetchProducts: () => void;
  currentData?: Product;
};

const ProductForm = ({
  isOpen,
  onClose,
  fetchProducts,
  currentData,
}: ProductFormProps) => {
  const toast = useToast();
  const [product, setProduct] = useState({
    id: currentData?.id || 0,
    name: currentData?.name || '',
    description: currentData?.description || '',
    price: currentData?.price || 0,
    isInStore: currentData?.isInStore || false,
  });

  const onSave = async () => {
    if (currentData?.id) {
      editProduct();
    } else {
      addProduct();
    }
  };

  const editProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/product/${currentData?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      onClose();
      fetchProducts();
      toast({
        title: 'Product updated successfully',
        status: 'success',
        isClosable: true,
        duration: 3000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async () => {
    try {
      const response = await fetch(`${BASE_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      onClose();
      fetchProducts();
      toast({
        title: 'Product added successfully',
        status: 'success',
        isClosable: true,
        duration: 3000,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader shadow={'sm'}>Add Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={3} alignItems={'self-start'}>
            <Input
              type='text'
              placeholder='Name'
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <Textarea
              placeholder='Description'
              rows={5}
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
            <Input
              type='number'
              placeholder='Price'
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: parseInt(e.target.value) })
              }
            />
            <Text>Is In Store?</Text>
            <Switch
              isChecked={product.isInStore}
              onChange={(e) =>
                setProduct({ ...product, isInStore: e.target.checked })
              }
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme='blue' onClick={onSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductForm;
