import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { bookRoomForUser, getUserBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', getUserBooking).post('/', bookRoomForUser);

export { bookingRouter };
