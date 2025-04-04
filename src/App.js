// src/App.js
import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import AuthPage from './components/AuthPage';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { Container, Box, Typography, Button, TextField } from '@mui/material';

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editBook, setEditBook] = useState(null);

  // Listen for authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Subscribe to the "books" collection in Firestore
  useEffect(() => {
    const booksCollection = collection(db, "books");
    const unsubscribe = onSnapshot(booksCollection, (snapshot) => {
      const booksData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setBooks(booksData);
    });
    return () => unsubscribe();
  }, []);

  // Add a new book to Firestore
  const addBook = async (book) => {
    try {
      await addDoc(collection(db, "books"), { ...book, checkedIn: true });
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };

  // Update an existing book in Firestore
  const updateBook = async (updatedBook) => {
    try {
      const bookRef = doc(db, "books", updatedBook.id);
      await updateDoc(bookRef, updatedBook);
      setEditBook(null);
    } catch (error) {
      console.error("Error updating book: ", error);
    }
  };

  // Delete a book from Firestore
  const deleteBook = async (id) => {
    try {
      const bookRef = doc(db, "books", id);
      await deleteDoc(bookRef);
    } catch (error) {
      console.error("Error deleting book: ", error);
    }
  };

  // Toggle check-in/check-out status
  const toggleCheck = async (id, currentStatus) => {
    try {
      const bookRef = doc(db, "books", id);
      await updateDoc(bookRef, { checkedIn: !currentStatus });
    } catch (error) {
      console.error("Error toggling check status: ", error);
    }
  };

  // Filter books by search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.genre && book.genre.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (book.summary && book.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (book.publicationDate && book.publicationDate.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!user) {
    return <AuthPage />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Library Management System</Typography>
        <Button variant="contained" color="secondary" onClick={() => signOut(auth)}>
          Sign Out
        </Button>
      </Box>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Welcome, {user.email}
      </Typography>
      <Box sx={{ mb: 3 }}>
        <TextField 
          fullWidth
          variant="outlined"
          label="Search by title, author, genre, etc."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <BookForm 
          addBook={addBook} 
          editBook={editBook} 
          updateBook={updateBook} 
        />
      </Box>
      <BookList 
        books={filteredBooks} 
        deleteBook={deleteBook} 
        toggleCheck={toggleCheck}
        setEditBook={setEditBook}
      />
    </Container>
  );
}

export default App;
