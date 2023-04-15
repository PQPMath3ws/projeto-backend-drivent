import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const { ticketId } = req.query;

  if (!ticketId && Number.isNaN(Number(ticketId))) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const ticketPayment = await paymentsService.getPaymentByTicketId(Number(userId), Number(ticketId));

    if (!ticketPayment) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(ticketPayment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function processPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const { ticketId, cardData } = req.body;

  if ((!ticketId && Number.isNaN(Number(ticketId))) || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentsService.makePayment(userId, ticketId, cardData);

    const finalPayment = payment[0];

    if (!finalPayment) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(finalPayment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
