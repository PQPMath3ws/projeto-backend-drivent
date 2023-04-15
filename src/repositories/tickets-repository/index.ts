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

export type CreateTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function createUserTicket(ticket: CreateTicketParams): Promise<Ticket> {
  return await prisma.ticket.create({
    data: {
      ...ticket,
    },
  });
}

async function findTicketById(ticketId: number): Promise<Ticket> {
  return await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

const ticketsRepository = {
  findLastTicketUserByEnrollmentId,
  findTicketTypes,
  createUserTicket,
  findTicketById,
};

export default ticketsRepository;
