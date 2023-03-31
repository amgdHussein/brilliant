export enum FirestoreCollection {
  USERS = 'users',
  ARTICLES = 'articles',
}

export const FIRESTORE_PROVIDER = 'FIRESTORE';
export const FIRESTORE_OPTIONS_PROVIDER = 'FIRESTORE_OPTIONS';
export const FIRESTORE_COLLECTION_PROVIDERS: string[] =
  Object.values(FirestoreCollection);
