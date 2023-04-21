import { prisma } from '@/config';

async function getHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  getHotels,
  findRoomsByHotelId,
};

export default hotelsRepository;
