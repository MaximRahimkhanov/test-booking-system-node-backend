import { Router } from 'express';
import ctrlWrapper from '../../helper/ctrlWrapper.js';
import {
  createBooking,
  getMyBookings,
  updateBooking,
  cancelBooking,
} from '../controllers/bookingController.js';

const router = Router();

router.post('/bookings', ctrlWrapper(createBooking));
router.get('/bookings/my', ctrlWrapper(getMyBookings));
router.patch('/bookings/:id', ctrlWrapper(updateBooking));
router.delete('/bookings/:id', ctrlWrapper(cancelBooking));

export default router;
