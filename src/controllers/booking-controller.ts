import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getUserBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getUserBooking(Number(userId));
    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room,
    });
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function bookRoomForUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  if (!roomId || Number.isNaN(Number(roomId))) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const booking = await bookingService.bookRoomByIdForUserId(Number(userId), Number(roomId));
    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    if (error.name === 'CannotBookRoomError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
