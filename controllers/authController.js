const User = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

//Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gmail@gmail.com',
    pass: '16-digit app password'
  }
});

//Generate otp 
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Register user and send OTP
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: 'User already exists' });

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    user = new User({ name, email, password, otp, otpExpiry });
    await user.save();

    await transporter.sendMail({
      from: 'vinaygk219@gmail.com',
      to: email,
      subject: 'OTP verification',
      text: `Your otp is: ${otp}`
    });

    res.status(201).json({ message: 'User registered. Please verify OTP to email.' });

  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

//verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'OTP verified successfully. You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error });
  }
};

//Resend Otp
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await transporter.sendMail({
      from: 'vinaygk219@gmail.com',
      to: email,
      subject: 'OTP verification',
      text: `Your otp is: ${otp}`
    });

    res.json({ message: 'OTP resent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error resending OTP', error });
  }
};

//Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.password !== password) return res.status(400).json({ message: 'Incorrect password' });

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Email not verified. Please verify OTP.' });
    }

    req.session.user = { id: user._id, email: user.email, name: user.name };
    res.json({ message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

//Logout user 
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Error logging out', error: err });
    res.json({ message: 'Logout successful' });
  });
};

//Dashboard (Protected route)
exports.dashboard = (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });
  res.json({ message: 'Welcome to the dashboard', user: req.session.user });
};