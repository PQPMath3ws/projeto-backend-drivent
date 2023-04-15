import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getUserTicket(userId: number): Promise<Ticket> {
  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!userEnrollment) throw notFoundError();

  const userTicket: Ticket = await ticketsRepository.findLastTicketUserByEnrollmentId(userEnrollment.id);

  if (!userTicket) throw notFoundError();

  return userTicket;
}

async function getTicketTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketsRepository.findTicketTypes();

  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}

async function createNewTicketByUserId(userId: number, ticketTypeId: number): Promise<Ticket> {
  const userEnrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!userEnrollment) throw notFoundError();

  const createUserTicket = {
    ticketTypeId,
    enrollmentId: userEnrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketsRepository.createUserTicket(createUserTicket);

  const userTicket: Ticket = await ticketsRepository.findLastTicketUserByEnrollmentId(userEnrollment.id);

  if (!userTicket) throw notFoundError();

  return userTicket;
}

const ticketsService = {
  getUserTicket,
  getTicketTypes,
  createNewTicketByUserId,
};

export default ticketsService;
