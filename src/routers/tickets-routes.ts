import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createNewTicketByUserId, getUserTicket, getTicketTypes } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/', getUserTicket)
  .get('/types', getTicketTypes)
  .post('/', createNewTicketByUserId);

export { ticketsRouter };
