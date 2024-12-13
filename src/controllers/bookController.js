const Book = require('../models/book');
const axios = require('axios');

const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
    try {
      const { title, author, published_date, isbn, pages } = req.body;
  
      // Input validation
      if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: "Title is required and must be a string." });
      }
      if (!author || typeof author !== 'string') {
        return res.status(400).json({ error: "Author is required and must be a string." });
      }
      if (!published_date || isNaN(Date.parse(published_date))) {
        return res.status(400).json({ error: "Published date is required and must be a valid date." });
      }
      if (!isbn || typeof isbn !== 'string') {
        return res.status(400).json({ error: "ISBN is required and must be a string." });
      }
      if (pages !== undefined && (typeof pages !== 'number' || pages < 0)) {
        return res.status(400).json({ error: "Pages, if provided, must be a non-negative number." });
      }
  
      // Create new book
      const newBook = await Book.create({ title, author, published_date, isbn, pages });
      res.status(201).json(newBook);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "ISBN must be unique. A book with this ISBN already exists." });
      }
      console.error("Error creating book:", error);
      res.status(500).json({ error: "An internal server error occurred. Please try again later." });
    }
  };
  

  const updateBook = async (req, res) => {
    try {
      const { title, author, published_date, isbn, pages } = req.body;
  
      // Find the book by ID
      const book = await Book.findByPk(req.params.id);
      if (!book) {
        return res.status(404).json({ error: "Book not found. Please provide a valid ID." });
      }
  
      // Input validation
      if (title !== undefined && (typeof title !== "string" || !title.trim())) {
        return res.status(400).json({ error: "Title must be a non-empty string if provided." });
      }
      if (author !== undefined && (typeof author !== "string" || !author.trim())) {
        return res.status(400).json({ error: "Author must be a non-empty string if provided." });
      }
      if (published_date !== undefined && isNaN(Date.parse(published_date))) {
        return res.status(400).json({ error: "Published date must be a valid date if provided." });
      }
      if (isbn !== undefined && typeof isbn !== "string") {
        return res.status(400).json({ error: "ISBN must be a string if provided." });
      }
      if (pages !== undefined && (typeof pages !== "number" || pages < 0)) {
        return res.status(400).json({ error: "Pages must be a non-negative number if provided." });
      }
  
      // Update the book
      const updatedBook = await book.update(req.body);
      res.json(updatedBook);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "ISBN must be unique. Another book with this ISBN already exists." });
      }
      console.error("Error updating book:", error);
      res.status(500).json({ error: "An internal server error occurred. Please try again later." });
    }
  };
  

const deleteBook = async (req, res) => {
  try {
    // Find the book by ID
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found. Please provide a valid ID." });
    }

    // Delete the book
    await book.destroy();
    res.status(200).json({ message: "Book successfully deleted." });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "An internal server error occurred. Please try again later." });
  }
};

const fetchExternalBooks = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.itbook.store/1.0/new');
    const books = data.books || [];

    const promises = books.map(async (b) => {
      const exists = await Book.findOne({ where: { isbn: b.isbn13 } });
      if (!exists) {
        await Book.create({
          title: b.title,
          author: b.subtitle || 'Unknown',
          published_date: new Date(),
          isbn: b.isbn13,
          pages: b.pages || null,
        });
      }
    });

    await Promise.all(promises);
    res.status(201).json({ message: 'Books fetched and stored successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  fetchExternalBooks,
};
