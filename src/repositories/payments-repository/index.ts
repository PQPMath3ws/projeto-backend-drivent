import { Payment } from '@prisma/client';
import { prisma } from '@/config';

async function findPaymentByTicketId(ticketId: number): Promise<Payment> {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

const paymentsRepository = {
  findPaymentByTicketId,
};

export default paymentsRepository;
