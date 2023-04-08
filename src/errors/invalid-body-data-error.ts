import { ApplicationError } from '@/protocols';

export function invalidBodyDataError(message: string): ApplicationError {
  return {
    name: 'InvalidBodyDataError',
    message,
  };
}
