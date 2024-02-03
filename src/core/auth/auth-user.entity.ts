import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { Role } from '../constants';

export class AuthUser {
  constructor(
    public id: string,
    public email: string,
    public emailVerified: boolean,
    public roles: Role[],

    public tokenInitiateAt: number,
    public tokenExpireAt: number,
  ) {}

  public static fromUserClaims(userClaims: DecodedIdToken): AuthUser {
    return new AuthUser(
      userClaims.uid,
      userClaims.email,
      userClaims.email_verified,
      userClaims.roles,

      userClaims.iat,
      userClaims.exp,
    );
  }
}
