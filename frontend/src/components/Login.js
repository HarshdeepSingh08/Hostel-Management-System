import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';
import { useAuth } from '../auth/AuthContext'; // Import useAuth hook
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    designation: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login method from AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      password: formData.password,
      designation: formData.designation
    };

    const apiUrl = formData.designation === 'Admin'
      ? 'http://localhost:8000/api/v1/admin/login'
      : 'http://localhost:8000/api/v1/users/login';

    try {
      const response = await axiosInstance.post(apiUrl, data);
      const { success, message, token } = response.data;

      if (success) {
        // Use login method from AuthContext to store token and update state
        login(token);

        // Navigate to the appropriate dashboard
        if (formData.designation === 'Admin') {
          navigate('/adminDashboard');
        } else {
          navigate('/studentDashboard');
        }
      } else {
        setMessage(message);
      }
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-background">
      <Container className="login-container">
        <h2 className="text-center my-4">Login</h2>
        {message && <Alert variant="info" className="text-center">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formEmail" className="mt-3">
            <Form.Label column sm={3}>Email</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPassword" className="mt-3">
            <Form.Label column sm={3}>Password</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formDesignation" className="mt-3">
            <Form.Label column sm={3}>Designation</Form.Label>
            <Col sm={9}>
              <Form.Control
                as="select"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                <option value="">Select designation</option>
                <option value="Admin">Admin</option>
                <option value="Student">Student</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <div className="text-center mt-4">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>

          <div className="text-center mt-3">
            <p>Don't have an account? <Link to="/register">Click here</Link></p>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
