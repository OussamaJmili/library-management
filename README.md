# Library Management System

This project is a **Library Management System** built with React, Firebase Authentication, Firestore, and Material UI. Users can sign up, log in, and manage a list of books by adding, editing, deleting, and toggling check-in/check-out statuses. It also provides a search function to filter books by various metadata.

## Features

- **User Authentication:** Sign up and Login via Firebase Authentication.
- **Book Management:** 
  - Add, edit, and delete books.
  - Toggle check-in/check-out status.
  - Books include metadata like title, author, genre, publication date, and summary.
- **Search:** Filter books based on title, author, genre, summary, or publication date.
- **Modern UI:** Clean and responsive design using Material UI.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- A Firebase project with:
  - **Firestore** enabled.
  - **Firebase Authentication** enabled (Email/Password provider).

### Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository_url>
   cd library-management

2. install Dependencies:
    npm install

3. Configure Firebase:

The project’s Firebase configuration is located in src/firebase.js. It currently contains my Firebase project credentials. To run the project on your own, update the file with your Firebase configuration, you can run it with mine its ok.

4. Run the App:
npm start