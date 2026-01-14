import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import usersRoutes from './routes/usersRoutes.js';
import bookingsRoutes from './routes/bookingsRoutes.js';

const PORT = process.env.PORT ?? 3000;
const app = express();

await connectMongoDB();

app.use(logger);
app.use(express.json());
app.use(cors());

app.use(usersRoutes);
app.use(bookingsRoutes);

app.use(notFoundHandler);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
