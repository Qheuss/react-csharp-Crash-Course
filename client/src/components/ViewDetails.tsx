import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Avatar,
  Heading,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';
import { Product } from '../types/product';

type ViewDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  currentData: Product;
};

const ViewDetails = ({ isOpen, onClose, currentData }: ViewDetailsProps) => {
  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{currentData.name} Details</DrawerHeader>
        <DrawerBody>
          <HStack flexDirection='column'>
            <Avatar name={currentData.name} size='lg' />
            <VStack alignItems='self-start'>
              <Heading fontSize={20}>{currentData.name}</Heading>
              <Heading fontSize={16}>${currentData.price}</Heading>
              <Text>{currentData.description}</Text>
            </VStack>
          </HStack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ViewDetails;
