# 🎬 Cinephile Hub

Cinephile Hub is a feature-rich, responsive web application designed to solve the modern problem of content discovery and choice paralysis. In an era of endless streaming options, this app provides a centralized platform for users to discover, track, rate, and review movies, helping them make better and faster viewing decisions.

[Live Demo Link Here]  
![Cinephile Hub Screenshot](screenshot.png) <!-- Replace screenshot.png with your actual screenshot path -->

---

## ✨ Key Features
- **Discover & Filter**: Browse movies with advanced filtering by genre and sorting by popularity, release date, or user rating.  
- **User Authentication**: Secure user sign-up and login functionality using Firebase Authentication, allowing for personalized user experiences.  
- **Personalized Watchlist**: Logged-in users can add or remove movies from a persistent, personal watchlist powered by Cloud Firestore.  
- **Search Functionality**: A robust search feature to find specific movies using the TMDB API.  
- **Movie Details Page**: A comprehensive view for each movie, including its poster, summary, cast, runtime, and user ratings.  
- **User Reviews & Ratings**: Users can submit their own star ratings and written reviews for any movie.  
- **Movie Recommendations**: An engaging "You Might Also Like" carousel on the detail page to encourage further discovery.  
- **Responsive Design**: A mobile-first, fully responsive UI built with Tailwind CSS that looks great on all devices.  

---

## 🛠️ Tech Stack
- **Frontend**: React.js (with Hooks & Context API)  
- **Routing**: React Router  
- **Styling**: Tailwind CSS  
- **Backend & Database**: Firebase (Authentication & Cloud Firestore)  
- **API**: The Movie Database (TMDB) API  
- **Deployment**: Vercel / Netlify  

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites
- Node.js and npm installed on your machine.  
- A free API key from [The Movie Database (TMDB)](https://www.themoviedb.org/).  
- A free Firebase project with Authentication and Firestore enabled.  

---

### Installation & Setup

**1. Clone the repository:**
```bash
git clone https://github.com/your-username/cinephile-hub.git
```

**2.Navigate to the project directory:**
```
cd cinephile-hub
```

**3. Install dependencies:**
```
npm install
```

**4. Set up environment variables:**
Create a .env file in the root of the project.

Add your secret keys to this file:

VITE_API_KEY=YOUR_TMDB_API_KEY
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID

**5. Run the development server:**
npm run dev

The app will now be running at:
👉 http://localhost:5173
