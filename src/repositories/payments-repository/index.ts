import { Payment, Ticket, TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function findPaymentByTicketId(ticketId: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

export type PaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

async function makePayment(ticketId: number, paymentParams: PaymentParams): Promise<[Payment, Ticket]> {
  return await prisma.$transaction([
    prisma.payment.create({
      data: {
        ticketId,
        ...paymentParams,
      },
    }),
    prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status: TicketStatus.PAID,
      },
    }),
  ]);
}

const paymentsRepository = {
  findPaymentByTicketId,
  makePayment,
};

export default paymentsRepository;
