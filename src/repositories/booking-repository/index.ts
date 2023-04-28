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

async function changeUserBooking(id: number, roomId: number, userId: number) {
  return prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    },
  });
}

const bookingRepository = {
  findBookingByUserId,
  findBookingsByRoomId,
  registerBooking,
  changeUserBooking,
};

export default bookingRepository;
