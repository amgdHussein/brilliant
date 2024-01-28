import { ServiceAccount } from 'firebase-admin';
import * as firebaseConfigs from './firebase.config.json';

export const firebaseServiceAccount: ServiceAccount = {
  clientEmail: firebaseConfigs.client_email,
  privateKey: firebaseConfigs.private_key,
  projectId: firebaseConfigs.project_id,
};
