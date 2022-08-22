import { Injectable } from '@nestjs/common';
import { pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class PasswordHash {
  readonly strongHash = promisify(pbkdf2);

  readonly size = 60;
  readonly iter = 1000;
  readonly keylen = 64;

  async hash(pass: string, salt?: string) {
    salt = salt || randomBytes(this.size).toString('hex');
    const hashed = await this.strongHash(
      pass,
      salt,
      this.iter,
      this.keylen,
      'sha512',
    );
    const password = hashed.toString('hex');
    return { password, salt };
  }
}
