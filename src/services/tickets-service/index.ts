import { Ticket } from '@prisma/client';
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

const ticketsService = {
  getUserTicket,
};

export default ticketsService;
