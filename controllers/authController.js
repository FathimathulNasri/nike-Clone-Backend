const { registerUser, loginUser } = require('../services/authService');
const User = require('../models/User');


// Controller for register
const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Controller for login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, existingUser } = await loginUser(email, password);
    if(!token){
      res.status(404).json({ message: 'Login Failed' });
    }
    res.status(200||201).json({ message: 'login succesfully', token, user:existingUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const {role} = req.user
  res.status(200||201).json({ role});

}


const getAllUsers = async (req, res) => {
  try {
    // Check if the user is an admin (middleware should handle this check)
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

module.exports = { register, login, getUser, getAllUsers };
