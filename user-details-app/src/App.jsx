import { useState, useEffect } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import DeleteUser from './components/DeleteUser';
import UpdateUser from './components/UpdateUser';
import axios from 'axios';
import { toast } from 'react-hot-toast'; 

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${BASE_URL}/api/users`);
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    }
  };

  const handleFormSubmit = async (formData, isEditMode) => {
    const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      if (isEditMode) {
        await UpdateUser(editingUser._id, formData);
        toast.success('User updated successfully');
      } else {
        await axios.post(`${BASE_URL}/api/users`, formData);
        toast.success('User added successfully');
      }
      fetchUsers();
    } catch (error) {
      toast.error('Error saving user');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await DeleteUser(userId);
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  return (
    <>
     
     <UserForm
      editingUser={editingUser}
      setEditingUser={setEditingUser}
      onFormSubmit={handleFormSubmit}
      existingUsers={users}
     />


      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}

export default App;
