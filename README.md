User Details Collection Web App
The User Details Collection Web App is a full-stack MERN application that collects user information—first name, last name, phone number, email, and address—and stores it in MongoDB Atlas. The app includes validation to ensure correct input before submission.

The frontend is built with React.js and styled using Material UI. It features a responsive form with validation for empty fields, email format, and 10-digit phone numbers.

The backend, built with Node.js and Express.js, exposes a /submit POST API. It validates incoming data using a Mongoose schema and saves it to MongoDB.

The project is organized into frontend and backend folders inside a parent task folder. To run locally, start the backend with node index.js and the frontend with npm run dev.

You can test the API using tools like Hoppscotch or Postman by sending POST requests to http://localhost:5000/submit.

For deployment, host the frontend on Vercel, backend on Render, and continue using MongoDB Atlas for the database.

This app demonstrates full-stack development using modern tools and best practices.

