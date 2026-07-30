const User = require('../models/User');
const crypto = require('crypto');
const { Resend } = require('resend');
const generateToken = require('../utils/generateToken');
const { hashPassword, comparePassword } = require('../utils/hashPassword');

const resend = new Resend(process.env.RESEND_API_KEY);

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerifyEmail(user) {
  const code = generateCode();
  user.verifyCode = code;
  user.verifyExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  const verifyUrl = `${process.env.CLIENT_URL}/verify-email`;

  await resend.emails.send({
    from: 'NoteFi <onboarding@resend.dev>',
    to: user.email,
    subject: 'Your NoteFi verification code',
    html: `
      <div style="font-family:Helvetica,Arial,sans-serif;background:#FAF9F6;padding:40px 0;">
        <div style="max-width:480px;margin:0 auto;background:#fff;border:1px solid #E7E5DE;border-radius:16px;padding:32px 40px;text-align:center;">
          <div style="font-size:20px;font-weight:700;color:#1B2333;margin-bottom:20px;text-align:left;">NoteFi</div>
          <h1 style="font-size:20px;color:#1B2333;margin:0 0 12px;text-align:left;">Verify your email address</h1>
          <p style="font-size:15px;color:#4A5268;line-height:1.6;margin:0 0 24px;text-align:left;">
            Hi ${user.username}, enter this code to verify your NoteFi account:
          </p>
          <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#1B2333;background:#FAF9F6;border:1px solid #E7E5DE;border-radius:12px;padding:20px 0;margin-bottom:24px;">
            ${code}
          </div>
          <a href="${verifyUrl}" target="_blank" style="display:inline-block;background:#1B2333;color:#fff;padding:13px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;margin-bottom:20px;">
            Go to verification page
          </a>
          <p style="font-size:13px;color:#8A8F9C;text-align:left;margin:16px 0 0;">
            This code expires in 15 minutes.
          </p>
        </div>
      </div>
    `,
  });

  return code;
}

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      if (userExists.email === email) {
        return res.status(400).json({ message: 'Email already registered' });
      }
      return res.status(400).json({ message: 'Username already taken' });
    }

    const passwordHash = await hashPassword(password);
    const user = await User.create({ username, email, passwordHash });

    await sendVerifyEmail(user);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      verified: false,
      message: 'Verification code sent to your email',
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ message: 'Email and code are required' });
    }

    const user = await User.findOne({
      email,
      verifyCode: code,
      verifyExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired code' });
    }

    user.verified = true;
    user.verifyCode = null;
    user.verifyExpires = null;
    await user.save();

    generateToken(res, user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      verified: true,
    });
  } catch (error) {
    next(error);
  }
};

const resendCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.verified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    await sendVerifyEmail(user);

    res.json({ message: 'New verification code sent' });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await comparePassword(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    generateToken(res, user._id);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    expires: new Date(0),
  });
  res.json({ message: 'Logged out' });
};

const getMe = async (req, res) => {
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    bio: req.user.bio,
    createdAt: req.user.createdAt,
  });
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Please provide your email' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({ message: 'If that email is registered, a reset link has been sent.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    await resend.emails.send({
      from: 'NoteFi <onboarding@resend.dev>',
      to: user.email,
      subject: 'Reset your NoteFi password',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="margin-bottom: 8px;">Reset your password</h2>
          <p style="color: #555; margin-bottom: 24px;">Hi ${user.username}, click the button below to reset your NoteFi password. This link expires in 15 minutes.</p>
          <a href="${resetUrl}" style="display: inline-block; background: #3D5AF1; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600;">Reset password</a>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    res.json({ message: 'If that email is registered, a reset link has been sent.' });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and password are required' });
    }

    const user = await User.findOne({
      resetToken: token,
      resetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset link' });
    }

    user.passwordHash = await hashPassword(password);
    user.resetToken = null;
    user.resetExpires = null;
    await user.save();

    res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, logout, getMe, forgotPassword, resetPassword, verifyEmail, resendCode };
