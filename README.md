
# Task Management Application

A full-stack task management application built with React, Node.js, Express, and MongoDB. It allows users to add, update, delete, and manage tasks with priority levels and notes.

## Features
- Add new tasks with titles, priority, and optional notes.
- Mark tasks as completed or pending.
- Delete tasks.
- Add and view notes for each task.
- Responsive UI built with Tailwind CSS.
- Backend API for managing tasks using Express and MongoDB.

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Icons:** Lucide-react

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/Santosh130602/Cog_Solutions.git

```

### 2. Install dependencies

#### For backend
```bash
cd server
npm install
```

#### For frontend
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `server` directory with the following content:

```
MONGO_URI = your_mongodb_connection_string
PORT=4000
```

### 4. Run the application

#### Run backend
```bash
cd server
nodemon index.js
```

#### Run frontend
```bash
npm run dev
```

### 5. Access the application
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## API Endpoints

- **GET** `/api/tasks-get` - Fetch all tasks.
- **POST** `/api/tasks-add` - Add a new task.
- **PATCH** `/api/tasks-update/:id` - Update a task.
- **PATCH** `/api/tasks-complete/:id/complete` - Mark task as completed.
- **DELETE** `/api/tasks-delete/:id` - Delete a task.

## Folder Structure
```
cognocore/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   ├── .env
├── src/
├── public/
├── App.js
├── index.js
├── README.md
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
