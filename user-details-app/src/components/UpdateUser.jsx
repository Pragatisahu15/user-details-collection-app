import axios from 'axios';

const UpdateUser = async (userId, updatedData) => {
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const response = await axios.put(`${BASE_URL}/api/users/${userId}`, updatedData, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status !== 200) {
    throw new Error('Failed to update user');
  }

  return response.data;
};

export default UpdateUser;
