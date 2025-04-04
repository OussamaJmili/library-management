// src/components/BookList.js
import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@mui/material';

function BookList({ books, deleteBook, toggleCheck, setEditBook }) {
  if (books.length === 0) {
    return (
      <Typography variant="h6" sx={{ mt: 2 }}>
        No books available. Add some!
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} alignItems="stretch">
      {books.map((book) => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          key={book.id}
          sx={{ display: 'flex' }}
        >
          <Card 
            variant="outlined" 
            sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                by {book.author}
              </Typography>
              {book.genre && (
                <Typography variant="body2">
                  Genre: {book.genre}
                </Typography>
              )}
              {book.publicationDate && (
                <Typography variant="body2">
                  Publication Date: {book.publicationDate}
                </Typography>
              )}
              {book.summary && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {book.summary}
                </Typography>
              )}
              <Typography variant="body2" sx={{ mt: 1 }}>
                Status: {book.checkedIn ? 'Checked In' : 'Checked Out'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small"
                onClick={() => toggleCheck(book.id, book.checkedIn)}
              >
                {book.checkedIn ? 'Check Out' : 'Check In'}
              </Button>
              <Button 
                size="small"
                onClick={() => setEditBook(book)}
              >
                Edit
              </Button>
              <Button 
                size="small"
                color="error"
                onClick={() => deleteBook(book.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default BookList;
