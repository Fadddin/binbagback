#  Postman API Testing Guide

This guide helps you test the Express backend API (user registration, login, profile fetch, and update) using Postman.

---

##  Base URL
```
http://localhost:5050/api/users
```
> Replace `5050` with your actual port if different.

---

## 1. Register User (POST /register)

### URL:
```
POST /register
```

### Headers:
- `Content-Type`: `multipart/form-data`

### Body (form-data):
| Key             | Type  | Value                          |
|------------------|--------|----------------------------------|
| name           | Text  | John Doe                        |
| email          | Text  | john@example.com                |
| address        | Text  | 123 Main St                     |
| password       | Text  | yourpassword                    |
| bio            | Text  | Just a dev                      |
| profilePicture | File  | (Choose a local image file)     |

### Expected Response:
```json
{
  "token": "<JWT Token>"
}
```

---

## 2. Login User (POST /login)

### URL:
```
POST /login
```

### Headers:
- `Content-Type`: `application/json`

### Body (raw JSON):
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

### Expected Response:
```json
{
  "token": "<JWT Token>"
}
```

Use this token in all future authenticated requests.

---

## 3. Get User Profile (GET /profile)

### URL:
```
GET /profile
```

### Headers:
- `Authorization`: `Bearer <JWT Token>`

### Expected Response:
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  ...
}
```

---

## 4. Update User Profile (PUT /profile)

### URL:
```
PUT /profile
```

### Headers:
- `Authorization`: `Bearer <JWT Token>`
- `Content-Type`: `multipart/form-data`

### Body (form-data):
| Key             | Type  | Value                          |
|------------------|--------|----------------------------------|
| name           | Text  | Updated Name                    |
| address        | Text  | New Address                     |
| bio            | Text  | Updated Bio                     |
| profilePicture | File  | (Optional updated image file)   |

### Expected Response:
```json
{
  "_id": "...",
  "name": "Updated Name",
  "address": "New Address",
  ...
}
```

