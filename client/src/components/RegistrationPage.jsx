import React, { useState } from 'react';
import { Box, Heading, Input, Button, VStack, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      navigate('/login');
    }
  };

  return (
    <VStack spacing={4} align="center" mt={8}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={8}>
        <Heading as="h2" mb={4}>Registration</Heading>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            mb={4}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Box minHeight="24px">
            {errors.username && <Text color="red.500">{errors.username}</Text>}
          </Box>
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
          <Button type="submit" colorScheme="blue">Register</Button>
        </form>
      </Box>
    </VStack>
  );
}

export default RegistrationPage;
