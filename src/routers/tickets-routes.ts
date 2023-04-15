import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getUserTicket } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/', getUserTicket);

export { ticketsRouter };
