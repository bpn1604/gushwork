import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Divider,
  useToast,
  Flex,
  Center,
  Spinner,
} from '@chakra-ui/react';

function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`https://gushwork-3.onrender.com/books/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBook(data);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast({
        title: "Warning",
        description: "Please provide rating and comment.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
      return;
    }
    try {
      const response = await fetch(`https://gushwork-3.onrender.com/books/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, comment }),
      });
      if (response.ok) {
        setSubmitted(true);
        setRating('');
        setComment('');
        fetchBookDetails();
        toast({
          title: "Review submitted",
          description: "Your review has been submitted successfully!",
          status: "success",
          duration: 3000,
          position: "top-right",
          isClosable: true,
        });
      } else {
        console.error('Failed to submit review:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <Box p={4}>
      {book ? (
        <Box>
          <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} gap="150px" alignItems="center" justifyContent="normal">
            <Image src={book.cover} alt={book.title} boxSize="300px" />
            <Box ml={{ md: 4 }} mt={{ base: 4, md: 0 }}>
              <Heading as="h2" size="xl">{book.title}</Heading>
              <Text fontSize="lg" mt={2}>By {book.author}</Text>
              <Text mt={2}>{book.description}</Text>
              <Text mt={2} fontWeight="bold">Average Rating: {book.averageRating}</Text>
            </Box>
          </Box>
          <Divider my={4} />
          <Flex marginLeft="25%"width="50%" justifyContent="space-around">
          <Box>
            <Heading as="h3" size="lg" mb={4}>User Reviews</Heading>
            
            {book.reviews.map((review, index) => (
              <Box key={index} p={4} shadow="md" borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontWeight="bold">Rating: {review.rating}</Text>
                <Text mt={2}>{review.comment}</Text>
              </Box>
            ))}
            
          </Box>
          <Box mt={4}>
            <Heading as="h3" size="lg" mb={4}>Submit a Review</Heading>
            <form onSubmit={handleSubmit}>
              <FormControl id="rating" mb={4}>
                <FormLabel>Rating</FormLabel>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </FormControl>
              <FormControl id="comment" mb={4}>
                <FormLabel>Comment</FormLabel>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="teal">Submit Review</Button>
            </form>
          </Box>
          </Flex>
        </Box>
      ) : (
        <Center h="200px">
          <Spinner size="xl" />
        </Center>
      )}
    </Box>
  );
}

export default BookDetailsPage;
