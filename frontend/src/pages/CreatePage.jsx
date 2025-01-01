import { Container, Box, Heading, Input, VStack, useColorModeValue, Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const toast = useToast();

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    if (!success) {
      toast({
        "title": "Error",
        description: message,
        status: "error",
        isClosable: true
      })
    } else {
      toast({
        "title": "Success",
        description: message,
        status: "success",
        isClosable: true
      })
    }
    setNewProduct({name: "", price: "", image: ""});
    // you can change the toast from 20 line to 5 lines
  }


  return (
    <Container maxW={"container.sm"}>
      <VStack
        spacing={8}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"} bg={useColorModeValue("white", "gray.800")} rounded={"lg"} p={8} shadow={"md"}
        >
          <VStack spacing={4}>
            <Input 
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              required
            />
            <Input 
              placeholder='Product Price'
              name='price'
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              required
            />
            <Input 
              placeholder='Product Image'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              required
            />

            <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
              Add Product
            </Button>
          </VStack>
        </Box>

      </VStack>
    </Container>
  )
}

export default CreatePage