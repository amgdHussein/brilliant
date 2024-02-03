export const APP_LOGGER_PROVIDER = 'APP_LOGGER';

export const AUTH_SERVICE_PROVIDER = 'AUTH_SERVICE';
export const AUTH_STRATEGY_PROVIDER = 'AUTH_STRATEGY';

export const DB_OPTIONS_PROVIDER = 'DB_OPTIONS';
export const DB_PROVIDER = 'DATABASE';

export enum DB_COLLECTION_PROVIDER {
  //? Under implementation
  USERS = 'users',
  ARTICLES = 'articles',

  //! Not implemented
  NOTIFICATIONS = 'notifications',
  REVIEWS = 'reviews',
  COMMENTS = 'comments',
  REPORTS = 'reports',
}
