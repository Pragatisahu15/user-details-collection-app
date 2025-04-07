import express from 'express';
import {
    createUser,
    getUsers,
    updateUser,
    deleteUser
  } from '../controllers/UserController.js';  // This must match file name exactly
  

const router = express.Router();

// Routes using controller functions
router.post('/', createUser);        // Create user
router.get('/', getUsers);           // Get all users
router.put('/:id', updateUser);      // Update user
router.delete('/:id', deleteUser);   // Delete user

export default router;
