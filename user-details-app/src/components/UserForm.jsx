import { useState, useEffect } from 'react';
import './UserForm.css';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';

function UserForm({ editingUser, setEditingUser, onFormSubmit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setFormData({
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        phone: editingUser.phone,
        email: editingUser.email,
        address: editingUser.address,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await onFormSubmit(formData, !!editingUser);
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
    });
    setEditingUser(null); //Reset form to 'create' mode after editing
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h5" align="center" gutterBottom className="form-title">
          {editingUser ? 'Edit User Details' : 'User Details Form'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
            error={!!errors.address}
            helperText={errors.address}
            multiline
            rows={3}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            {editingUser ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UserForm;
