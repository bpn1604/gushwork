const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db'); 
const booksRouter = require('./routes/books');

const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


connectDB();


app.use('/books', booksRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
