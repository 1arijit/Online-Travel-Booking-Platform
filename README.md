# 🏡 StayNest — Travel & Hotel Listing Platform

A responsive **Airbnb-style travel and hotel listing web application** where users can explore, create, edit, and manage accommodation listings. The application includes secure password-based authentication, image-based listings, reviews, location mapping, and a responsive UI for desktop and mobile devices.

🌐 **Live Demo:** [https://travel-project-1bn5.onrender.com]

---

## ✨ Features

* 🔐 **User Authentication**

  * Password-based user registration and login
  * Secure session-based authentication
  * Protected routes for authenticated users

* 🏨 **Hotel & Property Listings**

  * Browse available properties
  * Create new accommodation listings
  * Edit and delete your own listings
  * View detailed property information
  * Add property images

* ⭐ **Reviews & Ratings**

  * Authenticated users can add reviews
  * Users can delete their own reviews
  * Display ratings and reviews on property pages

* 🗺️ **Interactive Maps**

  * Display property locations using a Map API
  * Location-based visualization for listings

* 📱 **Responsive Design**

  * Mobile-friendly interface
  * Responsive layouts using Bootstrap
  * Works across desktop, tablet, and mobile devices

* ☁️ **Cloud Deployment**

  * Deployed using **Render**
  * MongoDB used for persistent application data

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap
* EJS (Embedded JavaScript Templates)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* Password-based authentication
* Session management
* Protected routes and authorization

### APIs & Deployment

* Map API for property location visualization
* Render for deployment

---

## 🏗️ Application Architecture

```text
User
 │
 ▼
EJS + Bootstrap Frontend
 │
 ▼
Express.js Server
 │
 ├── Authentication
 │
 ├── Listing Management
 │
 ├── Review Management
 │
 └── Map API Integration
 │
 ▼
MongoDB
```

---

## 📂 Project Structure

```text
project/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── listings/
│   ├── users/
│   ├── reviews/
│   └── layouts/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│
├── app.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/1arijit/Online-Travel-Booking-Platform.git
cd Online-Travel-Booking-Platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
MAP_API_KEY=your_map_api_key
```

> Never commit your `.env` file or expose your API keys publicly.

### 4. Start the application

For development:

```bash
npm start
```

Or, if using nodemon:

```bash
nodemon app.js
```

The application will be available at:

```text
http://localhost:8080
```

---

## 🔑 Authentication

The application provides a password-based authentication system that allows users to:

1. Create an account
2. Log in securely
3. Access authenticated features
4. Create and manage their listings
5. Add and manage reviews

Authentication and authorization are handled on the server side to restrict access to protected resources.

---

## 🗺️ Map Integration

The application integrates a **Map API** to provide location-based visualization for property listings.

Each listing can display its location on an interactive map, allowing users to better understand the property's geographical location.

---

## 📱 Responsive Design

The frontend is designed to provide a consistent experience across:

* 💻 Desktop
* 📱 Mobile
* 📲 Tablet

Bootstrap's responsive grid and utility classes are used alongside custom CSS to build the responsive interface.

---

## ☁️ Deployment

The application is deployed on **Render** with MongoDB as the persistent database.

### Production Architecture

```text
Client
  │
  ▼
Render
  │
  ▼
Node.js + Express.js
  │
  ├──────────────► Map API
  │
  ▼
MongoDB
```

---

## 🔮 Future Improvements

* Advanced property search and filtering
* Location-based search
* Booking and reservation system
* Wishlist functionality
* Payment gateway integration
* Email notifications
* User profile management
* Admin dashboard
* Image optimization and cloud storage

---

## 👨‍💻 Author

**Your Name**

* GitHub: [GitHub](https://github.com/1arijit)
* LinkedIn: [LinkedIn](https://www.linkedin.com/in/arijit-de-779552297/)

---

## 📄 License

This project is created for educational and portfolio purposes.
