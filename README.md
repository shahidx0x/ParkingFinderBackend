# Parking Finder Server API

Base URL: `https://s3-parking-finder.onrender.com/`

## Core Technologies

1. **Express**: A minimal and flexible Node.js web application framework for building APIs and web applications.
2. **Mongoose (MongoDB)**: An Object Data Modeling (ODM) library for MongoDB and Node.js, simplifying the interaction with MongoDB.
3. **JSON Web Token (jsonwebtoken)**: A library for generating and verifying JSON Web Tokens, used for secure authentication and authorization.
4. **Axios**: A promise-based HTTP client for the browser and Node.js, used for making requests to external APIs.
5. **Multer**: A middleware for handling `multipart/form-data`, used for uploading files.



## Authentication

### Signup User

`POST /signup/user`

Creates a new user.

- Content-Type: `multipart/form-data`
- Parameters:
  - profile_image (required, file): User's profile image
  - email (required, string): User's email address
  - password (required, string): User's password
  - userinfo (required, array of objects): User's personal information
    - username (required, string): User's username
    - nick_name (required, string): User's nickname
    - cont_no (required, string): User's contact number
    - nid_image (required, string): URL of user's National ID image
    - licence_image (required, string): URL of user's driving license image
    - role (required, string): User's role
    - isVerified (required, string): User's verification status
- Responses:
  - 201: User created successfully
  - 400: Bad request
  - 500: Internal server error

### Signin User

`POST /signin/user`

Sign in a user with their email and password.

- Content-Type: `application/json`
- Parameters:
  - email (required, string): User's email address
  - password (required, string): User's password
- Responses:
  - 200: User signed in successfully
  - 400: Invalid email or password
  - 500: Internal server error

## Forgot Password

### Forgot Password

`POST /user/forgot-password`

Send an email to reset password.

- Content-Type: `application/json`
- Parameters:
  - email (required, string): Email of user who forgot password
- Responses:
  - 200: Success
  - 400: Bad request
  - 404: Not found
  - 500: Server error

### Verify Password Reset Token

`POST /user/verifyToken`

Verify that the provided password reset token is valid.

- Content-Type: `application/json`
- Parameters:
  - resetToken (required, string): Password reset token
- Responses:
  - 200: Password reset token is valid
  - 400: Invalid request parameters or invalid password reset token
  - 500: Internal server error

### Reset Password

`POST /user/resetPassword`

Reset user password with reset token.

- Content-Type: `application/json`
- Parameters:
  - resetToken (required, string): Password reset token
  - newPassword (required, string): New password
- Responses:
  - 200: Success
  - 400: Bad request
  - 404: Not found
  - 500: Server error

## Manage Users

### Update User Profile

`POST /user/profile/update/{email}`

Update user profile.

- Path Parameters:
  - email (required, string): User's email
- Responses:
  - 200: Profile updated successfully

### Search User by Email

`GET /user/search/email/{email}`

Search user by email.

- Path Parameters:
  - email (required, string): Email to search
- Responses:
  - 200: User found
  - 404: User not found

### Get All Users

`GET /user/list`

Get all users.

- Responses:
  - 200: List of all users

### Delete All Users

`DELETE /user/delete/all`

Delete all users.

- Responses:
  - 200: All users deleted

### Search User by Contact Number

`GET /user/search/contno/{cont_no}
 Search user by contact number.

- Path Parameters:
  - cont_no (required, string): Contact number to search
- Responses:

- 200: User found
- 404: User not found

