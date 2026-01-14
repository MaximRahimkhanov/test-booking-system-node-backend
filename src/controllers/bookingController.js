import createHttpError from 'http-errors';
import { Booking } from '../models/booking.js';
import { User } from '../models/user.js';

export const createBooking = async (req, res) => {
  const { clientId, businessId, date, timeFrom, timeTo } = req.body;

  //? перевіряємо користувачів: Якщо айді не знайдкні то помилка 404
  const client = await User.findById(clientId);
  const business = await User.findById(businessId);

  if (!client || !business) {
    throw createHttpError(404, 'User not found');
  }

  //?  перевіряємо ролі : Якзо роль не client помилка 403
  if (client.role !== 'client') {
    throw createHttpError(403, 'Only clients can create bookings');
  }

  if (business.role !== 'business') {
    throw createHttpError(400, 'Booking is allowed only for business users');
  }

  //?  перевірка перетину часу: шукуаєм вже ізнуючий запис і перевіряєм час, якщо час існує то посилка 400
  const conflict = await Booking.findOne({
    business: businessId,
    date,
    status: 'ACTIVE',
    $or: [
      {
        timeFrom: { $lt: timeTo },
        timeTo: { $gt: timeFrom },
      },
    ],
  });

  if (conflict) {
    throw createHttpError(400, 'Time slot already booked');
  }

  //?  створюємо бронь/запис в базі
  const booking = await Booking.create({
    client: clientId,
    business: businessId,
    date,
    timeFrom,
    timeTo,
  });

  res.status(201).json(booking);
};

export const getMyBookings = async (req, res) => {
  const { userId } = req.query;

  const bookings = await Booking.find({
    $or: [{ client: userId }, { business: userId }],
  }).populate('client business', 'name email role');

  res.status(200).json(bookings);
};

export const updateBooking = async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!booking) {
    throw createHttpError(404, 'Booking not found');
  }

  res.status(200).json(booking);
};

export const cancelBooking = async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findByIdAndUpdate(
    id,
    { status: 'CANCELLED' },
    { new: true },
  );

  if (!booking) {
    throw createHttpError(404, 'Booking not found');
  }

  res.status(200).json(booking);
};
