// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/health-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], required: true },
  contactNumber: { type: String },
  // Doctor specific fields
  specialty: { type: String }, 
  experience: { type: String },
  // Patient specific fields
  age: { type: Number },
  gender: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Create User Model
const User = mongoose.model('User', UserSchema);

// Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new Error();
    }
    
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

// Create initial admin user if none exists
const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Admin123@123', salt);
      
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        contactNumber: '9289678921'
      });
      
      await adminUser.save();
      console.log('Admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Call the function to create admin user when server starts
createAdminUser();

// Register User
app.post('/api/users/register', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      role, 
      contactNumber, 
      specialty, 
      experience,
      age,
      gender,
      address
    } = req.body;
    
    // Prevent creation of admin users through regular registration
    if (role === 'admin') {
      return res.status(403).json({ message: 'Admin registration not allowed' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user with role-specific fields
    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
      contactNumber
    };
    
    // Add role-specific fields
    if (role === 'doctor') {
      userData.specialty = specialty;
      userData.experience = experience;
    } else if (role === 'patient') {
      userData.age = age;
      userData.gender = gender;
      userData.address = address;
    }
    
    const user = new User(userData);
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login User
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );
    
    // Create user object to return (excluding password)
    const userToReturn = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      contactNumber: user.contactNumber
    };
    
    // Add role-specific fields
    if (user.role === 'doctor') {
      userToReturn.specialty = user.specialty;
      userToReturn.experience = user.experience;
    } else if (user.role === 'patient') {
      userToReturn.age = user.age;
      userToReturn.gender = user.gender;
      userToReturn.address = user.address;
    }
    
    // Determine redirect URL based on role
    let redirectUrl = '/';
    switch (user.role) {
      case 'admin':
        redirectUrl = '/admin-dashboard';
        break;
      case 'doctor':
        redirectUrl = '/doctor-dashboard';
        break;
      case 'patient':
        redirectUrl = '/patient-dashboard';
        break;
    }
    
    res.json({
      token,
      user: userToReturn,
      redirectUrl
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user profile
app.get('/api/users/me', auth, async (req, res) => {
  try {
    // Return user without password
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Get all users (admin only)
app.get('/api/users', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Simple route to check if server is running
app.get('/', (req, res) => {
  res.send('Health Management API is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));