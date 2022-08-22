import { Test, TestingModule } from '@nestjs/testing';
import { PasswordHash } from './passwordHash';

describe('Password Hashing Service', () => {
  let passwordHash: PasswordHash;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PasswordHash],
    }).compile();

    passwordHash = app.get<PasswordHash>(PasswordHash);
  });

  it('should generate the same hash given the same password text and salt', async () => {
    const hash = await passwordHash.hash('pass');
    expect(hash).toEqual(await passwordHash.hash('pass', hash.salt));
  });
});
