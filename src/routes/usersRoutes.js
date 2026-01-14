import { Router } from 'express';
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserData,
} from '../controllers/userController.js';
import ctrlWrapper from '../../helper/ctrlWrapper.js';

const router = Router();

router.post('/users', ctrlWrapper(createUser));

router.get('/users', ctrlWrapper(getAllUsers));
router.get('/users/:userId', ctrlWrapper(getUserById));

router.delete('/users/:userId', ctrlWrapper(deleteUserById));
router.patch('/users/:userId', ctrlWrapper(updateUserData));

export default router;
