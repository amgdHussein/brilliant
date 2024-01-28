import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service';

@Module({
  imports: [],
  providers: [FirestoreService],
  exports: [FirestoreService],
})
export class FirestoreModule {}
