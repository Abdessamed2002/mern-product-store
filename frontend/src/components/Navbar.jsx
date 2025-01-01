import React from 'react'
import { Container, Flex, Text, HStack, Button, useColorMode } from '@chakra-ui/react'
import { CiSquarePlus, CiLight } from 'react-icons/ci'
import { MdNightlightRound } from "react-icons/md";
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Container maxW={"1140px"} px={"4px"}>
      <Flex 
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={ {
          base: "column",
          sm: "row"
        }}
      >
        
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, yellow.400)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} >
          <Link to={"/create"}>
            <Button>
              <CiSquarePlus fontSize={24}/>
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
            { colorMode === "light" ? <MdNightlightRound fontSize={22}/> : <CiLight fontSize={22}/>}
          </Button>
        </HStack>

      </Flex>
    </Container>
  )
}

export default Navbar