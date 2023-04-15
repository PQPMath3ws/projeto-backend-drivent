import { Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

async function findLastTicketUserByEnrollmentId(enrollmentId: number): Promise<Ticket> {
  return await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketTypes(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

const ticketsRepository = {
  findLastTicketUserByEnrollmentId,
  findTicketTypes,
};

export default ticketsRepository;
