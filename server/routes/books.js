const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  cover: String,
  description: String,
  averageRating: { type: Number, default: 0 },
  reviews: [{ rating: Number, comment: String }],
});

const Book = mongoose.model('Book', bookSchema);

// Fetch all books or search books
router.get('/', async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    query = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } },
      ],
    };
  }

  try {
    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fetch a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Submit a review for a book
router.post('/:id/reviews', async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return res.status(400).json({ message: 'Rating and comment are required' });
  }

  try {
    const book = await Book.findById(id);
    if (book) {
      book.reviews.push({ rating, comment });

      const totalRating = book.reviews.reduce((sum, review) => sum + review.rating, 0);
      book.averageRating = parseFloat((totalRating / book.reviews.length).toFixed(2));

      await book.save();
      res.status(200).json({ message: 'Review submitted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
