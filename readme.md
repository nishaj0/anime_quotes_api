# API Documentation

## Authentication

### Login

- **URL:** `/api/login`
- **Method:** `POST`
- **Request Body:**
  - `user` (string): Username
  - `pass` (string): Password
- **Response:**
  - `accessToken` (string): JWT access token
- **Description:** Authenticate user and generate an access token.

### Logout

- **URL:** `/api/logout`
- **Method:** `POST`
- **Response:**
  - Success: `204 No Content`
- **Description:** Invalidate the current user's access token and log out.

## User

### Register

- **URL:** `/api/register`
- **Method:** `POST`
- **Request Body:**
  - `user` (string): Username
  - `pass` (string): Password
- **Response:**
  - `message` (string): Success message
- **Description:** Register a new user.

### Get User Profile

- **URL:** `/api/user/profile`
- **Method:** `GET`
- **Response:**
  - `username` (string): Username
  - `roles` (array): User roles
- **Description:** Get the profile information of the authenticated user.

## Quotes

### Get All Quotes

- **URL:** `/api/quotes`
- **Method:** `GET`
- **Response:**
  - `quotes` (array): Array of quote objects
- **Description:** Retrieve all quotes from the database.

### Add Quote

- **URL:** `/api/quotes`
- **Method:** `POST`
- **Request Body:**
  - `quote` (string): Quote text
  - `character` (string): Character name
  - `anime` (string): Anime name
  - `episode` (string): Episode details
- **Response:**
  - `message` (string): Success message
- **Description:** Add a new quote to the database.

<!-- ### Update Quote

- **URL:** `/api/quotes/:id`
- **Method:** `PUT`
- **Request Body:**
  - `quote` (string): Updated quote text
  - `character` (string): Updated character name
  - `anime` (string): Updated anime name
  - `episode` (string): Updated episode details
- **Response:**
  - `message` (string): Success message
- **Description:** Update an existing quote in the database. -->

### Delete Quote

- **URL:** `/api/quotes/:id`
- **Method:** `DELETE`
- **Response:**
  - `message` (string): Success message
- **Description:** Delete a quote from the database.

#