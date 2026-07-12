const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    let info = await transporter.sendMail({
      from: '"InvestAI Support" <support@investai.test>',
      to: userEmail,
      subject: "Congratulations! Welcome to InvestAI 🚀",
      text: `Hi ${userName},\n\nCongratulation you login in invest.aii! We are supporting you on how to invest safely and smartly. Please read all our terms and conditions carefully.\n\nHappy Investing,\nThe InvestAI Team`,
      html: `<h3>Hi ${userName},</h3><p>Congratulation you login in invest.aii!</p><p>We are supporting you on how to invest safely and smartly. Please read all our terms and conditions carefully.</p><br><p>Happy Investing,<br>The InvestAI Team</p>`
    });

    console.log("=========================================");
    console.log("📧 Welcome Email Sent!");
    console.log("🔗 Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log("=========================================");
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { name, email, phone, country, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      phone,
      country,
      password: hashedPassword,
    });

    if (user) {
      // Send Welcome Email asynchronously
      sendWelcomeEmail(user.email, user.name);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
        phone: user.phone,
        profileImage: user.profileImage,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfileImage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.profileImage = req.body.profileImage || '';
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        country: updatedUser.country,
        phone: updatedUser.phone,
        profileImage: updatedUser.profileImage,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfileImage,
};
