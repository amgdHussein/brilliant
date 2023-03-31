import { Settings } from '@google-cloud/firestore';

export interface FirestoreModuleOptions {
  imports?: any[];
  useFactory: (...args: any[]) => Settings;
  inject?: any[];
}
