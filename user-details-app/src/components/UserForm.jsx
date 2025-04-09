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
import { toast } from 'react-hot-toast';

function UserForm({ editingUser, setEditingUser, onFormSubmit, existingUsers }) {

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
  
    // First Name & Last Name
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
  
    // Phone Number (must be exactly 10 digits and numeric only)
    if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone must contain digits only';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }
  
    // Email Validation using stricter regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
  
    // Address
    if (!formData.address.trim()) newErrors.address = 'Address is required';
  
    //  Duplicate user check (only when NOT editing)
    if (existingUsers && !editingUser) {
      const isDuplicate = existingUsers.some(user =>
        user.firstName.trim().toLowerCase() === formData.firstName.trim().toLowerCase() &&
        user.lastName.trim().toLowerCase() === formData.lastName.trim().toLowerCase() &&
        user.phone === formData.phone &&
        user.email.trim().toLowerCase() === formData.email.trim().toLowerCase() &&
        user.address.trim().toLowerCase() === formData.address.trim().toLowerCase()
      );
  
      if (isDuplicate) {
        toast.error('User with same details already exists');
          return false; // Prevent form from submitting
      }
    }
  
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
