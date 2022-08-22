import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordHash } from '../../utils/secure/passwordHash';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private passwordHash: PasswordHash,
  ) {}

  async validateUser(
    nickname: string,
    pass: string,
  ): Promise<{ token: string }> {
    const user = await this.usersService.findOne(nickname);
    if (!user) return;
    const { password } = await this.passwordHash.hash(pass, user.salt);
    if (password === user.password) {
      const token = this.jwtService.sign(
        { nickname: user.nickname, role: user.role },
        {
          expiresIn: '24h',
          secret: process.env.SECRET,
        },
      );

      return { token };
    }
  }
}
