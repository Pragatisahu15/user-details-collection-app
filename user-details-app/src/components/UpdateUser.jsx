// UpdateUser.jsx
import axios from 'axios';

const UpdateUser = async (userId, updatedData) => {
  try {
    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await axios.put(`${BASE_URL}/api/users/${userId}`, updatedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export default UpdateUser;
