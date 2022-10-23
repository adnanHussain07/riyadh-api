const User = require('../model/userForWeb');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
  const { email, name, password,role  } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    return res.status(400).json('Email already exists')

    throw new CustomError.BadRequestError('Email already exists');
  }

  // first registered user is an admin
  // const isFirstAccount = (await User.countDocuments({})) === 0;
  // const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });

  // const tokenUser = createTokenUser(user);
  // attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ name });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Please provide email and password')
    throw new CustomError.BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json('No user with this name')
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(400).json('Invalid Credentials')
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

module.exports = {
  register,
  login,
  logout,
};
