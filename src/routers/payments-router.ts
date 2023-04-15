import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPaymentByTicketId, processPayment } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPaymentByTicketId).post('/process', processPayment);

export { paymentsRouter };
