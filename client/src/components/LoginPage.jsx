import React, { useState, useContext } from 'react';
import { Box, Heading, Input, Button, VStack, Text } from '@chakra-ui/react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function LoginPage() {
  const { isLoggedIn, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      login();
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <VStack spacing={4} align="center" mt={8}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={8}>
        <Heading as="h2" mb={4}>Login</Heading>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            mb={4}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box minHeight="24px">
            {errors.email && <Text color="red.500">{errors.email}</Text>}
          </Box>
          <Input
            type="password"
            placeholder="Password"
            mb={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box minHeight="24px">
            {errors.password && <Text color="red.500">{errors.password}</Text>}
          </Box>
          <Button type="submit" colorScheme="blue">Login</Button>
        </form>
        <Box mt={2}>
          <Link to="/register">Don't have an account?<Button variant="link">Register here</Button></Link>
        </Box>
      </Box>
    </VStack>
  );
}

export default LoginPage;
