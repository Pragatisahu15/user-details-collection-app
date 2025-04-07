import { useState, useEffect } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import DeleteUser from './components/DeleteUser';
import axios from 'axios';

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
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (userId) => {
    DeleteUser(userId, fetchUsers);
  };

  return (
    <>
      <UserForm onUserAdded={fetchUsers} editingUser={editingUser} setEditingUser={setEditingUser} />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
}

export default App;
