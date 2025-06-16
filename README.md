
# 🌍 TravelMate – Full-Stack Travel Itinerary Planner

TravelMate is a full-stack web application that lets users create, manage, and share their dream travel itineraries. It supports secure authentication, profile management, dynamic itinerary creation, and image uploads with Cloudinary.



live demo: [(https://travelmate2.netlify.app/)]

---

## 🛠️ Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Frontend    | React, HTML, CSS               |
| Backend     | Node.js, Express.js            |
| Database    | MongoDB (hosted on Atlas)      |
| Image Upload| Cloudinary + Multer            |
| Hosting     | Frontend on Netlify / Backend on Vercel |

---

## 📁 Project Structure

```

TravelMate/
├── backend/           # Node.js backend (Express, MongoDB, Cloudinary)
│   ├── routes/
│   ├── models/
│   ├── .env           # MongoDB URI & Cloudinary secrets (excluded from Git)
│   └── server.js
├── frontend/          # React frontend
│   ├── public/
│   ├── src/
│   ├── .env (optional for public keys)
│   └── package.json

```

---

## 🔧 Prerequisites

- Node.js & npm installed
- MongoDB Atlas account (free)
- Cloudinary account (free)
- Git

---

## 🔑 Environment Variables

### 1. **MongoDB (Atlas)**

Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free cluster.  
Then get your connection URI:

```

MONGODB\_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/travelmate

```

### 2. **Cloudinary**

Go to [https://cloudinary.com](https://cloudinary.com), sign up and get:

```

CLOUDINARY\_CLOUD\_NAME=your\_cloud\_name
CLOUDINARY\_API\_KEY=your\_api\_key
CLOUDINARY\_API\_SECRET=your\_secret

````

### 📄 `.env` file in `backend/`

```env
PORT=5000
MONGODB_URI=mongodb+srv://your_user:your_pass@cluster.mongodb.net/travelmate
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_secret
````

---

## 🚀 How to Run the Project Locally

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/yourusername/travelmate.git
cd travelmate
```

---

### 🔹 2. Install Backend Dependencies

```bash
cd backend
npm install
```

Create your `.env` file as shown above.

Then start the backend server:

```bash
npm start
```

OR

```bash
node server.js
```

It runs on [http://localhost:5000](http://localhost:5000)

---

### 🔹 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

Start the React app:

```bash
npm start
```

Frontend runs on [http://localhost:3000](http://localhost:3000)

---

## 📸 Image Upload with Cloudinary

* Itineraries allow users to upload multiple images.
* Images are uploaded to Cloudinary using `multer-storage-cloudinary`.
* A Cloudinary folder named `travelmate_uploads` will be created automatically.

---

## 🔐 Authentication & Features

* User Signup & Login
* Password strength validation
* Profile creation and update
* Itinerary creation with title, dates, destination, activities, notes & photos
* View, delete, and share itinerary
* Invite collaborator modal
* Full persistence using MongoDB

---

## 🌐 Deployment Guide

### Frontend (React)

* Host on **Netlify** or **Vercel**
* Set `REACT_APP_API_URL` if needed in `.env`

### Backend (Express)

* Host on **Vercel**
* Add environment variables (MongoDB URI & Cloudinary keys) in Vercel → Project → Settings → Environment Variables

---

## 🙌 Author

Made with ❤️ by [Mr.Pratik Tikhe](https://github.com/Mr-PratikTikhe)

---

## 📄 License

MIT – Feel free to use or contribute!

