import { UsersService } from './users.service';
import { forwardRef, Module } from '@nestjs/common';
import { PasswordHash } from '../../utils/secure/passwordHash';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [forwardRef(() => AuthModule), DatabaseModule],
  providers: [UsersService, PasswordHash, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
