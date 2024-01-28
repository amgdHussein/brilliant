import { UserRole, UserStatus } from '../../../core/constants';

export interface User {
  id: string;
  username: string;
  email: string;
  photoUrl: string;
  role: UserRole;
  status: UserStatus;
}
