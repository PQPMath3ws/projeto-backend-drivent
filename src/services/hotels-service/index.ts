import { Hotel } from '@prisma/client';
import { cannotListHotelsError, notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import hotelsRepository from '@/repositories/hotels-repository';

async function getHotels(userId: number): Promise<Hotel[]> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) throw cannotListHotelsError();

  const hotels = await hotelsRepository.getHotels();

  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

const hotelsService = {
  getHotels,
};

export default hotelsService;
