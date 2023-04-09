import IUser from '../models/user';

interface User extends IUser {}

declare global {
  namespace Express {
    interface Request {
      decodedUser?: User;
    }
  }
}
