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

async function checkEnrollmentAndTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw cannotBookRoomError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote) throw cannotBookRoomError();
}

async function checkBookIsValid(roomId: number) {
  const room = await roomRepository.findRoomById(roomId);
  if (!room) throw notFoundError();

  const bookings = await bookingRepository.findBookingsByRoomId(roomId);

  if (room.capacity <= bookings.length) throw cannotBookRoomError();
}

async function bookRoomByIdForUserId(userId: number, roomId: number) {
  await checkEnrollmentAndTicket(userId);
  await checkBookIsValid(roomId);

  const registerBooking = bookingRepository.registerBooking(roomId, userId);

  return registerBooking;
}

async function changeBookingRoomForUserById(userId: number, roomId: number) {
  await checkBookIsValid(roomId);

  const userBooking = await bookingRepository.findBookingByUserId(userId);

  if (!userBooking || userBooking.userId !== userId) throw cannotBookRoomError();

  const booking = bookingRepository.changeUserBooking(userBooking.id, roomId, userId);

  return booking;
}

const bookingService = {
  getUserBooking,
  bookRoomByIdForUserId,
  changeBookingRoomForUserById,
};

export default bookingService;
