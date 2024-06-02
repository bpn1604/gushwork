// Navbar.jsx
import React, { useContext } from 'react';
import {
  Box,
  Flex,
  Spacer,
  Image,
  Heading,
  Button,
  IconButton,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import { FaSun, FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue(<FaMoon />, <FaSun />);

  return (
    <Flex
      bg="teal.500"
      w="100%"
      px={4}
      py={3}
      alignItems="center"
      boxShadow="md"
      position="relative"
      zIndex={1}
      marginBottom="50px"
    >
      <Flex alignItems="center" gap="10px">
        <Image height="25px" src='https://th.bing.com/th/id/OIP.uDQ0Bt9-xaXHNcO7_0I9OAHaFj?w=251&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7' />
        <Heading as="h1" size="md" color="white">Library</Heading>
      </Flex>
      <Spacer />
      <Flex gap="30px">
        <Link to="/" color="white" mr={4}>Home</Link>
        {isLoggedIn ? (
          <Button color="white" variant="link" onClick={logout}>Logout</Button>
        ) : (
          <>
            <Link to="/login" color="white" mr={4}>Login</Link>
            <Link to="/register" color="white" mr={4}>Sign Up</Link>
          </>
        )}
      </Flex>
      <Spacer />
      <Flex>
        <IconButton
          aria-label="Toggle color mode"
          variant="ghost"
          color="current"
          onClick={toggleColorMode}
          icon={colorModeIcon}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
