import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';             // ✅ Import only once
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['https://user-details-collection-app.vercel.app', 'http://localhost:5173']
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('User Details API is running...');
});

// Use userRoutes for all /api/users endpoints
app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error('❌ MongoDB connection error:', err));
