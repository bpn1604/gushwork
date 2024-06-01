const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const booksRouter = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/books', booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});