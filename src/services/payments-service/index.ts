import { Payment, Ticket } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymetsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getPaymentByTicketId(userId: number, ticketId: number): Promise<Payment> {
  const ticket = await ticketsRepository.findTicketById(ticketId);

  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollmentById(ticket.enrollmentId);

  if (enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymetsRepository.findPaymentByTicketId(ticketId);

  if (!payment) throw notFoundError();

  return payment;
}

async function makePayment(
  userId: number,
  ticketId: number,
  cardData: { issuer: string; number: number; name: string; expirationDate: Date; cvv: number },
): Promise<[Payment, Ticket]> {
  const ticket = await ticketsRepository.findTicketById(ticketId);

  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findEnrollmentById(ticket.enrollmentId);

  if (enrollment.userId !== userId) throw unauthorizedError();

  const ticketValue = await ticketsRepository.findTicketWithTypeById(ticketId);

  const paymentObj = {
    ticketId,
    value: ticketValue.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymetsRepository.makePayment(ticketId, paymentObj);

  return payment;
}

const paymentsService = {
  getPaymentByTicketId,
  makePayment,
};

export default paymentsService;
