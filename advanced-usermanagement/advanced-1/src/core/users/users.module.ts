import { UsersService } from './users.service';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PasswordHash } from '../../utils/secure/passwordHash';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [forwardRef(() => AuthModule), DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, PasswordHash],
  exports: [UsersService],
})
export class UsersModule {}
