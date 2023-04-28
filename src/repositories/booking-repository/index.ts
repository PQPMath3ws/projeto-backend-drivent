import { prisma } from '@/config';

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function findBookingsByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    },
  });
}

async function registerBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

const bookingRepository = {
  findBookingByUserId,
  findBookingsByRoomId,
  registerBooking,
};

export default bookingRepository;
