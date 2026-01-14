import { Schema, model } from 'mongoose';

const bookingSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String, // '2026-01-14'
      required: true,
    },
    timeFrom: {
      type: String, // '10:00'
      required: true,
    },
    timeTo: {
      type: String, // '11:00'
      required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'CANCELLED'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true, versionKey: false },
);

export const Booking = model('Booking', bookingSchema);
