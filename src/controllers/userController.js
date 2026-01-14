import createHttpError from 'http-errors';
import { User } from '../models/user.js';

export const getAllUsers = async (req, res) => {
  const { role } = req.query;

  const filter = role ? { role } : {};
  const users = await User.find(filter);

  res.status(200).json(users);
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
};

export const createUser = async (req, res) => {
  const user = await User.create(req.body);

  res.status(201).json(user);
};

export const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOneAndDelete({
    _id: userId,
  });

  if (!user) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.status(200).json(user);
};

export const updateUserData = async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
  });

  if (!user) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.status(200).json(user);
};
