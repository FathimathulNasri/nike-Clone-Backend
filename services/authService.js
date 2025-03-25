const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Save new user
  const newUser = new User({ name, email, password: hashedPassword});
  await newUser.save();
  return newUser;
};

  const                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           loginUser = async (email, password) => {
  try{
      const adminExists = await User.findOne({ role:'admin'  });
      if (!adminExists) {
        // If no admin exists, create one with pre-set admin credentials
        const hashedPassword = await bcrypt.hash('adminpassword', 10); // Pre-set password
  
        const newAdmin = new User({
          username: 'admin', // Pre-set username
          email: 'admin@example.com', // Pre-set email
          password: hashedPassword,
          role:'admin',
        });
  
        await newAdmin.save();
      }
      const existingUser = await User.findOne({email})
  if(!existingUser) {
      return "User Not Exist"
  }
  const isMatch = await bcrypt.compare(password,existingUser.password)
  if(!isMatch) {
      return "Invalid Email or Password"
  }
  const token = jwt.sign({id: existingUser._id,role:existingUser.role}, process.env.JWT_SECRET, {expiresIn:'3 days'} )
  return {token,existingUser}
}
   catch(error){
       return "Login Failed"
      }
}
  

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw new Error('Error fetching users');
  }
};


module.exports = { registerUser, loginUser, getAllUsers };
