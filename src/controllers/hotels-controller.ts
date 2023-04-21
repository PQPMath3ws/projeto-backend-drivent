import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const hotels = await hotelsService.getHotels(Number(userId));
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'CannotListHotelsError') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getRoomsFromHotel(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;

  if (!hotelId || Number.isNaN(Number(hotelId))) throw {};

  try {
    const hotelRooms = await hotelsService.getRoomsFromHotel(Number(userId), Number(hotelId));
    return res.status(httpStatus.OK).send(hotelRooms);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === 'CannotListHotelsError') return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
