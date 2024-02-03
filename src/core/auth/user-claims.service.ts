import { Injectable } from '@nestjs/common';

import * as firebase from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

import { UnauthorizedException } from '../exceptions';

@Injectable()
export class UserClaimsService {
  private app: firebase.app.App;

  public async userClaims(uid: string): Promise<DecodedIdToken> {
    const claims = (await this.app.auth().getUser(uid)).customClaims as DecodedIdToken;

    if (!claims) return {} as DecodedIdToken;
    if (claims && claims.email_verified) return claims;

    throw new UnauthorizedException('Unverified user!');
  }

  public async setUserClaims(uid: string, claims: object): Promise<void> {
    return await this.app.auth().setCustomUserClaims(uid, claims);
  }
}
