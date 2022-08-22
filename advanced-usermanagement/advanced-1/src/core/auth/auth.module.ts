import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PasswordHash } from '../../utils/secure/passwordHash';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RolesGuard } from './guards/roles.guard';
import { UpdateGuard } from '../users/guards/update.guard';
import { VotesModule } from '../votes/votes.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => VotesModule),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PasswordHash,
    RolesGuard,
    UpdateGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
