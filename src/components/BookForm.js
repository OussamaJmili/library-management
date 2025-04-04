// src/components/BookForm.js
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

function BookForm({ addBook, editBook, updateBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [summary, setSummary] = useState('');

  // Pre-populate the form if editing
  useEffect(() => {
    if (editBook) {
      setTitle(editBook.title);
      setAuthor(editBook.author);
      setGenre(editBook.genre || '');
      setPublicationDate(editBook.publicationDate || '');
      setSummary(editBook.summary || '');
    } else {
      setTitle('');
      setAuthor('');
      setGenre('');
      setPublicationDate('');
      setSummary('');
    }
  }, [editBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) return; // Required fields
    const bookData = { title, author, genre, publicationDate, summary };
    if (editBook) {
      updateBook({ ...editBook, ...bookData });
    } else {
      addBook(bookData);
    }
    // Reset the form fields after submit
    setTitle('');
    setAuthor('');
    setGenre('');
    setPublicationDate('');
    setSummary('');
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {editBook ? "Edit Book" : "Add Book"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField 
          label="Title" 
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
        <TextField 
          label="Author" 
          variant="outlined"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required 
        />
        <TextField 
          label="Genre (optional)" 
          variant="outlined"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <TextField 
          label="Publication Date (optional)" 
          variant="outlined"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
        />
        <TextField 
          label="Summary (optional)" 
          variant="outlined"
          multiline
          minRows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          {editBook ? "Update Book" : "Add Book"}
        </Button>
      </Box>
    </Paper>
  );
}

export default BookForm;
