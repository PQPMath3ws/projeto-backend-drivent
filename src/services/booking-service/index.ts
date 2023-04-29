import { cannotBookRoomError, notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomRepository from '@/repositories/room-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getUserBooking(userId: number) {
  const userBooking = await bookingRepository.findBookingByUserId(userId);
  if (!userBooking) throw notFoundError();

  return userBooking;
}

async function bookRoomByIdForUserId(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw cannotBookRoomError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw cannotBookRoomError();

  const room = await roomRepository.findRoomById(roomId);
  if (!room) throw notFoundError();

  const bookings = await bookingRepository.findBookingsByRoomId(roomId);

  if (room.capacity <= bookings.length) throw cannotBookRoomError();

  const registerBooking = bookingRepository.registerBooking(roomId, userId);

  return registerBooking;
}

async function changeBookingRoomForUserById(userId: number, roomId: number, bookingId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw cannotBookRoomError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw cannotBookRoomError();

  const userBooking = await bookingRepository.findBookingById(bookingId);

  if (!userBooking) throw cannotBookRoomError();

  if (userBooking.userId !== userId) throw cannotBookRoomError();

  const room = await roomRepository.findRoomById(roomId);
  if (!room) throw notFoundError();

  const bookings = await bookingRepository.findBookingsByRoomId(roomId);

  if (room.capacity <= bookings.length) throw cannotBookRoomError();

  const booking = await bookingRepository.changeUserBooking(userBooking.id, roomId, userId);

  return booking;
}

const bookingService = {
  getUserBooking,
  bookRoomByIdForUserId,
  changeBookingRoomForUserById,
};

export default bookingService;
