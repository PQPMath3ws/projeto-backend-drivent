import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { bookRoomForUser, changeUserBooking, getUserBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getUserBooking)
  .post('/', bookRoomForUser)
  .put('/:bookingId', changeUserBooking);

export { bookingRouter };
