import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getUserTicket, getTicketTypes } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/', getUserTicket).get('/types', getTicketTypes);

export { ticketsRouter };
