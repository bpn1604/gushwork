import React, { useState, useEffect } from 'react';
import {
  Box, Input, Button, SimpleGrid, Link, useToast, InputGroup, InputRightElement, IconButton, Spinner, Center, Select
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';
import BookCard from './BookCard';

function BookListingPage() {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState('title');
  const toast = useToast();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (search = '') => {
    setLoading(true);
    try {
      const response = await fetch(`https://gushwork-3.onrender.com/books${search ? `?search=${encodeURIComponent(search)}` : ''}`);
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
       // handleSort(sortCriteria, data); 
      } else {
        toast({
          title: "Error fetching books",
          description: response.statusText,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      toast({
        title: "Error fetching books",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    fetchBooks(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    fetchBooks();
  };

  const handleFavoriteToggle = (bookId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(bookId)
        ? prevFavorites.filter((id) => id !== bookId)
        : [...prevFavorites, bookId]
    );
  };

  const handleSort = (criteria, booksToSort = books) => {
    setSortCriteria(criteria);
    let sortedBooks = [...booksToSort];
    if (criteria === 'title') {
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === 'author') {
      sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
    } else if (criteria === 'averageRating') {
      sortedBooks.sort((a, b) => b.averageRating - a.averageRating);
    }
    setBooks(sortedBooks);
  };

  return (
    <Box p={4} pt="60px">
      <Box mb={4} display="flex" justifyContent="center" alignItems="center" gap={4}>
        <InputGroup width="300px" mr={2}>
          <Input
            placeholder="Search by title, author, or genre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <InputRightElement>
              <IconButton
                icon={<CloseIcon />}
                size="sm"
                onClick={handleClearSearch}
              />
            </InputRightElement>
          )}
        </InputGroup>
        <Button onClick={handleSearch} colorScheme="teal">Search</Button>
        <Select
          width="200px"
          value={sortCriteria}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
          <option value="averageRating">Sort by Rating</option>
        </Select>
      </Box>
      {loading ? (
        <Center h="200px">
          <Spinner size="xl" />
        </Center>
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
          {books.map((book) => (
            <Link as={RouterLink} key={book._id} to={`/details/${book._id}`} style={{ textDecoration: 'none' }}>
              <BookCard
                book={book}
                isFavorite={favorites.includes(book._id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </Link>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default BookListingPage;
