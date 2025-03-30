# Backend API - User Management

An Express.js backend for handling user registration, login, profile retrieval, and profile updates with image uploads using Multer.

---

##  Features
- User registration with profile picture upload
- Secure login with JWT authentication
- Protected routes for fetching and updating user profile
- Multer for handling file uploads

---

##  Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/fadddin/binbagback.git
cd binbagback
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env` File
Create a `.env` file in the root directory and add the following:
```env
PORT=5050
JWT_SECRET=your_secret_key
MONGO_URI=mongodb://localhost:27017/your-db-name
```

### 4. Start the Server
```bash
npm run dev
```
> Make sure MongoDB is running locally or use a cloud DB URI in `.env`

---

## 📫 API Endpoints

| Method | Endpoint         | Description                       |
|--------|------------------|-----------------------------------|
| POST   | /api/users/register | Register a new user with photo   |
| POST   | /api/users/login    | Authenticate user and get token  |
| GET    | /api/users/profile  | Get logged-in user's profile     |
| PUT    | /api/users/profile  | Update profile (with new photo)  |

---

##  Testing with Postman
Refer to [`postmanGuide.md`](./postmanGuide.md) for a complete guide on how to test each route using Postman.

---

##  Technologies Used
- Node.js
- Express.js
- MongoDB & Mongoose
- Multer (for file uploads)
- JSON Web Token (JWT)
- bcryptjs
- dotenv

---

## 🙌 License
[MIT](LICENSE)

---

