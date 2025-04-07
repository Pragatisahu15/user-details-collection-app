import { useState, useEffect } from "react";
import './UserForm.css';

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

function UserForm(props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Populate form if editing an existing user
  useEffect(() => {
    if (props.editingUser) {
      setFormData({
        firstName: props.editingUser.firstName,
        lastName: props.editingUser.lastName,
        phone: props.editingUser.phone,
        email: props.editingUser.email,
        address: props.editingUser.address,
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  }, [props.editingUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const method = props.editingUser ? 'PUT' : 'POST';
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const url = props.editingUser
      ? `${BASE_URL}/api/users/${props.editingUser._id}`
      : `${BASE_URL}/api/users`;
    

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "User saved successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          address: "",
        });

        if (props.onUserAdded) {
          setTimeout(() => {
            props.onUserAdded(); // refresh list
          }, 300);
        }

        setTimeout(() => setSuccessMessage(''), 6000);
        props.setEditingUser(null); // reset edit mode
      } else {
        setSuccessMessage('');
        alert(data.error || "Something went wrong!");
      }
    } catch (error) {
      setSuccessMessage('');
      alert("Failed to connect to backend");
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography 
          variant="h5"
          align="center"
          gutterBottom
          className="form-title">
          {props.editingUser ? "Edit User Details" : "User Details Form"}
        </Typography>

        {successMessage && (
          <Typography
            variant="body1"
            color="green"
            align="center"
            sx={{ mb: 2 }}
          >
            {successMessage}
          </Typography>
        )}

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
            {props.editingUser ? "Update" : "Submit"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UserForm;
