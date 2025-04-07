import axios from 'axios';

const DeleteUser = async (userId) => {
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  const response = await axios.delete(`${BASE_URL}/api/users/${userId}`);

  if (response.status !== 200) {
    throw new Error('Delete failed');
  }

  return response.data; 
};

export default DeleteUser;
