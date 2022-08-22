import { Injectable } from '@nestjs/common';
import { pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';

const strongHash = promisify(pbkdf2);

const size = 60;
const iter = 1000;
const keylen = 64;
@Injectable()
export class PasswordHash {
  async hash(pass: string, salt?: string) {
    salt = salt || randomBytes(size).toString('hex');
    const hashed = await strongHash(pass, salt, iter, keylen, 'sha512');
    const password = hashed.toString('hex');
    return { password, salt };
  }
}
