// DeleteUser.jsx
import axios from 'axios';

const DeleteUser = async (userId, fetchUsers) => {
  try {
    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await axios.delete(`${BASE_URL}/api/users/${userId}`);
    if (response.status === 200) {
      fetchUsers(); // Refresh the list
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export default DeleteUser;
