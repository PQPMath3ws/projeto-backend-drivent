import { Payment } from '@prisma/client';
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

const paymentsService = {
  getPaymentByTicketId,
};

export default paymentsService;
