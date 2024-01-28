import { Module } from '@nestjs/common';

import { FirestoreModule } from '../../core/providers';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [FirestoreModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
