import { Module, DynamicModule, Provider } from '@nestjs/common';
import {
  Firestore,
  Settings,
  CollectionReference,
} from '@google-cloud/firestore';

import { FirestoreModuleOptions } from 'src/core/configs/gcloud';

import {
  FIRESTORE_COLLECTION_PROVIDERS,
  FIRESTORE_OPTIONS_PROVIDER,
  FIRESTORE_PROVIDER,
} from 'src/core/constants';

@Module({})
export class FirestoreModule {
  static forRoot(options: FirestoreModuleOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: FIRESTORE_OPTIONS_PROVIDER,
      useFactory: options.useFactory,
      inject: options.inject,
    };

    const databaseProvider: Provider = {
      provide: FIRESTORE_PROVIDER,
      useFactory: (config: Settings): Firestore => new Firestore(config),
      inject: [FIRESTORE_OPTIONS_PROVIDER],
    };

    const collectionProviders: Provider[] = Object.values(
      FIRESTORE_COLLECTION_PROVIDERS,
    ).map(
      (providerName: string): Provider => ({
        provide: providerName,
        useFactory: (database: Firestore): CollectionReference => {
          return database.collection(providerName);
        },
        inject: [FIRESTORE_PROVIDER],
      }),
    );

    const targetModule: DynamicModule = {
      global: true,
      module: FirestoreModule,
      providers: [optionsProvider, databaseProvider, ...collectionProviders],
      exports: [databaseProvider, ...collectionProviders],
    };

    return targetModule;
  }
}
