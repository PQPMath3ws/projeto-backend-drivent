import { Ticket } from '@prisma/client';
import { prisma } from '@/config';

async function findLastTicketUserByEnrollmentId(enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

const ticketsRepository = {
  findLastTicketUserByEnrollmentId,
};

export default ticketsRepository;
