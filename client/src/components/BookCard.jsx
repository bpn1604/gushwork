import React from 'react';
import { Box, Image, Text, Button, useToast } from '@chakra-ui/react';

function BookCard({ book, isFavorite, onFavoriteToggle }) {
  console.log(book)
  const toast = useToast();

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    onFavoriteToggle(book._id);
    toast({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      status: isFavorite ? 'warning' : 'success',
      duration: 2000,
      isClosable: true,
      position: "top-right"
    });
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} fontFamily="sans-serif">
      <Image width="100%" height="300px" src={book.cover} alt={book.title} />
      <Box p={4}>
        {/* <Text fontWeight="bold" fontSize="lg">{book.title}</Text> */}
        <Text>Author: {book.author}</Text>
        <Text>Average Rating: {book.averageRating}</Text>
        <Text>Genre-{book.genre}</Text>
        <Button
          mt={4}
          colorScheme={isFavorite ? 'red' : 'teal'}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? 'Unfavorite' : 'Favorite'}
        </Button>
      </Box>
    </Box>
  );
}

export default BookCard;
