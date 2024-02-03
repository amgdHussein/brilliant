import { UserGender } from './user-type.enum';

export interface User {
  id: string;
  username: string;
  email: string;
  photoUrl: string;
  age: number;
  gender: UserGender;
}
